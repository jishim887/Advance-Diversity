using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Surveys;
using Sabio.Models.Requests.Surveys;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class SurveysService : ISurveysService
    {
        IDataProvider _data = null;
        public SurveysService(IDataProvider data)
        {
            _data = data;
        }
        public Paged<Survey> Search(int pageIndex, int pageSize, string query)
        {
            Paged<Survey> pagedResult = null;
            List<Survey> list = null;
            int totalCount = 0;

            string procName = "[dbo].[SurveyAll_Select_Search]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@Query", query);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;

                Survey survey = MapSurvey(reader, ref index);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }

                if (list == null)
                {
                    list = new List<Survey>();
                }
                list.Add(survey);
            });
            if (list != null)
            {
                pagedResult = new Paged<Survey>(list, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }



        public Paged<Survey> Get(int pageIndex, int pageSize)
        {
            Paged<Survey> pagedResult = null;
            List<Survey> list = null;
            int totalCount = 0;

            string procName = "[dbo].[SurveyAll_Select]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Survey survey = MapSurvey(reader, ref index);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }

                if (list == null)
                {
                    list = new List<Survey>();
                }
                list.Add(survey);
            });
            if (list != null)
            {
                pagedResult = new Paged<Survey>(list, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        private static Survey MapSurvey(IDataReader reader, ref int index)
        {
            Survey aSurvey = new Survey();

            aSurvey.Id = reader.GetSafeInt32(index++);
            aSurvey.Name = reader.GetSafeString(index++);
            aSurvey.Description = reader.GetSafeString(index++);
            aSurvey.SurveyType = reader.GetSafeString(index++);
            aSurvey.Status = reader.GetSafeString(index++);
            aSurvey.CreatedBy = reader.GetSafeInt32(index++);
            aSurvey.DateCreated = reader.GetSafeDateTime(index++);
            aSurvey.DateModified = reader.GetSafeDateTime(index++);

            aSurvey.Sections = reader.DeserializeObject<List<SurveySection>>(index++);
            aSurvey.Questions = reader.DeserializeObject<List<SurveyQuestion>>(index++);
            aSurvey.AnswerOptions = reader.DeserializeObject<List<SurveyAnswerOption>>(index++);
            return aSurvey;
        }

        public SurveyAllSelects GetAllSelects()
        {
            string procName = "[dbo].[SurveyAllSelects_Select]";
            SurveyAllSelects selects = null;

            _data.ExecuteCmd(procName, inputParamMapper: null, delegate (IDataReader reader, short set)
            {
                selects = new SurveyAllSelects();
                int index = 0;
                selects.SurveyTypes = reader.DeserializeObject<List<SurveyType>>(index++);
                selects.SurveyStatuses = reader.DeserializeObject<List<SurveyStatus>>(index++);
                selects.QuestionTypes = reader.DeserializeObject<List<QuestionType>>(index++);
            });

            return selects;
        }

        public int Add(SurveyAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[SurveyAll_InsertV2]";

            DataTable paramSections = MapSectionsToTable(model);
            DataTable paramQuestions = MapQuestionsToTable(model, userId);      
            DataTable paramAnswerOptions = MapAnswerOptionsToTable(model, userId);
           
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AdcCommonParams(model, userId, col);
                col.AddWithValue("@BatchSections", paramSections);
                col.AddWithValue("@BatchQuestions", paramQuestions);
                col.AddWithValue("@BatchAnswerOptions", paramAnswerOptions);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            });

            return id;
        }

        private static void AdcCommonParams(SurveyAddRequest model, int userId, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@SurveyTypeId", model.SurveyTypeId);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@CreatedBy", userId);
        }

        private static DataTable MapAnswerOptionsToTable(SurveyAddRequest model, int userId)
        {
            DataTable adt = new DataTable();
            adt.Columns.Add("TempSectionId", typeof(Int32));
            adt.Columns.Add("TempQuestionId", typeof(Int32));
            adt.Columns.Add("Text", typeof(string));
            adt.Columns.Add("Value", typeof(string));
            adt.Columns.Add("AdditionalInfo", typeof(string));
            adt.Columns.Add("CreatedBy", typeof(Int32));

            foreach (SurveyAnswerOptionsAddRequest oneOption in model.AnswerOptions)
            {
                DataRow dr = adt.NewRow();
                int index = 0;
                dr.SetField(index++, oneOption.TempSectionId);
                dr.SetField(index++, oneOption.TempQuestionId);
                dr.SetField(index++, oneOption.Text);
                dr.SetField(index++, oneOption.Value);
                dr.SetField(index++, oneOption.AdditionalInfo);
                dr.SetField(index++, userId);
                adt.Rows.Add(dr);
            }
            return adt;
        }

        private static DataTable MapQuestionsToTable(SurveyAddRequest model, int userId)
        {
            DataTable qdt = new DataTable();
            qdt.Columns.Add("TempId", typeof(Int32));
            qdt.Columns.Add("UserId", typeof(Int32));
            qdt.Columns.Add("Question", typeof(string));
            qdt.Columns.Add("HelpText", typeof(string));
            qdt.Columns.Add("isRequired", typeof(bool));
            qdt.Columns.Add("isMultipleAllowed", typeof(bool));
            qdt.Columns.Add("QuestionTypeId", typeof(Int32));
            qdt.Columns.Add("TempSectionId", typeof(Int32));
            qdt.Columns.Add("StatusId", typeof(Int32));
            qdt.Columns.Add("SortOrder", typeof(Int32));

            foreach (SurveyQuestionsAddRequest oneQuestion in model.Questions)
            {
                DataRow dr = qdt.NewRow();
                int index = 0;
                dr.SetField(index++, oneQuestion.TempId);
                dr.SetField(index++, userId);
                dr.SetField(index++, oneQuestion.Question);
                dr.SetField(index++, oneQuestion.HelpText);
                dr.SetField(index++, oneQuestion.isRequired);
                dr.SetField(index++, oneQuestion.isMultipleAllowed);
                dr.SetField(index++, oneQuestion.QuestionTypeId);
                dr.SetField(index++, oneQuestion.TempSectionId);
                dr.SetField(index++, oneQuestion.StatusId);
                dr.SetField(index++, oneQuestion.SortOrder);
                qdt.Rows.Add(dr);

            }
            return qdt;
        }

        private static DataTable MapSectionsToTable(SurveyAddRequest model)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("TempId", typeof(Int32));
            dt.Columns.Add("Title", typeof(string));
            dt.Columns.Add("Description", typeof(string));
            dt.Columns.Add("SortOrder", typeof(Int32));

            foreach (SurveySectionsAddRequest oneSection in model.Sections)
            {
                DataRow dr = dt.NewRow();
                int index = 0;
                dr.SetField(index++, oneSection.TempId);
                dr.SetField(index++, oneSection.Title);
                dr.SetField(index++, oneSection.Description);
                dr.SetField(index++, oneSection.SortOrder);
                dt.Rows.Add(dr);
            }
            return dt;
        }
    }
}


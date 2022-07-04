using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain.Surveys;
using Sabio.Models.Requests.Surveys;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class SurveyInstancesService : ISurveyInstancesService
    {
        IDataProvider _data = null;
        public SurveyInstancesService(IDataProvider data)
        {
            _data = data;
        }
        public void AddAnswers(List<SurveyAnswersAddRequest> model)
        {
            DataTable paramAnswers = MapAnswersToTable(model);

            string procName = "[dbo].[SurveyAnswers_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@batchAnswers", paramAnswers);
            }, returnParameters: null);

        }

        private static DataTable MapAnswersToTable(List<SurveyAnswersAddRequest> model)
        {
            DataTable dt = new DataTable();

            dt.Columns.Add("InstanceId", typeof(Int32));
            dt.Columns.Add("QuestionId", typeof(Int32));
            dt.Columns.Add("AnswerOptionId", typeof(Int32));
            dt.Columns.Add("AnswerNumber", typeof(Int32));
            dt.Columns.Add("Answer", typeof(string));

            foreach (SurveyAnswersAddRequest answer in model)
            {
                DataRow dr = dt.NewRow();
                int index = 0;
                dr.SetField(index++, answer.InstanceId);
                dr.SetField(index++, answer.QuestionId);
                dr.SetField(index++, answer.AnswerOptionId);
                dr.SetField(index++, answer.AnswerNumber);
                dr.SetField(index++, answer.Answer);
                dt.Rows.Add(dr);
            }
            return dt;
        }

        public int AddInstance(int surveyId, int userId)
        {
            int id = 0;
            string procName = "[dbo].[SurveyInstances_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@SurveyId", surveyId);
                col.AddWithValue("@UserId", userId);

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

        public Survey GetById(int id)
        {
            Survey survey = null;
            string procName = "[dbo].[SurveyAll_SelectById]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                survey = MapSurveyInstance(reader);
            });

            return survey;

        }

        private static Survey MapSurveyInstance(IDataReader reader)
        {
            Survey survey = new Survey();
            int index = 0;

            survey.Id = reader.GetSafeInt32(index++);
            survey.Name = reader.GetSafeString(index++);
            survey.Description = reader.GetSafeString(index++);
            survey.SurveyType = reader.GetSafeString(index++);
            survey.Status = reader.GetSafeString(index++);
            survey.CreatedBy = reader.GetSafeInt32(index++);
            survey.DateCreated = reader.GetSafeDateTime(index++);
            survey.DateModified = reader.GetSafeDateTime(index++);

            survey.Sections = reader.DeserializeObject<List<SurveySection>>(index++);
            survey.Questions = reader.DeserializeObject<List<SurveyQuestion>>(index++);
            survey.AnswerOptions = reader.DeserializeObject<List<SurveyAnswerOption>>(index++);
            return survey;
        }
    }
}

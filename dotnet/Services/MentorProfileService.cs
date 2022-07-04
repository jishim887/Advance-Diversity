using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Mentors;
using Sabio.Models.Requests.Mentors;
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
    public class MentorProfileService : IMentorProfileService
    {
        IDataProvider _data = null;
        public MentorProfileService(IDataProvider data)
        {
            _data = data;
        }

        public Paged<MentorProfile> GetByOptions(int pageIndex, int pageSize, MentorOptions model)
        {
            Paged<MentorProfile> pagedResult = null;
            List<MentorProfile> list = null;
            int totalCount = 0;
            DataTable focusAreaParams = MapIdToTable("Id", model.FocusAreas);
            DataTable ageParams = MapIdToTable("Id", model.Ages);
            DataTable gradeParams = MapIdToTable("Id", model.Grades);
            DataTable mentoringTypeParams = MapIdToTable("Id", model.MentoringTypes);
            DataTable genderTypeParams = MapIdToTable("Id", model.GenderTypes);
            DataTable specialtyParams = MapIdToTable("Id", model.Specialties);

            string procName = "[dbo].[MentorProfiles_SelectAll_SearchOptions]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                AddOptionParams(pageIndex, pageSize, col, focusAreaParams, ageParams, gradeParams, mentoringTypeParams, genderTypeParams, specialtyParams);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                MentorProfile profile = MapProfile(reader, ref index);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }

                if (list == null)
                {
                    list = new List<MentorProfile>();
                }
                list.Add(profile);
            });
            if (list != null)
            {
                pagedResult = new Paged<MentorProfile>(list, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        private static void AddOptionParams(int pageIndex, int pageSize, SqlParameterCollection col, DataTable focusAreaParams, DataTable ageParams, DataTable gradeParams, DataTable mentoringTypeParams, DataTable genderTypeParams, DataTable specialtyParams)
        {
            col.AddWithValue("@PageIndex", pageIndex);
            col.AddWithValue("@PageSize", pageSize);
            col.AddWithValue("@BatchFocusAreas", focusAreaParams);
            col.AddWithValue("@BatchAges", ageParams);
            col.AddWithValue("@BatchGrades", gradeParams);
            col.AddWithValue("@BatchMentoringTypes", mentoringTypeParams);
            col.AddWithValue("@BatchGenderTypes", genderTypeParams);
            col.AddWithValue("@BatchSpecialties", specialtyParams);
        }

        public Paged<MentorProfile> Search(int pageIndex, int pageSize, string query)
        {
            Paged<MentorProfile> pagedResult = null;
            List<MentorProfile> list = null;
            int totalCount = 0;
            string procName = "[dbo].[MentorProfiles_SelectAll_Search]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@Query", query);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                MentorProfile profile = MapProfile(reader, ref index);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }

                if (list == null)
                {
                    list = new List<MentorProfile>();
                }
                list.Add(profile);
            });
            if (list != null)
            {
                pagedResult = new Paged<MentorProfile>(list, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }
        public Paged<MentorProfile> GetAll(int pageIndex, int pageSize)
        {
            Paged<MentorProfile> pagedResult = null;
            List<MentorProfile> list = null;
            int totalCount = 0;
            string procName = "[dbo].[MentorProfiles_SelectAll]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                MentorProfile profile = MapProfile(reader, ref index);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }

                if (list == null)
                {
                    list = new List<MentorProfile>();
                }
                list.Add(profile);
            });
            if (list != null)
            {
                pagedResult = new Paged<MentorProfile>(list, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public MentorProfile  GetProfile(int userId)
        {
            MentorProfile profile = null;
            string procName = "[dbo].[MentorProfiles_SelectById]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                
                col.AddWithValue("@UserId", userId);
            }, delegate (IDataReader reader, short set)
            {
                int index = 0;
                profile = MapProfile(reader, ref index);
            });

            return profile;
        }

        private static MentorProfile MapProfile(IDataReader reader, ref int index)
        {
            MentorProfile profile = new MentorProfile();
            profile.Id = reader.GetSafeInt32(index++);
            profile.UserId = reader.GetSafeInt32(index++);
            profile.FirstName = reader.GetSafeString(index++);
            profile.LastName = reader.GetSafeString(index++);
            profile.ImageUrl = reader.GetSafeString(index++);
            profile.Description = reader.GetSafeString(index++);
            profile.PhoneNumber = reader.GetSafeString(index++);
            profile.SocialMediaLink = reader.GetSafeString(index++);
            profile.FocusAreas = reader.DeserializeObject<List<FocusArea>>(index++);
            profile.Ages = reader.DeserializeObject<List<Age>>(index++);
            profile.Grades = reader.DeserializeObject<List<Grade>>(index++);
            profile.MentoringTypes = reader.DeserializeObject<List<MentoringType>>(index++);
            profile.GenderTypes = reader.DeserializeObject<List<GenderType>>(index++);
            profile.Specialties = reader.DeserializeObject<List<Specialty>>(index++);
            Location loc = new Location();
            
            loc.Id = reader.GetSafeInt32(index++);

            loc.LocationType = new LookUp()
            {
                Id = reader.GetSafeInt32(index++),
                Name = reader.GetSafeString(index++),
            };
            loc.LineOne = reader.GetSafeString(index++);
            loc.LineTwo = reader.GetSafeString(index++);
            loc.City = reader.GetSafeString(index++);
            loc.Zip = reader.GetSafeString(index++);

            loc.State = new LookUp()
            {
                Id = reader.GetSafeInt32(index++),
                Name = reader.GetSafeString(index++),
            };
            loc.Latitude = reader.GetSafeDouble(index++);
            loc.Longitude = reader.GetSafeDouble(index++);

            profile.Location = loc;

            return profile;
        }
        public void UpdateProfile(MentorProfileUpdateRequest model, int userId)
        {
            DataTable focusAreaParams = MapIdToTable("FocusAreaId", model.FocusAreas);
            DataTable ageParams = MapIdToTable("AgeId", model.Ages);
            DataTable gradeParams = MapIdToTable("GradeId", model.Grades);
            DataTable mentoringTypeParams = MapIdToTable("MentoringTypeId", model.MentoringTypes);
            DataTable genderTypeParams = MapIdToTable("GenderTypesId", model.GenderTypes);
            DataTable specialtyParams = MapIdToTable("SpecialtyId", model.Specialties);

            string procName = "[dbo].[MentorProfiles_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, userId, col, focusAreaParams, ageParams, gradeParams, mentoringTypeParams, genderTypeParams, specialtyParams);
                col.AddWithValue("@Id", model.Id);

            }, returnParameters: null);
        }
  

        public int AddProfile(MentorProfileAddRequest model, int userId)
        {
            int id = 0;
            DataTable focusAreaParams = MapIdToTable("FocusAreaId", model.FocusAreas);
            DataTable ageParams = MapIdToTable("AgeId", model.Ages);
            DataTable gradeParams = MapIdToTable("GradeId", model.Grades);
            DataTable mentoringTypeParams = MapIdToTable("MentoringTypeId", model.MentoringTypes);
            DataTable genderTypeParams = MapIdToTable("GenderTypesId", model.GenderTypes);
            DataTable specialtyParams = MapIdToTable("SpecialtyId", model.Specialties);

            string procName = "[dbo].[MentorProfiles_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, userId, col, focusAreaParams, ageParams, gradeParams, mentoringTypeParams, genderTypeParams, specialtyParams);

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

        private static void AddCommonParams(MentorProfileAddRequest model, int userId, SqlParameterCollection col, DataTable focusAreaParams, DataTable ageParams, DataTable gradeParams, DataTable mentoringTypeParams, DataTable genderTypeParams, DataTable specialtyParams)
        {
            col.AddWithValue("@UserId", userId);
            col.AddWithValue("@FirstName", model.FirstName);
            col.AddWithValue("@LastName", model.LastName);
            col.AddWithValue("@ImageUrl", model.ImageUrl);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@PhoneNumber", model.PhoneNumber);
            col.AddWithValue("@SocialMediaLink", model.SocialMediaLink);
            col.AddWithValue("@batchFocusAreas", focusAreaParams);
            col.AddWithValue("@batchAges", ageParams);
            col.AddWithValue("@batchGrades", gradeParams);
            col.AddWithValue("@batchMentoringTypes", mentoringTypeParams);
            col.AddWithValue("@batchGenderTypes", genderTypeParams);
            col.AddWithValue("@batchSpecialties", specialtyParams);
            col.AddWithValue("@LocationTypeId",model.Location.LocationTypeId);
            col.AddWithValue("@LineOne", model.Location.LineOne);
            col.AddWithValue("@LineTwo", model.Location.LineTwo);
            col.AddWithValue("@City", model.Location.City);
            col.AddWithValue("@Zip", model.Location.Zip);
            col.AddWithValue("@StateId", model.Location.StateId);
            col.AddWithValue("@Latitude", model.Location.Latitude);
            col.AddWithValue("@Longitude", model.Location.Longitude);
        }

        private static DataTable MapIdToTable(string idName, List<int> modelList)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add(idName, typeof(Int32));
            foreach (int optionNum in modelList)
            {
                DataRow dr = dt.NewRow();
                dr[idName] = optionNum;
                dt.Rows.Add(dr);
            }
            return dt;
        }
    }

}

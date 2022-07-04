using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain.Donations;
using Sabio.Models.Requests.Donations;
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
    public class DonationService : IDonationService
    {
        IDataProvider _data = null;
        public DonationService(IDataProvider data)
        {
            _data = data;
        }
        public CurrentUser GetUser(int id)
        {
            CurrentUser user = null;
            string procName = "[dbo].[DonationUsers_SelectById]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                user = MapCurrentUser(reader);
            });
            return user;
        }

        private static CurrentUser MapCurrentUser(IDataReader reader)
        {
            CurrentUser user = new CurrentUser();
            int index = 0;
            user.Id = reader.GetSafeInt32(index++);
            user.Email = reader.GetSafeString(index++);
            user.FirstName = reader.GetSafeString(index++);
            user.LastName = reader.GetSafeString(index++);
            return user;
        }

        public int AddPayment(DonationAddRequest model)
        {
            int id = 0;
            string procName = "[dbo].[Donations_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);

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

        private static void AddCommonParams(DonationAddRequest model, SqlParameterCollection col)
        {           
            col.AddWithValue("@UserId", model.UserId);
            col.AddWithValue("@Email", model.Email);
            col.AddWithValue("@FirstName", model.FirstName);
            col.AddWithValue("@LastName", model.LastName);
            col.AddWithValue("@CompanyName", model.CompanyName);
            col.AddWithValue("@IsAnonymous", model.IsAnonymous);
            col.AddWithValue("@Amount", model.Amount);
            col.AddWithValue("@Currency", model.Currency);
            col.AddWithValue("@City", model.City);
            col.AddWithValue("@State", model.State);
            col.AddWithValue("@Country", model.Country);
            col.AddWithValue("@PayerId", model.PayerId);
            col.AddWithValue("@PaymentId", model.PaymentId);
            col.AddWithValue("@PaymentToken", model.PaymentToken);
            col.AddWithValue("@ReturnUrl", model.ReturnUrl);
        }
    }
}

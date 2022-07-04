using Sabio.Models.AppSettings;
using Sabio.Models.Requests;
using Sabio.Models.Requests.ContactUs;
using Sabio.Models.Domain.Stripe;
using Sabio.Models.Requests.Donations;
using SendGrid;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Requests.Users;

namespace Sabio.Services
{
    public interface IEmailService
    {
        Task SendContactUsEmail(ContactAddRequest model);
        Task SendUserEmail(ContactAddRequest model);
        Task SendWelcomeEmail();

        Task SendResetPasswordEmail(ChangePasswordEmailRequest model);

        Task SendStripeEmail(CreateEmailRequest cust);

        Task SendDonationEmail(DonationEmailRequest cust);

    }
}

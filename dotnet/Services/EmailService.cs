using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Sabio.Models.AppSettings;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Sabio.Models.Requests;
using Sabio.Models.Requests.ContactUs;
using Sabio.Models.Domain.Stripe;
using Sabio.Models.Requests.Donations;
using Sabio.Models.Requests.Users;

namespace Sabio.Services
{
    public class EmailService : IEmailService
    {
        private AppKeys _appKeys;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public EmailService(IOptions<AppKeys> appKeys, IWebHostEnvironment hostingEnvironment)
        {
            _appKeys = appKeys.Value;
            _hostingEnvironment = hostingEnvironment;
        }


        public async Task SendContactUsEmail(ContactAddRequest model)
        {
            var from = new EmailAddress(_appKeys.ContactUs, "Fname Lname");
            var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress(_appKeys.ContactUs, "Fname Lname");
            var plainTextContent = "Contact Form";

            string path = Path.Combine(_hostingEnvironment.WebRootPath, "EmailTemplates", "ContactUsEmail.html");

            var htmlContent = File.ReadAllText(path);

            SendGridMessage msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            await Send(msg);

        }

        public async Task SendUserEmail(ContactAddRequest model)
        {
            var from = new EmailAddress(_appKeys.ContactUs, "Fname Lname");
            var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress(model.Email, "Fname Lname");
            var plainTextContent = "Thanks For Contacting Us";

            string path = Path.Combine(_hostingEnvironment.WebRootPath, "EmailTemplates", "ContactUsEmail.html");

            var htmlContent = File.ReadAllText(path);

            SendGridMessage msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            await Send(msg);

        }


        public async Task SendWelcomeEmail()
        {
            var from = new EmailAddress("sendwelcomeemail@dispostable.com", "Fname Lname");
            var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress("sendwelcomeemail@dispostable.com", "Fname Lname");
            var plainTextContent = "and easy to do anywhere, even with C#";

            string path = Path.Combine(_hostingEnvironment.WebRootPath, "EmailTemplates", "WelcomeEmail.html");

            var htmlContent = File.ReadAllText(path);

            SendGridMessage msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            await Send(msg);

        }

        public async Task SendStripeEmail(CreateEmailRequest cust)
        {
            var from = new EmailAddress("sendwelcomeemail@dispostable.com");
            var subject = "Thank you for your purchase " + cust.CustomerName;
            var to = new EmailAddress(cust.CustomerEmail, cust.CustomerName);
            var totalAmount = cust.AmountTotal / 100 + ".00";
            var plainTextContent = "Thank you for your purchase!" 
                + " The Total Amount is " 
                + totalAmount 
                + ". Payment Status " + cust.PaymentStatus 
                + " Your Transaction Id is " + cust.TransactionId;

            SendGridMessage msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, null);
            await Send(msg);
        }
        public async Task SendDonationEmail(DonationEmailRequest cust)
        {
            var from = new EmailAddress("sendwelcomeemail@dispostable.com", "Fname Lname");
            var subject = "Thank you for your purchase " + cust.FirstName;
            var to = new EmailAddress(cust.Email, cust.FirstName);
            var plainTextContent = "Thank you for your donation of " + cust.Amount + cust.Currency + ". Your Transaction ID is " + cust.PaymentId;
            SendGridMessage msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, null);
            await Send(msg);
        }

        public async Task SendResetPasswordEmail(ChangePasswordEmailRequest model)
        {
            var from = new EmailAddress("advdiversity@dispostable.com");
            var subject = " Reset Password ";
            var to = new EmailAddress(model.Email);
            string url = String.Concat("/changepassword?token=", model.Token + "&email=", model.Email);
            var plainTextContent = "Please Click here ==> " + url;
            string path = Path.Combine(_hostingEnvironment.WebRootPath, "EmailTemplates", "ResetPasswordEmail.html");
            string pathName = "changepassword?";
            string token = "token=" + model.Token;
            string email = "&email=" + model.Email;
            var htmlContent = File.ReadAllText(path).Replace("{{$Path}}", pathName)
                                                    .Replace("{{$Token}}", token)
                                                    .Replace("{{$Email}}", email);
            SendGridMessage msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            await Send(msg);
        }

        public async Task<Response> Send(SendGridMessage msg)
        {
            Response response = null;
            SendGridClient client = new SendGridClient(_appKeys.SendGridAppKey);

            response = await client.SendEmailAsync(msg);

            if (response.StatusCode != System.Net.HttpStatusCode.Accepted)
            {
                throw new Exception(response.ToString());
            }
            return response;

        }


    }
}

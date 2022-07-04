using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Donations
{
    public class DonationAddRequest
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        [Required]
        public bool IsAnonymous { get; set; }
        [Required]
        public double Amount { get; set; }
        [Required]
        public string Currency { get; set; }
        [Required]
        public string City { get; set; }
        public string State { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string PayerId { get; set; }
        [Required]
        public string PaymentId { get; set; }
        [Required]
        public string PaymentToken { get; set; }
        [Required]
        public string ReturnUrl { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Donations
{
    public class DonationEmailRequest
    {
        public string FirstName { get; set; }
        [Required]
        public double Amount { get; set; }
        [Required]
        public string Currency { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PaymentId { get; set; }

    }
}

using Sabio.Models.Requests.Locations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Mentors
{
    public class MentorProfileAddRequest
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        [Required]
        public string Description { get; set; }
        public string PhoneNumber { get; set; }
        public string SocialMediaLink { get; set; } 
        [Required]
        public List<int> FocusAreas { get; set; }
        [Required]
        public List<int> Ages { get; set; }
        [Required]
        public List<int> Grades { get; set; }
        [Required]
        public List<int> MentoringTypes { get; set; }
        [Required]
        public List<int> GenderTypes { get; set; }
        [Required]
        public List<int> Specialties { get; set; }
        public LocationAddRequest Location { get; set; }
    }
}

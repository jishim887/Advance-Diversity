using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Mentors
{
    public class MentorProfile
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string PhoneNumber { get; set; }
        public string SocialMediaLink { get; set; }
        public List<FocusArea> FocusAreas { get; set; }
        public List<Age> Ages { get; set; }
        public List<Grade> Grades { get; set; }
        public List<MentoringType> MentoringTypes { get; set; }
        public List<GenderType> GenderTypes { get; set; }
        public List<Specialty> Specialties { get; set; }
        public Location Location { get; set; }
    }
}

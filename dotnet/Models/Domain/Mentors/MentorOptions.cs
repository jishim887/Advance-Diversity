using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Mentors
{
    public class MentorOptions
    {
        public List<int> FocusAreas { get;set; }
        public List<int> Ages { get; set; }
        public List<int> Grades { get; set; }
        public List<int> MentoringTypes { get; set; }
        public List<int> GenderTypes { get; set; }
        public List<int> Specialties { get; set; }
    }
}

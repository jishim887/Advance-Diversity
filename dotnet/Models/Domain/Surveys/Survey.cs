using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Surveys
{
    public class Survey
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string SurveyType { get; set; }
        public string Status { get; set; }
        public int CreatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public List<SurveySection> Sections { get; set; }
        public List<SurveyQuestion> Questions { get; set; }
        public List<SurveyAnswerOption> AnswerOptions { get; set; }
    }
}

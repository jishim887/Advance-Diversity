using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Surveys
{
    public class SurveyAllSelects
    {
        public List<SurveyType> SurveyTypes { get; set; }
        public List<SurveyStatus> SurveyStatuses { get; set; }
        public List<QuestionType> QuestionTypes { get; set; }
    }
}

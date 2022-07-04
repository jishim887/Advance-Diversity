using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Surveys
{
    public class SurveyInstance
    {
        public int Id { get; set; }
        public int SurveyId { get; set; }
        public int UserId { get; set; }
    }
}

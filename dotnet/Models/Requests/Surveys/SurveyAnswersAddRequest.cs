using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Surveys
{
    public class SurveyAnswersAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int InstanceId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int QuestionId { get; set; }
        public int AnswerOptionId { get; set; }
        public int AnswerNumber { get; set; }
        public string Answer { get; set; }
    }
}

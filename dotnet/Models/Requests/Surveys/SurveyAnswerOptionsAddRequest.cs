using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Surveys
{
    public class SurveyAnswerOptionsAddRequest
    {
        [Required]
        public int TempSectionId { get; set; }
        [Required]
        public int TempQuestionId { get; set; }
        [StringLength(500)]
        public string Text { get; set; }
        [StringLength(100)]
        public string Value { get; set; }
        [StringLength(200)]
        public string AdditionalInfo { get; set; }


    }
}

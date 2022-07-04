using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Surveys
{
    public class SurveyAddRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }
        [Required]
        [StringLength(2000, MinimumLength = 2)]
        public string Description { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int SurveyTypeId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int StatusId { get; set; }
        [Required]
        public  List<SurveySectionsAddRequest> Sections { get; set; }
        [Required]
        public List<SurveyQuestionsAddRequest> Questions { get; set; }
        public List<SurveyAnswerOptionsAddRequest> AnswerOptions { get; set; }

    }
}

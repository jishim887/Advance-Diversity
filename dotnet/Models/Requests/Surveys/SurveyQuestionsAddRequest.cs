using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Surveys
{
    public class SurveyQuestionsAddRequest
    {
        [Required]
        public int TempId { get; set; }
        [Required]
        [StringLength(500, MinimumLength = 2)]
        public string Question { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string HelpText { get; set; }
        [Required]
        public bool isRequired { get; set; }
        [Required]
        public bool isMultipleAllowed { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int  QuestionTypeId { get; set; }
        [Required]
        public int TempSectionId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int StatusId { get; set; }
        [Required]
        public int SortOrder { get; set; }
    }
}

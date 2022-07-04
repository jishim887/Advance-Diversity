using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Surveys
{
    public class SurveySectionsAddRequest
    {
        [Required]
        public int TempId { get; set; }
        [StringLength(100)]
        public string Title { get; set; }
        [StringLength(2000)]
        public string Description { get; set; }
        [Required]
        public int SortOrder { get; set; }
    }
}

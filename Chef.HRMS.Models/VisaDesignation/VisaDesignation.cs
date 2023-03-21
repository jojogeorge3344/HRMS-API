using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class VisaDesignation : Model
    {
        [Required]
        [StringLength(128)]
        public string Description { get; set; }

        [Required]
        [StringLength(32)]
        public string Name { get; set; }
    }
}

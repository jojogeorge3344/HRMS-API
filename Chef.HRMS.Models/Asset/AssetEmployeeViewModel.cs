using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class AssetEmployeeViewModel: ViewModel
    {
        public string Employeecode { get; set; }
        [ForeignKey("Employee")]
        public string Firstname { get; set; }
        [ForeignKey("JobDetails")]
        public string Employeenumber { get; set; }
        [ForeignKey("JobDetails")]
        public int Department { get; set; }

        [ForeignKey("Employee")]
        public int Empid { get; set; }
    }
}

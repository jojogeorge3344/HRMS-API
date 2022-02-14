using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    [Table("assetemployeewise")]
    public class AssetEmployeeWise : Model
    {
        [ForeignKey("employee")]
        public int EmployeeID { get; set; }

        [ForeignKey("employee")]
        public string FirstName { get; set; }

        [ForeignKey("employee")]
        public string LastName { get; set; }

        [Required]
        [ForeignKey("jobdetails")]
        public WorkerType EmployeeStatus { get; set; }

        //[Required]
        //public int AllocatedAsset { get; set; }

        //[Required]
        //public int Requests { get; set; }

        [Required]
        [ForeignKey("jobtitle")]
        public string Designation { get; set; }

        

    }
}

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
    [Table("assetraiserequest")]
    public class AssetRaiseRequest: Model
    {
        [Required]

        public int RequestNo { get; set; }

        [Required]
        public DateTime RequestedDate { get; set; }
        [Required]
        public RequestFor RequestFor { get; set; }

        [Required]
        public string RequestType { get; set; }

        [ForeignKey("AssetType")]
        public int AssetTypeId { get; set; }

        [Required]

        public RaiseRequestStatus Status { get; set; }

        [Required]
        public string NameOfTeamMember { get; set; }

        [Required]
        public string Description { get; set; }

        [ForeignKey("JobDetails")]
        public int JobDetailsId { get; set; }

        [ForeignKey("JobDetails")]
        public int Department { get; set; }

        [ForeignKey("Employee")]
        public int EmpId { get; set; }



        [ForeignKey("Employee")]
        public string FirstName { get; set; }

        [ForeignKey("JobDetails")]
        public string EmployeeNumber { get; set; }




    }
}

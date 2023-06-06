using Chef.Common.Core;
using Chef.Common.Core.Extensions;
using Chef.Common.Types;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class EmployeeBasicDetailsReport : Model
    {
        public DateTime DateOfBirth { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public GenderType Gender { get; set; }
        public string GenderName => EnumExtension.GetDescription(Gender);
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public MaritalStatusType MaritalStatus { get; set; }
        public string MaritalStatusName => EnumExtension.GetDescription(MaritalStatus);
        public BloodGroupType BloodGroup { get; set; }
        public string BloodGroupName => EnumExtension.GetDescription(BloodGroup);
        public string UserId { get; set; }
        public string FileNumber { get; set; }
        public Int64 UIDNumber { get; set; }
        public string LanguageKnown { get; set; }
        public int ReligionId { get; set; }
        public string ReligionName { get; set; }
        public string Remarks { get; set; }
        public string RefNum { get; set; }
    }
}

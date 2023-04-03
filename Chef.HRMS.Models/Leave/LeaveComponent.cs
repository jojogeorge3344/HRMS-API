using Chef.Common.Core;
using Chef.Common.Models;
using Chef.Common.Types;
using Chef.HRMS.Types;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models
{
    public class LeaveComponent : Model
    {
        /// <summary>
        /// Holds code
        /// </summary>
        [Required]
        [StringLength(3)]
        public string Code { get; set; }

        /// <summary>
        /// Holds name of the leave type
        /// </summary>
        [Required]
        [StringLength(32)]
        public string Name { get; set; }

        /// <summary>
        /// Holds the description
        /// </summary>
        [Required]
        [StringLength(256)]
        public string Description { get; set; }

        /// <summary>
        /// Holds paid leave status
        /// </summary>
        public bool IsPaidLeave { get; set; }

        /// <summary>
        /// Holds restricted to gender status
        /// </summary>
        public bool IsRestrictedToGender { get; set; }

        /// <summary>
        /// Holds restricted to marital status
        /// </summary>
        public bool IsRestrictedToMaritalStatus { get; set; }

        /// <summary>
        /// Holds sick leave status
        /// </summary>
        public bool IsSickLeave { get; set; }

        /// <summary>
        /// Holds statutory leave status
        /// </summary>
        public bool IsStatutoryLeave { get; set; }

        /// <summary>
        /// Holds restricted to gender type
        /// </summary>
        public GenderType RestrictedToGender { get; set; }

        /// <summary>
        /// Holds restricted to marital status type
        /// </summary>
        public MaritalStatusType RestrictedToMaritalStatus { get; set; }

        /// <summary>
        /// Holds show leave description status
        /// </summary>
        public bool IsShowLeaveDescription { get; set; }
        public int EligibleDays { get; set; }
        public int EligibilityBase { get; set; }
        public int MaxLeaveAtATime { get; set; }
        public string VacationSalaryFormula { get; set; }
        public string EncashBFCode { get; set; }
        public int EncashLimitDays { get; set; }
        public int CFLimitDays { get; set; }
        public BaseType BaseType { get; set; }
        public bool IsIncludeLOPDays { get; set; }
        public LeaveType LeaveType { get; set; }
        public LeaveCutOffType LeaveCutOffType { get; set; }
        public bool IsAccruedLeaveAmount { get; set; }
        public bool IsEncash { get; set; }
        public bool IsCarryForward { get; set; }
        public int BenefitTypeId { get; set; }
        public int BenefitCategoryId { get; set; }
        public int LeaveEligibilityId { get; set; }
    }
}
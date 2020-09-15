using Chef.Common.Core;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    [TableType("junctiontable")]
    public class LeaveComponentGeneralSettings : Model
    {
        /// <summary>
        /// Holds the value of allocating leave quota at joining dtae or monthly interval
        /// </summary>
        public int AllocateLeaveQuotaAt { get; set; }

        /// <summary>
        /// Holds the annual leave quota for the particular leave component
        /// </summary>
        public int AnnualLeaveQuota { get; set; }

        /// <summary>
        /// Holds the value of leave round-off whether do not round-off or round-off to full day
        /// </summary>
        public int BalanceRoundOff { get; set; }

        /// <summary>
        /// Holds the value of leave balance at the year end whether it will expire, can be encashed or carry forward
        /// </summary>
        public int LeaveBalancesAtTheYearEnd { get; set; }

        /// <summary>
        /// Holds the leave component Id
        /// </summary>
        [ForeignKey("LeaveComponent")]
        public int LeaveComponentId { get; set; }

        /// <summary>
        /// Holds the leave structure Id
        /// </summary>
        [ForeignKey("LeaveStructure")]
        public int LeaveStructureId { get; set; }

        /// <summary>
        /// Holds the maximum carry forward leave in days 
        /// </summary>
        public int MaxCarryForwardDays { get; set; }

        /// <summary>
        /// Holds the maximum consecutive days which a leave can be availed
        /// </summary>
        public int MaxConsecutiveDays { get; set; }

        /// <summary>
        /// Holds the maximum number of days per month which a particular leave can be applied
        /// </summary>
        public int MaxNumberOfDaysPerMonth { get; set; }

        /// <summary>
        /// Holds the value of negative leave balance at the year end whether it is loss of pay, adjust with next year or do nothing
        /// </summary>
        public int NegativeLeaveBalancesAtTheYearEnd { get; set; }

        /// <summary>
        /// Holds the value of Do not allocate leave quota if joining date is beyond
        /// </summary>
        public int NoLeaveQuotaAfterJoiningDay { get; set; }

        /// <summary>
        /// Holds the value of Number of days gap required between leaves
        /// </summary>
        public int NumberOfDaysGapRequiredBetweenLeaves { get; set; }

        /// <summary>
        /// Holds the required prior notice (in days)
        /// </summary>
        public int PriorNoticeDays { get; set; }
    }
}
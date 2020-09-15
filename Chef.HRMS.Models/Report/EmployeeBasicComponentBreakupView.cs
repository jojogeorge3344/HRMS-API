using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models
{
    public class EmployeeBasicComponentBreakupView : Model
    {
        /// <summary>
        /// Holds reference to employee name
        /// </summary>
        public string EmployeeName { get; set; }

        /// <summary>
        /// Holds reference to employee code
        /// </summary>
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Holds payroll component
        /// </summary>
        public string BasicComponents { get; set; }

        /// <summary>
        /// Holds bonus amount
        /// </summary>
        public float Bonus { get; set; }

        /// Holds effective date
        /// </summary>
        public DateTime EffectiveDate { get; set; }
    }
}
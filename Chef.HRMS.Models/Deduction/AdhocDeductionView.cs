using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Chef.HRMS.Models
{
    public class AdhocDeductionView : Model
    {
        /// <summary>
        /// Holds name of  employee
        /// </summary>
        [Description("Name of employee")]
        public string Name { get; set; }

        /// <summary>
        /// Holds name of  employeeid
        /// </summary>
        [Description("id of employee")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds the employee code
        /// </summary>
        [Description("Employee Code")]
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Holds the deduction id
        /// </summary>
        [Description("Deduction Id")]
        public int DeductionId { get; set; }

        /// <summary>
        /// Holds the deduction name
        /// </summary>
        [Description("Deduction name")]
        public string DeductionName { get; set; }

        /// <summary>
        /// Holds the description
        /// </summary>
        [Description("Description")]
        public string Description { get; set; }

        /// <summary>
        /// Holds the deduction amount
        /// </summary>
        [Description("Deduction amount")]
        public float Amount { get; set; }

        /// <summary>
        /// Holds the currency of deduction amount
        /// </summary>
        [Description("Currency of deduction amount")]
        public string Currency { get; set; }

        /// <summary>
        /// Holds payroll processing method id
        /// </summary>
        public int PayrollProcessingMethodId { get; set; }
    }
}

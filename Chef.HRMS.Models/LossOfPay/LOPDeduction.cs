using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Chef.HRMS.Models
{
    public class LOPDeduction :Model
    {
        /// <summary>
        /// Holds leave requested by user
        /// </summary>
        [Required]
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds the number of days taking the lopleave
        /// </summary>
        public decimal NumberOfDays { get; set; }

        /// <summary>
        /// Holds the deducting amount
        /// </summary>
        public decimal LOPAmount { get; set; }

        /// <summary>
        /// Holds the payrollprocessingmethodid of employee
        /// </summary>
        [Description("The payrollprocessingmethodid of employee")]
        public int PayrollProcessingMethodId { get; set; }

    }
}

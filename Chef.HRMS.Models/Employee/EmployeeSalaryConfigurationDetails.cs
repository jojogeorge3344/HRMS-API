using Chef.Common.Core;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class EmployeeSalaryConfigurationDetails : Model
    {
        /// <summary>
        /// Holds reference to employee
        /// </summary>
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds reference to employee salary configuration
        /// </summary>
        [ForeignKey("EmployeeSalaryConfiguration")]
        [Required]
        public int EmployeeSalaryConfigurationId { get; set; }

        /// <summary>
        /// Holds reference to payroll calculation
        /// </summary>
        [ForeignKey("PayrollCalculation")]
        public int PayrollCalculationId { get; set; }

        /// <summary>
        /// Holds reference to payroll component
        /// </summary>
        [ForeignKey("PayrollComponent")]
        public int PayrollComponentId { get; set; }

        /// <summary>
        /// Holds reference to payroll structure
        /// </summary>
        [ForeignKey("PayrollStructure")]
        public int PayrollStructureId { get; set; }

        /// <summary>
        /// Holds montly amount
        /// </summary>
        [Required]
        public float MonthlyAmount { get; set; }

        /// <summary>
        /// Holds yearly amount
        /// </summary>
        [Required]
        public float YearlyAmount { get; set; }
    }
}

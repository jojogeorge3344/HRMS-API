using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models
{
    public class EmployeeSalaryConfigurationView : Model
    {
        /// <summary>
        /// Holds reference to employee
        /// </summary>
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds reference to employee name
        /// </summary>
        public string EmployeeName { get; set; }

        /// <summary>
        /// Holds reference to employee code
        /// </summary>
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Holds reference to employee salary configuration
        /// </summary>
        public int EmployeeSalaryConfigurationId { get; set; }

        /// <summary>
        /// Holds reference to employee salary configuration
        /// </summary>
        public int EmployeeSalaryConfigurationDetailsId { get; set; }

        /// <summary>
        /// Holds reference to payroll calculation
        /// </summary>
        public int PayrollCalculationId { get; set; }

        /// <summary>
        /// Holds reference to payroll component
        /// </summary>
        public int PayrollComponentId { get; set; }

        /// <summary>
        /// Holds reference to payroll structure
        /// </summary>
        public int PayrollStructureId { get; set; }

        /// <summary>
        /// Holds payroll component short code
        /// </summary>
        public string ShortCode { get; set; }

        /// <summary>
        /// Holds payroll component name
        /// </summary>
        public string PayrollComponentName { get; set; }

        /// <summary>
        /// Holds payroll structure name
        /// </summary>
        public string PayrollStructureName { get; set; }

        /// <summary>
        /// Holds whether component is computed or not
        /// </summary>
        public bool IsComputed { get; set; }

        /// <summary>
        /// Holds formula
        /// </summary>
        public string Formula { get; set; }

        /// <summary>
        /// Holds montly amount
        /// </summary>
        public float MonthlyAmount { get; set; }

        /// <summary>
        /// Holds yearly amount
        /// </summary>
        public float YearlyAmount { get; set; }

        /// <summary>
        /// Holds effective date
        /// </summary>
        public DateTime EffectiveDate { get; set; }

        /// <summary>
        /// Holds version
        /// </summary>
        public string Version { get; set; }

        /// <summary>
        /// Holds detail created date
        /// </summary>
        public DateTime DetailCreatedDate { get; set; }

        /// <summary>
        /// Holds detail modified date
        /// </summary>
        public DateTime DetailModifiedDate { get; set; }

        /// <summary>
        /// Holds detail created by
        /// </summary>
        public string DetailCreatedBy { get; set; }

        /// <summary>
        /// Holds detail modified by
        /// </summary>
        public string DetailModifiedBy { get; set; }
    }
}

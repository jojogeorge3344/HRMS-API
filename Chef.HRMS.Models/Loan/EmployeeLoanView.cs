using System;
using System.ComponentModel;

namespace Chef.HRMS.Models
{
    public class EmployeeLoanView
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
        public int Employeeid { get; set; }

        /// <summary>
        /// Holds the employee code
        /// </summary>
        [Description("Employee Code")]
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Holds the loan type
        /// </summary>
        [Description("loan type")]
        public string LoanType { get; set; }

        /// <summary>
        /// Holds the loan id 
        /// </summary>
        [Description("Loan id")]
        public int LoanId { get; set; }

        /// <summary>
        /// Holds the loan number 
        /// </summary>
        [Description("Loan number")]
        public string LoanNumber { get; set; }

        /// <summary>
        /// Holds the loan amount
        /// </summary>
        [Description("Loan amount")]
        public float Amount { get; set; }

        /// <summary>
        /// Holds the paygroupid of employee
        /// </summary>
        [Description("The paygroupid of employee")]
        public int PaygroupId { get; set; }

        /// <summary>
        /// Holds the payrollprocessingmethodid of employee
        /// </summary>
        [Description("The payrollprocessingmethodid of employee")]
        public int PayrollProcessingMethodId { get; set; }

        /// <summary>
        /// Holds disbursement expected on date
        /// </summary>
        public DateTime DisbursementDate { get; set; }

        /// <summary>
        /// Holds emi amount
        /// </summary>
        public float EMIAmount { get; set; }

        /// <summary>
        /// Holds balance amount to pay
        /// </summary>
        public float BalanceAmount { get; set; }

        /// <summary>
        /// Holds Remaining Tenure
        /// </summary>
        public int RemainingTenure { get; set; }

        /// <summary>
        /// Holds loan setting id
        /// </summary>
        public int LoanSettingId { get; set; }
        public int ComponentId { get; set; }
    }
}

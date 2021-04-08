using System.ComponentModel;

namespace Chef.HRMS.Models
{
    public class PayrollReview
    {
        /// <summary>
        /// Holds name of  employee
        /// </summary>
        [Description("Name of employee")]
        public string EmployeeName { get; set; }

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
        /// Holds the total salary
        /// </summary>
        [Description("Total salary of employee")]
        public float Basic { get; set; }

        /// <summary>
        /// Holds the loan amount
        /// </summary>
        [Description("Loan amount")]
        public float LoanAmount { get; set; }

        /// <summary>
        /// Holds the loan number
        /// </summary>
        [Description("Loan number")]
        public string LoanNumber { get; set; }

        /// <summary>
        /// Holds the loan type 
        /// </summary>
        [Description("Loan type")]
        public LoanType LoanType { get; set; }

        /// <summary>
        /// Holds the lop count of employee
        /// </summary>
        [Description("Lop count")]
        public int LOPCount { get; set; }

        /// <summary>
        /// Holds the total lop amount of employee
        /// </summary>
        [Description("Lop amount")]
        public float LOPAmount { get; set; }

        /// <summary>
        /// Holds the total bonus amount of employee
        /// </summary>
        [Description("Bonus amount")]
        public float Bonus { get; set; }

        /// <summary>
        /// Holds the total deduction amount of employee
        /// </summary>
        [Description("Deduction amount")]
        public float Deduction { get; set; }

        /// <summary>
        /// Holds the total deduction amount of employee
        /// </summary>
        [Description("Deduction name")]
        public string DeductionName { get; set; }

        /// <summary>
        /// Holds the total repayment amount of employee
        /// </summary>
        [Description("Repayment amount")]
        public float EMIAmount { get; set; }

        /// <summary>
        /// Holds the total payable amount of employee
        /// </summary>
        [Description("Payable amount of employee")]
        public float TotalSalary { get; set; }
    }
}

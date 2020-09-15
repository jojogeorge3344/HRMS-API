using Chef.Common.Core;

namespace Chef.HRMS.Models
{
    public class ProcessedSalaryDetailsView : Model
    {
        public int EmployeeId { get; set; }

        public string EmployeeCode { get; set; }

        public string EmployeeName { get; set; }

        public string PayGroup { get; set; }

        public string PayrollMonth { get; set; }

        public int PayrollYear { get; set; }

        public float BasicComponent { get; set; }

        public int LOP { get; set; }

        public float LOPDeduction { get; set; }

        public float Bonus { get; set; }

        public float LoanOrAdvance { get; set; }

        public float AdhocDeduction { get; set; }

        public float LoanRepayment { get; set; }

        public float Total { get; set; }
    }
}

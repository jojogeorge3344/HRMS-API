using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models.PayrollProcessing
{
    public class PayrollComponentDetails : Model
    {
        public int PayrollProcessId { get; set; }
        public DateTime PayrollProcessedDate { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public int PayrollComponentId { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public string PayrollComponentName { get; set; }
        public decimal EarningsAmt { get; set; }
        public decimal DeductionAmt { get; set; }
        public int ProcessStatus { get; set; }
        public int StepNo { get; set; }
    }
}

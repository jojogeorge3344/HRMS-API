using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models.PayrollProcessing
{
    public class PayrollProcessCompletedView
    {
        public int EmployeeId { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public string EmployeeCode { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public string EmployeeName { get; set; }
        public int PayrollProcessId { get; set; }
        public DateTime PayrollProcessDate { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public string PayrollComponentName { get; set; }
        public PayHeadBaseUnitType PayHeadBaseUnitType { get; set; }
        public decimal EarningsAmt { get; set; }
        public decimal DeductionAmt { get; set; }
    }
}

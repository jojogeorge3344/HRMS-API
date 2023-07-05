using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class FianlSettlementLeaveBalanceView 
    {
        public decimal AnnualLeaveBalance { get; set; }
        public decimal EOSBalanceDays { get; set; }
        public decimal AccruedTicketAmt { get; set; }
    }
}

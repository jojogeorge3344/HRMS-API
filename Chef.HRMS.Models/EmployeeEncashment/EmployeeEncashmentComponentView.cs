using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class EmployeeEncashmentComponentView
    {
        public int LeaveComponentId { get; set; }
        public string LeaveComponentCode { get; set; }
        public string LeaveComponentName { get; set; }
        public decimal LeaveBalanceAmount { get; set; }
        public int EOSId { get; set; }
        public string EOSCode { get; set; }
        public string EOSName { get; set; }
        public decimal EOSAmount { get; set; }
        public int TicketComponentId { get; set; }
        public string TicketComponentCode { get; set; }
        public string TicketComponentName { get; set; }
        public decimal TicketBalanceAmount { get; set; }
    }
}

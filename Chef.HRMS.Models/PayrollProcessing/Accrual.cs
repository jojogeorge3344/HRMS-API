using Chef.Common.Core;
using Chef.HRMS.Models.PayrollProcessing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class Accruals : ViewModel
    {
        public List<LeaveAccrual> LeaveAccruals { get; set; }
        public List<EOSAccrual> EOSAccruals { get; set; }
        public List<TicketAccrual> TicketAccruals { get; set; }
        public int PayrollProcessingmethod { get; set; }
    }
}

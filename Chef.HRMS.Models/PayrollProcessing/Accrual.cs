using Chef.Common.Core;
using Chef.HRMS.Models.PayrollProcessing;
using System.Collections.Generic;

namespace Chef.HRMS.Models;

public class Accruals : ViewModel
{
    public List<LeaveAccrual> LeaveAccruals { get; set; }
    public List<EOSAccrual> EOSAccruals { get; set; }
    public List<TicketAccrual> TicketAccruals { get; set; }
    public int PaygroupId { get; set; }
}

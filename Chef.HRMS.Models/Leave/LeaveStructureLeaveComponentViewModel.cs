using Chef.HRMS.Models;
using System.Collections.Generic;

namespace Chef.HRMS.Web.Models;

public class LeaveStructureLeaveComponentViewModel
{
    public int LeaveStructureId { get; set; }
    public IEnumerable<LeaveStructureLeaveComponent> LeaveStructureLeaveComponents { get; set; }
    public IEnumerable<LeaveStructureLeaveComponent> RemoveLeaveStructureLeaveComponents { get; set; }
}
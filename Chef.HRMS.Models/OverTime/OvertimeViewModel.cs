using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class OvertimeViewModel : ViewModel
{
    public int Id { get; set; }
    public int OvertimeId { get; set; }

    public int NotifyPersonnel { get; set; }

    //public int EmployeeId { get; set; }
    public string FirstName { get; set; }

}

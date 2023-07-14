using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class LeaveAccrualfinDetails : ViewModel
{
    public int Id { get; set; }

    public int LeaveAccrualDetailsId { get; set; }

    public decimal LeaveAccrualAmount { get; set; }

    public int DrAccount { get; set; }

    public int CrAccount { get; set; }
}

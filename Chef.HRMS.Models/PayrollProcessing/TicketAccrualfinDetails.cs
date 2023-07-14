using Chef.Common.Core;

namespace Chef.HRMS.Models.PayrollProcessing;

public class TicketAccrualfinDetails : ViewModel
{
    public int Id { get; set; }
    public int TicketAccrualId { get; set; }
    public decimal TicketAccrualAmount { get; set; }
    public int DrAccount { get; set; }
    public int CrAccount { get; set; }
    public string Docnum { get; set; }
}

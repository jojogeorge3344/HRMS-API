using Chef.Common.Core;
namespace Chef.HRMS.Models.Report;

public class WPSDetailsReportView : ViewModel
{
    public int WPSId { get; set; }
    public string MolId { get; set; }
    public string RoutingId { get; set; }
    public string SalaryCardNo { get; set; }
    public string AccountNo { get; set; }
    public string GroupName { get; set; }
    public string BankName { get; set; }
}

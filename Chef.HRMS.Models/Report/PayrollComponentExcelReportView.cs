using Chef.Common.Core;

namespace Chef.HRMS.Models.Report;

public class PayrollComponentExcelReportView : Model
{
    public int PayrollComponentId { get; set; }
    public string PayrollComponentCode { get; set; }
}

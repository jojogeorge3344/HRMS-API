using Chef.Common.Core;
using Chef.Common.Core.Extensions;
using Chef.Common.Types;
using System;

namespace Chef.HRMS.Models;

public class LeaveReportHeader : Model
{
    public string EmployeeCode { get; set; }
    public string LeaveComponentCode { get; set; }
    public string PaygroupCode { get; set; }
    public string DesignationCode { get; set; }
    public string LocationCode { get; set; }
    public DepartmentType Department { get; set; }
    public string DepartmentCode => EnumExtension.GetDescription(Department);
    public string CategoryCode { get; set; }
    public string ReportType { get; set; }
    public DateTime ToDate { get; set; }
    public DateTime FromDate { get; set; }
}

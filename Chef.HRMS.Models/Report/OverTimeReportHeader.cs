using Chef.Common.Core;
using Chef.Common.Core.Extensions;
using Chef.Common.Types;
using System;

namespace Chef.HRMS.Models;

public class OverTimeReportHeader : Model
{
    public string EmployeeCode { get; set; }
    public string Overtimepolicyname { get; set; }
    public string PaygroupCode { get; set; }
    public string DesignationCode { get; set; }
    public string LocationCode { get; set; }
    public DepartmentType DepartmentIds { get; set; }
    public string DepartmentName => EnumExtension.GetDescription(DepartmentIds);
    public string CategoryCode { get; set; }
    public string ReportType { get; set; }
    public DateTime ToDate { get; set; }
    public DateTime FromDate { get; set; }

}

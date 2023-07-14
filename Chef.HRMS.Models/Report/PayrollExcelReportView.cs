using Chef.Common.Core;
using Chef.Common.Core.Extensions;
using Chef.Common.Types;
using System;

namespace Chef.HRMS.Models.Report;

public class PayrollExcelReportView : Model
{
    public DateTime PayrollProcessDate { get; set; }
    public string EmployeeCode { get; set; }
    public string EmployeeFullName { get; set; }
    public string DesignationName { get; set; }
    public decimal TotalWorkedDays { get; set; }
    public DateTime DateOfJoin { get; set; }
    public decimal EarningsAmt { get; set; }
    public decimal DeductionAmt { get; set; }
    public DepartmentType Department { get; set; }
    public string DepartmentName => EnumExtension.GetDescription(Department);
    public int PayrollComponentId { get; set; }

    public int Month { get; set; }

    public int Year { get; set; }
}

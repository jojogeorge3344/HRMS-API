﻿using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class OverTimePayrollViewModel : Model
{
    public decimal NotHrs { get; set; }
    public decimal HotHrs { get; set; }
    public decimal SotHrs { get; set; }
    public int EmployeeId { get; set; }
    public string EmployeeCode { get; set; }
    public string EmployeeName { get; set; }
    public decimal NotRate { get; set; }
    public decimal HotRate { get; set; }
    public decimal SotRate { get; set; }
    public int ComponentId { get; set; }
    public decimal NotAmount { get; set; }
    public decimal HotAmount { get; set; }
    public decimal SotAmount { get; set; }
    public int OverTimeId { get; set; }

}

﻿namespace Chef.HRMS.Models;

public class FinalSettlementComponetsView
{
    public int OrderNumber { get; set; }
    public int PayrollComponentId { get; set; }
    public string ShortCode { get; set; }
    public string Name { get; set; }
    public LOPCalculationView LOPCalculationView { get; set; }
    public OverTimePayrollViewModel OverTimePayrollViewModel { get; set; }
}

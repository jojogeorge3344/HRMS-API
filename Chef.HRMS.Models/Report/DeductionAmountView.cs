namespace Chef.HRMS.Models.Report
{
    public class DeductionAmountView
    {
        public int EmployeeId { get; set; }
        public int DeductionComponentId { get; set; }
        public string DeductionComponentName { get; set; }
        public decimal DeductionAmt { get; set; }
    }
}

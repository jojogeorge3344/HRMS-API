using Chef.Common.Core;

namespace Chef.HRMS.Models.Report;

public class AddressDetailsReportView : ViewModel
{
    public int EmployeeId { get; set; }
    public string CurrentAddressLine1 { get; set; }
    public string CurrentAddressLine2 { get; set; }
    public int CurrentCountry { get; set; }
    public int CurrentState { get; set; }
    public string CurrentPinCode { get; set; }
    public string PermanentAddressLine1 { get; set; }
    public string PermanentAddressLine2 { get; set; }
    public int PermanentCountry { get; set; }
    public int PermanentState { get; set; }
    public string PermanentPinCode { get; set; }
    public string CurrentCountryName { get; set; }
    public string PermanentCountryName { get; set; }
    public string CurrentStateName { get; set; }
    public string PermanentStateName { get; set; }

}

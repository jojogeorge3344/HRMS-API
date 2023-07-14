using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class LoginEmployeeView : Model
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string EmployeeCode { get; set; }

    public string MiddleName { get; set; }

    public string Email { get; set; }

    public string DisplayName { get; set; }

}

using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class AssetEmployeeViewModel : ViewModel
{
    public string Employeecode { get; set; }

    public string Firstname { get; set; }

    public string Employeenumber { get; set; }

    public int Department { get; set; }


    public int Empid { get; set; }
}

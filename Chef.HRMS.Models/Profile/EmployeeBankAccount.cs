using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

public class EmployeeBankAccount : BankAccount
{
    /// <summary>
    /// Holds the employee id
    /// </summary>
    [ForeignKey("Employee")]
    public int EmployeeId { get; set; }
    /// <summary>
    /// Holds the approved status
    /// </summary>
    [Description("Holds the approved status")]
    public bool IsApproved { get; set; }
}
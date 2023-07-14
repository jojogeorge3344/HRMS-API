using Chef.Common.Core;
using System;
using System.ComponentModel;

namespace Chef.HRMS.Models;

public class EmployeeBonusView : ViewModel
{
    /// <summary>
    /// Holds name of  employee
    /// </summary>
    [Description("Name of employee")]
    public string Name { get; set; }

    /// <summary>
    /// Holds name of  employeeid
    /// </summary>
    [Description("id of employee")]
    public int Employeeid { get; set; }

    /// <summary>
    /// Holds the employee code
    /// </summary>
    [Description("Employee Code")]
    public string EmployeeCode { get; set; }

    /// <summary>
    /// Holds the bonus type
    /// </summary>
    [Description("Bonus type")]
    public string BonusType { get; set; }

    /// <summary>
    /// Holds the bonus type id
    /// </summary>
    [Description("Bonus type id")]
    public int BonusTypeId { get; set; }

    /// <summary>
    /// Holds the disbursal date
    /// </summary>
    [Description("Disbursal date")]
    public DateTime DisburseOn { get; set; }

    /// <summary>
    /// Holds the bonus amount
    /// </summary>
    [Description("Bonus amount")]
    public float Amount { get; set; }

    /// <summary>
    /// Holds the paygroupid of employee
    /// </summary>
    [Description("The paygroupid of employee")]
    public int PaygroupId { get; set; }

    /// <summary>
    /// Holds the description
    /// </summary>
    [Description("Descripation about bonus")]
    public string Remarks { get; set; }

    /// <summary>
    /// Holds the employee bonus id
    /// </summary>
    [Description("Employee bonus id")]
    public int EmployeeBonusId { get; set; }
}

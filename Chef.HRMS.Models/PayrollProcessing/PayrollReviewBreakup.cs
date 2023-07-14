using System.ComponentModel;

namespace Chef.HRMS.Models;

public class PayrollReviewBreakup
{
    /// <summary>
    /// Holds type of  breakup
    /// </summary>
    [Description("Name of type")]
    public string Type { get; set; }

    /// <summary>
    /// Holds name of  breakup
    /// </summary>
    [Description("Name of breakup component")]
    public string Name { get; set; }

    /// <summary>
    /// Holds description about each  component
    /// </summary>
    [Description("Description about each  component")]
    public string Description { get; set; }

    /// <summary>
    /// Holds amount of each type
    /// </summary>
    [Description("Amount of each Type")]
    public float Amount { get; set; }
}

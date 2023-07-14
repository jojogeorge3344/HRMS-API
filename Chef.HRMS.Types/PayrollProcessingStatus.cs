using System.ComponentModel;

namespace Chef.HRMS.Types;

/// <summary>
/// Holds payroll processing status
/// </summary>
public enum PayrollProcessingStatus
{
    [Description("Pending")]
    Pending = 1,

    [Description("Approved")]
    Approved = 2,

    [Description("Processed")]
    Processed = 3
}

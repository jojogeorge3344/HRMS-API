using System.ComponentModel;

namespace Chef.HRMS.Types
{
    /// <summary>
    /// Holds leave status types
    /// </summary>
    public enum RequestStatusType
    {
        [Description("Draft")]
        Draft = 1,

        [Description("Applied")]
        Applied = 2,

        [Description("Pending")]
        Pending = 3,

        [Description("Approved")]
        Approved = 4,

        [Description("Cancelled")]
        Cancelled = 5,

        [Description("Rejected")]
        Rejected = 6,

        [Description("Processed")]
        Processed = 7
    }
}

using Chef.Common.Core;
using System.ComponentModel;

namespace Chef.HRMS.Models
{
    public class Notification : Model
    {
        /// <summary>
        /// Holds the total count of pending request
        /// </summary>
        [Description("Pending request")]
        public int PendingRequest { get; set; }

        /// <summary>
        /// Holds the employee id
        /// </summary>
        [Description("Employee Id")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds the notification type
        /// </summary>
        [Description("Notification type")]
        public string NotificationType { get; set; }
    }
}

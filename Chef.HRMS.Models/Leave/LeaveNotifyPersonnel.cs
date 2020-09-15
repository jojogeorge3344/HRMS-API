using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class LeaveNotifyPersonnel: Model
    {
        /// <summary>
        /// Holds the requested id of work from home
        /// </summary>
        [ForeignKey("Leave")]
        [Description("Leave id")]
        public int LeaveId { get; set; }

        /// <summary>
        /// Holds the details of notified person
        /// </summary>
        [ForeignKey("Employee")]
        [Description("Who all will notify this request")]
        public int NotifyPersonnel { get; set; }
    }
}

using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class WorkFromHomeNotifyPersonnel : Model
    {
        /// <summary>
        /// Holds the requested id of work from home
        /// </summary>
        [ForeignKey("WorkFromHome")]
        [Description("Work from home id")]
        public int WorkFromHomeId { get; set; }

        /// <summary>
        /// Holds the details of notified person
        /// </summary>
        // [ForeignKey("Employee")]
        [Description("Who all will notify this request")]
        public int NotifyPersonnel { get; set; }
    }
}

using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Chef.HRMS.Models
{
    public class LeaveNotificationView : ViewModel
    {
        /// <summary>
        /// Holds the reporting manger id
        /// </summary>
        [Description("Reporting Manager")]
        public int ReportingManager { get; set; }

        /// <summary>
        /// Holds the total count of pending request
        /// </summary>
        [Description("Pending request")]
        public int PendingRequest { get; set; }


    }
}

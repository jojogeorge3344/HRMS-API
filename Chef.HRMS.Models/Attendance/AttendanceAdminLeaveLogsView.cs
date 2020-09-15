using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models
{
    public class AttendanceAdminLeaveLogsView : Model
    {
        /// <summary>
        /// Holds employee id
        /// </summary>
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds employee name
        /// </summary>
        public string EmployeeName { get; set; }

        /// <summary>
        /// Holds leave applied date
        /// </summary>
        public DateTime AppliedDate { get; set; }

        /// <summary>
        /// Holds department
        /// </summary>
        public int Department { get; set; }

        /// <summary>
        /// Holds leave from date
        /// </summary>
        public DateTime FromDate { get; set; }

        /// <summary>
        /// Holds leave to date
        /// </summary>
        public DateTime ToDate { get; set; }

        /// <summary>
        /// Holds reason for leave
        /// </summary>
        public string Reason { get; set; }

        /// <summary>
        /// Holds type of leave
        /// </summary>
        public string LeaveType { get; set; }

        /// <summary>
        /// Holds leave type id
        /// </summary>
        public string LeaveTypeId { get; set; }

        /// <summary>
        /// Holds today's leave count
        /// </summary>
        public int OnLeaveToday { get; set; }
    }
}

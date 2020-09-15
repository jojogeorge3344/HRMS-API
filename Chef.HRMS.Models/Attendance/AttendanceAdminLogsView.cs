using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models
{
    public class AttendanceAdminLogsView : Model
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
        /// Holds attendance date
        /// </summary>
        public DateTime Date { get; set; }

        /// <summary>
        /// Holds department
        /// </summary>
        public int Department { get; set; }

        /// <summary>
        /// Holds clock in time
        /// </summary>
        public DateTime ClockIn { get; set; }

        /// <summary>
        /// Holds clock out time
        /// </summary>
        public DateTime ClockOut { get; set; }

        /// <summary>
        /// Holds type of attendance
        /// </summary>
        public string AttendanceType { get; set; }
    }
}

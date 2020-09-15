using Chef.Common.Core;

namespace Chef.HRMS.Models
{
    public class EmployeeAttendanceViewModel : ViewModel
    {
        /// <summary>
        /// Type of attendance, leave etc
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// Count of total days, total attendance, total leave etc
        /// </summary>
        public int TotalCount { get; set; }
    }
}

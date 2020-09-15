using Chef.Common.Core;

namespace Chef.HRMS.Models
{
    public class LeaveAndAttendanceViewModel : Model 
    {
        public int EmployeeId { get; set; }

        public string EmployeeCode { get; set; }

        public string EmployeeName { get; set; }

        public int NumberOfWorkingDays { get; set; }

        public int NumberOfWorkedDays { get; set; }

        public int LeaveApplied { get; set; }

        public int ApprovedLeaves { get; set; }

        public int UnapprovedLeaves { get; set; }

        public int Lop { get; set; }

        public int UnmarkedAttendance { get; set; }

        public int NumberOfHolidays { get; set; }

        public int weekoff { get; set; }
    }
}

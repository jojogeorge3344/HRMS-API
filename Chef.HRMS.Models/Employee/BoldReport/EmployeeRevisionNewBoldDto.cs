using Chef.Common.Types;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class EmployeeRevisionNewBoldDto
    {
        public string LeaveStructureNew { get; set; }
        public string ShiftNew { get; set; }
        public Chef.HRMS.Types.WeekOff WeekOffNew { get; set; }//enum
        public string HolidayListNew { get; set; }
        public string EOSTypeNew { get; set; }
        public string DesignationNew { get; set; }
        public DepartmentType DepartmentNew { get; set; }
        public int WorkerTypeNew { get; set; }//enum
        public TimeType TimeTypeNew { get; set; }
        public AttendanceTrackingType AttendanceTrackingNew { get; set; }
        public string PayrollStructureNew { get; set; }
        public string PayGroupNew { get; set; }
        public string OverTimePolicyNew { get; set; }
    }
}

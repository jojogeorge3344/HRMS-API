using Chef.Common.Types;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class EmployeeRevisionBoldDto
    {
        //Header
        public string EmployeeName{ get; set; }
        public DateTime EffectiveFrm { get; set; }
        public string Remark { get; set; }
        public string ReqNum { get; set; }
        public string RequestedBy { get; set; }
        public DateTime ReqDate { get; set; }

        //OldValue
        public string LeaveStructure { get; set; }
        public string Shift{ get; set; }
        public Chef.HRMS.Types.WeekOff WeekOff { get; set; }//enum
        public string HolidayList{ get; set; }
        public string EOSType { get; set; }
        public string Designation { get; set; }
        public DepartmentType Department { get; set; }
        public int WorkerType { get; set; }//enum
        public TimeType TimeType { get; set; }
        public AttendanceTrackingType AttendanceTracking { get; set; }
        public string PayrollStructure { get; set; }
        public string PayGroup { get; set; }
        public string OverTimePolicy { get; set; }

        //string

        public DateTime EffectiveFrmed { get; set; }
        public DateTime ReqDated { get; set; }

        //New
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

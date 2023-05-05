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
        public int WeekOff { get; set; }//enum
        public string HolidayList{ get; set; }
        public string EOSType { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public int WorkerType { get; set; }//enum
        public int TimeType { get; set; }
        public string AttendanceTracking { get; set; }
        public string PayrollStructure { get; set; }
        public string PayGroup { get; set; }
        public string OverTimePolicy { get; set; }

        //string

        public DateTime EffectiveFrmed { get; set; }
        public DateTime ReqDated { get; set; }
    }
}

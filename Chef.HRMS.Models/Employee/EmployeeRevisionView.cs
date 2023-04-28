using Chef.Common.Core;
using Chef.Common.Types;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace Chef.HRMS.Models
{
    public class EmployeeRevisionView : ViewModel
    {
        public int EmployeeId { get; set; }
        public int LeaveStructureId { get; set; }
        public int ShiftId { get; set; }
        public int WeekOff { get; set; }
        public string LeaveStructureName { get; set; }
        public string ShiftName { get; set; }
        public string HolidayCategoryName { get; set; }
        public int EosId { get; set; }
        public string BFCode { get; set; }
        public string BFName { get; set; }
        public string DesignationName { get; set; }
        public DepartmentType Department { get; set; }
        public TimeType TimeType { get; set; }
        public WorkerType WorkerType { get; set; }
        public AttendanceTrackingType AttendanceTracking { get; set; }
        public int PayrollStructureId { get; set; }
        public string PayrollStructureName { get; set; }
        public int PayGroupId { get; set; }
        public string PayGroupName { get; set;}
        public int OverTimePolicyId { get; set; }
        public string OverTimePolicyName { get;}

    }
}

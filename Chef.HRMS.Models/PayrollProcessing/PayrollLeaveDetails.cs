using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class PayrollLeaveDetails : Model
    {
        public int PayrollProcessId { get; set; }
        public DateTime PayrollProcessDate { get; set; }
        public int EmployeeId { get; set; }
        public int LeaveId { get; set; }
        public decimal TotalNumOfWorkDays { get; set; }
        public decimal TotalNumOfWorkingDays { get; set; }
        public decimal ApprovedLeave { get; set; }
        public decimal UnApprovedLeave { get; set; }
        public decimal UnMarkedAttendance { get; set; }
        public decimal LOPDays { get; set; }
        public int ProcessStatus { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public int LeaveComponentId { get; set;}
    }
}

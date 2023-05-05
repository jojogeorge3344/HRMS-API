using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Chef.Common.Core;
using Chef.Common.Types;
using Chef.HRMS.Types;

namespace Chef.HRMS.Models
{
    [Table("employeerevision")]
    public class EmployeeRevision : Model
    {
        public string ReqNum { get; set; }

        public DateTime ReqDate { get; set; }

        public int EmployeeId { get; set; }

        public DateTime EffectiveFrm { get; set; }

        public EmployeeRevisionStatus RevStatus { get; set; }

        public int JobTitleId { get; set; }

        public int DepartmentId { get; set; }

        public int WorkerType { get; set; }

        public int TimeType { get; set; }

        public int LeavesStructureId { get; set; }

        public int ShiftId { get; set; }

        public int WeekOff { get; set; }

        public int HolidayCategoryId { get; set; }

        public int AttendanceTrackingId { get; set; }

        public int PayGroupId { get; set; }
         
        public int PayrollStructureId { get; set; }

        public int OverTimePolicyId { get; set; }

        public int EOSId { get; set; }

        public string Remark { get; set; }
        public int RequestedBy { get; set; }

        public List<EmployeeRevisionOld> EmployeeRevisionsOldList { get; set; }
    }
}
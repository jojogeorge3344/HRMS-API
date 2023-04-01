using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class LeaveEligibility : Model
    {
        public string LeaveCode { get; set; }
        public string LeaveDescription { get; set; }
        public int EligibleDays { get; set; }
        public int EligibilityBase { get; set; }
        public int MaxLeaveAtATime { get; set; }
        public string VacationSalaryFormula { get; set; }
        public string EncashBFCode { get; set; }
        public int EncashLimitDays { get; set; }
        public int CFLimitDays { get; set; }
        public BaseType BaseType { get; set; }
        public bool IncludeLOPDays { get; set; }
        public LeaveType LeaveType { get; set; }
        public LeaveCutOffType LeaveCutOffType { get; set; }
        public bool AccrueLeaveAmt { get; set; }
        public bool Encash { get; set; }
        public bool CarryForward { get; set; }
        public int PayrollComponentId { get; set; }
    }
}

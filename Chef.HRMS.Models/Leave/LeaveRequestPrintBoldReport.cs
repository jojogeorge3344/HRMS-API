using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class LeaveRequestPrintBoldReport
    {
        public string EmployeeName { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string RequestedBy { get; set; }
        public DateTime RequestedOn { get; set; }
        public string LeaveName { get; set; }
        public decimal NumberOfDays { get; set; }
        public DateTime RejoinDate { get; set; }
        public string ApprovedBy { get; set; }
        public string Description { get; set; }
        public string PreparedBy { get; set; }
        public string LeaveType { get; set; }
        //String
        public string FromDated { get; set; }
        public string ToDated { get; set; }
        public string RequestedOned { get; set; }

        public string RejoinDated { get; set; }

    }
}

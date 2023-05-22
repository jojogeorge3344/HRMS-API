using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class LeaveAccrualSummary : Model
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public DateTime AccrualDate { get; set; }
        public int LeaveId { get; set; }
        public int AccrualDays { get; set; }
        public Decimal AccrualAmount { get; set; }
    }
}

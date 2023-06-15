using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models.PayrollProcessing
{
    public class TicketAccrualSummary : Model
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }

        public DateTime AccrualDate { get; set; }
        public decimal AccrualDays { get; set; }
        public decimal AccrualAmount { get; set; }
        public decimal AvailDays { get; set; }
        public decimal AvailAmount { get; set; }

    }
}

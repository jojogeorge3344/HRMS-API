using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models.PayrollProcessing
{
    public class TicketAccrual : Model
    {
        public int Id { get; set; }

        public int EmployeeId { get; set; }

        public DateTime AccrualDate { get; set; }
        public decimal AccrualDays { get; set; }
        public decimal AccrualAmount { get; set; }

        public int AccrualStatus { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public string EmployeeCode { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public string EmployeeName { get; set; }
    }
}

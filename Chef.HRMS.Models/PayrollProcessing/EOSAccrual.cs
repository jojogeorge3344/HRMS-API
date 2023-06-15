using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models.PayrollProcessing
{
    public class EOSAccrual : Model
    {
        public int Id { get; set; }

        public int EmployeeId { get; set; }

        public DateTime AccrualDate { get; set; }

        public decimal AccrualDays { get; set; }

        public decimal AccrualAmount { get; set; }

        public decimal AvailDays { get; set; }

        public decimal AvailAmount { get; set; }

        public int AccrualStatus { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public string EmployeeCode { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public string EmployeeName { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public decimal EligibilityPerDay { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public LeaveCutOffType LeaveCutOffType { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public bool IsIncludeLOPDays { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public decimal WorkingdaysInCalMonth { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public decimal WorkeddaysInCalMonth { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public decimal LopDaysInCalMonth { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public decimal EligibleDays { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public decimal EligibilityBase { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public int MonthlyAmount { get; set; }

        public int PayrollProcessingId { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public bool IsRetrospectiveAccrual { get; set; }

    }
}

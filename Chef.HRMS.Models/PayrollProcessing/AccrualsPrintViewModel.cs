﻿using Chef.Common.Core;
using Chef.HRMS.Models.PayrollProcessing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class AccrualsPrintViewModel : ViewModel
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public decimal LeaveAccrualDays { get; set; }
        public decimal LeaveAccrualAmount { get; set; }
        public decimal EOSAccrualDays { get; set; }
        public decimal EOSAccrualAmount { get; set; }
        public decimal TicketAccrualDays { get; set; }
        public decimal TicketAccrualAmount { get; set; }
        public int PayrollProcessId { get;set; }
        public int PaygroupId { get; set; }
    }
}
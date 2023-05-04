﻿using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class LoanPrintHeaderBoldReport
    {
        public int EmployeeID { get; set; }
        public int EMIStartsFromYear { get; set; }
        public decimal LoanAmount { get; set; }
        public LoanType LoanType { get; set; }
        public int EMIStartsFromMonth { get; set; }

    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class PayrollMonth
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public int ProcessingDay { get; set; }
        public int TimeSheetCutOff { get; set; }
        public int LeaveCutOff { get; set; }
    }
}
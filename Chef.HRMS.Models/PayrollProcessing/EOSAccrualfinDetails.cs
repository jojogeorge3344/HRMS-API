﻿using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models.PayrollProcessing
{
    public class EOSAccrualfinDetails : ViewModel
    {
        public int Id { get; set; }
        public int EosAccrualDetailsId { get; set; }
        public decimal EosAccrualAmount { get; set; }
        public decimal DrAccount { get; set; }
        public decimal CrAccount { get; set; }
        public string Docnum { get; set; }
    }
}

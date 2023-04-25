﻿using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class EndOfService : Model
    {
        public string BFCode { get; set; }
        public string BFName { get; set; }
        public bool RetrospectiveAccrual { get; set; }
        public bool IncludeLOPDays { get; set; }
        public bool IncludeProbationDays { get; set; }
        public string IncludedBenefits { get; set; }
        public int EmployeeEOSAccrualType { get; set; }
        public int EmployeeEOSpaymentType { get; set; }
        public int BenefitTypeId { get; set; }
    }
}
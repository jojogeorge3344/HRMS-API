﻿using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models.BenefitCategory
{
    public class BenefitCategory : Model
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
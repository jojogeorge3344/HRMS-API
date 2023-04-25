﻿using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class Category : Model
    {
        //[Required]
        //[StringLength(128)]
        public string Name { get; set; }

        //[Required]
        //[StringLength(32)]
        public string Code { get; set; }
        public bool Status { get; set; }
    }
}
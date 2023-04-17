﻿using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class UserVariable : Model
    {
        //[Required]
        //[StringLength(128)]
        public string Name { get; set; }
        public string Code { get; set; }
        public bool Status { get; set; }
        public UserVariableType Type { get; set; }
    }
}

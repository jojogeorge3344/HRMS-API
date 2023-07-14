﻿using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class Religion : Model
{
    //[Required]
    //[StringLength(128)]
    public string Name { get; set; }

    //[Required]
    //[StringLength(32)]
    public string Code { get; set; }
    public bool Status { get; set; }

}

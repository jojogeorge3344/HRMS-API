using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class PayslipSettingDetails : Model
    {
        public int PayslipSettingId { get; set; }
        public int PayrollComponentId { get; set; }
    }
}

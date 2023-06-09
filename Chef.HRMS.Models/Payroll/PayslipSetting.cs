using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class PayslipSetting : Model
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public int StructureId { get; set; }
        public int PayslipOrderNumber { get; set; }
        public bool IsActive { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public List<PayslipSettingDetails> PayslipSettingDetails { get; set; }
    }
}

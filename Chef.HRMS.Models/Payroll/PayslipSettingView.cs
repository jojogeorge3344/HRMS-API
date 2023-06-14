using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class PayslipSettingView : ViewModel
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int PayslipOrderNumber { get; set; }
        public bool IsActive { get; set; }
        public int PayslipSettingDetailsId { get; set; }
        public int PayrollComponentId { get; set; }
        public string PayrollComponentCode { get; set; }
        public string PayrollComponentName { get; set; }
        public int StructureId { get; set; }
        public string PayrollStructureName { get; set; }
    }
}

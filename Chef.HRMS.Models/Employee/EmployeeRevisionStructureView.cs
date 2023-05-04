using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class EmployeeRevisionStructureView : ViewModel
    {
        public int PayrollStructureId { get; set; }
        public string PayrollStructureCode { get; set; }
        public string PayrollStructureName { get; set; }
        public int PayrollComponentId { get; set; }
        public string PayrollComponentCode { get; set; }
        public string PayrollComponentName { get; set; }
        public int MaximumLimit { get; set; }
    }
}
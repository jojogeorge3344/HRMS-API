using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class EmployeeRevisionSalaryView : ViewModel
    {
        public int PayrollComponentId { get; set; }
        public string ShortCode { get; set; }
        public string Name { get; set; }
        public string Formula { get; set; }
        public int MaximumLimit { get; set; }
    }
}

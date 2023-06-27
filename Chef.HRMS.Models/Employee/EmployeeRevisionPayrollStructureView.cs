using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class EmployeeRevisionPayrollStructureView : ViewModel
    {
        public int PayrollComponentId { get; set; }
        public string ShortCode { get; set; }
        public string Name { get; set; }
        public string Formula { get; set; }
        public double MonthlyAmount { get; set; }
        public int PayrollCalculationId { get; set; }
        public double MaximumLimit { get; set; }
    }
}
using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class LoanDetailReportView : ViewModel
    {
        public string Name { get; set; }
        public int NormalOverTime { get; set; }
        public int HolidayOverTime { get; set; }
        public int SpecialOverTime { get; set; }
        public int ValueVariable { get; set; }
        public int MonthlyAmount { get; set;}
    }
}

using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models.Report
{
    public class PayrollComponentExcelReportView : Model
    {
        public int PayrollComponentId { get; set; }
        public string PayrollComponentCode { get; set; }
    }
}

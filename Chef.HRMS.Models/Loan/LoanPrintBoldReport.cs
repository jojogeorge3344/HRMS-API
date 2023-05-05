using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class LoanPrintBoldReport
    {
        public string LoanNumber { get; set; }
        public string NAME { get; set; }
        public int EmployeeID { get; set; }
        public int EMIStartsFromYear { get; set; }
        public decimal LoanAmount { get; set; }
        public string Comments { get; set; }
        public LoanType LoanType { get; set; }
        public int EMIStartsFromMonth { get; set; }

        public int EMIStartsYear { get; set; }
        public int EMIStartsMonth { get; set; }
        public string IsApproved { get; set; }

    }
}

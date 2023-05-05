using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models.Employee
{
    public class EmployeeRevisionDTO
    {
        public EmployeeRevision employeeRevision { get; set; }
        public EmployeeRevisionOld employeeRevisionsOld { get; set; }
    }
}

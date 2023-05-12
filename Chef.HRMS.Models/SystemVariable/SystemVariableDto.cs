using Chef.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class SystemVariableDto
    {
        public int SystemVariableId { get; set; }
        public int EmployeeId { get; set; }
        public int TransValue { get; set; }
    }
}

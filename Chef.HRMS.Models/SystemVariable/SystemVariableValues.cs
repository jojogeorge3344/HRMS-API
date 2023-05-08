using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class SystemVariableValues
    {
        public int Id { get; set; }

        public int SystemVariableId { get; set; }

        public int EmployeeId { get; set; }

        public DateTime TransDate { get; set; }

        public Decimal TransValue { get; set; }

        public int Status { get; set; }

        public int PayrollProcessId { get; set; }


    }
}

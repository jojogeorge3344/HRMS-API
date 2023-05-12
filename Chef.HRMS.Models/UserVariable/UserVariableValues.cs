using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class UserVariableValues : Model
    {
        public int UserVariableId { get; set; }

        public int Type { get; set; }

        public DateTime TransDate { get; set; }

        public int TransValue { get; set; }

        public EmployeeRevisionStatus Status { get; set; }

        public string Remarks { get; set; }
        public int EmployeeId { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public string Name { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public string Code { get; set; }
    }
}

using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class OvertimeViewModel : ViewModel
    {
        public int OvertimeId { get; set; }

        public int NotifyPersonnel { get; set; }

        //public int EmployeeId { get; set; }
        public string FirstName { get; set; }

    }
}

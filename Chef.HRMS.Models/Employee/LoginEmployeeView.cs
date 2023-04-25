using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class LoginEmployeeView :Model
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string EmployeeCode { get; set; }

        public string MiddleName { get; set; }

        public string Email { get; set; }

        public string DisplayName { get; set; }

    }
}

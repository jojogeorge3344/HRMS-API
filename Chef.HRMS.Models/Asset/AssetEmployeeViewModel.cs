using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class AssetEmployeeViewModel: ViewModel
    {
        public string Employeecode { get; set; }
   
        public string Firstname { get; set; }
      
        public string Employeenumber { get; set; }
       
        public int Department { get; set; }

      
        public int Empid { get; set; }
    }
}

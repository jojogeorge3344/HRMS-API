using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IDepartmentService : IAsyncService<Chef.HRMS.Models.Departments>
{
        Task<bool> IsDepartmentCodeExist(string code);
    }
}

using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.Departments
{
    public class DepartmentService : AsyncService<Chef.HRMS.Models.Departments>, IDepartmentService
    {
        private readonly IDepartmentRepository departmentRepository;

        public DepartmentService(IDepartmentRepository departmentRepository)
        {
            this.departmentRepository = departmentRepository;
        }

        public async Task<bool> IsDepartmentCodeExist(string code)
        {
            return await departmentRepository.IsDepartmentCodeExist(code);
        }
    }
}

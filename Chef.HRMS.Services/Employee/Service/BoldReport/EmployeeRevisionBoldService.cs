using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EmployeeRevisionBoldService: BaseService, IEmployeeRevisionBoldService
    {
        private readonly IEmployeeRevisionBoldReportRepository employeeRevisionBoldReportRepository;
        public EmployeeRevisionBoldService(IEmployeeRevisionBoldReportRepository employeeRevisionBoldReportRepository)
        {
            this.employeeRevisionBoldReportRepository = employeeRevisionBoldReportRepository;
        }

        public async Task<IEnumerable<EmployeeRevisionBoldDto>> GetemployeeOldDetailsAsync(int id)
        {
            var result = await employeeRevisionBoldReportRepository.GetemployeeOldDetailsAsync(id);
            return result;
        }

    }
}

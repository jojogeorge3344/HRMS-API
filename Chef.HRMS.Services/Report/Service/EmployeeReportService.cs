using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EmployeeReportService : AsyncService<EmployeeDetailView>, IEmployeeReportService
    {
        private readonly IEmployeeReportRepository employeeReportRepository;

        public EmployeeReportService(IEmployeeReportRepository employeeReportRepository)
        {
            this.employeeReportRepository = employeeReportRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<EmployeeDetailView>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<EmployeeDetailView>> GetAllEmployeeDetailView(int offSet)
        {
            return await employeeReportRepository.GetAllEmployeeDetailView(offSet);
        }

        public Task<EmployeeDetailView> GetAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<EmployeeDetailView> InsertAsync(EmployeeDetailView obj)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateAsync(EmployeeDetailView obj)
        {
            throw new NotImplementedException();
        }
    }
}

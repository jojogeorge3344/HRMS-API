using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EmployeeNumberSeriesServices : AsyncService<EmployeeNumberSeries>, IEmployeeNumberSeriesServices
    {
        private readonly IEmployeeNumberSeriesRepository employeeNumberSeriesRepository;

        public EmployeeNumberSeriesServices(IEmployeeNumberSeriesRepository employeeNumberSeriesRepository)
        {
            this.employeeNumberSeriesRepository = employeeNumberSeriesRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await employeeNumberSeriesRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<EmployeeNumberSeries>> GetAllActiveNumberSeries()
        {
            return await employeeNumberSeriesRepository.GetAllActiveNumberSeries();
        }

        public async Task<IEnumerable<int>> GetAllAssignedNumberSeries()
        {
            return await employeeNumberSeriesRepository.GetAllAssignedNumberSeries();
        }

        public async Task<IEnumerable<EmployeeNumberSeries>> GetAllAsync()
        {
            return await employeeNumberSeriesRepository.GetAllAsync();
        }

        public async Task<EmployeeNumberSeries> GetAsync(int id)
        {
            return await employeeNumberSeriesRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(EmployeeNumberSeries employeeNumberSeries)
        {
            return await employeeNumberSeriesRepository.InsertAsync(employeeNumberSeries);
        }

        public async Task<int> UpdateAsync(EmployeeNumberSeries employeeNumberSeries)
        {
            return await employeeNumberSeriesRepository.UpdateAsync(employeeNumberSeries);
        }
    }
}
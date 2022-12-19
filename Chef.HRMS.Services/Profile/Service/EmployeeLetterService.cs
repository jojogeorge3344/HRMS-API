using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EmployeeLetterService : AsyncService<EmployeeLetter>, IEmployeeLetterService
    {
        private readonly IEmployeeLetterRepository employeeLetterRepository;

        public EmployeeLetterService(IEmployeeLetterRepository employeeLetterRepository)
        {
            this.employeeLetterRepository = employeeLetterRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await employeeLetterRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<EmployeeLetter>> GetAllAsync()
        {
            return await employeeLetterRepository.GetAllAsync();
        }

        public async Task<EmployeeLetter> GetAsync(int id)
        {
            return await employeeLetterRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(EmployeeLetter employeeLetter)
        {
            return await employeeLetterRepository.InsertAsync(employeeLetter);
        }

        public async Task<int> UpdateAsync(EmployeeLetter employeeLetter)
        {
            return await employeeLetterRepository.UpdateAsync(employeeLetter);
        }
    }
}
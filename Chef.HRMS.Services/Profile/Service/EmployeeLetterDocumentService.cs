using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EmployeeLetterDocumentService : AsyncService<EmployeeLetterDocument>, IEmployeeLetterDocumentService

    {
        private readonly IEmployeeLetterDocumentRepository employeeLetterDocumentRepository;

        public EmployeeLetterDocumentService(IEmployeeLetterDocumentRepository employeeLetterDocumentRepository)
        {
            this.employeeLetterDocumentRepository = employeeLetterDocumentRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await employeeLetterDocumentRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<EmployeeLetterDocument>> GetAllAsync()
        {
            return await employeeLetterDocumentRepository.GetAllAsync();
        }

        public async Task<EmployeeLetterDocument> GetAsync(int id)
        {
            return await employeeLetterDocumentRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(EmployeeLetterDocument employeeLetterDocument)
        {
            return await employeeLetterDocumentRepository.InsertAsync(employeeLetterDocument);
        }

        public async Task<int> UpdateAsync(EmployeeLetterDocument employeeLetterDocument)
        {
            return await employeeLetterDocumentRepository.UpdateAsync(employeeLetterDocument);
        }
    }
}

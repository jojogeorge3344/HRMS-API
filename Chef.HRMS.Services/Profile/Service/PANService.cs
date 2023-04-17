using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PANService : AsyncService<PAN>, IPANService
    {
        private readonly IPANRepository panRepository;

        public PANService(IPANRepository panRepository)
        {
            this.panRepository = panRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            return panRepository.DeleteAsync(id);
        }

        public Task<IEnumerable<PAN>> GetAllAsync()
        {
            return panRepository.GetAllAsync();
        }

        public Task<PAN> GetAsync(int id)
        {
            return panRepository.GetAsync(id);
        }

        public Task<IEnumerable<PANView>> GetByEmployeeId(int employeeId)
        {
            return panRepository.GetByEmployeeId(employeeId);
        }

        public Task<int> InsertAsync(PAN pan)
        {
            return panRepository.InsertAsync(pan);
        }

        public Task<int> UpdateAsync(PAN pan)
        {
            return panRepository.UpdateAsync(pan);
        }
    }
}
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class TenantService : ITenantService
    {
        private readonly ITenantRepository tenantRepository;

        public TenantService(ITenantRepository tenantRepository)
        {
            this.tenantRepository = tenantRepository;
        }

        public void CreateDatabase()
        {
            this.tenantRepository.CreateDatabase();
        }

        public void CreateSchemas()
        {
            this.tenantRepository.CreateSchemas();
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public HRMSTenant Get()
        {
            return this.tenantRepository.Get();
        }

        public Task<IEnumerable<HRMSTenant>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<HRMSTenant> GetAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<HRMSTenant> InsertAsync(HRMSTenant obj)
        {
            throw new System.NotImplementedException();
        }

        public Task<int> UpdateAsync(HRMSTenant obj)
        {
            throw new System.NotImplementedException();
        }
    }
}
using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class RoleService : AsyncService<Role>, IRoleService
    {
        private readonly IRoleRepository roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            this.roleRepository = roleRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await roleRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await roleRepository.GetAllAsync();
        }

        public async Task<Role> GetAsync(int id)
        {
            return await roleRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(Role role)
        {
            return await roleRepository.InsertAsync(role);
        }

        public async Task<int> UpdateAsync(Role role)
        {
            return await roleRepository.UpdateAsync(role);
        }
    }
}
using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PayGroupService : AsyncService<PayGroup>, IPayGroupService
    {
        private readonly IPayGroupRepository payGroupRepository;

        public PayGroupService(IPayGroupRepository payGroupRepository)
        {
            this.payGroupRepository = payGroupRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await payGroupRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<int>> GetAllAssignedPayGroup()
        {
            return await payGroupRepository.GetAllAssignedPayGroup();
        }

        public async Task<IEnumerable<PayGroup>> GetAllAsync()
        {
            return await payGroupRepository.GetAllAsync();
        }

        public async Task<IEnumerable<EmployeeView>> GetAllEmployeeByPayGroupId(int paygroupId, int year, int month)
        {
            return await payGroupRepository.GetAllEmployeeByPayGroupId(paygroupId, year, month);
        }

        public async Task<PayGroup> GetAsync(int id)
        {
            return await payGroupRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(PayGroup payGroup)
        {
            return await payGroupRepository.InsertAsync(payGroup);
        }

        public async Task<int> UpdateAsync(PayGroup payGroup)
        {
            return await payGroupRepository.UpdateAsync(payGroup);
        }
    }
}

using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class OverTimePolicySlabService : AsyncService<OverTimeSlab>,IOverTimePolicySlabService
    {
        private readonly IOverTimePolicySlabRepository overTimePolicySlabRepository;

        public OverTimePolicySlabService(IOverTimePolicySlabRepository overTimePolicySlabRepository)
        {
            this.overTimePolicySlabRepository = overTimePolicySlabRepository;
        }

        public async Task<IEnumerable<BenefitTypes>> GetOverTimeBenefitTypes()
        {
           return await overTimePolicySlabRepository.GetOverTimeBenefitTypes();
        }

        public async Task<IEnumerable<OverTimeSlab>> GetOverTimeComponentDetails(int overtimepolicyid)
        {
            return await overTimePolicySlabRepository.GetOverTimeComponentDetails(overtimepolicyid);
        }

        public async Task<bool> IsOverTimePolicyCodeExist(string code)
        {
            return await overTimePolicySlabRepository.IsOverTimePolicyCodeExist(code);
        }
    }
}

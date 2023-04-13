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

        public async Task<bool> IsOverTimePolicyNameExist(string name)
        {
            return await overTimePolicySlabRepository.IsOverTimePolicyNameExist(name);
        }
    }
}

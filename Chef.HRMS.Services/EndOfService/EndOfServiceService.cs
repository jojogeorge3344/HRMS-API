using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EndOfServiceService : AsyncService<EndOfService>, IEndOfServiceService
    {
        private readonly IEndOfServiceRepository endOfServiceRepository;

        public EndOfServiceService(IEndOfServiceRepository endOfServiceRepository)
        {
            this.endOfServiceRepository = endOfServiceRepository;
        }

        public async Task<IEnumerable<BenefitTypes>> GetComponentType()
        {
            return await endOfServiceRepository.GetComponentType();
        }
    }
}

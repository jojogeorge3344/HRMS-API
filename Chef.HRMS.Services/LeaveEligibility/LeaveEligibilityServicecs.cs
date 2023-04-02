using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LeaveEligibilityServicecs : AsyncService<LeaveEligibility>, ILeaveEligibilityService
    {
        private readonly ILeaveEligibilityRepository leaveEligibilityRepository;

        public LeaveEligibilityServicecs(ILeaveEligibilityRepository leaveEligibilityRepository)
        {
            this.leaveEligibilityRepository = leaveEligibilityRepository;
        }

        public async Task<IEnumerable<LeaveEligibility>> GetLeaveConfiguration(int id)
        {
            return await leaveEligibilityRepository.GetLeaveConfiguration(id);
        }
    }
}

using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LeaveSlabService : AsyncService<LeaveSlab>, ILeaveSlabService
    {
        private readonly ILeaveSlabRepository leaveSlabRepository;

        public LeaveSlabService(ILeaveSlabRepository leaveSlabRepository)
        {
            this.leaveSlabRepository = leaveSlabRepository;
        }

        public async Task<IEnumerable<LeaveSlab>> GetLeaveComponentDetails(int leavecomponentid)
        {
            return await leaveSlabRepository.GetLeaveComponentDetails(leavecomponentid);
        }
    }
}

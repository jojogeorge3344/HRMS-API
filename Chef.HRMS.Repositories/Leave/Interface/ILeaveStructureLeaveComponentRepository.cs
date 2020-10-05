﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ILeaveStructureLeaveComponentRepository : IGenericRepository<LeaveStructureLeaveComponent>
    {
        
        Task<int> DeleteAsync(LeaveStructureLeaveComponent leaveStructureLeaveComponent);

        Task<IEnumerable<LeaveStructureLeaveComponent>> GetAllAsync(int leaveStructureId);

        Task<int> UpdateAsync(int leaveStructureId, IEnumerable<LeaveStructureLeaveComponent> leaveStructureLeaveComponents);
        Task<int> InsertAsync(int leaveStructureId, IEnumerable<LeaveStructureLeaveComponent> leaveStructureLeaveComponents, IEnumerable<LeaveStructureLeaveComponent> removeLeaveStructureLeaveComponents);
    }
}
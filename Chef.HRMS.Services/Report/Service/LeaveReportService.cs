using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LeaveReportService : AsyncService, ILeaveReportService
    {
        private readonly ILeaveReportRepository leaveReportRepository;

        public LeaveReportService(ILeaveReportRepository leaveReportRepository)
        {
            this.leaveReportRepository = leaveReportRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<LeaveReportView>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<LeaveReportView>> GetLeaveReportDetails(int offSet)
        {
            return await leaveReportRepository.GetLeaveReportDetails(offSet);
        }

        public Task<LeaveReportView> GetAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<LeaveReportView> InsertAsync(LeaveReportView obj)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateAsync(LeaveReportView obj)
        {
            throw new NotImplementedException();
        }
    }
}

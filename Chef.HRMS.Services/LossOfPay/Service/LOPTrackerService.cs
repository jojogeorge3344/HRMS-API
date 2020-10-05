﻿using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LOPTrackerService : AsyncService, ILOPTrackerService
    {
        private readonly ILOPTrackerRepository lopTrackerRepository;

        public LOPTrackerService(ILOPTrackerRepository lopTrackerRepository)
        {
            this.lopTrackerRepository = lopTrackerRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await lopTrackerRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<LOPTracker>> GetAllAsync()
        {
            return await lopTrackerRepository.GetAllAsync();
        }

        public async Task<LOPTracker> GetAsync(int id)
        {
            return await lopTrackerRepository.GetAsync(id);
        }

        public async Task<LossOfPayView> GetLossOfPayDeductionByEmployee(int employeeId, int payrollProcessingMethodId)
        {
            return await lopTrackerRepository.GetLossOfPayDeductionByEmployee(employeeId, payrollProcessingMethodId);
        }

        public async Task<LOPTracker> InsertAsync(LOPTracker lopTracker)
        {
            return await lopTrackerRepository.InsertAsync(lopTracker);
        }

        public async Task<int> UpdateAsync(LOPTracker lopTracker)
        {
            return await lopTrackerRepository.UpdateAsync(lopTracker);
        }
    }
}
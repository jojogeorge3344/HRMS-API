using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class BulkUploadService : AsyncService<Leave>, IBulkUploadService
    {
        private readonly IBulkUploadRepository bulkUploadRepository;

        public BulkUploadService(IBulkUploadRepository bulkUploadRepository)
        {
            this.bulkUploadRepository = bulkUploadRepository;
        }

        public async Task<int> BulkInsertLeave(IEnumerable<Leave> leave)
        {
            return await bulkUploadRepository.BulkInsertLeave(leave);
        }

        public async Task<int> BulkInsertOnduty(IEnumerable<OnDuty> onDuty)
        {
            return await bulkUploadRepository.BulkInsertOnduty(onDuty);
        }

        public async Task<int> BulkInsertRegularLogin(IEnumerable<RegularLogin> regularLogin)
        {
            return await bulkUploadRepository.BulkInsertRegularLogin(regularLogin);
        }

        public async Task<int> BulkInsertWorkFromHome(IEnumerable<WorkFromHome> workFromHome)
        {
            return await bulkUploadRepository.BulkInsertWorkFromHome(workFromHome);
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Leave>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Leave> GetAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Leave> InsertAsync(Leave obj)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateAsync(Leave obj)
        {
            throw new NotImplementedException();
        }
    }
}

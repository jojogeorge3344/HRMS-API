using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class ProcessedSalaryReportService : AsyncService, IProcessedSalaryReportService
    {
        private readonly IProcessedSalaryReportRepository processedSalaryReportRepository;

        public ProcessedSalaryReportService(IProcessedSalaryReportRepository processedSalaryReportRepository)
        {
            this.processedSalaryReportRepository = processedSalaryReportRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ProcessedSalaryDetailsView>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ProcessedSalaryDetailsView>> GetProcessedSalaryDetails(int offSet)
        {
            return await processedSalaryReportRepository.GetProcessedSalaryDetails(offSet);
        }

        public Task<ProcessedSalaryDetailsView> GetAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ProcessedSalaryDetailsView> InsertAsync(ProcessedSalaryDetailsView obj)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateAsync(ProcessedSalaryDetailsView obj)
        {
            throw new NotImplementedException();
        }
    }
}

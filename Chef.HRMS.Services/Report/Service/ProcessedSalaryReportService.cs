using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;

namespace Chef.HRMS.Services;

public class ProcessedSalaryReportService : AsyncService<ProcessedSalaryDetailsView>, IProcessedSalaryReportService
{
    private readonly IProcessedSalaryReportRepository processedSalaryReportRepository;

    public ProcessedSalaryReportService(IProcessedSalaryReportRepository processedSalaryReportRepository)
    {
        this.processedSalaryReportRepository = processedSalaryReportRepository;
    }

    public async Task<IEnumerable<ProcessedSalaryDetailsView>> GetProcessedSalaryDetails(int offSet)
    {
        return await processedSalaryReportRepository.GetProcessedSalaryDetails(offSet);
    }
}

namespace Chef.HRMS.Repositories;

public interface IProcessedSalaryReportRepository : IGenericRepository<ProcessedSalaryDetailsView>
{
    Task<IEnumerable<ProcessedSalaryDetailsView>> GetProcessedSalaryDetails(int offSet);
}
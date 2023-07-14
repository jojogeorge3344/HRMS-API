namespace Chef.HRMS.Repositories;

public interface IJobTitleRepository : IGenericRepository<JobTitle>
{
    Task<IEnumerable<JobTitleView>> GetAllJobTitleList();
}
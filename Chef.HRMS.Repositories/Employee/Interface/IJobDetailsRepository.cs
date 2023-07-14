namespace Chef.HRMS.Repositories;

public interface IJobDetailsRepository : IGenericRepository<JobDetails>
{
    Task<IEnumerable<GroupCategory>> GetGroupCategory();
    Task<IEnumerable<EmployeeDefaults>> GetProbationDetails();
}
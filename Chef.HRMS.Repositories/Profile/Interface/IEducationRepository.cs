namespace Chef.HRMS.Repositories;

public interface IEducationRepository : IGenericRepository<Education>
{
    Task<IEnumerable<EducationView>> GetAllByEmployeeId(int employeeId);
}
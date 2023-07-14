namespace Chef.HRMS.Repositories;

public interface IPreviousEmploymentRepository : IGenericRepository<PreviousEmployment>
{
    Task<IEnumerable<PreviousEmploymentView>> GetByEmployeeId(int employeeId);
}
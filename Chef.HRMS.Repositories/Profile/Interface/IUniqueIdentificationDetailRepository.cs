namespace Chef.HRMS.Repositories;

public interface IUniqueIdentificationDetailRepository : IGenericRepository<UniqueIdentificationDetail>
{
    Task<IEnumerable<UniqueIdentificationDetailView>> GetByEmployeeId(int employeeId);
}
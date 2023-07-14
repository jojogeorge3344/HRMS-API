namespace Chef.HRMS.Repositories;

public interface IPayGroupRepository : IGenericRepository<PayGroup>
{
    Task<IEnumerable<int>> GetAllAssignedPayGroup();
    Task<IEnumerable<EmployeeView>> GetAllEmployeeByPayGroupId(int paygroupId, int year, int month);
}

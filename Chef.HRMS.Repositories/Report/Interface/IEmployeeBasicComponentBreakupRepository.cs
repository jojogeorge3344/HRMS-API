namespace Chef.HRMS.Repositories;

public interface IEmployeeBasicComponentBreakupRepository : IGenericRepository<EmployeeBasicComponentBreakupView>
{
    Task<IEnumerable<EmployeeBasicComponentBreakupView>> GetAllEmployeeBasicComponentBreakupView(int month, int year);
}

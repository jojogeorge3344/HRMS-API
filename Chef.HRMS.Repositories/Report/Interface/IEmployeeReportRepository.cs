namespace Chef.HRMS.Repositories;

public interface IEmployeeReportRepository : IGenericRepository<EmployeeDetailView>
{
    Task<IEnumerable<EmployeeDetailView>> GetAllEmployeeDetailView(int offSet);

}

using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class EmployeeNumberSeriesServices : AsyncService<EmployeeNumberSeries>, IEmployeeNumberSeriesServices
{
    private readonly IEmployeeNumberSeriesRepository employeeNumberSeriesRepository;

    public EmployeeNumberSeriesServices(IEmployeeNumberSeriesRepository employeeNumberSeriesRepository)
    {
        this.employeeNumberSeriesRepository = employeeNumberSeriesRepository;
    }

    public async Task<IEnumerable<EmployeeNumberSeries>> GetAllActiveNumberSeries()
    {
        return await employeeNumberSeriesRepository.GetAllActiveNumberSeries();
    }

    public async Task<IEnumerable<int>> GetAllAssignedNumberSeries()
    {
        return await employeeNumberSeriesRepository.GetAllAssignedNumberSeries();
    }
}
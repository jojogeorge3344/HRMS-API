namespace Chef.HRMS.Repositories;

public interface IHolidayRepository : IGenericRepository<Holiday>
{
    Task<IEnumerable<Holiday>> GetAllByCategory(int categoryId);

    Task<IEnumerable<DateTime>> GetAllHolidaysByEmployee(int employeeId);
    //Task<IEnumerable<Holiday>> GetAll();
}
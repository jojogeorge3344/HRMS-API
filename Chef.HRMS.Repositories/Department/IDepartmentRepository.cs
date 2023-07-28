using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public interface IDepartmentRepository : IGenericRepository<Departments>
    {
        Task<bool> IsDepartmentCodeExist(string code);
    }
}

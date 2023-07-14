using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class DependentService : AsyncService<Dependent>, IDependentService
{
    private readonly IDependentRepository dependentRepository;

    public DependentService(IDependentRepository dependentRepository)
    {
        this.dependentRepository = dependentRepository;
    }

    public Task<int> DeleteAsync(int id)
    {
        return dependentRepository.DeleteAsync(id);
    }

    public Task<IEnumerable<Dependent>> GetAllAsync()
    {
        return dependentRepository.GetAllAsync();
    }

    public Task<IEnumerable<Dependent>> GetAllByEmployeeId(int employeeId)
    {
        return dependentRepository.GetAllByEmployeeId(employeeId);
    }

    public Task<Dependent> GetAsync(int id)
    {
        return dependentRepository.GetAsync(id);
    }

    public Task<int> InsertAsync(Dependent dependent)
    {
        return dependentRepository.InsertAsync(dependent);
    }

    public Task<int> UpdateAsync(Dependent dependent)
    {
        return dependentRepository.UpdateAsync(dependent);
    }
}
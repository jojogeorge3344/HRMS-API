using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class UserVariableValuesService : AsyncService<UserVariableValues>, IUserVariableValuesService
{
    private readonly IUserVariableValuesRepository userVariableValuesRepository;

    public UserVariableValuesService(IUserVariableValuesRepository userVariableValuesRepository)
    {
        this.userVariableValuesRepository = userVariableValuesRepository;
    }

    public async Task<IEnumerable<UserVariable>> GetUserVariables()
    {
        return await userVariableValuesRepository.GetUserVariables();
    }

    public new async Task<IEnumerable<UserVariableValues>> GetAllAsync()
    {
        return await userVariableValuesRepository.GetAllAsync();
    }
}

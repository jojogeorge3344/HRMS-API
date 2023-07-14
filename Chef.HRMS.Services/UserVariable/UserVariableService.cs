using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class UserVariableService : AsyncService<UserVariable>, IUserVariableService
{
    private readonly IUserVariableRepository userVariableRepository;

    public UserVariableService(IUserVariableRepository userVariableRepository)
    {
        this.userVariableRepository = userVariableRepository;
    }

    public async Task<bool> IsUserVariableExist(string code)
    {
        return await userVariableRepository.IsUserVariableExist(code);
    }
}

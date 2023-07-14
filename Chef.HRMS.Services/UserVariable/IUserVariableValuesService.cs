using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IUserVariableValuesService : IAsyncService<UserVariableValues>
{
    Task<IEnumerable<UserVariable>> GetUserVariables();
    new Task<IEnumerable<UserVariableValues>> GetAllAsync();
}

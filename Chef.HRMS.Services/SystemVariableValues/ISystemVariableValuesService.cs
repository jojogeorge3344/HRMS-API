using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface ISystemVariableValuesService : IAsyncService<SystemVariableValues>
{
    Task<string> InsertSystemVariableDetails(int PayGroupId, int ppMId);//, PayrollProcessingMethod systemVariableValues);
}

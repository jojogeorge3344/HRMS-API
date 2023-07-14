namespace Chef.HRMS.Repositories;

public interface ISystemVariableValuesRepository : IGenericRepository<SystemVariableValues>
{
    Task<string> InsertSystemVariableDetails(int PayGroupId, int ppMId);//, PayrollProcessingMethod systemVariableValues);
    Task<IEnumerable<SystemVariableValues>> GetSystemVariableValuesByEmployeeId(int employeeId);
}

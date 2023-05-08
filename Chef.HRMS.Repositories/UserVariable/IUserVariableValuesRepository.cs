namespace Chef.HRMS.Repositories
{
    public interface IUserVariableValuesRepository : IGenericRepository<UserVariableValues>
    {
        Task<IEnumerable<UserVariable>> GetUserVariables();

    }
}

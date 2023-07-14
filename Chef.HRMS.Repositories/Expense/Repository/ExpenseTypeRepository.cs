namespace Chef.HRMS.Repositories;

public class ExpenseTypeRepository : GenericRepository<ExpenseType>, IExpenseTypeRepository
{
    public ExpenseTypeRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
    public async Task<IEnumerable<int>> GetAllAssignedExpenseTypes()
    {

        var sql = @"SELECT DISTINCT expensetypeid 
                                    FROM hrms.expensepolicyconfiguration
                                    ORDER  BY expensetypeid ASC";

        return await Connection.QueryAsync<int>(sql);
    }
    public async Task<IEnumerable<ExpenseType>> GetAllByExpensePolicyId(int policyId)
    {

        var sql = @"SELECT A.* 
                            FROM   hrms.expensetype A 
                                   INNER JOIN hrms.expensepolicyexpensetype B 
                                           ON A.id = B.expensetypeid 
                            WHERE  B.expensepolicyid = @policyId
                                   ORDER  BY B.id ASC";

        return await Connection.QueryAsync<ExpenseType>(sql, new { policyId });

    }

    public async Task<IEnumerable<ExpenseType>> GetAllByExpenseCategory(int expenseCategoryId)
    {

        var sql = "SELECT * FROM  hrms.expensetype where category=@expenseCategoryId  ORDER  BY id ASC";

        return await Connection.QueryAsync<ExpenseType>(sql, new { expenseCategoryId });

    }
}


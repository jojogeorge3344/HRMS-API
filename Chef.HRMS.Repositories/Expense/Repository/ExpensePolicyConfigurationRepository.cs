using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class ExpensePolicyConfigurationRepository : GenericRepository<ExpensePolicyConfiguration>, IExpensePolicyConfigurationRepository
    {
        public ExpensePolicyConfigurationRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<ExpensePolicyConfiguration>> GetAllAsync(int expensePolicyId)
        {
            using (Connection)
            {
                var sql = @"SELECT * 
                            FROM   expensepolicyconfiguration 
                            WHERE  expensepolicyid = @expensePolicyId ORDER BY id";

                return await Connection.QueryAsync<ExpensePolicyConfiguration>(sql, new { expensePolicyId });
            }
        }

        public async Task<IEnumerable<ExpensePolicyConfiguration>> GetExpenseTypesById(int employeeid)
        {
            using (Connection)
            {
                var sql = @"SELECT A.* 
                            FROM   expensepolicyconfiguration A 
                                   INNER JOIN jobfiling B 
                                           ON A.expensepolicyid = B.expensepolicyid 
                            WHERE  B.employeeid = @employeeid ORDER BY A.id";

                return await Connection.QueryAsync<ExpensePolicyConfiguration>(sql, new { employeeid });
            }
        }

        public async Task<int> InsertAsync(IEnumerable<ExpensePolicyConfiguration> expensePolicyConfiguration, IEnumerable<int> expensePolicyConfigurationIds)
        {
            using (Connection)
            {
                try
                {
                    if (expensePolicyConfiguration.Count() > 0)
                    {
                        (from pbc in expensePolicyConfiguration
                         select pbc).ToList().ForEach((pbc) =>
                         {
                             pbc.CreatedDate = pbc.ModifiedDate = DateTime.UtcNow;
                             pbc.IsArchived = false;
                         });
                        var sql = new QueryBuilder<ExpensePolicyConfiguration>().GenerateInsertQuery();
                        sql = sql.Replace("RETURNING id", "");
                        sql += " ON CONFLICT ON CONSTRAINT expensepolicyconfiguration_policy_type_ukey DO NOTHING";
                        var result =await Connection.ExecuteAsync(sql, expensePolicyConfiguration);
                        if (result != 0)
                        {
                            var policyId = expensePolicyConfiguration.Select(x => x.ExpensePolicyId).FirstOrDefault();
                            var sqlnew = @"UPDATE public.expensepolicy
	                                              SET isconfigured=false
	                                               WHERE id=@policyId";
                            await Connection.ExecuteAsync(sqlnew, new { policyId});

                        }

                    }
                    if (expensePolicyConfigurationIds.Count() > 0)
                    {
                        string expensePolicyConfigurationId = string.Join(",", expensePolicyConfigurationIds.ToList().Select(l => l.ToString()).ToArray());
                        var sql = "DELETE FROM expensepolicyconfiguration WHERE id IN (" + expensePolicyConfigurationId + ")";
                        await Connection.ExecuteAsync(sql, new { expensePolicyConfigurationId });
                    }

                    return 0;
                }
                catch (System.Exception)
                {
                    return -1;
                }
            }
        }

        public async Task<int> SetExpensePolicyIsConfigured(int expensePolicyId)
        {
            using (Connection)
            {
                try
                {
                    var sql = @"SELECT public.setexpensepolicyisionfigured(@expensePolicyId)";
                    var result=  await Connection.ExecuteAsync(sql, new { expensePolicyId });
                    if(result==-1)
                    {

                        return 1;
                    }
                    else
                    {
                        return 0;
                    }
                    
                }
                catch (Exception ex)
                {

                    throw ex;
                }
                
            }
        }
    }
}

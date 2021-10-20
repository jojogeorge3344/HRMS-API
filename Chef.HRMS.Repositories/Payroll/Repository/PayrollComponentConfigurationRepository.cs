using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PayrollComponentConfigurationRepository : GenericRepository<PayrollComponentConfiguration>, IPayrollComponentConfigurationRepository
    {
        public PayrollComponentConfigurationRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<PayrollComponentConfiguration>> GetAllByPayrollStuctureId(int payrollStructureId)
        {
            using (Connection)
            {
                var sql = "SELECT * FROM  hrms.payrollcomponentconfiguration WHERE payrollstructureid = @payrollStructureId";

                return await Connection.QueryAsync<PayrollComponentConfiguration>(sql, new { payrollStructureId });
            }
        }

        public async Task<int> InsertAsync(IEnumerable<PayrollComponentConfiguration> payrollComponentConfiguration, IEnumerable<int> PayrollComponentConfigurationIds)
        {
            using (Connection)
            {
                try
                {
                    if (payrollComponentConfiguration.Count() > 0)
                    {
                        (from pbc in payrollComponentConfiguration
                         select pbc).ToList().ForEach((pbc) =>
                         {
                             pbc.CreatedDate = pbc.ModifiedDate = DateTime.UtcNow;
                             pbc.IsArchived = false;
                         });
                        var sql = new QueryBuilder<PayrollComponentConfiguration>().GenerateInsertQuery();
                        sql = sql.Replace("RETURNING id", "");
                        sql += " ON CONFLICT ON CONSTRAINT payrollcomponentconfiguration_ukey_payrollcomponentid_payrollst DO NOTHING";

                        var result = await Connection.ExecuteAsync(sql, payrollComponentConfiguration);
                        if (result != 0)
                        {
                            var payrollStructureId = payrollComponentConfiguration.Select(x => x.PayrollStructureId).FirstOrDefault();
                            var sqlnew = @"UPDATE hrms.payrollstructure
	                                              SET isconfigured=false
	                                               WHERE id=@payrollStructureId";
                            await Connection.ExecuteAsync(sqlnew, new { payrollStructureId });

                        }

                    }
                    if (PayrollComponentConfigurationIds.Count() > 0)
                    {
                        string PayrollComponentConfigurationId = string.Join(",", PayrollComponentConfigurationIds.ToList().Select(l => l.ToString()).ToArray());
                        var sql = "DELETE FROM payrollComponentConfiguration WHERE id IN (" + PayrollComponentConfigurationId + ")";

                        await Connection.ExecuteAsync(sql, PayrollComponentConfigurationId);
                    }

                    return 0;
                }
                catch (System.Exception)
                {
                    return -1;
                }
            }
        }
        public async Task<int> SetPayrollStructureIsConfigured(int payrollStructureId)
        {
            using (Connection)
            {
                try
                {
                    var sql = @"SELECT public.setpayrollstructureisconfigured(@payrollStructureId)";
                    var result = await Connection.ExecuteAsync(sql, new { payrollStructureId });
                    if (result == -1)
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
        public async Task<int> InsertPayrollFixedCalculation(PayrollCalculation payrollCalculation)
        {
            using (Connection)
            {

                var sql = new QueryBuilder<PayrollCalculation>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");
                sql += " ON CONFLICT ON CONSTRAINT payrollcalculation_componentid_structureid_ukey DO NOTHING";
                return await Connection.ExecuteAsync(sql, payrollCalculation);
            }
        }
    }
}
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PayrollComponentConfigurationRepository : GenericRepository<PayrollComponentConfiguration>, IPayrollComponentConfigurationRepository
    {
        public PayrollComponentConfigurationRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<PayrollComponentConfiguration>> GetAllByPayrollStuctureId(int payrollStructureId)
        {
                var sql = "SELECT * FROM  hrms.payrollcomponentconfiguration WHERE payrollstructureid = @payrollStructureId";

                return await Connection.QueryAsync<PayrollComponentConfiguration>(sql, new { payrollStructureId });
        }

        public async Task<int> InsertAsync(IEnumerable<PayrollComponentConfiguration> payrollComponentConfiguration, IEnumerable<int> PayrollComponentConfigurationIds)
        {
            int result = 0;

            using (var transaction = Connection.BeginTransaction())
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
                        sql = sql.Replace("RETURNING Id", "");
                        sql += " ON CONFLICT ON CONSTRAINT payrollcomponentconfiguration_ukey_payrollcomponentid_payrollst DO NOTHING";

                         result = await Connection.ExecuteAsync(sql, payrollComponentConfiguration);
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
                        var sql = "DELETE FROM hrms.payrollcomponentconfiguration WHERE id IN (" + PayrollComponentConfigurationId + ")";

                        await Connection.ExecuteAsync(sql, PayrollComponentConfigurationId);
                    }

                    //return 0;
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    string msg = ex.Message;
                    transaction.Rollback();
                    //return -1;
                }
            }
            return result;
        }
        public async Task<int> SetPayrollStructureIsConfigured(int payrollStructureId)
        {
                try
                {
                    var sql = @"SELECT hrms.setpayrollstructureisconfigured(@payrollStructureId)";
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
        public async Task<int> InsertPayrollFixedCalculation(PayrollCalculation payrollCalculation)
        {
                var sql = new QueryBuilder<PayrollCalculation>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");
                sql += " ON CONFLICT ON CONSTRAINT payrollcalculation_componentid_structureid_ukey DO NOTHING";
                return await Connection.ExecuteAsync(sql, payrollCalculation);
        }
    }
}
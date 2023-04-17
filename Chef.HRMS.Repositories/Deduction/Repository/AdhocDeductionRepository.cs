using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class AdhocDeductionRepository : GenericRepository<AdhocDeduction>, IAdhocDeductionRepository
    {
        public AdhocDeductionRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<AdhocDeductionView>> GetAllAdhocDeductionByPayrollProcessingMethodId(int payrollProcessingMethodId, int year, int month)
        {

                var sql = @"SELECT DISTINCT ad.id                                    AS deductionId, 
                                            ad.employeeid                            AS employeeId, 
                                            ( Concat(e.firstname, ' ', e.lastname) ) AS name, 
                                            ad.employeecode                          AS employeeCode, 
                                            ad.deductionname                         AS deductionName, 
                                            ad.description                           AS description, 
                                            jf.paygroupid                            AS paygroupId, 
                                            ad.payrollprocessingmethodid             AS 
                                            payrollProcessingMethodId, 
                                            ad.amount                                AS amount, 
                                            ad.currency                              AS currency, 
                                            ad.createddate                           AS createddate, 
                                            ad.modifieddate                          AS modifieddate, 
                                            ad.createdby                             AS createdby, 
                                            ad.modifiedby                            AS modifiedby 
                            FROM   hrms.adhocdeduction ad 
                                   INNER JOIN hrms.HRMSEmployee e 
                                           ON ad.employeeid = e.id 
                                   INNER JOIN hrms.jobfiling jf 
                                           ON ad.employeeid = jf.employeeid 
                            WHERE  (ad.payrollprocessingmethodid = @payrollProcessingMethodId 
                                           AND e.id NOT IN(Select ppm.employeeid from hrms.payrollprocessingmethod ppm
                                            WHERE  (ppm.month =@month AND  ppm.year=@year)))";

                return await Connection.QueryAsync<AdhocDeductionView>(sql, new { payrollProcessingMethodId, year, month });

        }
        public async Task<IEnumerable<AdhocDeductionView>> GetEmployeeAdhocDeductionByPayrollProcessingMethodId(int payrollProcessingMethodId)
        {

                var sql = @"SELECT DISTINCT ad.id                                    AS deductionId, 
                                            ad.employeeid                            AS employeeId, 
                                            ( Concat(e.firstname, ' ', e.lastname) ) AS name, 
                                            ad.employeecode                          AS employeeCode, 
                                            ad.deductionname                         AS deductionName, 
                                            ad.description                           AS description, 
                                            jf.paygroupid                            AS paygroupId, 
                                            ad.payrollprocessingmethodid             AS 
                                            payrollProcessingMethodId, 
                                            ad.amount                                AS amount, 
                                            ad.currency                              AS currency, 
                                            ad.createddate                           AS createddate, 
                                            ad.modifieddate                          AS modifieddate, 
                                            ad.createdby                             AS createdby, 
                                            ad.modifiedby                            AS modifiedby 
                            FROM   hrms.adhocdeduction ad 
                                   INNER JOIN hrms.HRMSEmployee e 
                                           ON ad.employeeid = e.id 
                                   INNER JOIN hrms.jobfiling jf 
                                           ON ad.employeeid = jf.employeeid 
                            WHERE  ad.payrollprocessingmethodid = @payrollProcessingMethodId";

                return await Connection.QueryAsync<AdhocDeductionView>(sql, new { payrollProcessingMethodId });
        }
    }
}

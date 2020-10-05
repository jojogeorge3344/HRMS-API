﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class AdhocDeductionRepository : GenericRepository<AdhocDeduction>, IAdhocDeductionRepository
    {
        public AdhocDeductionRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<AdhocDeductionView>> GetAllAdhocDeductionByPayrollProcessingMethodId(int payrollProcessingMethodId,int year, int month)
        {
            using (Connection)
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
                            FROM   adhocdeduction ad 
                                   INNER JOIN employee e 
                                           ON ad.employeeid = e.id 
                                   INNER JOIN jobfiling jf 
                                           ON ad.employeeid = jf.employeeid 
                            WHERE  (ad.payrollprocessingmethodid = @payrollProcessingMethodId 
                                           AND e.id NOT IN(Select ppm.employeeid from payrollprocessingmethod ppm
                                            WHERE  (ppm.month =@month AND  ppm.year=@year)))";

                return await Connection.QueryAsync<AdhocDeductionView>(sql, new { payrollProcessingMethodId, year, month });
            }
        }
        public async Task<IEnumerable<AdhocDeductionView>> GetEmployeeAdhocDeductionByPayrollProcessingMethodId(int payrollProcessingMethodId)
        {
            using (Connection)
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
                            FROM   adhocdeduction ad 
                                   INNER JOIN employee e 
                                           ON ad.employeeid = e.id 
                                   INNER JOIN jobfiling jf 
                                           ON ad.employeeid = jf.employeeid 
                            WHERE  ad.payrollprocessingmethodid = @payrollProcessingMethodId";

                return await Connection.QueryAsync<AdhocDeductionView>(sql, new { payrollProcessingMethodId});
            }
        }
    }
}
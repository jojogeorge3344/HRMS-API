using Chef.Common.Core.Extensions;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Humanizer;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks; 

namespace Chef.HRMS.Repositories
{
    public class EmployeeRevisionDetailsRepository : GenericRepository<EmployeeRevisionDetails>, IEmployeeRevisionDetailsRepository
    {
        public EmployeeRevisionDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<EmployeeRevisionDetails>> GetEmployeeRevisionSalaryDetail(int employeeRevisionId)
        {
            var sql = @"SELECT
                          erd.*,
                          pc.name,
                          pc.shortcode,
                          pcn.formula
                        FROM hrms.employeerevisiondetails erd
                        INNER JOIN hrms.payrollcomponent pc
                          ON erd.payrollcomponentid = pc.id
                        LEFT JOIN hrms.payrollcalculation pcn
                          ON pc.id = pcn.payrollcomponentid
                          AND erd.payrollstructureid = pcn.payrollstructureid
                        WHERE employeerevisionid = @employeeRevisionId
                        AND erd.isarchived = FALSE
                        ORDER BY erd.payrollcomponentid ASC";

            return await Connection.QueryAsync<EmployeeRevisionDetails>(sql, new { employeeRevisionId });
        }

        public async Task<IEnumerable<EmployeeRevisionSalaryView>> GetEmployeeRevisionSalaryDetails(int payrollStructureId,int employee)
        {
            //var sql = @"SELECT DISTINCT pcc.payrollcomponentid ,pcc.shortcode,pcc.name,pc.formula,escd.monthlyamount,pc.id AS payrollcalculationid
            //            FROM hrms.payrollcomponentconfiguration pcc
            //            INNER JOIN hrms.payrollcalculation pc
            //            ON pcc.payrollstructureid = pc.payrollstructureid
            //            AND pcc.payrollcomponentid = pc.payrollcomponentid
            //            INNER JOIN hrms.employeesalaryconfigurationdetails escd
            //            ON escd.payrollstructureid = pcc.payrollstructureid
            //            AND escd.payrollcomponentid = pcc.payrollcomponentid
            //            WHERE pcc.payrollstructureid = @payrollStructureId
            //            AND escd.employeeid = @employee
            //            AND escd.isarchived = false
            //            ORDER BY pcc.shortcode ASC";
            var sql = @"SELECT DISTINCT pcc.payrollcomponentid, pcc.shortcode, pcc.name, pc.formula
	                        , escd.monthlyamount, pc.id AS payrollcalculationid
	                        FROM hrms.payrollcomponentconfiguration pcc
	                        LEFT JOIN hrms.payrollcalculation pc ON pcc.payrollstructureid = pc.payrollstructureid
		                        AND pcc.payrollcomponentid = pc.payrollcomponentid
	                        INNER JOIN hrms.employeesalaryconfigurationdetails escd ON escd.payrollstructureid = pcc.payrollstructureid
		                        AND escd.payrollcomponentid = pcc.payrollcomponentid
	                        WHERE pcc.payrollstructureid = @payrollStructureId
                                AND escd.employeeid = @employee AND escd.isarchived = false
	                        ORDER BY pcc.shortcode ASC";

            return await Connection.QueryAsync<EmployeeRevisionSalaryView>(sql, new { payrollStructureId, employee });
        }

        public async Task<int> InsertAsync(IEnumerable<EmployeeRevisionDetails> employeeRevisionDetails)
        {
            var sql = new QueryBuilder<EmployeeRevisionDetails>().GenerateInsertQuery();

            return await Connection.ExecuteAsync(sql, employeeRevisionDetails);
        }

        public async Task<int> UpdateAsync(IEnumerable<EmployeeRevisionDetails> employeeRevisionDetails)
        {
            var sql = new QueryBuilder<EmployeeRevisionDetails>().GenerateUpdateQuery();
            return await Connection.ExecuteAsync(sql, employeeRevisionDetails);
        }
    }
}
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PayGroupRepository : GenericRepository<PayGroup>, IPayGroupRepository
    {
        public PayGroupRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<int>> GetAllAssignedPayGroup()
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT paygroupid 
                                    FROM PUBLIC.jobfiling
                                    ORDER  BY paygroupid ASC";

                return await Connection.QueryAsync<int>(sql);
            }
        }

        public async Task<IEnumerable<EmployeeView>> GetAllEmployeeByPayGroupId(int paygroupId, int year, int month)
        {
            using (Connection)
            {
                var sql = @"SELECT e.id              AS id, 
                                   jd.employeenumber AS employeenumber, 
                                   Concat (e.firstname, ' ', e.lastname)     AS FirstName 
                            FROM   employee e 
                                   INNER JOIN jobdetails jd 
                                           ON e.id = jd.employeeid 
                                   INNER JOIN jobfiling jf 
                                           ON jd.employeeid = jf.employeeid 
                                              AND jf.paygroupid = @paygroupId
                                               WHERE (e.id NOT IN(Select ppm.employeeid from payrollprocessingmethod ppm where( ppm.month=@month 
                                                        AND
													     ppm.year=@year)) )";

                return await Connection.QueryAsync<EmployeeView>(sql, new { paygroupId,year,month });
            }
        }
    }
}

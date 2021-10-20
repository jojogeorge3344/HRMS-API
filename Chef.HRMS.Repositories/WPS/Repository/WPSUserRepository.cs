using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class WPSUserRepository : GenericRepository<WPSUser>, IWPSUserRepository
    {
        public WPSUserRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<WPSUser>> GetAllByemployeeId(int employeeId)
        {
            using (Connection)
            {
                var sql = "SELECT * FROM  hrms.WPSUser WHERE employeeid = @employeeId  ORDER BY id";

                return await Connection.QueryAsync<WPSUser>(sql, new { employeeId });
            }
        }
    }
}

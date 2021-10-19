using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class DependentRepository : GenericRepository<Dependent>, IDependentRepository
    {
        public DependentRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<Dependent>> GetAllByEmployeeId(int employeeId)
        {
            using (Connection)
            {
                var sql = "SELECT * FROM  hrms.dependent WHERE employeeId = @employeeId";

                return await Connection.QueryAsync<Dependent>(sql, new { employeeId });
            }
        }
    }
}
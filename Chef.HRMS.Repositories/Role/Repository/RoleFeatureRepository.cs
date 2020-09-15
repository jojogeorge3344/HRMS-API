using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class RoleFeatureRepository : GenericRepository<RoleFeature>, IRoleFeatureRepository
    {
        public RoleFeatureRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<int> AssignRoleFeature(IEnumerable<RoleFeature> roleFeature)
        {
            using (Connection)
            {
                var sql = new QueryBuilder<RoleFeature>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");
                return await Connection.ExecuteAsync(sql, roleFeature);
            }
        }
    }
}
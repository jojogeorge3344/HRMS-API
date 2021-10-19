using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class UserRoleRepository : GenericRepository<UserRole>, IUserRoleRepository
    {
        public UserRoleRepository(DbSession session) : base(session)
        {
        }
        public async Task<int> AssignRolesToUser(IEnumerable<UserRole> userRole)
        {
            using (Connection)
            {
                var sql = new QueryBuilder<UserRole>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");
                return await Connection.ExecuteAsync(sql, userRole);
            }
        }

        public async Task<IEnumerable<UserRoleView>> GetUserRole(int employeeId)
        {
            using (Connection)
            {
                var sql = @"SELECT ur.employeeid AS employeeid, 
                                       ur.roleid        AS roleid, 
                                       r.NAME           AS rolename, 
                                       f.NAME           AS featurename, 
                                       rf.featureid     AS featureid,
									   rf.subfeatureid  AS subfeatureid,
									   sf.subfeature    AS subfeaturename
                                FROM   hrms.userrole ur 
                                       INNER JOIN hrms.role r 
                                               ON ur.roleid = r.id 
                                                  AND employeeid = @employeeid
                                       INNER JOIN hrms.rolefeature rf 
                                               ON rf.roleid = r.id 
                                       INNER JOIN hrms.feature f 
                                               ON rf.featureid = f.id
									   INNER JOIN hrms.subfeature sf 
                                               ON sf.id = rf.subfeatureid";

                return await Connection.QueryAsync<UserRoleView>(sql, new { employeeId });
            }
        }

        public async Task<int> UpdateUserRoleGroup(int roleId, IEnumerable<UserRole> userRole)
        {
            using (Connection)
            {
                var sql = new QueryBuilder<UserRole>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");
                sql += " ON CONFLICT ON CONSTRAINT userrole_ckey DO NOTHING";
                await Connection.ExecuteAsync(sql, userRole);

                if (userRole.Count() > 0)
                {
                    string userIds = string.Join(",", userRole.ToList().Select(l => l.EmployeeId).ToArray());
                    sql = "DELETE FROM hrms.userrole WHERE roleid = @roleId AND employeeid NOT IN (" + userIds + ")";
                }
                else
                {
                    sql = "DELETE FROM hrms.userrole WHERE roleid = @roleId";
                }

                return await Connection.ExecuteAsync(sql, new { roleId });
            }
        }

        public async Task<int> UpdateUserRoleGroup(IEnumerable<UserRole> userRole)
        {
            using (Connection)
            {
                var sql = new QueryBuilder<UserRole>().GenerateUpdateQuery();
                return await Connection.ExecuteAsync(sql, userRole);
            }
        }
    }
}

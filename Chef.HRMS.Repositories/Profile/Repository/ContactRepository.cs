using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class ContactRepository : GenericRepository<Contact>, IContactRepository
    {
        public ContactRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<Contact>> GetAllByEmployeeId(int employeeId)
        {
            using (Connection)
            {
                var sql = "SELECT * FROM  hrms.contact WHERE employeeId = @employeeId";

                return await Connection.QueryAsync<Contact>(sql, new { employeeId });
            }
        }
    }
}
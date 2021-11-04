using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class AddressRepository : GenericRepository<Address>, IAddressRepository
    {
        public AddressRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<Address>> GetAllByEmployeeId(int employeeId)
        {
            using (Connection)
            {
                var sql = "SELECT * FROM  hrms.address WHERE employeeId = @employeeId";

                return await Connection.QueryAsync<Address>(sql, new { employeeId });
            }
        }
    }
}

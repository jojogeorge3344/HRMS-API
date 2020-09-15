using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class AddressRepository : GenericRepository<Address>, IAddressRepository
    {
        public AddressRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<Address>> GetAllByEmployeeId(int employeeId)
        {
            using (Connection)
            {
                var sql = "SELECT * FROM  address WHERE employeeId = @employeeId";

                return await Connection.QueryAsync<Address>(sql, new { employeeId });
            }
        }
    }
}

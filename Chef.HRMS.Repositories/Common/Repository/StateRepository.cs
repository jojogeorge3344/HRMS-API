using Chef.Common.Models;
using Chef.Common.Repositories;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class StateRepository : GenericRepository<State>, IStateRepository
    {
        public StateRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<State>> GetAllByCountry(int countryId)
        {

                var sql = "SELECT * FROM  hrms.state WHERE countryid = @countryId";
                return await Connection.QueryAsync<State>(sql, new { countryId });

        }
    }
}
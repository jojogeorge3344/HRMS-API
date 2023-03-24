using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IReligionRepository : IGenericRepository<Religion>
    {
        Task<bool> IsReligionCodeExist(string code);
    }
}

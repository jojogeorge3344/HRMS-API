using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class ReligionService : AsyncService<Religion>, IReligionService
    {
        private readonly IReligionRepository religionRepository;

        public ReligionService(IReligionRepository religionRepository)
        {
            this.religionRepository = religionRepository;
        }

    }
}

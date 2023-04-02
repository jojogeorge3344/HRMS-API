using Chef.HRMS.Models;
using Chef.HRMS.Models.Slab;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class SlabService : AsyncService<Slab>, ISlabService
    {
        private readonly ISlabRepository slabRepository;

        public SlabService(ISlabRepository slabRepository)
        {
            this.slabRepository = slabRepository;
        }
    }
}

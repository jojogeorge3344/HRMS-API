using Chef.HRMS.Models.Slab;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class SlabService : AsyncService<Slab>, ISlabService
{
    private readonly ISlabRepository slabRepository;

    public SlabService(ISlabRepository slabRepository)
    {
        this.slabRepository = slabRepository;
    }
}

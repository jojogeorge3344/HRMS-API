using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class BonusTypeService : AsyncService<BonusType>, IBonusTypeService
{
    private readonly IBonusTypeRepository bonusTypeRepository;

    public BonusTypeService(IBonusTypeRepository bonusTypeRepository)
    {
        this.bonusTypeRepository = bonusTypeRepository;
    }
}

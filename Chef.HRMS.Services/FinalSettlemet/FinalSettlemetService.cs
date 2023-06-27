using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services
{
    public class FinalSettlemetService : AsyncService<FinalSettlement>, IFinalSettlemetService
    {
        private readonly IFinalSettlementRepository finalSettlementRepository;

        public FinalSettlemetService(IFinalSettlementRepository finalSettlementRepository)
        {
            this.finalSettlementRepository = finalSettlementRepository;
        }
    }
}

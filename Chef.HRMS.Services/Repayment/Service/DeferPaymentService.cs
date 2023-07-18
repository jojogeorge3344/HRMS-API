using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class DeferPaymentService : AsyncService<DeferPayment>, IDeferPaymentService
{
    private readonly IDeferPaymentRepository deferPaymentRepository;

    public DeferPaymentService(IDeferPaymentRepository deferPaymentRepository)
    {
        this.deferPaymentRepository = deferPaymentRepository;
    }
}

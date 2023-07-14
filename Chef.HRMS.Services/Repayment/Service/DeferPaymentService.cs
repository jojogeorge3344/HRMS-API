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

    public async Task<int> DeleteAsync(int id)
    {
        return await deferPaymentRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<DeferPayment>> GetAllAsync()
    {
        return await deferPaymentRepository.GetAllAsync();
    }

    public async Task<DeferPayment> GetAsync(int id)
    {
        return await deferPaymentRepository.GetAsync(id);
    }


    public async Task<int> InsertAsync(DeferPayment deferPayment)
    {
        return await deferPaymentRepository.InsertAsync(deferPayment);
    }

    public async Task<int> UpdateAsync(DeferPayment deferPayment)
    {
        return await deferPaymentRepository.UpdateAsync(deferPayment);
    }
}

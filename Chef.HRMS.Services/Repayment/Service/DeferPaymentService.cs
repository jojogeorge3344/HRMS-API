using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class DeferPaymentService : AsyncService, IDeferPaymentService
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


        public async Task<DeferPayment> InsertAsync(DeferPayment deferPayment)
        {
            return await deferPaymentRepository.InsertAsync(deferPayment);
        }

        public async Task<int> UpdateAsync(DeferPayment deferPayment)
        {
            return await deferPaymentRepository.UpdateAsync(deferPayment);
        }
    }
}

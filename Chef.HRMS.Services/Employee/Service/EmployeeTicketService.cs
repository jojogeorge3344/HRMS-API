using Chef.Common.Authentication.Models;
using Chef.Common.Authentication.Repositories;
using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EmployeeTicketService : AsyncService<EmployeeTicket>, IEmployeeTicketService
    {
        private readonly IEmployeeTicketRepository EmployeeTicketRepository;
        private readonly IAuthService authService;

        public EmployeeTicketService(IEmployeeTicketRepository EmployeeTicketRepository, IAuthService authService )
        {
            this.EmployeeTicketRepository = EmployeeTicketRepository;
            this.authService = authService;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await EmployeeTicketRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<EmployeeTicket>> GetAllAsync()
        {
            return await EmployeeTicketRepository.GetAllAsync();
        }

        public async Task<EmployeeTicket> GetAsync(int id)
        {
            return await EmployeeTicketRepository.GetAsync(id);
        }

        public new async Task<int> InsertAsync(EmployeeTicket EmployeeTicket)
        {
            return await EmployeeTicketRepository.InsertAsync(EmployeeTicket);
        }

        public async Task<int> UpdateAsync(EmployeeTicket EmployeeTicket)
        {
            return await EmployeeTicketRepository.UpdateAsync(EmployeeTicket);
        }
    }
}
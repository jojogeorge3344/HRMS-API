using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services
{
    public class EmployeeEncashmentFindTLSService : AsyncService<EmployeeEncashmentFindTLS>, IEmployeeEncashmentFindTLSService
    {
        private readonly IEmployeeEncashmentFindTLSRepository employeeEncashmentFindTLSRepository;

        public EmployeeEncashmentFindTLSService(IEmployeeEncashmentFindTLSRepository employeeEncashmentFindTLSRepository)
        {
            this.employeeEncashmentFindTLSRepository = employeeEncashmentFindTLSRepository;
        }
    }
}

using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PayrollSystemVariableService : AsyncService<PayrollSystemVariable>, IPayrollSystemVariableService
{
    private readonly IPayrollSystemVariableRepository payrollSystemVariableRepository;

    public PayrollSystemVariableService(IPayrollSystemVariableRepository payrollSystemVariableRepository)
    {
        this.payrollSystemVariableRepository = payrollSystemVariableRepository;
    }
}

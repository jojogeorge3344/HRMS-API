using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PayrollComponentConfigurationService : AsyncService<PayrollComponentConfiguration>, IPayrollComponentConfigurationService
{
    private readonly IPayrollComponentConfigurationRepository payrollComponentConfigurationRepository;
    private readonly ILogPayrollComponentConfigurationRepository logPayrollComponentConfigurationRepository;

    public PayrollComponentConfigurationService(IPayrollComponentConfigurationRepository payrollComponentConfigurationRepository,
        ILogPayrollComponentConfigurationRepository logPayrollComponentConfigurationRepository)
    {
        this.payrollComponentConfigurationRepository = payrollComponentConfigurationRepository;
        this.logPayrollComponentConfigurationRepository = logPayrollComponentConfigurationRepository;
    }

    public async Task<int> DeleteAsync(int id)
    {
        return await payrollComponentConfigurationRepository.DeleteAsync(id);
    }

    public async Task<int> DeletePayrollComponent(int id)
    {
        int deleteValue = 0;

        int delete = await payrollComponentConfigurationRepository.DeletePermanentAsync(id);
        if (delete != 0)
        {
            var payrollConfigDetail = await logPayrollComponentConfigurationRepository.GetPayrollComponentConfigLogDetails(id);
            deleteValue = await logPayrollComponentConfigurationRepository.DeleteAsync(payrollConfigDetail.Id);
        }
        return deleteValue;
    }

    public async Task<IEnumerable<PayrollComponentConfiguration>> GetAllAsync()
    {
        return await payrollComponentConfigurationRepository.GetAllAsync();
    }

    public async Task<IEnumerable<PayrollComponentConfiguration>> GetAllByPayrollComponentId(int payrollComponentId)
    {
        return await payrollComponentConfigurationRepository.GetAllByPayrollComponentId(payrollComponentId);
    }

    public async Task<IEnumerable<PayrollComponentConfiguration>> GetAllByPayrollStuctureId(int payrollStructureId)
    {
        return await payrollComponentConfigurationRepository.GetAllByPayrollStuctureId(payrollStructureId);
    }

    public async Task<PayrollComponentConfiguration> GetAsync(int id)
    {
        return await payrollComponentConfigurationRepository.GetAsync(id);
    }

    public async Task<int> InsertAsync(PayrollComponentConfiguration payrollComponentConfiguration)
    {
        return await payrollComponentConfigurationRepository.InsertAsync(payrollComponentConfiguration);
    }
    public async Task<int> InsertAsync(IEnumerable<PayrollComponentConfiguration> payrollComponentConfiguration, IEnumerable<int> PayrollComponentConfigurationIds)
    {
        return await payrollComponentConfigurationRepository.InsertAsync(payrollComponentConfiguration, PayrollComponentConfigurationIds);
    }

    public async Task<int> UpdateAsync(PayrollComponentConfiguration payrollComponentConfiguration)
    {

        int data = await payrollComponentConfigurationRepository.UpdateAsync(payrollComponentConfiguration);
        var isFixed = payrollComponentConfiguration.PayrollComponentType;
        if (data != 0 && isFixed.ToString() == "Fixed")
        {
            PayrollCalculation payrollCalculation = new PayrollCalculation();
            payrollCalculation.PayrollStructureId = payrollComponentConfiguration.PayrollStructureId;
            payrollCalculation.PayrollComponentId = payrollComponentConfiguration.PayrollComponentId;
            payrollCalculation.IsComputed = false;
            data = await payrollComponentConfigurationRepository.InsertPayrollFixedCalculation(payrollCalculation);

        }
        var structureId = payrollComponentConfiguration.PayrollStructureId;
        await payrollComponentConfigurationRepository.SetPayrollStructureIsConfigured(structureId);
        return data;
    }
}
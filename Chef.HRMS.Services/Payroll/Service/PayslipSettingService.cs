using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PayslipSettingService : AsyncService<PayslipSetting>, IPayslipSettingService
    {
        private readonly IPayslipSettingReposirory payslipSettingReposirory;
        private readonly ITenantSimpleUnitOfWork tenantSimpleUnitOfWork;
        private readonly IPayslipSettingDetailsRepository payslipSettingDetailsRepository;

        public PayslipSettingService(IPayslipSettingReposirory payslipSettingReposirory,
            ITenantSimpleUnitOfWork tenantSimpleUnitOfWork,IPayslipSettingDetailsRepository payslipSettingDetailsRepository)
        {
            this.payslipSettingReposirory = payslipSettingReposirory;
            this.tenantSimpleUnitOfWork = tenantSimpleUnitOfWork;
            this.payslipSettingDetailsRepository = payslipSettingDetailsRepository;
        }

        public async Task<IEnumerable<PayrollComponent>> GetComponentsByStructureId(int structureId)
        {
            return await payslipSettingReposirory.GetComponentsByStructureId(structureId);
        }

        public async Task<int> InsertPayslipSetting(PayslipSetting payslipSetting)
        {
            tenantSimpleUnitOfWork.BeginTransaction();
            try
            {
                int payslipSettingId = await payslipSettingReposirory.InsertAsync(payslipSetting);

                if(payslipSetting.PayslipSettingDetails != null)
                {
                    payslipSetting.PayslipSettingDetails.ForEach(x => x.PayslipSettingId = payslipSettingId);
                    await payslipSettingDetailsRepository.BulkInsertAsync(payslipSetting.PayslipSettingDetails);
                }

                tenantSimpleUnitOfWork.Commit();
            return payslipSettingId;
            }

            catch(Exception ex)
            {
                tenantSimpleUnitOfWork.Rollback();
                return 0;
            }
        }

        public async Task<int> UpdatePayslipSetting(PayslipSetting payslipSetting)
        {
            tenantSimpleUnitOfWork.BeginTransaction();
            try
            {
                int payslipUpdate = await payslipSettingReposirory.UpdateAsync(payslipSetting);

                await payslipSettingDetailsRepository.DeleteByPayslipSettingId(payslipSetting.Id);
                if (payslipSetting.PayslipSettingDetails != null)
                {
                    payslipSetting.PayslipSettingDetails.ForEach(x => x.PayslipSettingId = payslipSetting.Id);
                    await payslipSettingDetailsRepository.BulkInsertAsync(payslipSetting.PayslipSettingDetails);
                }
                tenantSimpleUnitOfWork.Commit();
                return payslipUpdate;
            }
            catch (Exception ex)
            {
                tenantSimpleUnitOfWork.Rollback();
                return 0;
            }

        }
    }
}

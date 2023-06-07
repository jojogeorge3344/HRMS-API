using Chef.Common.Core.Repositories;
using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Models.BenefitCategory;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LeaveComponentService : AsyncService<LeaveComponent>, ILeaveComponentService
    {
        private readonly ILeaveComponentRepository leaveComponentRepository;
        private readonly ILeaveEligibilityRepository leaveEligibilityRepository;
		private readonly ILeaveComponentLopDetailsRepository leaveComponentLopDetails;
		private readonly ITenantConnectionFactory tenantConnectionFactory;

		public LeaveComponentService(ILeaveComponentRepository leaveComponentRepository,ILeaveEligibilityRepository leaveEligibilityRepository,
			ILeaveComponentLopDetailsRepository leaveComponentLopDetails,
            ITenantConnectionFactory tenantConnectionFactory)
        {
            this.leaveComponentRepository = leaveComponentRepository;
            this.leaveEligibilityRepository = leaveEligibilityRepository;
            this.leaveComponentLopDetails = leaveComponentLopDetails;
            this.tenantConnectionFactory = tenantConnectionFactory;
		}

        public async Task<int> DeleteAsync(int id)
        {
           await leaveComponentRepository.DeleteAsync(id);
           return await leaveEligibilityRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<LeaveComponent>> GetAllAsync()
        {
            return await leaveComponentRepository.GetAllAsync();
        }

        public async Task<IEnumerable<LeaveComponent>> GetAllByLeaveStructure(int leaveStructureId)
        {
            return await leaveComponentRepository.GetAllByLeaveStructure(leaveStructureId);
        }

        public async Task<LeaveComponent> GetAsync(int id)
        {
            return await leaveComponentRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(LeaveComponent leaveComponent)
        {
            try
            {
                tenantConnectionFactory.Connection.BeginTransaction();

                int id = await leaveComponentRepository.InsertAsync(leaveComponent);
                if (id > 0)
                {
                    if (leaveComponent.LeaveComponentLopDetails != null && leaveComponent.LeaveComponentLopDetails.Count > 0)
                    {
                        leaveComponent.LeaveComponentLopDetails.ForEach(x => x.LeaveComponentId = id);
                    }
                    await leaveComponentLopDetails.BulkInsertAsync(leaveComponent.LeaveComponentLopDetails);

                }
                tenantConnectionFactory.Transaction.Commit();

                return id;
            }
            catch (Exception)
            {
                tenantConnectionFactory.Transaction.Rollback();

				throw;
            }
        }
        public async Task<IEnumerable<int>> GetAllAssignedLeaveComponents()
        {
            return await leaveComponentRepository.GetAllAssignedLeaveComponents();
        }

        public async Task<int> UpdateAsync(LeaveComponent leaveComponent)
        {
            try
            {
                tenantConnectionFactory.Connection.BeginTransaction();
                int intreturn;
                intreturn = await leaveComponentRepository.UpdateAsync(leaveComponent);
                if (leaveComponent.Id > 0)
                {
                    if (leaveComponent.LeaveComponentLopDetails != null && leaveComponent.LeaveComponentLopDetails.Count > 0)
                    {
                        leaveComponent.LeaveComponentLopDetails.ForEach(x => x.LeaveComponentId = leaveComponent.Id);
                    }
                    await leaveComponentLopDetails.BulkInsertAsync(leaveComponent.LeaveComponentLopDetails);

                }
                tenantConnectionFactory.Transaction.Commit();
                return intreturn;
            }
            catch (Exception)
            {
                tenantConnectionFactory.Transaction.Rollback();

                throw;
            }
        }

        public async Task<IEnumerable<BenefitCategory>> GetBenefitCategory()
        {
            return await leaveComponentRepository.GetBenefitCategory();
        }

        public async Task<IEnumerable<BenefitTypes>> GetAccrualBenefitType()
        {
            return await leaveComponentRepository.GetAccrualBenefitType();
        }

        public async Task<IEnumerable<BenefitTypes>> GetAccrualType()
        {
            return await leaveComponentRepository.GetAccrualType();
        }

        public async Task<IEnumerable<BenefitTypes>> GetDeductionType()
        {
            return await leaveComponentRepository.GetDeductionType();
        }

        public async Task<IEnumerable<BenefitTypes>> GetBenefitType(int categoryid)
        {
            return await leaveComponentRepository.GetBenefitType(categoryid);
        }
    }
}
﻿using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IOverTimePolicySlabService : IAsyncService<OverTimeSlab>
    {
        Task<bool> IsOverTimePolicyCodeExist(string code);
        Task<IEnumerable<BenefitTypes>> GetOverTimeBenefitTypes();
        Task<IEnumerable<OverTimeSlab>> GetOverTimeComponentDetails(int overtimepolicyid);
    }
}
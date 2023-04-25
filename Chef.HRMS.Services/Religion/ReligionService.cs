﻿using Chef.Common.Models;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class ReligionService : AsyncService<Religion>, IReligionService
    {
        private readonly IReligionRepository religionRepository;

        public ReligionService(IReligionRepository religionRepository)
        {
            this.religionRepository = religionRepository;
        }

        public async Task<bool> IsReligionCodeExist(string code)
        {
            return await religionRepository.IsReligionCodeExist(code);
        }

        public async Task<bool> IsReligionNameExist(string name)
        {
            return await religionRepository.IsReligionNameExist(name);
        }
    }
}
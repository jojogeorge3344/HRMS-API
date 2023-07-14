﻿using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IUserVariableService : IAsyncService<UserVariable>
{
    Task<bool> IsUserVariableExist(string code);
}

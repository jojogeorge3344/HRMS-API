using System.Collections.Generic;

namespace Chef.HRMS.Models;

public class ExpensePolicyExpenseTypeInsert
{
    public IEnumerable<ExpensePolicyConfiguration> ExpensePolicyConfiguration { get; set; }
    public IEnumerable<int> ExpensePolicyConfigurationIds { get; set; }
}

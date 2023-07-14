using System.Collections.Generic;

namespace Chef.HRMS.Models;

public class PayrollComponentConfigurationInsert
{
    public IEnumerable<PayrollComponentConfiguration> PayrollComponentConfiguration { get; set; }
    public IEnumerable<int> PayrollComponentConfigurationIds { get; set; }
}

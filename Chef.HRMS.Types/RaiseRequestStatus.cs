using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Types
{
    public enum AssetStatus
    {
       Requested=1,
       Approved,
       Rejected,
       Allocated,
       Unallocated,
       Revoked,
       Change_Request,
       Return_Request,
       Recalled,
       Returned
    }
}

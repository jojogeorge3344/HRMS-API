using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Types
{
    public enum AssetStatus
    {
       Requested = 1,
       Approved = 2,
       Rejected = 3,
       Allocated = 4,
       Unallocated = 5,
       Revoked = 6,
       ChangeRequest = 7,
       ReturnRequest = 8,
       Recalled = 9,
       Returned = 10
    }
}

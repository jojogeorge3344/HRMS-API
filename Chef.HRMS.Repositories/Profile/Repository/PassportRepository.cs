using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PassportRepository : GenericRepository<Passport>, IPassportRepository
    {
        public PassportRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<PassportView>> GetByEmployeeId(int employeeId)
        {
            using (Connection)
            {
                var sql = @"SELECT A.id           AS PassportId, 
                                   C.id           AS DocumentId, 
                                   B.id           AS PassportDocumentId, 
                                   A.address      AS Address, 
                                   A.dateofexpiry AS DateOfExpiry, 
                                   A.dateofissue  AS DateOfIssue, 
                                   A.mothername   AS MotherName, 
                                   A.nationality  AS Nationality, 
                                   A.placeofbirth AS placeofbirth, 
                                   A.placeofissue AS PlaceOfIssue, 
                                   A.surname      AS SurName, 
                                   A.dateofbirth  AS DateOfBirth, 
                                   A.NAME         AS NAME, 
                                   A.fathername   AS FatherName, 
                                   A.number       AS Number, 
                                   A.employeeid   AS EmployeeId, 
                                   A.isapproved   AS IsApproved, 
                                   C.extension    AS Extension, 
                                   C.NAME         AS FileName, 
                                   C.path         AS Path 
                            FROM   passport A 
                                   INNER JOIN passportdocument B 
                                           ON A.id = B.passportid AND A.employeeid = @employeeId
                                   INNER JOIN document C 
                                           ON B.documentid = C.id ";

                return await Connection.QueryAsync<PassportView>(sql, new { employeeId });
            }
        }
    }
}
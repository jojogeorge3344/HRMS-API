namespace Chef.HRMS.Repositories.Report;

public class EmployeeRevisionBoldReportRepository : BaseRepository, IEmployeeRevisionBoldReportRepository
{
    public async Task<EmployeeRevisionOldDetailsBoldDto> GetemployeeOldDetailsAsync(int id)
    {
        string query = @"SELECT ls.name AS leavestructurename,sh.name AS shiftname,er.weekoff,
                             hc.name AS holidaycategoryname,eos.bfname AS eosname,jt.name AS jobtitlename,
                             er.departmentid,er.workertype,er.timetype,er.attendancetrackingid,
                             prs.name AS payrollstructurename,pg.name AS paygroupname,otp.name AS overtimepolicyname
                            FROM hrms.employeerevisionold er
                            LEFT JOIN hrms.HRMSEmployee e
                                ON er.employeeid = e.id
                            LEFT JOIN hrms.leavestructure ls
                                ON er.leavesstructureid = ls.id
                            LEFT JOIN hrms.shift sh
                                ON er.shiftid = sh.id
                            LEFT JOIN hrms.holidaycategory hc
                                ON er.holidaycategoryid = hc.id
                            LEFT JOIN hrms.endofservice eos
                                ON er.eosid = eos.id
                            LEFT JOIN hrms.jobtitle jt
                                ON er.jobtitleid = jt.id
                            LEFT JOIN hrms.payrollstructure prs
                                ON er.payrollstructureid = prs.id
                            LEFT JOIN hrms.paygroup pg
                                ON er.paygroupid = pg.id
                            LEFT JOIN hrms.overtimepolicy otp
                                ON er.overtimepolicyid = otp.id
                            WHERE er.employeerevisionid = @id";

        return await DatabaseSession.QueryFirstAsync<EmployeeRevisionOldDetailsBoldDto>(query, new { id });

    }
    public async Task<EmployeeRevisionNewDetailsBoldDto> GetemployeeNewDetailsAsync(int id)
    {
        string query = @"SELECT ls.name AS leavestructurename,sh.name AS shiftname,er.weekoff,
                              hc.name AS holidaycategoryname,eos.bfname AS eosname,jt.name AS jobtitlename,
                              er.departmentid,er.workertype,er.timetype,er.attendancetrackingid,
                              prs.name AS payrollstructurename,pg.name AS paygroupname,otp.name AS overtimepolicyname,
                              e.firstname,e.middlename,e.lastname,er.effectivefrm AS effectivefrom,er.remark,
                              er.reqnum,er.requestedby,er.reqdate AS requesteddate
                            FROM hrms.employeerevision er
                            LEFT JOIN hrms.HRMSEmployee e
                              ON er.employeeid = e.id
                            LEFT JOIN hrms.leavestructure ls
                              ON er.leavesstructureid = ls.id
                            LEFT JOIN hrms.shift sh
                              ON er.shiftid = sh.id
                            LEFT JOIN hrms.holidaycategory hc
                              ON er.holidaycategoryid = hc.id
                            LEFT JOIN hrms.endofservice eos
                              ON er.eosid = eos.id
                            LEFT JOIN hrms.jobtitle jt
                              ON er.jobtitleid = jt.id
                            LEFT JOIN hrms.payrollstructure prs
                              ON er.payrollstructureid = prs.id
                            LEFT JOIN hrms.paygroup pg
                              ON er.paygroupid = pg.id
                            LEFT JOIN hrms.overtimepolicy otp
                              ON er.overtimepolicyid = otp.id
                            WHERE er.id = @id";

        return await DatabaseSession.QueryFirstAsync<EmployeeRevisionNewDetailsBoldDto>(query, new { id });
    }

    public async Task<IEnumerable<EmployeeSalarayDto>> GetSalaryOldDetailsAsync(int id)
    {
        string query = @"SELECT pc.name AS payrollcomponentname,erdo.monthlyamount AS amount
                             FROM hrms.employeerevisionold er
                             INNER JOIN hrms.employeerevisiondetailsold erdo
                               ON er.employeerevisionid = erdo.employeerevisionid
                             INNER JOIN hrms.payrollcomponent pc
                               ON erdo.payrollcomponentid = pc.id
                             WHERE er.employeerevisionid = @id";

        return await DatabaseSession.QueryAsync<EmployeeSalarayDto>(query, new { id });
    }

    public async Task<IEnumerable<EmployeeSalarayDto>> GetSalaryNewDetailsAsync(int id)
    {
        string query = @"SELECT pc.name AS payrollcomponentname,erd.monthlyamount AS amount
                             FROM hrms.employeerevision er
                             INNER JOIN hrms.employeerevisiondetails erd
                               ON er.id = erd.employeerevisionid
                             INNER JOIN hrms.payrollcomponent pc
                               ON erd.payrollcomponentid = pc.id
                             WHERE er.id = @id";
        return await DatabaseSession.QueryAsync<EmployeeSalarayDto>(query, new { id });
    }

}
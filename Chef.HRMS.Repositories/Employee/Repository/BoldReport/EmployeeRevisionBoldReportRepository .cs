using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeRevisionBoldReportRepository : BaseRepository, IEmployeeRevisionBoldReportRepository
    {
        public async Task<IEnumerable<EmployeeRevisionBoldDto>> GetemployeeOldDetailsAsync(int id)
        {
            string query = string.Format(@"SELECT Concat (e.firstname, ' ', e.lastname) AS EmployeeName,er.effectivefrm,er.remark,
                                          er.reqnum,er.requestedby,er.reqdate,ls.name AS LeaveStructure,sh.name AS Shift,
                                          er.weekoff,hd.name AS HolidayList,eos.bfcode,eos.bfname,jt.name AS Designation,
                                          jd.department,er.worktype,er.timetype,er.attendancetrackingid,
                                          prs.name AS PayrollStructure,pg.name AS PayGroup,otp.name AS OverTimePolicy
                                          FROM hrms.employeerevisionold er
                                          LEFT JOIN hrms.HRMSEmployee e ON er.employeeid = e.id 
                                          LEFT JOIN  hrms.leavestructure ls ON er.leavestructureid=ls.id
                                          LEFT JOIN hrms.shift sh ON er.shiftid=sh.id
                                          LEFT JOIN hrms.holiday hd ON er.holidaycategoryid=hd.id
                                          LEFT JOIN  hrms.endofservice eos ON er.eosid=eos.id
                                          LEFT JOIN hrms.jobtitle jt ON er.jobtitleid=jt.id
                                          LEFT JOIN hrms.payrollstructure prs ON er.payrollstructureid=prs.id
                                          LEFT JOIN hrms.paygroup pg ON er.paygroupid=pg.id
                                         LEFT JOIN hrms.overtimepolicy otp ON er.overtimepolicyid=otp.id
                                     WHERE employeerevisionold.id = {0}", id);
           
            var result = await DatabaseSession.QueryAsync<EmployeeRevisionBoldDto>(query);
            return result;
        }
        public async Task<IEnumerable<EmployeeRevisionBoldDto>> GetemployeeNewDetailsAsync(int id)
        {
            string query = string.Format(@"SELECT Concat (e.firstname, ' ', e.lastname) AS EmployeeName,er.effectivefrm,er.remark,
                                          er.reqnum,er.requestedby,er.reqdate,ls.name AS LeaveStructureNew,sh.name AS ShiftNew,
                                          er.weekoff,hd.name AS HolidayListNew,eos.bfcode,eos.bfname,jt.name AS DesignationNew,
                                          jd.department,er.worktype,er.timetype,er.attendancetrackingid,
                                          prs.name AS PayrollStructureNew,pg.name AS PayGroupNew,otp.name AS OverTimePolicyNew
                                          FROM hrms.employeerevision er
                                          LEFT JOIN hrms.HRMSEmployee e ON er.employeeid = e.id 
                                          LEFT JOIN  hrms.leavestructure ls ON er.leavestructureid=ls.id
                                          LEFT JOIN hrms.shift sh ON er.shiftid=sh.id
                                          LEFT JOIN hrms.holiday hd ON er.holidaycategoryid=hd.id
                                          LEFT JOIN  hrms.endofservice eos ON er.eosid=eos.id
                                          LEFT JOIN hrms.jobtitle jt ON er.jobtitleid=jt.id
                                          LEFT JOIN hrms.payrollstructure prs ON er.payrollstructureid=prs.id
                                          LEFT JOIN hrms.paygroup pg ON er.paygroupid=pg.id
                                         LEFT JOIN hrms.overtimepolicy otp ON er.overtimepolicyid=otp.id
                                        WHERE employeerevision.id = {0}", id);
            var result = await DatabaseSession.QueryAsync<EmployeeRevisionBoldDto>(query);
            return result;
        }

        public async Task<IEnumerable<EmployeeSalarayDto>> GetSalaryOldDetailsAsync(int id)
        {
            string query = string.Format(@"SELECT pr.name,es.monthlyamount 
                                            FROM hrms.employeerevisionold er
                                            LEFT JOIN hrms.payrollcomponent pr ON er.payrollstructureid=pr.id
                                            LEFT JOIN hrms.employeesalaryconfigurationdetails es ON er.payrollstructureid=es.id
                                            WHERE employeerevisionold.id = {0}", id);
            var result = await DatabaseSession.QueryAsync<EmployeeSalarayDto>(query);
            return result;
        }

        public async Task<IEnumerable<EmployeeSalarayDto>> GetSalaryNewDetailsAsync(int id)
        {
            string query = string.Format(@"SELECT pr.name,es.monthlyamount 
                                            FROM hrms.employeerevision er
                                            LEFT JOIN hrms.payrollcomponent pr ON er.payrollstructureid=pr.id
                                            LEFT JOIN hrms.employeesalaryconfigurationdetails es ON er.payrollstructureid=es.id
                                             WHERE employeerevision.id = {0}", id);
            var result = await DatabaseSession.QueryAsync<EmployeeSalarayDto>(query);
            return result;
        }

    }
}
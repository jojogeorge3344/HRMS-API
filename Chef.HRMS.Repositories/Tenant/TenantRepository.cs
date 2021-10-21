using Chef.Common.Models;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Text;
using Authentication = Chef.HRMS.Models.Authentication;

namespace Chef.HRMS.Repositories
{
    public class TenantRepository : GenericRepository<HRMSTenant>, ITenantRepository
    {
        private readonly IEnumerable<Country> countries = new List<Country>
        {
            new Country{ Name = "India" },
            new Country{ Name = "Saudi Arabia" },
            new Country{ Name = "Kuwait" },
            new Country{ Name = "United Arab Emirates" },
            new Country{ Name = "Qatar" },
            new Country{ Name = "Bahrain" },
            new Country{ Name = "Oman" }
        };

        public TenantRepository(DbSession session) : base(session)
        {
        }

        public void CreateDatabase()
        {
            var tenant = Get();
            using (Connection)
            {
                StringBuilder query = new StringBuilder();
                query.Append($"DROP DATABASE IF EXISTS {tenant.Name};");
                query.Append($"CREATE DATABASE {tenant.Name};");
                Connection.Execute(query.ToString());
            }
        }

        public void CreateSchemas()
        {
            string fullQuery = string.Empty;

            using (Connection)
            {
                string query = new QueryBuilder<HRMSCompany>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<HRMSCompany>().GenerateInsertQuery();
                Connection.Execute(query, new HRMSCompany()
                {
                    ShortName = "Chef",
                    LegalName = "Chef Private Limited",
                    IdentificationNumber = "Chef-X"
                });
                fullQuery += query + Environment.NewLine + Environment.NewLine;


                query = new QueryBuilder<HRMSBranch>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<HRMSBranchBankAccount>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<HRMSBranchSignatory>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<HolidayCategory>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<Holiday>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;               

                query = new QueryBuilder<LeaveComponent>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<LeaveStructure>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<LeaveStructureLeaveComponent>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<LeaveComponentGeneralSettings>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<LeaveComponentRestrictionSettings>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<Leave>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                /*query = new QueryBuilder<Country>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<Country>().GenerateInsertQuery();
                Connection.Execute(query, countries);
                fullQuery += query;

                query = new QueryBuilder<State>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                //query = new QueryBuilder<Authentication>().GenerateCreateTableQuery();
                //Connection.Execute(query);
                //fullQuery += query;

                //query = new QueryBuilder<Employee>().GenerateCreateTableQuery();
                //Connection.Execute(query);
                //fullQuery += query;

                query = new QueryBuilder<Address>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;*/

                query = new QueryBuilder<JobTitle>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;
                query = new QueryBuilder<EmployeeNumberSeries>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<JobDetails>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<Shift>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<JobFiling>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<BonusType>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<PayrollProcessingMethod>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<EmployeeBonus>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;
                query = new QueryBuilder<PayrollComponent>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<PayrollStructure>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;
                query = new QueryBuilder<PayrollCalculation>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<PayrollCalendar>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<EmployeeSalaryConfiguration>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<EmployeeSalaryConfigurationDetails>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<Document>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<IdentityDocument>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<Contact>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<Dependent>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<DrivingLicense>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<Education>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<EducationDocument>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<PAN>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<Passport>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<PreviousEmployment>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<PreviousEmploymentDocument>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<UniqueIdentificationDetail>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<PayrollComponentConfiguration>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<RegularLogin>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<ExpensePolicy>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<ExpenseType>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<ExpensePolicyConfiguration>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<WorkFromHome>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<WorkFromHomeSettings>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<WorkFromHomeNotifyPersonnel>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<OnDuty>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<OnDutyNotifyPersonnel>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<PayGroup>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<PayrollBasicComponent>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<Chef.HRMS.Models.Role>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<RoleFeature>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;

                query = new QueryBuilder<Chef.HRMS.Models.UserRole>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;


                query = new QueryBuilder<Feature>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;
                query = new QueryBuilder<SubFeature>().GenerateCreateTableQuery();
                Connection.Execute(query);
                fullQuery += query;




                System.IO.File.WriteAllText(@"HRMSTableQuery.sql", fullQuery);
            }
        }

        public HRMSTenant Get()
        {
            return new HRMSTenant()
            {
                Id = 1,
                Name = "ChefDev",
                ConnectionString = "",
            };
        }
    }
}
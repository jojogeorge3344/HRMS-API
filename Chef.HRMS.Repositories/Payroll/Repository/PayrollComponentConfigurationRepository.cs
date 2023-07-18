namespace Chef.HRMS.Repositories;

public class PayrollComponentConfigurationRepository : GenericRepository<PayrollComponentConfiguration>, IPayrollComponentConfigurationRepository
{
    private readonly ILogPayrollComponentConfigurationRepository logPayrollComponentConfigurationRepository;

    public PayrollComponentConfigurationRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session,
        ILogPayrollComponentConfigurationRepository logPayrollComponentConfigurationRepository) : base(httpContextAccessor, session)
    {
        this.logPayrollComponentConfigurationRepository = logPayrollComponentConfigurationRepository;
    }

    public async Task<IEnumerable<PayrollComponentConfiguration>> GetAllByPayrollStuctureId(int payrollStructureId)
    {
        var sql = @"SELECT pcc.*,bt.categoryid,COALESCE(pc.ordernumber,0) as ordernumber FROM hrms.payrollcomponentconfiguration pcc 
                        INNER JOIN hrms.benefittypes bt
                        ON pcc.payrollcomponenttype = bt.id
                        INNER JOIN hrms.payrollcomponent pc
                        ON pcc.payrollcomponentid = pc.id
                        WHERE pcc.payrollstructureid = @payrollStructureId
                        AND pcc.isarchived = false ORDER BY ordernumber,pcc.name";

        return await Connection.QueryAsync<PayrollComponentConfiguration>(sql, new { payrollStructureId });
    }

    public async Task<int> InsertAsync(IEnumerable<PayrollComponentConfiguration> payrollComponentConfiguration, IEnumerable<int> PayrollComponentConfigurationIds)
    {
        int result = 0;

        using (var transaction = Connection.BeginTransaction())
        {
            try
            {
                int payrollStructure = payrollComponentConfiguration.Select(x => x.PayrollStructureId).ToList().FirstOrDefault();
                if (payrollComponentConfiguration.Count() > 0)
                {
                    (from pbc in payrollComponentConfiguration
                     select pbc).ToList().ForEach((pbc) =>
                     {
                         pbc.CreatedDate = pbc.ModifiedDate = DateTime.UtcNow;
                         pbc.IsArchived = false;
                     });
                    var sql = new QueryBuilder<PayrollComponentConfiguration>().GenerateInsertQuery();
                    sql = sql.Replace("RETURNING Id", "");
                    sql += " ON CONFLICT ON CONSTRAINT payrollcomponentconfiguration_ukey_payrollcomponentid_payrollst DO NOTHING";

                    result = await Connection.ExecuteAsync(sql, payrollComponentConfiguration);

                    var payroll = this.GetDetailsByPayrollStuctureId(payrollStructure).Result;

                    List<LogPayrollComponentConfiguration> payrollComponentConfigurationlist = new List<LogPayrollComponentConfiguration>();
                    foreach (PayrollComponentConfiguration item in payroll)
                    {
                        LogPayrollComponentConfiguration logPayrollComponentConfiguration = new LogPayrollComponentConfiguration
                        {
                            PayrollComponentId = item.PayrollComponentId,
                            ClaimFrequency = (Common.Types.ClaimFrequencyType)item.ClaimFrequency,
                            ClaimLimit = item.ClaimLimit,
                            Description = item.Description,
                            IsCustomizedAndOverridenAtEmployeeLevel = item.IsCustomizedAndOverridenAtEmployeeLevel,
                            IsDifferenceAmountAdjustable = item.IsDifferenceAmountAdjustable,
                            IsLossOfPayAffected = item.IsLossOfPayAffected,
                            IsPaidSeparately = item.IsPaidSeparately,
                            IsPartOfArrearCalculation = item.IsPartOfArrearCalculation,
                            IsPartOfEarningsAndDeductions = item.IsPartOfEarningsAndDeductions,
                            IsPartOfLossOfPayCalculation = item.IsPartOfLossOfPayCalculation,
                            IsProofRequired = item.IsProofRequired,
                            IsRecurring = item.IsRecurring,
                            IsVisibleInPayslip = item.IsVisibleInPayslip,
                            MaximumLimit = item.MaximumLimit,
                            Name = item.Name,
                            PayoutPattern = (Common.Types.PayoutPattern)item.PayoutPattern,
                            PayrollComponentType = item.PayrollComponentType,
                            PayrollStructureId = item.PayrollStructureId,
                            ShortCode = item.ShortCode,
                            IsConfigured = item.IsConfigured,
                            CategoryId = item.CategoryId,
                            PayrollComponentConfigurationId = item.Id,
                        };
                        payrollComponentConfigurationlist.Add(logPayrollComponentConfiguration);
                    }
                    await logPayrollComponentConfigurationRepository.BulkInsertAsync(payrollComponentConfigurationlist);

                    if (result != 0)
                    {
                        var payrollStructureId = payrollComponentConfiguration.Select(x => x.PayrollStructureId).FirstOrDefault();
                        var sqlnew = @"UPDATE hrms.payrollstructure
	                                              SET isconfigured=false
	                                               WHERE id=@payrollStructureId";
                        await Connection.ExecuteAsync(sqlnew, new { payrollStructureId });

                    }

                }
                if (PayrollComponentConfigurationIds.Count() > 0)
                {
                    string PayrollComponentConfigurationId = string.Join(",", PayrollComponentConfigurationIds.ToList().Select(l => l.ToString()).ToArray());
                    var sql = "DELETE FROM hrms.payrollcomponentconfiguration WHERE id IN (" + PayrollComponentConfigurationId + ")";

                    await Connection.ExecuteAsync(sql, PayrollComponentConfigurationId);
                }

                //return 0;
                transaction.Commit();
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                transaction.Rollback();
                //return -1;
            }
        }
        return result;
    }
    public async Task<int> SetPayrollStructureIsConfigured(int payrollStructureId)
    {
        try
        {
            var sql = @"SELECT hrms.setpayrollstructureisconfigured(@payrollStructureId)";
            var result = await Connection.ExecuteAsync(sql, new { payrollStructureId });
            if (result == -1)
            {

                return 1;
            }
            else
            {
                return 0;
            }
        }
        catch
        {
            throw;
        }
    }

    public async Task<int> InsertPayrollFixedCalculation(PayrollCalculation payrollCalculation)
    {
        var sql = new QueryBuilder<PayrollCalculation>().GenerateInsertQuery();
        sql = sql.Replace("RETURNING Id", "");
        sql += " ON CONFLICT ON CONSTRAINT payrollcalculation_componentid_structureid_ukey DO NOTHING";
        return await Connection.ExecuteAsync(sql, payrollCalculation);
    }

    public async Task<IEnumerable<PayrollComponentConfiguration>> GetAllByPayrollComponentId(int payrollComponentId)
    {
        var sql = @"SELECT pcc.*,bt.categoryid FROM hrms.payrollcomponentconfiguration pcc 
                        INNER JOIN hrms.benefittypes bt
                        ON pcc.payrollcomponenttype = bt.id
                        WHERE pcc.payrollcomponentid = @payrollComponentId
                        AND pcc.isarchived = false ORDER BY pcc.name ASC";

        return await Connection.QueryAsync<PayrollComponentConfiguration>(sql, new { payrollComponentId });
    }

    public async Task<IEnumerable<PayrollComponentConfiguration>> GetDetailsByPayrollStuctureId(int payrollStructureId)
    {
        var sql = @"SELECT * FROM hrms.payrollcomponentconfiguration 
                        WHERE payrollstructureid = @payrollStructureId
                        AND isarchived = false";

        return await Connection.QueryAsync<PayrollComponentConfiguration>(sql, new { payrollStructureId });
    }
}
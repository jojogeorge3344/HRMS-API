namespace Chef.HRMS.Repositories
{
    public class AssetEmployeeWiseRepository :TenantRepository<AssetEmployeeWise>, IAssetEmployeeWiseRepository
    {
        public AssetEmployeeWiseRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<AssetEmployeeWise>> GetAll()
        {
            var sql = @"SELECT  jt.id,
                                jd.employeenumber,
                                jd.employeeid,
                                jt.firstname,
                                jt.lastname,
                                jd.workertype AS employeestatus
                                       FROM hrms.HRMSEmployee AS jt 
                                       INNER JOIN hrms.jobdetails AS jd ON jt.id = jd.employeeid ORDER BY jt.id";

            return await Connection.QueryAsync<AssetEmployeeWise>(sql);
        }


        public async Task<IEnumerable<AssetCountViewModel>> GetAllCount()
        {
            var sql = @"SELECT * FROM(		
                                SELECT empid, COUNT(*) AS allocatedasset
                                        FROM hrms.assetallocated 
                                        WHERE status = 4 OR status=7 OR status=8
                                        GROUP BY empid)a
                                        FULL JOIN
                                        (SELECT empid, COUNT(*) AS requests
                                        FROM hrms.assetraiserequest
                                        WHERE (status = 1 OR status = 7 OR status =8)
                                        GROUP BY empid)b USING(empid)";

            return await Connection.QueryAsync<AssetCountViewModel>(sql);
        }

       
        public async Task<IEnumerable<AssetAllocated>> GetAllocatedAssetById(int empid)
        {
               var sql = @"SELECT   id,
                                    empid,
								    assettypeid,
                                    assettypename,
                                    assetid,
								    assetraiserequestid,
                                    assetname,
                                    allocateddate,
                                    status 
                            FROM hrms.assetallocated 
                            WHERE( status = 4 OR status = 8 OR status=9 OR status=7) AND empid=@empid";

            return await Connection.QueryAsync<AssetAllocated>(sql, new { empid });
        }

        

        public async Task<IEnumerable<Asset>> GetAssetDetailsById(int assettypeid)
        {
            var sql = @"SELECT DISTINCT id,
			                           assettypeid,
			                            assettypemetadataid,
			                            valueid,
			                            status,
			                            CONCAT(assetname,'-',valueid) AS assetname 
		                            FROM hrms.asset WHERE status=5  
                                                    AND assettypeid=@assettypeid";

            return await Connection.QueryAsync<Asset>(sql, new { assettypeid });
        }


        public async Task<IEnumerable<AssetEmployeeWise>> GetEmployeeDetailsById(int employeeid)
        {
               var sql = @"SELECT   employeeid,
                                    CONCAT (firstname ,' ' ,lastname) AS firstname,
                                    jd.workertype AS employeestatus,
									jd.employeenumber,
                                    jt.name AS designation
                                FROM  hrms.HRMSEmployee INNER JOIN hrms.jobdetails AS jd
                                    ON hrms.HRMSEmployee.id=jd.employeeid INNER JOIN hrms.jobtitle AS jt 
                                    ON jd.jobtitleid=jt.id WHERE employeeid=@employeeid";

            return await Connection.QueryAsync<AssetEmployeeWise>(sql,new { employeeid });
        }


        public async Task<IEnumerable<HRMSEmployee>> GetEmployeeNameById(int id)
        {
            var sql = @"SELECT firstname,lastname FROM hrms.HRMSEmployee WHERE id=@id";

            return await Connection.QueryAsync<HRMSEmployee>(sql, new { id });
        }


        public async Task<IEnumerable<AssetRaiseRequest>> GetEmployeeRequestById(int empid)
        {

            var sql= @"SELECT    rr.id,rr.assettypeid,tt.assettypename,
                                 rr.requestno,
                                 rr.requestfor,
	                             rr.requesttype,
								 CONCAT (firstname ,' ' ,lastname) AS requestedby,
                                 rr.status,
	                             rr.empid,
							     rr.nameofteammemberid,
                                rr. requesteddate
					        FROM hrms.assetraiserequest AS rr INNER JOIN hrms.HRMSEmployee emp
                                 ON rr.empid=emp.id INNER JOIN hrms.assettype AS tt
                                 ON rr.assettypeid=tt.id WHERE empid=@empid 
                                                        ORDER BY id desc";

            return await Connection.QueryAsync<AssetRaiseRequest>(sql, new { empid });
        }


        public async Task<IEnumerable<AssetMetadataValue>> GetMetadatavaluesById(int assetid)
        {
            var sql = @"SELECT  id,
                                assettypeid,
                                assetid,
                                value,
                                assettypemetadataid
                                    FROM hrms.assetmetadatavalue WHERE assetid=@assetid";

            return await Connection.QueryAsync<AssetMetadataValue>(sql, new { assetid });
        }


        public async Task<IEnumerable<AssetRaiseRequest>> GetRequestById(int id)
        {
            var sql = @"SELECT    rr.id,
                                 rr.requestno,
                                 rr.requestfor,
	                             rr.requesttype,
								 tt.id              AS assettypeid,
                                 tt.assettypename,
                                 rr.status,
	                             rr.empid,
								 rr.nameofteammemberid,
							     CONCAT (firstname ,' ',lastname) AS nameofteammember,
                                 rr.requesteddate,
                                 rr.description
					    FROM hrms.assetraiserequest AS rr INNER JOIN hrms.assettype AS tt
					             ON rr.assettypeid=tt.id INNER JOIN hrms.HRMSEmployee AS ee 
                                 ON rr.nameofteammemberid=ee.id
                                                 WHERE rr.id=@id
                                                    ORDER BY rr.id";

            return await Connection.QueryAsync<AssetRaiseRequest>(sql, new { id });
        }


        public async Task<IEnumerable<AssetAllocationViewModel>> GetAllocationDetails(int id)
        {
            var sql = @"SELECT     ar.requestno,
                                    ar.assettypeid,
                                   at.assettypename,
                                   ar.empid          AS requestedby,
                                   ar.description,
                                   ar.nameofteammemberid,
                                   CONCAT(ee.firstname,'-',ee.lastname)   AS allocationto
                             FROM hrms.assetraiserequest AS ar INNER JOIN hrms.assettype AS at 
                                    ON ar.assettypeid=at.id INNER JOIN hrms.HRMSEmployee AS ee
                                    ON ar.nameofteammemberid=ee.id 
                                                      WHERE ar.id=@id";

            return await Connection.QueryAsync<AssetAllocationViewModel>(sql, new { id });
        }


        public async Task<IEnumerable<AssetAllocationViewModel>> GetMetadataDetailsById(int assettypeid)
        {
            var sql = @"SELECT 
	
		                        CONCAT(t1.assetname,'-',t1.valueid) AS assetcode,
								t1.assetid,
								t1.status,
								t1.assetname,
								t1.description,
                                t1.assettypeid,
                                max(CASE WHEN rn = 1 THEN value END) metadatavalue1 ,
                                max(CASE WHEN rn = 2 THEN value END) metadatavalue2  ,
                                max(CASE WHEN rn = 3 THEN value END) metadatavalue3, 
                                max(CASE WHEN rn = 4 THEN value END) metadatavalue4,
                                max(CASE WHEN rn = 5 THEN value END) metadatavalue5,
		                        max(CASE WHEN rn = 1 THEN id END) assetmetadatavalueid,
                                max(CASE WHEN rn = 2 THEN id END) metadatavalueid2  ,
                                max(CASE WHEN rn = 3 THEN id END) metadatavalueid3, 
                                max(CASE WHEN rn = 4 THEN id END) metadatavalueid4,
                                max(CASE WHEN rn = 5 THEN id END) metadatavalueid5
                        FROM (
                            SELECT am.*,aa.assetname,aa.status,aa.valueid,
								aa.description,Row_number() OVER(PARTITION BY 
		                        am.assetid,
                                am.assettypeid
                                 ORDER BY (select 1)) rn
                            FROM hrms.assetmetadatavalue am INNER JOIN hrms.asset aa ON am.assetid=aa.id  
							WHERE (aa.status=5 AND aa.isactive='true') AND am.assettypeid=@assettypeid
                        ) t1
                        GROUP BY
		                        t1.assetid,
                                t1.assettypeid,
								t1.assetname,
								t1.description,
								t1.status,
                                t1.valueid";

            return await Connection.QueryAsync<AssetAllocationViewModel>(sql, new { assettypeid });
        }

        public async Task<IEnumerable<AssetViewModel>> GetAssetId(int assetraiserequestid)
        {
            var sql = "SELECT assetid FROM hrms.assetallocated WHERE assetraiserequestid=@assetraiserequestid";

            return await Connection.QueryAsync<AssetViewModel>(sql, new { assetraiserequestid });
        }

        public async Task<IEnumerable<AssetReasonViewModel>> GetReasonAndDescription(int assetraiserequestid, int status, int assetid)
        {

            if (status == 7)
            {
                var sql = @"SELECT 
                                am.changetype as reason, 
                                am.changedescription        AS comments,
                                at.requesttype              AS type
                            FROM hrms.assetmyasset    AS am
							INNER JOIN hrms.assetraiserequest AS at ON am.assetraiserequestid = at.id
                            WHERE am.assetraiserequestid = @assetraiserequestid AND am.assetid=@assetid AND am.status=7";

                return await Connection.QueryAsync<AssetReasonViewModel>(sql, new { assetraiserequestid, status, assetid });
                //return result;
            }

            else if(status==8 || status==10) 
            {
                var sql = @"SELECT 
                                am.returntype as reason, 
                                am.returndescription     AS comments,
                                at.requesttype           AS type
                            FROM hrms.assetmyasset AS am
							INNER JOIN hrms.assetraiserequest AS at ON am.assetraiserequestid = at.id
                            WHERE am.assetraiserequestid = @assetraiserequestid AND am.assetid=@assetid AND am.status=8";

                return await Connection.QueryAsync<AssetReasonViewModel>(sql, new { assetraiserequestid, status, assetid });
            }
            else
            {
                return null;
            }

        }


        public async Task<int> InsertAsync(IEnumerable<AssetAllocated> assetAllocated)
        {
            var sql = new QueryBuilder<AssetAllocated>().GenerateInsertQuery();
            sql = sql.Replace("RETURNING id", "");  
            return await Connection.ExecuteAsync(sql, assetAllocated);
        }

        public async Task<int> InsertAsync(AssetAllocated assetAllocated)
        {
            var sql = new QueryBuilder<AssetAllocated>().GenerateInsertQuery();
            sql = sql.Replace("RETURNING id", "");
            assetAllocated.Id = Convert.ToInt32(await Connection.ExecuteAsync(sql, assetAllocated));
            return assetAllocated.Id;
        }

        public async Task<int> UpdateApproveReject(int id, int status)
        {
            if (status == 2 || status == 3 || status==6)
            {
                var sql = @"UPDATE hrms.assetraiserequest 
                                    SET status=@status WHERE id=@id";

                var result = await Connection.ExecuteAsync(sql, new { id, status });
                return result;
            }    
            else
            {
                return 0;
            }    
        }


        public async Task<int> UpdateStatus(int id, int status)
        {
            int result = 0;
            using (var transaction = Connection.BeginTransaction())
            {
                try
                {
                    if (status == @status)
                    {
                        var sql = @"UPDATE hrms.asset
                                            SET status=5 WHERE id=@id;
                                    UPDATE hrms.assetallocated 
                                            SET status=5 WHERE assetid=@id;
                                    UPDATE hrms.assetraiserequest 
                                            SET status=4 WHERE status=7 AND assetid=@id";

                        result = await Connection.ExecuteAsync(sql, new { id, status });
                    }
                    transaction.Commit();
                }
                catch (System.Exception ex)
                {
                    string msg = ex.Message;
                    //return -1;
                    transaction.Rollback();
                }
            }
            return result;
        }


        public async Task<int> UpdateStatusRecalled(int empid, int assetid, int status)
        {
            if(status==@status)
            {
                var sql = @"UPDATE hrms.assetallocated 
                                    SET status=9 WHERE status=4 
                                        AND (empid =@empid AND assetid=@assetid);
                            UPDATE hrms.asset 
                                    SET status=5 WHERE status=4 
                                         AND id=@assetid";

                var result = await Connection.ExecuteAsync(sql, new { empid,assetid, status });
                return result;
            }
            else
            {
                return 0;
            }
        }

        public async Task<int> UpdateAllocateStatus(int id, int assetraiserequestid, int status)
        {
            if (status == @status)
            {
                var sql = @"UPDATE hrms.asset
                                            SET status=4 WHERE id=@id;
                                    UPDATE hrms.assetallocated 
                                            SET status=4 WHERE assetid=@id AND assetraiserequestid=@assetraiserequestid;
                                    UPDATE hrms.assetraiserequest 
                                            SET status=4,assetid=@id WHERE id=@assetraiserequestid";

                var result = await Connection.ExecuteAsync(sql, new { id, assetraiserequestid, status });
                return result;
            }
            else
            {
                return 0;
            }
        }

        public async Task<int> UpdateAssetStatus(IEnumerable<AssetAllocated> assetAllocated)
        {
                var sql = @"UPDATE hrms.asset
                                            SET status=4 WHERE id=@assetid;
                            UPDATE hrms.assetraiserequest
                                            SET status=4,requesttype=1,assetid=@assetid, assettypeid=@assettypeid 
                                                        WHERE id=@assetraiserequestid";

                return await Connection.ExecuteAsync(sql, assetAllocated);
        }

        
        public async Task<int> UpdateReturnStatus(int assetid, int status, int assetraiserequestid)
        {
                    if (status == @status)
                    {
                        var sql = @"UPDATE hrms.asset
                                                SET status=5 WHERE id=@assetid;
                                UPDATE hrms.assetallocated
                                                SET status=10 WHERE assetraiserequestid=@assetraiserequestid AND assetid=@assetid;
                                UPDATE hrms.assetraiserequest
                                                SET status=10 WHERE id=@assetraiserequestid AND assetid=@assetid";

                        var result = await Connection.ExecuteAsync(sql, new { assetid, status, assetraiserequestid });
                        return result;
                    }
                    else
                    {
                        return 0;
                    }                     
        }
        public async Task<int> UpdateAsync(AssetAllocated assetAllocated)
        {
            var sql = new QueryBuilder<AssetAllocated>().GenerateUpdateQuery();
            sql = sql.Replace("RETURNING id", "");
            return await Connection.ExecuteAsync(sql, assetAllocated);
        }


        public async Task<int> Delete(int id)
        {
            var sql = @"DELETE FROM hrms.assetallocated WHERE assetid=@id";

            return await Connection.ExecuteAsync(sql, new { id });
        }


        public Task<IEnumerable<AssetEmployeeWise>> GetAllList()
        {
            throw new NotImplementedException();
        }

        
    }
}

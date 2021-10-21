CREATE TABLE IF NOT EXISTS hrms.hrmscompany (
		id SERIAL PRIMARY KEY,
		businesstype integer NOT NULL,
		dateofincorporation timestamp NOT NULL,
		identificationnumber text NOT NULL,
		legalname text NOT NULL,
		logofilepath text,
		shortname text NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.hrmscompany OWNER to postgres; 



INSERT INTO hrms.hrmscompany (BusinessType,DateOfIncorporation,IdentificationNumber,LegalName,LogoFilePath,ShortName,CreatedDate,ModifiedDate,CreatedBy,ModifiedBy,IsArchived) VALUES (@BusinessType,@DateOfIncorporation,@IdentificationNumber,@LegalName,@LogoFilePath,@ShortName,@CreatedDate,@ModifiedDate,@CreatedBy,@ModifiedBy,@IsArchived) RETURNING Id

CREATE TABLE IF NOT EXISTS hrms.hrmsbranch (
		id SERIAL PRIMARY KEY,
		companyid integer NOT NULL REFERENCES hrms.hrmscompany(id),
		shortname text NOT NULL,
		addressline1 text NOT NULL,
		addressline2 text,
		city text NOT NULL,
		stateorprovince integer,
		statename text,
		country integer NOT NULL,
		countryname text NOT NULL,
		pincode text NOT NULL,
		email text,
		fax text,
		phone text,
		timezoneid text NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.hrmsbranch OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.hrmsbranchbankaccount (
		id SERIAL PRIMARY KEY,
		branchid integer NOT NULL REFERENCES hrms.hrmsbranch(id),
		corporateid text NOT NULL,
		accountnumber text NOT NULL,
		accountname text NOT NULL,
		bankname text NOT NULL,
		ifsccode text NOT NULL,
		branchname text NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.hrmsbranchbankaccount OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.hrmsbranchsignatory (
		id SERIAL PRIMARY KEY,
		branchid integer NOT NULL REFERENCES hrms.hrmsbranch(id),
		fullname text NOT NULL,
		fathername text NOT NULL,
		designation text NOT NULL,
		email text,
		pannumber text NOT NULL,
		phone text,
		fax text,
		addressline1 text NOT NULL,
		addressline2 text,
		city text NOT NULL,
		stateorprovince integer,
		statename text,
		country integer NOT NULL,
		countryname text NOT NULL,
		pincode text NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.hrmsbranchsignatory OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.holidaycategory (
		id SERIAL PRIMARY KEY,
		name text NOT NULL,
		year integer NOT NULL,
		isconfigured boolean,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.holidaycategory OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.holiday (
		id SERIAL PRIMARY KEY,
		date timestamp NOT NULL,
		description text NOT NULL,
		holidaycategoryid integer NOT NULL REFERENCES hrms.holidaycategory(id),
		isfloating boolean NOT NULL,
		name text NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.holiday OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.leavecomponent (
		id SERIAL PRIMARY KEY,
		code text NOT NULL,
		name text NOT NULL,
		description text NOT NULL,
		ispaidleave boolean,
		isrestrictedtogender boolean,
		isrestrictedtomaritalstatus boolean,
		issickleave boolean,
		isstatutoryleave boolean,
		restrictedtogender integer,
		restrictedtomaritalstatus integer,
		showleavedescription boolean,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.leavecomponent OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.leavestructure (
		id SERIAL PRIMARY KEY,
		calendaryearstartdate timestamp NOT NULL,
		customdocumentpath text,
		description text NOT NULL,
		iscustomleavepolicydocumentavailable boolean,
		name text NOT NULL,
		showleavepolicyexplanation boolean,
		isconfigured boolean,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.leavestructure OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.leavestructureleavecomponent (
		id integer,
		leavecomponentid integer REFERENCES hrms.leavecomponent(id),
		leavestructureid integer REFERENCES hrms.leavestructure(id),
		isconfigured boolean,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean,
PRIMARY KEY(leavecomponentid,leavestructureid)
);
 ALTER TABLE hrms.leavestructureleavecomponent OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.leavecomponentgeneralsettings (
		id integer,
		allocateleavequotaat integer,
		annualleavequota integer,
		balanceroundoff integer,
		leavebalancesattheyearend integer,
		leavecomponentid integer REFERENCES hrms.leavecomponent(id),
		leavestructureid integer REFERENCES hrms.leavestructure(id),
		maxcarryforwarddays integer,
		maxconsecutivedays integer,
		maxnumberofdayspermonth integer,
		negativeleavebalancesattheyearend integer,
		noleavequotaafterjoiningday integer,
		numberofdaysgaprequiredbetweenleaves integer,
		priornoticedays integer,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean,
PRIMARY KEY(leavecomponentid,leavestructureid)
);
 ALTER TABLE hrms.leavecomponentgeneralsettings OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.leavecomponentrestrictionsettings (
		id integer,
		canapplyforfuturedate boolean,
		canapplyhalfday boolean,
		canapplyleaveduringnoticeperiod boolean,
		canapplyleaveduringprobation boolean,
		canemployeeapplyleave boolean,
		canreportingmanagerallocateleavecredit boolean,
		canreportingmanageroverriderestrictions boolean,
		isleaveapprovalrequired boolean,
		leavecomponentid integer REFERENCES hrms.leavecomponent(id),
		leavestructureid integer REFERENCES hrms.leavestructure(id),
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean,
PRIMARY KEY(leavecomponentid,leavestructureid)
);
 ALTER TABLE hrms.leavecomponentrestrictionsettings OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.leave (
		id SERIAL PRIMARY KEY,
		leavecomponentid integer NOT NULL REFERENCES hrms.leavecomponent(id),
		leavestructureid integer NOT NULL REFERENCES hrms.leavestructure(id),
		employeeid integer NOT NULL REFERENCES hrms.employee(id),
		approvedby integer,
		approveddate timestamp,
		description text NOT NULL,
		fromdate timestamp NOT NULL,
		todate timestamp NOT NULL,
		isfullday boolean,
		isfirstdayfirsthalf boolean,
		isfirstdaysecondhalf boolean,
		isseconddayfirsthalf boolean,
		isseconddaysecondhalf boolean,
		leavestatus integer NOT NULL,
		numberofdays money,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.leave OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.jobtitle (
		id SERIAL PRIMARY KEY,
		description text NOT NULL,
		name text NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.jobtitle OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.employeenumberseries (
		id SERIAL PRIMARY KEY,
		description text NOT NULL,
		digitinnumber integer NOT NULL,
		isactive boolean NOT NULL,
		isdefault boolean NOT NULL,
		name text NOT NULL,
		nextnumber integer NOT NULL,
		prefix text NOT NULL,
		suffix text NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.employeenumberseries OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.jobdetails (
		id SERIAL PRIMARY KEY,
		businessunit integer,
		dateofjoin timestamp NOT NULL,
		department integer,
		employeeid integer NOT NULL REFERENCES hrms.employee(id),
		companyid integer NOT NULL REFERENCES hrms.hrmscompany(id),
		branchid integer NOT NULL REFERENCES hrms.hrmsbranch(id),
		jobtitleid integer NOT NULL REFERENCES hrms.jobtitle(id),
		numberseriesid integer NOT NULL REFERENCES hrms.employeenumberseries(id),
		employeenumber text NOT NULL,
		location integer,
		noticeperiod integer,
		periodtype integer,
		probationperiod integer,
		reportingmanager integer REFERENCES hrms.employee(id),
		secondaryjobtitle text,
		timetype integer,
		workertype integer,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.jobdetails OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.shift (
		id SERIAL PRIMARY KEY,
		name text NOT NULL,
		starttime timestamp NOT NULL,
		endtime timestamp NOT NULL,
		breakduration integer NOT NULL,
		numberofdays integer NOT NULL,
		comments text,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.shift OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.jobfiling (
		id SERIAL PRIMARY KEY,
		attendancecapturescheme integer NOT NULL,
		attendancetracking integer NOT NULL,
		employeeid integer NOT NULL REFERENCES hrms.employee(id),
		expensepolicyid integer,
		holidaycategoryid integer NOT NULL REFERENCES hrms.holidaycategory(id),
		leavestructureid integer NOT NULL REFERENCES hrms.leavestructure(id),
		payrollstructureid integer,
		paygroupid integer,
		shiftid integer NOT NULL REFERENCES hrms.shift(id),
		overtimepolicyid integer,
		weekoff integer NOT NULL,
		paymentmode integer,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.jobfiling OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.bonustype (
		id SERIAL PRIMARY KEY,
		name text,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.bonustype OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.payrollprocessingmethod (
		id SERIAL PRIMARY KEY,
		name text NOT NULL,
		modeofprocessing integer NOT NULL,
		month integer NOT NULL,
		year integer NOT NULL,
		paygroupid integer,
		employeeid integer,
		paygrouporemployeename text,
		processedstep integer,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.payrollprocessingmethod OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.employeebonus (
		id SERIAL PRIMARY KEY,
		payrollprocessingmethodid integer NOT NULL REFERENCES hrms.payrollprocessingmethod(id),
		bonustypeid integer NOT NULL REFERENCES hrms.bonustype(id),
		employeeid integer NOT NULL REFERENCES hrms.employee(id),
		amount real NOT NULL,
		disburseon timestamp NOT NULL,
		remarks text,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.employeebonus OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.payrollcomponent (
		id SERIAL PRIMARY KEY,
		description text NOT NULL,
		name text NOT NULL,
		payrollcomponenttype integer NOT NULL,
		shortcode text NOT NULL,
		isfixed boolean,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.payrollcomponent OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.payrollstructure (
		id SERIAL PRIMARY KEY,
		description text NOT NULL,
		name text NOT NULL,
		isconfigured boolean,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.payrollstructure OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.payrollcalculation (
		id SERIAL PRIMARY KEY,
		iscomputed boolean,
		formula text,
		payrollcomponentid integer REFERENCES hrms.payrollcomponent(id),
		payrollstructureid integer REFERENCES hrms.payrollstructure(id),
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.payrollcalculation OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.payrollcalendar (
		id SERIAL PRIMARY KEY,
		name text NOT NULL,
		periodtype integer NOT NULL,
		startsfrom integer NOT NULL,
		processingday integer NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.payrollcalendar OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.employeesalaryconfiguration (
		id SERIAL PRIMARY KEY,
		effectivedate timestamp NOT NULL,
		employeeid integer NOT NULL REFERENCES hrms.employee(id),
		version text,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.employeesalaryconfiguration OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.employeesalaryconfigurationdetails (
		id SERIAL PRIMARY KEY,
		employeeid integer REFERENCES hrms.employee(id),
		employeesalaryconfigurationid integer NOT NULL REFERENCES hrms.employeesalaryconfiguration(id),
		payrollcalculationid integer REFERENCES hrms.payrollcalculation(id),
		payrollcomponentid integer REFERENCES hrms.payrollcomponent(id),
		payrollstructureid integer REFERENCES hrms.payrollstructure(id),
		monthlyamount real NOT NULL,
		yearlyamount real NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.employeesalaryconfigurationdetails OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.document (
		id SERIAL PRIMARY KEY,
		extension text NOT NULL,
		name text NOT NULL,
		path text NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.document OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.identitydocument (
		id SERIAL PRIMARY KEY,
		dateofbirth timestamp,
		employeeid integer REFERENCES hrms.employee(id),
		fathername text,
		isapproved boolean,
		name text NOT NULL,
		number text NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.identitydocument OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.contact (
		id SERIAL PRIMARY KEY,
		emergencycontactname text,
		emergencycontactnumber text,
		employeeid integer REFERENCES hrms.employee(id),
		homephone text,
		mobile text NOT NULL,
		personalemail text,
		skype text,
		workemail text,
		workphone text,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.contact OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.dependent (
		id SERIAL PRIMARY KEY,
		dateofbirth timestamp,
		employeeid integer REFERENCES hrms.employee(id),
		gender integer,
		name text NOT NULL,
		phone text,
		profession text,
		relationship integer,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.dependent OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.drivinglicense (
		id SERIAL PRIMARY KEY,
		address text,
		dateofexpiry timestamp,
		dateofbirth timestamp,
		employeeid integer REFERENCES hrms.employee(id),
		fathername text,
		isapproved boolean,
		name text NOT NULL,
		number text NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.drivinglicense OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.education (
		id SERIAL PRIMARY KEY,
		degree text NOT NULL,
		employeeid integer REFERENCES hrms.employee(id),
		percentage real NOT NULL,
		specialization text,
		university text NOT NULL,
		yearofcompletion timestamp NOT NULL,
		yearofjoining timestamp,
		isapproved boolean,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.education OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.educationdocument (
		id integer,
		documentid integer REFERENCES hrms.document(id),
		educationid integer REFERENCES hrms.education(id),
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean,
PRIMARY KEY(documentid,educationid)
);
 ALTER TABLE hrms.educationdocument OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.pan (
		id SERIAL PRIMARY KEY,
		dateofbirth timestamp,
		employeeid integer REFERENCES hrms.employee(id),
		fathername text,
		isapproved boolean,
		name text NOT NULL,
		number text NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.pan OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.passport (
		id SERIAL PRIMARY KEY,
		address text NOT NULL,
		dateofexpiry timestamp NOT NULL,
		dateofissue timestamp NOT NULL,
		mothername text,
		nationality text NOT NULL,
		placeofbirth text NOT NULL,
		placeofissue text NOT NULL,
		surname text NOT NULL,
		dateofbirth timestamp,
		employeeid integer REFERENCES hrms.employee(id),
		fathername text,
		isapproved boolean,
		name text NOT NULL,
		number text NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.passport OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.previousemployment (
		id SERIAL PRIMARY KEY,
		companyname text NOT NULL,
		dateofjoining timestamp NOT NULL,
		dateofrelieving timestamp NOT NULL,
		employeeid integer NOT NULL REFERENCES hrms.employee(id),
		jobtitle text NOT NULL,
		location text NOT NULL,
		isapproved boolean,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.previousemployment OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.previousemploymentdocument (
		id integer,
		documentid integer REFERENCES hrms.document(id),
		previousemploymentid integer REFERENCES hrms.previousemployment(id),
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean,
PRIMARY KEY(documentid,previousemploymentid)
);
 ALTER TABLE hrms.previousemploymentdocument OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.uniqueidentificationdetail (
		id SERIAL PRIMARY KEY,
		address text NOT NULL,
		dateofbirth timestamp,
		employeeid integer REFERENCES hrms.employee(id),
		fathername text,
		isapproved boolean,
		name text NOT NULL,
		number text NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.uniqueidentificationdetail OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.payrollcomponentconfiguration (
		id SERIAL PRIMARY KEY,
		claimfrequency integer,
		claimlimit real,
		description text,
		iscustomizedandoverridenatemployeelevel boolean,
		isdifferenceamountadjustable boolean,
		islossofpayaffected boolean,
		ispaidseparately boolean,
		ispartofarrearcalculation boolean,
		ispartofearningsanddeductions boolean,
		ispartoflossofpaycalculation boolean,
		isproofrequired boolean,
		isrecurring boolean,
		isvisibleinpayslip boolean,
		maximumlimit real,
		name text NOT NULL,
		payoutpattern integer,
		payrollcomponenttype integer NOT NULL,
		payrollcomponentid integer NOT NULL REFERENCES hrms.payrollcomponent(id),
		payrollstructureid integer NOT NULL REFERENCES hrms.payrollstructure(id),
		shortcode text NOT NULL,
		isconfigured boolean,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.payrollcomponentconfiguration OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.regularlogin (
		id SERIAL PRIMARY KEY,
		checkintime timestamp,
		checkouttime timestamp,
		checkincomment text,
		employeeid integer REFERENCES hrms.employee(id),
		isremotelogin boolean,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.regularlogin OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.expensepolicy (
		id SERIAL PRIMARY KEY,
		description text NOT NULL,
		name text NOT NULL,
		currency text NOT NULL,
		isconfigured boolean,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.expensepolicy OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.expensetype (
		id SERIAL PRIMARY KEY,
		name text NOT NULL,
		description text NOT NULL,
		code text NOT NULL,
		category integer NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.expensetype OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.workfromhome (
		id SERIAL PRIMARY KEY,
		fromdate timestamp NOT NULL,
		todate timestamp NOT NULL,
		isfullday boolean,
		isfirstdayfirsthalf boolean,
		isfirstdaysecondhalf boolean,
		isseconddayfirsthalf boolean,
		isseconddaysecondhalf boolean,
		numberofdays money,
		reason text NOT NULL,
		employeeid integer NOT NULL REFERENCES hrms.employee(id),
		isapproved boolean,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.workfromhome OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.workfromhomesettings (
		id SERIAL PRIMARY KEY,
		isenabled boolean NOT NULL,
		approvalworkflowid integer NOT NULL,
		islimited boolean NOT NULL,
		maximumlimit integer,
		periodtype integer,
		priordays integer NOT NULL,
		subsequentdays integer NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.workfromhomesettings OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.workfromhomenotifypersonnel (
		id SERIAL PRIMARY KEY,
		workfromhomeid integer REFERENCES hrms.workfromhome(id),
		notifypersonnel integer,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.workfromhomenotifypersonnel OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.onduty (
		id SERIAL PRIMARY KEY,
		fromdate timestamp NOT NULL,
		todate timestamp NOT NULL,
		isfullday boolean,
		isfirstdayfirsthalf boolean,
		isfirstdaysecondhalf boolean,
		isseconddayfirsthalf boolean,
		isseconddaysecondhalf boolean,
		numberofdays money,
		reason text NOT NULL,
		employeeid integer NOT NULL REFERENCES hrms.employee(id),
		isapproved boolean,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.onduty OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.ondutynotifypersonnel (
		id SERIAL PRIMARY KEY,
		ondutyid integer REFERENCES hrms.onduty(id),
		notifypersonnel integer REFERENCES hrms.employee(id),
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.ondutynotifypersonnel OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.paygroup (
		id SERIAL PRIMARY KEY,
		name text NOT NULL,
		code text NOT NULL,
		payrollcalendarid integer NOT NULL REFERENCES hrms.payrollcalendar(id),
		startingyear integer NOT NULL,
		startingmonth integer,
		startingweek integer,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.paygroup OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.payrollbasiccomponent (
		id SERIAL PRIMARY KEY,
		employeecode text,
		employeename text,
		payrollcomponentname text,
		shortcode text,
		payrollprocessingmethodid integer REFERENCES hrms.payrollprocessingmethod(id),
		employeeid integer REFERENCES hrms.employee(id),
		payrollcomponentid integer REFERENCES hrms.payrollcomponent(id),
		paygroupid integer REFERENCES hrms.paygroup(id),
		payrollstructureid integer REFERENCES hrms.payrollstructure(id),
		status integer,
		monthlyamount real,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.payrollbasiccomponent OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.role (
		id SERIAL PRIMARY KEY,
		name text NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.role OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.rolefeature (
		id SERIAL PRIMARY KEY,
		featureid integer NOT NULL,
		subfeatureid integer NOT NULL,
		roleid integer NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.rolefeature OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.userrole (
		id SERIAL PRIMARY KEY,
		roleid integer NOT NULL REFERENCES hrms.role(id),
		employeeid integer NOT NULL REFERENCES hrms.employee(id),
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.userrole OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.feature (
		id SERIAL PRIMARY KEY,
		name text NOT NULL,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.feature OWNER to postgres; 



CREATE TABLE IF NOT EXISTS hrms.subfeature (
		id SERIAL PRIMARY KEY,
		subfeature text,
		createddate timestamp,
		modifieddate timestamp,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE hrms.subfeature OWNER to postgres; 




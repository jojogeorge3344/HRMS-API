CREATE TABLE IF NOT EXISTS public.company (
		businesstype integer NOT NULL,
		dateofincorporation date NOT NULL,
		identificationnumber text NOT NULL,
		legalname text NOT NULL,
		logofilepath text,
		shortname text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.company OWNER to postgres; 

INSERT INTO company (BusinessType,DateOfIncorporation,IdentificationNumber,LegalName,LogoFilePath,ShortName,CreatedDate,ModifiedDate,CreatedBy,ModifiedBy,IsArchived) VALUES (@BusinessType,@DateOfIncorporation,@IdentificationNumber,@LegalName,@LogoFilePath,@ShortName,@CreatedDate,@ModifiedDate,@CreatedBy,@ModifiedBy,@IsArchived)

CREATE TABLE IF NOT EXISTS public.branch (
		addressline1 text NOT NULL,
		addressline2 text,
		city text NOT NULL,
		companyid integer NOT NULL REFERENCES Company(id),
		country integer NOT NULL,
		countryname text NOT NULL,
		email text,
		fax text,
		phone text,
		pincode integer NOT NULL,
		shortname text NOT NULL,
		statename text,
		stateorprovince integer,
		timezoneid text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.branch OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.branchbankaccount (
		branchid integer NOT NULL REFERENCES Branch(id),
		corporateid text NOT NULL,
		accountnumber text NOT NULL,
		accountname text NOT NULL,
		bankname text NOT NULL,
		ifsccode text NOT NULL,
		branchname text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.branchbankaccount OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.branchsignatory (
		addressline1 text NOT NULL,
		addressline2 text,
		branchid integer NOT NULL REFERENCES Branch(id),
		city text NOT NULL,
		country integer NOT NULL,
		countryname text NOT NULL,
		designation text NOT NULL,
		email text,
		fathername text NOT NULL,
		fax text,
		fullname text NOT NULL,
		pannumber text NOT NULL,
		phone text,
		pincode integer NOT NULL,
		statename text,
		stateorprovince integer,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.branchsignatory OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.holidaycategory (
		name text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.holidaycategory OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.holiday (
		date date NOT NULL,
		description text NOT NULL,
		holidaycategoryid integer NOT NULL REFERENCES HolidayCategory(id),
		isfloating boolean NOT NULL,
		name text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.holiday OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.leavecomponent (
		code text NOT NULL,
		description text NOT NULL,
		ispaidleave boolean,
		isrestrictedtogender boolean,
		isrestrictedtomaritalstatus boolean,
		issickleave boolean,
		isstatutoryleave boolean,
		name text NOT NULL,
		restrictedtogender integer,
		restrictedtomaritalstatus integer,
		showleavedescription boolean,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.leavecomponent OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.leavestructure (
		calendaryearenddate date,
		calendaryearstartdate date,
		customdocumentpath text,
		description text,
		iscustomleavepolicydocumentavailable boolean,
		name text,
		showleavepolicyexplanation boolean,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.leavestructure OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.leavestructureleavecomponent (
		leavecomponentid integer REFERENCES LeaveComponent(id),
		leavestructureid integer REFERENCES LeaveStructure(id),
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean,
PRIMARY KEY(leavecomponentid,leavestructureid)
);
 ALTER TABLE public.leavestructureleavecomponent OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.leavecomponentgeneralsettings (
		allocateleavequotaat integer,
		annualleavequota integer,
		balanceroundoff integer,
		leavebalancesattheyearend integer,
		leavecomponentid integer REFERENCES LeaveComponent(id),
		leavestructureid integer REFERENCES LeaveStructure(id),
		maxcarryforwarddays integer,
		maxconsecutivedays integer,
		maxnumberofdayspermonth integer,
		negativeleavebalancesattheyearend integer,
		noleavequotaafterjoiningday integer,
		numberofdaysgaprequiredbetweenleaves integer,
		priornoticedays integer,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean,
PRIMARY KEY(leavecomponentid,leavestructureid)
);
 ALTER TABLE public.leavecomponentgeneralsettings OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.leavecomponentrestrictionsettings (
		canapplyforfuturedate boolean,
		canapplyhalfday boolean,
		canapplyleaveduringnoticeperiod boolean,
		canapplyleaveduringprobation boolean,
		canemployeeapplyleave boolean,
		canreportingmanagerallocateleavecredit boolean,
		canreportingmanageroverriderestrictions boolean,
		isleaveapprovalrequired boolean,
		leavecomponentid integer REFERENCES LeaveComponent(id),
		leavestructureid integer REFERENCES LeaveStructure(id),
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean,
PRIMARY KEY(leavecomponentid,leavestructureid)
);
 ALTER TABLE public.leavecomponentrestrictionsettings OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.country (
		name text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.country OWNER to postgres; 

INSERT INTO country (Name,CreatedDate,ModifiedDate,CreatedBy,ModifiedBy,IsArchived) VALUES (@Name,@CreatedDate,@ModifiedDate,@CreatedBy,@ModifiedBy,@IsArchived)CREATE TABLE IF NOT EXISTS public.state (
		name text NOT NULL,
		countryid integer NOT NULL REFERENCES Country(id),
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.state OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.authentication (
		email text NOT NULL,
		password text NOT NULL,
		token text,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.authentication OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.employee (
		firstname text NOT NULL,
		middlename text,
		lastname text NOT NULL,
		displayname text NOT NULL,
		gender integer NOT NULL,
		dateofbirth date NOT NULL,
		email text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.employee OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.document (
		extention text NOT NULL,
		name text NOT NULL,
		path text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.document OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.identitydocument (
		dateofbirth date,
		documentid integer REFERENCES Document(id),
		employeeid integer REFERENCES Employee(id),
		fathername text,
		isapproved boolean,
		name text NOT NULL,
		number text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.identitydocument OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.contact (
		currentaddress text,
		currentcountry text,
		currentpincode text,
		currentstate text,
		emergencycontactname text,
		emergencycontactnumber text,
		employeeid integer REFERENCES Employee(id),
		homephone text,
		mobile text NOT NULL,
		permanentaddress text,
		permanentcountry text,
		permanentpincode text,
		permanentstate text,
		personalemail text,
		skype text,
		workemail text,
		workphone text,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.contact OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.dependent (
		dateofbirth date,
		employeeid integer REFERENCES Employee(id),
		gender integer,
		name text NOT NULL,
		phone text,
		profession text,
		relationship integer,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.dependent OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.drivinglicense (
		address text,
		dateofexpiry date,
		dateofbirth date,
		documentid integer REFERENCES Document(id),
		employeeid integer REFERENCES Employee(id),
		fathername text,
		isapproved boolean,
		name text NOT NULL,
		number text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.drivinglicense OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.education (
		degree text NOT NULL,
		employeeid integer REFERENCES Employee(id),
		percentage real NOT NULL,
		specialization text,
		university text NOT NULL,
		yearofcompletion text NOT NULL,
		yearofjoining text,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.education OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.educationdocument (
		documentid integer REFERENCES Document(id),
		educationid integer REFERENCES Education(id),
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean,
PRIMARY KEY(documentid,educationid)
);
 ALTER TABLE public.educationdocument OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.pan (
		dateofbirth date,
		documentid integer REFERENCES Document(id),
		employeeid integer REFERENCES Employee(id),
		fathername text,
		isapproved boolean,
		name text NOT NULL,
		number text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.pan OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.passport (
		address text NOT NULL,
		countrycode text,
		dateofexpiry date NOT NULL,
		dateofissue date NOT NULL,
		givenname text NOT NULL,
		mothername text,
		nationality text NOT NULL,
		placeofbirth text NOT NULL,
		placeofissue text NOT NULL,
		surname text NOT NULL,
		dateofbirth date,
		documentid integer REFERENCES Document(id),
		employeeid integer REFERENCES Employee(id),
		fathername text,
		isapproved boolean,
		name text NOT NULL,
		number text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.passport OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.previousemployment (
		companyname text NOT NULL,
		dateofjoining date,
		dateofrelieving date,
		employeeid integer REFERENCES Employee(id),
		jobtitle text,
		location text,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.previousemployment OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.previousemploymentdocument (
		documentid integer REFERENCES Document(id),
		previousemploymentid integer REFERENCES PreviousEmployment(id),
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean,
PRIMARY KEY(documentid,previousemploymentid)
);
 ALTER TABLE public.previousemploymentdocument OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.uniqueidentificationdocument (
		address text,
		dateofbirth date,
		documentid integer REFERENCES Document(id),
		employeeid integer REFERENCES Employee(id),
		fathername text,
		isapproved boolean,
		name text NOT NULL,
		number text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.uniqueidentificationdocument OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.payrollstructure (
		name text NOT NULL,
		description text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.payrollstructure OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.payrollcomponent (
		name text NOT NULL,
		payrollcomponenttype integer NOT NULL,
		shortcode text NOT NULL,
		description text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.payrollcomponent OWNER to postgres; 

CREATE TABLE IF NOT EXISTS public.payrollcomponentconfiguration (
		claimfrequency integer NOT NULL,
		claimlimit real NOT NULL,
		description text,
		iscustomizedandoverridenatemployeelevel boolean NOT NULL,
		isdifferenceamountadjustable boolean NOT NULL,
		isdifferenceamountisadjustable boolean NOT NULL,
		islossofpayaffected boolean NOT NULL,
		ispaidseparately boolean NOT NULL,
		ispartofarrearcalculation boolean NOT NULL,
		ispartofearningsanddeductions boolean NOT NULL,
		ispartoflossofpaycalculation boolean NOT NULL,
		isproofrequired boolean NOT NULL,
		isrecurring boolean NOT NULL,
		isvisibleinpayslip boolean NOT NULL,
		maximumlimit real NOT NULL,
		name text NOT NULL,
		payoutpattern integer NOT NULL,
		payrolcomponenttype integer NOT NULL,
		payrollcomponentid integer REFERENCES PayrollComponent(id),
		payrollstructureid integer REFERENCES PayrollStructure(id),
		shortcode text NOT NULL,
		id SERIAL PRIMARY KEY,
		createddate date,
		modifieddate date,
		createdby text,
		modifiedby text,
		isarchived boolean
);
 ALTER TABLE public.payrollcomponentconfiguration OWNER to postgres; 


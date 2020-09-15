-- Create Database
CREATE DATABASE IF NOT EXISTS ChefDB;

--Table Authentication

CREATE TABLE IF NOT EXISTS public.authentication
(
    id serial PRIMARY KEY,
    email text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default",
    status smallint,
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifieddate date,
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.authentication OWNER to postgres;

--Table BenefitCode

CREATE TABLE IF NOT EXISTS public.benefitcode
(
    id serial PRIMARY KEY,
    benefitcodename text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    benefitshortcode text COLLATE pg_catalog."default" NOT NULL,
    benefittypeid integer,
    benefittypename text COLLATE pg_catalog."default",
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT benefitcode_pkey PRIMARY KEY (id),
    CONSTRAINT benefitcodename UNIQUE (benefitcodename),
    CONSTRAINT benefitshortcode UNIQUE (benefitshortcode),
    CONSTRAINT benefittypeid FOREIGN KEY (benefittypeid)
        REFERENCES public.benefittypemaster (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.benefitcode OWNER to postgres;

COMMENT ON CONSTRAINT benefitcodename ON public.benefitcode
    IS 'benefitcodename';
COMMENT ON CONSTRAINT benefitshortcode ON public.benefitcode
    IS 'benefitshortcode';

COMMENT ON CONSTRAINT benefittypeid ON public.benefitcode
    IS 'benefittypeid';

--Table BenefitCodeAllowance

CREATE TABLE IF NOT EXISTS public.benefitcodeallowance
(
    id serial PRIMARY KEY,
    salarystructureid integer NOT NULL,
    benefittypeid integer NOT NULL,
    benefitcodeid integer NOT NULL,
    componentname text COLLATE pg_catalog."default",
    maximumlimit text COLLATE pg_catalog."default",
    isarrearcaluculationinclude boolean NOT NULL,
    iscustomizedandoverridenatemployeelevel boolean NOT NULL,
    ispartofearningsanddeductions boolean NOT NULL,
    ispaidseperately boolean NOT NULL,
    isvisibleornotinpayslip boolean NOT NULL,
    islossofpayaffectedornot boolean NOT NULL,
    isdifferenceamountisadjustableornot boolean NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT benefitcodeallowance_pkey PRIMARY KEY (id),
    CONSTRAINT benefitcodeallowance_pkey_componentname UNIQUE (componentname),
    CONSTRAINT benefitcodeid FOREIGN KEY (benefitcodeid)
        REFERENCES public.benefitcode (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT benefittypeid FOREIGN KEY (benefittypeid)
        REFERENCES public.benefittypemaster (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT salarystructureid FOREIGN KEY (salarystructureid)
        REFERENCES public.salarystructure (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.benefitcodeallowance OWNER to postgres;

--BenefitCodereimbersable

CREATE TABLE IF NOT EXISTS public.benefitcodereimbursable
(
    id serial PRIMARY KEY,
    salarystructureid integer NOT NULL,
    benefittypeid integer NOT NULL,
    benefitcodeid integer NOT NULL,
    componentname text COLLATE pg_catalog."default",
    maximumlimit text COLLATE pg_catalog."default",
    isproofrequires boolean NOT NULL,
    isarrearcaluculationinclude boolean NOT NULL,
    iscustomizedandoverridenatemployeelevel boolean NOT NULL,
    ispaidseperately boolean NOT NULL,
    isvisibleornotinpayslip boolean NOT NULL,
    islossofpayaffectedornot boolean NOT NULL,
    isdifferenceamountisadjustableornot boolean NOT NULL,
    isclaimfrequencyupdatingornot boolean NOT NULL,
    claimfrequency integer NOT NULL,
    amountperclaim text COLLATE pg_catalog."default",
    payoutpattern integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT benefitcodereimbursable_pkey PRIMARY KEY (id),
    CONSTRAINT benefitcodereimbursable_pkey_componentname UNIQUE (componentname),
    CONSTRAINT benefitcodeid FOREIGN KEY (benefitcodeid)
        REFERENCES public.benefitcode (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT benefittypeid FOREIGN KEY (benefittypeid)
        REFERENCES public.benefittypemaster (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT salarystructureid FOREIGN KEY (salarystructureid)
        REFERENCES public.salarystructure (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.benefitcodereimbursable OWNER to postgres;

--Table Benefitcodestandarddeduction

CREATE TABLE IF NOT EXISTS public.benefitcodestandarddeduction
(
    id serial PRIMARY KEY,
    salarystructureid integer NOT NULL,
    benefittypeid integer NOT NULL,
    benefitcodeid integer NOT NULL,
    componentname text COLLATE pg_catalog."default",
    maximumlimit text COLLATE pg_catalog."default",
    isthisdeductionrecurring boolean NOT NULL,
    isarrearcaluculationinclude boolean NOT NULL,
    iscustomizedandoverridenatemployeelevel boolean NOT NULL,
    ispartofearningsanddeductions boolean NOT NULL,
    isvisibleornotinpayslip boolean NOT NULL,
    islossofpayaffectedornot boolean NOT NULL,
    isdifferenceamountisadjustableornot boolean NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT benefitcodestandarddeduction_pkey PRIMARY KEY (id),
    CONSTRAINT benefitcodestandarddeduction_pkey_componentname UNIQUE (componentname),
    CONSTRAINT benefitcodeid FOREIGN KEY (benefitcodeid)
        REFERENCES public.benefitcode (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT benefittypeid FOREIGN KEY (benefittypeid)
        REFERENCES public.benefittypemaster (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT salarystructureid FOREIGN KEY (salarystructureid)
        REFERENCES public.salarystructure (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.benefitcodestandarddeduction OWNER to postgres;

--Table BenefitCodeStandardEarnings

CREATE TABLE IF NOT EXISTS public.benefitcodestandardearning
(
    id serial PRIMARY KEY,
    salarystructureid integer NOT NULL,
    benefittypeid integer NOT NULL,
    benefitcodeid integer NOT NULL,
    componentname text COLLATE pg_catalog."default",
    maximumlimit text COLLATE pg_catalog."default",
    isarrearcaluculationinclude boolean NOT NULL,
    iscustomizedandoverridenatemployeelevel boolean NOT NULL,
    islossofpayaffectedornot boolean NOT NULL,
    isdifferenceamountisadjustableornot boolean NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT benefitcodestandardearning_pkey PRIMARY KEY (id),
    CONSTRAINT benefitcodestandardearning_pkey_componentname UNIQUE (componentname),
    CONSTRAINT benefitcodeid FOREIGN KEY (benefitcodeid)
        REFERENCES public.benefitcode (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT benefittypeid FOREIGN KEY (benefittypeid)
        REFERENCES public.benefittypemaster (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT salarystructureid FOREIGN KEY (salarystructureid)
        REFERENCES public.salarystructure (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.benefitcodestandardearning OWNER to postgres;

--Table BenefitTypeMaster

CREATE TABLE IF NOT EXISTS public.benefittypemaster
(
    id serial PRIMARY KEY,
    benefittypename text COLLATE pg_catalog."default",
    CONSTRAINT benefittypemaster_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.benefittypemaster OWNER to postgres;

--Table Branch

CREATE TABLE IF NOT EXISTS public.branch
(
    id serial PRIMARY KEY,
    companyid integer,
    shortname text COLLATE pg_catalog."default",
    timezoneid text COLLATE pg_catalog."default",
    addressline1 text COLLATE pg_catalog."default",
    addressline2 text COLLATE pg_catalog."default",
    city text COLLATE pg_catalog."default",
    stateorprovince integer,
    statename text COLLATE pg_catalog."default",
    country integer NOT NULL,
    countryname text COLLATE pg_catalog."default" NOT NULL,
    pincode text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default",
    phone text COLLATE pg_catalog."default",
    fax text COLLATE pg_catalog."default",
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifiedby text COLLATE pg_catalog."default",
    modifieddate date,
    isarchived boolean,
    CONSTRAINT branch_pkey PRIMARY KEY (id),
    CONSTRAINT branch_companyid_fkey FOREIGN KEY (companyid)
        REFERENCES public.company (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.branch OWNER to postgres;

--Table BranchBankAccount

CREATE TABLE IF NOT EXISTS public.branchbankaccount
(
    id SERIAL PRIMARY KEY,
    branchid integer NOT NULL REFERENCES Branch(id),
    corporateid text NOT NULL,
    accountnumber text NOT NULL,
    accountname text NOT NULL,
    bankname text NOT NULL,
    ifsccode text NOT NULL,
    branchname text NOT NULL,
    createddate date,
    modifieddate date,c
    reatedby text,
    modifiedby text,i
    isarchived boolean,
    CONSTRAINT branchbankaccount_pkey PRIMARY KEY (id),
    CONSTRAINT branchbankaccount_branchid_fkey FOREIGN KEY (branchid)
        REFERENCES public.branch (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.branchbankaccount OWNER to postgres;

--Table BranchSignatory

CREATE TABLE IF NOT EXISTS public.branchsignatory
(
    id serial PRIMARY KEY,
    branchid integer,
    fullname text COLLATE pg_catalog."default",
    fathername text COLLATE pg_catalog."default",
    designation text COLLATE pg_catalog."default",
    pannumber text COLLATE pg_catalog."default",
    addressline1 text COLLATE pg_catalog."default",
    addressline2 text COLLATE pg_catalog."default",
    city text COLLATE pg_catalog."default",
    stateorprovince integer,
    statename text COLLATE pg_catalog."default",
    country integer NOT NULL,
    countryname text COLLATE pg_catalog."default" NOT NULL,
    pincode text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default",
    phone text COLLATE pg_catalog."default",
    fax text COLLATE pg_catalog."default",
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifiedby text COLLATE pg_catalog."default",
    modifieddate date,
    isarchived boolean,
    CONSTRAINT branchsignatory_pkey PRIMARY KEY (id),
    CONSTRAINT branchsignatory_branchid_fkey FOREIGN KEY (branchid)
        REFERENCES public.branch (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.branchsignatory OWNER to postgres;

--Table Cities

CREATE TABLE IF NOT EXISTS public.cities
(
    city character varying(80) COLLATE pg_catalog."default" NOT NULL,
    location point,
    CONSTRAINT cities_pkey PRIMARY KEY (city)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.cities OWNER to postgres;

-- Table Company

CREATE TABLE IF NOT EXISTS public.company
(
    id serial PRIMARY KEY,
    shortname text COLLATE pg_catalog."default",
    logofilepath text COLLATE pg_catalog."default",
    legalname text COLLATE pg_catalog."default",
    dateofincorporation date,
    identificationnumber text COLLATE pg_catalog."default",
    businesstype integer,
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifiedby text COLLATE pg_catalog."default",
    modifieddate date,
    isarchived boolean,
    CONSTRAINT "Company_pkey" PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.company OWNER to postgres;

--Table Country

CREATE TABLE IF NOT EXISTS public.country
(
    id serial primary key,
    name text COLLATE pg_catalog."default" NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT "Country_pkey" PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.country OWNER to postgres;

--Table Employee

CREATE TABLE IF NOT EXISTS public.employee
(
    id serial PRIMARY KEY,
    firstname text COLLATE pg_catalog."default" NOT NULL,
    middlename text COLLATE pg_catalog."default",
    lastname text COLLATE pg_catalog."default" NOT NULL,
    displayname text COLLATE pg_catalog."default" NOT NULL,
    gender integer NOT NULL,
    dateofbirth date NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifiedby text COLLATE pg_catalog."default",
    modifieddate date,
    isarchived boolean,
    CONSTRAINT employee_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.employee OWNER to postgres;

--Table EmployeeDefaults

CREATE TABLE IF NOT EXISTS public.employeedefaults
(
    id serial PRIMARY KEY,
    probationduration integer NOT NULL,
    periodtype integer NOT NULL,
    workertype integer NOT NULL,
    timetype integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT employeedefaults_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.employeedefaults OWNER to postgres;

-- Table Employeenumberseries

CREATE TABLE IF NOT EXISTS public.employeenumberseries
(
    id serial PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    prefix text COLLATE pg_catalog."default" NOT NULL,
    nextnumber bigint,
    isactive boolean,
    isdefault boolean,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    description text COLLATE pg_catalog."default",
    digitinnumber integer,
    suffix text COLLATE pg_catalog."default",
    CONSTRAINT employeenumberseries_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.employeenumberseries OWNER to postgres;

-- Table Gender

CREATE TABLE IF NOT EXISTS public.gender
(
    id serial PRIMARY KEY,
    gender text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT gender_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.gender OWNER to postgres;

-- Table Holiday

CREATE TABLE IF NOT EXISTS public.holiday
(
    id serial PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    holidaycategoryid bigint NOT NULL,
    isfloating boolean NOT NULL,
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifieddate date,
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT holidaycategoryid FOREIGN KEY (holidaycategoryid)
        REFERENCES public.holidaycategory (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.holiday OWNER to postgres;

--Table HolidayCategory

CREATE TABLE IF NOT EXISTS public.holidaycategory
(
    id serial PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT "HolidayMaster_pkey" PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.holidaycategory OWNER to postgres;

--Table Jobdetails

CREATE TABLE IF NOT EXISTS public.jobdetails
(
    id serial PRIMARY KEY,
    employeeid integer NOT NULL,
    dateofjoin date,
    numberseriesid integer NOT NULL,
    employeenumber text COLLATE pg_catalog."default" NOT NULL,
    jobtitleid integer NOT NULL,
    secondaryjobtitle text COLLATE pg_catalog."default",
    businessunit integer,
    department integer,
    location integer,
    reportingmanager text COLLATE pg_catalog."default",
    workertype integer,
    timetype integer,
    probationperiod integer,
    periodtype integer,
    noticeperiod integer,
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifiedby text COLLATE pg_catalog."default",
    modifieddate date,
    isarchived boolean,
    CONSTRAINT jobdetails_pkey PRIMARY KEY (id),
    CONSTRAINT employee_fkey FOREIGN KEY (employeeid)
        REFERENCES public.employee (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employeenumberseries_fkey FOREIGN KEY (numberseriesid)
        REFERENCES public.employeenumberseries (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT jobtitle_fkey FOREIGN KEY (jobtitleid)
        REFERENCES public.jobtitle (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.jobdetails OWNER to postgres;

--Table Jobfilling

CREATE TABLE IF NOT EXISTS public.jobfilling
(
    id serial PRIMARY KEY,
    employeeid integer NOT NULL,
    leaveplanid integer NOT NULL,
    shift integer NOT NULL,
    weekoff integer NOT NULL,
    holidaycategoryid integer NOT NULL,
    attendancetrackingpolicy integer NOT NULL,
    expensepolicy integer NOT NULL,
    attendancecapturescheme integer NOT NULL,
    skiponboarding boolean NOT NULL,
    onboardingflow integer NOT NULL,
    canusermanageprofile boolean NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT jobfilling_pkey PRIMARY KEY (id),
    CONSTRAINT employee_fkey FOREIGN KEY (employeeid)
        REFERENCES public.employee (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT holidaycategory_fkey FOREIGN KEY (holidaycategoryid)
        REFERENCES public.holidaycategory (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT leaveplan_fkey FOREIGN KEY (leaveplanid)
        REFERENCES public.leaveplan (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.jobfilling OWNER to postgres;

--Table JobTitle

CREATE TABLE IF NOT EXISTS public.jobtitle
(
    id serial PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT jobtiltle_pkey PRIMARY KEY (id),
    CONSTRAINT jobtiltle_pkey_name UNIQUE (name)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.jobtitle OWNER to postgres;

--Table LeaveGeneralSettings

CREATE TABLE IF NOT EXISTS public.LeaveGeneralSettings (
    id serial,
    annualleavequota integer,
    maxconsecutivedays integer,
    maxnumberofdayspermonth integer,
    numberofdaysgaprequiredbetweenleaves integer,
    noleavequotaafterjoiningday integer,
    priornoticedays integer,
    allocateleavequotaat integer,
    balanceroundoff integer,
    leavebalancesattheyearend integer,
    negativeleavebalancesattheyearend integer,
    maxcarryforwarddays integer,
    leaveplanid integer NOT NULL,
    leavetypeid integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT leavegeneralsettings_pkey PRIMARY KEY (leaveplanid, leavetypeid),
    CONSTRAINT leavegeneralsettings_leaveplanid_fkey FOREIGN KEY (leaveplanid)
        REFERENCES public.leaveplan (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT leavegeneralsettings_leavetypeid_fkey FOREIGN KEY (leavetypeid)
        REFERENCES public.leavetype (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leavegeneralsettings OWNER to postgres;

-- Table Leaveplan

CREATE TABLE public.leaveplan
(
    id serial PRIMARY KEY,
    description text COLLATE pg_catalog."default",
    calendaryearstartdate date,
    showleavepolicyexplanation boolean,
    iscustomleavepolicydocumentavailable boolean,
    customdocumentpath text COLLATE pg_catalog."default",
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    name text COLLATE pg_catalog."default",
    calendaryearenddate date,
    CONSTRAINT "LeavePlan_pkey" PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leaveplan OWNER to postgres;

--Table Leaveplanleavetypes

CREATE TABLE IF NOT EXISTS public.leaveplanleavetypes
(
    id serial PRIMARY KEY,
    leaveplanid integer NOT NULL,
    leavetypeid integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT pk_leaveplanleavetypes_leaveplanid_leavetypeid PRIMARY KEY (leaveplanid, leavetypeid),
    CONSTRAINT leaveplanid FOREIGN KEY (leaveplanid)
        REFERENCES public.leaveplan (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT leavetypeid FOREIGN KEY (leavetypeid)
        REFERENCES public.leavetype (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leaveplanleavetypes OWNER to postgres;

--Table Leaverestrictionsettings

CREATE TABLE IF NOT EXISTS public.leaverestrictionsettings
(
    canapplyhalfday boolean,
    canemployeeapplyleave boolean,
    canapplyleaveduringprobation boolean,
    canapplyleaveduringnoticeperiod boolean,
    canapplyforfuturedate boolean,
    canreportingmanageroverriderestrictions boolean,
    canreportingmanagerallocateleavecredit boolean,
    isleaveapprovalrequired boolean,
    leaveplanid integer NOT NULL,
    leavetypeid integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT leaverestrictionsettings_pkey PRIMARY KEY (leaveplanid, leavetypeid),
    CONSTRAINT leaverestrictionsettings_leaveplanid_fkey FOREIGN KEY (leaveplanid)
        REFERENCES public.leaveplan (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT leaverestrictionsettings_leavetypeid_fkey FOREIGN KEY (leavetypeid)
        REFERENCES public.leavetype (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leaverestrictionsettings OWNER to postgres;

--Leavetype

CREATE TABLE IF NOT EXISTS public.leavetype
(
    id serial PRIMARY KEY,
    name text COLLATE pg_catalog."default",
    code text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    showleavedescription boolean,
    ispaidleave boolean,
    issickleave boolean,
    isstatutoryleave boolean,
    isrestrictedtogender boolean,
    restrictedtogender smallint,
    isrestrictedtomaritalstatus boolean,
    restrictedtomaritalstatus smallint,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT "LeaveTypeMaster_pkey" PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leavetype OWNER to postgres;

-- Table Loanrequest

CREATE TABLE IF NOT EXISTS public.loanrequest
(
    id serial PRIMARY KEY,
    loanno text COLLATE pg_catalog."default" NOT NULL,
    requesteddate date NOT NULL,
    loantype integer NOT NULL,
    loanamount double precision NOT NULL,
    paymenttype integer NOT NULL,
    expectedon date NOT NULL,
    emistartsfrom date NOT NULL,
    repaymentterm integer NOT NULL,
    comments text COLLATE pg_catalog."default" NOT NULL,
    createddate date NOT NULL,
    modifieddate date NOT NULL,
    createdby text COLLATE pg_catalog."default" NOT NULL,
    modifiedby text COLLATE pg_catalog."default" NOT NULL,
    isarchived boolean NOT NULL,
    employeeid bigint NOT NULL,
    CONSTRAINT loanrequest_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.loanrequest OWNER to postgres;

--Table LoanSetting

CREATE TABLE IF NOT EXISTS public.loansetting
(
    id serial PRIMARY KEY,
    iseligibleinafterprobationperiod boolean,
    eligibledaysfromjoining integer,
    iseligiblebasedonannualgrosssalary boolean,
    salaryfromrange integer,
    salarytorange integer,
    eligibleinnoticeperiod integer,
    standardinterestrate integer,
    interestcalcutationmethod integer,
    maxnumberofinstallments integer,
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifieddate date,
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT id PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.loansetting OWNER to postgres;

--Table MAritalStatusMaster

CREATE TABLE IF NOT EXISTS public.maritalstatusmaster
(
    id serial,
    description text COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.maritalstatusmaster OWNER to postgres;

--Table Salarystructure

CREATE TABLE IF NOT EXISTS public.salarystructure
(
    id serial PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT salarystructure_pkey PRIMARY KEY (id),
    CONSTRAINT salarystructure_pkey_name UNIQUE (name)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.salarystructure OWNER to postgres;

--Table salarystructurebenefitcode

CREATE TABLE IF NOT EXISTS public.salarystructurebenefitcode
(
    id serial PRIMARY KEY,
    salarystructureid integer NOT NULL,
    benefitcodeid integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT salarystructurebenefitcode_pkey PRIMARY KEY (id),
    CONSTRAINT pk_salarystructurebenefitcode_salarystructureid_benefitcodeid UNIQUE (salarystructureid, benefitcodeid),
    CONSTRAINT benefitcodeid FOREIGN KEY (benefitcodeid)
        REFERENCES public.benefitcode (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT salarystructureid FOREIGN KEY (salarystructureid)
        REFERENCES public.salarystructure (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.salarystructurebenefitcode OWNER to postgres;

COMMENT ON CONSTRAINT salarystructureid ON public.salarystructurebenefitcode
    IS 'salarystructureid';

-- Table State

CREATE TABLE IF NOT EXISTS public.state
(
    id serial PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    countryid integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT state_pkey PRIMARY KEY (id),
    CONSTRAINT state_countryid_fkey FOREIGN KEY (countryid)
        REFERENCES public.country (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.state OWNER to postgres;

--Table Userprofile

CREATE TABLE IF NOT EXISTS public.userprofile
(
    id serial PRIMARY KEY,
    firstname text COLLATE pg_catalog."default",
    middlename text COLLATE pg_catalog."default",
    lastname text COLLATE pg_catalog."default",
    displayname text COLLATE pg_catalog."default",
    gender integer,
    dateofjoin date,
    maritalstatus integer,
    bloodgroup integer,
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifiedby text COLLATE pg_catalog."default",
    modifieddate date,
    isarchived boolean,
    CONSTRAINT userprofile_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.userprofile OWNER to postgres;

--Table Weather

CREATE TABLE IF NOT EXISTS public.weather
(
    city character varying(80) COLLATE pg_catalog."default",
    temp_lo integer,
    temp_hi integer,
    prcp real,
    date date,
    CONSTRAINT weather_city_fkey FOREIGN KEY (city)
        REFERENCES public.cities (city) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.weather OWNER to postgres;
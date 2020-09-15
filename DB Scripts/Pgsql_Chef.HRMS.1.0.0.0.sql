-- Create DB
CREATE DATABASE IF NOT EXISTS ChefDB;


-- Table: public.company

DROP TABLE IF EXISTS public.company;

CREATE TABLE IF NOT EXISTS public.company
(
    id SERIAL primary key,
    legalname text COLLATE pg_catalog."default",
    shortname text COLLATE pg_catalog."default",
    logofilepath text COLLATE pg_catalog."default",
    dateofincorporation date,
    identificationnumber text COLLATE pg_catalog."default",
    typeofbusiness integer,
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifiedby text COLLATE pg_catalog."default",
    modifieddate date,
    isarchived boolean
)

TABLESPACE pg_default;

ALTER TABLE public.company
    OWNER to postgres;

INSERT INTO public.company
    (legalname, shortname, dateofincorporation, identificationnumber, typeofbusiness)
SELECT 'New Company', 'NC', timezone('utc', now()), 'NC-1', 1
WHERE
    NOT EXISTS (
        SELECT id FROM public.company WHERE id = 1
    );

-- Table: public.branch

-- DROP TABLE public.branch;

CREATE TABLE public.branch
(
    companyid integer NOT NULL,
    shortname text COLLATE pg_catalog."default" NOT NULL,
    timezoneid text COLLATE pg_catalog."default" NOT NULL,
    addressline1 text COLLATE pg_catalog."default" NOT NULL,
    addressline2 text COLLATE pg_catalog."default",
    city text COLLATE pg_catalog."default" NOT NULL,
    stateorprovince text COLLATE pg_catalog."default",
    country text COLLATE pg_catalog."default" NOT NULL,
    pincode integer NOT NULL,
    email text COLLATE pg_catalog."default",
    phone text COLLATE pg_catalog."default",
    fax text COLLATE pg_catalog."default",
    id integer NOT NULL DEFAULT nextval('branch_id_seq'::regclass),
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT branch_pkey PRIMARY KEY (id),
    CONSTRAINT branch_companyid_fkey FOREIGN KEY (companyid)
        REFERENCES public.company (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.branch
    OWNER to postgres;


-- Table: public.branchbankaccount

-- DROP TABLE public.branchbankaccount;

CREATE TABLE public.branchbankaccount
(
    branchid integer NOT NULL,
    corporateid text COLLATE pg_catalog."default" NOT NULL,
    accountnumber text COLLATE pg_catalog."default" NOT NULL,
    accountname text COLLATE pg_catalog."default" NOT NULL,
    bankname text COLLATE pg_catalog."default" NOT NULL,
    ifsccode text COLLATE pg_catalog."default" NOT NULL,
    branchname text COLLATE pg_catalog."default" NOT NULL,
    id integer NOT NULL DEFAULT nextval('branchbankaccount_id_seq'::regclass),
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT branchbankaccount_pkey PRIMARY KEY (id),
    CONSTRAINT branchbankaccount_branchid_fkey FOREIGN KEY (branchid)
        REFERENCES public.branch (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.branchbankaccount
    OWNER to postgres;

-- Table: public.branchsignatory

-- DROP TABLE public.branchsignatory;

CREATE TABLE public.branchsignatory
(
    branchid integer NOT NULL,
    fullname text COLLATE pg_catalog."default" NOT NULL,
    fathername text COLLATE pg_catalog."default" NOT NULL,
    designation text COLLATE pg_catalog."default" NOT NULL,
    pannumber text COLLATE pg_catalog."default" NOT NULL,
    addressline1 text COLLATE pg_catalog."default" NOT NULL,
    addressline2 text COLLATE pg_catalog."default",
    city text COLLATE pg_catalog."default" NOT NULL,
    stateorprovince text COLLATE pg_catalog."default",
    country text COLLATE pg_catalog."default" NOT NULL,
    pincode integer NOT NULL,
    email text COLLATE pg_catalog."default",
    phone text COLLATE pg_catalog."default",
    fax text COLLATE pg_catalog."default",
    id integer NOT NULL DEFAULT nextval('branchsignatory_id_seq'::regclass),
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT branchsignatory_pkey PRIMARY KEY (id),
    CONSTRAINT branchsignatory_branchid_fkey FOREIGN KEY (branchid)
        REFERENCES public.branch (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.branchsignatory
    OWNER to postgres;

-- Table: public.leaveapprovalsettings

DROP TABLE public.leaveapprovalsettings;

CREATE TABLE public.leaveapprovalsettings
(
    id serial,
    planid text COLLATE pg_catalog."default",
    isleaveapprovalrequired boolean,
    leavetype integer,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    createddate date,
    modifieddate date,
    isarchived boolean,
    CONSTRAINT leaveapprovalsetting_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leaveapprovalsettings
    OWNER to postgres;

-- Table: public.yearendprocessingsettings

DROP TABLE public.yearendprocessingsettings;

CREATE TABLE public.yearendprocessingsettings
(
    id serial,
    optionofleavebalanceyearend integer,
    iscarriedforwardleaveexpired integer,
    carriedforwardleaveexpireddays integer,
    leavetakenbeyondannualquota integer,  
    planid integer,
    leavetype integer,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    createddate date,
    modifieddate date,
    isarchived boolean,
    CONSTRAINT yearendprocessingsetting_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.yearendprocessingsettings
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.leaveaccrualsettings
(
    id SERIAL primary key,
    canavailentirequota boolean,
    annualquotaratetype integer,
    annualquotaratestartday integer,
    IsLeaveAccrualChangeOnProbation boolean,
    LeavePolicyStartPeriod integer,
    AccrualStartDays integer,
    CanApplyForFutureDate integer,
    MaxDaysConsumedAfterQuota integer,
    CanAccrueLeaveOnNoticePeriod boolean,
    LeaveBalanceRoundOffSettings integer,
    IsLeaveExpires boolean,
    LeaveExpiryDays integer,
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifiedby text COLLATE pg_catalog."default",
    modifieddate date,
    isarchived boolean
)

TABLESPACE pg_default;

ALTER TABLE public.leaveaccrualsettings
    OWNER to postgres;

    

CREATE TABLE IF NOT EXISTS public.bankaccount
(
    id serial,
    accountnumber text COLLATE pg_catalog."default",
    accountname text COLLATE pg_catalog."default",
    bankname text COLLATE pg_catalog."default",
    ifsccode text COLLATE pg_catalog."default",
    branchname text COLLATE pg_catalog."default" ,
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifiedby text COLLATE pg_catalog."default",
    modifieddate date,
    isarchived boolean,
    CONSTRAINT bankaccount_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.bankaccount
    OWNER to postgres;


-- Table: public.dependentdetails

--  DROP TABLE public.dependentdetails;

CREATE TABLE IF NOT EXISTS public.dependentdetails
(
    id serial,
    name text COLLATE pg_catalog."default",
    gender integer,
	relation integer,
    dateofbirth date,
    profession text COLLATE pg_catalog."default",
    phonenumber text COLLATE pg_catalog."default",
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifiedby text COLLATE pg_catalog."default",
    modifieddate date,
    isarchived boolean,
    CONSTRAINT dependentdetails_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.dependentdetails
    OWNER to postgres;


-- Table: public.userprofile

-- DROP TABLE public.userprofie;

CREATE TABLE IF NOT EXISTS  public.userprofile
(
    id serial,
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

ALTER TABLE public.userprofile
    OWNER to postgres;


-- Table: public.jobdetails

-- DROP TABLE public.jobdetails;

CREATE TABLE IF NOT EXISTS public.jobdetails
(
    id serial,
    employeenumber text COLLATE pg_catalog."default",
    jobtitle text COLLATE pg_catalog."default",
    depeartment text COLLATE pg_catalog."default",
    reportingperson text COLLATE pg_catalog."default",
	dateofjoin date,
	employeementstatus integer,
    workinglocation text COLLATE pg_catalog."default",
    probationenddate date,
    notiecperiod text COLLATE pg_catalog."default",
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifiedby text COLLATE pg_catalog."default",
    modifieddate date,
    isarchived boolean,
    CONSTRAINT jobdetails_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.jobdetails
    OWNER to postgres;

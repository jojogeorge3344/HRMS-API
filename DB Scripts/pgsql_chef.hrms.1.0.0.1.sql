-- Create DB
DROP
CREATE DATABASE IF NOT EXISTS ChefDB;

CREATE TABLE IF NOT EXISTS public.company (
    legalname text NOT NULL,
    shortname text NOT NULL,
    logofilepath text,
    dateofincorporation date NOT NULL,
    identificationnumber text NOT NULL,
    businesstype integer NOT NULL,
    id SERIAL PRIMARY KEY,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);
ALTER TABLE public.company OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.branch (
    companyid integer NOT NULL REFERENCES Company(id),
    shortname text NOT NULL,
    timezoneid text NOT NULL,
    addressline1 text NOT NULL,
    addressline2 text,
    city text NOT NULL,
    stateorprovince integer,
    statename text,
    country integer NOT NULL,
    countryname text NOT NULL,
    pincode integer NOT NULL,
    email text,
    phone text,
    fax text,
    id SERIAL PRIMARY KEY,
    createddate date,
    modifieddate date,
    createdby text,m
    odifiedby text,
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
    modifieddate date,c
    reatedby text,
    modifiedby text,i
    isarchived boolean
);
ALTER TABLE public.branchbankaccount OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.branchsignatory (
    branchid integer NOT NULL REFERENCES Branch(id),
    fullname text NOT NULL,
    fathername text NOT NULL,
    designation text NOT NULL,
    pannumber text NOT NULL,
    addressline1 text NOT NULL,
    addressline2 text,
    city text NOT NULL,
    stateorprovince integer,
    statename text,
    country integer NOT NULL,
    countryname text NOT NULL,
    pincode integer NOT NULL,
    email text,
    phone text,
    fax text,
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
    name text NOT NULL,
    description text NOT NULL,
    date date NOT NULL,
    holidaycategoryid integer NOT NULL REFERENCES HolidayCategory(id),
    isfloating boolean NOT NULL,
    id SERIAL PRIMARY KEY,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,isarchived boolean
);
ALTER TABLE public.holiday OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.leavetype (
    name text NOT NULL,
    code text NOT NULL,
    description text NOT NULL,
    showleavedescription boolean,
    ispaidleave boolean,
    issickleave boolean,
    isstatutoryleave boolean,
    isrestrictedtogender boolean,
    restrictedtogender integer,
    isrestrictedtomaritalstatus boolean,
    restrictedtomaritalstatus integer,
    id SERIAL PRIMARY KEY,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);
ALTER TABLE public.leavetype OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.leaveplan (
    name text,
    description text,
    calendaryearstartdate date,
    calendaryearenddate date,
    showleavepolicyexplanation boolean,
    iscustomleavepolicydocumentavailable boolean,
    customdocumentpath text,
    id SERIAL PRIMARY KEY,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);
ALTER TABLE public.leaveplan OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.leaveplanleavetype (
    leaveplanid integer REFERENCES LeavePlan(id),
    leavetypeid integer REFERENCES LeaveType(id),
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean,
    PRIMARY KEY(leaveplanid,leavetypeid)
);
ALTER TABLE public.leaveplanleavetype OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.leavegeneralsettings (
    annualleavequota integer,
    maxconsecutivedays integer,
    maxnumberofdayspermonth integer,
    numberofdaysgaprequiredbetweenleaves integer,
    noleavequotaafterjoiningday integer,
    priornoticedays integer,a
    llocateleavequotaat integer,
    balanceroundoff integer,
    leavebalancesattheyearend integer,
    negativeleavebalancesattheyearend integer,
    maxcarryforwarddays integer,
    leaveplanid integer REFERENCES LeavePlan(id),
    leavetypeid integer REFERENCES LeaveType(id),
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean,
    PRIMARY KEY(leaveplanid,leavetypeid)
);
ALTER TABLE public.leavegeneralsettings OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.leaverestrictionsettings (
    canapplyhalfday boolean,
    canemployeeapplyleave boolean,
    canapplyleaveduringprobation boolean,
    canapplyleaveduringnoticeperiod boolean,
    canapplyforfuturedate boolean,
    canreportingmanageroverriderestrictions boolean,
    canreportingmanagerallocateleavecredit boolean,
    isleaveapprovalrequired boolean,
    leaveplanid integer REFERENCES LeavePlan(id),
    leavetypeid integer REFERENCES LeaveType(id),
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean,
    PRIMARY KEY(leaveplanid,leavetypeid)
);
ALTER TABLE public.leaverestrictionsettings OWNER to postgres;


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


CREATE TABLE IF NOT EXISTS public.state (
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
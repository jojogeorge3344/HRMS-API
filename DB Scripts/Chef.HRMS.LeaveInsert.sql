DROP TABLE IF EXISTS public.applyforleave;

CREATE TABLE IF NOT EXISTS public.applyforleave
(
    id integer NOT NULL DEFAULT nextval('applyforleave_id_seq'::regclass),
    ishalfdayallowed boolean,
    allowemoloyeetoapplyleave boolean,
    leaveduration integer,
    priorcalendardays integer,
    workingdays integer,
    isearlyapplypossible boolean,
    calendardayspriortoleavedate integer,
    ispastdayleaveapplypossible boolean,
    pastdayleaveapplydays integer,
    restrictpastdatedleave boolean,
    restrictpastdateleaveafter integer,
    doescommentrequired boolean,
    isdocumentrequiredforextendedleave boolean,
    calendardaysfordocuments integer,
    CONSTRAINT applyforleave_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.applyforleave
    OWNER to postgres;

DROP TABLE IF EXISTS public.leave;
CREATE TABLE IF NOT EXISTS public.leave
(
    leaveid integer NOT NULL DEFAULT nextval('"Leave_leaveid_seq"'::regclass),
    leavetypeid integer,
    leavesessionid integer,
    leavestatusid integer,
    leavefromdate date,
    leavetodate date,
    ishalfday integer,
    leavedescription text COLLATE pg_catalog."default",
    leaveappliedby text COLLATE pg_catalog."default",
    leaveapplieddate date,
    leaveapprovedby text COLLATE pg_catalog."default",
    leaveapproveddate date,
    leavenotifypersonnel text COLLATE pg_catalog."default",
    leavedocumentpath text COLLATE pg_catalog."default",
    CONSTRAINT "Leave_pkey" PRIMARY KEY (leaveid),
    CONSTRAINT "LeaveSessionId" FOREIGN KEY (leavesessionid)
        REFERENCES public.leavesessionmaster (sessionid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "LeaveStatusId" FOREIGN KEY (leavestatusid)
        REFERENCES public.leavestatusmaster (statusid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "Leave_Type_Id" FOREIGN KEY (leavetypeid)
        REFERENCES public.leavetypemaster (leavetypeid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leave
    OWNER to postgres;


DROP TABLE IF EXISTS public.leaveaccrualsettings;
CREATE TABLE IF NOT EXISTS public.leaveaccrualsettings
(
    id integer NOT NULL DEFAULT nextval('leaveaccrualsettings_id_seq'::regclass),
    canavailentirequota boolean,
    annualquotaratetype integer,
    annualquotaratestartday integer,
    isleaveaccrualchangeonprobation boolean,
    leavepolicystartperiod integer,
    accrualstartdays integer,
    maxdaysconsumedafterquota integer,
    canaccrueleaveonnoticeperiod boolean,
    leavebalanceroundoffsettings integer,
    isleaveexpires boolean,
    leaveexpirydays integer,
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifiedby text COLLATE pg_catalog."default",
    modifieddate date,
    isarchived boolean,
    canapplyforfuturedate boolean,
    CONSTRAINT leaveaccrualsettings_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leaveaccrualsettings
    OWNER to postgres;

DROP TABLE IF EXISTS public.leaveapprovalsettings;
CREATE TABLE IF NOT EXISTS public.leaveapprovalsettings
(
    id integer NOT NULL DEFAULT nextval('leaveapprovalsettings_id_seq'::regclass),
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

DROP TABLE IF EXISTS public.leaveplan;
CREATE TABLE IF NOT EXISTS public.leaveplan
(
    planid integer NOT NULL DEFAULT nextval('leaveplan_planid_seq'::regclass),
    description text COLLATE pg_catalog."default",
    calendaryearstartsfrom date,
    showleavepolicyexplanation boolean,
    iscustomleavepolicydocumentavailable boolean,
    customdocumentpath text COLLATE pg_catalog."default",
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT "LeavePlan_pkey" PRIMARY KEY (planid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leaveplan
    OWNER to postgres;


DROP TABLE IF EXISTS public.leaveplantypes;
CREATE TABLE IF NOT EXISTS public.leaveplantypes
(
    leaveplantypesid integer NOT NULL DEFAULT nextval('leaveplantypes_leaveplantypesid_seq'::regclass),
    leaveplanid integer,
    leavetypeid integer,
    CONSTRAINT leaveplantypes_pkey PRIMARY KEY (leaveplantypesid),
    CONSTRAINT leaveplanid FOREIGN KEY (leaveplanid)
        REFERENCES public.leaveplan (planid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT leavetypeid FOREIGN KEY (leavetypeid)
        REFERENCES public.leavetypemaster (leavetypeid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leaveplantypes
    OWNER to postgres;

COMMENT ON CONSTRAINT leaveplanid ON public.leaveplantypes
    IS 'leaveplanid';
COMMENT ON CONSTRAINT leavetypeid ON public.leaveplantypes
    IS 'leavetypeid';

DROP TABLE IF EXISTS public.leaveplanview;
CREATE TABLE IF NOT EXISTS public.leaveplanview
(
    id integer NOT NULL DEFAULT nextval('leaveapply_id_seq'::regclass),
    leaveplanid integer,
    leavetypeid integer,
    quota text COLLATE pg_catalog."default",
    accrual text COLLATE pg_catalog."default",
    endofyear text COLLATE pg_catalog."default",
    CONSTRAINT leaveapply_pkey PRIMARY KEY (id),
    CONSTRAINT leaveplanid FOREIGN KEY (leaveplanid)
        REFERENCES public.leaveplan (planid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT leavetypeid FOREIGN KEY (leavetypeid)
        REFERENCES public.leavetypemaster (leavetypeid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leaveplanview
    OWNER to postgres;

COMMENT ON CONSTRAINT leaveplanid ON public.leaveplanview
    IS 'leaveplanid';
COMMENT ON CONSTRAINT leavetypeid ON public.leaveplanview
    IS 'leavetypeid';


DROP TABLE IF EXISTS public.leavequota;
CREATE TABLE IF NOT EXISTS public.leavequota
(
    id integer NOT NULL DEFAULT nextval('leavequota_id_seq'::regclass),
    leaveplanid integer,
    leavetypeid integer,
    annualcasualleavequota integer,
    isleavebeyondannualquotapossible boolean,
    leavebeyondannualquota integer,
    isleavequotaallocatedinthejoiningmonth boolean,
    leavequotaallocatedinthejoiningmonthafter integer,
    canmanagerawardcasualleave boolean,
    islimitedannualleavedays boolean,
    CONSTRAINT leavequota_pkey PRIMARY KEY (id),
    CONSTRAINT "leaveplanId" FOREIGN KEY (leaveplanid)
        REFERENCES public.leaveplan (planid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT leavetypeid FOREIGN KEY (leavetypeid)
        REFERENCES public.leavetypemaster (leavetypeid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leavequota
    OWNER to postgres;

COMMENT ON COLUMN public.leavequota.islimitedannualleavedays
    IS 'islimitedannualleavedays';

COMMENT ON CONSTRAINT "leaveplanId" ON public.leavequota
    IS 'leaveplanId';
COMMENT ON CONSTRAINT leavetypeid ON public.leavequota
    IS 'leavetypeid';

DROP TABLE IF EXISTS public.leaverestrictions;
CREATE TABLE IF NOT EXISTS public.leaverestrictions
(
    id integer NOT NULL DEFAULT nextval('leaverestrictions_id_seq'::regclass),
    cannewjoineeapplyleave boolean,
    newjoineeapplyleaveafterprobationdays integer,
    isconsecutiveleavelimitexist boolean,
    consecutiveleavelimit integer,
    maxleavebalancecanbeavailed boolean,
    maxleavebalancecanbeavailedlimit integer,
    noticeperiodemployeeextendedtimes integer,
    canmanageroverrideleaverestrictions boolean,
    enforceminimumgapofdays boolean,
    minimumgapbetweenleaverequests integer,
    allowmultipleleaverequestsperyear boolean,
    leaverequestinstancelimitperyear integer,
    allowmultipleleaverequestspermonth boolean,
    leaverequestinstancelimitpermonth integer,
    allowmultipleleaverequestspertenure boolean,
    leaverequestinstancelimitpertenure integer,
    allowlimiteddaysinasingleinstance boolean,
    leaverequestinasingleinstance integer,
    totalaavilableleavebalance integer,
    canoverlapleaves boolean,
    leavecannotbetakenwith text COLLATE pg_catalog."default",
    isleavenotavailablewithleavebalance boolean,
    leavenotavailablewithleavebalance integer,
    planid integer,
    leavetypeid integer,
    createdby text COLLATE pg_catalog."default",
    createddate date,
    modifiedby text COLLATE pg_catalog."default",
    modifieddate date,
    isarchived boolean,
    newjoineeapplyleavefromjoiningdate date,
    cannoticeperiodemployeeavailleave boolean,
    CONSTRAINT leaverestrictions_pkey PRIMARY KEY (id),
    CONSTRAINT leavetypeid FOREIGN KEY (leavetypeid)
        REFERENCES public.leavetypemaster (leavetypeid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT planid FOREIGN KEY (planid)
        REFERENCES public.leaveplan (planid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leaverestrictions
    OWNER to postgres;

COMMENT ON COLUMN public.leaverestrictions.planid
    IS 'planid';

COMMENT ON CONSTRAINT leavetypeid ON public.leaverestrictions
    IS 'leavetypeid';
COMMENT ON CONSTRAINT planid ON public.leaverestrictions
    IS 'planid
';


DROP TABLE IF EXISTS public.leavesessionmaster;
CREATE TABLE IF NOT EXISTS public.leavesessionmaster
(
    sessionid integer NOT NULL DEFAULT nextval('"LeaveSessionMaster_Id_seq"'::regclass),
    sessionname text COLLATE pg_catalog."default",
    CONSTRAINT "LeaveSessionMaster_pkey" PRIMARY KEY (sessionid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leavesessionmaster
    OWNER to postgres;


DROP TABLE IF EXISTS public.leavestatusmaster;
CREATE TABLE IF NOT EXISTS public.leavestatusmaster
(
    statusid integer NOT NULL DEFAULT nextval('"LeaveStatusMaster_Id_seq"'::regclass),
    statusname text COLLATE pg_catalog."default",
    CONSTRAINT "LeaveStatusMaster_pkey" PRIMARY KEY (statusid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leavestatusmaster
    OWNER to postgres;

DROP TABLE IF EXISTS public.leavetypemaster;
CREATE TABLE IF NOT EXISTS public.leavetypemaster
(
    leavetypeid integer NOT NULL DEFAULT nextval('"LeaveTypeMaster_Id_seq"'::regclass),
    leavetype text COLLATE pg_catalog."default",
    leavecode text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    showleavedescription boolean,
    ispaidleave boolean,
    issickleave boolean,
    isstatutoryleave boolean,
    isrestrictedtogender boolean,
    restrictedtogender smallint,
    isrestrictedtomaritalstatus boolean,
    restrictedtomaritalstatus smallint,
    listofreasons boolean,
    CONSTRAINT "LeaveTypeMaster_pkey" PRIMARY KEY (leavetypeid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.leavetypemaster
    OWNER to postgres;

DROP TABLE IF EXISTS public.yearendprocessingsettings;
CREATE TABLE IF NOT EXISTS public.yearendprocessingsettings
(
    id integer NOT NULL DEFAULT nextval('yearendprocessingsettings_id_seq'::regclass),
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

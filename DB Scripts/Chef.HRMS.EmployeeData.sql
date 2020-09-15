-- Table: public.jobtitle

-- DROP TABLE public.jobtitle;

CREATE TABLE IF NOT EXISTS  public.jobtitle
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    jobtitlename text COLLATE pg_catalog."default" NOT NULL,
    jobdescription text COLLATE pg_catalog."default" NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT jobtiltle_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.jobtitle
    OWNER to postgres;

    -- Table: public.employeenumberseries

-- DROP TABLE public.employeenumberseries;

CREATE TABLE IF NOT EXISTS  public.employeenumberseries
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    seriesname text COLLATE pg_catalog."default" NOT NULL,
    prefix text COLLATE pg_catalog."default" NOT NULL,
    "suffix " text COLLATE pg_catalog."default",
    nextnumber bigint NOT NULL,
    status boolean NOT NULL,
    "default" boolean NOT NULL,
    createddate date,
    modifieddate date,
    createdby text COLLATE pg_catalog."default",
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    description text COLLATE pg_catalog."default",
    digitinnumber integer,
    CONSTRAINT employeenumberseries_pkey PRIMARY KEY (id),
    CONSTRAINT constraint_name UNIQUE (nextnumber)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.employeenumberseries
    OWNER to postgres;


    -- Table: public.employeedefaults

-- DROP TABLE public.employeedefaults;

CREATE TABLE IF NOT EXISTS  public.employeedefaults
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    probationduration integer NOT NULL,
    probationperiod text COLLATE pg_catalog."default",
    wroktype text COLLATE pg_catalog."default",
    timetype text COLLATE pg_catalog."default",
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

ALTER TABLE public.employeedefaults
    OWNER to postgres;
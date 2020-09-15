 -- Table: public.holidaymaster

-- DROP TABLE public.holidaymaster;

CREATE TABLE IF NOT EXISTS  public.holidaymaster
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    holidaylistname text COLLATE pg_catalog."default" NOT NULL,
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

ALTER TABLE public.holidaymaster
    OWNER to postgres;


-- Table: public.holidaylist

-- DROP TABLE public.holidaylist;

CREATE TABLE IF NOT EXISTS  public.holidaylist
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    holidayname text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    holidaydate date NOT NULL,
    holidaymasterid bigint NOT NULL,
    floatingholiday boolean NOT NULL,
    createdby text COLLATE pg_catalog."default" NOT NULL,
    createddate date NOT NULL,
    modifieddate date,
    modifiedby text COLLATE pg_catalog."default",
    isarchived boolean,
    CONSTRAINT constraint_name FOREIGN KEY (holidaymasterid)
        REFERENCES public.holidaymaster (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.holidaylist
    OWNER to postgres;



   
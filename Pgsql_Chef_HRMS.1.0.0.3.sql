--
-- PostgreSQL database dump
--

-- Dumped from database version 10.11
-- Dumped by pg_dump version 10.12

-- Started on 2020-04-21 13:20:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4225 (class 1262 OID 42314)
-- Name: ChefHRMS; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "ChefHRMS" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE "ChefHRMS" OWNER TO postgres;

\connect "ChefHRMS"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 13794)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 4227 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 258 (class 1259 OID 52162)
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address (
    employeeid integer,
    currentaddressline1 text,
    currentaddressline2 text,
    currentcountry integer,
    currentstate integer,
    currentpincode text,
    permanentaddressline1 text,
    permanentaddressline2 text,
    permanentcountry integer,
    permanentstate integer,
    permanentpincode text,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.address OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 52160)
-- Name: address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_id_seq OWNER TO postgres;

--
-- TOC entry 4228 (class 0 OID 0)
-- Dependencies: 257
-- Name: address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;


--
-- TOC entry 214 (class 1259 OID 42518)
-- Name: authentication; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authentication (
    email text NOT NULL,
    password text NOT NULL,
    token text,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean,
    employeeid integer
);


ALTER TABLE public.authentication OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 42516)
-- Name: authentication_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.authentication_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.authentication_id_seq OWNER TO postgres;

--
-- TOC entry 4229 (class 0 OID 0)
-- Dependencies: 213
-- Name: authentication_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.authentication_id_seq OWNED BY public.authentication.id;


--
-- TOC entry 237 (class 1259 OID 42801)
-- Name: branch_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.branch_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.branch_id_seq OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 42803)
-- Name: branch; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.branch (
    addressline1 text NOT NULL,
    addressline2 text,
    city text NOT NULL,
    companyid integer NOT NULL,
    country integer NOT NULL,
    countryname text NOT NULL,
    email text,
    fax text,
    phone text,
    pincode text NOT NULL,
    shortname text NOT NULL,
    statename text,
    stateorprovince integer,
    timezoneid text NOT NULL,
    id integer DEFAULT nextval('public.branch_id_seq'::regclass) NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.branch OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 42833)
-- Name: branchbankaccount_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.branchbankaccount_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.branchbankaccount_id_seq OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 42835)
-- Name: branchbankaccount; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.branchbankaccount (
    branchid integer NOT NULL,
    corporateid text NOT NULL,
    accountnumber text NOT NULL,
    accountname text NOT NULL,
    bankname text NOT NULL,
    ifsccode text NOT NULL,
    branchname text NOT NULL,
    id integer DEFAULT nextval('public.branchbankaccount_id_seq'::regclass) NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.branchbankaccount OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 42817)
-- Name: branchsignatory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.branchsignatory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.branchsignatory_id_seq OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 42819)
-- Name: branchsignatory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.branchsignatory (
    addressline1 text NOT NULL,
    addressline2 text,
    branchid integer NOT NULL,
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
    pincode text NOT NULL,
    statename text,
    stateorprovince integer,
    id integer DEFAULT nextval('public.branchsignatory_id_seq'::regclass) NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.branchsignatory OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 42328)
-- Name: company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company (
    id integer NOT NULL,
    businesstype integer NOT NULL,
    dateofincorporation date NOT NULL,
    identificationnumber text NOT NULL,
    legalname text NOT NULL,
    logofilepath text,
    shortname text NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.company OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 42326)
-- Name: company_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.company_id_seq OWNER TO postgres;

--
-- TOC entry 4230 (class 0 OID 0)
-- Dependencies: 196
-- Name: company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;


--
-- TOC entry 260 (class 1259 OID 52180)
-- Name: contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact (
    emergencycontactname text,
    emergencycontactnumber text,
    employeeid integer,
    homephone text,
    mobile text NOT NULL,
    personalemail text,
    skype text,
    workemail text,
    workphone text,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.contact OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 52178)
-- Name: contact_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contact_id_seq OWNER TO postgres;

--
-- TOC entry 4231 (class 0 OID 0)
-- Dependencies: 259
-- Name: contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contact_id_seq OWNED BY public.contact.id;


--
-- TOC entry 210 (class 1259 OID 42490)
-- Name: country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.country (
    name text NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.country OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 42488)
-- Name: country_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.country_id_seq OWNER TO postgres;

--
-- TOC entry 4232 (class 0 OID 0)
-- Dependencies: 209
-- Name: country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.country_id_seq OWNED BY public.country.id;


--
-- TOC entry 222 (class 1259 OID 42588)
-- Name: dependent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dependent (
    dateofbirth date,
    employeeid integer,
    gender integer,
    name text NOT NULL,
    phone text,
    profession text,
    relationship integer,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.dependent OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 42586)
-- Name: dependent_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dependent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dependent_id_seq OWNER TO postgres;

--
-- TOC entry 4233 (class 0 OID 0)
-- Dependencies: 221
-- Name: dependent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dependent_id_seq OWNED BY public.dependent.id;


--
-- TOC entry 218 (class 1259 OID 42540)
-- Name: document; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.document (
    extention text NOT NULL,
    name text NOT NULL,
    path text NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.document OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 42538)
-- Name: document_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.document_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.document_id_seq OWNER TO postgres;

--
-- TOC entry 4234 (class 0 OID 0)
-- Dependencies: 217
-- Name: document_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.document_id_seq OWNED BY public.document.id;


--
-- TOC entry 224 (class 1259 OID 42604)
-- Name: drivinglicense; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.drivinglicense (
    address text,
    dateofexpiry date,
    dateofbirth date,
    employeeid integer,
    fathername text,
    isapproved boolean,
    name text NOT NULL,
    number text NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.drivinglicense OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 42602)
-- Name: drivinglicense_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.drivinglicense_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.drivinglicense_id_seq OWNER TO postgres;

--
-- TOC entry 4235 (class 0 OID 0)
-- Dependencies: 223
-- Name: drivinglicense_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.drivinglicense_id_seq OWNED BY public.drivinglicense.id;


--
-- TOC entry 266 (class 1259 OID 52241)
-- Name: drivinglicensedocument; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.drivinglicensedocument (
    id integer NOT NULL,
    drivinglicenseid integer,
    documentid integer,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.drivinglicensedocument OWNER TO postgres;

--
-- TOC entry 265 (class 1259 OID 52239)
-- Name: drivinglicensedocument_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.drivinglicensedocument_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.drivinglicensedocument_id_seq OWNER TO postgres;

--
-- TOC entry 4236 (class 0 OID 0)
-- Dependencies: 265
-- Name: drivinglicensedocument_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.drivinglicensedocument_id_seq OWNED BY public.drivinglicensedocument.id;


--
-- TOC entry 226 (class 1259 OID 42625)
-- Name: education; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.education (
    degree text NOT NULL,
    employeeid integer,
    percentage real NOT NULL,
    specialization text,
    university text NOT NULL,
    yearofcompletion text NOT NULL,
    yearofjoining text,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.education OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 42623)
-- Name: education_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.education_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.education_id_seq OWNER TO postgres;

--
-- TOC entry 4237 (class 0 OID 0)
-- Dependencies: 225
-- Name: education_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.education_id_seq OWNED BY public.education.id;


--
-- TOC entry 281 (class 1259 OID 59195)
-- Name: educationdocument; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.educationdocument (
    id integer NOT NULL,
    documentid integer NOT NULL,
    educationid integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.educationdocument OWNER TO postgres;

--
-- TOC entry 280 (class 1259 OID 59193)
-- Name: educationdocument_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.educationdocument_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.educationdocument_id_seq OWNER TO postgres;

--
-- TOC entry 4238 (class 0 OID 0)
-- Dependencies: 280
-- Name: educationdocument_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.educationdocument_id_seq OWNED BY public.educationdocument.id;


--
-- TOC entry 216 (class 1259 OID 42529)
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    firstname text NOT NULL,
    middlename text,
    lastname text NOT NULL,
    displayname text NOT NULL,
    gender integer NOT NULL,
    dateofbirth date NOT NULL,
    email text NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean,
    maritalstatus integer,
    bloodgroup integer
);


ALTER TABLE public.employee OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 42527)
-- Name: employee_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_id_seq OWNER TO postgres;

--
-- TOC entry 4239 (class 0 OID 0)
-- Dependencies: 215
-- Name: employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_id_seq OWNED BY public.employee.id;


--
-- TOC entry 250 (class 1259 OID 50401)
-- Name: employeedefaults; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employeedefaults (
    id integer NOT NULL,
    probationduration integer NOT NULL,
    periodtype integer NOT NULL,
    workertype integer NOT NULL,
    timetype integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.employeedefaults OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 50399)
-- Name: employeedefaults_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employeedefaults_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employeedefaults_id_seq OWNER TO postgres;

--
-- TOC entry 4240 (class 0 OID 0)
-- Dependencies: 249
-- Name: employeedefaults_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employeedefaults_id_seq OWNED BY public.employeedefaults.id;


--
-- TOC entry 269 (class 1259 OID 59033)
-- Name: employeeletter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employeeletter (
    id integer NOT NULL,
    name text,
    path text,
    type integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.employeeletter OWNER TO postgres;

--
-- TOC entry 268 (class 1259 OID 59031)
-- Name: employeeletter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employeeletter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employeeletter_id_seq OWNER TO postgres;

--
-- TOC entry 4241 (class 0 OID 0)
-- Dependencies: 268
-- Name: employeeletter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employeeletter_id_seq OWNED BY public.employeeletter.id;


--
-- TOC entry 271 (class 1259 OID 59044)
-- Name: employeeletterdocument; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employeeletterdocument (
    id integer NOT NULL,
    documentid integer NOT NULL,
    employeeletterid integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.employeeletterdocument OWNER TO postgres;

--
-- TOC entry 270 (class 1259 OID 59042)
-- Name: employeeletterdocument_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employeeletterdocument_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employeeletterdocument_id_seq OWNER TO postgres;

--
-- TOC entry 4242 (class 0 OID 0)
-- Dependencies: 270
-- Name: employeeletterdocument_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employeeletterdocument_id_seq OWNED BY public.employeeletterdocument.id;


--
-- TOC entry 248 (class 1259 OID 50359)
-- Name: employeenumberseries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employeenumberseries (
    id integer NOT NULL,
    name text NOT NULL,
    prefix text NOT NULL,
    nextnumber bigint,
    isactive boolean,
    isdefault boolean,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean,
    description text,
    digitinnumber integer,
    suffix text
);


ALTER TABLE public.employeenumberseries OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 50357)
-- Name: employeenumberseries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employeenumberseries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employeenumberseries_id_seq OWNER TO postgres;

--
-- TOC entry 4243 (class 0 OID 0)
-- Dependencies: 247
-- Name: employeenumberseries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employeenumberseries_id_seq OWNED BY public.employeenumberseries.id;


--
-- TOC entry 201 (class 1259 OID 42398)
-- Name: holiday; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.holiday (
    date date NOT NULL,
    description text NOT NULL,
    isfloating boolean NOT NULL,
    name text NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean,
    holidaycategoryid integer
);


ALTER TABLE public.holiday OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 42396)
-- Name: holiday_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.holiday_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.holiday_id_seq OWNER TO postgres;

--
-- TOC entry 4244 (class 0 OID 0)
-- Dependencies: 200
-- Name: holiday_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.holiday_id_seq OWNED BY public.holiday.id;


--
-- TOC entry 199 (class 1259 OID 42387)
-- Name: holidaycategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.holidaycategory (
    name text NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean,
    year integer
);


ALTER TABLE public.holidaycategory OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 42385)
-- Name: holidaycategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.holidaycategory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.holidaycategory_id_seq OWNER TO postgres;

--
-- TOC entry 4245 (class 0 OID 0)
-- Dependencies: 198
-- Name: holidaycategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.holidaycategory_id_seq OWNED BY public.holidaycategory.id;


--
-- TOC entry 220 (class 1259 OID 42551)
-- Name: identitydocument; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.identitydocument (
    dateofbirth date,
    documentid integer,
    employeeid integer,
    fathername text,
    isapproved boolean,
    name text NOT NULL,
    number text NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.identitydocument OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 42549)
-- Name: identitydocument_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.identitydocument_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.identitydocument_id_seq OWNER TO postgres;

--
-- TOC entry 4246 (class 0 OID 0)
-- Dependencies: 219
-- Name: identitydocument_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.identitydocument_id_seq OWNED BY public.identitydocument.id;


--
-- TOC entry 254 (class 1259 OID 50509)
-- Name: jobdetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobdetails (
    id integer NOT NULL,
    employeeid integer NOT NULL,
    dateofjoin date,
    numberseriesid integer NOT NULL,
    employeenumber text NOT NULL,
    jobtitleid integer NOT NULL,
    secondaryjobtitle text,
    businessunit integer,
    department integer,
    location integer,
    reportingmanager text,
    workertype integer,
    timetype integer,
    probationperiod integer,
    periodtype integer,
    noticeperiod integer,
    createdby text,
    createddate date,
    modifiedby text,
    modifieddate date,
    isarchived boolean
);


ALTER TABLE public.jobdetails OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 50507)
-- Name: jobdetails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jobdetails_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobdetails_id_seq OWNER TO postgres;

--
-- TOC entry 4247 (class 0 OID 0)
-- Dependencies: 253
-- Name: jobdetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jobdetails_id_seq OWNED BY public.jobdetails.id;


--
-- TOC entry 252 (class 1259 OID 50481)
-- Name: jobfilling; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobfilling (
    id integer NOT NULL,
    employeeid integer NOT NULL,
    leavestructureid integer NOT NULL,
    shift integer NOT NULL,
    weekoff integer NOT NULL,
    holidaycategoryid integer NOT NULL,
    attendancetracking integer NOT NULL,
    expensepolicy integer NOT NULL,
    attendancecapturescheme integer NOT NULL,
    skiponboarding boolean NOT NULL,
    onboardingflow integer NOT NULL,
    canusermanageprofile boolean NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.jobfilling OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 50479)
-- Name: jobfilling_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jobfilling_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobfilling_id_seq OWNER TO postgres;

--
-- TOC entry 4248 (class 0 OID 0)
-- Dependencies: 251
-- Name: jobfilling_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jobfilling_id_seq OWNED BY public.jobfilling.id;


--
-- TOC entry 246 (class 1259 OID 50328)
-- Name: jobtitle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobtitle (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.jobtitle OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 50326)
-- Name: jobtitle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jobtitle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobtitle_id_seq OWNER TO postgres;

--
-- TOC entry 4249 (class 0 OID 0)
-- Dependencies: 245
-- Name: jobtitle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jobtitle_id_seq OWNED BY public.jobtitle.id;


--
-- TOC entry 256 (class 1259 OID 52011)
-- Name: leave; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leave (
    id integer NOT NULL,
    approvedby int NOT NULL,
    approveddate date,
    description text NOT NULL,
    fromdate date,
    todate date,
    leavestatus integer,
    leavecomponentid integer NOT NULL,
    notifypersonnel text NOT NULL,
    numberofdays integer,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean,
    employeeid int
);


ALTER TABLE public.leave OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 52009)
-- Name: leave_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leave_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.leave_id_seq OWNER TO postgres;

--
-- TOC entry 4250 (class 0 OID 0)
-- Dependencies: 255
-- Name: leave_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leave_id_seq OWNED BY public.leave.id;


--
-- TOC entry 203 (class 1259 OID 42414)
-- Name: leavecomponent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leavecomponent (
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
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.leavecomponent OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 42412)
-- Name: leavecomponent_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leavecomponent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.leavecomponent_id_seq OWNER TO postgres;

--
-- TOC entry 4251 (class 0 OID 0)
-- Dependencies: 202
-- Name: leavecomponent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leavecomponent_id_seq OWNED BY public.leavecomponent.id;


--
-- TOC entry 207 (class 1259 OID 42452)
-- Name: leavecomponentgeneralsettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leavecomponentgeneralsettings (
    allocateleavequotaat integer,
    annualleavequota integer,
    balanceroundoff integer,
    leavebalancesattheyearend integer,
    leavecomponentid integer NOT NULL,
    leavestructureid integer NOT NULL,
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
    isarchived boolean
);


ALTER TABLE public.leavecomponentgeneralsettings OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 42470)
-- Name: leavecomponentrestrictionsettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leavecomponentrestrictionsettings (
    canapplyforfuturedate boolean,
    canapplyhalfday boolean,
    canapplyleaveduringnoticeperiod boolean,
    canapplyleaveduringprobation boolean,
    canemployeeapplyleave boolean,
    canreportingmanagerallocateleavecredit boolean,
    canreportingmanageroverriderestrictions boolean,
    isleaveapprovalrequired boolean,
    leavecomponentid integer NOT NULL,
    leavestructureid integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.leavecomponentrestrictionsettings OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 42425)
-- Name: leavestructure; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leavestructure (
    calendaryearstartdate date,
    customdocumentpath text,
    description text,
    iscustomleavepolicydocumentavailable boolean,
    name text,
    showleavepolicyexplanation boolean,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.leavestructure OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 42423)
-- Name: leavestructure_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leavestructure_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.leavestructure_id_seq OWNER TO postgres;

--
-- TOC entry 4252 (class 0 OID 0)
-- Dependencies: 204
-- Name: leavestructure_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leavestructure_id_seq OWNED BY public.leavestructure.id;


--
-- TOC entry 206 (class 1259 OID 42434)
-- Name: leavestructureleavecomponent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leavestructureleavecomponent (
    leavecomponentid integer NOT NULL,
    leavestructureid integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.leavestructureleavecomponent OWNER TO postgres;

--
-- TOC entry 264 (class 1259 OID 52209)
-- Name: loanrequest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loanrequest (
    comments text NOT NULL,
    emistartsfrom date NOT NULL,
    employeeid integer NOT NULL,
    expectedon date NOT NULL,
    loanamount double precision NOT NULL,
    loanno text NOT NULL,
    loantype integer NOT NULL,
    paymenttype integer NOT NULL,
    repaymentterm integer NOT NULL,
    requesteddate date NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.loanrequest OWNER TO postgres;

--
-- TOC entry 263 (class 1259 OID 52207)
-- Name: loanrequest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.loanrequest_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.loanrequest_id_seq OWNER TO postgres;

--
-- TOC entry 4253 (class 0 OID 0)
-- Dependencies: 263
-- Name: loanrequest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.loanrequest_id_seq OWNED BY public.loanrequest.id;


--
-- TOC entry 262 (class 1259 OID 52198)
-- Name: loansetting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loansetting (
    eligibledaysfromjoining integer NOT NULL,
    interestcalcutationmethod integer NOT NULL,
    iseligiblebasedonannualgrosssalary boolean NOT NULL,
    iseligibleinafterprobationperiod boolean NOT NULL,
    iseligibleinnoticeperiod boolean NOT NULL,
    maxnumberofinstallments integer NOT NULL,
    salaryfromrange integer NOT NULL,
    salarytorange integer NOT NULL,
    standardinterestrate integer NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.loansetting OWNER TO postgres;

--
-- TOC entry 261 (class 1259 OID 52196)
-- Name: loansetting_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.loansetting_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.loansetting_id_seq OWNER TO postgres;

--
-- TOC entry 4254 (class 0 OID 0)
-- Dependencies: 261
-- Name: loansetting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.loansetting_id_seq OWNED BY public.loansetting.id;


--
-- TOC entry 228 (class 1259 OID 42659)
-- Name: pan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pan (
    dateofbirth date,
    employeeid integer,
    fathername text,
    isapproved boolean,
    name text NOT NULL,
    number text NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.pan OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 42657)
-- Name: pan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pan_id_seq OWNER TO postgres;

--
-- TOC entry 4255 (class 0 OID 0)
-- Dependencies: 227
-- Name: pan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pan_id_seq OWNED BY public.pan.id;


--
-- TOC entry 267 (class 1259 OID 58884)
-- Name: pandocument; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pandocument (
    id integer DEFAULT nextval('public.drivinglicensedocument_id_seq'::regclass) NOT NULL,
    panid integer,
    documentid integer,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.pandocument OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 42680)
-- Name: passport; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.passport (
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
    employeeid integer,
    fathername text,
    isapproved boolean,
    name text NOT NULL,
    number text NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.passport OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 42678)
-- Name: passport_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.passport_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.passport_id_seq OWNER TO postgres;

--
-- TOC entry 4256 (class 0 OID 0)
-- Dependencies: 229
-- Name: passport_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.passport_id_seq OWNED BY public.passport.id;


--
-- TOC entry 273 (class 1259 OID 59067)
-- Name: passportdocument; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.passportdocument (
    id integer NOT NULL,
    passportid integer,
    documentid integer,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.passportdocument OWNER TO postgres;

--
-- TOC entry 272 (class 1259 OID 59065)
-- Name: passportdocument_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.passportdocument_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.passportdocument_id_seq OWNER TO postgres;

--
-- TOC entry 4257 (class 0 OID 0)
-- Dependencies: 272
-- Name: passportdocument_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.passportdocument_id_seq OWNED BY public.passportdocument.id;


--
-- TOC entry 236 (class 1259 OID 42767)
-- Name: payrollcomponent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payrollcomponent (
    name text NOT NULL,
    payrollcomponenttype integer NOT NULL,
    shortcode text NOT NULL,
    description text NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.payrollcomponent OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 42765)
-- Name: payrollcomponent_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payrollcomponent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payrollcomponent_id_seq OWNER TO postgres;

--
-- TOC entry 4258 (class 0 OID 0)
-- Dependencies: 235
-- Name: payrollcomponent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payrollcomponent_id_seq OWNED BY public.payrollcomponent.id;


--
-- TOC entry 244 (class 1259 OID 50305)
-- Name: payrollcomponentconfiguration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payrollcomponentconfiguration (
    claimfrequency integer NOT NULL,
    claimlimit real NOT NULL,
    description text,
    iscustomizedandoverridenatemployeelevel boolean NOT NULL,
    isdifferenceamountadjustable boolean NOT NULL,
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
    payrollcomponenttype integer NOT NULL,
    payrollcomponentid integer,
    payrollstructureid integer,
    shortcode text NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.payrollcomponentconfiguration OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 50303)
-- Name: payrollcomponentconfiguration_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payrollcomponentconfiguration_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payrollcomponentconfiguration_id_seq OWNER TO postgres;

--
-- TOC entry 4259 (class 0 OID 0)
-- Dependencies: 243
-- Name: payrollcomponentconfiguration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payrollcomponentconfiguration_id_seq OWNED BY public.payrollcomponentconfiguration.id;


--
-- TOC entry 234 (class 1259 OID 42756)
-- Name: payrollstructure; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payrollstructure (
    name text NOT NULL,
    description text NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.payrollstructure OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 42754)
-- Name: payrollstructure_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payrollstructure_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payrollstructure_id_seq OWNER TO postgres;

--
-- TOC entry 4260 (class 0 OID 0)
-- Dependencies: 233
-- Name: payrollstructure_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payrollstructure_id_seq OWNED BY public.payrollstructure.id;


--
-- TOC entry 232 (class 1259 OID 42701)
-- Name: previousemployment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.previousemployment (
    companyname text NOT NULL,
    dateofjoining date,
    dateofrelieving date,
    employeeid integer,
    jobtitle text,
    location text,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.previousemployment OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 42699)
-- Name: previousemployment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.previousemployment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.previousemployment_id_seq OWNER TO postgres;

--
-- TOC entry 4261 (class 0 OID 0)
-- Dependencies: 231
-- Name: previousemployment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.previousemployment_id_seq OWNED BY public.previousemployment.id;


--
-- TOC entry 277 (class 1259 OID 59147)
-- Name: previousemploymentdocument; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.previousemploymentdocument (
    id integer NOT NULL,
    previousemploymentid integer NOT NULL,
    documentid integer,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.previousemploymentdocument OWNER TO postgres;

--
-- TOC entry 276 (class 1259 OID 59145)
-- Name: previousemploymentdocument_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.previousemploymentdocument_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.previousemploymentdocument_id_seq OWNER TO postgres;

--
-- TOC entry 4262 (class 0 OID 0)
-- Dependencies: 276
-- Name: previousemploymentdocument_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.previousemploymentdocument_id_seq OWNED BY public.previousemploymentdocument.id;


--
-- TOC entry 212 (class 1259 OID 42502)
-- Name: state; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.state (
    name text NOT NULL,
    countryid integer NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.state OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 42500)
-- Name: state_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.state_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.state_id_seq OWNER TO postgres;

--
-- TOC entry 4263 (class 0 OID 0)
-- Dependencies: 211
-- Name: state_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.state_id_seq OWNED BY public.state.id;


--
-- TOC entry 275 (class 1259 OID 59126)
-- Name: uniqueidentificationdetail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uniqueidentificationdetail (
    address text,
    dateofbirth date,
    employeeid integer,
    fathername text,
    isapproved boolean,
    name text NOT NULL,
    number text NOT NULL,
    id integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.uniqueidentificationdetail OWNER TO postgres;

--
-- TOC entry 274 (class 1259 OID 59124)
-- Name: uniqueidentificationdetail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.uniqueidentificationdetail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.uniqueidentificationdetail_id_seq OWNER TO postgres;

--
-- TOC entry 4264 (class 0 OID 0)
-- Dependencies: 274
-- Name: uniqueidentificationdetail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.uniqueidentificationdetail_id_seq OWNED BY public.uniqueidentificationdetail.id;


--
-- TOC entry 279 (class 1259 OID 59170)
-- Name: uniqueidentificationdocument; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uniqueidentificationdocument (
    id integer NOT NULL,
    documentid integer NOT NULL,
    uniqueidentificationdocumentid integer NOT NULL,
    createddate date,
    modifieddate date,
    createdby text,
    modifiedby text,
    isarchived boolean
);


ALTER TABLE public.uniqueidentificationdocument OWNER TO postgres;

--
-- TOC entry 278 (class 1259 OID 59168)
-- Name: uniqueidentificationdocument_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.uniqueidentificationdocument_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.uniqueidentificationdocument_id_seq OWNER TO postgres;

--
-- TOC entry 4265 (class 0 OID 0)
-- Dependencies: 278
-- Name: uniqueidentificationdocument_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.uniqueidentificationdocument_id_seq OWNED BY public.uniqueidentificationdocument.id;


--
-- TOC entry 3869 (class 2604 OID 52165)
-- Name: address id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);


--
-- TOC entry 3847 (class 2604 OID 42521)
-- Name: authentication id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication ALTER COLUMN id SET DEFAULT nextval('public.authentication_id_seq'::regclass);


--
-- TOC entry 3840 (class 2604 OID 42331)
-- Name: company id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);


--
-- TOC entry 3870 (class 2604 OID 52183)
-- Name: contact id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact ALTER COLUMN id SET DEFAULT nextval('public.contact_id_seq'::regclass);


--
-- TOC entry 3845 (class 2604 OID 42493)
-- Name: country id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country ALTER COLUMN id SET DEFAULT nextval('public.country_id_seq'::regclass);


--
-- TOC entry 3851 (class 2604 OID 42591)
-- Name: dependent id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dependent ALTER COLUMN id SET DEFAULT nextval('public.dependent_id_seq'::regclass);


--
-- TOC entry 3849 (class 2604 OID 42543)
-- Name: document id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.document ALTER COLUMN id SET DEFAULT nextval('public.document_id_seq'::regclass);


--
-- TOC entry 3852 (class 2604 OID 42607)
-- Name: drivinglicense id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drivinglicense ALTER COLUMN id SET DEFAULT nextval('public.drivinglicense_id_seq'::regclass);


--
-- TOC entry 3873 (class 2604 OID 52244)
-- Name: drivinglicensedocument id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drivinglicensedocument ALTER COLUMN id SET DEFAULT nextval('public.drivinglicensedocument_id_seq'::regclass);


--
-- TOC entry 3853 (class 2604 OID 42628)
-- Name: education id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education ALTER COLUMN id SET DEFAULT nextval('public.education_id_seq'::regclass);


--
-- TOC entry 3881 (class 2604 OID 59198)
-- Name: educationdocument id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educationdocument ALTER COLUMN id SET DEFAULT nextval('public.educationdocument_id_seq'::regclass);


--
-- TOC entry 3848 (class 2604 OID 42532)
-- Name: employee id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);


--
-- TOC entry 3865 (class 2604 OID 50404)
-- Name: employeedefaults id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employeedefaults ALTER COLUMN id SET DEFAULT nextval('public.employeedefaults_id_seq'::regclass);


--
-- TOC entry 3875 (class 2604 OID 59036)
-- Name: employeeletter id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employeeletter ALTER COLUMN id SET DEFAULT nextval('public.employeeletter_id_seq'::regclass);


--
-- TOC entry 3876 (class 2604 OID 59047)
-- Name: employeeletterdocument id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employeeletterdocument ALTER COLUMN id SET DEFAULT nextval('public.employeeletterdocument_id_seq'::regclass);


--
-- TOC entry 3864 (class 2604 OID 50362)
-- Name: employeenumberseries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employeenumberseries ALTER COLUMN id SET DEFAULT nextval('public.employeenumberseries_id_seq'::regclass);


--
-- TOC entry 3842 (class 2604 OID 42401)
-- Name: holiday id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.holiday ALTER COLUMN id SET DEFAULT nextval('public.holiday_id_seq'::regclass);


--
-- TOC entry 3841 (class 2604 OID 42390)
-- Name: holidaycategory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.holidaycategory ALTER COLUMN id SET DEFAULT nextval('public.holidaycategory_id_seq'::regclass);


--
-- TOC entry 3850 (class 2604 OID 42554)
-- Name: identitydocument id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.identitydocument ALTER COLUMN id SET DEFAULT nextval('public.identitydocument_id_seq'::regclass);


--
-- TOC entry 3867 (class 2604 OID 50512)
-- Name: jobdetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobdetails ALTER COLUMN id SET DEFAULT nextval('public.jobdetails_id_seq'::regclass);


--
-- TOC entry 3866 (class 2604 OID 50484)
-- Name: jobfilling id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobfilling ALTER COLUMN id SET DEFAULT nextval('public.jobfilling_id_seq'::regclass);


--
-- TOC entry 3863 (class 2604 OID 50331)
-- Name: jobtitle id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobtitle ALTER COLUMN id SET DEFAULT nextval('public.jobtitle_id_seq'::regclass);


--
-- TOC entry 3868 (class 2604 OID 52014)
-- Name: leave id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leave ALTER COLUMN id SET DEFAULT nextval('public.leave_id_seq'::regclass);


--
-- TOC entry 3843 (class 2604 OID 42417)
-- Name: leavecomponent id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavecomponent ALTER COLUMN id SET DEFAULT nextval('public.leavecomponent_id_seq'::regclass);


--
-- TOC entry 3844 (class 2604 OID 42428)
-- Name: leavestructure id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavestructure ALTER COLUMN id SET DEFAULT nextval('public.leavestructure_id_seq'::regclass);


--
-- TOC entry 3872 (class 2604 OID 52212)
-- Name: loanrequest id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loanrequest ALTER COLUMN id SET DEFAULT nextval('public.loanrequest_id_seq'::regclass);


--
-- TOC entry 3871 (class 2604 OID 52201)
-- Name: loansetting id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loansetting ALTER COLUMN id SET DEFAULT nextval('public.loansetting_id_seq'::regclass);


--
-- TOC entry 3854 (class 2604 OID 42662)
-- Name: pan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pan ALTER COLUMN id SET DEFAULT nextval('public.pan_id_seq'::regclass);


--
-- TOC entry 3855 (class 2604 OID 42683)
-- Name: passport id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passport ALTER COLUMN id SET DEFAULT nextval('public.passport_id_seq'::regclass);


--
-- TOC entry 3877 (class 2604 OID 59070)
-- Name: passportdocument id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passportdocument ALTER COLUMN id SET DEFAULT nextval('public.passportdocument_id_seq'::regclass);


--
-- TOC entry 3858 (class 2604 OID 42770)
-- Name: payrollcomponent id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payrollcomponent ALTER COLUMN id SET DEFAULT nextval('public.payrollcomponent_id_seq'::regclass);


--
-- TOC entry 3862 (class 2604 OID 50308)
-- Name: payrollcomponentconfiguration id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payrollcomponentconfiguration ALTER COLUMN id SET DEFAULT nextval('public.payrollcomponentconfiguration_id_seq'::regclass);


--
-- TOC entry 3857 (class 2604 OID 42759)
-- Name: payrollstructure id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payrollstructure ALTER COLUMN id SET DEFAULT nextval('public.payrollstructure_id_seq'::regclass);


--
-- TOC entry 3856 (class 2604 OID 42704)
-- Name: previousemployment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.previousemployment ALTER COLUMN id SET DEFAULT nextval('public.previousemployment_id_seq'::regclass);


--
-- TOC entry 3879 (class 2604 OID 59150)
-- Name: previousemploymentdocument id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.previousemploymentdocument ALTER COLUMN id SET DEFAULT nextval('public.previousemploymentdocument_id_seq'::regclass);


--
-- TOC entry 3846 (class 2604 OID 42505)
-- Name: state id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state ALTER COLUMN id SET DEFAULT nextval('public.state_id_seq'::regclass);


--
-- TOC entry 3878 (class 2604 OID 59129)
-- Name: uniqueidentificationdetail id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uniqueidentificationdetail ALTER COLUMN id SET DEFAULT nextval('public.uniqueidentificationdetail_id_seq'::regclass);


--
-- TOC entry 3880 (class 2604 OID 59173)
-- Name: uniqueidentificationdocument id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uniqueidentificationdocument ALTER COLUMN id SET DEFAULT nextval('public.uniqueidentificationdocument_id_seq'::regclass);


--
-- TOC entry 4003 (class 2606 OID 52170)
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);


--
-- TOC entry 4005 (class 2606 OID 52172)
-- Name: address address_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_ukey UNIQUE (employeeid, currentaddressline1);


--
-- TOC entry 3919 (class 2606 OID 50106)
-- Name: authentication authentication_email_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication
    ADD CONSTRAINT authentication_email_ukey UNIQUE (email);


--
-- TOC entry 3921 (class 2606 OID 42526)
-- Name: authentication authentication_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication
    ADD CONSTRAINT authentication_pkey PRIMARY KEY (id);


--
-- TOC entry 3967 (class 2606 OID 42811)
-- Name: branch branch_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branch
    ADD CONSTRAINT branch_pkey PRIMARY KEY (id);


--
-- TOC entry 3969 (class 2606 OID 50127)
-- Name: branch branch_shortname_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branch
    ADD CONSTRAINT branch_shortname_ukey UNIQUE (shortname);


--
-- TOC entry 3973 (class 2606 OID 50129)
-- Name: branchbankaccount branchbankaccount_accountnumber_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branchbankaccount
    ADD CONSTRAINT branchbankaccount_accountnumber_ukey UNIQUE (accountnumber);


--
-- TOC entry 3975 (class 2606 OID 42843)
-- Name: branchbankaccount branchbankaccount_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branchbankaccount
    ADD CONSTRAINT branchbankaccount_pkey PRIMARY KEY (id);


--
-- TOC entry 3971 (class 2606 OID 42827)
-- Name: branchsignatory branchsignatory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branchsignatory
    ADD CONSTRAINT branchsignatory_pkey PRIMARY KEY (id);


--
-- TOC entry 3883 (class 2606 OID 42336)
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- TOC entry 3885 (class 2606 OID 50136)
-- Name: company company_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_ukey UNIQUE (shortname, legalname);


--
-- TOC entry 4007 (class 2606 OID 52188)
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);


--
-- TOC entry 4009 (class 2606 OID 52190)
-- Name: contact contact_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_ukey UNIQUE (employeeid, mobile);


--
-- TOC entry 3911 (class 2606 OID 42498)
-- Name: country country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (id);


--
-- TOC entry 3913 (class 2606 OID 50145)
-- Name: country country_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_ukey UNIQUE (name);


--
-- TOC entry 3933 (class 2606 OID 42596)
-- Name: dependent dependent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dependent
    ADD CONSTRAINT dependent_pkey PRIMARY KEY (id);


--
-- TOC entry 3935 (class 2606 OID 50284)
-- Name: dependent dependent_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dependent
    ADD CONSTRAINT dependent_ukey UNIQUE (name, employeeid);


--
-- TOC entry 3927 (class 2606 OID 42548)
-- Name: document document_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.document
    ADD CONSTRAINT document_pkey PRIMARY KEY (id);


--
-- TOC entry 3929 (class 2606 OID 50286)
-- Name: document document_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.document
    ADD CONSTRAINT document_ukey UNIQUE (name, extention);


--
-- TOC entry 3937 (class 2606 OID 42612)
-- Name: drivinglicense drivinglicense_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drivinglicense
    ADD CONSTRAINT drivinglicense_pkey PRIMARY KEY (id);


--
-- TOC entry 3939 (class 2606 OID 50169)
-- Name: drivinglicense drivinglicense_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drivinglicense
    ADD CONSTRAINT drivinglicense_ukey UNIQUE (name);


--
-- TOC entry 4015 (class 2606 OID 59090)
-- Name: drivinglicensedocument drivinglicensedocument_comboid_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drivinglicensedocument
    ADD CONSTRAINT drivinglicensedocument_comboid_ukey UNIQUE (documentid, drivinglicenseid);


--
-- TOC entry 4017 (class 2606 OID 52249)
-- Name: drivinglicensedocument drivinglicensedocument_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drivinglicensedocument
    ADD CONSTRAINT drivinglicensedocument_pkey PRIMARY KEY (id);


--
-- TOC entry 3941 (class 2606 OID 42633)
-- Name: education education_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education
    ADD CONSTRAINT education_pkey PRIMARY KEY (id);


--
-- TOC entry 3943 (class 2606 OID 50288)
-- Name: education education_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education
    ADD CONSTRAINT education_ukey UNIQUE (employeeid, degree, yearofcompletion);


--
-- TOC entry 4043 (class 2606 OID 59203)
-- Name: educationdocument educationdocument_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educationdocument
    ADD CONSTRAINT educationdocument_pkey PRIMARY KEY (id);


--
-- TOC entry 4045 (class 2606 OID 59205)
-- Name: educationdocument educationdocument_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educationdocument
    ADD CONSTRAINT educationdocument_ukey UNIQUE (documentid, educationid);


--
-- TOC entry 3923 (class 2606 OID 42537)
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (id);


--
-- TOC entry 3925 (class 2606 OID 50206)
-- Name: employee employee_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_ukey UNIQUE (email);


--
-- TOC entry 3989 (class 2606 OID 50409)
-- Name: employeedefaults employeedefaults_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employeedefaults
    ADD CONSTRAINT employeedefaults_pkey PRIMARY KEY (id);


--
-- TOC entry 3991 (class 2606 OID 50411)
-- Name: employeedefaults employeedefaults_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employeedefaults
    ADD CONSTRAINT employeedefaults_ukey UNIQUE (probationduration, periodtype, workertype, timetype);


--
-- TOC entry 4023 (class 2606 OID 59041)
-- Name: employeeletter employeeletter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employeeletter
    ADD CONSTRAINT employeeletter_pkey PRIMARY KEY (id);


--
-- TOC entry 4025 (class 2606 OID 59052)
-- Name: employeeletterdocument employeeletterdocument_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employeeletterdocument
    ADD CONSTRAINT employeeletterdocument_pkey PRIMARY KEY (documentid, employeeletterid);


--
-- TOC entry 3985 (class 2606 OID 50367)
-- Name: employeenumberseries employeenumberseries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employeenumberseries
    ADD CONSTRAINT employeenumberseries_pkey PRIMARY KEY (id);


--
-- TOC entry 3987 (class 2606 OID 50369)
-- Name: employeenumberseries employeenumberseries_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employeenumberseries
    ADD CONSTRAINT employeenumberseries_ukey UNIQUE (name);


--
-- TOC entry 3891 (class 2606 OID 42406)
-- Name: holiday holiday_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.holiday
    ADD CONSTRAINT holiday_pkey PRIMARY KEY (id);


--
-- TOC entry 3893 (class 2606 OID 50692)
-- Name: holiday holiday_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.holiday
    ADD CONSTRAINT holiday_ukey UNIQUE (name);


--
-- TOC entry 3887 (class 2606 OID 42395)
-- Name: holidaycategory holidaycategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.holidaycategory
    ADD CONSTRAINT holidaycategory_pkey PRIMARY KEY (id);


--
-- TOC entry 3889 (class 2606 OID 50292)
-- Name: holidaycategory holidaycategory_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.holidaycategory
    ADD CONSTRAINT holidaycategory_ukey UNIQUE (name);


--
-- TOC entry 3931 (class 2606 OID 42559)
-- Name: identitydocument identitydocument_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.identitydocument
    ADD CONSTRAINT identitydocument_pkey PRIMARY KEY (id);


--
-- TOC entry 3997 (class 2606 OID 50517)
-- Name: jobdetails jobdetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobdetails
    ADD CONSTRAINT jobdetails_pkey PRIMARY KEY (id);


--
-- TOC entry 3999 (class 2606 OID 50519)
-- Name: jobdetails jobdetails_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobdetails
    ADD CONSTRAINT jobdetails_ukey UNIQUE (employeeid, numberseriesid, jobtitleid);


--
-- TOC entry 3993 (class 2606 OID 50489)
-- Name: jobfilling jobfilling_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobfilling
    ADD CONSTRAINT jobfilling_pkey PRIMARY KEY (id);


--
-- TOC entry 3995 (class 2606 OID 50491)
-- Name: jobfilling jobfilling_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobfilling
    ADD CONSTRAINT jobfilling_ukey UNIQUE (employeeid, holidaycategoryid, leavestructureid);


--
-- TOC entry 3981 (class 2606 OID 50338)
-- Name: jobtitle jobtiltle_name_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobtitle
    ADD CONSTRAINT jobtiltle_name_ukey UNIQUE (name);


--
-- TOC entry 3983 (class 2606 OID 50336)
-- Name: jobtitle jobtiltle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobtitle
    ADD CONSTRAINT jobtiltle_pkey PRIMARY KEY (id);


--
-- TOC entry 4001 (class 2606 OID 52019)
-- Name: leave leave_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leave
    ADD CONSTRAINT leave_pkey PRIMARY KEY (id);


--
-- TOC entry 3895 (class 2606 OID 50592)
-- Name: leavecomponent leavecomponent_code_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavecomponent
    ADD CONSTRAINT leavecomponent_code_ukey UNIQUE (code);


--
-- TOC entry 3897 (class 2606 OID 42422)
-- Name: leavecomponent leavecomponent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavecomponent
    ADD CONSTRAINT leavecomponent_pkey PRIMARY KEY (id);


--
-- TOC entry 3899 (class 2606 OID 50413)
-- Name: leavecomponent leavecomponent_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavecomponent
    ADD CONSTRAINT leavecomponent_ukey UNIQUE (name);


--
-- TOC entry 3907 (class 2606 OID 42459)
-- Name: leavecomponentgeneralsettings leavecomponentgeneralsettings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavecomponentgeneralsettings
    ADD CONSTRAINT leavecomponentgeneralsettings_pkey PRIMARY KEY (leavecomponentid, leavestructureid);


--
-- TOC entry 3909 (class 2606 OID 42477)
-- Name: leavecomponentrestrictionsettings leavecomponentrestrictionsettings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavecomponentrestrictionsettings
    ADD CONSTRAINT leavecomponentrestrictionsettings_pkey PRIMARY KEY (leavecomponentid, leavestructureid);


--
-- TOC entry 3901 (class 2606 OID 42433)
-- Name: leavestructure leavestructure_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavestructure
    ADD CONSTRAINT leavestructure_pkey PRIMARY KEY (id);


--
-- TOC entry 3903 (class 2606 OID 50584)
-- Name: leavestructure leavestructure_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavestructure
    ADD CONSTRAINT leavestructure_ukey UNIQUE (name);


--
-- TOC entry 3905 (class 2606 OID 42441)
-- Name: leavestructureleavecomponent leavestructureleavecomponent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavestructureleavecomponent
    ADD CONSTRAINT leavestructureleavecomponent_pkey PRIMARY KEY (leavecomponentid, leavestructureid);


--
-- TOC entry 4013 (class 2606 OID 52217)
-- Name: loanrequest loanrequest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loanrequest
    ADD CONSTRAINT loanrequest_pkey PRIMARY KEY (id);


--
-- TOC entry 4011 (class 2606 OID 52206)
-- Name: loansetting loansetting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loansetting
    ADD CONSTRAINT loansetting_pkey PRIMARY KEY (id);


--
-- TOC entry 3945 (class 2606 OID 42667)
-- Name: pan pan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pan
    ADD CONSTRAINT pan_pkey PRIMARY KEY (id);


--
-- TOC entry 3947 (class 2606 OID 50456)
-- Name: pan pan_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pan
    ADD CONSTRAINT pan_ukey UNIQUE (name, number, employeeid);


--
-- TOC entry 4019 (class 2606 OID 59092)
-- Name: pandocument pandocument_comboid_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pandocument
    ADD CONSTRAINT pandocument_comboid_ukey UNIQUE (documentid, panid);


--
-- TOC entry 4021 (class 2606 OID 58892)
-- Name: pandocument pandocument_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pandocument
    ADD CONSTRAINT pandocument_pkey PRIMARY KEY (id);


--
-- TOC entry 3949 (class 2606 OID 42688)
-- Name: passport passport_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passport
    ADD CONSTRAINT passport_pkey PRIMARY KEY (id);


--
-- TOC entry 3951 (class 2606 OID 50478)
-- Name: passport passport_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passport
    ADD CONSTRAINT passport_ukey UNIQUE (name, number, employeeid);


--
-- TOC entry 4027 (class 2606 OID 59077)
-- Name: passportdocument passportdocument_comboid_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passportdocument
    ADD CONSTRAINT passportdocument_comboid_ukey UNIQUE (documentid, passportid);


--
-- TOC entry 4029 (class 2606 OID 59075)
-- Name: passportdocument passportdocument_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passportdocument
    ADD CONSTRAINT passportdocument_pkey PRIMARY KEY (id);


--
-- TOC entry 3961 (class 2606 OID 50208)
-- Name: payrollcomponent payrollcomponent_name_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payrollcomponent
    ADD CONSTRAINT payrollcomponent_name_ukey UNIQUE (name);


--
-- TOC entry 3963 (class 2606 OID 42775)
-- Name: payrollcomponent payrollcomponent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payrollcomponent
    ADD CONSTRAINT payrollcomponent_pkey PRIMARY KEY (id);


--
-- TOC entry 3965 (class 2606 OID 50210)
-- Name: payrollcomponent payrollcomponent_shortcode_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payrollcomponent
    ADD CONSTRAINT payrollcomponent_shortcode_ukey UNIQUE (shortcode);


--
-- TOC entry 3977 (class 2606 OID 50313)
-- Name: payrollcomponentconfiguration payrollcomponentconfiguration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payrollcomponentconfiguration
    ADD CONSTRAINT payrollcomponentconfiguration_pkey PRIMARY KEY (id);


--
-- TOC entry 3979 (class 2606 OID 50315)
-- Name: payrollcomponentconfiguration payrollcomponentconfiguration_ukey_payrollcomponentid_payrollst; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payrollcomponentconfiguration
    ADD CONSTRAINT payrollcomponentconfiguration_ukey_payrollcomponentid_payrollst UNIQUE (payrollcomponentid, payrollstructureid);


--
-- TOC entry 3957 (class 2606 OID 50212)
-- Name: payrollstructure payrollstructure_name_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payrollstructure
    ADD CONSTRAINT payrollstructure_name_ukey UNIQUE (name);


--
-- TOC entry 3959 (class 2606 OID 42764)
-- Name: payrollstructure payrollstructure_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payrollstructure
    ADD CONSTRAINT payrollstructure_pkey PRIMARY KEY (id);


--
-- TOC entry 3953 (class 2606 OID 42709)
-- Name: previousemployment previousemployment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.previousemployment
    ADD CONSTRAINT previousemployment_pkey PRIMARY KEY (id);


--
-- TOC entry 3955 (class 2606 OID 50234)
-- Name: previousemployment previousemployment_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.previousemployment
    ADD CONSTRAINT previousemployment_ukey UNIQUE (employeeid, companyname);


--
-- TOC entry 4035 (class 2606 OID 59157)
-- Name: previousemploymentdocument previousemploymentdocument_comboid_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.previousemploymentdocument
    ADD CONSTRAINT previousemploymentdocument_comboid_ukey UNIQUE (documentid, previousemploymentid);


--
-- TOC entry 4037 (class 2606 OID 59155)
-- Name: previousemploymentdocument previousemploymentdocument_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.previousemploymentdocument
    ADD CONSTRAINT previousemploymentdocument_pkey PRIMARY KEY (id);


--
-- TOC entry 3915 (class 2606 OID 42510)
-- Name: state state_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state
    ADD CONSTRAINT state_pkey PRIMARY KEY (id);


--
-- TOC entry 3917 (class 2606 OID 50120)
-- Name: state state_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state
    ADD CONSTRAINT state_ukey UNIQUE (name);


--
-- TOC entry 4031 (class 2606 OID 59136)
-- Name: uniqueidentificationdetail uniqueidentificationdetail_number_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uniqueidentificationdetail
    ADD CONSTRAINT uniqueidentificationdetail_number_ukey UNIQUE (number);


--
-- TOC entry 4033 (class 2606 OID 59134)
-- Name: uniqueidentificationdetail uniqueidentificationdetail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uniqueidentificationdetail
    ADD CONSTRAINT uniqueidentificationdetail_pkey PRIMARY KEY (id);


--
-- TOC entry 4039 (class 2606 OID 59178)
-- Name: uniqueidentificationdocument uniqueidentificationdocument_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uniqueidentificationdocument
    ADD CONSTRAINT uniqueidentificationdocument_pkey PRIMARY KEY (id);


--
-- TOC entry 4041 (class 2606 OID 59180)
-- Name: uniqueidentificationdocument uniqueidentificationdocument_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uniqueidentificationdocument
    ADD CONSTRAINT uniqueidentificationdocument_ukey UNIQUE (documentid, uniqueidentificationdocumentid);


--
-- TOC entry 4078 (class 2606 OID 58134)
-- Name: address address_country_current_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_country_current_fkey FOREIGN KEY (currentcountry) REFERENCES public.country(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4080 (class 2606 OID 58144)
-- Name: address address_country_permanent_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_country_permanent_fkey FOREIGN KEY (permanentcountry) REFERENCES public.country(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4077 (class 2606 OID 52173)
-- Name: address address_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4079 (class 2606 OID 58139)
-- Name: address address_state_current_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_state_current_fkey FOREIGN KEY (currentstate) REFERENCES public.state(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4081 (class 2606 OID 58149)
-- Name: address address_state_permanent_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_state_permanent_fkey FOREIGN KEY (permanentstate) REFERENCES public.state(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4054 (class 2606 OID 50693)
-- Name: authentication authentication_employee_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication
    ADD CONSTRAINT authentication_employee_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4063 (class 2606 OID 50109)
-- Name: branch branch_companyid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branch
    ADD CONSTRAINT branch_companyid_fkey FOREIGN KEY (companyid) REFERENCES public.company(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4065 (class 2606 OID 50121)
-- Name: branchbankaccount branchbankaccount_branchid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branchbankaccount
    ADD CONSTRAINT branchbankaccount_branchid_fkey FOREIGN KEY (branchid) REFERENCES public.branch(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4064 (class 2606 OID 50130)
-- Name: branchsignatory branchsignatory_branchid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branchsignatory
    ADD CONSTRAINT branchsignatory_branchid_fkey FOREIGN KEY (branchid) REFERENCES public.branch(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4082 (class 2606 OID 52191)
-- Name: contact contact_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4057 (class 2606 OID 50148)
-- Name: dependent dependent_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dependent
    ADD CONSTRAINT dependent_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4058 (class 2606 OID 50163)
-- Name: drivinglicense drivinglicense_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drivinglicense
    ADD CONSTRAINT drivinglicense_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4084 (class 2606 OID 52250)
-- Name: drivinglicensedocument drivinglicensedocument_documentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drivinglicensedocument
    ADD CONSTRAINT drivinglicensedocument_documentid_fkey FOREIGN KEY (documentid) REFERENCES public.document(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4085 (class 2606 OID 52255)
-- Name: drivinglicensedocument drivinglicensedocument_drivinglicenseid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drivinglicensedocument
    ADD CONSTRAINT drivinglicensedocument_drivinglicenseid_fkey FOREIGN KEY (drivinglicenseid) REFERENCES public.drivinglicense(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4059 (class 2606 OID 50170)
-- Name: education education_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education
    ADD CONSTRAINT education_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4097 (class 2606 OID 59206)
-- Name: educationdocument educationdocument_documentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educationdocument
    ADD CONSTRAINT educationdocument_documentid_fkey FOREIGN KEY (documentid) REFERENCES public.document(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4098 (class 2606 OID 59211)
-- Name: educationdocument educationdocument_educationid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educationdocument
    ADD CONSTRAINT educationdocument_educationid_fkey FOREIGN KEY (educationid) REFERENCES public.education(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4088 (class 2606 OID 59053)
-- Name: employeeletterdocument employeeletterdocument_documentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employeeletterdocument
    ADD CONSTRAINT employeeletterdocument_documentid_fkey FOREIGN KEY (documentid) REFERENCES public.document(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4089 (class 2606 OID 59058)
-- Name: employeeletterdocument employeeletterdocument_employeeletterid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employeeletterdocument
    ADD CONSTRAINT employeeletterdocument_employeeletterid_fkey FOREIGN KEY (employeeletterid) REFERENCES public.employeeletter(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4046 (class 2606 OID 52025)
-- Name: holiday holiday_holidaycategoryid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.holiday
    ADD CONSTRAINT holiday_holidaycategoryid_fkey FOREIGN KEY (holidaycategoryid) REFERENCES public.holidaycategory(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4055 (class 2606 OID 50293)
-- Name: identitydocument identitydocument_documentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.identitydocument
    ADD CONSTRAINT identitydocument_documentid_fkey FOREIGN KEY (documentid) REFERENCES public.document(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4056 (class 2606 OID 50298)
-- Name: identitydocument identitydocument_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.identitydocument
    ADD CONSTRAINT identitydocument_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4073 (class 2606 OID 50520)
-- Name: jobdetails jobdetails_employee_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobdetails
    ADD CONSTRAINT jobdetails_employee_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4074 (class 2606 OID 50525)
-- Name: jobdetails jobdetails_employeenumberseries_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobdetails
    ADD CONSTRAINT jobdetails_employeenumberseries_fkey FOREIGN KEY (numberseriesid) REFERENCES public.employeenumberseries(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4075 (class 2606 OID 50530)
-- Name: jobdetails jobdetails_jobtitle_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobdetails
    ADD CONSTRAINT jobdetails_jobtitle_fkey FOREIGN KEY (jobtitleid) REFERENCES public.jobtitle(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4070 (class 2606 OID 50492)
-- Name: jobfilling jobfilling_employee_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobfilling
    ADD CONSTRAINT jobfilling_employee_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4071 (class 2606 OID 50497)
-- Name: jobfilling jobfilling_holidaycategory_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobfilling
    ADD CONSTRAINT jobfilling_holidaycategory_fkey FOREIGN KEY (holidaycategoryid) REFERENCES public.holidaycategory(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4072 (class 2606 OID 50502)
-- Name: jobfilling jobfilling_leavestructure_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobfilling
    ADD CONSTRAINT jobfilling_leavestructure_fkey FOREIGN KEY (leavestructureid) REFERENCES public.leavestructure(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4076 (class 2606 OID 52020)
-- Name: leave leave_leavecomponentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leave
    ADD CONSTRAINT leave_leavecomponentid_fkey FOREIGN KEY (leavecomponentid) REFERENCES public.leavecomponent(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4049 (class 2606 OID 50414)
-- Name: leavecomponentgeneralsettings leavecomponentgeneralsettings_leavecomponentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavecomponentgeneralsettings
    ADD CONSTRAINT leavecomponentgeneralsettings_leavecomponentid_fkey FOREIGN KEY (leavecomponentid) REFERENCES public.leavecomponent(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4050 (class 2606 OID 50421)
-- Name: leavecomponentgeneralsettings leavecomponentgeneralsettings_leavestructureid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavecomponentgeneralsettings
    ADD CONSTRAINT leavecomponentgeneralsettings_leavestructureid_fkey FOREIGN KEY (leavestructureid) REFERENCES public.leavestructure(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4051 (class 2606 OID 50609)
-- Name: leavecomponentrestrictionsettings leavecomponentrestrictionsettings_leavecomponentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavecomponentrestrictionsettings
    ADD CONSTRAINT leavecomponentrestrictionsettings_leavecomponentid_fkey FOREIGN KEY (leavecomponentid) REFERENCES public.leavecomponent(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4052 (class 2606 OID 50614)
-- Name: leavecomponentrestrictionsettings leavecomponentrestrictionsettings_leavestructureid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavecomponentrestrictionsettings
    ADD CONSTRAINT leavecomponentrestrictionsettings_leavestructureid_fkey FOREIGN KEY (leavestructureid) REFERENCES public.leavestructure(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4047 (class 2606 OID 50440)
-- Name: leavestructureleavecomponent leavestructureleavecomponent_leavecomponentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavestructureleavecomponent
    ADD CONSTRAINT leavestructureleavecomponent_leavecomponentid_fkey FOREIGN KEY (leavecomponentid) REFERENCES public.leavecomponent(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4048 (class 2606 OID 50445)
-- Name: leavestructureleavecomponent leavestructureleavecomponent_leavestructureid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leavestructureleavecomponent
    ADD CONSTRAINT leavestructureleavecomponent_leavestructureid_fkey FOREIGN KEY (leavestructureid) REFERENCES public.leavestructure(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4083 (class 2606 OID 52218)
-- Name: loanrequest loanrequest_employee_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loanrequest
    ADD CONSTRAINT loanrequest_employee_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4060 (class 2606 OID 50462)
-- Name: pan pan_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pan
    ADD CONSTRAINT pan_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4086 (class 2606 OID 58893)
-- Name: pandocument pandocument_documentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pandocument
    ADD CONSTRAINT pandocument_documentid_fkey FOREIGN KEY (documentid) REFERENCES public.document(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4087 (class 2606 OID 58898)
-- Name: pandocument pandocument_drivinglicenseid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pandocument
    ADD CONSTRAINT pandocument_drivinglicenseid_fkey FOREIGN KEY (panid) REFERENCES public.pan(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4061 (class 2606 OID 50467)
-- Name: passport passport_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passport
    ADD CONSTRAINT passport_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4090 (class 2606 OID 59078)
-- Name: passportdocument passportdocument_documentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passportdocument
    ADD CONSTRAINT passportdocument_documentid_fkey FOREIGN KEY (documentid) REFERENCES public.document(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4091 (class 2606 OID 59083)
-- Name: passportdocument passportdocument_passportid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passportdocument
    ADD CONSTRAINT passportdocument_passportid_fkey FOREIGN KEY (passportid) REFERENCES public.passport(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4066 (class 2606 OID 52040)
-- Name: payrollcomponentconfiguration payrollcomponentconfiguration_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payrollcomponentconfiguration
    ADD CONSTRAINT payrollcomponentconfiguration_name_fkey FOREIGN KEY (name) REFERENCES public.payrollcomponent(name) ON UPDATE CASCADE;


--
-- TOC entry 4068 (class 2606 OID 50316)
-- Name: payrollcomponentconfiguration payrollcomponentconfiguration_payrollcomponentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payrollcomponentconfiguration
    ADD CONSTRAINT payrollcomponentconfiguration_payrollcomponentid_fkey FOREIGN KEY (payrollcomponentid) REFERENCES public.payrollcomponent(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4069 (class 2606 OID 50321)
-- Name: payrollcomponentconfiguration payrollcomponentconfiguration_payrollstructureid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payrollcomponentconfiguration
    ADD CONSTRAINT payrollcomponentconfiguration_payrollstructureid_fkey FOREIGN KEY (payrollstructureid) REFERENCES public.payrollstructure(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4067 (class 2606 OID 52045)
-- Name: payrollcomponentconfiguration payrollcomponentconfiguration_shortcode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payrollcomponentconfiguration
    ADD CONSTRAINT payrollcomponentconfiguration_shortcode_fkey FOREIGN KEY (shortcode) REFERENCES public.payrollcomponent(shortcode) ON UPDATE CASCADE;


--
-- TOC entry 4062 (class 2606 OID 50235)
-- Name: previousemployment previousemployment_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.previousemployment
    ADD CONSTRAINT previousemployment_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4093 (class 2606 OID 59158)
-- Name: previousemploymentdocument previousemploymentdocument_documentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.previousemploymentdocument
    ADD CONSTRAINT previousemploymentdocument_documentid_fkey FOREIGN KEY (documentid) REFERENCES public.document(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4094 (class 2606 OID 59163)
-- Name: previousemploymentdocument previousemploymentdocument_previousemploymentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.previousemploymentdocument
    ADD CONSTRAINT previousemploymentdocument_previousemploymentid_fkey FOREIGN KEY (previousemploymentid) REFERENCES public.previousemployment(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4053 (class 2606 OID 50114)
-- Name: state state_countryid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state
    ADD CONSTRAINT state_countryid_fkey FOREIGN KEY (countryid) REFERENCES public.country(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4092 (class 2606 OID 59137)
-- Name: uniqueidentificationdetail uniqueidentificationdetail_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uniqueidentificationdetail
    ADD CONSTRAINT uniqueidentificationdetail_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4095 (class 2606 OID 59181)
-- Name: uniqueidentificationdocument uniqueidentificationdocument_documentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uniqueidentificationdocument
    ADD CONSTRAINT uniqueidentificationdocument_documentid_fkey FOREIGN KEY (documentid) REFERENCES public.document(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4096 (class 2606 OID 59186)
-- Name: uniqueidentificationdocument uniqueidentificationdocument_uniqueidentificationdocumentid_fke; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uniqueidentificationdocument
    ADD CONSTRAINT uniqueidentificationdocument_uniqueidentificationdocumentid_fke FOREIGN KEY (uniqueidentificationdocumentid) REFERENCES public.uniqueidentificationdetail(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2020-04-21 13:20:40

--
-- PostgreSQL database dump complete
--


--
-- PostgreSQL database dump
--

-- Dumped from database version 11.1
-- Dumped by pg_dump version 11.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: topology; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA topology;


--
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: job; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job (
    id integer NOT NULL,
    public_id character varying(100) NOT NULL,
    title character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    published_at timestamp with time zone NOT NULL,
    company_id integer NOT NULL,
    location_required character varying(100),
    location_preferred character varying(100),
    location_preferred_timezone smallint,
    location_preferred_timezone_tolerance smallint,
    company_name character varying(100) NOT NULL,
    company_display_name character varying(100) NOT NULL,
    salary_exact integer,
    salary_min integer,
    salary_max integer,
    salary_equity boolean,
    description text NOT NULL,
    description_html text NOT NULL,
    tags character varying(200) NOT NULL,
    location_raw character varying(200),
    salary_raw character varying(200),
    salary_currency character varying(10)
);


--
-- Name: __remoted_get_jobs(integer, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.__remoted_get_jobs(_limit integer, _offset integer) RETURNS SETOF public.job
    LANGUAGE sql
    AS $$
select *
from job u
order by published_at desc
limit _limit offset _offset

$$;


--
-- Name: company; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.company (
    id integer NOT NULL,
    public_id character varying(100) NOT NULL,
    name character varying(50) NOT NULL,
    display_name character varying(50) NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.company.id;


--
-- Name: url_reference; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.url_reference (
    id integer NOT NULL,
    company_public_id character varying(100),
    job_public_id character varying(100),
    url character varying(200) NOT NULL
);


--
-- Name: company_url_reference_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.company_url_reference_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: company_url_reference_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.company_url_reference_id_seq OWNED BY public.url_reference.id;


--
-- Name: google_places_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.google_places_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: google_places_textsearch_cache_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.google_places_textsearch_cache_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: job_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_tags (
    id integer NOT NULL,
    job_id integer,
    tag_id integer
);


--
-- Name: job_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.job_tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: job_tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.job_tags_id_seq OWNED BY public.job_tags.id;


--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.job.id;


--
-- Name: stackoverflow_tags_cache_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stackoverflow_tags_cache_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tag (
    id integer DEFAULT nextval('public.tag_id_seq'::regclass) NOT NULL,
    name character varying(50) NOT NULL,
    relevance integer NOT NULL
);


--
-- Name: company id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: job id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: job_tags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_tags ALTER COLUMN id SET DEFAULT nextval('public.job_tags_id_seq'::regclass);


--
-- Name: url_reference id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url_reference ALTER COLUMN id SET DEFAULT nextval('public.company_url_reference_id_seq'::regclass);


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.company (id, public_id, name, display_name, created_at) FROM stdin;
1	s76f1-github	github	Github	2019-02-22 08:18:22.092217+01
4	07mff-auth0	auth0	Auth0	2019-02-22 08:18:22.092546+01
3	z2lgb-elastic	elastic	Elastic	2019-02-22 08:18:22.092412+01
2	w38jd-zapper	zapper	Zapper	2019-02-22 08:18:22.092298+01
\.


--
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job (id, public_id, title, created_at, published_at, company_id, location_required, location_preferred, location_preferred_timezone, location_preferred_timezone_tolerance, company_name, company_display_name, salary_exact, salary_min, salary_max, salary_equity, description, description_html, tags, location_raw, salary_raw, salary_currency) FROM stdin;
1	2fma0-remote-software-developer-github	Software developer	2019-02-22 08:18:22.138643+01	2019-02-22 08:18:22.107+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
2	c3xjn-remote-software-developer-github	Software developer	2019-02-22 08:18:22.146483+01	2019-02-22 08:18:22.144+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
3	yqqab-remote-software-developer-github	Software developer	2019-02-22 08:18:22.149715+01	2019-02-22 08:18:22.147+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
4	ksryn-remote-software-developer-github	Software developer	2019-02-22 08:18:22.152835+01	2019-02-22 08:18:22.15+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
5	pdbm7-remote-software-developer-github	Software developer	2019-02-22 08:18:22.156024+01	2019-02-22 08:18:22.154+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
6	4q0xs-remote-software-developer-github	Software developer	2019-02-22 08:18:22.158762+01	2019-02-22 08:18:22.156+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
7	c0203-remote-software-developer-github	Software developer	2019-02-22 08:18:22.163092+01	2019-02-22 08:18:22.16+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
8	120q5-remote-software-developer-github	Software developer	2019-02-22 08:18:22.166307+01	2019-02-22 08:18:22.164+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
9	bztqx-remote-software-developer-github	Software developer	2019-02-22 08:18:22.168786+01	2019-02-22 08:18:22.167+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
10	zgwy4-remote-software-developer-github	Software developer	2019-02-22 08:18:22.171376+01	2019-02-22 08:18:22.169+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
11	ozivf-remote-software-developer-github	Software developer	2019-02-22 08:18:22.174835+01	2019-02-22 08:18:22.172+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
12	y8d9g-remote-software-developer-github	Software developer	2019-02-22 08:18:22.178624+01	2019-02-22 08:18:22.175+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
13	1ptiw-remote-software-developer-github	Software developer	2019-02-22 08:18:22.182277+01	2019-02-22 08:18:22.179+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
14	4szov-remote-software-developer-github	Software developer	2019-02-22 08:18:22.18734+01	2019-02-22 08:18:22.185+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
15	eul8k-remote-software-developer-github	Software developer	2019-02-22 08:18:22.189381+01	2019-02-22 08:18:22.187+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
16	acpwt-remote-software-developer-github	Software developer	2019-02-22 08:18:22.191908+01	2019-02-22 08:18:22.189+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
17	gxzno-remote-software-developer-github	Software developer	2019-02-22 08:18:22.19415+01	2019-02-22 08:18:22.192+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
18	a9dv9-remote-software-developer-github	Software developer	2019-02-22 08:18:22.196138+01	2019-02-22 08:18:22.194+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
19	26ohv-remote-software-developer-github	Software developer	2019-02-22 08:18:22.198156+01	2019-02-22 08:18:22.196+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
20	3moqz-remote-software-developer-github	Software developer	2019-02-22 08:18:22.200685+01	2019-02-22 08:18:22.199+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
21	7rm4y-remote-software-developer-github	Software developer	2019-02-22 08:18:22.202727+01	2019-02-22 08:18:22.201+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
22	9gq1o-remote-software-developer-github	Software developer	2019-02-22 08:18:22.205294+01	2019-02-22 08:18:22.203+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
23	9tlbm-remote-software-developer-github	Software developer	2019-02-22 08:18:22.207366+01	2019-02-22 08:18:22.205+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
24	dbdf1-remote-software-developer-github	Software developer	2019-02-22 08:18:22.209361+01	2019-02-22 08:18:22.207+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
25	akm1l-remote-software-developer-github	Software developer	2019-02-22 08:18:22.211403+01	2019-02-22 08:18:22.209+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
26	0uzm8-remote-software-developer-github	Software developer	2019-02-22 08:18:22.214329+01	2019-02-22 08:18:22.212+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
27	hduj3-remote-software-developer-github	Software developer	2019-02-22 08:18:22.216952+01	2019-02-22 08:18:22.215+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
28	bpic2-remote-software-developer-github	Software developer	2019-02-22 08:18:22.219607+01	2019-02-22 08:18:22.217+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
29	mc89y-remote-software-developer-github	Software developer	2019-02-22 08:18:22.221591+01	2019-02-22 08:18:22.22+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
30	2l9oi-remote-software-developer-github	Software developer	2019-02-22 08:18:22.22357+01	2019-02-22 08:18:22.221+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
31	vs4zk-remote-software-developer-github	Software developer	2019-02-22 08:18:22.225673+01	2019-02-22 08:18:22.224+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
32	pxzun-remote-software-developer-github	Software developer	2019-02-22 08:18:22.227878+01	2019-02-22 08:18:22.226+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
33	izmvc-remote-software-developer-github	Software developer	2019-02-22 08:18:22.229904+01	2019-02-22 08:18:22.228+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
34	aaz4m-remote-software-developer-github	Software developer	2019-02-22 08:18:22.231924+01	2019-02-22 08:18:22.23+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
35	0jlwb-remote-software-developer-github	Software developer	2019-02-22 08:18:22.234522+01	2019-02-22 08:18:22.232+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
36	d1m89-remote-software-developer-github	Software developer	2019-02-22 08:18:22.23676+01	2019-02-22 08:18:22.235+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
37	oangg-remote-software-developer-github	Software developer	2019-02-22 08:18:22.238902+01	2019-02-22 08:18:22.237+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
38	8kw0q-remote-software-developer-github	Software developer	2019-02-22 08:18:22.240996+01	2019-02-22 08:18:22.239+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
39	l3lge-remote-software-developer-github	Software developer	2019-02-22 08:18:22.243497+01	2019-02-22 08:18:22.241+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
40	549x7-remote-software-developer-github	Software developer	2019-02-22 08:18:22.245514+01	2019-02-22 08:18:22.243+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
41	cl4w6-remote-software-developer-github	Software developer	2019-02-22 08:18:22.247558+01	2019-02-22 08:18:22.245+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
42	kmria-remote-software-developer-github	Software developer	2019-02-22 08:18:22.25457+01	2019-02-22 08:18:22.252+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
43	h120c-remote-software-developer-github	Software developer	2019-02-22 08:18:22.257682+01	2019-02-22 08:18:22.255+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
44	hxq59-remote-software-developer-github	Software developer	2019-02-22 08:18:22.259761+01	2019-02-22 08:18:22.258+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
45	3b0w9-remote-software-developer-github	Software developer	2019-02-22 08:18:22.261784+01	2019-02-22 08:18:22.26+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
46	3u4rd-remote-software-developer-github	Software developer	2019-02-22 08:18:22.263903+01	2019-02-22 08:18:22.262+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
47	sv9gz-remote-software-developer-github	Software developer	2019-02-22 08:18:22.267627+01	2019-02-22 08:18:22.264+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
48	nqmao-remote-software-developer-github	Software developer	2019-02-22 08:18:22.270034+01	2019-02-22 08:18:22.268+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
49	2c07w-remote-software-developer-github	Software developer	2019-02-22 08:18:22.272389+01	2019-02-22 08:18:22.27+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
50	yazlv-remote-software-developer-github	Software developer	2019-02-22 08:18:22.274506+01	2019-02-22 08:18:22.272+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
51	z4w11-remote-software-developer-github	Software developer	2019-02-22 08:18:22.276715+01	2019-02-22 08:18:22.274+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
52	n3ld2-remote-software-developer-github	Software developer	2019-02-22 08:18:22.279133+01	2019-02-22 08:18:22.277+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
53	v4ii3-remote-software-developer-github	Software developer	2019-02-22 08:18:22.28156+01	2019-02-22 08:18:22.279+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
54	76opj-remote-software-developer-github	Software developer	2019-02-22 08:18:22.284304+01	2019-02-22 08:18:22.282+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
55	sjn6d-remote-software-developer-github	Software developer	2019-02-22 08:18:22.287136+01	2019-02-22 08:18:22.285+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
56	7cq4j-remote-software-developer-github	Software developer	2019-02-22 08:18:22.28938+01	2019-02-22 08:18:22.287+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
57	9bjp0-remote-software-developer-github	Software developer	2019-02-22 08:18:22.29196+01	2019-02-22 08:18:22.29+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
58	ad8ca-remote-software-developer-github	Software developer	2019-02-22 08:18:22.294259+01	2019-02-22 08:18:22.292+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
59	4u35k-remote-software-developer-github	Software developer	2019-02-22 08:18:22.296462+01	2019-02-22 08:18:22.294+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
60	k6qq5-remote-software-developer-github	Software developer	2019-02-22 08:18:22.298563+01	2019-02-22 08:18:22.296+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
61	jzz7f-remote-software-developer-github	Software developer	2019-02-22 08:18:22.300979+01	2019-02-22 08:18:22.299+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
62	yccdt-remote-software-developer-github	Software developer	2019-02-22 08:18:22.303158+01	2019-02-22 08:18:22.301+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
63	sojvm-remote-software-developer-github	Software developer	2019-02-22 08:18:22.30537+01	2019-02-22 08:18:22.303+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
64	a2vw7-remote-software-developer-github	Software developer	2019-02-22 08:18:22.308617+01	2019-02-22 08:18:22.306+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
65	peerz-remote-software-developer-github	Software developer	2019-02-22 08:18:22.313498+01	2019-02-22 08:18:22.311+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
66	gfv5s-remote-software-developer-github	Software developer	2019-02-22 08:18:22.316132+01	2019-02-22 08:18:22.314+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
67	ivnkc-remote-software-developer-github	Software developer	2019-02-22 08:18:22.318395+01	2019-02-22 08:18:22.316+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
68	hjc1c-remote-software-developer-github	Software developer	2019-02-22 08:18:22.320492+01	2019-02-22 08:18:22.318+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
69	b1li7-remote-software-developer-github	Software developer	2019-02-22 08:18:22.323374+01	2019-02-22 08:18:22.321+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
70	ps9sk-remote-software-developer-github	Software developer	2019-02-22 08:18:22.326016+01	2019-02-22 08:18:22.324+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
71	i6n3o-remote-software-developer-github	Software developer	2019-02-22 08:18:22.328121+01	2019-02-22 08:18:22.326+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
72	8mzzg-remote-software-developer-github	Software developer	2019-02-22 08:18:22.330211+01	2019-02-22 08:18:22.328+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
73	htq5c-remote-software-developer-github	Software developer	2019-02-22 08:18:22.332996+01	2019-02-22 08:18:22.33+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
74	52s9m-remote-software-developer-github	Software developer	2019-02-22 08:18:22.335557+01	2019-02-22 08:18:22.333+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
75	4ywu6-remote-software-developer-github	Software developer	2019-02-22 08:18:22.338046+01	2019-02-22 08:18:22.336+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
76	36syu-remote-software-developer-github	Software developer	2019-02-22 08:18:22.341+01	2019-02-22 08:18:22.338+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
77	q2oae-remote-software-developer-github	Software developer	2019-02-22 08:18:22.343472+01	2019-02-22 08:18:22.341+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
78	mrrl6-remote-software-developer-github	Software developer	2019-02-22 08:18:22.347534+01	2019-02-22 08:18:22.344+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
79	5t4k8-remote-software-developer-github	Software developer	2019-02-22 08:18:22.350281+01	2019-02-22 08:18:22.348+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
80	virja-remote-software-developer-github	Software developer	2019-02-22 08:18:22.352436+01	2019-02-22 08:18:22.35+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
81	cx6b9-remote-software-developer-github	Software developer	2019-02-22 08:18:22.355293+01	2019-02-22 08:18:22.353+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
82	ggepo-remote-software-developer-github	Software developer	2019-02-22 08:18:22.357443+01	2019-02-22 08:18:22.355+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
83	pwja1-remote-software-developer-github	Software developer	2019-02-22 08:18:22.35961+01	2019-02-22 08:18:22.358+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
84	d99dk-remote-software-developer-github	Software developer	2019-02-22 08:18:22.361947+01	2019-02-22 08:18:22.36+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
85	sc2hv-remote-software-developer-github	Software developer	2019-02-22 08:18:22.364008+01	2019-02-22 08:18:22.362+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
86	rqhg6-remote-software-developer-github	Software developer	2019-02-22 08:18:22.366319+01	2019-02-22 08:18:22.364+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
87	8h9bm-remote-software-developer-github	Software developer	2019-02-22 08:18:22.368531+01	2019-02-22 08:18:22.366+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
88	53i5n-remote-software-developer-github	Software developer	2019-02-22 08:18:22.370612+01	2019-02-22 08:18:22.369+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
89	uksug-remote-software-developer-github	Software developer	2019-02-22 08:18:22.372956+01	2019-02-22 08:18:22.371+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
90	pm9oi-remote-software-developer-github	Software developer	2019-02-22 08:18:22.380237+01	2019-02-22 08:18:22.378+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
91	fbjpe-remote-software-developer-github	Software developer	2019-02-22 08:18:22.382675+01	2019-02-22 08:18:22.38+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
92	d0tn6-remote-software-developer-github	Software developer	2019-02-22 08:18:22.385014+01	2019-02-22 08:18:22.383+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
93	hhjfx-remote-software-developer-github	Software developer	2019-02-22 08:18:22.38729+01	2019-02-22 08:18:22.385+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
94	zgjo2-remote-software-developer-github	Software developer	2019-02-22 08:18:22.389479+01	2019-02-22 08:18:22.387+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
95	rkkf4-remote-software-developer-github	Software developer	2019-02-22 08:18:22.391752+01	2019-02-22 08:18:22.39+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
96	phi8i-remote-software-developer-github	Software developer	2019-02-22 08:18:22.393898+01	2019-02-22 08:18:22.392+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
97	ztqvk-remote-software-developer-github	Software developer	2019-02-22 08:18:22.396039+01	2019-02-22 08:18:22.394+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
98	jh5ky-remote-software-developer-github	Software developer	2019-02-22 08:18:22.398622+01	2019-02-22 08:18:22.396+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
99	jqq4r-remote-software-developer-github	Software developer	2019-02-22 08:18:22.400925+01	2019-02-22 08:18:22.399+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
100	4dpbe-remote-software-developer-github	Software developer	2019-02-22 08:18:22.403019+01	2019-02-22 08:18:22.401+01	1	\N	\N	\N	\N	github	Github	\N	\N	\N	\N	This is the best job ever	<p>This is the best job ever</p>		\N	\N	\N
\.


--
-- Data for Name: job_tags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job_tags (id, job_id, tag_id) FROM stdin;
\.


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tag (id, name, relevance) FROM stdin;
\.


--
-- Data for Name: url_reference; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.url_reference (id, company_public_id, job_public_id, url) FROM stdin;
\.


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.companies_id_seq', 4, true);


--
-- Name: company_url_reference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.company_url_reference_id_seq', 1, false);


--
-- Name: google_places_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.google_places_id_seq', 1, false);


--
-- Name: google_places_textsearch_cache_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.google_places_textsearch_cache_id_seq', 1, false);


--
-- Name: job_tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.job_tags_id_seq', 1, false);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.jobs_id_seq', 100, true);


--
-- Name: stackoverflow_tags_cache_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stackoverflow_tags_cache_id_seq', 1, false);


--
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tag_id_seq', 1, false);


--
-- Name: company companies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: url_reference company_url_reference_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url_reference
    ADD CONSTRAINT company_url_reference_pk PRIMARY KEY (id);


--
-- Name: job_tags job_tags_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_tags
    ADD CONSTRAINT job_tags_pk PRIMARY KEY (id);


--
-- Name: job jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: companies_name_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX companies_name_uindex ON public.company USING btree (name);


--
-- Name: company_public_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX company_public_id_uindex ON public.company USING btree (public_id);


--
-- Name: job_public_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX job_public_id_uindex ON public.job USING btree (public_id);


--
-- Name: tag_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX tag_id_uindex ON public.tag USING btree (id);


--
-- Name: tag_name_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX tag_name_uindex ON public.tag USING btree (name);


--
-- Name: job job_company_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_company_id_fk FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- Name: job_tags job_tags_job_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_tags
    ADD CONSTRAINT job_tags_job_id_fk FOREIGN KEY (job_id) REFERENCES public.job(id);


--
-- Name: job_tags job_tags_tag_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_tags
    ADD CONSTRAINT job_tags_tag_id_fk FOREIGN KEY (tag_id) REFERENCES public.tag(id);


--
-- Name: url_reference url_reference_company_public_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url_reference
    ADD CONSTRAINT url_reference_company_public_id_fk FOREIGN KEY (company_public_id) REFERENCES public.company(public_id);


--
-- Name: url_reference url_reference_job_public_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url_reference
    ADD CONSTRAINT url_reference_job_public_id_fk FOREIGN KEY (job_public_id) REFERENCES public.job(public_id);


--
-- PostgreSQL database dump complete
--


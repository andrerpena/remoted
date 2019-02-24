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
5	fcuk8-aaa	aaa	aaa	2019-02-24 17:01:26.78488+01
\.


--
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job (id, public_id, title, created_at, published_at, company_id, location_required, location_preferred, location_preferred_timezone, location_preferred_timezone_tolerance, company_name, company_display_name, salary_exact, salary_min, salary_max, salary_equity, description, description_html, tags, location_raw, salary_raw, salary_currency) FROM stdin;
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

SELECT pg_catalog.setval('public.companies_id_seq', 8, true);


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


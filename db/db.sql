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
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


--
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;


--
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: _remoted_get_jobs(integer, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public._remoted_get_jobs(_limit integer, _offset integer) RETURNS TABLE(public_id uuid, title character varying, created_at timestamp without time zone, published_at timestamp without time zone)
    LANGUAGE sql
    AS $$
select u.public_id, u.title, u.created_at, u.published_at

from job u

order by published_at desc

limit _limit offset _offset

$$;


--
-- Name: google_places_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.google_places_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: address; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.address (
    id integer DEFAULT nextval('public.google_places_id_seq'::regclass) NOT NULL,
    formatted_address character varying(255) NOT NULL,
    geometry public.geometry,
    longitude double precision,
    latitude double precision,
    google_place_id character varying(255) NOT NULL,
    google_place_details json,
    CONSTRAINT enforce_srid CHECK ((public.st_srid(geometry) = 4326))
);


--
-- Name: company; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.company (
    id integer NOT NULL,
    public_id uuid DEFAULT public.uuid_generate_v4(),
    name character varying(50) NOT NULL,
    primary_address integer,
    display_name character varying(50) NOT NULL
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
-- Name: company_addresses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.company_addresses (
    id integer NOT NULL,
    company_id integer NOT NULL,
    google_place_id integer NOT NULL
);


--
-- Name: company_google_places_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.company_google_places_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: company_google_places_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.company_google_places_id_seq OWNED BY public.company_addresses.id;


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
-- Name: job; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job (
    id integer NOT NULL,
    public_id uuid DEFAULT public.uuid_generate_v4(),
    title character varying(100) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    published_at timestamp without time zone NOT NULL,
    company_id integer NOT NULL,
    location_required character varying(100),
    location_preferred character varying(100),
    location_preferred_timezone smallint,
    location_preferred_timezone_tolerance smallint,
    company_name character varying(100),
    company_display_name character varying(100),
    salary_exact integer,
    salary_min integer,
    salary_max integer,
    salary_equity boolean
);


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
-- Name: company_addresses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company_addresses ALTER COLUMN id SET DEFAULT nextval('public.company_google_places_id_seq'::regclass);


--
-- Name: job id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: job_tags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_tags ALTER COLUMN id SET DEFAULT nextval('public.job_tags_id_seq'::regclass);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.address (id, formatted_address, geometry, longitude, latitude, google_place_id, google_place_details) FROM stdin;
\.


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.company (id, public_id, name, primary_address, display_name) FROM stdin;
\.


--
-- Data for Name: company_addresses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.company_addresses (id, company_id, google_place_id) FROM stdin;
\.


--
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job (id, public_id, title, created_at, published_at, company_id, location_required, location_preferred, location_preferred_timezone, location_preferred_timezone_tolerance, company_name, company_display_name, salary_exact, salary_min, salary_max, salary_equity) FROM stdin;
\.


--
-- Data for Name: job_tags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job_tags (id, job_id, tag_id) FROM stdin;
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tag (id, name, relevance) FROM stdin;
\.


--
-- Data for Name: topology; Type: TABLE DATA; Schema: topology; Owner: -
--

COPY topology.topology (id, name, srid, "precision", hasz) FROM stdin;
\.


--
-- Data for Name: layer; Type: TABLE DATA; Schema: topology; Owner: -
--

COPY topology.layer (topology_id, layer_id, schema_name, table_name, feature_column, feature_type, level, child_id) FROM stdin;
\.


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.companies_id_seq', 1, false);


--
-- Name: company_google_places_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.company_google_places_id_seq', 1, false);


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

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- Name: stackoverflow_tags_cache_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stackoverflow_tags_cache_id_seq', 1, false);


--
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tag_id_seq', 1, false);


--
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);


--
-- Name: company companies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: company_addresses company_google_places_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company_addresses
    ADD CONSTRAINT company_google_places_pk PRIMARY KEY (id);


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
-- Name: address_formatted_address_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX address_formatted_address_uindex ON public.address USING btree (formatted_address);


--
-- Name: address_google_place_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX address_google_place_id_uindex ON public.address USING btree (google_place_id);


--
-- Name: address_gpx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX address_gpx ON public.address USING btree (public.geography(geometry));


--
-- Name: address_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX address_id_uindex ON public.address USING btree (id);


--
-- Name: address_spx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX address_spx ON public.address USING btree (geometry);


--
-- Name: companies_name_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX companies_name_uindex ON public.company USING btree (name);


--
-- Name: company_google_places_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX company_google_places_id_uindex ON public.company_addresses USING btree (id);


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
-- Name: company companies_primary_address_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT companies_primary_address_fk FOREIGN KEY (primary_address) REFERENCES public.address(id);


--
-- Name: company_addresses company_google_places_company_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company_addresses
    ADD CONSTRAINT company_google_places_company_id_fk FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- Name: company_addresses company_google_places_google_place_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company_addresses
    ADD CONSTRAINT company_google_places_google_place_id_fk FOREIGN KEY (google_place_id) REFERENCES public.address(id);


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
-- PostgreSQL database dump complete
--


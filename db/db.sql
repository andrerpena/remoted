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
    name character varying(50) NOT NULL,
    primary_address integer
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
-- Name: google_places_textsearch_cache; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.google_places_textsearch_cache (
    id integer DEFAULT nextval('public.google_places_textsearch_cache_id_seq'::regclass) NOT NULL,
    search character varying(200) NOT NULL,
    cache json NOT NULL
);


--
-- Name: job; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job (
    id integer NOT NULL,
    title character varying(100) NOT NULL
);


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
-- Name: stackoverflow_tags_cache; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stackoverflow_tags_cache (
    search character varying(50) NOT NULL,
    cache json NOT NULL,
    last_updated_at timestamp without time zone DEFAULT (now())::timestamp without time zone NOT NULL,
    id integer DEFAULT nextval('public.stackoverflow_tags_cache_id_seq'::regclass) NOT NULL
);


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
    relevance integer NOT NULL,
    last_updated_at timestamp without time zone DEFAULT (now())::timestamp without time zone NOT NULL
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
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.address (id, formatted_address, geometry, longitude, latitude, google_place_id, google_place_details) FROM stdin;
\.


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.company (id, name, primary_address) FROM stdin;
\.


--
-- Data for Name: company_addresses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.company_addresses (id, company_id, google_place_id) FROM stdin;
\.


--
-- Data for Name: google_places_textsearch_cache; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.google_places_textsearch_cache (id, search, cache) FROM stdin;
\.


--
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job (id, title) FROM stdin;
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: stackoverflow_tags_cache; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.stackoverflow_tags_cache (search, cache, last_updated_at, id) FROM stdin;
\.


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tag (id, name, relevance, last_updated_at) FROM stdin;
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
-- Name: job jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: google_places_textsearch_cache location_cache_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.google_places_textsearch_cache
    ADD CONSTRAINT location_cache_pkey PRIMARY KEY (id);


--
-- Name: stackoverflow_tags_cache stackoverflow_tags_cache_id_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stackoverflow_tags_cache
    ADD CONSTRAINT stackoverflow_tags_cache_id_pk PRIMARY KEY (id);


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
-- Name: location_cache_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX location_cache_id_uindex ON public.google_places_textsearch_cache USING btree (id);


--
-- Name: location_cache_search_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX location_cache_search_uindex ON public.google_places_textsearch_cache USING btree (search);


--
-- Name: stackoverflow_tags_cache_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX stackoverflow_tags_cache_id_uindex ON public.stackoverflow_tags_cache USING btree (id);


--
-- Name: stackoverflow_tags_cache_search_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX stackoverflow_tags_cache_search_uindex ON public.stackoverflow_tags_cache USING btree (search);


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
-- PostgreSQL database dump complete
--


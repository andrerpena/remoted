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
-- Name: topology; Type: SCHEMA; Schema: -; Owner: devjoblist
--

CREATE SCHEMA topology;


ALTER SCHEMA topology OWNER TO devjoblist;

--
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: devjoblist
--

COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


--
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;


--
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: devjoblist
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.companies OWNER TO devjoblist;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: devjoblist
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.companies_id_seq OWNER TO devjoblist;

--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devjoblist
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- Name: google_places_id_seq; Type: SEQUENCE; Schema: public; Owner: devjoblist
--

CREATE SEQUENCE public.google_places_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.google_places_id_seq OWNER TO devjoblist;

--
-- Name: google_places; Type: TABLE; Schema: public; Owner: devjoblist
--

CREATE TABLE public.google_places (
    id integer DEFAULT nextval('public.google_places_id_seq'::regclass) NOT NULL,
    formatted_address character varying(255) NOT NULL,
    geometry public.geometry,
    longitude double precision,
    latitude double precision,
    google_place_id character varying(255) NOT NULL,
    google_place_details json,
    CONSTRAINT enforce_srid CHECK ((public.st_srid(geometry) = 4326))
);


ALTER TABLE public.google_places OWNER TO devjoblist;

--
-- Name: google_places_textsearch_cache_id_seq; Type: SEQUENCE; Schema: public; Owner: devjoblist
--

CREATE SEQUENCE public.google_places_textsearch_cache_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.google_places_textsearch_cache_id_seq OWNER TO devjoblist;

--
-- Name: google_places_textsearch_cache; Type: TABLE; Schema: public; Owner: devjoblist
--

CREATE TABLE public.google_places_textsearch_cache (
    id integer DEFAULT nextval('public.google_places_textsearch_cache_id_seq'::regclass) NOT NULL,
    search character varying(200) NOT NULL,
    cache json NOT NULL
);


ALTER TABLE public.google_places_textsearch_cache OWNER TO devjoblist;

--
-- Name: jobs; Type: TABLE; Schema: public; Owner: devjoblist
--

CREATE TABLE public.jobs (
    id integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO devjoblist;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: devjoblist
--

CREATE SEQUENCE public.jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobs_id_seq OWNER TO devjoblist;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devjoblist
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: google_places geo_location_pkey; Type: CONSTRAINT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.google_places
    ADD CONSTRAINT geo_location_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: google_places_textsearch_cache location_cache_pkey; Type: CONSTRAINT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.google_places_textsearch_cache
    ADD CONSTRAINT location_cache_pkey PRIMARY KEY (id);


--
-- Name: companies_name_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX companies_name_uindex ON public.companies USING btree (name);


--
-- Name: geo_location_formatted_address_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX geo_location_formatted_address_uindex ON public.google_places USING btree (formatted_address);


--
-- Name: geo_location_gpx; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE INDEX geo_location_gpx ON public.google_places USING btree (public.geography(geometry));


--
-- Name: geo_location_id_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX geo_location_id_uindex ON public.google_places USING btree (id);


--
-- Name: geo_location_spx; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE INDEX geo_location_spx ON public.google_places USING btree (geometry);


--
-- Name: google_place_google_place_id_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX google_place_google_place_id_uindex ON public.google_places USING btree (google_place_id);


--
-- Name: location_cache_id_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX location_cache_id_uindex ON public.google_places_textsearch_cache USING btree (id);


--
-- Name: location_cache_search_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX location_cache_search_uindex ON public.google_places_textsearch_cache USING btree (search);


--
-- PostgreSQL database dump complete
--


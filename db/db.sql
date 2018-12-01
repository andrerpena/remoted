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

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: devjoblist
--

CREATE TABLE public.addresses (
    id integer DEFAULT nextval('public.google_places_id_seq'::regclass) NOT NULL,
    formatted_address character varying(255) NOT NULL,
    geometry public.geometry,
    longitude double precision,
    latitude double precision,
    google_place_id character varying(255) NOT NULL,
    google_place_details json,
    CONSTRAINT enforce_srid CHECK ((public.st_srid(geometry) = 4326))
);


ALTER TABLE public.addresses OWNER TO devjoblist;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: devjoblist
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    primary_address integer
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
-- Name: company_addresses; Type: TABLE; Schema: public; Owner: devjoblist
--

CREATE TABLE public.company_addresses (
    id integer NOT NULL,
    company_id integer NOT NULL,
    google_place_id integer NOT NULL
);


ALTER TABLE public.company_addresses OWNER TO devjoblist;

--
-- Name: company_google_places_id_seq; Type: SEQUENCE; Schema: public; Owner: devjoblist
--

CREATE SEQUENCE public.company_google_places_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.company_google_places_id_seq OWNER TO devjoblist;

--
-- Name: company_google_places_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devjoblist
--

ALTER SEQUENCE public.company_google_places_id_seq OWNED BY public.company_addresses.id;


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
-- Name: stackoverflow_tags_cache_id_seq; Type: SEQUENCE; Schema: public; Owner: devjoblist
--

CREATE SEQUENCE public.stackoverflow_tags_cache_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stackoverflow_tags_cache_id_seq OWNER TO devjoblist;

--
-- Name: stackoverflow_tags_cache; Type: TABLE; Schema: public; Owner: devjoblist
--

CREATE TABLE public.stackoverflow_tags_cache (
    search character varying(50) NOT NULL,
    cache json NOT NULL,
    last_updated_at timestamp without time zone DEFAULT (now())::timestamp without time zone NOT NULL,
    id integer DEFAULT nextval('public.stackoverflow_tags_cache_id_seq'::regclass) NOT NULL
);


ALTER TABLE public.stackoverflow_tags_cache OWNER TO devjoblist;

--
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: devjoblist
--

CREATE SEQUENCE public.tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tag_id_seq OWNER TO devjoblist;

--
-- Name: tag; Type: TABLE; Schema: public; Owner: devjoblist
--

CREATE TABLE public.tag (
    id integer DEFAULT nextval('public.tag_id_seq'::regclass) NOT NULL,
    name character varying(50) NOT NULL,
    relevance integer NOT NULL,
    last_updated_at timestamp without time zone DEFAULT (now())::timestamp without time zone NOT NULL
);


ALTER TABLE public.tag OWNER TO devjoblist;

--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: company_addresses id; Type: DEFAULT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.company_addresses ALTER COLUMN id SET DEFAULT nextval('public.company_google_places_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: company_addresses company_google_places_pk; Type: CONSTRAINT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.company_addresses
    ADD CONSTRAINT company_google_places_pk PRIMARY KEY (id);


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
-- Name: stackoverflow_tags_cache stackoverflow_tags_cache_id_pk; Type: CONSTRAINT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.stackoverflow_tags_cache
    ADD CONSTRAINT stackoverflow_tags_cache_id_pk PRIMARY KEY (id);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: addresses_formatted_address_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX addresses_formatted_address_uindex ON public.addresses USING btree (formatted_address);


--
-- Name: addresses_google_place_id_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX addresses_google_place_id_uindex ON public.addresses USING btree (google_place_id);


--
-- Name: addresses_gpx; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE INDEX addresses_gpx ON public.addresses USING btree (public.geography(geometry));


--
-- Name: addresses_id_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX addresses_id_uindex ON public.addresses USING btree (id);


--
-- Name: addresses_spx; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE INDEX addresses_spx ON public.addresses USING btree (geometry);


--
-- Name: companies_name_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX companies_name_uindex ON public.companies USING btree (name);


--
-- Name: company_google_places_id_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX company_google_places_id_uindex ON public.company_addresses USING btree (id);


--
-- Name: location_cache_id_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX location_cache_id_uindex ON public.google_places_textsearch_cache USING btree (id);


--
-- Name: location_cache_search_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX location_cache_search_uindex ON public.google_places_textsearch_cache USING btree (search);


--
-- Name: stackoverflow_tags_cache_id_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX stackoverflow_tags_cache_id_uindex ON public.stackoverflow_tags_cache USING btree (id);


--
-- Name: stackoverflow_tags_cache_search_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX stackoverflow_tags_cache_search_uindex ON public.stackoverflow_tags_cache USING btree (search);


--
-- Name: tag_id_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX tag_id_uindex ON public.tag USING btree (id);


--
-- Name: tag_name_uindex; Type: INDEX; Schema: public; Owner: devjoblist
--

CREATE UNIQUE INDEX tag_name_uindex ON public.tag USING btree (name);


--
-- Name: companies companies_primary_address_fk; Type: FK CONSTRAINT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_primary_address_fk FOREIGN KEY (primary_address) REFERENCES public.addresses(id);


--
-- Name: company_addresses company_google_places_company_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.company_addresses
    ADD CONSTRAINT company_google_places_company_id_fk FOREIGN KEY (company_id) REFERENCES public.companies(id);


--
-- Name: company_addresses company_google_places_google_place_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.company_addresses
    ADD CONSTRAINT company_google_places_google_place_id_fk FOREIGN KEY (google_place_id) REFERENCES public.addresses(id);


--
-- PostgreSQL database dump complete
--


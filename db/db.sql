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
-- Name: company; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.company (
    id integer NOT NULL,
    public_id character varying(100) NOT NULL,
    name character varying(100) NOT NULL,
    display_name character varying(50) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    image_url character varying(300),
    image_url_20_20 character varying(300),
    location_details_id integer
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
-- Name: job; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job (
    id integer NOT NULL,
    public_id character varying(300) NOT NULL,
    title character varying(300) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    published_at timestamp with time zone NOT NULL,
    company_id integer NOT NULL,
    location_required character varying(200),
    location_preferred character varying(200),
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
    salary_currency character varying(10),
    url character varying(300),
    source character varying(50) NOT NULL,
    location_tag character varying(100),
    location_details_id integer
);


--
-- Name: job_tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_tag (
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

ALTER SEQUENCE public.job_tags_id_seq OWNED BY public.job_tag.id;


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
-- Name: location_details; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.location_details (
    id integer NOT NULL,
    worldwide_confirmed boolean,
    accepted_regions character varying(50)[],
    accepted_countries character varying(2)[],
    timezone_min integer,
    timezone_max integer,
    description text,
    headquarters_location character varying(200),
    enable_automatic_updates boolean
);


--
-- Name: location_details_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.location_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: location_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.location_details_id_seq OWNED BY public.location_details.id;


--
-- Name: newsletter_subscription; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.newsletter_subscription (
    id integer NOT NULL,
    email character varying(300) NOT NULL,
    frequency character varying(20),
    tags character varying[],
    categories character varying[],
    created_at timestamp without time zone NOT NULL,
    last_sent_at timestamp without time zone
);


--
-- Name: newsletter_subscription_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.newsletter_subscription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: newsletter_subscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.newsletter_subscription_id_seq OWNED BY public.newsletter_subscription.id;


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
-- Name: job_tag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_tag ALTER COLUMN id SET DEFAULT nextval('public.job_tags_id_seq'::regclass);


--
-- Name: location_details id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location_details ALTER COLUMN id SET DEFAULT nextval('public.location_details_id_seq'::regclass);


--
-- Name: newsletter_subscription id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.newsletter_subscription ALTER COLUMN id SET DEFAULT nextval('public.newsletter_subscription_id_seq'::regclass);


--
-- Name: company companies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: job_tag job_tags_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_tag
    ADD CONSTRAINT job_tags_pk PRIMARY KEY (id);


--
-- Name: job jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: location_details location_details_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location_details
    ADD CONSTRAINT location_details_pk PRIMARY KEY (id);


--
-- Name: newsletter_subscription newsletter_subscription_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.newsletter_subscription
    ADD CONSTRAINT newsletter_subscription_pk PRIMARY KEY (id);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: company_name_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX company_name_uindex ON public.company USING btree (name);


--
-- Name: company_public_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX company_public_id_uindex ON public.company USING btree (public_id);


--
-- Name: job_public_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX job_public_id_uindex ON public.job USING btree (public_id);


--
-- Name: newsletter_subscription_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX newsletter_subscription_id_uindex ON public.newsletter_subscription USING btree (id);


--
-- Name: tag_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX tag_id_uindex ON public.tag USING btree (id);


--
-- Name: tag_name_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX tag_name_uindex ON public.tag USING btree (name);


--
-- Name: company company_location_details_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_location_details_id_fk FOREIGN KEY (location_details_id) REFERENCES public.location_details(id);


--
-- Name: job job_company_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_company_id_fk FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- Name: job job_location_details_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_location_details_id_fk FOREIGN KEY (location_details_id) REFERENCES public.location_details(id);


--
-- Name: job_tag job_tags_job_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_tag
    ADD CONSTRAINT job_tags_job_id_fk FOREIGN KEY (job_id) REFERENCES public.job(id);


--
-- Name: job_tag job_tags_tag_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_tag
    ADD CONSTRAINT job_tags_tag_id_fk FOREIGN KEY (tag_id) REFERENCES public.tag(id);


--
-- PostgreSQL database dump complete
--


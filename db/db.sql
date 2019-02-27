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
    salary_currency character varying(10),
    url character varying(300),
    source_id integer NOT NULL
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
    created_at timestamp with time zone DEFAULT now(),
    image_url character varying(300)
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
-- Name: company_url; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.company_url (
    id integer NOT NULL,
    url character varying(200) NOT NULL,
    company_id integer
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

ALTER SEQUENCE public.company_url_reference_id_seq OWNED BY public.company_url.id;


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
-- Name: source; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.source (
    id integer NOT NULL,
    name character varying(100)
);


--
-- Name: source_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.source_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: source_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.source_id_seq OWNED BY public.source.id;


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
-- Name: company_url id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company_url ALTER COLUMN id SET DEFAULT nextval('public.company_url_reference_id_seq'::regclass);


--
-- Name: job id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: job_tag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_tag ALTER COLUMN id SET DEFAULT nextval('public.job_tags_id_seq'::regclass);


--
-- Name: source id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.source ALTER COLUMN id SET DEFAULT nextval('public.source_id_seq'::regclass);


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.company (id, public_id, name, display_name, created_at, image_url) FROM stdin;
10	znvy3-motiion	motiion	Motiion	2019-02-24 20:22:04.349127+01	\N
11	mpra2-komoot	komoot	komoot	2019-02-24 20:47:03.843595+01	\N
12	7f7pn-roobeo-gmbh	roobeo-gmbh	Roobeo GmbH	2019-02-24 20:47:04.636017+01	\N
13	0pxyv-7-cups	7-cups	7 Cups	2019-02-24 20:47:08.686375+01	\N
14	h0oga-gandh-bankensoftware-ag	gandh-bankensoftware-ag	G&H Bankensoftware AG	2019-02-24 20:47:09.695216+01	\N
15	y3leg-x-team	x-team	X-Team	2019-02-24 20:47:10.749731+01	\N
16	6jpfv-heetch	heetch	Heetch	2019-02-24 20:47:12.590489+01	\N
17	ozrty-ascend-hit	ascend-hit	ASCEND HIT	2019-02-24 20:47:13.35333+01	\N
18	llzbo-wallethub	wallethub	Wallethub	2019-02-24 20:47:14.292556+01	\N
19	ls2qw-giant-swarm-gmbh	giant-swarm-gmbh	Giant Swarm GmbH	2019-02-24 20:47:16.753333+01	\N
20	8pz72-sellercrowd	sellercrowd	SellerCrowd	2019-02-24 20:47:17.544071+01	\N
21	pqy6a-amazee	amazee	Amazee	2019-02-24 20:47:18.79743+01	\N
22	f318z-clevertech	clevertech	Clevertech	2019-02-24 20:47:19.842013+01	\N
23	l8buf-toptal	toptal	Toptal	2019-02-24 20:47:20.892777+01	\N
24	07iyg-auth0	auth0	Auth0	2019-02-24 20:47:21.79615+01	\N
25	4l0oj-scrapinghub	scrapinghub	Scrapinghub	2019-02-24 20:47:24.615514+01	\N
26	me022-suse	suse	SUSE	2019-02-25 19:43:18.137329+01	\N
27	ti4gu-thinkful-inc	thinkful-inc	Thinkful Inc.	2019-02-25 19:43:18.97909+01	\N
28	lmos4-socialnewsdesk	socialnewsdesk	SocialNewsDesk	2019-02-25 19:43:21.015811+01	\N
29	5ytty-avanoo	avanoo	Avanoo	2019-02-25 19:43:23.982037+01	\N
30	gce8h-redox	redox	Redox	2019-02-25 19:43:25.145925+01	\N
\.


--
-- Data for Name: company_url; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.company_url (id, url, company_id) FROM stdin;
3	https://stackoverflow.com/jobs/companies/motiion	\N
4	https://stackoverflow.com/jobs/241239/solutions-engineer-remote-motiion?a=1iU3rfkRcjTO&so=i&pg=1&offset=-1&total=210&r=true	\N
5	https://stackoverflow.com/jobs/companies/komoot	\N
6	https://stackoverflow.com/jobs/236408/ios-developer-m-f-komoot?a=1hhBlXx554DS&so=i&pg=1&offset=0&total=210&r=true	\N
7	https://stackoverflow.com/jobs/companies/roobeo	\N
8	https://stackoverflow.com/jobs/164963/frontend-ui-ux-developer-m-w-d-roobeo-gmbh?a=Tk3qTpfBbLa&so=i&pg=1&offset=1&total=210&r=true	\N
9	https://stackoverflow.com/jobs/237999/backend-engineer-routing-navigation-komoot?a=1hOGp7vuFDLa&so=i&pg=1&offset=2&total=210&r=true	\N
10	https://stackoverflow.com/jobs/206557/android-developer-m-f-komoot?a=17gUGCoI8PG8&so=i&pg=1&offset=3&total=210&r=true	\N
11	https://stackoverflow.com/jobs/216598/backend-engineer-algorithms-rankings-and-komoot?a=1aDH7R1DFIPK&so=i&pg=1&offset=4&total=210&r=true	\N
12	https://stackoverflow.com/jobs/companies/7-cups	\N
13	https://stackoverflow.com/jobs/241779/director-of-engineering-7-cups?a=1j5hqhidkQsU&so=i&pg=1&offset=5&total=210&r=true	\N
14	https://stackoverflow.com/jobs/companies/g-h-bankensoftware-ag	\N
15	https://stackoverflow.com/jobs/216992/senior-java-jee-entwickler-g-h-bankensoftware-ag?a=1aLT3pNIUYqA&so=i&pg=1&offset=6&total=210&r=true	\N
16	https://stackoverflow.com/jobs/companies/x-team	\N
17	https://stackoverflow.com/jobs/241675/senior-sql-azure-dba-remote-x-team?a=1j37lMIet5Ru&so=i&pg=1&offset=7&total=210&r=true	\N
18	https://stackoverflow.com/jobs/192128/php-developer-remote-x-team?a=12qTq6TMIXwk&so=i&pg=1&offset=8&total=210&r=true	\N
19	https://stackoverflow.com/jobs/companies/heetch	\N
20	https://stackoverflow.com/jobs/241613/software-engineer-delivery-platform-heetch?a=1j1PqgaRivJu&so=i&pg=1&offset=9&total=210&r=true	\N
21	https://stackoverflow.com/jobs/companies/ascend-hit	\N
22	https://stackoverflow.com/jobs/200139/software-engineer-remote-ascend-hit?a=157sRS9ZBlK0&so=i&pg=1&offset=10&total=210&r=true	\N
23	https://stackoverflow.com/jobs/companies/wallethub	\N
24	https://stackoverflow.com/jobs/241294/senior-systems-administrator-washington-dc-us-wallethub?a=1iVcbhL953Qk&so=i&pg=1&offset=11&total=210&r=true	\N
25	https://stackoverflow.com/jobs/241222/engineering-manager-marketplace-heetch?a=1iTHmtYoaLT2&so=i&pg=1&offset=13&total=210&r=true	\N
26	https://stackoverflow.com/jobs/241220/engineering-manager-driver-acquisition-heetch?a=1iTEMCVjqqIM&so=i&pg=1&offset=14&total=210&r=true	\N
27	https://stackoverflow.com/jobs/companies/giant-swarm-gmbh	\N
28	https://stackoverflow.com/jobs/160144/platform-engineer-for-containers-giant-swarm-gmbh?a=RHQYJlfDDBm&so=i&pg=1&offset=15&total=210&r=true	\N
29	https://stackoverflow.com/jobs/companies/sellercrowd	\N
30	https://stackoverflow.com/jobs/207699/frontend-engineer-that-loves-react-sellercrowd?a=17EEUbJqVL9u&so=i&pg=1&offset=16&total=210&r=true	\N
31	https://stackoverflow.com/jobs/companies/amazee	\N
32	https://stackoverflow.com/jobs/241012/remote-devops-systems-engineer-with-drupal-amazee?a=1iPkDDLlGVvW&so=i&pg=1&offset=17&total=210&r=true	\N
33	https://stackoverflow.com/jobs/companies/clevertech	\N
34	https://stackoverflow.com/jobs/241001/ror-elastic-search-full-stack-developer-clevertech?a=1iP6sqZqA36w&so=i&pg=1&offset=18&total=210&r=true	\N
35	https://stackoverflow.com/jobs/companies/toptal	\N
36	https://stackoverflow.com/jobs/240993/front-end-developer-pub-team-toptal?a=1iOW90N7AGru&so=i&pg=1&offset=19&total=210&r=true	\N
37	https://stackoverflow.com/jobs/companies/auth0	\N
38	https://stackoverflow.com/jobs/240992/principal-nodejs-engineer-site-reliability-auth0?a=1iOUR5gAdvRm&so=i&pg=1&offset=20&total=210&r=true	\N
39	https://stackoverflow.com/jobs/240991/software-engineering-manager-developer-auth0?a=1iOTz9K2Qlhe&so=i&pg=1&offset=21&total=210&r=true	\N
40	https://stackoverflow.com/jobs/240989/principal-engineer-platform-auth0?a=1iOQZiGY606Y&so=i&pg=1&offset=22&total=210&r=true	\N
41	https://stackoverflow.com/jobs/companies/scrapinghub	\N
42	https://stackoverflow.com/jobs/240974/cloud-backend-engineer-scrapinghub?a=1iOxEnOTurn2&so=i&pg=1&offset=23&total=210&r=true	\N
43	https://stackoverflow.com/jobs/240911/site-reliability-engineer-driver-team-heetch?a=1iNeqVKYWGEU&so=i&pg=1&offset=24&total=210&r=true	\N
44	https://stackoverflow.com/jobs/companies/suse	\N
45	https://stackoverflow.com/jobs/companies/thinkful-inc	\N
46	https://stackoverflow.com/jobs/companies/socialnewsdesk	\N
47	https://stackoverflow.com/jobs/companies/avanoo	\N
48	https://stackoverflow.com/jobs/companies/redox1	\N
\.


--
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job (id, public_id, title, created_at, published_at, company_id, location_required, location_preferred, location_preferred_timezone, location_preferred_timezone_tolerance, company_name, company_display_name, salary_exact, salary_min, salary_max, salary_equity, description, description_html, tags, location_raw, salary_raw, salary_currency, url, source_id) FROM stdin;
\.


--
-- Data for Name: job_tag; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job_tag (id, job_id, tag_id) FROM stdin;
\.


--
-- Data for Name: source; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.source (id, name) FROM stdin;
\.


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tag (id, name, relevance) FROM stdin;
1	d	1
2	a	1
3	t	1
4	b	1
5	s	1
6	e	1
7	i	1
8	o	1
9	 	1
10	j	1
11	c	1
12	v	1
13	-	1
14	w	1
15	f	1
16	h	1
17	p	1
18	n	1
19	u	1
20	l	1
21	y	1
22	r	1
23	x	1
24	m	1
25	5	1
26	z	1
27	g	1
28	k	1
29	q	1
30	.	1
\.


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.companies_id_seq', 30, true);


--
-- Name: company_url_reference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.company_url_reference_id_seq', 48, true);


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

SELECT pg_catalog.setval('public.job_tags_id_seq', 905, true);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.jobs_id_seq', 157, true);


--
-- Name: source_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.source_id_seq', 1, false);


--
-- Name: stackoverflow_tags_cache_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stackoverflow_tags_cache_id_seq', 1, false);


--
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tag_id_seq', 30, true);


--
-- Name: company companies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: company_url company_url_reference_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company_url
    ADD CONSTRAINT company_url_reference_pk PRIMARY KEY (id);


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
-- Name: source source_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.source
    ADD CONSTRAINT source_pk PRIMARY KEY (id);


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
-- Name: company_url company_url_company_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company_url
    ADD CONSTRAINT company_url_company_id_fk FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- Name: job job_company_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_company_id_fk FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- Name: job job_source_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_source_id_fk FOREIGN KEY (source_id) REFERENCES public.source(id);


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


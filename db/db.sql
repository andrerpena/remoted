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
    public_id character varying(300) NOT NULL,
    title character varying(300) NOT NULL,
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
    name character varying(100),
    last_updated_at timestamp with time zone,
    last_update_message text,
    last_update_message_details text
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
31	9w36d-oppizi	oppizi	oppizi	2019-03-02 08:05:48.625869+01	\N
32	li2vu-mixed-in-key	mixed-in-key	Mixed In Key	2019-03-02 08:05:50.365039+01	\N
33	pqe9i-aha	aha	Aha!	2019-03-02 08:05:51.601592+01	\N
34	belf1-self-decode	self-decode	Self Decode	2019-03-02 08:05:52.389521+01	\N
35	8o60e-elastic	elastic	Elastic	2019-03-02 08:05:53.196836+01	\N
36	wv0mt-toptal	toptal	Toptal	2019-03-02 08:05:54.207432+01	\N
37	w1azv-flexhire	flexhire	Flexhire	2019-03-02 08:05:55.012982+01	\N
38	8kehu-vast-limits-gmbh	vast-limits-gmbh	vast limits GmbH	2019-03-02 08:05:56.214629+01	\N
39	4tizb-aeolus-robotics	aeolus-robotics	Aeolus Robotics	2019-03-02 08:06:00.438095+01	\N
40	5aail-mav-farm	mav-farm	Mav Farm	2019-03-02 08:06:01.254525+01	\N
41	rrbl7-platformsh	platformsh	Platform.sh	2019-03-02 08:06:02.472291+01	\N
42	ndrx0-heetch	heetch	Heetch	2019-03-02 08:06:03.240878+01	\N
43	appjo-hausgold-talocasa-gmbh	hausgold-talocasa-gmbh	HAUSGOLD - talocasa GmbH	2019-03-02 08:06:04.030893+01	\N
44	rrsuv-hubstaff	hubstaff	Hubstaff	2019-03-02 08:06:05.266498+01	\N
45	lxccf-auth0	auth0	Auth0	2019-03-02 08:06:06.117271+01	\N
46	4bm7o-x-team	x-team	X-Team	2019-03-02 08:06:08.027634+01	\N
47	0ki4p-qualio	qualio	Qualio	2019-03-02 08:06:10.720383+01	\N
48	aqu4e-x-team	x-team	X-Team	2019-03-02 10:58:47.253172+01	\N
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
49	https://stackoverflow.com/jobs/companies/oppizi	31
50	https://stackoverflow.com/jobs/companies/mixed-in-key	32
51	https://stackoverflow.com/jobs/companies/aha	33
52	https://stackoverflow.com/jobs/companies/self-decode	34
53	https://stackoverflow.com/jobs/companies/elastic	35
54	https://stackoverflow.com/jobs/companies/toptal	36
55	https://stackoverflow.com/jobs/companies/flexhire	37
56	https://stackoverflow.com/jobs/companies/vast-limits-gmbh	38
57	https://stackoverflow.com/jobs/companies/aeolus-robotics	39
58	https://stackoverflow.com/jobs/companies/mav-farm	40
59	https://stackoverflow.com/jobs/companies/platform-sh	41
60	https://stackoverflow.com/jobs/companies/heetch	42
61	https://stackoverflow.com/jobs/companies/hausgold-talocasa-gmbh	43
62	https://stackoverflow.com/jobs/companies/hubstaff	44
63	https://stackoverflow.com/jobs/companies/auth0	45
64	https://stackoverflow.com/jobs/companies/x-team	46
65	https://stackoverflow.com/jobs/companies/qualio	47
66	https://stackoverflow.com/jobs/companies/x-team	48
\.


--
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job (id, public_id, title, created_at, published_at, company_id, location_required, location_preferred, location_preferred_timezone, location_preferred_timezone_tolerance, company_name, company_display_name, salary_exact, salary_min, salary_max, salary_equity, description, description_html, tags, location_raw, salary_raw, salary_currency, url, source_id) FROM stdin;
158	jg9fj-remote-senior-react-native-engineer-disruptive-offline-marketing-start-up-oppizi	Senior React Native Engineer: Disruptive Offline Marketing Start-up!	2019-03-02 08:05:48.664559+01	2019-03-02 08:05:48.635+01	31	\N	\N	\N	\N	oppizi	oppizi	\N	80000	120000	\N	We are seeking a full-time Senior Engineer, to join our Tech Team in Australia, Morocco, and Brazil. \n\n**Responsibilities**\n\n*   Maintain and improve our iOS and Android application (built with React Native) \n*   Plan and architect the tech for new app features, systems and integrations, and make it happen.\n*   Apply pragmatism and best practices in software engineering, delivering projects on time, with excellent quality.\n*   Writing tests and continually improving our build process\n*   Take ownership of the app, finding ways to improve its effectiveness, reliability and cost.\n*   Solving problems at scale\n\n**Requirements**\n\n*   Excellent communication skills, especially in understanding requirements and explaining technical or complex concepts\n*   Demonstrate extensive JavaScript experience, with a focus on React Native\n*   Experience and pragmatism in testing\n*   Ability to efficiently learn new tools and languages\n*   Desirable experience in the following areas: backend dev (Express and GraphQL), AWS and build automation	<p>We are seeking a full-time Senior Engineer, to join our Tech Team in Australia, Morocco, and Brazil.&nbsp;</p>\n<p><strong>Responsibilities</strong></p>\n<ul>\n<li>Maintain and improve our iOS and Android application (built with React Native)&nbsp;</li>\n<li>Plan and architect the tech for new app features, systems and integrations, and make it happen.</li>\n<li>Apply pragmatism and best practices in software engineering, delivering projects on time, with excellent quality.</li>\n<li>Writing tests and continually improving our build process</li>\n<li>Take ownership of the app, finding ways to improve its effectiveness, reliability and cost.</li>\n<li>Solving problems at scale</li>\n</ul>\n<p><strong>Requirements</strong></p>\n<ul>\n<li>Excellent communication skills, especially in understanding requirements and explaining technical or complex concepts</li>\n<li>Demonstrate extensive JavaScript experience, with a focus on React Native</li>\n<li>Experience and pragmatism in testing</li>\n<li>Ability to efficiently learn new tools and languages</li>\n<li>Desirable experience in the following areas: backend dev (Express and GraphQL), AWS and build automation</li>\n</ul>	reactjs react-native javascript graphql amazon-web-services	\N	                                A$80k - 120k                            	A$	https://stackoverflow.com/jobs/231284/senior-react-native-engineer-disruptive-offline-oppizi?a=1fz3HOoU8sKI&so=p&pg=1&offset=0&total=202&r=true	1
159	cv1n2-remote-watch-the-video-award-winning-music-software-looking-for-objective-c-/-swift-ui-mixed-in-key	Watch the video: Award-winning Music Software looking for Objective-C / Swift UI	2019-03-02 08:05:50.380655+01	2019-03-02 08:05:50.372+01	32	\N	Eastern Time	-5	6	mixed-in-key	Mixed In Key	\N	\N	\N	\N	**We just launched a new product ([https://mixedinkey.com/captain-plugins](https://mixedinkey.com/captain-plugins)) and got hundreds of feature requests. We want you to build the next generations of this software with us. Watch the video to see what it does:  \n  \n**[https://www.youtube.com/watch?v=4gVF7XW2bPw](https://www.youtube.com/watch?v=4gVF7XW2bPw)\n\n**  \nGet to know us:**\n\n**1\\. Our team is global, and everyone works remotely**\n\nOur team lives all over the United States, Canada, United Kingdom, Russia, Netherlands, and Serbia. We have 12 permanent team members, and another 12 people who help out with smaller tasks. You can work remotely from anywhere in the world as long as you're available during the day (EST time) for collaboration over Slack\n\n**2\\. We hire great developers and have a long track record of success**\n\n*   The company was started by a developer, so he can read your code and help you solve problems\n*   The first Mac developer who joined the team 12 years ago is still on the team, working on new products\n*   We never outsourced our software development to other companies. We own and maintain 100% of our source code, so we know it inside out and can help you learn it faster\n*   We've written 30+ codebases with just 2-3 developers on each one. We work in small teams (1-3 developers, 1 QA, 1 designer on each task)\n*   You will have a healthy live-work balance. We don't use crunch time\n*   Our team is kind and talented. Our developers always collaborate well with each other\n*   We prioritize quality because we're in it for the long term  \n      \n    \n\n**3\\. You'll learn a lot from this job**\n\nOur software is more complex than most products. You'll learn a lot from working on it.\n\nYour teammates are friendly, talented and polite. If you're looking for collaborators and mentors, you'll find them.  \n  \n**  \n4\\. Our goal is to teach our fans how to compose great music**\n\nWe launched our new product called [Captain Plugins](https://mixedinkey.com/captain-plugins/). Magazine press and our fans loved it, so we have a wish list of hundreds of feature requests and ideas on what to build next. That is why we're hiring -- we have a lot of interesting work\n\nHere's the [YouTube promo](https://www.youtube.com/watch?v=4gVF7XW2bPw&list=PLcyutjSZFlPpsgT0MPj6fFaa57EZo_Zhe) showing how the plugin works.\n\nOne of the best testimonials we've gotten is that "These plugins close the door on the past." They are a brand-new way to write music and create songs from scratch.\n\n**5\\. Skills & requirements**\n\n1) A very solid understanding of Objective-C\n\n2) Some knowledge of Swift\n\n3) Optional, but nice to have: C++ knowledge, so you can integrate audio engines with new front-ends written in Obj-C\n\n4) Any experience in CoreAudio and/or AVFoundation would be a big plus\n\n5) Doing something hard - like 3D rendering, or OS-level stuff, or anything else that goes beyond making basic iOS apps\n\n6) Knowledge of music and music theory is helpful but not required\n\n7) Natural curiosity for how things work\n\n8) Taking a lot of initiative. This is part of the job requirement - we hire people who take initiative\n\n9) Desire to work from home. You can work 4 days a week (Tuesday-Friday, or Monday-Thursday), or 5 days a week depending on your preference. We don't hire for less than 32 hours per week\n\n**Send us an email**\n\nWe're not a big anonymous corporation, we're a small team of developers who love making music tools. If you want to join us, send us an email at the address below. Show us your work.\n\n**  \nIf you match our requirements, you can apply here:** [https://mixedinkey.recruiterbox.com/jobs/fk01yya?source=StackOverflow](https://mixedinkey.recruiterbox.com/jobs/fk01yya?source=StackOverflow)	<p>**We just launched a new product&nbsp;(<a href="https://mixedinkey.com/captain-plugins">https://mixedinkey.com/captain-plugins</a>) and got&nbsp;hundreds of feature requests. We want&nbsp;you to build the next generations of this software with us. Watch the video to see what it does:  </p>\n<p>**<a href="https://www.youtube.com/watch?v=4gVF7XW2bPw">https://www.youtube.com/watch?v=4gVF7XW2bPw</a></p>\n<p>**<br />\nGet to know us:**</p>\n<p><strong>1. Our team is global, and everyone works remotely</strong></p>\n<p>Our team lives all over the United States, Canada, United Kingdom, Russia, Netherlands, and Serbia. We have 12 permanent team members, and another 12 people who help out with smaller tasks. You can work remotely from anywhere in the world as long as you're available during the day (EST time) for collaboration over Slack</p>\n<p><strong>2. We hire great developers and have a long track record of success</strong></p>\n<ul>\n<li>The company was started by a developer, so he can read your code and help you solve problems</li>\n<li>The first Mac developer who joined the team 12 years ago is still on the team, working on new products</li>\n<li>We never outsourced our software development to other companies. We own and maintain 100% of our source code, so we know it inside out and can help you learn it faster</li>\n<li>We've written 30+ codebases with just 2-3 developers on each one. We work in small teams (1-3 developers, 1 QA, 1 designer on each task)</li>\n<li>You will have a healthy live-work balance. We don't&nbsp;use crunch time</li>\n<li>Our team is kind and talented. Our developers&nbsp;always&nbsp;collaborate well with each other</li>\n<li>We&nbsp;prioritize quality because we're in it for the long term  </li>\n</ul>\n<p><strong>3. You'll learn a lot from this job</strong></p>\n<p>Our software is more complex than most products.&nbsp;You'll learn a lot from working on it.</p>\n<p>Your teammates are friendly, talented and polite. If you're looking for collaborators and mentors, you'll find them.  </p>\n<p>**<br />\n4. Our goal is to teach&nbsp;our fans how to compose great music**</p>\n<p>We launched our new product called&nbsp;<a href="https://mixedinkey.com/captain-plugins/">Captain Plugins</a>. Magazine press and our fans loved it, so we have a wish list of&nbsp;hundreds of feature requests and ideas on what to build next.&nbsp;That is why we're hiring -- we have a lot of interesting work</p>\n<p>Here's the&nbsp;<a href="https://www.youtube.com/watch?v=4gVF7XW2bPw&list=PLcyutjSZFlPpsgT0MPj6fFaa57EZo_Zhe">YouTube&nbsp;promo</a>&nbsp;showing how the plugin works.</p>\n<p>One of the best testimonials we've gotten is that "These plugins close the door on the past." They are a brand-new way to write music and create songs from scratch.</p>\n<p><strong>5. Skills & requirements</strong></p>\n<p>1) A very solid understanding of Objective-C</p>\n<p>2) Some knowledge of Swift</p>\n<p>3) Optional, but nice to have: C++ knowledge, so you can integrate audio engines with&nbsp;new front-ends written in Obj-C</p>\n<p>4) Any experience in CoreAudio and/or AVFoundation would be a big plus</p>\n<p>5) Doing something hard -&nbsp;like 3D rendering, or OS-level stuff, or&nbsp;anything else that goes beyond making basic iOS apps</p>\n<p>6) Knowledge of music and music theory is helpful but not required</p>\n<p>7)&nbsp;Natural curiosity for how things work</p>\n<p>8) Taking a lot of initiative. This is part of the job requirement - we hire people who take initiative</p>\n<p>9) Desire to work from home. You&nbsp;can work 4 days a week (Tuesday-Friday, or Monday-Thursday), or 5 days a week depending on your preference. We don't hire for less than 32 hours per week</p>\n<p><strong>Send us an email</strong></p>\n<p>We're not a big anonymous corporation, we're a small team of developers who love making music tools. If you want to join us, send us an email at the address below.&nbsp;Show us your work.</p>\n<p>**<br />\nIf you match our requirements, you can apply here:** <a href="https://mixedinkey.recruiterbox.com/jobs/fk01yya?source=StackOverflow">https://mixedinkey.recruiterbox.com/jobs/fk01yya?source=StackOverflow</a></p>	objective-c swift macos core-data audio	(GMT-05:00) Eastern Time +/- 6 hours	\N	\N	https://stackoverflow.com/jobs/235026/watch-the-video-award-winning-music-software-mixed-in-key?a=1gORJIfaBbjy&so=p&pg=1&offset=1&total=202&r=true	1
160	1acoq-remote-react-rails-engineer-aha	React + Rails Engineer	2019-03-02 08:05:51.627078+01	2019-03-02 08:05:51.608+01	33	\N	\N	\N	\N	aha	Aha!	\N	\N	\N	\N	Are you an Engineer looking to revolutionize the way people roadmap and launch products that customers love? Do you want to create something that will change the way people think about innovation, and work with cutting-edge visualization, collaboration, and social ideation technologies at the same time? We are looking for highly ambitious engineers who want to work on major aspects of the Aha! product — from the back-end through to the end user experience. If this is you, we want to hear from you!\n\nAs a Rails Engineer at Aha!, you will have an excellent opportunity to join a breakthrough and profitable company that is growing fast. Aha! was founded by a proven team of product and marketing experts. More than 250,000 users worldwide trust Aha! to set brilliant strategy, capture customer ideas, create visual roadmaps, and manage breakthrough marketing programs.\n\n**We are looking for someone who:**\n\n*   Is experienced in Ruby-on-Rails\n*   Wants to work on a major aspect of product functionality from back-end algorithms through to the user interface\n*   Wants to be great and work in a fast-moving, online environment where the end-user is key\n*   Has a computer science degree or demonstrated experience solving challenging CS problems\n\n**We are committed to being great, and we want someone who:**\n\n*   Can work at a fast-paced company where the feedback cycle is measured in hours rather than weeks\n*   Has a "get it done" attitude and a background of delivering superb work again and again\n*   Is seeking a career-defining opportunity and a proven, results-oriented team that has sold multiple software companies\n\n_We are building a distributed team, and you can work from anywhere in North America for this role. We offer generous salary, equity, benefits, and a profit-sharing program._	<p>Are you an Engineer looking to revolutionize the way people roadmap and launch products that customers love? Do you want to create something that will change the way people think about innovation, and work with cutting-edge visualization, collaboration, and social ideation technologies at the same time? We are looking for highly ambitious engineers who want to work on major aspects of the Aha! product — from the back-end through to the end user experience. If this is you, we want to hear from you!</p>\n<p>As a Rails Engineer at Aha!, you will have an excellent opportunity to join a breakthrough and profitable company that is growing fast. Aha! was founded by a proven team of product and marketing experts. More than 250,000 users worldwide trust Aha! to set brilliant strategy, capture customer ideas, create visual roadmaps, and manage breakthrough marketing programs.</p>\n<p><strong>We are looking for someone who:</strong></p>\n<ul>\n<li>Is experienced in Ruby-on-Rails</li>\n<li>Wants to work on a major aspect of product functionality from back-end algorithms through to the user interface</li>\n<li>Wants to be great and work in a fast-moving, online environment where the end-user is key</li>\n<li>Has a computer science degree or demonstrated experience solving challenging CS problems</li>\n</ul>\n<p><strong>We are committed to being great, and we want someone who:</strong></p>\n<ul>\n<li>Can work at a fast-paced company where the feedback cycle is measured in hours rather than weeks</li>\n<li>Has a "get it done" attitude and a background of delivering superb work again and again</li>\n<li>Is seeking a career-defining opportunity and a proven, results-oriented team that has sold multiple software companies</li>\n</ul>\n<p><em>We are building a distributed team, and you can work from anywhere in North America for this role. We offer generous salary, equity, benefits, and a profit-sharing program.</em></p>	ruby-on-rails javascript postgresql reactjs d3.js	\N	\N	\N	https://stackoverflow.com/jobs/243587/react-plus-rails-engineer-aha?a=1jGSdM9r1s2c&so=p&pg=1&offset=2&total=202&r=true	1
161	bec5q-remote-wordpress-developer-self-decode	Wordpress Developer	2019-03-02 08:05:52.402034+01	2019-03-02 08:05:52.391+01	34	\N	\N	\N	\N	self-decode	Self Decode	\N	50000	80000	\N	****About Us:****\n\nWe are a fast-growing and leading company in the personalized health space. We build software to help interpret peoples’ genetics, lab tests, and symptoms in order to give personalized health recommendations.\n\n*   Our primary goal is to give people the tools they need to live a healthier and better life\n*   We are a flat organization and prioritize efficiency\n*   We work as a team and every input and suggestion is taken into account, no matter who it comes from\n*   We thrive on open communication and dedication\n*   We are a meritocracy and people who show good abilities can move up in the organization fast.  \n      \n    \n\n**Our three companies:**\n\n  \n[**Selfhacked.com**](https://www.selfhacked.com/) - With over 1.5 million visitors per month, SelfHacked is the best source of scientific information on supplements and health topics with integrity, no agenda or ideology. We strive for completeness and accuracy, and we work to make it accessible for everyone. The SelfHacked team includes 4 PhDs, 1 PharmD, 2 PhD students, 2 MS in biology, and a few biochemistry graduates.  \n[**SelfDecode.com**](https://www.selfdecode.com/) - We analyze people's DNA (over 15,000 users so far) and symptoms and give them health recommendations based on their DNA that are simple and easy to understand using our custom-built algorithms.\n\n[**LabTestAnalyzer.com**](https://www.labtestanalyzer.com/) - Provides high-quality, science-backed information and lifestyle, diet, and supplement recommendations based on lab test results.  \n  \n\nWe are very selective in our process because we look for a very long-term, full-time partnership with our employees.\n\nWe try to keep the process as short as possible so that we don't waste anyone's time. We've designed our tests and procedures so that if someone doesn't score above a certain threshold for a given segment, they are booted from the application process early. Most people will not spend more than 10 min of their time on our process. People who do well keep progressing and ultimately get hired and love working for our company!\n\nIf this is the type of company you want to be a part of, apply now!\n\n****Job Type and Pay:****\n\nWe are looking for a talented WordPress developer. Pay will be in accordance with abilities and experience.\n\n*   Full-time only\n*   Position is remote\n*   No agencies\n*   Must work a minimum of 4 hours within PST time zone between 9AM to 8PM PST\n\n****Required Duties & Skills:****\n\n*   Writing clean, readable code\n*   At least 3 Years of experience with web development in WordPress\n*   Experience with PHP and HTML/CSS\n*   Strong English-language communication skills\n*   The ability to work independently and as part of a team is essential\n\n****Strong Plusses:****\n\n*   Experience with the following plugins: W3, Yoast SEO, Jetpack, Wordpress Social Login\n*   Experience in working with third-party services like Leadpages and Onesignal\n*   Experience with implementing and maintaining paywalls\n*   Prior experience with remote work and working for a startup\n*   3+ years professional experience in Wordpress	<p><strong><em><em>About Us:</em></strong></em></p>\n<p>We are a fast-growing and leading company in the personalized health space. We build software to help interpret peoples’ genetics, lab tests,&nbsp;and symptoms in order to give personalized health recommendations.</p>\n<ul>\n<li>Our primary goal is to give people the tools they need to live a healthier and better life</li>\n<li>We are a flat organization and prioritize efficiency</li>\n<li>We work as a team and every input and suggestion is taken into account, no matter who it comes from</li>\n<li>We thrive on open communication and dedication</li>\n<li>We are a meritocracy and people who show good abilities can move up in the organization fast.  </li>\n</ul>\n<p><strong>Our three companies:</strong></p>\n<p><a href="https://www.selfhacked.com/"><strong>Selfhacked.com</strong></a> - With over 1.5 million visitors per month, SelfHacked is the best source of scientific information on supplements and health topics with integrity, no agenda or ideology. We strive for completeness and accuracy, and we work to make it accessible for everyone. The SelfHacked team includes 4 PhDs, 1 PharmD, 2 PhD students, 2 MS in biology, and a few biochemistry graduates.<br />\n<a href="https://www.selfdecode.com/"><strong>SelfDecode.com</strong></a> - We analyze people's DNA (over 15,000 users so far) and symptoms and give them health recommendations based on their DNA that are simple and easy to understand using our custom-built algorithms.</p>\n<p><a href="https://www.labtestanalyzer.com/"><strong>LabTestAnalyzer.com</strong></a> - Provides high-quality, science-backed information and lifestyle, diet, and supplement recommendations based on lab test results.  </p>\n<p>We are very selective in our process because we look for a very long-term, full-time partnership with our employees.</p>\n<p>We try to keep the process as short as possible so that we don't waste anyone's time. We've designed our tests and procedures so that if someone doesn't score above a certain threshold for a given segment, they are booted from the application process early. Most people will not spend more than 10 min of their time on our process. People who do well keep progressing and ultimately get hired and love working for our company!</p>\n<p>If this is the type of company you want to be a part of, apply now!</p>\n<p><strong><em><em>Job Type and Pay:</em></strong></em></p>\n<p>We are looking for a talented WordPress developer. Pay will be in accordance with abilities and experience.</p>\n<ul>\n<li>Full-time only</li>\n<li>Position is remote</li>\n<li>No agencies</li>\n<li>Must work a minimum of 4 hours within PST time zone between 9AM to 8PM PST</li>\n</ul>\n<p><strong><em><em>Required Duties & Skills:</em></strong></em></p>\n<ul>\n<li>Writing clean, readable code</li>\n<li>At least 3 Years of experience with web development in WordPress</li>\n<li>Experience with PHP and HTML/CSS</li>\n<li>Strong English-language communication skills</li>\n<li>The ability to work independently and as part of a team is essential</li>\n</ul>\n<p><strong><em><em>Strong Plusses:</em></strong></em></p>\n<ul>\n<li>Experience with the following plugins: W3, Yoast SEO, Jetpack, Wordpress Social Login</li>\n<li>Experience in working with third-party services like Leadpages and Onesignal</li>\n<li>Experience with implementing and maintaining paywalls</li>\n<li>Prior experience with remote work and working for a startup</li>\n<li>3+ years professional experience in Wordpress</li>\n</ul>	wordpress php html5 css3	\N	                                $50k - 80k                            	$	https://stackoverflow.com/jobs/230228/wordpress-developer-self-decode?a=1fd6m2ctudos&so=p&pg=1&offset=3&total=202&r=true	1
162	bu5um-remote-beats-golang-engineer-elastic	Beats - Golang Engineer	2019-03-02 08:05:53.205639+01	2019-03-02 08:05:53.198+01	35	\N	\N	\N	\N	elastic	Elastic	\N	\N	\N	\N	At Elastic, we have a simple goal: to solve the world's data problems with products that delight and inspire. As the company behind the popular open source projects — Elasticsearch, Kibana, Logstash, and Beats — we help people around the world do great things with their data. From stock quotes to Twitter streams, Apache logs to WordPress blogs, our products are extending what's possible with data, delivering on the promise that good things come from connecting the dots. The Elastic family unites employees across 30+ countries into one coherent team, while the broader community spans across over 100 countries.\n\nThe Beats platform is the basis for building open source shippers that collect all kinds of operational data, store it in Elasticsearch, and visualize it with Kibana. They collect data from edge servers, and are used to power application monitoring, infrastructure monitoring, and network monitoring. We currently have five official Beats: Filebeat for gathering logs, Packetbeat for network traffic, Metricbeat for metrics, Winlogbeat for Windows event logs, Heartbeat for uptime monitoring, and Auditbeat for audit data. In addition, the open-source community has created over 40 Beats, collecting data from all sorts of sources.\n\nAll current Beats are written in Golang.\n\nAs part of the Beats team, you will be responsible for maintaining the official Beats, for creating new ones, as well as for supporting the community around Beats. The team is diverse and distributed across the world, and collaborates on daily basis over Github, Zoom, and Slack.\n\n*   Write open source Golang code for maintaining different Beats.\n*   Dive into new technologies and figure out how to best monitor them.\n*   Define and create new Beats.\n*   Work with our support team to help customers.\n*   Answer community questions.\n*   Collaborate with other development teams, quality engineering team and documentation team to execute on product deliverables.\n\n**Skills you will bring along**\n\n*   BS, MS or PhD in Computer Science or related engineering discipline and 5+ years of industry experience.\n*   Experience building systems in Go, C, C++, Java or other systems language\n*   Strong Go language knowledge\n*   Experience with either windows, Linux, k8s, or docker\n*   Open source experience is a plus\n*   Large-scale systems development is a plus\n*   Operational experience with monitoring systems would be very welcome.\n*   Excellent verbal and written communication skills, a great teammate with strong analytical, problem solving, debugging,\n*   and troubleshooting skills.\n*   Ability to work in a distributed team throughout the world.\n*   Knowledge and experience in Elasticsearch, Beats, Logstash, Distributed Systems is a plus.\n\n**Additional Information:**\n\n*   Competitive pay and benefits\n*   Stock options\n*   Catered lunches, snacks, and beverages in most offices\n*   An environment in which you can balance great work with a great life\n*   Passionate people building great products\n*   Employees with a wide variety of interests\n*   Your age is only a number. It doesn't matter if you're just out of college or your children are; we need you for what you can do.\n*   Distributed-first company with employees in over 30 countries, spread across 18 time zones, and speaking over 30 languages! Some even fly south for the winter :)\n\n#LI-MC1 \n\nElastic is an Equal Employment employer committed to the principles of equal employment opportunity and affirmative action for all applicants and employees. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender perception or identity, national origin, age, marital status, protected veteran status, or disability status or any other basis protected by federal, state or local law, ordinance or regulation. Elastic also makes reasonable accommodations for disabled employees consistent with applicable law.	<p>At Elastic, we have a simple goal: to solve the world's data problems with products that delight and inspire. As the company behind the popular open source projects — Elasticsearch, Kibana, Logstash, and Beats — we help people around the world do great things with their data. From stock quotes to Twitter streams, Apache logs to WordPress blogs, our products are extending what's possible with data, delivering on the promise that good things come from connecting the dots. The Elastic family unites employees across 30+ countries into one coherent team, while the broader community spans across over 100 countries.</p>\n<p>The Beats platform is the basis for building open source shippers that collect all kinds of operational data, store it in Elasticsearch, and visualize it with Kibana. They collect data from edge servers, and are used to power application monitoring, infrastructure monitoring, and network monitoring. We currently have five official Beats: Filebeat for gathering logs, Packetbeat for network traffic, Metricbeat for metrics, Winlogbeat for Windows event logs, Heartbeat for uptime monitoring, and Auditbeat for audit data. In addition, the open-source community has created over 40 Beats, collecting data from all sorts of sources.</p>\n<p>All current Beats are written in Golang.</p>\n<p>As part of the Beats team, you will be responsible for maintaining the official Beats, for creating new ones, as well as for supporting the community around Beats. The team is diverse and distributed across the world, and collaborates on daily basis over Github, Zoom, and Slack.</p>\n<ul>\n<li>Write open source Golang code for maintaining different Beats.</li>\n<li>Dive into new technologies and figure out how to best monitor them.</li>\n<li>Define and create new Beats.</li>\n<li>Work with our support team to help customers.</li>\n<li>Answer community questions.</li>\n<li>Collaborate with other development teams, quality engineering team and documentation team to execute on product deliverables.</li>\n</ul>\n<p><strong>Skills you will bring along</strong></p>\n<ul>\n<li>BS, MS or PhD in Computer Science or related engineering discipline and 5+ years of industry experience.</li>\n<li>Experience building systems in Go, C, C++, Java or other systems language</li>\n<li>Strong Go language knowledge</li>\n<li>Experience with either&nbsp;windows, Linux, k8s, or docker</li>\n<li>Open source experience is a plus</li>\n<li>Large-scale systems development is a plus</li>\n<li>Operational experience with monitoring systems would be very welcome.</li>\n<li>Excellent verbal and written communication skills, a great teammate with strong analytical, problem solving, debugging,</li>\n<li>and troubleshooting skills.</li>\n<li>Ability to work in a distributed team throughout the world.</li>\n<li>Knowledge and experience in Elasticsearch, Beats, Logstash, Distributed Systems is a plus.</li>\n</ul>\n<p><strong>Additional Information:</strong></p>\n<ul>\n<li>Competitive pay and benefits</li>\n<li>Stock options</li>\n<li>Catered lunches, snacks, and beverages in most offices</li>\n<li>An environment in which you can balance great work with a great life</li>\n<li>Passionate people building great products</li>\n<li>Employees with a wide variety of interests</li>\n<li>Your age is only a number. It doesn't matter if you're just out of college or your children are; we need you for what you can do.</li>\n<li>Distributed-first company with employees in over 30 countries, spread across 18 time zones, and speaking over 30 languages! Some even fly south for the winter :)</li>\n</ul>\n<h1 id="limc1nbsp">LI-MC1&nbsp;</h1>\n<p>Elastic is an Equal Employment employer committed to the principles of equal employment opportunity and affirmative action for all applicants and employees. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender perception or identity, national origin, age, marital status, protected veteran status, or disability status or any other basis protected by federal, state or local law, ordinance or regulation. Elastic also makes reasonable accommodations for disabled employees consistent with applicable law.</p>	go windows c c++ linux	\N	\N	\N	https://stackoverflow.com/jobs/234922/beats-golang-engineer-elastic?a=1gMHFdFbJqI8&so=p&pg=1&offset=4&total=202&r=true	1
163	7vkwp-remote-analytics-be-engineer-toptal	Analytics BE Engineer	2019-03-02 08:05:54.220347+01	2019-03-02 08:05:54.214+01	36	\N	\N	\N	\N	toptal	Toptal	\N	\N	\N	\N	At Toptal, we measure everything and always rely on data to guide all of our initiatives, including both our long-term strategy and our day-to-day operations.\n\nAs a BackEnd Engineer, your main goal is to be one step ahead of data engineers, data scientists, and analysts, and support them by providing infrastructure and tools they can use to deliver end-to-end solutions to business problems that can be developed rapidly and maintained easily. We need innovation, creativity, and solutions that will have significant impact on our velocity. We, in turn, will give you autonomy and freedom to turn your ideas into reality.\n\nThis is a remote position that can be done from anywhere.\n\n**Responsibilities:**\n\nYou will build a scalable, highly performant infrastructure for delivering clear business insights from a variety of raw data sources. You will develop batch & real-time analytical solutions, prototypes, and proofs of concept for selected solutions. You will implement complex analytical projects with a focus on collecting, managing, analyzing, and visualizing data. You will build tools and visualizations that will help operations to drive the business and react to possible issues in timely manner. You will also be in constant communication with team members and other relevant parties and convey results efficiently and clearly.\n\n**In the first week you will:**\n\n\\* Onboard and integrate into Toptal.\n\n\\* Rapidly begin learning about Toptal’s history, culture, and vision.\n\n**In the first month you will:**\n\n\\* Understand our team structure and workflow.\n\n\\* Complete necessary trainings.\n\n\\* Deliver your first tickets.\n\n**In the first three months you will:**\n\n\\* Get to know your team.\n\n\\* Understand our analytics architecture.\n\n\\* Start working on one or more projects.\n\n\\* Begin helping with estimations related to the projects with which you’re involved.\n\n\\* Begin collaborating with other departments.\n\n**In the first six months you will:**\n\n\\* Be completely familiar with the workflow and the team.\n\n\\* Begin to be part of on-call rotation.\n\n\\* Be fully integrated and a participant member of all workflow including, planning sessions, reviews, and retrospectives.\n\n**In the first year you will:**\n\n\\* Be on top off most of analytics initiatives and projects.\n\n\\* Participate in the hiring process of possible new team members.\n\n\\* Act as a representative of the team through an initiative, being responsible for talking with stakeholders, creating tickets, and coordinating expectations.\n\n\\* Propose technical and non-technical solutions and improvements.\n\n\\* Establish a relationship with product department and other stakeholders.\n\n**Requirements:**\n\n\\* Experience working with Scala.\n\n\\* Experience working with Python is a plus.\n\n\\* Familiarity with Google Cloud Platform (e.g. GCS and BigQuery) is a plus.\n\n\\* Experience working with Dimensional Modeling.\n\n\\* Familiarity with the basic principles of distributed computing and data modeling.\n\n\\* Outstanding communication and interpersonal skills.\n\n\\* Be excited about collaborating daily with your team and other groups while working via a distributed model.\n\n\\* Be eager to help your teammates, share your knowledge with them, and learn from them.\n\n\\* Be open to receiving constructive feedback.\n\n\\* You must be a world-class individual contributor to thrive at Toptal. You will not be here just to tell other people what to do.	<p>At Toptal, we measure everything and always rely on data to guide all of our initiatives, including both our long-term strategy and our day-to-day operations.</p>\n<p>As a BackEnd Engineer, your main goal is to be one step ahead of data engineers, data scientists, and analysts, and support them by providing infrastructure and tools they can use to deliver end-to-end solutions to business problems that can be developed rapidly and maintained easily. We need innovation, creativity, and solutions that will have significant impact on our velocity. We, in turn, will give you autonomy and freedom to turn your ideas into reality.</p>\n<p>This is a remote position that can be done from anywhere.</p>\n<p><strong>Responsibilities:</strong></p>\n<p>You will build a scalable, highly performant infrastructure for delivering clear business insights from a variety of raw data sources. You will develop batch &amp; real-time analytical solutions, prototypes, and proofs of concept for selected solutions. You will implement complex analytical projects with a focus on collecting, managing, analyzing, and visualizing data. You will build tools and visualizations that will help operations to drive the business and react to possible issues in timely manner. You will also be in constant communication with team members and other relevant parties and convey results efficiently and clearly.</p>\n<p><strong>In the first week you will:</strong></p>\n<p>* Onboard and integrate into Toptal.</p>\n<p>* Rapidly begin learning about Toptal’s history, culture, and vision.</p>\n<p><strong>In the first month you will:</strong></p>\n<p>* Understand our team structure and workflow.</p>\n<p>* Complete necessary trainings.</p>\n<p>* Deliver your first tickets.</p>\n<p><strong>In the first three months you will:</strong></p>\n<p>* Get to know your team.</p>\n<p>* Understand our analytics architecture.</p>\n<p>* Start working on one or more projects.</p>\n<p>* Begin helping with estimations related to the projects with which you’re involved.</p>\n<p>* Begin collaborating with other departments.</p>\n<p><strong>In the first six months you will:</strong></p>\n<p>* Be completely familiar with the workflow and the team.</p>\n<p>* Begin to be part of on-call rotation.</p>\n<p>* Be fully integrated and a participant member of all workflow including, planning sessions, reviews, and retrospectives.</p>\n<p><strong>In the first year you will:</strong></p>\n<p>* Be on top off most of analytics initiatives and projects.</p>\n<p>* Participate in the hiring process of possible new team members.</p>\n<p>* Act as a representative of the team through an initiative, being responsible for talking with stakeholders, creating tickets, and coordinating expectations.</p>\n<p>* Propose technical and non-technical solutions and improvements.</p>\n<p>* Establish a relationship with product department and other stakeholders.</p>\n<p><strong>Requirements:</strong></p>\n<p>* Experience working with Scala.</p>\n<p>* Experience working with Python is a plus.</p>\n<p>* Familiarity with Google Cloud Platform (e.g. GCS and BigQuery) is a plus.</p>\n<p>* Experience working with Dimensional Modeling.</p>\n<p>* Familiarity with the basic principles of distributed computing and data modeling.</p>\n<p>* Outstanding communication and interpersonal skills.</p>\n<p>* Be excited about collaborating daily with your team and other groups while working via a distributed model.</p>\n<p>* Be eager to help your teammates, share your knowledge with them, and learn from them.</p>\n<p>* Be open to receiving constructive feedback.</p>\n<p>* You must be a world-class individual contributor to thrive at Toptal. You will not be here just to tell other people what to do.</p>	scala python google-cloud-platform dimensional-modeling distributed-computing	\N	\N	\N	https://stackoverflow.com/jobs/243538/analytics-be-engineer-toptal?a=1jFR3jr3I5tS&so=p&pg=1&offset=5&total=202&r=true	1
164	u8plb-remote-remote-senior-software-engineer-typescript-and-node-flexhire	Remote Senior Software Engineer (Typescript & Node)	2019-03-02 08:05:55.020197+01	2019-03-02 08:05:55.015+01	37	\N	Eastern Time 	-5	\N	flexhire	Flexhire	\N	120000	140000	\N	In a "typical" day you could be implementing cloud services and client side applications that coordinate work between mobile robots, or authoring, testing, debugging reliable, production quality source code and participate in the design and architecture of major features.\n\nFor this role we are looking for:\n\n5 or more years of experience writing full stack software Experience consuming and/or designing REST APIs Experience with software design patterns and SOLID principles Knowledgeable about test driven development (TDD) Experience managing state transitions through complex business process logic Familiarity with a variety of languages and the interest and flexibility to pick up new ones. Our current cloud technology suite includes Typescript and NodeJS. Strong organizational, communication, and planning skills Enthusiasm to learn and be challenged on a daily basis Experience working in an Agile/Scrum environment is a plus Desire to work in a fast-paced environment Bonus: Experience building fault tolerant and scalable SaaS architectures and distributed systems; with Docker containers, messaging systems, caching and databases.\n\nTo apply directly for this job please go here: [https://flexhire.com/freelancer/job/senior-software-engineer](https://flexhire.com/freelancer/job/senior-software-engineer)	<p>In a "typical" day you could be implementing cloud services and client side applications that coordinate work between mobile robots, or authoring, testing, debugging reliable, production quality source code and participate in the design and architecture of major features.</p>\n<p>For this role we are looking for:</p>\n<p>5 or more years of experience writing full stack software Experience consuming and/or designing REST APIs Experience with software design patterns and SOLID principles Knowledgeable about test driven development (TDD) Experience managing state transitions through complex business process logic Familiarity with a variety of languages and the interest and flexibility to pick up new ones. Our current cloud technology suite includes Typescript and NodeJS. Strong organizational, communication, and planning skills Enthusiasm to learn and be challenged on a daily basis Experience working in an Agile/Scrum environment is a plus Desire to work in a fast-paced environment Bonus: Experience building fault tolerant and scalable SaaS architectures and distributed systems; with Docker containers, messaging systems, caching and databases.</p>\n<p>To apply directly for this job please go here: <a href="https://flexhire.com/freelancer/job/senior-software-engineer">https://flexhire.com/freelancer/job/senior-software-engineer</a></p>	typescript node.js angular angularjs express	(GMT-05:00) Eastern Time 	                                $120k - 140k                            	$	https://stackoverflow.com/jobs/243524/remote-senior-software-engineer-typescript-flexhire?a=1jFz0k5wtHk4&so=p&pg=1&offset=6&total=202&r=true	1
165	3th5d-remote-security-and-ux-analytics-schmiede-sucht-full-stack-web-profi-js,-wordpress-vast-limits-gmbh	Security- & UX-Analytics-Schmiede sucht Full Stack-Web-Profi (JS, WordPress)	2019-03-02 08:05:56.229686+01	2019-03-02 08:05:56.223+01	38	\N	Berlin 	1	\N	vast-limits-gmbh	vast limits GmbH	\N	60000	95000	\N	Wir sind eine erfolgreiche junge Softwarefirma, die organisch weiter wachsen möchte. Wir sind inhabergeführt, nicht fremdfinanziert und haben **spannende Unternehmenskunden** in fast 30 Ländern.\n\nWir sind der Überzeugung, dass Micromanagement tödlich ist für Kreativität und Produktivität. Wir bieten eine **offene Arbeitskultur**, in der die Mitarbeiter ihren Arbeitsort frei wählen können und sich den Tag selbst einteilen.\n\nWir entwickeln Software für die Unternehmens-IT, weil wir den Markt kennen und die Bedürfnisse von Fachabteilungen und Mitarbeitern verstehen. Wir wissen, wie IT-Profis arbeiten und welche Werkzeuge sie verwenden. Wir wissen auch, wie komplex ein großer Teil der Unternehmenssoftware ist. Wir wollen dazu beitragen, dass sich das ändert.\n\nUnser Produkt uberAgent bietet tiefe Einsichten in **User Experience** and Anwendungsperformance von physischen PCs und virtuellen Desktops. Mit Hilfe dieser Informationen optimieren unsere Kunden die Geschwindigkeit, Sicherheit und Stabilität der Endgeräte ihrer Mitarbeiter.\n\nDie Kombination aus **einfacher Bedienung** und wertvollen Metriken macht uberAgent zu einem Produkt, mit dem sehr gerne gearbeitet wird. Insofern passt es perfekt zu Splunk, einer leistungsfähigen und gleichzeitig benutzerfreundlichen Big Data-Plattform, die von uberAgent für Datenspeicherung und -visualisierung verwendet wird.\n\n**Deine Aufgaben**\n\n**Wir leben Qualität.** Bei uns gibt es keine Deadlines, keinen Stress, keinen Termindruck. Du bleibst „im Flow“ und machst das, was Du am besten kannst: großartige Software schreiben.\n\nDies ist eine Position mit unterschiedlichen, jeweils anspruchsvollen und spannenden Aufgaben.\n\nDu entwickelst unser **WordPress**\\-Dokumentations-Plugin vlDocs weiter, das WordPress um Fähigkeiten zum produkversionsspezifischen Publishing erweitert. vlDocs ist ein komplexes Plugin, das hervorragende WordPress-Kenntnisse erfordert.\n\nDarüber hinaus machst Du unsere Splunk-Dashboards mit modernen **Visualisierungen** noch benutzerfreundlicher. Splunks Benutzeroberfläche ist vollständig Browser-basiert und kann mit gängigen Web-Technologien erweitert werden.\n\nSofern es die Zeit erlaubt, erweiterst und verbesserst Du unser WordPress-basiertes Backend.\n\n**Das wünschen wir uns**\n\nDie einzigen Qualifikationen, die uns wirklich wichtig sind, sind der Drang, das bestmögliche Resultat zu erzielen und der Wunsch, jeden Tag etwas dazuzulernen.\n\nDaneben erwarten wir:\n\n*   Begeisterung für Softwareentwicklung\n*   Sehr gute Kenntnisse in JavaScript und PHP\n*   Sehr gute Kenntnisse moderner JavaScript-Frameworks\n*   Sehr gute Kenntnisse in WordPress\n*   Eigenständiges Arbeiten\n*   Hang zur Perfektion\n*   Sehr gute Deutsch- und Englischkenntnisse\n*   Hauptwohnsitz in Deutschland\n\nZusätzlich freuen wir uns über:\n\n*   Community-Engagement, Bloggen, Mitarbeit an freier Software (bitte schicke uns Links)	<p>Wir sind eine erfolgreiche junge Softwarefirma, die organisch weiter wachsen möchte. Wir sind inhabergeführt, nicht fremdfinanziert und haben <strong>spannende Unternehmenskunden</strong> in fast 30 Ländern.</p>\n<p>Wir sind der Überzeugung, dass Micromanagement tödlich ist für Kreativität und Produktivität. Wir bieten eine <strong>offene Arbeitskultur</strong>, in der die Mitarbeiter ihren Arbeitsort frei wählen können und sich den Tag selbst einteilen.</p>\n<p>Wir entwickeln Software für die Unternehmens-IT, weil wir den Markt kennen und die Bedürfnisse von Fachabteilungen und Mitarbeitern verstehen. Wir wissen, wie IT-Profis arbeiten und welche Werkzeuge sie verwenden. Wir wissen auch, wie komplex ein großer Teil der Unternehmenssoftware ist. Wir wollen dazu beitragen, dass sich das ändert.</p>\n<p>Unser Produkt uberAgent bietet tiefe Einsichten in <strong>User Experience</strong> and Anwendungsperformance von physischen PCs und virtuellen Desktops. Mit Hilfe dieser Informationen optimieren unsere Kunden die Geschwindigkeit, Sicherheit und Stabilität der Endgeräte ihrer Mitarbeiter.</p>\n<p>Die Kombination aus <strong>einfacher Bedienung</strong> und wertvollen Metriken macht uberAgent zu einem Produkt, mit dem sehr gerne gearbeitet wird. Insofern passt es perfekt zu Splunk, einer leistungsfähigen und gleichzeitig benutzerfreundlichen Big Data-Plattform, die von uberAgent für Datenspeicherung und -visualisierung verwendet wird.</p>\n<p><strong>Deine Aufgaben</strong></p>\n<p><strong>Wir leben Qualität.</strong> Bei uns gibt es keine Deadlines, keinen Stress, keinen Termindruck. Du bleibst „im Flow“ und machst das, was Du am besten kannst: großartige Software schreiben.</p>\n<p>Dies ist eine Position mit unterschiedlichen, jeweils anspruchsvollen und spannenden Aufgaben.</p>\n<p>Du entwickelst unser <strong>WordPress</strong>-Dokumentations-Plugin vlDocs weiter, das WordPress um Fähigkeiten zum produkversionsspezifischen Publishing erweitert. vlDocs ist ein komplexes Plugin, das hervorragende WordPress-Kenntnisse erfordert.</p>\n<p>Darüber hinaus machst Du unsere Splunk-Dashboards mit modernen <strong>Visualisierungen</strong> noch benutzerfreundlicher. Splunks Benutzeroberfläche ist vollständig Browser-basiert und kann mit gängigen Web-Technologien erweitert werden.</p>\n<p>Sofern es die Zeit erlaubt, erweiterst und verbesserst Du unser WordPress-basiertes Backend.</p>\n<p><strong>Das wünschen wir uns</strong></p>\n<p>Die einzigen Qualifikationen, die uns wirklich wichtig sind, sind der Drang, das bestmögliche Resultat zu erzielen und der Wunsch, jeden Tag etwas dazuzulernen.</p>\n<p>Daneben erwarten wir:</p>\n<ul>\n<li>Begeisterung für Softwareentwicklung</li>\n<li>Sehr gute Kenntnisse in JavaScript und PHP</li>\n<li>Sehr gute Kenntnisse moderner JavaScript-Frameworks</li>\n<li>Sehr gute Kenntnisse in WordPress</li>\n<li>Eigenständiges Arbeiten</li>\n<li>Hang zur Perfektion</li>\n<li>Sehr gute Deutsch- und Englischkenntnisse</li>\n<li>Hauptwohnsitz in Deutschland</li>\n</ul>\n<p>Zusätzlich freuen wir uns über:</p>\n<ul>\n<li>Community-Engagement, Bloggen, Mitarbeit an freier Software (bitte schicke uns Links)</li>\n</ul>	javascript php wordpress	(GMT+01:00) Berlin 	                                €60k - 95k                            	€	https://stackoverflow.com/jobs/243260/security-ux-analytics-schmiede-sucht-full-vast-limits-gmbh?a=1jA4FnxpODu0&so=p&pg=1&offset=7&total=202&r=true	1
166	4fmpm-remote-cloud-engineer-golang-elastic	Cloud Engineer- Golang	2019-03-02 08:05:57.021502+01	2019-03-02 08:05:57.015+01	35	\N	\N	\N	\N	elastic	Elastic	\N	\N	\N	\N	At Elastic, we have a simple goal: to pursue the world's data problems with products that delight and inspire. We help people around the world do exceptional things with their data. From stock quotes to Twitter streams, Apache logs to WordPress blogs, our products are extending what's possible with data, delivering on the promise that good things come from connecting the dots. Often, what you can do with our products is only limited by what you can dream up. We believe that diversity drives our vibe. We unite employees across 30+ countries into one unified team, while the broader community spans across over 100 countries.\n\nElastic’s Cloud product allows users to build new clusters or expand existing ones easily. This product is built on Docker based orchestration system to easily deploy and manage multiple Elastic Clusters.\n\n****What you will do:****\n\n*   Implement features to manage multiple Elasticsearch Clusters on top of Kubernetes.\n*   Develop software for our distributed systems and ES as a Service offerings\n*   Debugging meaningful technical issues inside a very deep and complex technical stack involving containers, microservices, etc on multiple platforms\n*   Collaborate with Elastic’s engineering teams like Elasticsearch, Kibana, Logstash, APM and Beats) to enable them to run on Cloud infrastructure\n*   Grow and share your interest in technical outreach (blog posts, tech papers, conference speaking, etc.)\n\n****What you bring along:****\n\n*   You are passionate about developing systems software in Golang and are excited to share this with your peers\n*   Interest in the JVM and prior experience with Java/Scala is a big plus\n*   Experience working with Kubernetes clusters in production and one or more Kubernetes operator frameworks is a big plus\n*   You care deeply about resiliency of the services and quality of the features you ship\n*   Experience or familiarity with Docker, and Cloud hosting environments (AWS, GCP, Azure, etc.)\n*   A self starter who has experience working across multiple technical teams and decision makers\n*   You love working with a diverse, worldwide team in a distributed work environment\n\n****Additional Information:****\n\n*   Competitive pay and benefits\n*   Equity\n*   Catered lunches, snacks, and beverages in most offices\n*   An environment in which you can balance great work with a great life\n*   Passionate people building great products\n*   Employees with a wide variety of interests\n*   Your age is only a number. It doesn't matter if you're just out of college or your children are; we need you for what you can do.\n\nElastic is an Equal Employment employer committed to the principles of equal employment opportunity and affirmative action for all applicants and employees. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender perception or identity, national origin, age, marital status, protected veteran status, or disability status or any other basis protected by federal, state or local law, ordinance or regulation. Elastic also makes reasonable accommodations for disabled employees consistent with applicable law.	<p>At Elastic, we have a simple goal: to pursue the world's data problems with products that delight and inspire. We help people around the world do exceptional things with their data. From stock quotes to Twitter streams, Apache logs to WordPress blogs, our products are extending what's possible with data, delivering on the promise that good things come from connecting the dots. Often, what you can do with our products is only limited by what you can dream up. We believe that diversity drives our vibe. We unite employees across 30+ countries into one unified team, while the broader community spans across over 100 countries.</p>\n<p>Elastic’s Cloud product allows users to build new clusters or expand existing ones easily. This product is built on Docker based orchestration system to easily deploy and manage multiple Elastic Clusters.</p>\n<p><strong><em><em>What you will do:</em></strong></em></p>\n<ul>\n<li>Implement features to manage multiple Elasticsearch Clusters on top of Kubernetes.</li>\n<li>Develop software for our distributed systems and ES as a Service offerings</li>\n<li>Debugging meaningful technical issues inside a very deep and complex technical stack involving containers, microservices, etc on multiple platforms</li>\n<li>Collaborate with Elastic’s engineering teams like Elasticsearch, Kibana, Logstash, APM and Beats) to enable them to run on Cloud infrastructure</li>\n<li>Grow and share your interest in technical outreach (blog posts, tech papers, conference speaking, etc.)</li>\n</ul>\n<p><strong><em><em>What you bring along:</em></strong></em></p>\n<ul>\n<li>You are passionate about developing systems software in Golang and are excited to share this with your peers</li>\n<li>Interest in the JVM and prior experience with Java/Scala is a big plus</li>\n<li>Experience working with Kubernetes clusters in production and one or more Kubernetes operator frameworks is a big plus</li>\n<li>You care deeply about resiliency of the services and quality of the features you ship</li>\n<li>Experience or familiarity with Docker, and Cloud hosting environments (AWS, GCP, Azure, etc.)</li>\n<li>A self starter who has experience working across multiple technical teams and decision makers</li>\n<li>You love working with a diverse, worldwide team in a distributed work environment</li>\n</ul>\n<p><strong><em><em>Additional Information:</em></strong></em></p>\n<ul>\n<li>Competitive pay and benefits</li>\n<li>Equity</li>\n<li>Catered lunches, snacks, and beverages in most offices</li>\n<li>An environment in which you can balance great work with a great life</li>\n<li>Passionate people building great products</li>\n<li>Employees with a wide variety of interests</li>\n<li>Your age is only a number. It doesn't matter if you're just out of college or your children are; we need you for what you can do.</li>\n</ul>\n<p>Elastic is an Equal Employment employer committed to the principles of equal employment opportunity and affirmative action for all applicants and employees. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender perception or identity, national origin, age, marital status, protected veteran status, or disability status or any other basis protected by federal, state or local law, ordinance or regulation. Elastic also makes reasonable accommodations for disabled employees consistent with applicable law.</p>	elasticsearch cloud docker	\N	\N	\N	https://stackoverflow.com/jobs/216322/cloud-engineer-golang-elastic?a=1axXjMb4wC08&so=p&pg=1&offset=8&total=202&r=true	1
167	dypfc-remote-cloud-cloud-go-engineer-elastic	Cloud- Cloud Go Engineer	2019-03-02 08:05:57.805399+01	2019-03-02 08:05:57.798+01	35	\N	\N	\N	\N	elastic	Elastic	\N	\N	\N	\N	At Elastic, we have a simple goal: to pursue the world's data problems with products that delight and inspire. We help people around the world do exceptional things with their data. From stock quotes to Twitter streams, Apache logs to WordPress blogs, our products are extending what's possible with data, delivering on the promise that good things come from connecting the dots. Often, what you can do with our products is only limited by what you can dream up. We believe that diversity drives our vibe. We unite employees across 30+ countries into one unified team, while the broader community spans across over 100 countries.\n\nElastic’s Cloud product allows users to build new clusters or expand existing ones easily. This product is built on Docker based orchestration system to easily deploy and manage multiple Elastic Clusters.\n\n**What you will do:**\n\n*   Implement features to manage multiple Elasticsearch Clusters on top of Kubernetes.\n*   Develop software for our distributed systems and ES as a Service offerings\n*   Debugging meaningful technical issues inside a very deep and complex technical stack involving containers, microservices, etc on multiple platforms\n*   Collaborate with Elastic’s engineering teams like Elasticsearch, Kibana, Logstash, APM and Beats) to enable them to run on Cloud infrastructure\n*   Grow and share your interest in technical outreach (blog posts, tech papers, conference speaking, etc.)\n\n**What you bring along:**\n\n*   You are passionate about developing systems software in Golang and are excited to share this with your peers\n*   Interest in the JVM and prior experience with Java/Scala is a big plus\n*   Experience working with Kubernetes clusters in production and one or more Kubernetes operator frameworks is a big plus\n*   You care deeply about resiliency of the services and quality of the features you ship\n*   Experience or familiarity with Docker, and Cloud hosting environments (AWS, GCP, Azure, etc.)\n*   A self starter who has experience working across multiple technical teams and decision makers\n*   You love working with a diverse, worldwide team in a distributed work environment\n\n**Additional Information:**\n\n*   Competitive pay and benefits\n*   Equity\n*   Catered lunches, snacks, and beverages in most offices\n*   An environment in which you can balance great work with a great life\n*   Passionate people building great products\n*   Employees with a wide variety of interests\n*   Your age is only a number. It doesn't matter if you're just out of college or your children are; we need you for what you can do.\n\nElastic is an Equal Employment employer committed to the principles of equal employment opportunity and affirmative action for all applicants and employees. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender perception or identity, national origin, age, marital status, protected veteran status, or disability status or any other basis protected by federal, state or local law, ordinance or regulation. Elastic also makes reasonable accommodations for disabled employees consistent with applicable law.	<p>At Elastic, we have a simple goal: to pursue the world's data problems with products that delight and inspire. We help people around the world do exceptional things with their data. From stock quotes to Twitter streams, Apache logs to WordPress blogs, our products are extending what's possible with data, delivering on the promise that good things come from connecting the dots. Often, what you can do with our products is only limited by what you can dream up. We believe that diversity drives our vibe. We unite employees across 30+ countries into one unified team, while the broader community spans across over 100 countries.</p>\n<p>Elastic’s Cloud product allows users to build new clusters or expand existing ones easily. This product is built on Docker based orchestration system to easily deploy and manage multiple Elastic Clusters.</p>\n<p><strong>What you will do:</strong></p>\n<ul>\n<li>Implement features to manage multiple Elasticsearch Clusters on top of Kubernetes.</li>\n<li>Develop software for our distributed systems and ES as a Service offerings</li>\n<li>Debugging meaningful technical issues inside a very deep and complex technical stack involving containers, microservices, etc on multiple platforms</li>\n<li>Collaborate with Elastic’s engineering teams like Elasticsearch, Kibana, Logstash, APM and Beats) to enable them to run on Cloud infrastructure</li>\n<li>Grow and share your interest in technical outreach (blog posts, tech papers, conference speaking, etc.)</li>\n</ul>\n<p><strong>What you bring along:</strong></p>\n<ul>\n<li>You are passionate about developing systems software in Golang and are excited to share this with your peers</li>\n<li>Interest in the JVM and prior experience with Java/Scala is a big plus</li>\n<li>Experience working with Kubernetes clusters in production and one or more Kubernetes operator frameworks is a big plus</li>\n<li>You care deeply about resiliency of the services and quality of the features you ship</li>\n<li>Experience or familiarity with Docker, and Cloud hosting environments (AWS, GCP, Azure, etc.)</li>\n<li>A self starter who has experience working across multiple technical teams and decision makers</li>\n<li>You love working with a diverse, worldwide team in a distributed work environment</li>\n</ul>\n<p><strong>Additional Information:</strong></p>\n<ul>\n<li>Competitive pay and benefits</li>\n<li>Equity</li>\n<li>Catered lunches, snacks, and beverages in most offices</li>\n<li>An environment in which you can balance great work with a great life</li>\n<li>Passionate people building great products</li>\n<li>Employees with a wide variety of interests</li>\n<li>Your age is only a number. It doesn't matter if you're just out of college or your children are; we need you for what you can do.</li>\n</ul>\n<p>Elastic is an Equal Employment employer committed to the principles of equal employment opportunity and affirmative action for all applicants and employees. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender perception or identity, national origin, age, marital status, protected veteran status, or disability status or any other basis protected by federal, state or local law, ordinance or regulation. Elastic also makes reasonable accommodations for disabled employees consistent with applicable law.</p>	kubernetes go amazon-web-services	\N	\N	\N	https://stackoverflow.com/jobs/234558/cloud-cloud-go-engineer-elastic?a=1gF8puDfHiBa&so=p&pg=1&offset=9&total=202&r=true	1
168	722ij-remote-quality-assurance-engineer-flexhire	Quality Assurance Engineer	2019-03-02 08:05:58.534143+01	2019-03-02 08:05:58.528+01	37	\N	Mountain Time - Chihuahua, Mazatlan	-7	4	flexhire	Flexhire	\N	25000	35000	\N	QA Job Description:  \nActively testing the scoring and performance of Adobe certification exams within the  \ndelivery system running on internal testing, stage and production environments,  \nMaintenance of accurate test cases and reporting of issues discovered.\n\nDuties:  \n\\- Confirming the validity of scoring rubrics  \n\\- Accessing and performing established test cases and plans in a variety of  \nenvironments.  \n\\- Prompt reporting of failed test cases to team members  \n\\- Working closely with a team of including other quality assurance technicians, software  \ndevelopers, content development managers, and project managers.\n\nMust have:  \n\\- Previous manual quality assurance experience with Web, Windows and Macintosh  \nexecutables  \n\\- Previous experience with Adobe CC versions of Photoshop, Illustrator and InDesign\n\nDesired:  \n\\- Previous experience with other Adobe CC applications (DreamWeaver, Animate,  \nPremier Pro, After Effects and others)  \n\\-Previous automated QA experience	<p>QA Job Description:<br />\nActively testing the scoring and performance of Adobe certification exams within the<br />\ndelivery system running on internal testing, stage and production environments,<br />\nMaintenance of accurate test cases and reporting of issues discovered.</p>\n<p>Duties:<br />\n- Confirming the validity of scoring rubrics<br />\n- Accessing and performing established test cases and plans in a variety of<br />\nenvironments.<br />\n- Prompt reporting of failed test cases to team members<br />\n- Working closely with a team of including other quality assurance technicians, software<br />\ndevelopers, content development managers, and project managers.</p>\n<p>Must have:<br />\n- Previous manual quality assurance experience with Web, Windows and Macintosh<br />\nexecutables<br />\n- Previous experience with Adobe CC versions of Photoshop, Illustrator and InDesign</p>\n<p>Desired:<br />\n- Previous experience with other Adobe CC applications (DreamWeaver, Animate,<br />\nPremier Pro, After Effects and others)<br />\n-Previous automated QA experience</p>	testing automated-tests qa adobe photoshop	(GMT-07:00) Mountain Time - Chihuahua, Mazatlan +/- 4 hours	                                $25k - 35k                            	$	https://stackoverflow.com/jobs/243209/quality-assurance-engineer-flexhire?a=1jz0V3LXKVLq&so=p&pg=1&offset=10&total=202&r=true	1
169	odz3i-remote-cloud-python-developer-elastic	Cloud- Python Developer	2019-03-02 08:05:59.397665+01	2019-03-02 08:05:59.39+01	35	\N	\N	\N	\N	elastic	Elastic	\N	\N	\N	\N	At Elastic, we have a simple goal: to pursue the world's data problems with products that delight and inspire. We help people around the world do exceptional things with their data. From stock quotes to Twitter streams, Apache logs to WordPress blogs, our products are extending what's possible with data, delivering on the promise that good things come from connecting the dots. Often, what you can do with our products is only limited by what you can dream up. We believe that diversity drives our vibe. We unite employees across 30+ countries into one unified team, while the broader community spans across over 100 countries.\n\nElastic’s Cloud product allows users to build new clusters or expand existing ones easily. This product is built on Docker based orchestration system to easily deploy and manage multiple Elastic Clusters.\n\n**What You Will Do:**\n\n*   Implement features to manage multiple Elasticsearch Clusters on top of our orchestration layer\n*   Own and manage services that supports functionality like self-service billing, forecasting and customer communications\n*   Add features to the backend services in Python that integrate Postgres DB, ZooKeeper and Elasticsearch data stores\n*   Collaborate with other teams in Cloud Infrastructure to develop scalable, automated solutions that drive our SaaS business\n*   Grow and share your interest in technical outreach (blog posts, tech papers, conference speaking, etc.)\n\n**What You Bring Along**\n\n*   Experience with Python as a programming language\n*   Experience writing SQL queries\n*   Experience integrating with systems such as Salesforce, Marketo, etc is a plus\n*   Experience or interest in working on SaaS billing or metering systems is a plus\n*   Good organizational skills and the ability to own and track projects which are critical to the business\n*   You care deeply about resiliency of the services and quality of the features you ship\n*   Experience with public Cloud environments (AWS, GCP, Azure, etc.)\n*   A self starter who has experience working across multiple technical teams and decision makers\n*   You love working with a diverse, worldwide team in a distributed work environment\n\n**Additional Information:**\n\n*   Competitive pay and benefits\n*   Equity\n*   Catered lunches, snacks, and beverages in most offices\n*   An environment in which you can balance great work with a great life\n*   Passionate people building great products\n*   Employees with a wide variety of interests\n*   Your age is only a number. It doesn't matter if you're just out of college or your children are; we need you for what you can do.\n\nElastic is an Equal Employment employer committed to the principles of equal employment opportunity and affirmative action for all applicants and employees. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender perception or identity, national origin, age, marital status, protected veteran status, or disability status or any other basis protected by federal, state or local law, ordinance or regulation. Elastic also makes reasonable accommodations for disabled employees consistent with applicable law.	<p>At Elastic, we have a simple goal: to pursue the world's data problems with products that delight and inspire. We help people around the world do exceptional things with their data. From stock quotes to Twitter streams, Apache logs to WordPress blogs, our products are extending what's possible with data, delivering on the promise that good things come from connecting the dots. Often, what you can do with our products is only limited by what you can dream up. We believe that diversity drives our vibe. We unite employees across 30+ countries into one unified team, while the broader community spans across over 100 countries.</p>\n<p>Elastic’s Cloud product allows users to build new clusters or expand existing ones easily. This product is built on Docker based orchestration system to easily deploy and manage multiple Elastic Clusters.</p>\n<p><strong>What You Will Do:</strong></p>\n<ul>\n<li>Implement features to manage multiple Elasticsearch Clusters on top of our orchestration layer</li>\n<li>Own and manage services that supports functionality like self-service billing, forecasting and customer communications</li>\n<li>Add features to the backend services in Python that integrate Postgres DB, ZooKeeper and Elasticsearch data stores</li>\n<li>Collaborate with other teams in Cloud Infrastructure to develop scalable, automated solutions that drive our SaaS business</li>\n<li>Grow and share your interest in technical outreach (blog posts, tech papers, conference speaking, etc.)</li>\n</ul>\n<p><strong>What You Bring Along</strong></p>\n<ul>\n<li>Experience with Python as a programming language</li>\n<li>Experience writing SQL queries</li>\n<li>Experience integrating with systems such as Salesforce, Marketo, etc is a plus</li>\n<li>Experience or interest in working on SaaS billing or metering systems is a plus</li>\n<li>Good organizational skills and the ability to own and track projects which are critical to the business</li>\n<li>You care deeply about resiliency of the services and quality of the features you ship</li>\n<li>Experience with public Cloud environments (AWS, GCP, Azure, etc.)</li>\n<li>A self starter who has experience working across multiple technical teams and decision makers</li>\n<li>You love working with a diverse, worldwide team in a distributed work environment</li>\n</ul>\n<p><strong>Additional Information:</strong></p>\n<ul>\n<li>Competitive pay and benefits</li>\n<li>Equity</li>\n<li>Catered lunches, snacks, and beverages in most offices</li>\n<li>An environment in which you can balance great work with a great life</li>\n<li>Passionate people building great products</li>\n<li>Employees with a wide variety of interests</li>\n<li>Your age is only a number. It doesn't matter if you're just out of college or your children are; we need you for what you can do.</li>\n</ul>\n<p>Elastic is an Equal Employment employer committed to the principles of equal employment opportunity and affirmative action for all applicants and employees. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender perception or identity, national origin, age, marital status, protected veteran status, or disability status or any other basis protected by federal, state or local law, ordinance or regulation. Elastic also makes reasonable accommodations for disabled employees consistent with applicable law.</p>	elasticsearch python cloud	\N	\N	\N	https://stackoverflow.com/jobs/219289/cloud-python-developer-elastic?a=1bxEfCiam2WY&so=p&pg=1&offset=11&total=202&r=true	1
170	ydcfp-remote-middle-or-senior-robotics-developer-/-specialist-aeolus-robotics	Middle or Senior Robotics Developer / Specialist	2019-03-02 08:06:00.44952+01	2019-03-02 08:06:00.444+01	39	\N	\N	\N	\N	aeolus-robotics	Aeolus Robotics	\N	\N	\N	\N	**Job Responsibilities**  \n  \nLead and/or collaborate in the design, development, and testing of robot algorithms, in one or more of these areas:  \n  \n\\- Robot motion, especially reactive planning and replanning techniques, and machine learning for skill acquisition.  \n\\- Robot vision, SIFT and other approaches to both face and object recognition, vision processing in service of SLAM, and surface modeling in service of manipulation.  \n\\- Manipulation and grasping, especially software compliant approaches that are compatible with a variety of grips and objects, e.g. a cupping motion, a pinching action, and a more generic grasp.  \n\\- Hardware design, especially of compliant end-effectors.   \n\\- ... and more ...\n\n**About you**\n\nYou are looking for the place to stretch yourself, able to work within a senior, highly performant product team, and aren't afraid of a challenge.  You are a self-starter with the motivation and skills needed to effectively operate on your own time in your own way while being responsive to the needs of your team mates and the team as a whole.\n\nYou love working on the metal and/or deep in low-level or scaled algorithmic code.  You are effective at quickly understanding and operating on algorithms taken from research in AI, Robotics, and Vision, or you have have experience with sensors, motors, and other devices.  You are comfortable working alongside experts in these areas, or are an expert yourself. You have a proven track record of delivering ideas into working prototypes at high velocity.  You have commercial/agile development teaming experience. You've architected some serious systems and may have even been a team lead.\n\n**Skill Set / Experience**\n\nWe welcome people with passion on designing robots to join us. Among [our whole bunch of positions](https://tinyurl.com/ydf3oto7) there may be one for you which reflects your dreams of perfect job so make sure you check every single one of them!\n\n**Flexible Hours & 100% Remote Work**\n\nYou can work in one of our offices (Taipei, Vienna or Wroclaw), but most of these roles permit 100% remote cooperation.\n\nYou will work in a scrum-based agile development cycle. You will be working alongside founders, researchers, and engineers to design and build first-generation robotic solutions for mass consumer adoption.\n\nWhether you prefer contract work or a permanent position, we can accommodate you.	<p><strong>Job Responsibilities</strong>  </p>\n<p>Lead and/or collaborate in the design, development, and testing of robot algorithms, in one or more of these areas:  </p>\n<p>- Robot motion, especially reactive planning and replanning techniques, and machine learning for skill acquisition.<br />\n- Robot vision, SIFT and other approaches to both face and object recognition, vision processing in service of SLAM, and surface modeling in service of manipulation.<br />\n- Manipulation and grasping, especially software compliant approaches that are compatible with a variety of grips and objects, e.g. a cupping motion, a pinching action, and a more generic grasp.<br />\n- Hardware design, especially of compliant end-effectors.&nbsp;<br />\n- … and more …</p>\n<p><strong>About you</strong></p>\n<p>You are looking for the place to stretch yourself, able to work within a senior, highly performant product team, and aren't afraid of a challenge. &nbsp;You are a self-starter with the motivation and skills needed to effectively operate on your own time in your own way while being responsive to the needs of your team mates and the team as a whole.</p>\n<p>You love working on the metal and/or deep in low-level or scaled algorithmic code. &nbsp;You are effective at quickly understanding and operating on algorithms taken from research in AI, Robotics, and Vision, or you have have experience with sensors, motors, and other devices. &nbsp;You are comfortable working alongside experts in these areas, or are an expert yourself. You have a proven track record of delivering ideas into working prototypes at high velocity. &nbsp;You have commercial/agile development teaming experience. You've architected some serious systems and may have even been a team lead.</p>\n<p><strong>Skill Set / Experience</strong></p>\n<p>We welcome people with passion on designing robots to join us. Among&nbsp;<a href="https://tinyurl.com/ydf3oto7">our whole bunch of positions</a> there may be one for you which reflects your dreams of perfect job so make sure you check every single one of them!</p>\n<p><strong>Flexible Hours & 100% Remote Work</strong></p>\n<p>You can work in one of our offices (Taipei, Vienna or Wroclaw), but most of these roles permit 100% remote cooperation.</p>\n<p>You will work in a scrum-based agile development cycle. You will be working alongside founders, researchers, and engineers to design and build first-generation robotic solutions for mass consumer adoption.</p>\n<p>Whether you prefer contract work or a permanent position, we can accommodate you.</p>	c c++ robotics computer-vision machine-learning	\N	\N	\N	https://stackoverflow.com/jobs/168922/middle-or-senior-robotics-developer-specialist-aeolus-robotics?a=UEnd88k9WM0&so=p&pg=1&offset=12&total=202&r=true	1
171	wij1r-remote-applied-computer-vision-engineer-mav-farm	Applied Computer Vision Engineer	2019-03-02 08:06:01.271049+01	2019-03-02 08:06:01.261+01	40	\N	Pacific Time 	-8	\N	mav-farm	Mav Farm	\N	100000	140000	t	Mav Farm is seeking a world-class computer vision expert to join our team in developing next generation products and platforms doing research and engineering at scale. We're applying cutting-edge computer vision algorithms to a wide range of media understanding challenges at Mav Farm.\n\nResponsibilities: \n\n*   Develop novel and accurate computer vision algorithms and systems, leveraging deep learning and machine learning on big data resources.\n*   Analyze and improve efficiency, scalability, and stability of various deployed systems.\n*   Collaborate with team members from the level of prototyping to the level of production.\n\nMinimum Qualifications: \n\n*   5+ years of experience in building, leading and specializing in large-scale commercial computer vision projects from the level of researching a prototype to the level of production.\n*   C/C++ rapid programming on Linux [OS.](http://os.experienced/)\n*   Experienced with training deep neural networks, prototyping in scripting languages like MATLAB, python, math performance libs (e.g. IPP, MKL), CPU optimization methods (e.g. assembly SIMD instructions)\n*   Published projects in the fields of machine learning, deep learning and/or computer vision.	<p>Mav Farm is seeking a world-class computer vision expert to join our team in developing next generation products and platforms doing research and engineering at scale. We're applying cutting-edge computer vision algorithms to a wide range of media understanding challenges at Mav Farm.</p>\n<p>Responsibilities:&nbsp;</p>\n<ul>\n<li>Develop novel and accurate computer vision algorithms and systems, leveraging deep learning and machine learning on big data resources.</li>\n<li>Analyze and improve efficiency, scalability, and stability of various deployed systems.</li>\n<li>Collaborate with team members from the level of prototyping to the level of production.</li>\n</ul>\n<p>Minimum Qualifications:&nbsp;</p>\n<ul>\n<li>5+ years of experience in building, leading and specializing in large-scale commercial computer vision projects from the level of researching a prototype to the level of production.</li>\n<li>C/C++ rapid programming on Linux <a href="http://os.experienced/">OS.</a></li>\n<li>Experienced with training deep neural networks, prototyping in scripting languages like MATLAB, python, math performance libs (e.g. IPP, MKL), CPU optimization methods (e.g. assembly SIMD instructions)</li>\n<li>Published projects in the fields of machine learning, deep learning and/or computer vision.</li>\n</ul>	c c++ python matlab tensorflow	(GMT-08:00) Pacific Time 	                                $100k - 140k                                     | Equity                            	$	https://stackoverflow.com/jobs/243191/applied-computer-vision-engineer-mav-farm?a=1jyDImkh1Rh6&so=p&pg=1&offset=13&total=202&r=true	1
172	6axar-remote-security-and-compliance-engineer-remote-platformsh	Security & Compliance Engineer (Remote)	2019-03-02 08:06:02.484528+01	2019-03-02 08:06:02.473+01	41	\N	Pacific Time 	-8	\N	platformsh	Platform.sh	\N	\N	\N	\N	**Mission**\n\nTo reinforce our commitment to customers’ privacy and security, for its PaaS solution, Platform.sh is looking for a** Security & Compliance Engineer **with a taste for Python and Go, excellent Linux system understanding, outstanding written English skills, experience working on PCI and/or SOC compliance, and a real hunger for the challenges of building compliant distributed systems. If you’re looking for an exciting, high-growth opportunity with an award-winning, cutting-edge company, this could be the job for you.\n\nThis position is well suited for engineers wanting to transition into a heavy security and compliance role. We are targeting developers/sys admins that like writing documentation and can function in a high performing, multithreaded environment.\n\nSecurity, privacy, and compliance controls are at the heart of what we do as our mission is to simplify the cloud. The job is to transform what is often regarded as red-tape and constraints to a well-oiled machine where everything is automated and where every constraint becomes a feature making the product better.\n\nDirectly reporting to our Data Protection Officer (VP), and in close interaction with our Chief Product Officer, CTO, VP of Infrastructure, and our Engineering and Customer Support teams.\n\n**In a given day you might be:**\n\n*   Acting as a technical liaison between the Security & Compliance department and our product, engineering, and operations staff.\n*   Creating documentation and processes in English to help satisfy compliance requirements.\n*   Evaluating, deploying, and creating, systems and tools that will enhance our support and operations efficiency.\n*   Supporting our data protection officer and compliance team with information requests, pen testing, disaster recovery, and related activities.\n*   Executing our security incident management process.\n*   Working with appropriate teams to deploy and operate security tools and solutions.\n*   Ensuring all systems, security applications, and services in environment are securely configured and managed through operating system appropriate security platforms and tools.\n*   Ensuring optimal operation of all security solutions and tools.\n\n**Qualifications:**\n\nMinimum Qualifications\n\n*   Excellent written English skills (as in, you could have been a tech writer or commercial author in another life)\n*   Experience with Linux (preferably Debian-based)\n*   Familiar with markdown\n*   Experience implementing PCI, SOC, or related\n*   Operate largely independently (go take that hill) with management support\n*   Juggle several requests at the same time\n*   Proven successful experience in an operations role\n*   Exposure to cloud services (AWS in particular)\n*   Understands how an OS works, knows networking, how git works, and the constraints of a distributed system\n*   Proficient in Python\n*   Has an understanding of\n\n*   Patch and Vulnerability Management process\n*   Principle of Least Privilege\n*   Incident response\n*   Identity and Access Management\n*   IPTABLES\n*   WAFs\n\nPreferred Qualifications\n\n*   Experience with containerization technologies (LXC/LXD, Docker)\n*   Experience with vendor management\n*   Experience with Puppet and Golang\n*   Demonstrated the ability to successfully manage cloud-based infrastructure for a fast growing organization\n*   Knowledge of Magento Ecommerce, Symfony, Drupal, eZ Platform, or Typo3\n*   Relational database skills\n*   Public speaking experience\n*   Ability to speak French or German a plus\n*   Ability to kick ass in Chess or beat Zork without using a map\n*   CISSP, CISM, Security+, GCED, GICSP, GCIH, SSCP, or CASP Certification or similar will get you moved to the top of the queue\n*   CIPM/E, CIPP/E, CIPM/E certification or similar will get you moved to the top of the queue\n*   Can bravely take on new challenges like a Gryffindor, analyzes problems like Ravenclaw, protects our infrastructure and client data like a Slytherin, and talks with clients like a Hufflepuff.\n\nSound Like a Good Fit? We’d love to talk to you!  \n\n**\\* This is a remote job.**	<p><strong>Mission</strong></p>\n<p>To reinforce our commitment to customers’ privacy and security, for its PaaS solution, Platform.sh is looking for a<strong>&nbsp;Security & Compliance Engineer&nbsp;</strong>with a taste for Python and Go, excellent Linux system understanding, outstanding written English skills, experience working on PCI and/or SOC compliance, and a real hunger for the challenges of building compliant distributed systems. If you’re looking for an exciting, high-growth opportunity with an award-winning, cutting-edge company, this could be the job for you.</p>\n<p>This position is well suited for engineers wanting to transition into a heavy security and compliance role. We are targeting developers/sys admins that like writing documentation and can function in a high performing, multithreaded environment.</p>\n<p>Security, privacy, and compliance controls are at the heart of what we do as our mission is to simplify the cloud. The job is to transform what is often regarded as red-tape and constraints to a well-oiled machine where everything is automated and where every constraint becomes a feature making the product better.</p>\n<p>Directly reporting to our Data Protection Officer (VP), and in close interaction with our Chief Product Officer, CTO, VP of Infrastructure, and our Engineering and Customer Support teams.</p>\n<p><strong>In a given day you might be:</strong></p>\n<ul>\n<li>Acting as a technical liaison between the Security &amp; Compliance department and our product, engineering, and operations staff.</li>\n<li>Creating documentation and processes in English to help satisfy compliance requirements.</li>\n<li>Evaluating, deploying, and creating, systems and tools that will enhance our support and operations efficiency.</li>\n<li>Supporting our data protection officer and compliance team with information requests, pen testing, disaster recovery, and related activities.</li>\n<li>Executing our security incident management process.</li>\n<li>Working with appropriate teams to deploy and operate security tools and solutions.</li>\n<li>Ensuring all systems, security applications, and services in environment are securely configured and managed through operating system appropriate security platforms and tools.</li>\n<li>Ensuring optimal operation of all security solutions and tools.</li>\n</ul>\n<p><strong>Qualifications:</strong></p>\n<p>Minimum Qualifications</p>\n<ul>\n<li><p>Excellent written English skills (as in, you could have been a tech writer or commercial author in another life)</p></li>\n<li><p>Experience with Linux (preferably Debian-based)</p></li>\n<li><p>Familiar with markdown</p></li>\n<li><p>Experience implementing PCI, SOC, or related</p></li>\n<li><p>Operate largely independently (go take that hill) with management support</p></li>\n<li><p>Juggle several requests at the same time</p></li>\n<li><p>Proven successful experience in an operations role</p></li>\n<li><p>Exposure to cloud services (AWS in particular)</p></li>\n<li><p>Understands how an OS works, knows networking, how git works, and the constraints of a distributed system</p></li>\n<li><p>Proficient in Python</p></li>\n<li><p>Has an understanding of</p></li>\n<li><p>Patch and Vulnerability Management process</p></li>\n<li><p>Principle of Least Privilege</p></li>\n<li><p>Incident response</p></li>\n<li><p>Identity and Access Management</p></li>\n<li><p>IPTABLES</p></li>\n<li><p>WAFs</p></li>\n</ul>\n<p>Preferred Qualifications</p>\n<ul>\n<li>Experience with containerization technologies (LXC/LXD, Docker)</li>\n<li>Experience with vendor management</li>\n<li>Experience with Puppet and Golang</li>\n<li>Demonstrated the ability to successfully manage cloud-based infrastructure for a fast growing organization</li>\n<li>Knowledge of Magento Ecommerce, Symfony, Drupal, eZ Platform, or Typo3</li>\n<li>Relational database skills</li>\n<li>Public speaking experience</li>\n<li>Ability to speak French or German a plus</li>\n<li>Ability to kick ass in Chess or beat Zork without using a map</li>\n<li>CISSP, CISM, Security+, GCED, GICSP, GCIH, SSCP, or CASP Certification or similar will get you moved to the top of the queue</li>\n<li>CIPM/E, CIPP/E, CIPM/E certification or similar will get you moved to the top of the queue</li>\n<li>Can bravely take on new challenges like a Gryffindor, analyzes problems like Ravenclaw, protects our infrastructure and client data like a Slytherin, and talks with clients like a Hufflepuff.</li>\n</ul>\n<p>Sound Like a Good Fit? We’d love to talk to you! &nbsp;</p>\n<p><strong>* This is a remote job.</strong></p>	security python go linux	(GMT-08:00) Pacific Time 	\N	\N	https://stackoverflow.com/jobs/234469/security-compliance-engineer-remote-platformsh?a=1gDhFUVlr6JG&so=p&pg=1&offset=14&total=202&r=true	1
173	cym8f-remote-backend-engineer-developers-care-team-heetch	Backend Engineer - Developers Care team	2019-03-02 08:06:03.249589+01	2019-03-02 08:06:03.242+01	42	\N	Paris	1	2	heetch	Heetch	\N	\N	\N	\N	****⚠️ **Before you read our awesome job posting, it's important to mention that yes we promote flexible and remote ways of working since day-1, however, we are still a young company iterating over our remote culture and we try to keep our time zones not too spread out.  \nTime zone -3h > **Paris - Time zone ** <  Time zone +3h **⚠️  \n**  \n**\n\n**Developers care (aka Boost) team at Heetch**\n\nThe top priority of our developer-driven team is to improve the productivity of other developers in the company by spotting generic needs across teams and addressing them in the most impactful way. Whether this is done by introducing a new technology or designing a creative solution to a problem shared by multiple teams, it's done through carefully collected feedbacks, analysis and is delivered iteratively, following closely open-source methodologies.\n\nFrom the inside, we're a caring team of engineers who share the same set of values:\n\n*   **Transparency**: We discuss everything openly.\n*   **Team Unity**: No one is left behind.\n*   **Move Fast**: No need to demonstrate for days, just do it.\n*   **Knowledge Sharing**: Whether it's organizational, cultural or technical, we're eager to learn!\n*   **It's OK to fail**: We succeed together, we learn together.\n\n**Your role**\n\nWith the very broad spectrum of challenges we're facing every week, our team is seeking an experienced and pragmatic developer to build solutions that will help Heetch to scale to its next level. You're the ideal candidate if you're an Elixir Engineer who loves building software for other developers (shiny documentation included!), have strong problem-solving skills and have great empathy for others.\n\n**What are our challenges?**\n\n*   Build the best local environment a developer could hope for while dealing with the complexities introduced by our growth and a micro-service architecture\n*   Build a simple yet powerful set of internal libraries for backend developers to help them to build their micro-services while never impeding their ability to make their own choices\n*   Design generic solutions to address challenges faced by multiple teams and open-source them\n*   Contribute to transitioning the backend architecture to an event-sourcing approach\n*   Constantly learn through a very broad scope of technologies, from Docker to Event-Sourcing and Functional Programming in order to spot the most impactful path to help the tech team\n\n**What will you do?**\n\n*   Build the backbone and tools for others to write services that handle millions of users\n*   Write top-notch documentation and support other developers\n*   Collect feedback and exchange with other teams through stellar communication\n*   Participate in code reviews and provide feedback to your colleagues\n*   Leave code better than you found it\n*   Create a positive environment for the people around you\n*   Lead by example\n*   Share knowledge with everyone and help your team to grow\n\n**What do you need?**\n\n*   Solid experience as a Backend Engineer in Go or Elixir  \n    🗝But much more than the languages, our focus will be on engineering skills (problem-solving, docs, testing, research, methodology)\n*   Ability to design elegant and usable public APIs\n*   Not to be afraid of leaving your comfort zone\n*   To understand that simple is not easy\n*   Feel comfortable crafting solutions in a polyglot environment \n*   Awareness and understanding of technical constraints as well as product constraints\n\n**Bonus**\n\n*   Knowledge about Event Sourcing, Kafka\n\n**Hiring process**\n\n*   Non-technical interview with the Engineering Manager of your potential team (1h30)\n*   Take home assignment (~5 days deadline)\n*   Interview with your future teammates (1h30)\n*   Day on site (Paris) to meet your future stakeholders\n\nCheck out our[ Engineering Blog](https://eng.heetch.com/) and follow our [twitter](https://twitter.com/heetcheng) :) You can also have a look at our open-source projects and contributions [here](https://oss.heetch.com/)	<p><strong>*<em>⚠️&nbsp;</strong>Before you read our awesome job posting, it's important to mention that yes we promote flexible and remote ways of working since day-1, however, we are&nbsp;still a young company iterating&nbsp;over our remote culture and we try to keep&nbsp;our time zones not too spread out.<br />\nTime zone -3h &gt;&nbsp;<strong>Paris - Time zone&nbsp;</strong>&nbsp;<&nbsp; Time zone +3h&nbsp;</em>*⚠️<br />\n**<br />\n**</p>\n<p><strong>Developers care (aka Boost)&nbsp;team at Heetch</strong></p>\n<p>The top priority of our developer-driven team is to improve the productivity of other developers in the company by spotting generic needs across teams and addressing them in the most impactful way. Whether this is done by introducing a new technology or designing a creative solution to a problem shared by multiple teams, it's done through carefully collected feedbacks, analysis and is delivered iteratively, following closely open-source methodologies.</p>\n<p>From the inside, we're a caring team of engineers who share the same set of values:</p>\n<ul>\n<li><strong>Transparency</strong>: We discuss everything openly.</li>\n<li><strong>Team Unity</strong>: No one is left behind.</li>\n<li><strong>Move Fast</strong>: No need to demonstrate for days, just do it.</li>\n<li><strong>Knowledge Sharing</strong>: Whether it's organizational, cultural or technical, we're eager to learn!</li>\n<li><strong>It's OK to fail</strong>: We succeed together, we learn together.</li>\n</ul>\n<p><strong>Your role</strong></p>\n<p>With the very broad spectrum of challenges we're facing every week, our team is seeking an experienced and pragmatic developer to build solutions that will help Heetch to scale to its next level. You're the ideal candidate if you're an Elixir Engineer who loves building software for other developers (shiny documentation included!), have strong problem-solving skills and have great empathy for others.</p>\n<p><strong>What are our challenges?</strong></p>\n<ul>\n<li>Build the best local environment a developer could hope for while dealing with the complexities introduced by our growth and a micro-service architecture</li>\n<li>Build a simple yet powerful set of internal libraries for backend developers to help them to build their micro-services while never impeding their ability to make their own choices</li>\n<li>Design generic solutions to address challenges faced by multiple teams and open-source them</li>\n<li>Contribute to transitioning the backend architecture to an event-sourcing approach</li>\n<li>Constantly learn through a very broad scope of technologies, from Docker to Event-Sourcing and Functional Programming in order to spot the most impactful path to help the tech team</li>\n</ul>\n<p><strong>What will you do?</strong></p>\n<ul>\n<li>Build the backbone and tools for others to write services that handle millions of users</li>\n<li>Write top-notch documentation and support other developers</li>\n<li>Collect feedback and exchange with other teams through stellar communication</li>\n<li>Participate in code reviews and provide feedback to your colleagues</li>\n<li>Leave code better than you found it</li>\n<li>Create a positive environment for the people around you</li>\n<li>Lead by example</li>\n<li>Share knowledge with everyone and help your team to grow</li>\n</ul>\n<p><strong>What do you need?</strong></p>\n<ul>\n<li>Solid experience as a Backend Engineer in Go or Elixir<br />\n🗝But much more than the languages, our focus will be on engineering skills (problem-solving, docs, testing, research, methodology)</li>\n<li>Ability to design elegant and usable public APIs</li>\n<li>Not to be afraid of leaving your comfort zone</li>\n<li>To understand that simple is not easy</li>\n<li>Feel comfortable crafting solutions in a polyglot environment&nbsp;</li>\n<li>Awareness and understanding of technical constraints as well as product constraints</li>\n</ul>\n<p><strong>Bonus</strong></p>\n<ul>\n<li>Knowledge about Event Sourcing, Kafka</li>\n</ul>\n<p><strong>Hiring process</strong></p>\n<ul>\n<li>Non-technical interview with the Engineering Manager of your potential team (1h30)</li>\n<li>Take home assignment (~5 days deadline)</li>\n<li>Interview with your future teammates (1h30)</li>\n<li>Day on site (Paris) to meet your future stakeholders</li>\n</ul>\n<p>Check out our<a href="https://eng.heetch.com/">&nbsp;Engineering Blog</a>&nbsp;and follow our&nbsp;<a href="https://twitter.com/heetcheng">twitter</a>&nbsp;:) You can also have a look at our open-source projects and contributions&nbsp;<a href="https://oss.heetch.com/">here</a></p>	elixir go microservices event-sourcing	(GMT+01:00) Paris +/- 2 hours	\n                                Equity\n                            	\N	https://stackoverflow.com/jobs/192163/backend-engineer-developers-care-team-heetch?a=12rCxAgCNVUQ&so=p&pg=1&offset=15&total=202&r=true	1
174	o43dj-remote-frontend-developer-m/w/d-remote-hausgold-talocasa-gmbh	Frontend Developer (m/w/d) (Remote)	2019-03-02 08:06:04.042476+01	2019-03-02 08:06:04.033+01	43	\N	Berlin 	1	\N	hausgold-talocasa-gmbh	HAUSGOLD - talocasa GmbH	\N	\N	\N	\N	**HAUSGOLD** digitalisiert den Verkaufsprozess von Immobilien für Verkäufer, Käufer und Makler mit dem Ziel mehr Transparenz und Effizienz zu schaffen. Anfang 2014 gegründet, haben wir uns inzwischen zu einem der führenden Unternehmen der spezialisierten Maklersuche im deutschsprachigen Raum entwickelt. Mit unserem Service wenden wir uns in Deutschland, Österreich und der Schweiz an Immobilieneigentümer, die eine kompetente Beratung zum Immobilienverkauf benötigen.  Wir sind seit rund 3 Jahren auf dem Markt aktiv mit einem Team von nunmehr 60 Mitarbeitern. Unsere eigenentwickelte Software und eine professionelle Kundenbetreuung bilden zusammen mit unserem Netzwerk von mehreren tausend Maklern vor Ort eine einzigartige Basis für unser weiteres Wachstum.  \n  \nWir vergrößern unser Development-Team und suchen zum nächstmöglichen Zeitpunkt Dich als **Frontend Developer (m/w/d) im Hamburger Schanzenviertel / Remote**.\n\n**  \nWELCHE AUFGABEN AUF DICH WARTEN**\n\nAls **Frontend Developer** bei **HAUSGOLD** betreust und entwickelst Du in Zusammenarbeit mit Designern und Backend-Entwicklern responsive Interfaces für unsere Systeme. Dazu gehört unsere interne Software, genauso wie auch unser Makler-CRM-System HAUSGOLD Connect. Mit Deiner Erfahrung im Bereich der Frontend-Entwicklung unterstützt Du bei der Konzeption und Entwicklung unserer Systeme.  \n  \nEinen kleinen Einblick bekommst Du hier: **https://hausgold.github.io**\n\n**DEINE QUALIFIKATIONEN**\n\n*   Du hast fundierte Kenntnisse in der Entwicklung mit JavaScript und React\n*   Du bringst Erfahrung mit Responsive Webpage Development unter der Verwendung von Bootstrap mit SCSS mit\n*   Darüber hinaus hast Du Erfahrungen mit der Versionsverwaltung unter Git sowie Berührungspunkte mit automatisierten Test-Suites\n*   Konzentriertes und sorgfältiges Arbeiten sowie eine strukturierte und koordinierte Arbeitsweise runden Dein Profil ab\n\n**WAS WIR DIR BIETEN**\n\nDEINE BENEFITS\n\n*   Ein aufstrebendes Technologieprojekt mit professioneller Entwicklungsmethodik\n*   Eine anspruchsvolle und abwechslungsreiche Tätigkeit mit täglich neuen Herausforderungen\n*   Agile Softwareentwicklung\n*   Flexible und eigenverantwortliche Arbeitszeitgestaltung\n*   Ein freundliches Arbeitsumfeld in einer der schönsten Städte Deutschlands\n*   Frisches Obst und kostenlose Getränke\n*   Sympathisches und agiles Team, mit dem es Spaß macht zusammen zu arbeiten\n*   Regelmäßige Team-Events und die unternehmensübergreifende Gelegenheit zum fachlichen Austausch\n*   Du entscheidest selbst, mit welchem System Du am liebsten arbeiten möchtest: Mac, Linux, Windows - Du wählst und wir organisieren Dir Deinen Rechner\n\n**DARÜBER HINAUS SIND FOLGENDE KENNTNISSE VON VORTEIL**\n\n*   REST-APIs und TDD/BDD sind Dir ein Begriff\n*   Performance-optimierte Frontend-Umsetzung\n*   Erfahrungen mit agiler Softwareentwicklung\n*   Wenn Du darüber hinaus Erfahrung in der Konzeptionierung von Bedienkonzepten und ein Händchen für Frontend-Design hast, umso besser\n\n_Im Übrigen handeln wir nach der Maxime, dass man nicht alles schon können muss, aber gerne lernen möchte._\n\n**BEWERBUNG**\n\nDu bist Developer aus Leidenschaft und hast Lust Dich in unserem Internet-Startup einzubringen? Dann bewirb Dich [online](https://hausgold-jobs.personio.de/job/62720#apply) mit Deiner aussagekräftigen Bewerbung inklusive der Angabe Deines möglichen Eintrittstermins sowie Deiner Gehaltsvorstellung.  \n  \nDeine Ansprechpartnerin ist Lynda. Melde Dich gerne bei uns, falls Du Fragen zu Deiner Bewerbung hast.	<p><strong>HAUSGOLD</strong>&nbsp;digitalisiert den Verkaufsprozess von Immobilien für Verkäufer, Käufer und Makler mit dem Ziel mehr Transparenz und Effizienz zu schaffen. Anfang 2014 gegründet, haben wir uns inzwischen zu einem der führenden Unternehmen der spezialisierten Maklersuche im deutschsprachigen Raum entwickelt. Mit unserem Service wenden wir uns in Deutschland, Österreich und der Schweiz an Immobilieneigentümer, die eine kompetente Beratung zum Immobilienverkauf benötigen.&nbsp; Wir sind seit rund 3 Jahren auf dem Markt aktiv mit einem Team von nunmehr 60 Mitarbeitern. Unsere eigenentwickelte Software und eine professionelle Kundenbetreuung bilden zusammen mit unserem Netzwerk von mehreren tausend Maklern vor Ort eine einzigartige Basis für unser weiteres Wachstum.  </p>\n<p>Wir vergrößern unser Development-Team und suchen zum nächstmöglichen Zeitpunkt Dich als&nbsp;<strong>Frontend Developer (m/w/d) im Hamburger Schanzenviertel / Remote</strong>.</p>\n<p>**<br />\nWELCHE AUFGABEN AUF DICH WARTEN**</p>\n<p>Als&nbsp;<strong>Frontend Developer</strong>&nbsp;bei&nbsp;<strong>HAUSGOLD</strong>&nbsp;betreust und entwickelst Du in Zusammenarbeit&nbsp;mit Designern und Backend-Entwicklern&nbsp;responsive&nbsp;Interfaces für unsere Systeme. Dazu gehört unsere interne Software,&nbsp;genauso&nbsp;wie auch unser Makler-CRM-System HAUSGOLD Connect. Mit Deiner Erfahrung im Bereich der&nbsp;Frontend-Entwicklung unterstützt Du bei der Konzeption und&nbsp;Entwicklung&nbsp;unserer Systeme.  </p>\n<p>Einen kleinen Einblick bekommst Du hier: <strong><a href="https://hausgold.github.io">https://hausgold.github.io</a></strong></p>\n<p><strong>DEINE QUALIFIKATIONEN</strong></p>\n<ul>\n<li>Du hast fundierte Kenntnisse in der Entwicklung mit JavaScript und React</li>\n<li>Du bringst Erfahrung mit Responsive Webpage Development unter der Verwendung von Bootstrap mit SCSS mit</li>\n<li>Darüber hinaus hast Du Erfahrungen mit der Versionsverwaltung unter Git sowie Berührungspunkte mit automatisierten Test-Suites</li>\n<li>Konzentriertes und sorgfältiges Arbeiten sowie eine strukturierte und koordinierte Arbeitsweise runden Dein Profil ab</li>\n</ul>\n<p><strong>WAS WIR DIR BIETEN</strong></p>\n<p>DEINE BENEFITS</p>\n<ul>\n<li>Ein aufstrebendes Technologieprojekt mit professioneller Entwicklungsmethodik</li>\n<li>Eine anspruchsvolle und abwechslungsreiche Tätigkeit mit täglich neuen Herausforderungen</li>\n<li>Agile Softwareentwicklung</li>\n<li>Flexible und eigenverantwortliche Arbeitszeitgestaltung</li>\n<li>Ein freundliches Arbeitsumfeld in einer der schönsten Städte Deutschlands</li>\n<li>Frisches Obst und kostenlose Getränke</li>\n<li>Sympathisches und agiles Team, mit dem es Spaß macht zusammen zu arbeiten</li>\n<li>Regelmäßige Team-Events und die unternehmensübergreifende Gelegenheit zum fachlichen Austausch</li>\n<li>Du entscheidest selbst, mit welchem System Du am liebsten arbeiten möchtest: Mac, Linux, Windows - Du wählst und wir organisieren Dir Deinen Rechner</li>\n</ul>\n<p><strong>DARÜBER HINAUS SIND FOLGENDE KENNTNISSE VON VORTEIL</strong></p>\n<ul>\n<li>REST-APIs und TDD/BDD sind Dir ein Begriff</li>\n<li>Performance-optimierte Frontend-Umsetzung</li>\n<li>Erfahrungen mit agiler Softwareentwicklung</li>\n<li>Wenn Du darüber hinaus Erfahrung in der Konzeptionierung von Bedienkonzepten und ein Händchen für Frontend-Design hast, umso besser</li>\n</ul>\n<p><em>Im Übrigen handeln wir nach der Maxime, dass man nicht alles schon können muss, aber gerne lernen möchte.</em></p>\n<p><strong>BEWERBUNG</strong></p>\n<p>Du bist Developer aus Leidenschaft und hast Lust Dich in unserem Internet-Startup einzubringen? Dann bewirb Dich <a href="https://hausgold-jobs.personio.de/job/62720#apply">online</a> mit Deiner aussagekräftigen Bewerbung inklusive der Angabe Deines möglichen Eintrittstermins sowie Deiner Gehaltsvorstellung.  </p>\n<p>Deine Ansprechpartnerin ist Lynda. Melde Dich gerne bei uns, falls Du Fragen zu Deiner Bewerbung hast.</p>	reactjs javascript sass	(GMT+01:00) Berlin 	\N	\N	https://stackoverflow.com/jobs/201184/frontend-developer-m-w-d-remote-hausgold-talocasa-gmbh?a=15tc2rAv8IGQ&so=p&pg=1&offset=16&total=202&r=true	1
175	cmzym-remote-react-ruby-on-rails-engineer-hubstaff	React + Ruby on Rails Engineer	2019-03-02 08:06:05.276686+01	2019-03-02 08:06:05.268+01	44	\N	\N	\N	\N	hubstaff	Hubstaff	\N	70000	90000	\N	**Hubstaff is a fast-growing startup in the time tracking and project management space that fully embraces remote work.** You work when and where you want. We care a lot about our culture, having fun while working hard, and our annual retreats.\n\nWe are looking for a talented server engineer who has several years of experience in both React and Ruby on Rails to join our passionate development team and work on our up and coming task management product.\n\nThe correct person will take pride in their work, have extreme attention to detail, and be able to get their hands dirty implementing Rails controllers, React components, and doing HTML & CSS front-end work.\n\nWe are looking for a well-rounded React developer who has the backend chops to implement the server-side aspects of their projects using Ruby on Rails.\n\nThis position will report to our head of development for Hubstaff Tasks and work closely with our other engineers. You’ll be able to work 100% remotely, and we are looking for someone that can grow with our products for years to come.\n\nYou’ll be a good fit if you:\n\n*   Are self-disciplined and have a great work ethic\n*   Have good time management skills\n*   Communicate well\n*   Can work until at least 1pm EST M - F\n*   Like having a consistent daily work schedule\n*   Have at least three years of React and five years of Ruby on Rails experience\n\nFront-end Development Requirements:\n\n*   React & Redux\n*   Highly skilled with HTML & CSS\n*   Bootstrap\n*   Javascript & jQuery\n*   Git\n\nBackend Development Requirements:\n\n*   Ruby on Rails\n*   Postgres or MySQL\n*   Unit tests (rspec, Jest, etc.)\n*   Background workers (Sidekiq)\n*   Working from design docs/specifications & wireframes\n\nBonus:\n\n*   Solr\n*   Redis\n*   Vue.js\n*   Service workers architecture	<p><strong>Hubstaff is a fast-growing startup in the time tracking and project management space that fully embraces remote work.</strong> You work when and where you want. We care a lot about our culture, having fun while working hard, and our annual retreats.</p>\n<p>We are looking for a talented server engineer who has several years of experience in both React and Ruby on Rails to join our passionate development team and work on our up and coming task management product.</p>\n<p>The correct person will take pride in their work, have extreme attention to detail, and be able to get their hands dirty implementing Rails controllers, React components, and doing HTML &amp; CSS front-end work.</p>\n<p>We are looking for a well-rounded React developer who has the backend chops to implement the server-side aspects of their projects using Ruby on Rails.</p>\n<p>This position will report to our head of development for Hubstaff Tasks and work closely with our other engineers. You’ll be able to work 100% remotely, and we are looking for someone that can grow with our products for years to come.</p>\n<p>You’ll be a good fit if you:</p>\n<ul>\n<li>Are self-disciplined and have a great work ethic</li>\n<li>Have good time management skills</li>\n<li>Communicate well</li>\n<li>Can work until at least 1pm EST M - F</li>\n<li>Like having a consistent daily work schedule</li>\n<li>Have at least three years of React and five years of Ruby on Rails experience</li>\n</ul>\n<p>Front-end Development Requirements:</p>\n<ul>\n<li>React &amp; Redux</li>\n<li>Highly skilled with HTML &amp; CSS</li>\n<li>Bootstrap</li>\n<li>Javascript &amp; jQuery</li>\n<li>Git</li>\n</ul>\n<p>Backend Development Requirements:</p>\n<ul>\n<li>Ruby on Rails</li>\n<li>Postgres or MySQL</li>\n<li>Unit tests (rspec, Jest, etc.)</li>\n<li>Background workers (Sidekiq)</li>\n<li>Working from design docs/specifications &amp; wireframes</li>\n</ul>\n<p>Bonus:</p>\n<ul>\n<li>Solr</li>\n<li>Redis</li>\n<li>Vue.js</li>\n<li>Service workers architecture</li>\n</ul>	ruby-on-rails reactjs ruby css postgresql	\N	                                $70k - 90k                            	$	https://stackoverflow.com/jobs/242915/react-plus-ruby-on-rails-engineer-hubstaff?a=1jsTUhtHSKru&so=p&pg=1&offset=17&total=202&r=true	1
176	zlmdd-remote-developer-experience-engineer-auth0	Developer Experience Engineer	2019-03-02 08:06:06.125881+01	2019-03-02 08:06:06.119+01	45	\N	\N	\N	\N	auth0	Auth0	\N	\N	\N	\N	Auth0, a global leader in Identity-as-a-Service (IDaaS), provides thousands of enterprise customers with a Universal Identity Platform for their web, mobile, IoT, and internal applications. Its extensible platform seamlessly authenticates and secures more than 1.5B logins per month, making it loved by developers and trusted by global enterprises. Auth0 has raised more than $110 million to date and continues its global growth at a rapid pace. We are consistently recognized as a great place to work based our outstanding leadership and dedication to company culture, and are looking for the best people to join our incredible team spread across more than 35 countries! Auth0 is looking for **Developer Experience Engineer** across the following technologies: • Java (Struts, Spring, Play, or similar) • JavaScript (React, Angular), TypeScript **Developer Experience Engineer** You GET developers! You know what they need, how to talk to them, how to make their lives easier, what makes them click, their dissatisfiers and their delighters. You recognize when a framework, library or product provides a great experience. As a Developer Experience Engineer, you will use those superpowers to improve our entire onboarding process, SDKs, Quickstarts, Docs, and provide direct assistance to developers in our support channels. You will be the internal and external steward of the experience for the technologies that you love working with every day. Each Developer Experience Engineer shepherds one or multiple platforms forward, both internally within Auth0, and externally in the community. You will be working in a cross-functional team alongside the developer evangelist, onboarding, growth, dashboard, community, and SDK teams to provide the best developer experience for the technologies you own. The most important qualifications for this position are software engineering expertise, empathy, and self-direction.\n\n**You will be 😊**\n\n*   Writing, curating, editing developer resources: tutorials, examples, guides, and documentation.\n*   Owning the code samples and implementation guidance for Auth0.\n*   Championing Auth0 by engaging directly with the community.\n*   Gathering and channel user feedback within the company to improve the experience for developers on Auth0.\n*   The go-to-expert in the company, internally and externally, providing domain knowledge and reviews for Auth0 in these technologies.\n*   Directly shaping and enhancing our open source SDKs.\n*   Sharing your technical expertise at conferences and other tech events.\n\n**You'd be a great fit if you had ❤️**\n\n*   A deep understanding of writing, running, maintaining and debugging applications in one or more of the technologies listed above.\n*   The ability to communicate effectively in person and in writing as a presenter, documenter.\n*   Excellent written and verbal communication skills: presenting, documenting, troubleshooting.\n*   Demonstrable experience authoring developer documentation (tutorials, blog posts, docs).\n*   The ability to be self-directed and be effective working independently, yet feel equally comfortable contributing in a global team environment.\n\n**Bonus points if you have 👍**\n\n*   Experience working in distributed teams and work environments.\n*   Created open-source material or have contributed to open-source projects.\n*   Your own technical blog.\n*   Knowledge in the identity and access management space.\n\nAuth0 is an Equal Employment Opportunity employer. Auth0 conducts all employment-related activities without regard to race, religion, color, national origin, age, sex, marital status, sexual orientation, disability, citizenship status, genetics, or status as a Vietnam-era special disabled and other covered veteran status, or any other characteristic protected by law. Auth0 participates in E-Verify and will confirm work authorization for candidates residing in the United States.	<p>Auth0, a global leader in Identity-as-a-Service (IDaaS), provides thousands of enterprise customers with a Universal Identity Platform for their web, mobile, IoT, and internal applications. Its extensible platform seamlessly authenticates and secures more than 1.5B logins per month, making it loved by developers and trusted by global enterprises. Auth0 has raised more than $110 million to date and continues its global growth at a rapid pace. We are consistently recognized as a great place to work based our outstanding leadership and dedication to company culture, and are looking for the best people to join our incredible team spread across more than 35 countries! Auth0 is looking for&nbsp;<strong>Developer Experience Engineer</strong>&nbsp;across the following technologies: • Java (Struts, Spring, Play, or similar) • JavaScript (React, Angular), TypeScript <strong>Developer Experience Engineer</strong> You GET developers! You know what they need, how to talk to them, how to make their lives easier, what makes them click, their dissatisfiers and their delighters. You recognize when a framework, library or product provides a great experience. As a Developer Experience Engineer, you will use those superpowers to improve our entire onboarding process, SDKs, Quickstarts, Docs, and provide direct assistance to developers in our support channels. You will be the internal and external steward of the experience for the technologies that you love working with every day. Each Developer Experience Engineer shepherds one or multiple platforms forward, both internally within Auth0, and externally in the community. You will be working in a cross-functional team alongside the developer evangelist, onboarding, growth, dashboard, community, and SDK teams to provide the best developer experience for the technologies you own. The most important qualifications for this position are software engineering expertise, empathy, and self-direction.</p>\n<p><strong>You will be 😊</strong></p>\n<ul>\n<li>Writing, curating, editing developer resources: tutorials, examples, guides, and documentation.</li>\n<li>Owning the code samples and implementation guidance for Auth0.</li>\n<li>Championing Auth0 by engaging directly with the community.</li>\n<li>Gathering and channel user feedback within the company to improve the experience for developers on Auth0.</li>\n<li>The go-to-expert in the company, internally and externally, providing domain knowledge and reviews for Auth0 in these technologies.</li>\n<li>Directly shaping and enhancing our open source SDKs.</li>\n<li>Sharing your technical expertise at conferences and other tech events.</li>\n</ul>\n<p><strong>You'd be a great fit if you had ❤️</strong></p>\n<ul>\n<li>A deep understanding of writing, running, maintaining and debugging applications in one or more of the technologies listed above.</li>\n<li>The ability to communicate effectively in person and in writing as a presenter, documenter.</li>\n<li>Excellent written and verbal communication skills: presenting, documenting, troubleshooting.</li>\n<li>Demonstrable experience authoring developer documentation (tutorials, blog posts, docs).</li>\n<li>The ability to be self-directed and be effective working independently, yet feel equally comfortable contributing in a global team environment.</li>\n</ul>\n<p><strong>Bonus points if you have 👍</strong></p>\n<ul>\n<li>Experience working in distributed teams and work environments.</li>\n<li>Created open-source material or have contributed to open-source projects.</li>\n<li>Your own technical blog.</li>\n<li>Knowledge in the identity and access management space.</li>\n</ul>\n<p>Auth0 is an Equal Employment Opportunity employer. Auth0 conducts all employment-related activities without regard to race, religion, color, national origin, age, sex, marital status, sexual orientation, disability, citizenship status, genetics, or status as a Vietnam-era special disabled and other covered veteran status, or any other characteristic protected by law. Auth0 participates in E-Verify and will confirm work authorization for candidates residing in the United States.</p>	reactjs java javascript	\N	\N	\N	https://stackoverflow.com/jobs/242913/developer-experience-engineer-auth0?a=1jsRkqqD8phe&so=p&pg=1&offset=18&total=202&r=true	1
177	s458k-remote-sr-devops-engineer-[rails-/-chef]-aha	Sr. DevOps Engineer [Rails / Chef]	2019-03-02 08:06:06.943464+01	2019-03-02 08:06:06.938+01	33	\N	\N	\N	\N	aha	Aha!	\N	\N	\N	\N	Aha! is looking for a DevOps engineer to build and maintain our highly automated AWS-based infrastructure. We value simplicity, robustness, performance, and low operational overhead. We like to script and configure using Ruby & Chef (via AWS OpsWorks).\n\nWe are seeing rapid growth, which means there are many interesting scale, performance, and architectural projects to tackle. DevOps engineers work as part of our overall engineering team, following the same development workflow we use for all parts of the product.\n\nAs a DevOps Engineer at Aha!, you will have an excellent opportunity to join a breakthrough and profitable company that is growing fast. Aha! was founded by a proven team of product and marketing experts. More than 250,000 users worldwide trust Aha! to set brilliant strategy, capture customer ideas, create visual roadmaps, and manage breakthrough marketing programs.\n\n**We are looking for someone who:**\n\n*   Has built and operated large-scale web applications\n*   Is an expert in Ruby scripting — Ruby on Rails experience is a big plus\n*   Has a "security-first" mentality\n*   Has a computer science degree or demonstrated experience solving challenging CS problems\n\n**We are committed to being great, and we want someone who:**\n\n*   Can work at a fast-paced company where the feedback cycle is measured in hours rather than weeks\n*   Has a "get it done" attitude and a background of delivering superb work again and again\n*   Is seeking a career-defining opportunity and a proven, results-oriented team that has sold multiple software companies\n\n_We are building a distributed team, and you can work from anywhere in North America for this role. We offer generous salary, equity, benefits, and a profit-sharing program._	<p>Aha! is looking for a DevOps engineer to build and maintain our highly automated AWS-based infrastructure. We value simplicity, robustness, performance, and low operational overhead. We like to script and configure using Ruby &amp; Chef (via AWS OpsWorks).</p>\n<p>We are seeing rapid growth, which means there are many interesting scale, performance, and architectural projects to tackle. DevOps engineers work as part of our overall engineering team, following the same development workflow we use for all parts of the product.</p>\n<p>As a DevOps Engineer at Aha!, you will have an excellent opportunity to join a breakthrough and profitable company that is growing fast. Aha! was founded by a proven team of product and marketing experts. More than 250,000 users worldwide trust Aha! to set brilliant strategy, capture customer ideas, create visual roadmaps, and manage breakthrough marketing programs.</p>\n<p><strong>We are looking for someone who:</strong></p>\n<ul>\n<li>Has built and operated large-scale web applications</li>\n<li>Is an expert in Ruby scripting — Ruby on Rails experience is a big plus</li>\n<li>Has a "security-first" mentality</li>\n<li>Has a computer science degree or demonstrated experience solving challenging CS problems</li>\n</ul>\n<p><strong>We are committed to being great, and we want someone who:</strong></p>\n<ul>\n<li>Can work at a fast-paced company where the feedback cycle is measured in hours rather than weeks</li>\n<li>Has a "get it done" attitude and a background of delivering superb work again and again</li>\n<li>Is seeking a career-defining opportunity and a proven, results-oriented team that has sold multiple software companies</li>\n</ul>\n<p><em>We are building a distributed team, and you can work from anywhere in North America for this role. We offer generous salary, equity, benefits, and a profit-sharing program.</em></p>	ruby-on-rails ruby chef amazon-web-services javascript	\N	\N	\N	https://stackoverflow.com/jobs/242889/sr-devops-engineer-rails-chef-aha?a=1jsmo9PIaji8&so=p&pg=1&offset=19&total=202&r=true	1
178	38nqd-remote-react-native-developer-remote-x-team	React Native Developer (Remote)	2019-03-02 08:06:08.035387+01	2019-03-02 08:06:08.029+01	46	\N	\N	\N	\N	x-team	X-Team	\N	\N	\N	\N	**Most important:**\n\n*   Experience with React, React Native and the Javascript ecosystem\n*   Experience with iOS and Android development\n*   Code optimization and performance improvements\n*   Write well designed, testable, efficient code\n\n**Nice to have:**\n\n*   Experience with working remotely\n*   Familiar/involved with open­ source projects\n\n**Personal:**\n\n*   Independent, self-motivated\n*   Fluent in English, written and spoken\n*   Proven track record of always learning and growing\n*   Proactive attitude\n*   Possess a spirit of generosity\n\n**Perks:**\n\n*   Get the chance to work with big brands like Riot Games, Fox Broadcasting, Kaplan Inc...\n*   Live and work in one of our roaming hacker houses (X-Outposts) around the world.\n*   Work from anywhere as part of a community of digital nomads.\n*   Join our vibrant community, filled with opportunities to learn new skills together in study groups, join clubs (photography, gaming, etc.) and get free camera equipment/games/conferences/courses/massages/etc., charitable fundraisers, fitness & yoga programs (+gym membership), etc. This is the community to be in if you're a remote developer.\n*   We’ll provide up to $2,500 in funding for your learning and growth through our Unleash program, which provides opportunities to unleash your potential through initiatives that help you grow as a developer and explore your passions more each day.	<p><strong>Most important:</strong></p>\n<ul>\n<li>Experience with React, React Native and the Javascript ecosystem</li>\n<li>Experience with iOS and Android development</li>\n<li>Code optimization and performance improvements</li>\n<li>Write well designed, testable, efficient code</li>\n</ul>\n<p><strong>Nice to have:</strong></p>\n<ul>\n<li>Experience with working remotely</li>\n<li>Familiar/involved with open­ source projects</li>\n</ul>\n<p><strong>Personal:</strong></p>\n<ul>\n<li>Independent, self-motivated</li>\n<li>Fluent in English, written and spoken</li>\n<li>Proven track record of always learning and growing</li>\n<li>Proactive attitude</li>\n<li>Possess a spirit of generosity</li>\n</ul>\n<p><strong>Perks:</strong></p>\n<ul>\n<li>Get the chance to work with big brands like Riot Games, Fox Broadcasting, Kaplan Inc…</li>\n<li>Live and work in one of our roaming hacker houses (X-Outposts) around the world.</li>\n<li>Work from anywhere as part of a community of digital nomads.</li>\n<li>Join our vibrant community, filled with opportunities to learn new skills together in study groups, join clubs (photography, gaming, etc.) and get free camera equipment/games/conferences/courses/massages/etc., charitable fundraisers, fitness &amp; yoga programs (+gym membership), etc. This is the community to be in if you're a remote developer.</li>\n<li>We’ll provide up to $2,500 in funding for your learning and growth through our Unleash program, which provides opportunities to unleash your potential through initiatives that help you grow as a developer and explore your passions more each day.</li>\n</ul>	react-native reactjs javascript ios android	\N	\N	\N	https://stackoverflow.com/jobs/200538/react-native-developer-remote-x-team?a=15fLf4yLIsfu&so=p&pg=1&offset=20&total=202&r=true	1
179	pqit3-remote-stack-monitoring-senior-javascript-engineer-elastic	Stack Monitoring - Senior JavaScript Engineer	2019-03-02 08:06:08.841398+01	2019-03-02 08:06:08.835+01	35	\N	\N	\N	\N	elastic	Elastic	\N	\N	\N	\N	At Elastic, we have a simple goal: to solve the world's data problems with products that delight and inspire. As the company behind the popular open source projects — Elasticsearch, Kibana, Logstash, and Beats — we help people around the world do great things with their data. From stock quotes to Twitter streams, Apache logs to WordPress blogs, our products are extending what's possible with data, delivering on the promise that good things come from connecting the dots. We unite Elasticians across 30+ countries (and counting), 18 timezones and 30 different languages into one coherent team, while the broader community spans across over 100 countries.\n\nElastic is seeking a talented Senior JavaScript Engineer to join our Ingest team. You will have the opportunity to work with exceptional engineers on state of the art technology in a small and focused team.\n\n****Ingest at Elastic:****\n\n*   Are you passionate about data, about infrastructure, and more importantly about combining the two and turning them to valuable and actionable insights via UI?\n*   Do you have a deep understanding of how to model and visualize time-series data sets and how to craft meaningful workflows for users who seek to understand the state of complex systems?\n\nIf so, we'd love to talk.\n\nIf you read this far and think, “that's me” then you probably won't need to read any further and we should have a conversation. But if you are in any doubt the type of experiences we expect you to have then the following should help clarify;\n\n****What you'll be doing:****\n\n*   Innovate and contribute to a Monitoring UI, built on top of the Kibana platform.\n*   Answer community questions.\n*   Collaborate with other development teams, quality engineering team and documentation team to execute on product deliverables.\n\n****Skills you will bring:****\n\n*   BS, MS or PhD in Computer Science or related engineering discipline and 5+ years of front end development work.\n*   Strong JavaScript programming skills\n*   Experience with one modern MVC style JS Framework\n*   Experience in building large scale pluggable UIs\n*   Experienced in user interface design and development; JavaScript, HTML, CSS\n*   Excellent understanding of UX/UI design principles\n*   Familiarity with time-series and other visualizations used in monitoring systems\n*   Experience using monitoring products in production is a plus.\n*   Experience using and/or operating the Elastic stack is a big plus.\n*   Excellent verbal and written communication skills, a great teammate with strong analytical, problem solving, debugging, and troubleshooting skills.\n*   A belief in progress over perfection.\n*   Ability to work in a distributed team throughout the world.\n\n****Additional ****Information****\n\nWe're looking to hire team members invested in realizing the goal of making real-time data exploration easy and available to anyone. As a distributed company, we believe that diversity drives our vibe. Whether you're looking to launch a new career or grow an existing one, Elastic is the type of company where you can balance great work with great life.\n\n*   Competitive pay based on the work you do here and not your previous salary\n*   Equity\n*   Global minimum of 16 weeks of paid in full parental leave (moms & dads)\n*   Generous vacation time and one week of volunteer time off\n*   Your age is only a number. It doesn't matter if you're just out of college or your children are; we need you for what you can do.\n\nElastic is an Equal Employment employer committed to the principles of equal employment opportunity and affirmative action for all applicants and employees. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender perception or identity, national origin, age, marital status, protected veteran status, or disability status or any other basis protected by federal, state or local law, ordinance or regulation. Elastic also makes reasonable accommodations for disabled employees consistent with applicable law.	<p>At Elastic, we have a simple goal: to solve the world's data problems with products that delight and inspire. As the company behind the popular open source projects — Elasticsearch, Kibana, Logstash, and Beats — we help people around the world do great things with their data. From stock quotes to Twitter streams, Apache logs to WordPress blogs, our products are extending what's possible with data, delivering on the promise that good things come from connecting the dots. We unite Elasticians across 30+ countries (and counting), 18 timezones and 30 different languages into one coherent team, while the broader community spans across over 100 countries.</p>\n<p>Elastic is seeking a talented Senior JavaScript Engineer to join our Ingest team. You will have the opportunity to work with exceptional engineers on state of the art technology in a small and focused team.</p>\n<p><strong><em><em>Ingest at Elastic:</em></strong></em></p>\n<ul>\n<li>Are you passionate about data, about infrastructure, and more importantly about combining the two and turning them to valuable and actionable insights via UI?</li>\n<li>Do you have a deep understanding of how to model and visualize time-series data sets and how to craft meaningful workflows for users who seek to understand the state of complex systems?</li>\n</ul>\n<p>If so, we'd love to talk.</p>\n<p>If you read this far and think, “that's me” then you probably won't need to read any further and we should have a conversation. But if you are in any doubt the type of experiences we expect you to have then the following should help clarify;</p>\n<p><strong><em><em>What you'll be doing:</em></strong></em></p>\n<ul>\n<li>Innovate and contribute to a Monitoring UI, built on top of the Kibana platform.</li>\n<li>Answer community questions.</li>\n<li>Collaborate with other development teams, quality engineering team and documentation team to execute on product deliverables.</li>\n</ul>\n<p><strong><em><em>Skills you will bring:</em></strong></em></p>\n<ul>\n<li>BS, MS or PhD in Computer Science or related engineering discipline and 5+ years of front end development work.</li>\n<li>Strong JavaScript programming skills</li>\n<li>Experience with one modern MVC style JS Framework</li>\n<li>Experience in building large scale pluggable UIs</li>\n<li>Experienced in user interface design and development; JavaScript, HTML, CSS</li>\n<li>Excellent understanding of UX/UI design principles</li>\n<li>Familiarity with time-series and other visualizations used in monitoring systems</li>\n<li>Experience using monitoring products in production is a plus.</li>\n<li>Experience using and/or operating the Elastic stack is a big plus.</li>\n<li>Excellent verbal and written communication skills, a great teammate with strong analytical, problem solving, debugging, and troubleshooting skills.</li>\n<li>A belief in progress over perfection.</li>\n<li>Ability to work in a distributed team throughout the world.</li>\n</ul>\n<p><strong><em><em>Additional&nbsp;</em></strong></em>Information****</p>\n<p>We're looking to hire team members invested in realizing the goal of making real-time data exploration easy and available to anyone. As a distributed company, we believe that diversity drives our vibe. Whether you're looking to launch a new career or grow an existing one, Elastic is the type of company where you can balance great work with great life.</p>\n<ul>\n<li>Competitive pay based on the work you do here and not your previous salary</li>\n<li>Equity</li>\n<li>Global minimum of 16 weeks of paid in full parental leave (moms &amp; dads)</li>\n<li>Generous vacation time and one week of volunteer time off</li>\n<li>Your age is only a number. It doesn't matter if you're just out of college or your children are; we need you for what you can do.</li>\n</ul>\n<p>Elastic is an Equal Employment employer committed to the principles of equal employment opportunity and affirmative action for all applicants and employees. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender perception or identity, national origin, age, marital status, protected veteran status, or disability status or any other basis protected by federal, state or local law, ordinance or regulation. Elastic also makes reasonable accommodations for disabled employees consistent with applicable law.</p>	javascript user-interface reactjs logstash kibana	\N	\n                                Equity\n                            	\N	https://stackoverflow.com/jobs/234104/stack-monitoring-senior-javascript-engineer-elastic?a=1gvH8gmS1O2A&so=p&pg=1&offset=21&total=202&r=true	1
180	z04s5-remote-ingest-release-engineer-elastic	Ingest: Release Engineer	2019-03-02 08:06:09.841862+01	2019-03-02 08:06:09.835+01	35	\N	Amsterdam 	1	\N	elastic	Elastic	\N	\N	\N	\N	 At Elastic, we have a simple goal: to solve the world's data problems with products that delight and inspire. As the company behind the popular open source projects — Elasticsearch, Kibana, Logstash, and Beats — we help people around the world do great things with their data. From stock quotes to Twitter streams, Apache logs to WordPress blogs, our products are extending what's possible with data, delivering on the promise that good things come from connecting the dots. The Elastic family unites employees across 30+ countries into one coherent team, while the broader community spans across over 100 countries.\n\nElastic is seeking a talented Software build engineer to join our Ingest team. You will have the opportunity to work with exceptional engineers on cutting edge technology. The Ingest team is diverse and distributed across the world, and collaborates on daily basis over Github, Zoom, and Slack.\n\n****Ingest at Elastic****\n\nThe Ingest team is responsible for building the Beats platform and the solutions on top of it. Beats consists of open source shippers that collect all kinds of operational data, store it in Elasticsearch, and visualize it with Kibana. They collect data from edge servers, and are used to power application monitoring, infrastructure monitoring, network monitoring or security use cases. We currently have five official Beats: Filebeat for gathering logs, Packetbeat for network traffic, Metricbeat for metrics, Winlogbeat for Windows event logs, Heartbeat for uptime monitoring, and Auditbeat for audit data. In addition, the open-source community has created over 40 Beats, collecting data from all sorts of sources.\n\n****Engineering philosophy****\n\nWe believe that engineering complex, pluggable software for the web that is built to last the test of time is both tricky and exciting. Doing so requires a team of diverse individuals, with sharp minds and the ability to empathize with our users, working together with mutual respect and a common mission.\n\nWe care deeply about giving you full ownership of what you're working on. Our company fundamentally believes great minds achieve greatness when they are set free and are surrounded and challenged by their peers, which is clearly visible throughout our organization. At Elastic, hierarchy does not determine how decisions get made. We feel that anyone needs to be in the position to comment on anything, regardless of their role within the company.\n\n****Your responsibilities:****\n\n*   Maintaining and improving the build system.\n*   Producing packages and installers for all the Beats.\n*   Build and maintain Docker images and Kubernetes templates.\n*   Testing of packages/installers and Docker images.\n*   Help maintain, build, and scale the testing environments.\n\n****Skills you will bring along:****\n\n*   3+ years of industry experience.\n*   Experience with building software packages (e.g. rpm, deb, msi, pkg).\n*   Familiarity with Go, Make, Python, Docker. Experience with Ansible and Kubernetes is a plus.\n*   Experience with building and running large test suites. Having experience with Jenkins is a plus.\n*   Excellent verbal and written communication skills, a great teammate with strong analytical, problem solving, debugging, and troubleshooting skills.\n*   Ability to work in a distributed team throughout the world.\n\n****Additional ****Information****\n\nWe're looking to hire team members invested in realizing the goal of making real-time data exploration easy and available to anyone. As a distributed company, we believe that diversity drives our vibe. Whether you're looking to launch a new career or grow an existing one, Elastic is the type of company where you can balance great work with great life.\n\n*   Competitive pay based on the work you do here and not your previous salary\n*   Equity\n*   Global minimum of 16 weeks of paid in full parental leave (moms & dads)\n*   Generous vacation time and one week of volunteer time off\n*   Your age is only a number. It doesn't matter if you're just out of college or your children are; we need you for what you can do.\n\nElastic is an Equal Employment employer committed to the principles of equal employment opportunity and affirmative action for all applicants and employees. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender perception or identity, national origin, age, marital status, protected veteran status, or disability status or any other basis protected by federal, state or local law, ordinance or regulation. Elastic also makes reasonable accommodations for disabled employees consistent with applicable law.	<p>&nbsp;At Elastic, we have a simple goal: to solve the world's data problems with products that delight and inspire. As the company behind the popular open source projects — Elasticsearch, Kibana, Logstash, and Beats — we help people around the world do great things with their data. From stock quotes to Twitter streams, Apache logs to WordPress blogs, our products are extending what's possible with data, delivering on the promise that good things come from connecting the dots. The Elastic family unites employees across 30+ countries into one coherent team, while the broader community spans across over 100 countries.</p>\n<p>Elastic is seeking a talented Software build engineer to join our Ingest team. You will have the opportunity to work with exceptional engineers on cutting edge technology. The Ingest team is diverse and distributed across the world, and collaborates on daily basis over Github, Zoom, and Slack.</p>\n<p><strong><em><em>Ingest at Elastic</em></strong></em></p>\n<p>The Ingest team is responsible for building the Beats platform and the solutions on top of it. Beats consists of open source shippers that collect all kinds of operational data, store it in Elasticsearch, and visualize it with Kibana. They collect data from edge servers, and are used to power application monitoring, infrastructure monitoring, network monitoring or security use cases. We currently have five official Beats: Filebeat for gathering logs, Packetbeat for network traffic, Metricbeat for metrics, Winlogbeat for Windows event logs, Heartbeat for uptime monitoring, and Auditbeat for audit data. In addition, the open-source community has created over 40 Beats, collecting data from all sorts of sources.</p>\n<p><strong><em><em>Engineering philosophy</em></strong></em></p>\n<p>We believe that engineering complex, pluggable software for the web that is built to last the test of time is both tricky and exciting. Doing so requires a team of diverse individuals, with sharp minds and the ability to empathize with our users, working together with mutual respect and a common mission.</p>\n<p>We care deeply about giving you full ownership of what you're working on. Our company fundamentally believes great minds achieve greatness when they are set free and are surrounded and challenged by their peers, which is clearly visible throughout our organization. At Elastic, hierarchy does not determine how decisions get made. We feel that anyone needs to be in the position to comment on anything, regardless of their role within the company.</p>\n<p><strong><em><em>Your responsibilities:</em></strong></em></p>\n<ul>\n<li>Maintaining and improving the build system.</li>\n<li>Producing packages and installers for all the Beats.</li>\n<li>Build and maintain Docker images and Kubernetes templates.</li>\n<li>Testing of packages/installers and Docker images.</li>\n<li>Help maintain, build, and scale the testing environments.</li>\n</ul>\n<p><strong><em><em>Skills you will bring along:</em></strong></em></p>\n<ul>\n<li>3+ years of industry experience.</li>\n<li>Experience with building software packages (e.g. rpm, deb, msi, pkg).</li>\n<li>Familiarity with Go, Make, Python, Docker. Experience with Ansible and Kubernetes is a plus.</li>\n<li>Experience with building and running large test suites. Having experience with Jenkins is a plus.</li>\n<li>Excellent verbal and written communication skills, a great teammate with strong analytical, problem solving, debugging, and troubleshooting skills.</li>\n<li>Ability to work in a distributed team throughout the world.</li>\n</ul>\n<p><strong><em><em>Additional&nbsp;</em></strong></em>Information****</p>\n<p>We're looking to hire team members invested in realizing the goal of making real-time data exploration easy and available to anyone. As a distributed company, we believe that diversity drives our vibe. Whether you're looking to launch a new career or grow an existing one, Elastic is the type of company where you can balance great work with great life.</p>\n<ul>\n<li>Competitive pay based on the work you do here and not your previous salary</li>\n<li>Equity</li>\n<li>Global minimum of 16 weeks of paid in full parental leave (moms &amp; dads)</li>\n<li>Generous vacation time and one week of volunteer time off</li>\n<li>Your age is only a number. It doesn't matter if you're just out of college or your children are; we need you for what you can do.</li>\n</ul>\n<p>Elastic is an Equal Employment employer committed to the principles of equal employment opportunity and affirmative action for all applicants and employees. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender perception or identity, national origin, age, marital status, protected veteran status, or disability status or any other basis protected by federal, state or local law, ordinance or regulation. Elastic also makes reasonable accommodations for disabled employees consistent with applicable law.</p>	docker go python ansible kubernetes	(GMT+01:00) Amsterdam 	\n                                Equity\n                            	\N	https://stackoverflow.com/jobs/234103/ingest-release-engineer-elastic?a=1gvFQkQkEDss&so=p&pg=1&offset=22&total=202&r=true	1
181	yabax-remote-senior-software-developer-emea-qualio	Senior Software Developer (EMEA)	2019-03-02 08:06:10.727586+01	2019-03-02 08:06:10.721+01	47	\N	\N	\N	\N	qualio	Qualio	\N	\N	\N	\N	**What’s the opportunity?**\n\nWe are hiring a software developer to play an important role in our product team. This role is available to mid-level and senior developers, however, consideration will be given to all candidates with the right mix of skills, experience, and attitude.\n\nWe're looking for people that are continuously learning and improving, and who will grow with the company. We primarily use Python and Javascript and so we are keen to hear from you if you already use these technologies or want to start\n\n**What will I be doing**\n\nIdeally, you will be comfortable working on client facing interfaces as well as deep down in the engine room. You will be working closely with our existing team, developing new features and improving existing ones. You will also have the opportunity to be an active influencer in technical discussions and contribute to the development of our internal systems and processes.\n\nYour responsibilities will include:\n\n*   Quickly getting up to speed on core technologies and the Qualio software development life-cycle;\n*   Working independently to develop and implement new product features as a key part of our product team;\n*   Contributing as an active voice to discussions around new technologies and tools for application development;\n*   Supporting other team members with their assigned work, and assisting with code reviews.\n\n  \n\n**Benefits**\n\n  \n\nIn addition to playing an important role in building Qualio, you'll receive:\n\n*   Competitive salary;\n*   Meaningful equity;\n*   Flexible holidays;\n*   Opportunity to make a difference through helping life-saving products to get to market.	<p><strong>What’s the opportunity?</strong></p>\n<p>We are hiring a software developer to play an important role in our product team. This role is available to mid-level and senior developers, however, consideration will be given to all candidates with the right mix of skills, experience, and attitude.</p>\n<p>We're looking for people that are continuously learning and improving, and who will grow with the company. We primarily use Python and Javascript and so we are keen to hear from you if you already use these technologies or want to start</p>\n<p><strong>What will I be doing</strong></p>\n<p>Ideally, you will be comfortable working on client facing interfaces as well as deep down in the engine room. You will be working closely with our existing team, developing new features and improving existing ones. You will also have the opportunity to be an active influencer in technical discussions and contribute to the development of our internal systems and processes.</p>\n<p>Your responsibilities will include:</p>\n<ul>\n<li>Quickly getting up to speed on core technologies and the Qualio software development life-cycle;</li>\n<li>Working independently to develop and implement new product features as a key part of our product team;</li>\n<li>Contributing as an active voice to discussions around new technologies and tools for application development;</li>\n<li>Supporting other team members with their assigned work, and assisting with code reviews.</li>\n</ul>\n<p><strong>Benefits</strong></p>\n<p>In addition to playing an important role in building Qualio, you'll receive:</p>\n<ul>\n<li>Competitive salary;</li>\n<li>Meaningful equity;</li>\n<li>Flexible holidays;</li>\n<li>Opportunity to make a difference through helping life-saving products to get to market.</li>\n</ul>	rest-api javascript python	\N	\N	\N	https://stackoverflow.com/jobs/242862/senior-software-developer-emea-qualio?a=1jrNA6Fb4HyE&so=p&pg=1&offset=23&total=202&r=true	1
182	ygick-remote-product-manager-emea-qualio	Product Manager (EMEA)	2019-03-02 08:06:11.441391+01	2019-03-02 08:06:11.434+01	47	\N	\N	\N	\N	qualio	Qualio	\N	\N	\N	\N	What’s the opportunity?\n\nWe are looking for a talented Product Manager who will join our team based to help us continue our growth and success. You will be the first Product Manager to join our team, and as a result you will have the opportunity to work across every part of our platform and make a huge impact on the success of our product with our customers.\n\nWhat will I be doing?\n\nYou will be responsible for understanding our customer’s business needs and helping us design new solutions. You will be working closely with our engineering team, business team, and customers.\n\nYour responsibilities will include:\n\n*   Identifying the right customer problems to solve;\n*   Managing the execution environment to build the right solution;\n*   Ensuring that we ultimately launch the right products and features to market\n\nAs part of this role you will:\n\n*   Focus on the user and consider anything we build based on the customer value it can deliver.\n*   Understand our business strategy and deliver a product that reflects a uniquely Qualio perspective on how to achieve it.\n*   Manage the roadmap: capture work from a wide range of inputs, understand and prioritize this work so your team is always working on the most impactful projects.\n*   Deeply understand the problems that you’re tackling through research and regular interaction with customers & product teams; define and frame those problems for the team.\n*   Collaborate with your the team in thinking big, to imagining future solutions that solve these problems.\n*   Partner with Engineering to scope these solutions to their smallest coherent state that helps product ship to customers as early as possible.\n*   Constantly evaluate if your solutions have solved the problem through quantitative and qualitative measures.\n*   Own and maintain the quality of the product areas you are responsible for; deliver world-class software in every release.\n*   Motivate a group of committed, smart people to do the best work of their careers.\n\n  \n\n**Benefits**\n\n  \n\nIn addition to playing an important role in building Qualio, you'll receive:\n\n*   Competitive salary;\n*   Meaningful equity;\n*   Flexible holidays;\n*   Opportunity to make a difference through helping life-saving products to get to market.\n\nWe are a diverse bunch of people and we want to continue to attract and retain a diverse range of people into our organization. We're committed to an inclusive and diverse Qualio! We do not discriminate based on gender, ethnicity, sexual orientation, religion, civil or family status, age, disability, or race.	<p>What’s the opportunity?</p>\n<p>We are looking for a talented Product Manager who will join our team based to help us continue our growth and success. You will be the first Product Manager to join our team, and as a result you will have the opportunity to work across every part of our platform and make a huge impact on the success of our product with our customers.</p>\n<p>What will I be doing?</p>\n<p>You will be responsible for understanding our customer’s business needs and helping us design new solutions. You will be working closely with our engineering team, business team, and customers.</p>\n<p>Your responsibilities will include:</p>\n<ul>\n<li>Identifying the right customer problems to solve;</li>\n<li>Managing the execution environment to build the right solution;</li>\n<li>Ensuring that we ultimately launch the right products and features to market</li>\n</ul>\n<p>As part of this role you will:</p>\n<ul>\n<li>Focus on the user and consider anything we build based on the customer value it can deliver.</li>\n<li>Understand our business strategy and deliver a product that reflects a uniquely Qualio perspective on how to achieve it.</li>\n<li>Manage the roadmap: capture work from a wide range of inputs, understand and prioritize this work so your team is always working on the most impactful projects.</li>\n<li>Deeply understand the problems that you’re tackling through research and regular interaction with customers &amp; product teams; define and frame those problems for the team.</li>\n<li>Collaborate with your the team in thinking big, to imagining future solutions that solve these problems.</li>\n<li>Partner with Engineering to scope these solutions to their smallest coherent state that helps product ship to customers as early as possible.</li>\n<li>Constantly evaluate if your solutions have solved the problem through quantitative and qualitative measures.</li>\n<li>Own and maintain the quality of the product areas you are responsible for; deliver world-class software in every release.</li>\n<li>Motivate a group of committed, smart people to do the best work of their careers.</li>\n</ul>\n<p><strong>Benefits</strong></p>\n<p>In addition to playing an important role in building Qualio, you'll receive:</p>\n<ul>\n<li>Competitive salary;</li>\n<li>Meaningful equity;</li>\n<li>Flexible holidays;</li>\n<li>Opportunity to make a difference through helping life-saving products to get to market.</li>\n</ul>\n<p>We are a diverse bunch of people and we want to continue to attract and retain a diverse range of people into our organization. We're committed to an inclusive and diverse Qualio! We do not discriminate based on gender, ethnicity, sexual orientation, religion, civil or family status, age, disability, or race.</p>	python javascript	\N	\N	\N	https://stackoverflow.com/jobs/242861/product-manager-emea-qualio?a=1jrMib8DHwYw&so=p&pg=1&offset=24&total=202&r=true	1
183	hpn30-remote-frontend-developer-vuejs,-react,-angular-remote-x-team	Frontend Developer - Vue.js, React, Angular... (Remote)	2019-03-02 10:58:47.295328+01	2019-03-02 10:58:47.278+01	48	\N	\N	\N	\N	x-team	X-Team	\N	\N	\N	\N	**Most important:**\n\n*   Experience with React, Vue.js or Angular\n*   Experience with Sass, Less and/or CSS Modules\n*   Experience with Webpack\n*   Ability to build and improve a REST/JSON API client\n*   Ability to debug API responses\n*   Write high-performance, reusable code for UI components\n\n**Nice to have:**\n\n*   Experience with working remotely\n*   Familiar/involved with open­ source projects\n\n**Personal:**\n\n*   Independent, self-motivated\n*   Fluent in English, written and spoken\n*   Proven track record of always learning and growing\n*   Proactive attitude\n*   Possess a spirit of generosity\n\n**Perks:**\n\n*   Get the chance to work with big brands like Riot Games, Fox Broadcasting, Kaplan Inc...\n*   Live and work in one of our roaming hacker houses (X-Outposts) around the world.\n*   Work from anywhere as part of a community of digital nomads.\n*   Join our vibrant community, filled with opportunities to learn new skills together in study groups, join clubs (photography, gaming, etc.) and get free camera equipment/games/conferences/courses/massages/etc., charitable fundraisers, fitness & yoga programs (+gym membership), etc. This is the community to be in if you're a remote developer.\n*   We’ll provide up to $2,500 in funding for your learning and growth through our Unleash program, which provides opportunities to unleash your potential through initiatives that help you grow as a developer and explore your passions more each day.	<p><strong>Most important:</strong></p>\n<ul>\n<li>Experience with React, Vue.js or Angular</li>\n<li>Experience with Sass, Less and/or CSS Modules</li>\n<li>Experience with Webpack</li>\n<li>Ability to build and improve a REST/JSON API client</li>\n<li>Ability to debug API responses</li>\n<li>Write high-performance, reusable code for UI components</li>\n</ul>\n<p><strong>Nice to have:</strong></p>\n<ul>\n<li>Experience with working remotely</li>\n<li>Familiar/involved with open­ source projects</li>\n</ul>\n<p><strong>Personal:</strong></p>\n<ul>\n<li>Independent, self-motivated</li>\n<li>Fluent in English, written and spoken</li>\n<li>Proven track record of always learning and growing</li>\n<li>Proactive attitude</li>\n<li>Possess a spirit of generosity</li>\n</ul>\n<p><strong>Perks:</strong></p>\n<ul>\n<li>Get the chance to work with big brands like Riot Games, Fox Broadcasting, Kaplan Inc…</li>\n<li>Live and work in one of our roaming hacker houses (X-Outposts) around the world.</li>\n<li>Work from anywhere as part of a community of digital nomads.</li>\n<li>Join our vibrant community, filled with opportunities to learn new skills together in study groups, join clubs (photography, gaming, etc.) and get free camera equipment/games/conferences/courses/massages/etc., charitable fundraisers, fitness &amp; yoga programs (+gym membership), etc. This is the community to be in if you're a remote developer.</li>\n<li>We’ll provide up to $2,500 in funding for your learning and growth through our Unleash program, which provides opportunities to unleash your potential through initiatives that help you grow as a developer and explore your passions more each day.</li>\n</ul>	javascript vue.js reactjs angular	\N	\N	\N	https://stackoverflow.com/jobs/199987/frontend-developer-vuejs-react-angular-x-team?a=154iUQoaNpao&so=p&pg=1&offset=0&total=202&r=true	1
184	1vw89-remote-senior-react-native-engineer-disruptive-offline-marketing-start-up-oppizi	Senior React Native Engineer: Disruptive Offline Marketing Start-up!	2019-03-02 10:58:48.233403+01	2019-03-02 10:58:48.221+01	31	\N	\N	\N	\N	oppizi	oppizi	\N	80000	120000	\N	We are seeking a full-time Senior Engineer, to join our Tech Team in Australia, Morocco, and Brazil. \n\n**Responsibilities**\n\n*   Maintain and improve our iOS and Android application (built with React Native) \n*   Plan and architect the tech for new app features, systems and integrations, and make it happen.\n*   Apply pragmatism and best practices in software engineering, delivering projects on time, with excellent quality.\n*   Writing tests and continually improving our build process\n*   Take ownership of the app, finding ways to improve its effectiveness, reliability and cost.\n*   Solving problems at scale\n\n**Requirements**\n\n*   Excellent communication skills, especially in understanding requirements and explaining technical or complex concepts\n*   Demonstrate extensive JavaScript experience, with a focus on React Native\n*   Experience and pragmatism in testing\n*   Ability to efficiently learn new tools and languages\n*   Desirable experience in the following areas: backend dev (Express and GraphQL), AWS and build automation	<p>We are seeking a full-time Senior Engineer, to join our Tech Team in Australia, Morocco, and Brazil.&nbsp;</p>\n<p><strong>Responsibilities</strong></p>\n<ul>\n<li>Maintain and improve our iOS and Android application (built with React Native)&nbsp;</li>\n<li>Plan and architect the tech for new app features, systems and integrations, and make it happen.</li>\n<li>Apply pragmatism and best practices in software engineering, delivering projects on time, with excellent quality.</li>\n<li>Writing tests and continually improving our build process</li>\n<li>Take ownership of the app, finding ways to improve its effectiveness, reliability and cost.</li>\n<li>Solving problems at scale</li>\n</ul>\n<p><strong>Requirements</strong></p>\n<ul>\n<li>Excellent communication skills, especially in understanding requirements and explaining technical or complex concepts</li>\n<li>Demonstrate extensive JavaScript experience, with a focus on React Native</li>\n<li>Experience and pragmatism in testing</li>\n<li>Ability to efficiently learn new tools and languages</li>\n<li>Desirable experience in the following areas: backend dev (Express and GraphQL), AWS and build automation</li>\n</ul>	reactjs react-native javascript graphql amazon-web-services	\N	                                A$80k - 120k                            	A$	https://stackoverflow.com/jobs/231284/senior-react-native-engineer-disruptive-offline-oppizi?a=1fz3HOoU8sKI&so=p&pg=1&offset=1&total=202&r=true	1
\.


--
-- Data for Name: job_tag; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job_tag (id, job_id, tag_id) FROM stdin;
906	158	22
907	158	6
908	158	2
909	158	11
910	158	3
911	158	10
912	158	5
913	158	9
914	158	22
915	158	6
916	158	2
917	158	11
918	158	3
919	158	13
920	158	18
921	158	2
922	158	3
923	158	7
924	158	12
925	158	6
926	158	9
927	158	10
928	158	2
929	158	12
930	158	2
931	158	5
932	158	11
933	158	22
934	158	7
935	158	17
936	158	3
937	158	9
938	158	27
939	158	22
940	158	2
941	158	17
942	158	16
943	158	29
944	158	20
945	158	9
946	158	2
947	158	24
948	158	2
949	158	26
950	158	8
951	158	18
952	158	13
953	158	14
954	158	6
955	158	4
956	158	13
957	158	5
958	158	6
959	158	22
960	158	12
961	158	7
962	158	11
963	158	6
964	158	5
965	159	8
966	159	4
967	159	10
968	159	6
969	159	11
970	159	3
971	159	7
972	159	12
973	159	6
974	159	13
975	159	11
976	159	9
977	159	5
978	159	14
979	159	7
980	159	15
981	159	3
982	159	9
983	159	24
984	159	2
985	159	11
986	159	8
987	159	5
988	159	9
989	159	11
990	159	8
991	159	22
992	159	6
993	159	13
994	159	1
995	159	2
996	159	3
997	159	2
998	159	9
999	159	2
1000	159	19
1001	159	1
1002	159	7
1003	159	8
1004	160	22
1005	160	19
1006	160	4
1007	160	21
1008	160	13
1009	160	8
1010	160	18
1011	160	13
1012	160	22
1013	160	2
1014	160	7
1015	160	20
1016	160	5
1017	160	9
1018	160	10
1019	160	2
1020	160	12
1021	160	2
1022	160	5
1023	160	11
1024	160	22
1025	160	7
1026	160	17
1027	160	3
1028	160	9
1029	160	17
1030	160	8
1031	160	5
1032	160	3
1033	160	27
1034	160	22
1035	160	6
1036	160	5
1037	160	29
1038	160	20
1039	160	9
1040	160	22
1041	160	6
1042	160	2
1043	160	11
1044	160	3
1045	160	10
1046	160	5
1047	160	9
1048	160	1
1049	160	31
1050	160	30
1051	160	10
1052	160	5
1053	161	14
1054	161	8
1055	161	22
1056	161	1
1057	161	17
1058	161	22
1059	161	6
1060	161	5
1061	161	5
1062	161	9
1063	161	17
1064	161	16
1065	161	17
1066	161	9
1067	161	16
1068	161	3
1069	161	24
1070	161	20
1071	161	25
1072	161	9
1073	161	11
1074	161	5
1075	161	5
1076	161	31
1077	162	27
1078	162	8
1079	162	9
1080	162	14
1081	162	7
1082	162	18
1083	162	1
1084	162	8
1085	162	14
1086	162	5
1087	162	9
1088	162	11
1089	162	9
1090	162	11
1091	162	32
1092	162	32
1093	162	9
1094	162	20
1095	162	7
1096	162	18
1097	162	19
1098	162	23
1099	163	5
1100	163	11
1101	163	2
1102	163	20
1103	163	2
1104	163	9
1105	163	17
1106	163	21
1107	163	3
1108	163	16
1109	163	8
1110	163	18
1111	163	9
1112	163	27
1113	163	8
1114	163	8
1115	163	27
1116	163	20
1117	163	6
1118	163	13
1119	163	11
1120	163	20
1121	163	8
1122	163	19
1123	163	1
1124	163	13
1125	163	17
1126	163	20
1127	163	2
1128	163	3
1129	163	15
1130	163	8
1131	163	22
1132	163	24
1133	163	9
1134	163	1
1135	163	7
1136	163	24
1137	163	6
1138	163	18
1139	163	5
1140	163	7
1141	163	8
1142	163	18
1143	163	2
1144	163	20
1145	163	13
1146	163	24
1147	163	8
1148	163	1
1149	163	6
1150	163	20
1151	163	7
1152	163	18
1153	163	27
1154	163	9
1155	163	1
1156	163	7
1157	163	5
1158	163	3
1159	163	22
1160	163	7
1161	163	4
1162	163	19
1163	163	3
1164	163	6
1165	163	1
1166	163	13
1167	163	11
1168	163	8
1169	163	24
1170	163	17
1171	163	19
1172	163	3
1173	163	7
1174	163	18
1175	163	27
1176	164	3
1177	164	21
1178	164	17
1179	164	6
1180	164	5
1181	164	11
1182	164	22
1183	164	7
1184	164	17
1185	164	3
1186	164	9
1187	164	18
1188	164	8
1189	164	1
1190	164	6
1191	164	30
1192	164	10
1193	164	5
1194	164	9
1195	164	2
1196	164	18
1197	164	27
1198	164	19
1199	164	20
1200	164	2
1201	164	22
1202	164	9
1203	164	2
1204	164	18
1205	164	27
1206	164	19
1207	164	20
1208	164	2
1209	164	22
1210	164	10
1211	164	5
1212	164	9
1213	164	6
1214	164	23
1215	164	17
1216	164	22
1217	164	6
1218	164	5
1219	164	5
1220	165	10
1221	165	2
1222	165	12
1223	165	2
1224	165	5
1225	165	11
1226	165	22
1227	165	7
1228	165	17
1229	165	3
1230	165	9
1231	165	17
1232	165	16
1233	165	17
1234	165	9
1235	165	14
1236	165	8
1237	165	22
1238	165	1
1239	165	17
1240	165	22
1241	165	6
1242	165	5
1243	165	5
1244	166	6
1245	166	20
1246	166	2
1247	166	5
1248	166	3
1249	166	7
1250	166	11
1251	166	5
1252	166	6
1253	166	2
1254	166	22
1255	166	11
1256	166	16
1257	166	9
1258	166	11
1259	166	20
1260	166	8
1261	166	19
1262	166	1
1263	166	9
1264	166	1
1265	166	8
1266	166	11
1267	166	28
1268	166	6
1269	166	22
1270	167	28
1271	167	19
1272	167	4
1273	167	6
1274	167	22
1275	167	18
1276	167	6
1277	167	3
1278	167	6
1279	167	5
1280	167	9
1281	167	27
1282	167	8
1283	167	9
1284	167	2
1285	167	24
1286	167	2
1287	167	26
1288	167	8
1289	167	18
1290	167	13
1291	167	14
1292	167	6
1293	167	4
1294	167	13
1295	167	5
1296	167	6
1297	167	22
1298	167	12
1299	167	7
1300	167	11
1301	167	6
1302	167	5
1303	168	3
1304	168	6
1305	168	5
1306	168	3
1307	168	7
1308	168	18
1309	168	27
1310	168	9
1311	168	2
1312	168	19
1313	168	3
1314	168	8
1315	168	24
1316	168	2
1317	168	3
1318	168	6
1319	168	1
1320	168	13
1321	168	3
1322	168	6
1323	168	5
1324	168	3
1325	168	5
1326	168	9
1327	168	29
1328	168	2
1329	168	9
1330	168	2
1331	168	1
1332	168	8
1333	168	4
1334	168	6
1335	168	9
1336	168	17
1337	168	16
1338	168	8
1339	168	3
1340	168	8
1341	168	5
1342	168	16
1343	168	8
1344	168	17
1345	169	6
1346	169	20
1347	169	2
1348	169	5
1349	169	3
1350	169	7
1351	169	11
1352	169	5
1353	169	6
1354	169	2
1355	169	22
1356	169	11
1357	169	16
1358	169	9
1359	169	17
1360	169	21
1361	169	3
1362	169	16
1363	169	8
1364	169	18
1365	169	9
1366	169	11
1367	169	20
1368	169	8
1369	169	19
1370	169	1
1371	170	11
1372	170	9
1373	170	11
1374	170	32
1375	170	32
1376	170	9
1377	170	22
1378	170	8
1379	170	4
1380	170	8
1381	170	3
1382	170	7
1383	170	11
1384	170	5
1385	170	9
1386	170	11
1387	170	8
1388	170	24
1389	170	17
1390	170	19
1391	170	3
1392	170	6
1393	170	22
1394	170	13
1395	170	12
1396	170	7
1397	170	5
1398	170	7
1399	170	8
1400	170	18
1401	170	9
1402	170	24
1403	170	2
1404	170	11
1405	170	16
1406	170	7
1407	170	18
1408	170	6
1409	170	13
1410	170	20
1411	170	6
1412	170	2
1413	170	22
1414	170	18
1415	170	7
1416	170	18
1417	170	27
1418	171	11
1419	171	9
1420	171	11
1421	171	32
1422	171	32
1423	171	9
1424	171	17
1425	171	21
1426	171	3
1427	171	16
1428	171	8
1429	171	18
1430	171	9
1431	171	24
1432	171	2
1433	171	3
1434	171	20
1435	171	2
1436	171	4
1437	171	9
1438	171	3
1439	171	6
1440	171	18
1441	171	5
1442	171	8
1443	171	22
1444	171	15
1445	171	20
1446	171	8
1447	171	14
1448	172	5
1449	172	6
1450	172	11
1451	172	19
1452	172	22
1453	172	7
1454	172	3
1455	172	21
1456	172	9
1457	172	17
1458	172	21
1459	172	3
1460	172	16
1461	172	8
1462	172	18
1463	172	9
1464	172	27
1465	172	8
1466	172	9
1467	172	20
1468	172	7
1469	172	18
1470	172	19
1471	172	23
1472	173	6
1473	173	20
1474	173	7
1475	173	23
1476	173	7
1477	173	22
1478	173	9
1479	173	27
1480	173	8
1481	173	9
1482	173	24
1483	173	7
1484	173	11
1485	173	22
1486	173	8
1487	173	5
1488	173	6
1489	173	22
1490	173	12
1491	173	7
1492	173	11
1493	173	6
1494	173	5
1495	173	9
1496	173	6
1497	173	12
1498	173	6
1499	173	18
1500	173	3
1501	173	13
1502	173	5
1503	173	8
1504	173	19
1505	173	22
1506	173	11
1507	173	7
1508	173	18
1509	173	27
1510	174	22
1511	174	6
1512	174	2
1513	174	11
1514	174	3
1515	174	10
1516	174	5
1517	174	9
1518	174	10
1519	174	2
1520	174	12
1521	174	2
1522	174	5
1523	174	11
1524	174	22
1525	174	7
1526	174	17
1527	174	3
1528	174	9
1529	174	5
1530	174	2
1531	174	5
1532	174	5
1533	175	22
1534	175	19
1535	175	4
1536	175	21
1537	175	13
1538	175	8
1539	175	18
1540	175	13
1541	175	22
1542	175	2
1543	175	7
1544	175	20
1545	175	5
1546	175	9
1547	175	22
1548	175	6
1549	175	2
1550	175	11
1551	175	3
1552	175	10
1553	175	5
1554	175	9
1555	175	22
1556	175	19
1557	175	4
1558	175	21
1559	175	9
1560	175	11
1561	175	5
1562	175	5
1563	175	9
1564	175	17
1565	175	8
1566	175	5
1567	175	3
1568	175	27
1569	175	22
1570	175	6
1571	175	5
1572	175	29
1573	175	20
1574	176	22
1575	176	6
1576	176	2
1577	176	11
1578	176	3
1579	176	10
1580	176	5
1581	176	9
1582	176	10
1583	176	2
1584	176	12
1585	176	2
1586	176	9
1587	176	10
1588	176	2
1589	176	12
1590	176	2
1591	176	5
1592	176	11
1593	176	22
1594	176	7
1595	176	17
1596	176	3
1597	177	22
1598	177	19
1599	177	4
1600	177	21
1601	177	13
1602	177	8
1603	177	18
1604	177	13
1605	177	22
1606	177	2
1607	177	7
1608	177	20
1609	177	5
1610	177	9
1611	177	22
1612	177	19
1613	177	4
1614	177	21
1615	177	9
1616	177	11
1617	177	16
1618	177	6
1619	177	15
1620	177	9
1621	177	2
1622	177	24
1623	177	2
1624	177	26
1625	177	8
1626	177	18
1627	177	13
1628	177	14
1629	177	6
1630	177	4
1631	177	13
1632	177	5
1633	177	6
1634	177	22
1635	177	12
1636	177	7
1637	177	11
1638	177	6
1639	177	5
1640	177	9
1641	177	10
1642	177	2
1643	177	12
1644	177	2
1645	177	5
1646	177	11
1647	177	22
1648	177	7
1649	177	17
1650	177	3
1651	178	22
1652	178	6
1653	178	2
1654	178	11
1655	178	3
1656	178	13
1657	178	18
1658	178	2
1659	178	3
1660	178	7
1661	178	12
1662	178	6
1663	178	9
1664	178	22
1665	178	6
1666	178	2
1667	178	11
1668	178	3
1669	178	10
1670	178	5
1671	178	9
1672	178	10
1673	178	2
1674	178	12
1675	178	2
1676	178	5
1677	178	11
1678	178	22
1679	178	7
1680	178	17
1681	178	3
1682	178	9
1683	178	7
1684	178	8
1685	178	5
1686	178	9
1687	178	2
1688	178	18
1689	178	1
1690	178	22
1691	178	8
1692	178	7
1693	178	1
1694	179	10
1695	179	2
1696	179	12
1697	179	2
1698	179	5
1699	179	11
1700	179	22
1701	179	7
1702	179	17
1703	179	3
1704	179	9
1705	179	19
1706	179	5
1707	179	6
1708	179	22
1709	179	13
1710	179	7
1711	179	18
1712	179	3
1713	179	6
1714	179	22
1715	179	15
1716	179	2
1717	179	11
1718	179	6
1719	179	9
1720	179	22
1721	179	6
1722	179	2
1723	179	11
1724	179	3
1725	179	10
1726	179	5
1727	179	9
1728	179	20
1729	179	8
1730	179	27
1731	179	5
1732	179	3
1733	179	2
1734	179	5
1735	179	16
1736	179	9
1737	179	28
1738	179	7
1739	179	4
1740	179	2
1741	179	18
1742	179	2
1743	180	1
1744	180	8
1745	180	11
1746	180	28
1747	180	6
1748	180	22
1749	180	9
1750	180	27
1751	180	8
1752	180	9
1753	180	17
1754	180	21
1755	180	3
1756	180	16
1757	180	8
1758	180	18
1759	180	9
1760	180	2
1761	180	18
1762	180	5
1763	180	7
1764	180	4
1765	180	20
1766	180	6
1767	180	9
1768	180	28
1769	180	19
1770	180	4
1771	180	6
1772	180	22
1773	180	18
1774	180	6
1775	180	3
1776	180	6
1777	180	5
1778	181	22
1779	181	6
1780	181	5
1781	181	3
1782	181	13
1783	181	2
1784	181	17
1785	181	7
1786	181	9
1787	181	10
1788	181	2
1789	181	12
1790	181	2
1791	181	5
1792	181	11
1793	181	22
1794	181	7
1795	181	17
1796	181	3
1797	181	9
1798	181	17
1799	181	21
1800	181	3
1801	181	16
1802	181	8
1803	181	18
1804	182	17
1805	182	21
1806	182	3
1807	182	16
1808	182	8
1809	182	18
1810	182	9
1811	182	10
1812	182	2
1813	182	12
1814	182	2
1815	182	5
1816	182	11
1817	182	22
1818	182	7
1819	182	17
1820	182	3
1821	183	10
1822	183	2
1823	183	12
1824	183	2
1825	183	5
1826	183	11
1827	183	22
1828	183	7
1829	183	17
1830	183	3
1831	183	9
1832	183	12
1833	183	19
1834	183	6
1835	183	30
1836	183	10
1837	183	5
1838	183	9
1839	183	22
1840	183	6
1841	183	2
1842	183	11
1843	183	3
1844	183	10
1845	183	5
1846	183	9
1847	183	2
1848	183	18
1849	183	27
1850	183	19
1851	183	20
1852	183	2
1853	183	22
1854	184	22
1855	184	6
1856	184	2
1857	184	11
1858	184	3
1859	184	10
1860	184	5
1861	184	9
1862	184	22
1863	184	6
1864	184	2
1865	184	11
1866	184	3
1867	184	13
1868	184	18
1869	184	2
1870	184	3
1871	184	7
1872	184	12
1873	184	6
1874	184	9
1875	184	10
1876	184	2
1877	184	12
1878	184	2
1879	184	5
1880	184	11
1881	184	22
1882	184	7
1883	184	17
1884	184	3
1885	184	9
1886	184	27
1887	184	22
1888	184	2
1889	184	17
1890	184	16
1891	184	29
1892	184	20
1893	184	9
1894	184	2
1895	184	24
1896	184	2
1897	184	26
1898	184	8
1899	184	18
1900	184	13
1901	184	14
1902	184	6
1903	184	4
1904	184	13
1905	184	5
1906	184	6
1907	184	22
1908	184	12
1909	184	7
1910	184	11
1911	184	6
1912	184	5
\.


--
-- Data for Name: source; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.source (id, name, last_updated_at, last_update_message, last_update_message_details) FROM stdin;
1	stackoverflow	\N	\N	\N
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
31	3	1
32	+	1
\.


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.companies_id_seq', 48, true);


--
-- Name: company_url_reference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.company_url_reference_id_seq', 66, true);


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

SELECT pg_catalog.setval('public.job_tags_id_seq', 1912, true);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.jobs_id_seq', 184, true);


--
-- Name: source_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.source_id_seq', 1, true);


--
-- Name: stackoverflow_tags_cache_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stackoverflow_tags_cache_id_seq', 1, false);


--
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tag_id_seq', 32, true);


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


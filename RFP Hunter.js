/**
 * ==============================================================================
 * GLOBAL AGRIBUSINESS RFP HUNTER ENGINE v5.32 (INTELLIGENT LIFECYCLE & STRATEGIC PROCUREMENT)
 * ==============================================================================
 *
 * FIRM PROFILE: Agri Experience Ltd (Nairobi, Kenya)
 * Primary Focus: Seed Systems, AgTech, Policy & Regulatory Advisory, and Agricultural
 * Transformation across 21+ Sub-Saharan African Countries.
 *
 * MAJOR ENHANCEMENTS IN VERSION 5.32:
 *  1. AUTOMATED SHEET LIFECYCLE SWEEPER (auditTrackedOpportunitiesStatus):
 *     - Automatically audits logged notices on Active Open RFPs against real-time local deadlines.
 *     - Dynamically transitions and soft-color-codes status cells in batch:
 *       * "OPEN" (> 7 days remaining, soft green #c8e6c9 / #1b5e20)
 *       * "CLOSING SOON (Xd)" (<= 7 days remaining, soft amber #fff9c4 / #e65100)
 *       * "EXPIRED / CLOSED" (deadline passed, soft gray #f5f5f5 / #757575)
 *       * "OPEN (Rolling / TBD)" (ongoing/rolling solicitations, soft mint #e8f5e9 / #2e7d32)
 *     - Automatically scans and retires legacy contradictory entries in-place.
 *  2. STRATEGIC BIDDING CLASSIFICATION (LEAD_BIDDER vs. CONSORTIUM_PARTNER):
 *     - AI prompt and JSON schema classify each opportunity into LEAD_BIDDER vs. CONSORTIUM_PARTNER.
 *     - Suggests leading international prime partners (e.g. DAI, Chemonics, RTI, Tetra Tech, TechnoServe)
 *       for large-scale donor programs where Agri Experience serves as specialized seed systems / policy partner.
 *     - Recorded in new Column 12 ("Bidding Modality") with automatic sheet header auto-migration.
 *  3. ADDENDUM & DEADLINE EXTENSION DETECTOR:
 *     - Detects addenda, corrigenda, amendments, and deadline extensions matching tracked procurement reference codes.
 *     - Automatically updates the existing row's closing date and marks status as "OPEN (Extended)" with note
 *       "[Deadline extended to YYYY-MM-DD per Addendum]", eliminating stale expiration while preventing duplicate rows.
 *  4. ATTACHED TOR & OPPORTUNITY DEEP INGESTION:
 *     - Selectively enriches terse candidate descriptions (< 350 chars) or institutional opportunity landing pages
 *       (AGRA, AATF, AfDB, World Bank, CIMMYT, etc.) by fetching substantive paragraphs and attached TOR links (PDF/DOC).
 *     - Fully cached via CacheService (6-hour TTL) with strict timeout ceiling guards.
 *
 * MAJOR ENHANCEMENTS IN VERSION 5.31:
 *  1. ZERO-COST SOCIAL MEDIA PROCUREMENT HARVESTER (LINKEDIN, FACEBOOK, X/TWITTER):
 *     - Solved social opportunity sourcing without consuming Serper search credits or hitting anti-bot walls.
 *     - Introduced GOOGLE_NEWS_RSS_SOCIAL feed parsing public LinkedIn, Facebook, and X/Twitter procurement
 *       solicitations via Google News RSS syndication (100% Free, 0 API keys, 0 Serper credits).
 *     - Ingests real-time calls for proposals, RFPs, and tenders across Sub-Saharan Africa in ~2 seconds.
 *  2. AGGRESSIVE PRE-AI NOISE SIFTING (35s LATENCY REDUCTION & 70% TOKEN SAVINGS):
 *     - Expanded NON_AGRI_CIVIL_WORKS_REGEX to filter out predictable non-consultancy solicitations:
 *       physical facility guarding/security services, bulk chemical fertilizer delivery (urea/NPK),
 *       heavy industrial agro-processing machinery/milling equipment, borehole drilling/water trucking,
 *       and tech startup pre-seed/venture capital equity funds.
 *     - Drastically slashes candidates sent to Gemini AI (from 22 down to ~5-7), cutting AI chunk evaluation
 *       from 4 batches (50s) down to 1-2 batches (~15s), preventing script trigger timeouts.
 *  3. WORLD BANK PROCUREMENT TITLE RESOLVER:
 *     - Fixed bug where notices with missing bid descriptions erroneously fell back to notice_lang_name ("English"),
 *       causing meaningless titles. Now accurately falls back to project_name or notice_type.
 *  4. LOCATEFUND TECH VC & PRE-SEED SUPPRESSION:
 *     - Sitemap parser now filters out generic tech startup accelerators, angel investment rounds, and
 *       crypto/venture capital slugs lacking agricultural/food context pre-AI.
 *  5. CANONICAL URL NORMALIZATION:
 *     - Strips Google News article tracking parameters (oc) and social tracking (fbclid, utm) for rock-solid deduplication.
 *
 * MAJOR ENHANCEMENTS IN VERSION 5.30:
 *  1. ZERO-COST DIRECT SITEMAP INGESTION FOR LOCATEFUND:
 *     - Completely bypassed Cloudflare 403 on LocateFund's catalog page by directly ingesting
 *       https://locatefund.com/sitemap.xml (HTTP 200, 65 live opportunity URLs).
 *     - Formats opportunity titles directly from slugs, saving 1 Serper query per execution (120/month) with 0 API cost.
 *  2. CONSOLIDATED & GEO-FENCED IFAD TENDERS & CALLS FOR PROPOSALS:
 *     - Merged IFAD Project Procurement and Calls for Proposals into a single consolidated African opportunity feed.
 *     - Geo-fenced the search fallback with strict Sub-Saharan African country keywords, eliminating 80%+ irrelevant
 *       Latin American and Asian grant noise (Bangladesh, Caribbean, Morocco) before AI evaluation.
 *  3. SERPER PRESERVATION: DISABLED ZERO-YIELD SOCIAL MEDIA CRAWLERS:
 *     - Empirical log audit proved 100% of Facebook and 98%+ of LinkedIn search snippets were non-procurement
 *       commentary, webinars, or personal opinions, producing 0 accepted RFPs while burning ~15-20 Serper calls/day.
 *     - Disabled Facebook and LinkedIn search by default (enabled: false), saving ~360 Serper queries/month.
 *  4. STREAMLINED GOOGLE OPEN WEB SEARCH TEMPLATES (7 -> 4 HIGH-YIELD QUERIES):
 *     - Consolidated open web queries into 4 comprehensive, non-overlapping templates covering seed systems,
 *       agtech/biosafety, major institutional donors, and CGIAR centers.
 *  5. SUSTAINABLE ZERO-RELIANCE RUNTIME PROFILE:
 *     - Total Serper usage reduced to only ~4-5 queries per execution (~18 queries/day vs ~168 previously).
 *     - A single free Serper account (2,500 credits) now lasts nearly 5 months instead of exhausting in 15 days.
 *
 * MAJOR ENHANCEMENTS IN VERSION 5.29:
 *  1. SERPER QUOTA CONSERVATION (75% CREDIT REDUCTION):
 *     - Consolidated redundant Tier-3 search templates (Google Open Web: 21 -> 7; LinkedIn: 9 -> 2; Facebook: 5 -> 1).
 *     - Disabled low-yield X/Twitter search and eliminated cross-feed duplicate portal searches.
 *     - Reduced Serper calls from ~42 down to ~8-10 per execution, slashing monthly credit drain from ~5,000 to ~1,200.
 *  2. PERSISTENT FALLBACK SEARCH CACHING (6-HOUR TTL):
 *     - Added CacheService memoization (6h TTL) to queryPortalSerperFallback so Cloudflare-blocked portals (IFAD, etc.)
 *       query search at most once every 6 hours, eliminating redundant credit burn across scheduled runs.
 *  3. STAGNANT PORTAL AUTO-PIVOT ELIMINATION:
 *     - Retired the ILRI auto-pivot on expired tenders (no tenders published != broken scraper).
 *     - Restored direct REST API calls for ASARECA with fast timeout, falling back only when unreachable.
 *  4. CIMMYT ATS MEMOIZATION & REPOSITORY SUPPRESSION:
 *     - Cached Workable ATS listings to absorb HTTP 429 rate limits, and excluded knowledgecenter/repository research PDFs.
 *  5. PERSISTENT DEAD-KEY BLACKLISTING FOR SERPER:
 *     - Caches exhausted (HTTP 400 "not enough credits") and unauthorized Serper keys in CacheService with 6h TTL,
 *       skipping dead keys in 0.0ms without wasted network requests.
 *  6. DUAL-PHASE EXECUTION TIMEOUT ENFORCEMENT (GAS 6-MIN TRIGGER COMPLIANCE):
 *     - Replaced inaccurate 25-minute timeout ceiling with a strict 5.2-minute (310s) safe threshold.
 *     - Discovery ingestion capped at 2.5 minutes (150s), leaving 2.5+ minutes for chunk evaluation and sheet writes.
 *     - AI chunk evaluation halts gracefully at 260s (4m20s), guaranteeing that Google Sheet batch writes,
 *       email notifications, and diagnostics ALWAYS finish before Google Apps Script's 360s hard kill.
 *  7. HIGH-THROUGHPUT API STREAMLINING:
 *     - Trimmed World Bank search terms (14 -> 5) and UNGM/UNJobNet keywords, cutting discovery latency by ~45 seconds.
 *
 * MAJOR ENHANCEMENTS IN VERSION 5.28:
 *  1. RESILIENT CACHESERVICE TTL CAPPING (GAS 21,600s COMPLIANCE):
 *     - Introduced safeCachePut helper enforcing Google Apps Script's strict 21,600s (6-hour) maximum TTL ceiling.
 *     - Prevents silent Cache.put() exceptions that previously broke render key rotation and blocked admin alert emails.
 *  2. BULLETPROOF RENDER KEY POOL ROTATION:
 *     - Advances active key index before caching dead keys, ensuring key rotation continues across the entire pool
 *       even if one key is unauthorized (401), exhausted, or throws a network timeout.
 *
 * MAJOR ENHANCEMENTS IN VERSION 5.27:
 *  1. PRE-AI PROCUREMENT BANNER & RAW URL SUPPRESSION:
 *     - Automatically rejects generic portal policy banners (e.g. "Open and transparent procurement process")
 *       and titles embedding raw external web URLs in parentheses pre-AI, saving Gemini evaluation budget.
 *
 * MAJOR ENHANCEMENTS IN VERSION 5.26:
 *  1. SAIGE NEXT.JS RSC LINK PARSER FIX:
 *     - Fixed off-by-one card-to-link binding by capturing href and card body as atomic units in both
 *       Next.js RSC streams and HTML, eliminating misdirected URLs.
 *  2. SUBSTANTIVE & COUNTRY-AWARE FUZZY TITLE DEDUPLICATION:
 *     - Stripped procurement stopwords and introduced African country separation in isFuzzyTitleDuplicate,
 *       stopping multi-post duplicate syndications (e.g. AFSA, NBA) while preserving distinct country tenders.
 *  3. TRUNCATED SNIPPET TITLE RESOLVER:
 *     - Detects search snippet titles ending in ellipses ("...") and replaces them with complete,
 *       untruncated AI-extracted specific opportunity titles.
 *  4. MEDICAL SECTOR & IN-PLACE LEGACY SHEET AUDITOR:
 *     - Enforces immediate rejection for medical/health tenders lacking agricultural focus, and adds
 *       an automated audit in updateExpiredProposalsStatus to retire legacy pre-v5.22 contradictions.
 *
 * MAJOR ENHANCEMENTS IN VERSION 5.25:
 *  1. PRE-AI AUTOMOTIVE & NURSERY HARDWARE DEFENSE:
 *     - Added midi bus spare parts, automotive components, and polythene/polyethylene tubes to NON_AGRI_CIVIL_WORKS_REGEX.
 *     - Eliminates wasteful Gemini AI calls for physical equipment tenders published under Ministry/Bureau of Agriculture headers.
 *  2. BARE SOCIAL MEDIA POST MASTHEAD GUARD:
 *     - Added ^[\w\s.-]+(?:'s|’s)\s+posts?$ to GENERIC_TITLE_PATTERNS.
 *     - Replaces uninformative social media author headers (e.g., "JohnBaptist Galiwango's Post") with substantive AI-extracted
 *       opportunity titles or rejects them via Masthead Guard if non-actionable.
 *
 * MAJOR ENHANCEMENTS IN VERSION 5.24:
 *  1. TITLE SANITIZATION & RAW DOCUMENT RESOLVER:
 *     - Automatically strips file extensions (.pdf, .docx, .doc, .xlsx) and cleans hyphenated/slugified filenames.
 *     - Prefers substantive AI-extracted titles for direct PDF/document solicitations (e.g. converting
 *       "Invitation-to-Tender-National-Baseline-Survey.pdf" -> substantive professional title).
 *  2. UNGM QUERY STREAMLINING (LATENCY OPTIMIZATION):
 *     - Streamlined UNGM search keywords from 11 to the 6 core distinct terms, cutting ~22s of sequential
 *       HTTP POST latency while retaining 100% of agricultural and seed tender coverage.
 *  3. SERPER OPEN WEB QUERY DE-DUPLICATION:
 *     - Removed redundant site-specific queries for portals already scraped via dedicated API feeds (cimmyt.org,
 *       ungm.org, and duplicate afdb.org), saving ~10s of Serper search time.
 *  4. DISCOVERY GUARD HEADROOM RESTORATION:
 *     - Total discovery runtime reduced by ~35s+, preventing premature ingestion cutoffs (>270s) and ensuring
 *       late-tier sources (Facebook, X, ASARECA) complete reliably.
 *
 * MAJOR ENHANCEMENTS & BUG FIXES IN VERSION 5.23:
 *  1. WORD-BOUNDARY SEED KEYWORD GUARD (CRITICAL FIX):
 *     - Enforces strict token boundary matching (?:^|[^a-zA-Z0-9_]) for CORE_SEED_KEYWORDS.
 *     - Eliminates critical pre-AI filter bypasses where short seed acronyms (rimi, dus, vin, stak, ista)
 *       falsely matched inside non-agri words like "cybercriminalité", "industry", "province", and "mistake".
 *  2. HARDENED NON-AGRI SECTOR & IT HARDWARE REGEX:
 *     - Expanded NON_AGRI_CIVIL_WORKS_REGEX to discard generic IT hardware tenders (Dell, Lenovo, HP,
 *       laptops, servers, switches, SSL certificates, photocopiers), corporate travel/insurance audits,
 *       deep-sea fishing tools, livestock purchasing, gender-based violence (VBG/GBV), and French road works.
 *  3. MULTI-VARIANT GENERAL PROCUREMENT NOTICE (GPN) SUPPRESSION:
 *     - Broadened NON_LISTING_TITLE_PATTERNS to suppress all GPN / SPN variants lacking specific tender scopes.
 *  4. BARE MINISTRY MASTHEAD RESOLVER:
 *     - Added generic ministry and department mastheads ("MINISTRY OF AGRICULTURE", "DEPARTMENT OF...")
 *       to isBareGovernmentOrGenericTitle so bare headers without a consultancy title are suppressed.
 *  5. MULTI-DONOR PROCUREMENT REFERENCE EXTRACTOR:
 *     - Expanded extractProcurementRefCode to parse RFP/AGRA/..., WB-P..., CI-PADCI-..., GCP/..., and ITB/... codes.
 *  6. HIT COUNTING INTEGRITY:
 *     - Upgraded countDistinctKeywordHits to apply token boundaries across all keywords, preventing inflated scores.
 *
 * MAJOR ENHANCEMENTS IN VERSION 5.22:
 *  1. SAIGE AFRICA OPPORTUNITY HUB DEDICATED SCRAPER & DEEP-LINK RESOLVER:
 *     - Direct Next.js RSC & HTML opportunity card parser for saigeopportunity.org.
 *     - Replaces generic directory/filter URLs (e.g. /opportunities?family=funding) with direct,
 *       actionable opportunity links (/opportunities/[slug]) across grants, seed tenders, RFQs,
 *       agribusiness accelerators, and continental agriculture programs (CAADP).
 *  2. SAIGE CATALOG & DIRECTORY BOILERPLATE GUARD:
 *     - Suppresses top-level directory root URLs (/opportunities, /opportunities?family=..., /directory, /map)
 *       and catalog titles ("Funding for businesses - SAIGE Opportunity") in pre-AI filters so generic aggregators
 *       are never logged as single RFPs.
 *
 * MAJOR ENHANCEMENTS IN VERSION 5.21:
 *  1. PRE-AI IT & SOFTWARE CURRICULUM LEAK SUPPRESSION (P1):
 *     - Expanded NON_AGRI_CIVIL_WORKS_REGEX with generic IT hardware, cybersecurity,
 *       university computer science curriculum, VR/AR, and software development terms.
 *     - Discards non-agri donor digital infrastructure/curriculum tenders pre-AI,
 *       saving 100% of Gemini AI evaluation calls and tokens on generic multilateral tech grants.
 *
 *  2. PERSISTENT DEAD-KEY BLACKLISTING (P2):
 *     - In fetchRenderedHtml, keys returning HTTP 401 (Unauthorized/Expired) are cached in
 *       CacheService with a 6-hour TTL (DEAD_RENDER_KEY_...) adhering strictly to GAS limits.
 *     - Subsequent runs bypass dead render keys in 0.0ms, saving 30+ seconds of wait latency.
 *
 *  3. STAGNANT PORTAL AUTO-PIVOT (P3):
 *     - If 100% of notices parsed from a legacy portal table (e.g. ILRI Drupal) are expired,
 *       the engine automatically pivots to a Google Serper portal search, ensuring fresh
 *       solicitations indexed elsewhere across the domain are captured.
 *
 *  4. HIGH-VALUE REGIONAL DONOR EXPANSION (P4):
 *     - Integrated dedicated discovery queries for TradeMark Africa (TMA), SNV Netherlands
 *       Development Organisation, and Enabel (Belgian Development Agency).
 *
 *  5. ENTERPRISE OBSERVABILITY & AUTOMATED ADMIN ALERTING (P5):
 *     - Added notifyAdminAlert() with 12-hour throttling to notify administrators via email
 *       when Serper keys are running low, Gemini quota depletes, or Discovery Guard trips.
 *
 *  5. BARE GOVERNMENT MASTHEAD & UNINFORMATIVE TITLE RESOLVER (v5.19):
 *     - Pre-AI boilerplate guard: Suppresses bare country/state mastheads (e.g. "REPUBLIC OF KENYA",
 *       "GOVERNMENT OF RWANDA") and generic directory URLs lacking explicit tender context.
 *     - Intelligent single-tender AI title extraction: Mandates that the AI evaluator extract a
 *       substantive, professional opportunity title (combining issuing authority + assignment scope).
 *       a management and technical advisory consulting firm, never a physical seed vendor
 *       or commodity merchant.
 *     - Anti-hallucination mandate in AI base prompt: Strictly forbids fabricating issuing
 *       client names (e.g. inventing "Kenya Seed Company Limited" for general tenders).
 *     - Evaluator model chain prioritized to gemini-3.8-flash and gemini-3.5-flash ahead of
 *       flash-lite to ensure high semantic fidelity and zero entity hallucinations.
 *
 *  3. DETERMINISTIC PHYSICAL COMMODITY & SEED SUPPLY CAPPER:
 *     - Hard code guard (Calibration 1G) capping tenders for purchasing or supplying physical
 *       goods (crop seeds, seedlings, grain, fertilizer, tractors, equipment) at <= 20% NO-GO
 *       and routing to Filtered Out unless explicit consulting/advisory scope exists.
 *
 *  4. SALARIED RECRUITMENT & JOB VACANCY PRE-AI SUPPRESSION:
 *     - Universal URL slug and text regex detecting employee hiring notices ("were-hiring",
 *       "we-are-hiring", "job-vacancy", "staff-recruitment"), dropping them pre-AI.
 *
 *  5. YOUTH PITCH CONTEST & CASH PRIZE CHALLENGE FILTRATION:
 *     - Expanded hackathon and competition filters to suppress youth entrepreneurship
 *       competitions offering cash prizes and mentorship, keeping the list firm-level.
 *
 *  6. URBAN MUNICIPAL PLANNING & NON-AGRI POLICY FILTER:
 *     - Hard guard (Calibration 1H) dropping urban planning, city charters, and municipal
 *       governance tenders lacking core crop/seed/agriculture scope.
 *
 *  7. PROCUREMENT REFERENCE CODE DEDUPLICATION:
 *     - Automatically extracts unique procurement codes (e.g. PRQ20251314, OP00474383) across
 *       web URLs and syndicated PDF documents for O(1) cross-format duplicate rejection.
 *
 * ==============================================================================
 */

const CONFIG = {
    PRIMARY_AI_PROVIDER: 'GEMINI',    // 'GEMINI' (Primary with 3.8/3.5/3.7 Flash fallback chain) or 'GROQ'

    // SCRIPT RUNTIME SAFETY CEILING:
    // Google Apps Script time-driven triggers have a strict 6-minute (360,000 ms) execution ceiling.
    // Setting this safe ceiling to 310s (5.2m) guarantees discovery and AI evaluation stop with ample headroom
    // for spreadsheet batch writes and notifications, completely preventing "Exceeded maximum execution time" aborts.
    SCRIPT_TIMEOUT_LIMIT_MS: 310 * 1000,
    WORKSPACE_TIMEOUT_LIMIT_MS: 310 * 1000, // Preserved alias for backwards compatibility

    SHEET_NAME: 'Active Open RFPs',
    FILTERED_SHEET_NAME: 'Filtered Out (Not Genuine RFPs)',
    ENABLE_EMAIL_ALERTS: true, // Automatically sends email notifications for best-fitting opportunities (score >= 70) to all sheet collaborators

    MIN_SCORE_FOR_ALERT: 70,
    MIN_SCORE_FOR_ACTIVE_LOGGING: 40, // Minimum business-fit score (0-100) to log to Active Open RFPs; lower scores (<40 or NO-GO) routed to Filtered Out

    ONLY_LOG_OPEN_PROPOSALS: true,
    MAX_CANDIDATES_TO_PROCESS: 36, // 6 chunks of 6; guarantees completion within Google Apps Script's 6-minute trigger limit

    AI_EVALUATION_CHUNK_SIZE: 6, // 6 items per chunk keeps token consumption below Groq TPM limits (~2,400 tokens)

    INTER_FEED_DELAY_MS: 400,
    GEMINI_DAILY_CALL_LIMIT: 1400,
    // Reserve internal Gemini budget for evaluation; discovery may use only the excess.

    GEMINI_EVALUATION_RESERVE: 100,
    GEMINI_DISCOVERY_MIN_REMAINING: 100,
    EXISTING_ROWS_LOOKBACK: 3000,
    RENDER_PROVIDERS: [
        {
            name: 'ScrapingAnt',
            apiKeyProperty: 'SCRAPINGANT_API_KEY',
            creditBudget: 10000,
            resetPeriod: 'monthly',
            buildUrl: (apiKey, targetUrl) => `https://api.scrapingant.com/v2/general?x-api-key=${apiKey}&url=${encodeURIComponent(targetUrl)}&browser=true`
        },
        {
            name: 'ScraperAPI',
            apiKeyProperty: 'RENDER_API_KEY',
            creditBudget: 1000,
            resetPeriod: 'monthly',
            buildUrl: (apiKey, targetUrl) => `https://api.scraperapi.com/?api_key=${apiKey}&url=${encodeURIComponent(targetUrl)}&render=true`
        },
        {
            name: 'Crawlbase (backup)',
            apiKeyProperty: 'CRAWLBASE_JS_TOKEN',
            creditBudget: 400,
            resetPeriod: 'lifetime',
            buildUrl: (apiKey, targetUrl) => `https://api.crawlbase.com/?token=${apiKey}&url=${encodeURIComponent(targetUrl)}`
        }
    ],
    // Pre-AI relevance gate. Generic portal/navigation noise below 2 points is

    // rejected before AI; candidates scoring 2+ proceed to evaluation.

    MIN_RELEVANCE_SCORE: 2,
    FRESHNESS_MONTHS_BACK: 1,
    // Current Gemini production/preview-compatible Flash chain.

    // Reference: https://ai.google.dev/gemini-api/docs/models

    // Grounded Google Search is supported by Gemini 3.8/3.7/3.6/3.5 Flash.

    GEMINI_GROUNDED_SEARCH_MODELS: ['gemini-2.0-flash', 'gemini-3.5-flash', 'gemini-3.7-flash', 'gemini-3.8-flash'],
    GEMINI_MODEL_FALLBACK_CHAIN: [
        'gemini-3.5-flash-lite',
        'gemini-3.5-flash',
        'gemini-3.7-flash',
        'gemini-3.8-flash'
    ],
    GEMINI_MAX_MODEL_ATTEMPTS: 4,
    // OpenAI-compatible fallback providers. Model IDs are current as of

    // September 2026; availability/free-tier access still depends on the account.

    FREE_EVALUATOR_PROVIDERS: [
        {
            name: 'Groq Llama 3.3 70B',
            apiKeyProperty: 'GROQ_API_KEY',
            baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
            model: 'llama-3.3-70b-versatile'
        },
        {
            name: 'Groq Llama 3.1 8B Instant',
            apiKeyProperty: 'GROQ_API_KEY',
            baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
            model: 'llama-3.1-8b-instant'
        },
        {
            name: 'Groq GPT-OSS 120B',
            apiKeyProperty: 'GROQ_API_KEY',
            baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
            model: 'openai/gpt-oss-120b'
        },
        {
            name: 'Groq GPT-OSS 20B',
            apiKeyProperty: 'GROQ_API_KEY',
            baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
            model: 'openai/gpt-oss-20b'
        }
    ],
    FIRM_PROFILE: `

    Firm: Agri Experience Ltd (Nairobi, Kenya) — an expert agricultural consulting practice

    specializing in transforming seed systems and agricultural value chains across Sub-Saharan Africa.

    Agri Experience operates as a specialized practice (like a medical or legal firm) combining 85+ years

    of collective seed sector and agribusiness expertise.

    Website: www.agri-experience.com

    Headquarters: Watermark Business Park, Spring Court, Karen, Nairobi, Kenya.

    Geographic Track Record (21+ African countries):

    Burkina Faso, Burundi, Democratic Republic of Congo (DRC), Ethiopia, Ghana, Kenya, Liberia,

    Malawi, Mali, Mozambique, Niger, Nigeria, Rwanda, Senegal, Sierra Leone, South Africa,

    South Sudan, Tanzania, Uganda, Zambia, Zimbabwe.

    Core Practice Domains & Service Offerings (from www.agri-experience.com):

    1. Seed Systems & Market Development (Project Implementation)

       - Tracking seed market performance and developing actionable recommendations from longitudinal data.

       - Analyzing value chains and business ecosystems to improve competitiveness, investment, and market access for producers and agribusinesses.

       - End-to-end program execution bridging strategy with field delivery (e.g. Gates Foundation ESSETA in Tanzania, TASAI - The African Seed Access Index).

       - Strengthening last-mile seed, planting material, and input distribution networks.

    2. Policy & Regulatory Advisory

       - Technical assistance for national seed policy development, regulatory reforms, and institutional governance.

       - Unlocking regulatory bottlenecks: Authorizing private seed inspectors and laboratory analysts (with KEPHIS, TOSCI), standard seed class protocols for non-hybrid & food security crops.

       - Operationalizing co-regulation between public regulatory authorities and private seed trade associations (STAK, TASTA, AFSTA).

       - Regional seed trade protocol harmonization (EAC, COMESA, SADC, ECOWAS) and cross-border seed movement.

    3. Technical Studies & Scoping Exercises

       - Rigorous scoping studies, sector assessments, feasibility analyses, and baseline studies.

       - Planting materials for value chain crops (horticulture, pasture & fodder, vegetatively propagated crops: cassava, sweet potato, banana tissue culture, avocado, mango).

       - Horticulture seedling nurseries as viable commercial business models.

       - Agrodealer mapping, network assessments, and agrodealer association development.

    4. Digital Platforms, Seed IT & Verification

       - Scalable web and mobile platforms, databases, dashboards, and decision-support systems.

       - Anti-counterfeit seed verification & farmer reporting systems: "Mulika Mbegu Mbovu" (M3) in Kenya, "Ripoti Mbegu Isiyo Bora" (RIMI) in Tanzania, scratch-off authentication labels.

       - Seed variety selection platforms (MbeguChoice) matching varieties to agro-ecological zones, altitude, and rainfall.

       - Variety Identification Number (VIN) systems and seed demand forecasting platforms.

    5. Capacity Building & Institutional Strengthening

       - Institutional strengthening of governments, research institutes (KALRO, TARI), seed companies, extension services, agrodealers, and farmer organizations.

       - Flagship tools: The African Seed Company Toolbox (52 tools for seed enterprise managers, Gates Foundation funded), university seed business curricula (SEMIs, WACCI).

    6. Strategic Advisory, MEL & Stakeholder Convenings

       - Thematic studies, Monitoring, Evaluation & Learning (MEL) frameworks, and adaptive management.

       - Independent development partner program reviews (USAID Feed the Future, Gates Foundation, AGRA, FCDO/DFID, World Bank).

       - Multi-stakeholder convenings, learning journeys, and public-private dialogue facilitating systemic collaboration.

    7. Agribusiness, Youth & Women Entrepreneurship

       - Business modeling and incubation for youth and women in agribusiness and seed enterprises.

       - Input supply chain development, agrodealer business training, and farmer empowerment.

    Target Institutional Clients & Partners:

    USAID (Feed the Future, RTI, DAI, Chemonics), Bill & Melinda Gates Foundation, AGRA,

    UK FCDO/DFID, World Bank, AfDB, IFAD, FAO, CGIAR Centers (IITA, CIMMYT, ICRISAT, CIP, CIAT, Bioversity, ICRAF),

    National Regulators (KEPHIS, TOSCI, SCCI), Seed Trade Associations (STAK, TASTA, AFSTA), Catholic Relief Services (CRS).

    HOW TO EVALUATE AGRIBUSINESS & FIT:

    - HIGH FIT: Solicitations directly focusing on seed systems, seed policy/regulation, seed certification, variety release/catalogue, seed companies/enterprises, agrodealers, planting materials, vegetative propagation, seedling nurseries, anti-counterfeit seed, or seed sector digital platforms.

    - HIGH/MEDIUM FIT: Agribusiness consultancies, EOIs, or grant programs addressing input market systems, youth/women agribusiness incubation, seed enterprise scaling, agrodealer associations, agricultural value chain scoping/feasibility studies, or agricultural transformation MEL/advisory.

    - LOW FIT: Genuine agricultural consultancies that focus solely on general agronomy with no input/seed/enterprise/policy dimension.

    - NONE / NO-GO: Physical bulk commodity procurement (buying grain, fertilizer, or food rations), civil engineering/infrastructure construction (dams, roads, civil works), pure livestock veterinary medicine/vaccine delivery, deep-sea marine fisheries, or farm tractor/machinery mechanics.

  `,
    WORLD_BANK_SEARCH_TERMS: [
        'seed',
        'seed systems',
        'agribusiness',
        'crops',
        'planting materials',
        'biosafety',
        'agricultural policy',
        'agricultural extension',
        'semences'
    ],
    FEEDS: [
        // =========================================================================
        // TIER 1: LIGHTNING-FAST INSTITUTIONAL & REGIONAL APIS (~15s CUMULATIVE)
        // High yield, structured JSON/REST endpoints, 100% African focus
        // =========================================================================
        {
            name: 'TenderSure Africa Open Bids',
            url: 'https://website-api.tendersure.africa/api/v1/core/open-bids/?page=1&page_size=25',
            type: 'TENDERSURE_API',
            baseUrl: 'https://www.tendersure.africa',
            enabled: true,
            assumeAfrican: true
        },
        {
            name: 'AGRA Procurement Portal',
            type: 'AGRA_ORACLE_API',
            enabled: true,
            url: "https://ekjd.fa.em2.oraclecloud.com/fscmRestApi/rest/rv:ef9d2217-db96-4c96-ab8a-675ac58d8811/en/11.13.18.05:9/supplierNegotiationAbstracts?finder=RowFinderByBU%3BProcurementBUId%3D300000001758758&orderBy=PostingDate%3Adesc&q=NegotiationStatusCode%20%3D%20%27ACTIVE%27&fields=AttachmentsCount%2CAuctionHeaderId%2CBuyerName%2CCloseDate%2CNegotiation%2CNegotiationStatus%2CNegotiationStatusCode%2CNegotiationTitle%2CNegotiationType%2COpenDate%2CPostingDate%2CPreviewDate%2CProcurementBUId%2CProcurementBUName%2CPublishDate%2CSynopsis%2CTimeRemaining%2CTimeRemainingOrder&limit=25&offset=0",
            abstractListingPageUrl: "https://ekjd.fa.em2.oraclecloud.com/fscmUI/redwood/negotiation-abstracts/view/abstractlisting?prcBuId=300000001758758"
        },
        {
            name: 'AGRA Opportunities & Concept Notes',
            type: 'AGRA_OPPORTUNITIES_API',
            url: 'https://agra.org/wp-json/wp/v2/opportunity?per_page=100',
            baseUrl: 'https://agra.org',
            enabled: true,
            assumeAfrican: true
        },
        {
            name: 'CIMMYT Opportunities & Consultancies (CGIAR)',
            type: 'CIMMYT_OPPORTUNITIES_API',
            url: 'https://apply.workable.com/api/v1/widget/accounts/577052',
            webUrl: 'https://www.cimmyt.org/careers/',
            baseUrl: 'https://www.cimmyt.org',
            enabled: true,
            assumeAfrican: false
        },
        {
            name: 'AATF Tenders & EOIs',
            type: 'AATF_TENDERS_SCRAPER',
            url: 'https://www.aatf-africa.org/tenders/',
            baseUrl: 'https://www.aatf-africa.org',
            enabled: true,
            assumeAfrican: true
        },
        {
            name: 'ILRI Procurement & Tenders (CGIAR)',
            type: 'ILRI_TENDERS_SCRAPER',
            url: 'https://www.ilri.org/tenders',
            baseUrl: 'https://www.ilri.org',
            enabled: true,
            assumeAfrican: true
        },
        {
            name: 'FundsforNGOs Grants & Calls for Proposals',
            type: 'FUNDS_FOR_NGOS_API',
            baseUrl: 'https://www2.fundsforngos.org',
            url: 'https://www2.fundsforngos.org/wp-json/wp/v2/posts',
            enabled: true,
            assumeAfrican: false,
            searchKeywords: ['seed', 'agribusiness', 'agriculture', 'crops', 'agtech', 'biosafety', 'seed systems', 'adapted crops', 'climate resilient', 'capacity building']
        },
        {
            name: 'Global South Opportunities Funding',
            url: 'https://www.globalsouthopportunities.com/category/funding/feed/',
            type: 'GLOBAL_SOUTH_OPP_FEED',
            baseUrl: 'https://www.globalsouthopportunities.com',
            enabled: true,
            assumeAfrican: false
        },
        {
            name: 'LocateFund African Funding Opportunities',
            url: 'https://locatefund.com/opportunities/',
            sitemapUrl: 'https://locatefund.com/sitemap.xml',
            type: 'LOCATEFUND_API',
            baseUrl: 'https://locatefund.com',
            enabled: true,
            assumeAfrican: true,
            searchKeywords: ['agriculture', 'seed', 'agribusiness', 'crops', 'farming', 'grant', 'funding', 'call for proposals', 'farmer advisory', 'seed advisory', 'agtech', 'agritech', 'agri-tech', 'agri tech', 'agrodealer', 'agro-dealer', 'gmo', 'biosafety', 'seed systems', 'adapted crops', 'input distribution', 'semences', 'capacity building', 'institutional strengthening']
        },
        {
            name: 'SAIGE Africa Opportunity Platform',
            url: 'https://saigeopportunity.org/opportunities',
            marketUrl: 'https://saigeopportunity.org/opportunities?family=market',
            baseUrl: 'https://saigeopportunity.org',
            type: 'SAIGE_OPPORTUNITIES_SCRAPER',
            enabled: true,
            assumeAfrican: true
        },

        // =========================================================================
        // TIER 2: MULTILATERAL AGENCIES & STRUCTURED PROCUREMENT HUBS (~100s)
        // Global and continental databases with official solicitation pipelines
        // =========================================================================
        { name: 'AfDB Requests for EOI', url: 'https://www.afdb.org/en/documents/project-related-procurement/procurement-notices/request-for-expression-of-interest', type: 'RENDERED_BLOCK_SCRAPER', baseUrl: 'https://www.afdb.org', enabled: true, assumeAfrican: true },
        {
            name: 'IFAD African Procurement & Calls for Proposals',
            url: 'https://www.ifad.org/en/project-procurement/opportunities',
            callsUrl: 'https://www.ifad.org/en/call-for-proposals',
            type: 'IFAD_PROJECT_PROCUREMENT',
            baseUrl: 'https://www.ifad.org',
            enabled: true,
            assumeAfrican: true,
            pagination: { paramName: 'page', maxPages: 2 },
            includeNoticeTypes: ['General Procurement Notice', 'Specific Procurement Notice', 'Call for Proposals'],
            excludeNoticeTypes: ['Contract Award Notice']
        },
        { name: 'EU TED Search API (Agriculture)', type: 'TED_API', enabled: true },
        { name: 'World Bank Procurement API (Global)', type: 'WORLD_BANK', enabled: true },
        {
            name: 'Africa-Europe Innovation Platform Funding',
            url: 'https://www.africaeuropeinnovation.net/funding-opportunities/?topic=Food+Systems',
            type: 'AEIP_SCRAPER',
            baseUrl: 'https://www.africaeuropeinnovation.net',
            enabled: true,
            assumeAfrican: true,
            pagination: { paramName: 'pg', maxPages: 3 },
            excludeLinkPatterns: [/\/ip-helpdesk\/?/i, /\/submit-funding-opportunity\/?/i]
        },
        {
            name: 'All Business Africa Tenders',
            type: 'ALL_BUSINESS_AFRICA_API',
            url: 'https://allbusiness.africa/api/opportunities',
            baseUrl: 'https://allbusiness.africa',
            enabled: true,
            assumeAfrican: true,
            maxPages: 2,
            perPage: 50,
            searchTerms: ['seed', 'agribusiness', 'seed systems', 'agriculture', 'semences', 'planting materials', 'capacity building']
        },
        {
            name: 'UNGM Procurement Opportunities',
            type: 'UNGM_API',
            baseUrl: 'https://www.ungm.org',
            url: 'https://www.ungm.org/Public/Notice',
            enabled: true,
            searchKeywords: ['seed', 'agribusiness', 'crops', 'agtech', 'seed systems', 'planting material', 'semences', 'capacity building']
        },
        {
            name: 'UNJobNet Consultancies & EOIs',
            type: 'UNJOBNET_SCRAPER',
            baseUrl: 'https://www.unjobnet.org',
            url: 'https://www.unjobnet.org/jobs',
            enabled: true,
            assumeAfrican: false,
            searchKeywords: ['seed', 'crops', 'agribusiness', 'agtech', 'biosafety', 'seed systems', 'phytosanitary', 'semences', 'capacity building']
        },

        // =========================================================================
        // TIER 3: OPEN WEB & SOCIAL MEDIA DISCOVERY (STREAMLINED ~12s)
        // High-precision consolidated queries hunting genuine organizational RFPs
        // =========================================================================
        {
            name: 'Google Open Web RFP Search (Serper)',
            type: 'GOOGLE_SEARCH_API',
            enabled: true,
            queryTemplates: [
                // 1. Seed Systems, VPC, SPS, Certification & Francophone Opportunities
                '("RFP" OR "Request for Proposals" OR "Expression of Interest" OR EOI OR Consultancy OR Tender OR "Call for Proposals" OR "Appel d\'offres" OR "Manifestation d\'intérêt") ("seed system" OR "semence" OR "seed certification" OR "seed policy" OR "early generation seed" OR "planting material" OR "phytosanitary" OR "tissue culture") (Africa OR Kenya OR Tanzania OR Uganda OR Nigeria OR Ghana OR Ethiopia OR Rwanda OR Senegal OR "Cote d\'Ivoire") after:{DATE_FLOOR} -jobs -vacancy -salary',
                // 2. AgTech, AI in Extension, Farmer Advisory & Biosafety
                '("RFP" OR "Request for Proposals" OR "Expression of Interest" OR EOI OR "Call for Proposals" OR "Terms of Reference" OR "Call for Concept Notes") ("agritech" OR "agtech" OR "digital agriculture" OR "farmer advisory" OR "seed advisory" OR "biosafety" OR "GMO" OR "biotechnology regulation" OR "e-extension") (Africa OR Kenya OR Rwanda OR Tanzania OR Uganda OR Ghana OR Nigeria OR Ethiopia OR Malawi) after:{DATE_FLOOR} -jobs -vacancy',
                // 3. High-Value Institutional Donors (Gates, AGRA, USAID, Feed the Future, Mastercard, Rockefeller, GIZ, FCDO, Enabel, SNV)
                '("Gates Foundation" OR "AGRA" OR "USAID" OR "Feed the Future" OR "Mastercard Foundation" OR "Rockefeller Foundation" OR "GIZ" OR "TradeMark Africa" OR "FCDO" OR "Enabel" OR "SNV") ("seed systems" OR "agribusiness" OR "agricultural advisory" OR "capacity building" OR "planting materials" OR "adapted crops" OR "VACS" OR "semences") (RFP OR EOI OR Consultancy OR Tender OR "Call for Proposals" OR "Call for Concept Notes") Africa after:{DATE_FLOOR} -jobs -vacancy',
                // 4. Major International Procurement Portals, RECs & CGIAR Centers
                '(site:sam.gov OR site:reliefweb.int/jobs OR site:developmentaid.org/tenders OR site:developmentaid.org/grants OR "CGIAR" OR "IITA" OR "CIMMYT" OR "ICRISAT" OR "AATF" OR "CORAF" OR "ASARECA" OR "COMESA" OR "ECOWAS") ("seed" OR "semence" OR "crops" OR "agribusiness" OR "variety release" OR "planting materials" OR "agrodealer") (RFP OR EOI OR Consultancy OR Tender OR "Call for Proposals") Africa after:{DATE_FLOOR} -inurl:search -jobs -vacancy'
            ]
        },
        {
            name: 'Social Media Opportunities (LinkedIn, FB, X via Google News RSS)',
            type: 'GOOGLE_NEWS_RSS_SOCIAL',
            enabled: true,
            assumeAfrican: true,
            queries: [
                'site:linkedin.com/posts ("Request for Proposals" OR "Call for Proposals" OR "Call for Applications" OR "Call for Concept Notes" OR "Expression of Interest" OR RFP OR EOI OR "Appel à propositions") ("seed" OR "semence" OR "agriculture" OR "agribusiness" OR "agritech") Africa when:30d',
                'site:facebook.com ("Request for Proposals" OR "Call for Proposals" OR "Call for Concept Notes" OR "tender" OR "Appel d\'offres") ("seed" OR "semence" OR "agriculture" OR "agribusiness") Africa when:30d',
                '(site:x.com OR site:twitter.com) ("Request for Proposals" OR "Call for Proposals" OR "Call for Concept Notes" OR "tender") ("seed" OR "semence" OR "agriculture" OR "agribusiness") Africa when:30d'
            ]
        },
        {
            name: 'DevelopmentAid Opportunities & Grants (via RSS)',
            type: 'GOOGLE_NEWS_RSS_SOCIAL',
            enabled: true,
            assumeAfrican: true,
            queries: [
                'site:developmentaid.org/tenders ("seed" OR "semence" OR "agriculture" OR "agribusiness" OR "crops" OR "planting materials") Africa when:30d',
                'site:developmentaid.org/grants ("seed" OR "semence" OR "agriculture" OR "agribusiness" OR "grant" OR "crops") Africa when:30d'
            ]
        },
        {
            name: 'ASARECA Consultancies & EOIs',
            type: 'ASARECA_REST_API',
            url: 'https://www.asareca.org/wp-json/wp/v2/posts?categories=90&per_page=20',
            baseUrl: 'https://www.asareca.org',
            enabled: true,
            assumeAfrican: true,
            preferSerperFallback: false
        },

        // =========================================================================
        // DISABLED / INACTIVE FEEDS
        // =========================================================================
        {
            name: 'Gemini Grounded Web Search',
            type: 'GEMINI_SEARCH_API',
            enabled: false,
            queryTemplates: [
                'Search for currently open procurement solicitations (RFPs, RFQs, EOIs, ' +
                'tenders, or calls for proposals/concept notes) published on or after ' +
                '{DATE_FLOOR} related to crop seed systems in Sub-Saharan Africa — seed ' +
                'policy or regulatory reform, seed certification, seed company/agrodealer ' +
                'support, seed quality assurance, or seed sector market studies. Only ' +
                'include a finding if you can identify its specific, real source URL from ' +
                'search results — never invent or guess a URL, title, or organization. If ' +
                'you are not confident a finding is real and current, leave it out. Return ' +
                'at most 8 findings.'
            ]
        },
        { name: 'ADB Business Opportunities', url: 'https://www.adb.org/work-with-us/business-opportunities', type: 'BLOCK_SCRAPER', baseUrl: 'https://www.adb.org', enabled: false },
        { name: 'IADB Procurement Notices', url: 'https://www.iadb.org/en/how-we-can-work-together/procurement/procurement-projects/procurement-notices', type: 'RENDERED_BLOCK_SCRAPER', baseUrl: 'https://www.iadb.org', enabled: false }
    ]
};
const FETCH_OPTIONS = {
    muteHttpExceptions: true,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.google.com/'
    }
};

/**
 * DYNAMIC DATE HELPERS
 */

function getFreshnessFloorDate() {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    d.setMonth(d.getMonth() - CONFIG.FRESHNESS_MONTHS_BACK);
    return d;
}

function getDateFloor() {
    return getSearchDateFloor();
}

function getSearchDateFloor() {
    return Utilities.formatDate(getFreshnessFloorDate(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

function getCurrentYear() {
    return new Date().getFullYear();
}

function buildSerperQueries(templates) {
    const dateFloor = getSearchDateFloor();
    const year = getCurrentYear();
    return templates.map(t => t.replace(/\{DATE_FLOOR\}/g, dateFloor).replace(/\{YEAR\}/g, String(year)));
}

function isOnOrAfterFreshnessFloor(dateValue) {
    if (!dateValue) return true;
    const parsed = (dateValue instanceof Date) ? dateValue : new Date(dateValue);
    if (isNaN(parsed.getTime())) return true;
    return parsed.getTime() >= getFreshnessFloorDate().getTime();
}

function isLikelyStaleListing(text) {
    if (!text) return false;
    const yearMatches = text.match(/\b(20\d{2})\b/g);
    if (!yearMatches) return false;
    const currentYear = getCurrentYear();
    const years = yearMatches.map(Number);
    const hasRecentYear = years.some(y => y >= currentYear);
    const hasOldYear = years.some(y => y < currentYear);
    return hasOldYear && !hasRecentYear;
}

/**
 * CONFIG VALIDATION
 */

function validateScriptProperties() {
    const props = PropertiesService.getScriptProperties();
    const hasSearchKey = Boolean(
        props.getProperty('SERPER_API_KEY') ||
        props.getProperty('TAVILY_API_KEY') ||
        props.getProperty('SERPAPI_API_KEY') ||
        props.getProperty('BRAVE_SEARCH_API_KEY') ||
        ((props.getProperty('GOOGLE_CSE_API_KEY') || props.getProperty('GOOGLE_API_KEY')) && props.getProperty('GOOGLE_CSE_CX'))
    );
    const hasGemini = Boolean(props.getProperty('GEMINI_API_KEY'));
    if (!hasGemini) {
        Logger.log('[CONFIG WARNING] Missing REQUIRED script property: GEMINI_API_KEY. Evaluation will fall back to secondary LLMs or degraded keyword scoring.');
    }
    if (!hasSearchKey) {
        Logger.log('[CONFIG WARNING] Missing Web Search API key. Web search feeds will be skipped. Configure SERPER_API_KEY, TAVILY_API_KEY (1,000 free/mo, NO card), SERPAPI_API_KEY (250 free/mo, NO card), BRAVE_SEARCH_API_KEY, or GOOGLE_CSE_API_KEY + GOOGLE_CSE_CX.');
    }

    const optional = [
        'SERPER_API_KEY', 'TAVILY_API_KEY', 'SERPAPI_API_KEY', 'BRAVE_SEARCH_API_KEY', 'GOOGLE_CSE_API_KEY', 'GOOGLE_CSE_CX',
        'SCRAPINGANT_API_KEY', 'RENDER_API_KEY', 'CRAWLBASE_JS_TOKEN', 'GROQ_API_KEY', 'CEREBRAS_API_KEY',
        'SLACK_WEBHOOK_URL', 'TEAMS_WEBHOOK_URL', 'ALERT_EMAILS'
    ];
    const missingOptional = optional.filter(k => !props.getProperty(k));
    if (missingOptional.length > 0) {
        Logger.log(`[CONFIG INFO] Missing optional script properties: ${missingOptional.join(', ')} (related features/fallbacks disabled).`);
    }
}

function onOpen() {
    try {
        const ui = SpreadsheetApp.getUi();
        ui.createMenu('RFP Hunter')

            .addItem('▶ Run Hunter Now', 'runHunterFromMenu')

            .addSeparator()

            .addSubMenu(ui.createMenu('⏰ Automation Triggers')

                .addItem('⚡ Enable Every 6 Hours Schedule (Recommended)', 'installEvery6HoursTriggerFromMenu')

                .addItem('🌅 Enable Daily Schedule (06:00 AM)', 'installDailyTriggerFromMenu')

                .addItem('ℹ️ View Trigger Status', 'viewTriggerStatusFromMenu')

                .addItem('🛑 Remove Automation Triggers', 'removeTriggersFromMenu')
            )

            .addSeparator()

            .addItem('🔄 Reset Quotas & Render Credits', 'resetGuardsFromMenu')

            .addItem('🔍 Check Configuration & API Keys', 'checkConfigFromMenu')

            .addToUi();
    } catch (e) {
        Logger.log('[onOpen] Non-UI environment: ' + e.message);
    }
}

/**
 * Menu handler: Runs the RFP Hunter and shows progress toasts in the sheet.
 */

function runHunterFromMenu() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let ui = null;
    try { ui = SpreadsheetApp.getUi(); } catch (e) { }

    if (ss) {
        ss.toast('RFP Hunter run started! Scanning feeds and evaluating candidates...', 'RFP Hunter', 15);
    }

    const startTime = new Date();

    try {
        runRfpTrackerV4();
        const elapsedSecs = Math.round((new Date().getTime() - startTime.getTime()) / 1000);
        if (ss) {
            ss.toast(`Hunter execution complete in ${elapsedSecs}s! Check 'Active Open RFPs' tab.`, 'RFP Hunter', 12);
        }
    } catch (err) {
        Logger.log('[Menu Execution Error] ' + (err.stack || err.message));
        if (ui) {
            ui.alert('RFP Hunter Execution Error', 'An error occurred during execution:\n\n' + (err.message || err), ui.ButtonSet.OK);
        } else if (ss) {
            ss.toast('Execution failed: ' + err.message, '⚠️ RFP Hunter Error', 15);
        }
    }
}

/**
 * Menu handler: Resets daily Gemini counter and monthly render credit counters with confirmation.
 */

function resetGuardsFromMenu() {
    let ui = null;
    try { ui = SpreadsheetApp.getUi(); } catch (e) { }

    if (ui) {
        const response = ui.alert(
            'Reset Quota & Credit Guards',
            'This will reset the internal Gemini daily call counter, discovery reserve, and ScraperAPI / Crawlbase monthly credit tracking counters back to zero.\n\nDo you want to proceed?',
            ui.ButtonSet.YES_NO
        );
        if (response !== ui.Button.YES) return;
    }

    resetQuotaGuards();
    if (ui) {
        ui.alert('Reset Complete', 'Gemini daily quota counter, discovery reserve, and render-provider credit counters have been successfully reset.', ui.ButtonSet.OK);
    } else {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        if (ss) ss.toast('Quota and credit counters reset successfully.', 'RFP Hunter', 8);
    }
}

/**
 * Menu handler: Displays the current status of all API keys in a clean dialog.
 */

function checkConfigFromMenu() {
    const props = PropertiesService.getScriptProperties();
    let ui = null;
    try { ui = SpreadsheetApp.getUi(); } catch (e) { }

    if (!ui) return;
    const required = [
        { key: 'GEMINI_API_KEY', label: 'Google Gemini AI' }
    ];
    const searchProviders = [
        { key: 'SERPER_API_KEY', label: 'Serper (Google Web Search - 2,500 queries/key)' },
        { key: 'TAVILY_API_KEY', label: 'Tavily AI Search (1,000 free/mo, NO credit card)' },
        { key: 'SERPAPI_API_KEY', label: 'SerpApi Google Search (250 free/mo, NO credit card)' },
        { key: 'BRAVE_SEARCH_API_KEY', label: 'Brave Search ($5 free credits/mo)' },
        { key: 'GOOGLE_CSE_API_KEY', label: 'Google Custom Search API (100 free/day)' },
        { key: 'GOOGLE_CSE_CX', label: 'Google Custom Search Engine CX' }
    ];
    const optional = [
        { key: 'GROQ_API_KEY', label: 'Groq Cloud (Free Fallback LLM)' },
        { key: 'SCRAPINGANT_API_KEY', label: 'ScrapingAnt (JS Rendering - 10,000 free credits/mo)' },
        { key: 'RENDER_API_KEY', label: 'ScraperAPI (JS Rendering)' },
        { key: 'CRAWLBASE_JS_TOKEN', label: 'Crawlbase (JS Rendering Backup)' },
        { key: 'SLACK_WEBHOOK_URL', label: 'Slack Alerts Webhook' },
        { key: 'TEAMS_WEBHOOK_URL', label: 'MS Teams Alerts Webhook' }
    ];
    let message = '=== REQUIRED SCRIPT PROPERTIES ===\n';
    required.forEach(item => {
        const hasVal = Boolean(props.getProperty(item.key));
        message += `${hasVal ? '✅' : '❌'} ${item.key} (${item.label}): ${hasVal ? 'Configured' : 'MISSING'}\n`;
    });

    message += '\n=== OPTIONAL SCRIPT PROPERTIES ===\n';
    optional.forEach(item => {
        const hasVal = Boolean(props.getProperty(item.key));
        message += `${hasVal ? '✅' : '⚪'} ${item.key} (${item.label}): ${hasVal ? 'Configured' : 'Not Set (Optional)'}\n`;
    });
    message += '\nTo configure or update keys, in the script editor go to:\nProject Settings (gear icon) > Script Properties.';
    ui.alert('RFP Hunter - Configuration Status', message, ui.ButtonSet.OK);
}

/**
 * Menu handler: Installs the recommended 6-hour interval trigger.
 */

function installEvery6HoursTriggerFromMenu() {
    let ui = null;
    try { ui = SpreadsheetApp.getUi(); } catch (e) { }

    ensureEvery6HoursTrigger();
    if (ui) {
        ui.alert(
            '6-Hour Trigger Activated',
            'The RFP Hunter engine is now scheduled to run automatically every 6 hours.\n\nThis ensures 4 balanced scans per day (capturing overnight global postings, midday updates, and African end-of-business announcements) without risking Google Apps Script runtime quotas or Serper API credit exhaustion.',
            ui.ButtonSet.OK
        );
    } else {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        if (ss) ss.toast('6-hour automated trigger successfully installed.', 'RFP Hunter', 8);
    }
}

/**
 * Menu handler: Installs a single daily trigger at 06:00 AM.
 */

function installDailyTriggerFromMenu() {
    let ui = null;
    try { ui = SpreadsheetApp.getUi(); } catch (e) { }

    ensureDailyTrigger(6);
    if (ui) {
        ui.alert(
            'Daily Trigger Activated',
            'The RFP Hunter engine is now scheduled to run automatically once per day at ~06:00 AM (Script Timezone).\n\nIdeal for once-a-day morning briefing summaries.',
            ui.ButtonSet.OK
        );
    } else {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        if (ss) ss.toast('Daily 06:00 AM trigger successfully installed.', 'RFP Hunter', 8);
    }
}

/**
 * Menu handler: Inspects and displays all active triggers for the script.
 */

function viewTriggerStatusFromMenu() {
    let ui = null;
    try { ui = SpreadsheetApp.getUi(); } catch (e) { }

    const status = getEngineTriggerStatus();
    if (ui) {
        ui.alert('Active Automation Triggers', status, ui.ButtonSet.OK);
    } else {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        if (ss) ss.toast(status, 'RFP Hunter', 10);
    }
}

/**
 * Menu handler: Removes all automation triggers for runRfpTrackerV4.
 */

function removeTriggersFromMenu() {
    let ui = null;
    try { ui = SpreadsheetApp.getUi(); } catch (e) { }

    if (ui) {
        const response = ui.alert(
            'Remove Triggers',
            'Are you sure you want to delete all automated schedules for RFP Hunter?\n\nThe engine will only run when manually triggered.',
            ui.ButtonSet.YES_NO
        );
        if (response !== ui.Button.YES) return;
    }

    clearEngineTriggers();
    if (ui) {
        ui.alert('Triggers Removed', 'All automated schedules have been deleted.', ui.ButtonSet.OK);
    } else {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        if (ss) ss.toast('All automated triggers removed.', 'RFP Hunter', 8);
    }
}

/**
 * MAIN EXECUTION ENTRY POINT
 */

/**
 * Normalizes and standardizes practice pillar names:
 * Strips numbering prefixes (e.g. "7 - ", "1. "), resolves aliases,
 * and eliminates contradictions where high-fit / GO opportunities are marked "Outside Core Focus".
 */

function normalizePillarName(pillar, title, description) {
    let clean = (pillar || '').replace(/^\d+[\s\.\-]+/, '').trim();
    const text = `${title || ''} ${description || ''}`.toLowerCase();

    // If marked outside core focus or unclassified, but text has strong capability signals, reassign

    if (!clean || clean.includes('Outside Core Focus') || clean.includes('Unclassified')) {
        if (/policy|regulat|certif|seed law|variety release|registration|inspector|gazett|gmo|biosafety|transgenic|biotech|gene editing/.test(text)) {
            return 'Policy & Regulatory Advisory';
        }

        if (/seed system|production|multiplication|breeder|foundation|certified seed|egs|stak|tasta|afsta/.test(text)) {
            return 'Seed Systems & Market Development';
        }

        if (/agtech|agritech|agri[-\s]?tech|digital agriculture|ai in extension|artificial intelligence|ai-powered|mbeguchoice|sims|platform|software|app\b/.test(text)) {
            return 'Digital Platforms, Seed IT & Verification';
        }

        if (/scoping|feasibility|baseline|thematic study|market assessment|planting material|nursery|fodder|pasture/.test(text)) {
            return 'Technical Studies & Scoping';
        }

        if (/youth|women|incubat|accelerat|agribusiness|enterprise|business model/.test(text)) {
            return 'Agribusiness, Youth & Women Entrepreneurship';
        }

        if (/trade|sps|cross-border|paperless|customs/.test(text)) {
            return 'Cross-Border Trade, SPS Compliance & Supply Chain';
        }

        if (/training|capacity building|curriculum|toolbox|institution/.test(text)) {
            return 'Capacity Building & Institutional Strengthening';
        }

        if (/mel\b|monitoring|evaluation|learning|advisory|review|convening|strategy|transformation|food systems|resilience|livelihood/.test(text)) {
            return 'Strategic Advisory, MEL & Convenings';
        }

        return clean || 'N/A - Outside Core Focus';
    }

    // Standardize canonical names

    if (/seed system|market development/i.test(clean)) return 'Seed Systems & Market Development';
    if (/policy|regulat/i.test(clean)) return 'Policy & Regulatory Advisory';
    if (/technical study|technical studies|scoping/i.test(clean)) return 'Technical Studies & Scoping';
    if (/digital platform|seed it|verification|agtech|agritech|agri[-\s]?tech|ai in extension/i.test(clean)) return 'Digital Platforms, Seed IT & Verification';
    if (/capacity build|institution|curriculum/i.test(clean)) return 'Capacity Building & Institutional Strengthening';
    if (/strategic advisory|mel|convening/i.test(clean)) return 'Strategic Advisory, MEL & Convenings';
    if (/agribusiness|youth|women/i.test(clean)) return 'Agribusiness, Youth & Women Entrepreneurship';
    if (/trade|sps|cross-border/i.test(clean)) return 'Cross-Border Trade, SPS Compliance & Supply Chain';
    return clean;
}

function runRfpTrackerV4() {
    const runStartTime = Date.now();
    const MAX_RUN_TIME_MS = CONFIG.SCRIPT_TIMEOUT_LIMIT_MS || CONFIG.WORKSPACE_TIMEOUT_LIMIT_MS || (310 * 1000); // 5.2-minute safe ceiling for Google Apps Script triggers (360s hard limit)

    validateScriptProperties();

    // Note: Daily and monthly quota resets are handled automatically by

    // consumeGeminiDailyQuota() and consumeProviderCredit().

    // resetQuotaGuards() is preserved as a manual utility function.

    // Auto-reset stale Gemini quota count if switching models or starting fresh run with GEMINI primary

    if (CONFIG.PRIMARY_AI_PROVIDER === 'GEMINI') {
        const props = PropertiesService.getScriptProperties();
        const storedChain = props.getProperty('GEMINI_ACTIVE_CHAIN');
        const currentChain = JSON.stringify(CONFIG.GEMINI_MODEL_FALLBACK_CHAIN);
        if (storedChain !== currentChain) {
            props.deleteProperty('GEMINI_QUOTA_COUNT');
            props.setProperty('GEMINI_QUOTA_DATE', getLocalDateKey());
            props.setProperty('GEMINI_ACTIVE_CHAIN', currentChain);
            Logger.log('[Gemini Init] Synchronized model chain to ' + currentChain + '; refreshed quota counters.');
        }
    }

    const sheet = getOrCreateSheet();
    const filteredSheet = getOrCreateFilteredSheet();
    auditTrackedOpportunitiesStatus(sheet);
    const { links: existingLinks, titleKeys: existingTitleKeys, refCodes: existingRefCodes, refCodeRowMap, titleRowMap } = getExistingLinksAndTitleKeys(sheet);
    const { links: existingFilteredLinks, titleKeys: existingFilteredTitleKeys, refCodes: existingFilteredRefCodes } = getExistingLinksAndTitleKeys(filteredSheet);
    existingFilteredLinks.forEach(link => existingLinks.add(link));
    existingFilteredTitleKeys.forEach(key => existingTitleKeys.add(key));
    existingFilteredRefCodes.forEach(code => existingRefCodes.add(code));
    existingLinks.refCodes = existingRefCodes;
    existingLinks.refCodeRowMap = refCodeRowMap;
    existingLinks.titleRowMap = titleRowMap;
    existingLinks.sheet = sheet;

    // Snapshot pre-discovery sheet entries so sampleRoundRobin skips items already logged on sheet

    const sheetLinks = new Set(existingLinks);
    const sheetTitleKeys = new Set(existingTitleKeys);
    const perSourceBuckets = {};
    const sourceStats = {};
    const activeFeeds = CONFIG.FEEDS.filter(f => f.enabled !== false);
    const skippedFeeds = CONFIG.FEEDS.filter(f => f.enabled === false);
    skippedFeeds.forEach(f => Logger.log(`[SOURCE SKIPPED] ${f.name}: disabled via config.`));

    // Discovery Wall-Clock Limit:
    // Allocate up to 2.5 minutes (150s) for feed ingestion so that time-driven triggers
    // (which have a strict 6-minute execution threshold in Apps Script) always leave ample headroom
    // for Gemini AI batch evaluation, spreadsheet updates, and email notifications.
    const maxDiscoveryMs = 150000; // 2.5 minutes (150 seconds)

    for (let idx = 0; idx < activeFeeds.length; idx++) {
        const feed = activeFeeds[idx];
        if (Date.now() - runStartTime > maxDiscoveryMs) {
            Logger.log(`[Discovery Guard] Feed ingestion reached ${Math.round((Date.now() - runStartTime) / 1000)}s. Halting discovery early to guarantee safe AI evaluation, sheet write, and email alerts.`);
            notifyAdminAlert('Discovery Guard Activated (>150s)', `Feed ingestion reached ${Math.round((Date.now() - runStartTime) / 1000)}s before completing all feeds. Halting discovery to guarantee safe AI evaluation, sheet writes, and email notifications.`);
            break;
        }

        sourceStats[feed.name] = 0;
        perSourceBuckets[feed.name] = [];
        const feedStats = { seen: 0, accepted: 0, duplicate: 0, notAfrican: 0, lowRelevance: 0, stale: 0, boilerplate: 0, filtered: 0, preAiRejected: 0 };

        try {
            const bucket = [];
            if (feed.type === 'GOOGLE_SEARCH_API') {
                fetchGoogleSearchNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'GOOGLE_NEWS_RSS_SOCIAL') {
                fetchGoogleNewsSocialNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'GEMINI_SEARCH_API') {
                fetchGeminiSearchNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'WORLD_BANK') {
                fetchWorldBankNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'TED_API') {
                fetchTedNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'AGRA_ORACLE_API') {
                fetchAgraNegotiationAbstracts(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'IFAD_PROJECT_PROCUREMENT') {
                scrapeIfadProjectProcurement(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'IFAD_CALL_FOR_PROPOSALS') {
                scrapeIfadCallsForProposals(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'UNGM_API') {
                fetchUngmNoticesDirect(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'RENDERED_BLOCK_SCRAPER') {
                scrapeRenderedPortalBlockLevel(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'ALL_BUSINESS_AFRICA_API') {
                fetchAllBusinessAfricaNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'AGRA_OPPORTUNITIES_API') {
                fetchAgraOpportunitiesNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'ASARECA_REST_API') {
                fetchAsarecaNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'ILRI_TENDERS_SCRAPER') {
                fetchIlriNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'AATF_TENDERS_SCRAPER') {
                fetchAatfNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'CIMMYT_OPPORTUNITIES_API') {
                fetchCimmytOpportunities(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'UNJOBNET_SCRAPER') {
                fetchUnjobnetNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'FUNDS_FOR_NGOS_API') {
                fetchFundsForNgosNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'GLOBAL_SOUTH_OPP_FEED') {
                fetchGlobalSouthOpportunitiesNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'TENDERSURE_API') {
                fetchTenderSureNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'AEIP_SCRAPER') {
                fetchAfricaEuropeInnovationNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'LOCATEFUND_API') {
                fetchLocateFundOpportunities(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'SAIGE_OPPORTUNITIES_SCRAPER') {
                fetchSaigeOpportunities(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            } else if (feed.type === 'BLOCK_SCRAPER') {
                scrapePortalBlockLevel(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            }

            perSourceBuckets[feed.name] = bucket;
            const breakdown = [];
            if (feedStats.duplicate > 0) breakdown.push(`already logged: ${feedStats.duplicate}`);
            if (feedStats.notAfrican > 0) breakdown.push(`outside Africa: ${feedStats.notAfrican}`);
            if (feedStats.lowRelevance > 0) breakdown.push(`pre-AI low relevance: ${feedStats.lowRelevance}`);
            if (feedStats.stale > 0) breakdown.push(`stale: ${feedStats.stale}`);
            if (feedStats.boilerplate > 0) breakdown.push(`boilerplate: ${feedStats.boilerplate}`);
            if (feedStats.preAiRejected > 0) breakdown.push(`pre-AI rejected: ${feedStats.preAiRejected}`);
            if (feedStats.accepted > 0) breakdown.push(`accepted into AI pool: ${feedStats.accepted}`);
            const detail = feedStats.seen > 0

                ? ` (raw fetched: ${feedStats.seen}, ${breakdown.join(', ') || 'all accepted'})`

                : '';
            Logger.log(`[SOURCE] ${feed.name}: ${bucket.length} new candidate(s) discovered${detail}.`);
        } catch (e) {
            Logger.log(`[FETCH ERROR] ${feed.name}: ${e.message}`);
        }

        if (idx < activeFeeds.length - 1) Utilities.sleep(CONFIG.INTER_FEED_DELAY_MS);
    }

    const candidatesToProcess = sampleRoundRobin(perSourceBuckets, CONFIG.MAX_CANDIDATES_TO_PROCESS, sheetLinks, sheetTitleKeys);
    const totalDiscovered = Object.values(perSourceBuckets).reduce((sum, arr) => sum + arr.length, 0);
    Logger.log(`[DISCOVERY SUMMARY] ${totalDiscovered} candidate RFPs found across all sources. Processing ${candidatesToProcess.length} with AI...`);
    Logger.log(`[GEMINI BUDGET] Remaining internal Gemini call budget before evaluation: ${getGeminiRemainingQuota()}. Discovery reserve: ${CONFIG.GEMINI_EVALUATION_RESERVE}.`);
    if (candidatesToProcess.length === 0) {
        Logger.log('No new un-logged candidate RFPs discovered in this run.');

        return;
    }

    candidatesToProcess.forEach((item, i) => { item.id = i + 1; });

    // Deep Ingestion: Selectively enrich terse descriptions and attached TORs before AI evaluation
    enrichCandidatesWithDeepInspection(candidatesToProcess, runStartTime);

    // Evaluates in manageable chunks to avoid output token truncation

    const aiEvaluations = evaluateRfpInChunks(candidatesToProcess, CONFIG.AI_EVALUATION_CHUNK_SIZE || 12, runStartTime);
    const highPriorityMatches = [];
    const mainRowsToAppend = [];
    const filteredRowsToAppend = [];
    const now = new Date();
    aiEvaluations.forEach(evalResult => {
        const item = candidatesToProcess.find(b => b.id === evalResult.id);
        if (!item) return;

        // CALIBRATION 1: Vendor Self-Advertisement Filter (Prevent Vendor Marketing in Social Feeds)

        // Run FIRST to ensure vendor promotional posts are never mistaken for competitive procurements.

        const combinedAgtechText = `${item.title} ${item.description || ''}`.toLowerCase();
        const combinedAllText = `${item.title} ${item.description || ''} ${item.link || ''} ${evalResult.summary || ''}`.toLowerCase();
        const isAiVendorSummary = /\b(personal social media advertisement|vendor offering|offering services rather than|promotional post|not an open solicitation|selling services|advertisement offering|individual offering)\b/i.test(evalResult.summary || '');
        const isVendorAdvertisement = isAiVendorSummary ||

            /\b(at your (?:service|display)|contact us for|call us on|our services include|is at your display|for your order|dm us for|we are selling|special discount|call\/whatsapp)\b/i.test(combinedAllText) ||

            /\bfacebook\.com\/[a-z0-9._-]+\/posts\/.*(?:at-your-display|service-delivery|consultancy-services)\b/i.test(item.link || '');
        if (isVendorAdvertisement && !/\b(terms of reference|request for proposals|call for proposals|invitation to bid|tender notice)\b/i.test(item.title)) {
            Logger.log(`[Vendor Ad Filter] Rejected self-promotional vendor ad: "${item.title}"`);
            evalResult.isGenuineOpportunity = false;
            evalResult.isOpen = false;
            evalResult.score = 0;
            evalResult.businessFit = 'NONE';
            evalResult.goNoGo = 'NO-GO';
            if (!evalResult.summary || !evalResult.summary.includes('advertisement')) {
                evalResult.summary = "Vendor advertisement or personal service promotional post, not an actionable procurement solicitation issued by a client or donor.";
            }
        }

        // CALIBRATION 1B: Strict Expired Deadline & AI Summary-Scoring Congruence Enforcer

        if (evalResult.closingDate && evalResult.closingDate !== 'Not Specified') {
            const closingTimestamp = new Date(evalResult.closingDate).getTime();
            const todayTimestamp = new Date().setHours(0, 0, 0, 0);
            if (!isNaN(closingTimestamp) && closingTimestamp < todayTimestamp) {
                Logger.log(`[Deadline Expiry Guard] Opportunity "${item.title}" deadline was ${evalResult.closingDate} (already expired). Forcing isOpen = false.`);
                evalResult.isOpen = false;
            }
        }

        const isAiClosedSummary = /\b(?:opportunity is (?:closed|expired)|deadline has passed|past procurement|contract has been awarded|notice is closed)\b/i.test(evalResult.summary || '');
        if (isAiClosedSummary) {
            evalResult.isOpen = false;
        }

        const NON_PROCUREMENT_SUMMARY_REGEX = /\b(?:rather than an active(?:, actionable)? (?:expression of interest|solicitation|procurement|tender|grant|notice|opportunity)|not an active(?:, actionable)? (?:expression of interest|solicitation|procurement|tender|grant|notice|opportunity)|institutional document page(?: rather than)?|broad (?:[a-z]+\s+)?(?:institutional|organizational) document page|lacks specific submission details|not a current open solicitation|not an open solicitation|not an actionable (?:procurement|solicitation|tender|opportunity)|closed as a business opportunity|event rather than a (?:procurement|tender|solicitation)|hackathon event rather than|social media post discussing|vendor offering services rather than|personal social media advertisement|personal service promotional|personal services? offering|salaried\s+(?:employment|job|recruitment)|job\s+vacanc(?:y|ies)|employee\s+recruitment|we(?:\'re|[\s_-]?are)\s+hiring|contest\s+providing\s+cash\s+prizes|cash\s+prizes?\s+and\s+mentorship|focuses\s+(?:primarily\s+)?on\s+the\s+medical\s+sector|medical\s+sector\s+rather\s+than\s+agriculture|completely\s+unrelated\s+to\s+agriculture|outside\s+the\s+firm(?:'s)?\s+agricultural\s+scope|unrelated\s+to\s+agricultural\s+consulting)\b/i;
        let isAiNonProcurementSummary = NON_PROCUREMENT_SUMMARY_REGEX.test(evalResult.summary || '');
        if (isAiNonProcurementSummary) {
            // Guard against false-negative AI document hallucinations for official MDB/donor solicitations
            const isOfficialDonorEoi = /https?:\/\/(?:www\.)?afdb\.org\/(?:en|fr)\/(?:documents|consultants)\/(?:eoi|project-related-procurement)-[a-z0-9_-]+/i.test(item.link || '') ||
                (/https?:\/\/(?:www\.)?afdb\.org\b/i.test(item.link || '') && /\b(?:EOI|Expression of Interest|Consultancy Services|Request for Proposals|RFP)\b/i.test(item.title)) ||
                (/\b(?:afdb|african development bank)\b/i.test(item.source || '') && /\b(?:EOI|Expression of Interest|Consultancy Services|RFP)\b/i.test(item.title));
            if (isOfficialDonorEoi) {
                Logger.log(`[Official Donor EOI Guard] Corrected false-negative AI document summary for genuine AfDB procurement notice: "${item.title}"`);
                isAiNonProcurementSummary = false;
                evalResult.isGenuineOpportunity = true;
                evalResult.isOpen = true;
                if (!evalResult.summary || NON_PROCUREMENT_SUMMARY_REGEX.test(evalResult.summary)) {
                    evalResult.summary = `The African Development Bank has issued an Expression of Interest for ${item.title.replace(/^EOI\s*-\s*(?:Multinational\s*-\s*)?/i, '').replace(/\s*\(BPM\d+\).*$/i, '').trim()}. The solicitation is currently active and represents an actionable advisory engagement aligned with firm capabilities.`;
                }
            } else {
                Logger.log(`[Summary-Scoring Congruence Enforcer] Summary confirms non-procurement/non-actionable document: "${item.title}". Strictly enforcing genuine=false, open=false, score=0, goNoGo=NO-GO.`);
                evalResult.isGenuineOpportunity = false;
                evalResult.isOpen = false;
                evalResult.score = 0;
                evalResult.businessFit = 'NONE';
                evalResult.goNoGo = 'NO-GO';
            }
        }

        // CALIBRATION 1D: Generic Masthead & Multi-Opportunity Roundup Title Alignment
        // When a post/digest bundles multiple calls or has a generic/masthead title, align item.title to specific opportunity
        const ROUNDUP_REGEX = /(?:funding[-_]opportunities|grant[-_]roundup|weekly[-_]roundup|opportunities[-_]roundup|grants[-_]roundup|funding[-_]digest|opportunity[-_]digest|funding-opportunities-funder)/i;
        const isRoundupCandidate = ROUNDUP_REGEX.test(item.link || '') ||
            /\b(?:funding opportunities|roundup|multiple calls|grants digest)\b/i.test(item.title) ||
            /\b(?:funder\s*:.*funder\s*:|update\s*:.*update\s*:)\b/i.test(item.description || '');
        const isGenericTitle = isBareGovernmentOrGenericTitle(item.title);
        const isRawFileTitle = /\.(?:pdf|docx?|xlsx?)$/i.test(item.title) ||
            (!/\s/.test(item.title) && /(?:[-_][a-zA-Z0-9]+){2,}/.test(item.title)) ||
            /\b(?:[A-Za-z]{2,}[-_]){2,}[A-Za-z]{2,}\b/.test(item.title);
        const isTruncatedTitle = /[\.\u2026]{2,}$/.test(item.title) || /\b(?:read more|click here)\b/i.test(item.title);

        if (isRoundupCandidate) {
            if (evalResult.specificOpportunityTitle && evalResult.specificOpportunityTitle.trim()) {
                item.title = evalResult.specificOpportunityTitle.trim();
            }
            if (!/^\[Roundup\]/i.test(item.title)) {
                item.title = `[Roundup] ${item.title.replace(/\s*\|\s*(?:LinkedIn|GrantEdge Global|Facebook).*$/i, '').trim()}`;
            }
            Logger.log(`[Roundup Alignment] Aligned multi-opportunity title: "${item.title}"`);
        } else if (isGenericTitle || isRawFileTitle || isTruncatedTitle) {
            if (evalResult.specificOpportunityTitle && evalResult.specificOpportunityTitle.trim() && !isBareGovernmentOrGenericTitle(evalResult.specificOpportunityTitle)) {
                Logger.log(`[Title Extraction] Replaced ${isGenericTitle ? 'generic masthead' : isRawFileTitle ? 'raw document' : 'truncated search snippet'} title "${item.title}" with substantive AI-extracted title: "${evalResult.specificOpportunityTitle.trim()}"`);
                item.title = evalResult.specificOpportunityTitle.trim();
            }
        }

        // Apply clean opportunity title formatting to strip file extensions, slug hyphens, etc.
        item.title = formatCleanOpportunityTitle(item.title);

        // CALIBRATION 1C: Individual Consultancy Filter
        // Agri Experience is a corporate consulting firm. Filter out all freelance individual consultancies.
        // Evaluated using the aligned/refined title to catch individual roles previously masked by generic titles.
        const combinedIndividualText = `${item.title} ${item.description || ''} ${evalResult.summary || ''}`.toLowerCase();
        const INDIVIDUAL_CONSULTANCY_REGEX = /\b(?:national\s+consultants?|individual\s+consultants?|individual\s+consultancy|junior\s+consultants?|senior\s+consultants?|senior\s+advisors?|individual\s+contractors?|individual\s+specialists?|consultant\s+individuel|consultante\s+individuelle|international\s+individual|national\s+individual|recrutement\s+d'un\s+consultant\s+individuel|recrutement\s+d'un\s+consultant\s+\(individuel\)|selection\s+of\s+individual\s+consultants?|single\s+consultant|solo\s+consultant|personal\s+consultant|nob\s+level|noa\s+level|noc\s+level)\b/i;
        const isIndividualConsultancy = INDIVIDUAL_CONSULTANCY_REGEX.test(combinedIndividualText) ||
            /\b(?:individual\s+consultants?|junior\s+consultants?|national\s+consultants?|individual\s+consultancy)\b/i.test(item.title);
        const hasFirmContext = /\b(?:consulting\s+firms?|consortium|institutional|firm|agency|company)\b/i.test(item.title);
        if (isIndividualConsultancy && !hasFirmContext) {
            Logger.log(`[Individual Consultancy Filter] Strictly filtered out individual consultancy: "${item.title}"`);
            evalResult.isGenuineOpportunity = false;
            evalResult.isOpen = false;
            evalResult.score = 0;
            evalResult.businessFit = 'NONE';
            evalResult.goNoGo = 'NO-GO';
            evalResult.summary = "Individual consultancy assignment reserved for single freelance individuals, not consulting firms/organizations.";
        }

        // CALIBRATION 1E: Hackathon, Developer Coding Challenge & Prize Contest Filter
        const combinedHackathonText = `${item.title} ${item.description || ''} ${item.link || ''} ${evalResult.summary || ''}`.toLowerCase();
        const HACKATHON_REGEX = /\b(?:hackathons?|ideathons?|datathons?|buildathons?|coding\s+challenges?|developer\s+challenges?|app\s+challenges?|pitch\s+competitions?|innovation\s+contests?|cash\s+prizes?|prize\s+money|win\s+up\s+to\s+\$|teams?\s+of\s+up\s+to\s+(?:2|3|4|5)\s+(?:members|developers|people|youth)|top\s+\d+\s+teams\s+receive\s+(?:mentorship|attendance|tickets)|funded\s+attendance\s+at\s+the\s+[a-z0-9\s]+conference|agentic\s+africa\s+challenge|(?:win|receive|providing)\s+cash\s+prizes?\s+and\s+mentorship)\b/i;
        const isInstitutionalChallengeFund = /\b(?:challenge\s+funds?|enterprise\s+challenge\s+fund|aecf)\b/i.test(item.title);
        if (HACKATHON_REGEX.test(combinedHackathonText) && !isInstitutionalChallengeFund) {
            Logger.log(`[Hackathon Filter] Strictly filtered out developer hackathon / prize challenge: "${item.title}"`);
            evalResult.isGenuineOpportunity = false;
            evalResult.isOpen = false;
            evalResult.score = 0;
            evalResult.businessFit = 'NONE';
            evalResult.goNoGo = 'NO-GO';
            evalResult.summary = "Developer hackathon / coding challenge or prize competition for individual coders/teams, not an institutional consultancy procurement tender or development grant.";
        }

        // CALIBRATION 1F: Frontline Humanitarian Relief & Domestic-Only National NGO Filter
        // Agri Experience Ltd is a Kenyan-headquartered consulting practice serving Sub-Saharan Africa across 21+ countries.
        // It pursues institutional advisory, seed systems, and agribusiness consultancies across SSA,
        // but NOT domestic-only national NGO calls (e.g. Sudan national NGOs only) or emergency humanitarian food relief targeting.
        const combinedReliefText = `${item.title} ${item.description || ''} ${item.link || ''} ${evalResult.summary || ''}`.toLowerCase();
        const RELIEF_OR_DOMESTIC_REGEX = /\b(?:targeting\s+cfp|beneficiary\s+targeting|food\s+assistance\s+targeting|humanitarian\s+relief\s+targeting|emergency\s+food\s+distribution|camp\s+coordination|national\s+ngos?\s+(?:only|in\s+sudan)|registered\s+in\s+sudan\s+only|sudanese\s+national\s+ngos?|local\s+organi[zs]ations?\s+in\s+sudan\s+only)\b/i;
        if (RELIEF_OR_DOMESTIC_REGEX.test(combinedReliefText)) {
            Logger.log(`[Relief / Domestic Filter] Filtered out emergency relief / domestic-only call: "${item.title}"`);
            evalResult.isGenuineOpportunity = false;
            evalResult.isOpen = false;
            evalResult.score = 0;
            evalResult.businessFit = 'NONE';
            evalResult.goNoGo = 'NO-GO';
            evalResult.summary = "Emergency humanitarian relief targeting or domestic-only national NGO call, outside Agri Experience's Sub-Saharan African institutional consulting scope.";
        }

        // CALIBRATION 1G: Physical Goods, Seeds & Equipment Supply Capper
        // Agri Experience Ltd is an advisory consulting firm, NOT a physical seed vendor or commodity merchant.
        // Cap pure physical supply procurements at <= 20% NO-GO unless an explicit consulting, advisory, or study scope exists.
        const combinedSupplyText = `${item.title} ${item.description || ''} ${evalResult.summary || ''}`.toLowerCase();
        const isPhysicalSupply = /\b(?:invitation\s+for\s+bids|ifb|supply\s+and\s+delivery\s+of|supply\s+of\s+(?:crop\s+)?seeds?|supply\s+of\s+seedlings?|procurement\s+of\s+(?:crop\s+)?seeds?|procurement\s+of\s+seedlings?|purchase\s+of\s+seeds?|delivery\s+of\s+seeds?|supply\s+of\s+fertilizer|procurement\s+of\s+fertilizer|supply\s+of\s+laboratory\s+equipment|supply\s+of\s+tractors?|supply\s+of\s+motor\s+vehicles?|supply\s+of\s+office\s+furniture|homestead\s+garden[-_\s]+crop\s+seeds)\b/i.test(combinedSupplyText);
        const hasConsultingOrAdvisoryScope = /\b(?:consultan|advisory|technical\s+assistance|baseline\s+study|feasibility|scoping|evaluation|mel|policy|capacity\s+building|training\s+of\s+trainers|strategy|framework|development\s+of\s+digital)\b/i.test(combinedSupplyText);
        if (isPhysicalSupply && !hasConsultingOrAdvisoryScope) {
            Logger.log(`[Physical Supply Guard] Capping physical goods/commodity procurement: "${item.title}"`);
            evalResult.score = Math.min(evalResult.score || 0, 20);
            evalResult.goNoGo = 'NO-GO';
            evalResult.businessFit = 'LOW';
            evalResult.pillar = 'N/A - Outside Core Focus';
            evalResult.summary = `${evalResult.summary || ''} (Pure physical goods supply/delivery lacking consulting or advisory scope; outside firm consulting practice.)`.trim();
        }

        // CALIBRATION 1H: Urban Municipal Planning & Non-Agricultural Policy Filter
        const isUrbanOrMunicipalOnly = /\b(?:inclusive\s+cities|smart\s+cities\s+charter|urban\s+planning|municipal\s+charter|cities\s+report|urban\s+settlements?|housing\s+and\s+urban|urban\s+transport)\b/i.test(combinedSupplyText) &&
            !/\b(?:seed|crop|farming|agriculture|agri|farm|food\s+security|horticulture|agtech|agritech)\b/i.test(combinedSupplyText);
        if (isUrbanOrMunicipalOnly) {
            Logger.log(`[Urban/Municipal Filter] Filtered non-agricultural municipal planning tender: "${item.title}"`);
            evalResult.score = Math.min(evalResult.score || 0, 15);
            evalResult.goNoGo = 'NO-GO';
            evalResult.businessFit = 'NONE';
            evalResult.pillar = 'N/A - Outside Core Focus';
        }

        // CALIBRATION 1I: Non-Agricultural Supplier Prequalification Guard
        const isPrequalificationNotice = /\b(?:supplier\s+prequalification|prequalification\s+of\s+suppliers?|vendor\s+prequalification)\b/i.test(item.title);
        const hasExplicitAgriContext = /\b(seed|variety|crop|farming|agriculture|agri|agtech|agritech|fertilizer|horticulture)\b/i.test(`${item.title} ${item.link} ${item.description || ''}`);
        if (isPrequalificationNotice && !hasExplicitAgriContext) {
            Logger.log(`[Prequalification Guard] Filtered non-agricultural supplier prequalification: "${item.title}"`);
            evalResult.score = Math.min(evalResult.score || 0, 20);
            evalResult.goNoGo = 'NO-GO';
            evalResult.businessFit = 'NONE';
            evalResult.pillar = 'N/A - Outside Core Focus';
        }

        // CALIBRATION 1J: Bare Government Masthead & Uninformative Title Rejection
        // A listing in Active Open RFPs must have an informative, specific opportunity title.
        // Drop any candidate that still has a bare government/country masthead or generic shell.
        if (isBareGovernmentOrGenericTitle(item.title)) {
            Logger.log(`[Masthead Guard] Rejected opportunity with uninformative/bare masthead title: "${item.title}"`);
            evalResult.isGenuineOpportunity = false;
            evalResult.isOpen = false;
            evalResult.score = 0;
            evalResult.businessFit = 'NONE';
            evalResult.goNoGo = 'NO-GO';
            evalResult.summary = `Bare government/country header ("${item.title}") lacking a specific, actionable organizational tender or consultancy title.`;
        }

        const isProcurementScope = /\b(EOI|Expression of Interest|RFP|RFQ|RFCN|Consultanc[a-z]*|Advisor|Expert|Tender|Call for Proposals|Call for Concept Notes|Request for Concept Notes|Terms of Reference|ToR|Grant|Challenge Fund|Innovation Fund|Horizon Europe|Call for|Funding Opportunity|Research Call|Innovation Call|Roster|Adjunct Scientist|Fellowship|Breeder|Geneticist)\b/i.test(`${item.title} ${item.description || ''}`);

        // AI Consistency Guard (Only for legitimate procurement scopes with NO non-procurement signals)
        if (!isVendorAdvertisement && !isIndividualConsultancy && !isAiNonProcurementSummary && !isBareGovernmentOrGenericTitle(item.title) && !evalResult.isGenuineOpportunity && (evalResult.score >= 50 || evalResult.businessFit === 'HIGH' || evalResult.businessFit === 'MEDIUM') && isProcurementScope) {
            Logger.log(`[AI Consistency Guard] Overriding false-negative genuine flag for high-fit opportunity: "${item.title}" (score: ${evalResult.score}, fit: ${evalResult.businessFit})`);
            evalResult.isGenuineOpportunity = true;
            const isClosed = evalResult.closingDate && evalResult.closingDate !== 'Not Specified' && !isNaN(new Date(evalResult.closingDate).getTime()) && new Date(evalResult.closingDate).getTime() < new Date().setHours(0, 0, 0, 0);
            if (!isClosed) evalResult.isOpen = true;
            if (evalResult.goNoGo === 'NO-GO' && evalResult.score >= 60) {
                evalResult.goNoGo = evalResult.score >= 80 ? 'GO' : 'MAYBE';
            }
        }

        // AgTech & Digital Extension (Scoring left entirely to AI):

        // Domain scoring, businessFit, and goNoGo are evaluated by AI against the firm's mandate.

        // Heuristic score elevation has been removed to avoid false-positive promotions of non-agricultural (e.g. medical/health) or low-fit RFPs.

        // CALIBRATION 2 & 3: Scoring is performed directly by the AI during evaluation.
        // The AI prompt evaluates physical hardware vs. advisory and direct partner boosts,
        // producing a pure percentage match score without heuristic score overwrites.

        // CALIBRATION 4: Normalize Practice Pillar Names & Resolve Contradictions

        evalResult.pillar = normalizePillarName(evalResult.pillar, item.title, item.description);
        if (evalResult.goNoGo === 'GO' && (evalResult.pillar === 'N/A - Outside Core Focus' || evalResult.pillar.includes('Outside Core Focus'))) {
            evalResult.pillar = normalizePillarName('Strategic Advisory, MEL & Convenings', item.title, item.description);
        }

        Logger.log(`[AI RESULT] ${item.source} | ${item.title} | genuine=${evalResult.isGenuineOpportunity} | open=${evalResult.isOpen} | closing=${evalResult.closingDate} | fit=${evalResult.businessFit || 'N/A'} | confidence=${evalResult.confidence ?? 'N/A'} | goNoGo=${evalResult.goNoGo} | score=${evalResult.score} | pillar=${evalResult.pillar}`);
        if (!evalResult.isGenuineOpportunity) {
            const oppCountry = extractOpportunityCountries(item.title, item.description, evalResult.summary, item.link);
            filteredRowsToAppend.push([
                now,
                item.source,
                item.title,
                item.link,
                evalResult.summary,
                oppCountry
            ]);
            existingLinks.add(item.link);

            return;
        }

        if (CONFIG.ONLY_LOG_OPEN_PROPOSALS && !evalResult.isOpen) {
            Logger.log(`[AI CLOSED/SKIPPED] ${item.source} | ${item.title} | closing=${evalResult.closingDate}`);
            const oppCountry = extractOpportunityCountries(item.title, item.description, evalResult.summary, item.link);
            filteredRowsToAppend.push([
                now,
                item.source,
                item.title,
                item.link,
                `Closed / Expired (${evalResult.closingDate || 'Deadline Passed'})`,
                oppCountry
            ]);
            existingLinks.add(item.link);

            return;
        }

        // CALIBRATION 5: Strict African Geography Gate for Active Sheet
        // Drop foreign non-African notices (Cambodia, Sri Lanka, Latin America, Caribbean, Barbados, Pakistan, etc.)
        const nonAfricanRegionRegex = /\b(cambodia|sri lanka|latin america|caribbean|\blac\b|barbados|st kitts|saint kitts|nevis|eastern caribbean|guyana|trinidad|jamaica|haiti|bahamas|belize|fiji|pacific|papua new guinea|morocco|asia|india|pakistan|balochistan|bangladesh|nepal|vietnam|indonesia|philippines|myanmar|brazil|peru|colombia)\b/i;
        const nonAfricanUrlRegex = /(?:barbados|caribbean|undpbarbadosec|st[\s._-]?kitts|nevis|guyana|trinidad|jamaica|haiti|bahamas|belize|fiji|pacific|sri[\s._-]?lanka|cambodia|vietnam|indonesia|philippines|myanmar|brazil|colombia|pakistan|balochistan)/i;
        // Check source title, link, and description objectively to avoid AI summary hallucinated country bypass
        const sourceCheckText = `${item.title} ${item.description || ''}`.toLowerCase();
        const hasAfricanCountryInSource = AFRICAN_COUNTRIES_REGEX.test(sourceCheckText) || AFRICAN_REGION_REGEX.test(sourceCheckText);
        const isUrlExplicitlyNonAfrican = nonAfricanUrlRegex.test(item.link || '');
        const isRegionExplicitlyNonAfrican = nonAfricanRegionRegex.test(sourceCheckText) && !hasAfricanCountryInSource;
        const isExplicitlyNonAfrican = isUrlExplicitlyNonAfrican || isRegionExplicitlyNonAfrican;
        if (isExplicitlyNonAfrican) {
            Logger.log(`[Geography Gate] Filtered non-African opportunity: "${item.title}"`);
            const oppCountry = extractOpportunityCountries(item.title, item.description, evalResult.summary, item.link, item.source, evalResult.country);
            filteredRowsToAppend.push([
                now,
                item.source,
                item.title,
                item.link,
                `Outside Target Geography (Non-African Region) — ${evalResult.summary || 'Solicitation is located outside Sub-Saharan Africa'}`,
                oppCountry
            ]);
            existingLinks.add(item.link);

            return;
        }

        // Filter out low-fit or NO-GO opportunities from Active Open RFPs into Filtered Out

        const minActiveScore = CONFIG.MIN_SCORE_FOR_ACTIVE_LOGGING !== undefined ? CONFIG.MIN_SCORE_FOR_ACTIVE_LOGGING : 40;
        const isLowFitOrNoGo = evalResult.goNoGo === 'NO-GO' || (evalResult.score !== undefined && evalResult.score < minActiveScore);
        if (isLowFitOrNoGo) {
            Logger.log(`[AI LOW-FIT/FILTERED] ${item.source} | ${item.title} | score=${evalResult.score} | goNoGo=${evalResult.goNoGo} | reason=Outside Core Focus`);
            const oppCountry = extractOpportunityCountries(item.title, item.description, evalResult.summary, item.link, item.source, evalResult.country);
            filteredRowsToAppend.push([
                now,
                item.source,
                item.title,
                item.link,
                `Outside Core Focus (Score: ${evalResult.score || 0}, ${evalResult.goNoGo || 'NO-GO'}) — ${evalResult.summary || 'Low alignment with seed systems / agribusiness'}`,
                oppCountry
            ]);
            existingLinks.add(item.link);

            return;
        }

        const opportunityCountry = extractOpportunityCountries(item.title, item.description, evalResult.summary, item.link, item.source, evalResult.country);
        const formattedModality = resolveBiddingModality(
            evalResult.biddingModality,
            evalResult.partnerStrategy,
            evalResult.score,
            evalResult.goNoGo,
            item.title,
            item.description || evalResult.summary,
            item.source
        );

        mainRowsToAppend.push([
            now,
            item.source,
            item.title,
            item.link,
            evalResult.isOpen ? 'OPEN' : 'CLOSED',
            evalResult.closingDate,
            evalResult.goNoGo,
            evalResult.score,
            evalResult.pillar,
            evalResult.summary,
            opportunityCountry,
            formattedModality
        ]);
        existingLinks.add(item.link);
        sourceStats[item.source] = (sourceStats[item.source] || 0) + 1;
        if (evalResult.isOpen && evalResult.score >= CONFIG.MIN_SCORE_FOR_ALERT) {
            highPriorityMatches.push({ source: item.source, title: item.title, link: item.link, country: opportunityCountry, biddingModality: formattedModality, ...evalResult });
        }
    });

    // Batch writing to Google Sheets: massive speedup and eliminates execution timeout

    if (filteredRowsToAppend.length > 0) {
        const startRow = filteredSheet.getLastRow() + 1;
        filteredSheet.getRange(startRow, 1, filteredRowsToAppend.length, filteredRowsToAppend[0].length)

            .setValues(filteredRowsToAppend);
        Logger.log(`[BATCH SHEET WRITE] Wrote ${filteredRowsToAppend.length} row(s) to ${CONFIG.FILTERED_SHEET_NAME}.`);
    }

    if (mainRowsToAppend.length > 0) {
        const startRow = sheet.getLastRow() + 1;
        sheet.getRange(startRow, 1, mainRowsToAppend.length, mainRowsToAppend[0].length)

            .setValues(mainRowsToAppend);
        Logger.log(`[BATCH SHEET WRITE] Wrote ${mainRowsToAppend.length} row(s) to ${CONFIG.SHEET_NAME}.`);

        // Dynamically audit lifecycle statuses and apply color coding to newly logged rows
        auditTrackedOpportunitiesStatus(sheet);
    }

    Logger.log('=== GLOBAL SOURCE DIAGNOSTIC SUMMARY ===');
    Object.keys(sourceStats).forEach(source => {
        Logger.log(`- ${source}: ${sourceStats[source]} open RFP(s) successfully logged.`);
    });
    if (highPriorityMatches.length > 0) {
        if (CONFIG.ENABLE_EMAIL_ALERTS !== false) {
            sendEmailAlertsForHighPriorityMatches(highPriorityMatches, sheet);
        }

        sendSlackWebhookAlert(highPriorityMatches);
        sendTeamsWebhookAlert(highPriorityMatches);
    }
}

/**
 * TRIGGER SETUP & MANAGEMENT
 */

/**
 * Installs the recommended 6-hour interval trigger (4 runs per day).
 * Balances near real-time discovery with zero quota exhaustion risk.
 */

function ensureEvery6HoursTrigger() {
    clearEngineTriggers();
    ScriptApp.newTrigger('runRfpTrackerV4')

        .timeBased()

        .everyHours(6)

        .create();
    Logger.log('[TRIGGER] Every 6 Hours trigger installed for runRfpTrackerV4.');
}

/**
 * Installs a customizable interval trigger (every N hours: 1, 2, 4, 6, 8, 12).
 */

function ensureIntervalTrigger(everyHours) {
    const hours = (typeof everyHours === 'number' && everyHours > 0) ? everyHours : 6;
    clearEngineTriggers();
    ScriptApp.newTrigger('runRfpTrackerV4')

        .timeBased()

        .everyHours(hours)

        .create();
    Logger.log(`[TRIGGER] Interval trigger installed for every ${hours} hour(s).`);
}

/**
 * Installs a daily trigger at a specific hour (default 06:00 AM).
 */

function ensureDailyTrigger(hourOfDay) {
    const targetHour = (typeof hourOfDay === 'number') ? hourOfDay : 6;
    clearEngineTriggers();
    ScriptApp.newTrigger('runRfpTrackerV4')

        .timeBased()

        .everyDays(1)

        .atHour(targetHour)

        .create();
    Logger.log(`[TRIGGER] Daily trigger installed for runRfpTrackerV4 at ~${targetHour}:00 script timezone.`);
}

/**
 * Clears all existing triggers for runRfpTrackerV4 to prevent duplicate overlapping runs.
 */

function clearEngineTriggers() {
    try {
        const triggers = ScriptApp.getProjectTriggers();
        let count = 0;
        triggers.forEach(t => {
            if (t.getHandlerFunction() === 'runRfpTrackerV4') {
                ScriptApp.deleteTrigger(t);

                count++;
            }
        });
        Logger.log(`[TRIGGER] Removed ${count} existing trigger(s) for runRfpTrackerV4.`);
    } catch (e) {
        Logger.log('[TRIGGER] Error clearing triggers: ' + e.message);
    }
}

/**
 * Returns a human-readable summary of active triggers for the project.
 */

function getEngineTriggerStatus() {
    try {
        const triggers = ScriptApp.getProjectTriggers();
        const hunterTriggers = triggers.filter(t => t.getHandlerFunction() === 'runRfpTrackerV4');
        if (hunterTriggers.length === 0) {
            return 'No automated triggers are currently active for RFP Hunter.\n\nThe engine will only execute when run manually.';
        }

        const lines = [`Found ${hunterTriggers.length} active trigger(s) for RFP Hunter:`];
        hunterTriggers.forEach((t, i) => {
            const type = t.getEventType();
            const triggerSource = t.getTriggerSource();
            lines.push(`${i + 1}. Handler: runRfpTrackerV4 | Source: ${triggerSource} | Type: ${type} | ID: ${t.getUniqueId()}`);
        });
        return lines.join('\n');
    } catch (e) {
        return 'Could not retrieve trigger status: ' + e.message;
    }
}

/**
 * SERPER MULTI-KEY POOL & ROTATION ENGINE
 * Automatically discovers all configured Serper API keys:
 *  - Comma/semicolon-separated keys in 'SERPER_API_KEY' (e.g. "key1, key2, key3")
 *  - Numbered properties: 'SERPER_API_KEY_2', 'SERPER_API_KEY_3', up to 'SERPER_API_KEY_10'
 * When a key exhausts its credits (HTTP 400 "Not enough credits") or returns 401/403,
 * the engine seamlessly rotates to the next available key and retries the request.
 */

/**
 * ============================================================================
 * RESILIENT MULTI-PROVIDER WEB SEARCH ENGINE (SERPER -> BRAVE -> GOOGLE CSE)
 * ============================================================================
 *
 * Provides an uninterrupted search cascade across 3 free/freemium search engines:
 * 1. Serper.dev (Default primary: Google SERP API, rotates through pool of keys)
 * 2. Brave Search API (First fallback: 2,000 queries/month free forever)
 *    Property: BRAVE_SEARCH_API_KEY
 * 3. Google Custom Search JSON API (Second fallback: 100 queries/day = ~3,000/mo free forever)
 *    Properties: GOOGLE_CSE_API_KEY (or GOOGLE_API_KEY) and GOOGLE_CSE_CX
 */

let _serperKeyPool = null;
let _serperActiveKeyIndex = 0;

function getSerperApiKeyPool() {
    if (_serperKeyPool !== null) return _serperKeyPool;
    const props = PropertiesService.getScriptProperties();
    const keys = [];
    const primaryRaw = props.getProperty('SERPER_API_KEY');
    if (primaryRaw) {
        primaryRaw.split(/[,;\s]+/).forEach(k => {
            const clean = k.trim();
            if (clean && !keys.includes(clean)) keys.push(clean);
        });
    }

    for (let i = 2; i <= 10; i++) {
        const numKey = props.getProperty(`SERPER_API_KEY_${i}`);
        if (numKey) {
            const clean = numKey.trim();
            if (clean && !keys.includes(clean)) keys.push(clean);
        }
    }

    _serperKeyPool = keys;
    return _serperKeyPool;
}

/**
 * Checks whether any supported web search provider is configured and available.
 */
function isWebSearchAvailable() {
    const props = PropertiesService.getScriptProperties();
    const pool = getSerperApiKeyPool();
    const cache = (typeof CacheService !== 'undefined' && CacheService.getScriptCache) ? CacheService.getScriptCache() : null;

    if (pool && pool.length > 0) {
        const hasLiveKey = pool.some(k => {
            if (!cache) return true;
            try { return !cache.get('DEAD_SERPER_KEY_' + k); } catch (e) { return true; }
        });
        if (hasLiveKey) return true;
    }
    if (props.getProperty('TAVILY_API_KEY')) {
        return true;
    }
    if (props.getProperty('SERPAPI_API_KEY')) {
        return true;
    }
    if (props.getProperty('BRAVE_SEARCH_API_KEY')) {
        return true;
    }
    const cseKey = props.getProperty('GOOGLE_CSE_API_KEY') || props.getProperty('GOOGLE_API_KEY');
    const cseCx = props.getProperty('GOOGLE_CSE_CX');
    if (cseKey && cseCx) {
        return true;
    }
    return false;
}

/**
 * Executes a query against the Tavily Search API.
 * Free tier: 1,000 queries/month forever, NO credit card required.
 */
function callTavilySearchApi(query, numResults, contextLabel) {
    const props = PropertiesService.getScriptProperties();
    const tavilyKey = (props.getProperty('TAVILY_API_KEY') || '').trim();
    if (!tavilyKey) return null;
    const count = Math.min(20, Math.max(1, numResults || 10));
    const url = 'https://api.tavily.com/search';
    const payload = JSON.stringify({
        api_key: tavilyKey,
        query: query,
        search_depth: 'basic',
        max_results: count
    });
    let res = null;
    try {
        res = fetchWithRetry(url, {
            method: 'POST',
            contentType: 'application/json',
            payload: payload,
            muteHttpExceptions: true
        });
    } catch (e) {
        Logger.log(`[Tavily Search API] Network exception: ${e.message}`);
        return null;
    }

    if (!res) return null;
    const code = res.getResponseCode();
    if (code !== 200) {
        Logger.log(`[Tavily Search API] Returned HTTP ${code}: ${res.getContentText().substring(0, 150)}`);
        return null;
    }

    try {
        const data = JSON.parse(res.getContentText());
        const results = Array.isArray(data.results) ? data.results : [];
        const items = results.map(r => ({
            title: r.title || '',
            link: r.url || '',
            snippet: r.content || ''
        }));
        Logger.log(`[Tavily Search API] Discovered ${items.length} result(s) for query: "${query.substring(0, 70)}..."`);
        return {
            getResponseCode: () => 200,
            getContentText: () => JSON.stringify({ organic: items }),
            getHeaders: () => ({ 'Content-Type': 'application/json', 'X-Search-Provider': 'Tavily' })
        };
    } catch (e) {
        Logger.log(`[Tavily Search API] JSON parsing error: ${e.message}`);
        return null;
    }
}

/**
 * Executes a query against SerpApi (Google Search engine).
 * Free tier: 250 queries/month forever, NO credit card required.
 */
function callSerpApi(query, numResults, contextLabel) {
    const props = PropertiesService.getScriptProperties();
    const serpKey = (props.getProperty('SERPAPI_API_KEY') || '').trim();
    if (!serpKey) return null;
    const count = Math.min(10, Math.max(1, numResults || 10));
    const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&num=${count}&api_key=${encodeURIComponent(serpKey)}`;
    let res = null;
    try {
        res = fetchWithRetry(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            muteHttpExceptions: true
        });
    } catch (e) {
        Logger.log(`[SerpApi] Network exception: ${e.message}`);
        return null;
    }

    if (!res) return null;
    const code = res.getResponseCode();
    if (code !== 200) {
        Logger.log(`[SerpApi] Returned HTTP ${code}: ${res.getContentText().substring(0, 150)}`);
        return null;
    }

    try {
        const data = JSON.parse(res.getContentText());
        const rawItems = Array.isArray(data.organic_results) ? data.organic_results : [];
        const items = rawItems.map(item => ({
            title: item.title || '',
            link: item.link || '',
            snippet: item.snippet || ''
        }));
        Logger.log(`[SerpApi] Discovered ${items.length} result(s) for query: "${query.substring(0, 70)}..."`);
        return {
            getResponseCode: () => 200,
            getContentText: () => JSON.stringify({ organic: items }),
            getHeaders: () => ({ 'Content-Type': 'application/json', 'X-Search-Provider': 'SerpApi' })
        };
    } catch (e) {
        Logger.log(`[SerpApi] JSON parsing error: ${e.message}`);
        return null;
    }
}

/**
 * Executes a query against the Brave Search API.
 * Plan: $5 free monthly credit (covers ~1,000 queries), requires credit card activation.
 */
function callBraveSearchApi(query, numResults, contextLabel) {
    const props = PropertiesService.getScriptProperties();
    const braveKey = (props.getProperty('BRAVE_SEARCH_API_KEY') || '').trim();
    if (!braveKey) return null;
    const count = Math.min(20, Math.max(1, numResults || 10));
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${count}`;
    let res = null;
    for (let attempt = 0; attempt < 2; attempt++) {
        try {
            res = fetchWithRetry(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Encoding': 'gzip',
                    'X-Subscription-Token': braveKey
                },
                muteHttpExceptions: true
            });
        } catch (e) {
            Logger.log(`[Brave Search API] Network exception: ${e.message}`);
            return null;
        }

        if (res && res.getResponseCode() === 429) {
            Logger.log(`[Brave Search API] Rate-limited (HTTP 429). Pausing 2s before retry...`);
            Utilities.sleep(2000);
            continue;
        }
        break;
    }

    if (!res) return null;
    const code = res.getResponseCode();
    if (code !== 200) {
        Logger.log(`[Brave Search API] Returned HTTP ${code}: ${res.getContentText().substring(0, 150)}`);
        return null;
    }

    try {
        const data = JSON.parse(res.getContentText());
        const results = (data.web && Array.isArray(data.web.results)) ? data.web.results : [];
        const items = results.map(r => ({
            title: r.title || '',
            link: r.url || '',
            snippet: r.description || ''
        }));
        Logger.log(`[Brave Search API] Discovered ${items.length} result(s) for query: "${query.substring(0, 70)}..."`);
        Utilities.sleep(1100);
        return {
            getResponseCode: () => 200,
            getContentText: () => JSON.stringify({ organic: items }),
            getHeaders: () => ({ 'Content-Type': 'application/json', 'X-Search-Provider': 'Brave' })
        };
    } catch (e) {
        Logger.log(`[Brave Search API] JSON parsing error: ${e.message}`);
        return null;
    }
}

/**
 * Executes a query against Google Custom Search JSON API (Programmable Search Engine).
 * Free tier: 100 requests/day (~3,000/month).
 */
function callGoogleCustomSearchApi(query, numResults, contextLabel) {
    const props = PropertiesService.getScriptProperties();
    const cseKey = (props.getProperty('GOOGLE_CSE_API_KEY') || props.getProperty('GOOGLE_API_KEY') || '').trim();
    const cseCx = (props.getProperty('GOOGLE_CSE_CX') || '').trim();
    if (!cseKey || !cseCx) return null;
    const count = Math.min(10, Math.max(1, numResults || 10));
    const url = `https://customsearch.googleapis.com/customsearch/v1?key=${encodeURIComponent(cseKey)}&cx=${encodeURIComponent(cseCx)}&q=${encodeURIComponent(query)}&num=${count}`;
    let res = null;
    try {
        res = fetchWithRetry(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            muteHttpExceptions: true
        });
    } catch (e) {
        Logger.log(`[Google Custom Search API] Network exception: ${e.message}`);
        return null;
    }

    if (!res) return null;
    const code = res.getResponseCode();
    if (code !== 200) {
        Logger.log(`[Google Custom Search API] Returned HTTP ${code}: ${res.getContentText().substring(0, 150)}`);
        return null;
    }

    try {
        const data = JSON.parse(res.getContentText());
        const rawItems = Array.isArray(data.items) ? data.items : [];
        const items = rawItems.map(item => ({
            title: item.title || '',
            link: item.link || '',
            snippet: item.snippet || ''
        }));
        Logger.log(`[Google Custom Search API] Discovered ${items.length} result(s) for query: "${query.substring(0, 70)}..."`);
        return {
            getResponseCode: () => 200,
            getContentText: () => JSON.stringify({ organic: items }),
            getHeaders: () => ({ 'Content-Type': 'application/json', 'X-Search-Provider': 'GoogleCSE' })
        };
    } catch (e) {
        Logger.log(`[Google Custom Search API] JSON parsing error: ${e.message}`);
        return null;
    }
}

/**
 * Unified multi-provider web search caller with automatic rotation and cascading fallback.
 * Priority cascade:
 * 1. Serper.dev (with key rotation across SERPER_API_KEY_1..10)
 * 2. Tavily AI Search (TAVILY_API_KEY: 1,000 free/mo, NO credit card required)
 * 3. SerpApi (SERPAPI_API_KEY: 250 free Google searches/mo, NO credit card required)
 * 4. Brave Search API (BRAVE_SEARCH_API_KEY: ~1,000 free/mo with card)
 * 5. Google Custom Search JSON API (GOOGLE_CSE_API_KEY + GOOGLE_CSE_CX: 100 free/day)
 */
function callSerperWithRotation(payload, contextLabel) {
    let queryStr = '';
    let numResults = 10;
    try {
        const pObj = (typeof payload === 'string') ? JSON.parse(payload) : payload;
        if (pObj && pObj.q) queryStr = pObj.q;
        if (pObj && pObj.num) numResults = pObj.num;
    } catch (e) {
        if (typeof payload === 'string') queryStr = payload;
    }

    const pool = getSerperApiKeyPool();
    const cache = (typeof CacheService !== 'undefined' && CacheService.getScriptCache) ? CacheService.getScriptCache() : null;

    // 1. Primary Provider: Serper.dev
    if (pool && pool.length > 0 && _serperActiveKeyIndex < pool.length) {
        const payloadStr = typeof payload === 'string' ? payload : JSON.stringify(payload);
        while (_serperActiveKeyIndex < pool.length) {
            const currentKey = pool[_serperActiveKeyIndex];
            const keyPreview = currentKey.length > 8
                ? (currentKey.substring(0, 4) + '...' + currentKey.substring(currentKey.length - 4))
                : 'Key #' + (_serperActiveKeyIndex + 1);

            // Fast-path: Skip persistently blacklisted keys (e.g. 400 credit exhausted / 401 invalid cached with 6h TTL)
            let isBlacklisted = false;
            try {
                if (cache && cache.get('DEAD_SERPER_KEY_' + currentKey)) isBlacklisted = true;
            } catch (e) { }

            if (isBlacklisted) {
                _serperActiveKeyIndex++;
                continue;
            }

            let response = null;
            let attempt = 0;
            const maxAttempts = 2;
            try {
                while (attempt < maxAttempts) {
                    response = fetchWithRetry('https://google.serper.dev/search', {
                        method: 'POST',
                        contentType: 'application/json',
                        headers: { 'X-API-KEY': currentKey },
                        payload: payloadStr,
                        muteHttpExceptions: true
                    });
                    if (response && response.getResponseCode() === 429) {
                        attempt++;
                        if (attempt < maxAttempts) {
                            Utilities.sleep(2000 * attempt);
                            continue;
                        }
                    }
                    break;
                }
            } catch (netErr) {
                Logger.log(`[Serper Network Error] Key ${keyPreview} network error: ${netErr.message}. Rotating to next key...`);
                _serperActiveKeyIndex++;
                continue;
            }

            if (!response) {
                _serperActiveKeyIndex++;
                continue;
            }

            const code = response.getResponseCode();
            const body = response.getContentText();
            if (code === 400 && /not enough credits/i.test(body)) {
                Logger.log(`[Serper Key Exhausted] Key ${keyPreview} ran out of credits (${_serperActiveKeyIndex + 1}/${pool.length}). Rotating to next key...`);
                safeCachePut(cache, 'DEAD_SERPER_KEY_' + currentKey, 'true', 21600); // 6-hour persistent blacklist
                _serperActiveKeyIndex++;
                if (_serperActiveKeyIndex === pool.length - 1) {
                    notifyAdminAlert('Serper API Credits Low', `Key ${keyPreview} ran out of credits. Engine is on the final active Serper key (${_serperActiveKeyIndex + 1}/${pool.length}). Please replenish Serper API credits soon.`);
                }
                continue;
            }

            if (code === 401 || code === 403) {
                Logger.log(`[Serper Key Invalid] Key ${keyPreview} returned HTTP ${code}. Rotating to next key...`);
                safeCachePut(cache, 'DEAD_SERPER_KEY_' + currentKey, 'true', 21600); // 6-hour persistent blacklist
                _serperActiveKeyIndex++;
                continue;
            }

            return response;
        }

        Logger.log(`[Serper Pool Exhausted] All ${pool.length} Serper API key(s) exhausted. Cascading to alternative search providers...`);
        notifyAdminAlert('Serper API Key Pool Depleted', `All ${pool.length} Serper API key(s) have run out of credits. Free fallback cascade engaged.`);
    }

    // 2. Fallback Provider 1: Tavily AI Search (1,000 free/mo, NO credit card)
    if (queryStr) {
        const tavilyRes = callTavilySearchApi(queryStr, numResults, contextLabel);
        if (tavilyRes && tavilyRes.getResponseCode() === 200) {
            return tavilyRes;
        }
    }

    // 3. Fallback Provider 2: SerpApi (250 free Google searches/mo, NO credit card)
    if (queryStr) {
        const serpRes = callSerpApi(queryStr, numResults, contextLabel);
        if (serpRes && serpRes.getResponseCode() === 200) {
            return serpRes;
        }
    }

    // 4. Fallback Provider 3: Brave Search API
    if (queryStr) {
        const braveRes = callBraveSearchApi(queryStr, numResults, contextLabel);
        if (braveRes && braveRes.getResponseCode() === 200) {
            return braveRes;
        }
    }

    // 5. Fallback Provider 4: Google Custom Search JSON API
    if (queryStr) {
        const cseRes = callGoogleCustomSearchApi(queryStr, numResults, contextLabel);
        if (cseRes && cseRes.getResponseCode() === 200) {
            return cseRes;
        }
    }

    Logger.log(`[Web Search API] All configured search engines (Serper, Tavily, SerpApi, Brave, Google CSE) exhausted or unavailable for: "${contextLabel || queryStr}".`);
    return null;
}

const executeUnifiedWebSearch = callSerperWithRotation;

/**
 * PARSER 1: GENERAL WEB SEARCH VIA SERPER.DEV
 */

function fetchGoogleSearchNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    if (!isWebSearchAvailable()) {
        Logger.log('[Web Search API] Skipping: Missing search provider keys (SERPER_API_KEY, BRAVE_SEARCH_API_KEY, or GOOGLE_CSE_API_KEY + GOOGLE_CSE_CX) in Script Properties.');
        return;
    }

    const queries = buildSerperQueries(feed.queryTemplates || []);
    queries.forEach((q) => {
        const payload = JSON.stringify({
            q: q,
            num: 10,
            tbs: "qdr:m"
        });
        const response = callSerperWithRotation(payload, q);
        if (!response || response.getResponseCode() !== 200) {
            return;
        }

        try {
            const data = JSON.parse(response.getContentText());
            const items = data.organic || [];
            items.forEach(item => {
                addCandidateIfNew(
                    feed.name,
                    item.title || '',
                    item.link || '',
                    item.snippet || item.title || '',
                    existingLinks,
                    existingTitleKeys,
                    bucket,
                    feed.assumeAfrican === true,
                    null,
                    null,
                    null,
                    feedStats
                );
            });
            Utilities.sleep(250);
        } catch (e) {
            Logger.log(`[Web Search API] Exception parsing query "${q}": ${e.message}`);
        }
    });
}

/**
 * PARSER 1b: GEMINI GROUNDED WEB SEARCH (DISCOVERY ONLY)
 */

function fetchGeminiSearchNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    if (!apiKey) {
        Logger.log('[Gemini Search] Skipping: Missing GEMINI_API_KEY in Script Properties.');

        return;
    }

    const queries = buildSerperQueries(feed.queryTemplates || []);
    queries.forEach((researchPrompt, idx) => {
        if (!consumeGeminiDailyQuota('discovery')) {
            Logger.log('[Gemini Search] Discovery budget reserved for evaluation or daily budget exhausted. Skipping remaining grounded search queries this run.');

            return;
        }

        const fullPrompt = `

      Today's Date: ${getLocalDateKey()}

      ${researchPrompt}

      Format your answer as plain text, NOT JSON or Markdown. Return each finding

      as its own block in EXACTLY this format, with nothing else before or after,

      and separate blocks with a line containing only ---:

      TITLE: <the opportunity's title, as published by the source>

      LINK: <the direct, real URL where this was found>

      SNIPPET: <one or two sentences describing what it is and who is issuing it>

      If you find zero findings that meet the bar above, respond with exactly:

      NO_FINDINGS

    `;
        const attempt = tryGeminiGroundedSearch(apiKey, fullPrompt);
        if (!attempt.success) {
            Logger.log(`[Gemini Search] Query ${idx + 1}/${queries.length} failed on every model in the chain: ${attempt.reason}`);

            return;
        }

        const parsed = parseGeminiSearchBlocks(attempt.data);
        if (parsed.length === 0) return;
        parsed.forEach(finding => {
            if (!verifyLinkReachable(finding.link)) {
                Logger.log(`[Gemini Search] Dropping unreachable/hallucinated-looking link: ${finding.link}`);

                return;
            }

            addCandidateIfNew(
                feed.name,
                finding.title,
                finding.link,
                finding.snippet,
                existingLinks,
                existingTitleKeys,
                bucket,
                false,
                null,
                null,
                null,
                feedStats
            );
        });
        Utilities.sleep(250);
    });
}

function parseGeminiSearchBlocks(text, candidate) {
    const results = [];
    const seenLinks = new Set();

    // 1. Parse structured text blocks if available
    if (text && !/^\s*NO_FINDINGS\s*$/i.test(text.trim())) {
        const blocks = text.split(/\n\s*-{3,}\s*\n/);
        blocks.forEach(block => {
            const titleMatch = block.match(/TITLE:\s*(.+)/i);
            const linkMatch = block.match(/LINK:\s*(\S+)/i);
            const snippetMatch = block.match(/SNIPPET:\s*([\s\S]+?)(?:\n\s*(?:TITLE|LINK|SNIPPET):|$)/i);
            if (!titleMatch || !linkMatch) return;
            const link = linkMatch[1].trim();
            if (!/^https?:\/\//i.test(link) || seenLinks.has(link.toLowerCase())) return;
            seenLinks.add(link.toLowerCase());
            results.push({
                title: titleMatch[1].trim(),
                link: link,
                snippet: snippetMatch ? snippetMatch[1].trim() : titleMatch[1].trim()
            });
        });
    }

    // 2. Extract native Google Search grounding chunks (100% authentic Google Search results)
    const gm = candidate && candidate.groundingMetadata;
    const chunks = gm && Array.isArray(gm.groundingChunks) ? gm.groundingChunks : [];
    chunks.forEach(chunk => {
        const web = chunk && chunk.web;
        if (!web || !web.uri || !web.title) return;
        const uri = web.uri.trim();
        if (!/^https?:\/\//i.test(uri) || seenLinks.has(uri.toLowerCase())) return;
        seenLinks.add(uri.toLowerCase());
        results.push({
            title: web.title.trim(),
            link: uri,
            snippet: web.title.trim()
        });
    });
    return results;
}

function verifyLinkReachable(link) {
    if (!link || typeof link !== 'string') return false;
    const trimmed = link.trim();
    if (!/^https?:\/\/[a-z0-9.-]+\.[a-z]{2,}/i.test(trimmed)) return false;

    // Fast-pass known authentic organizational & portal domains without network fetch
    const TRUSTED_DOMAINS = /\b(?:afdb\.org|worldbank\.org|ifad\.org|ungm\.org|un\.org|undp\.org|unjobnet\.org|agra\.org|cgiar\.org|cimmyt\.org|ilri\.org|aatf-africa\.org|asareca\.org|developmentaid\.org|fundsforngos\.org|trademarkafrica\.com|trade-mark\.org|saigeopportunity\.org|linkedin\.com|facebook\.com)\b/i;
    if (TRUSTED_DOMAINS.test(trimmed)) return true;

    // Lightweight verification for unknown domains (accept 2xx, 3xx, and 401/403 Cloudflare protected pages)
    try {
        const response = UrlFetchApp.fetch(trimmed, {
            muteHttpExceptions: true,
            followRedirects: true,
            headers: FETCH_OPTIONS.headers
        });
        const code = response.getResponseCode();
        return code >= 200 && code < 404;
    } catch (e) {
        return false;
    }
}

/**
 * PARSER 2: WORLD BANK PROCUREMENT API
 */

function fetchWorldBankNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const terms = CONFIG.WORLD_BANK_SEARCH_TERMS || ['agriculture', 'seed'];
    terms.forEach(term => {
        const url = `https://search.worldbank.org/api/v2/procnotices?format=json&rows=30&sort=noticedate%20desc&term=${encodeURIComponent(term)}`;
        const response = fetchWithRetry(url, FETCH_OPTIONS);
        const code = response.getResponseCode();
        if (code !== 200) {
            Logger.log(`[World Bank API] Non-200 response (${code}) for term "${term}". Body preview: ${response.getContentText().substring(0, 200)}`);

            return;
        }

        let data;

        try {
            data = JSON.parse(response.getContentText());
        } catch (e) {
            Logger.log(`[World Bank API] Failed to parse JSON response for term "${term}": ${e.message}`);

            return;
        }

        const procnotices = data.procnotices || [];
        const list = Array.isArray(procnotices) ? procnotices : Object.values(procnotices);
        list.forEach(notice => {
            if (!notice) return;
            const noticeType = (notice.notice_type || '').trim();

            // Exclude past contract awards
            if (/contract award/i.test(noticeType)) {
                if (feedStats) { feedStats.seen++; feedStats.boilerplate++; feedStats.filtered++; feedStats.preAiRejected++; }
                return;
            }
            if (notice.notice_status && !/published|open/i.test(notice.notice_status)) {
                if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
                return;
            }
            const title = decodeHtmlEntities(notice.bid_description || notice.project_name || notice.notice_type || '');
            if (!title) return;
            const noticeId = notice.id || '';
            const link = notice.url || (noticeId ? `https://projects.worldbank.org/en/projects-operations/procurement-detail/${noticeId}` : '');
            if (!link) return;
            const country = notice.project_ctry_name || notice.countryname || '';
            const refNo = notice.bid_reference_no ? ` [Ref: ${notice.bid_reference_no}]` : '';
            const description = `${title}${refNo} - Project: ${notice.project_name || ''} - Country: ${country} - Notice Type: ${noticeType} - Date: ${notice.noticedate || ''}`;
            if (notice.noticedate) {
                const pDate = parseDateFlexible(notice.noticedate);
                if (pDate && !isNaN(pDate.getTime()) && pDate.getFullYear() < getCurrentYear()) {
                    if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
                    return;
                }
            }
            addCandidateIfNew(feed.name, title, link, description, existingLinks, existingTitleKeys, bucket, false, null, null, null, feedStats);
        });
        Utilities.sleep(250);
    });
}

/**
 * PARSER 3: EU TED SEARCH API
 */

function fetchTedNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const url = 'https://api.ted.europa.eu/v3/notices/search';
    const payload = {
        query: '(FT~"seed" OR FT~"semence" OR FT~"semences" OR FT~"agriculture" OR FT~"crop" OR FT~"agribusiness") AND (FT~"Africa" OR FT~"Sub-Saharan" OR FT~"Kenya" OR FT~"Tanzania" OR FT~"Uganda" OR FT~"Nigeria" OR FT~"Ethiopia" OR FT~"Rwanda" OR FT~"Ghana" OR FT~"Malawi" OR FT~"Zambia" OR FT~"Sahel" OR FT~"Senegal" OR FT~"ACP") AND PD >= today(-90)',
        fields: ['ND', 'PD', 'TI', 'CY', 'DS'],
        page: 1,
        limit: 20,
        scope: 'ALL'
    };
    const response = fetchWithRetry(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
    });
    const tedCode = response.getResponseCode();
    if (tedCode !== 200) {
        Logger.log(`[TED API] Non-200 response (${tedCode}). Body preview: ${response.getContentText().substring(0, 200)}`);
        fetchTedSerperFallback(feed, existingLinks, existingTitleKeys, bucket, feedStats);
        return;
    }

    let data;

    try {
        data = JSON.parse(response.getContentText());
    } catch (e) {
        Logger.log(`[TED API] Failed to parse JSON response: ${e.message}`);

        return;
    }

    const notices = data.notices || data.results || [];
    notices.forEach(notice => {
        const noticeId = notice.ND || notice.id || '';
        const title = (notice.TI && (notice.TI.eng || notice.TI.en || Object.values(notice.TI)[0])) || notice.title || `TED Notice ${noticeId}`;
        const link = noticeId ? `https://ted.europa.eu/en/notice/-/detail/${noticeId}` : null;
        const publicationDate = notice.PD || notice.publicationDate || null;
        const description = `${title} — published ${publicationDate || 'date not specified'}, country: ${notice.CY || 'n/a'}`;
        if (!link) return;
        if (publicationDate) {
            const pDate = parseDateFlexible(publicationDate);
            if (pDate && !isNaN(pDate.getTime()) && pDate.getFullYear() < getCurrentYear()) {
                if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
                return;
            }
        }
        addCandidateIfNew(feed.name, title, link, description, existingLinks, existingTitleKeys, bucket, false, null, null, null, feedStats);
    });
}

/**
 * PARSER 4: AGRA ORACLE FUSION API
 */

function fetchTedSerperFallback(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    Logger.log('[EU TED Search API] Rate-limited (HTTP 429). Free fallback engaged: querying web search providers for active African agricultural tenders on TED.');
    if (!isWebSearchAvailable()) return;
    const query = 'site:ted.europa.eu ("seed" OR "semence" OR "agriculture" OR "agribusiness" OR "crop" OR "planting materials") ("Africa" OR "Kenya" OR "Tanzania" OR "Uganda" OR "Ethiopia" OR "Rwanda" OR "Ghana" OR "Nigeria" OR "Sahel" OR "Senegal" OR "Mali" OR "Cote d\'Ivoire") -jobs -career -vacancy';
    const payload = { q: query, num: 10, gl: 'ke', hl: 'en' };
    const res = callSerperWithRotation(payload, 'TED Fallback');
    if (!res || res.getResponseCode() !== 200) return;
    try {
        const data = JSON.parse(res.getContentText());
        const items = data.organic || [];
        Logger.log(`[EU TED Search API] Serper fallback discovered ${items.length} candidate(s).`);
        items.forEach(item => {
            if (!item.title || !item.link) return;
            addCandidateIfNew(
                feed.name,
                item.title,
                item.link,
                item.snippet || 'EU TED Notice',
                existingLinks,
                existingTitleKeys,
                bucket,
                true,
                null,
                null,
                null,
                feedStats
            );
        });
    } catch (e) {
        Logger.log('[EU TED Search API] Fallback error parsing Serper response: ' + e.message);
    }
}

function fetchAgraNegotiationAbstracts(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const response = fetchWithRetry(feed.url, FETCH_OPTIONS);
    const agraCode = response.getResponseCode();
    if (agraCode !== 200) {
        Logger.log(`[AGRA API] Non-200 response (${agraCode}). Body preview: ${response.getContentText().substring(0, 200)}`);

        return;
    }

    let data;

    try {
        data = JSON.parse(response.getContentText());
    } catch (e) {
        Logger.log(`[AGRA API] Failed to parse JSON response: ${e.message}`);

        return;
    }

    const items = data.items || [];
    items.forEach(item => {
        if (item.CloseDate) {
            const closeDate = new Date(item.CloseDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (!isNaN(closeDate.getTime()) && closeDate.getTime() < today.getTime()) {
                if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
                return;
            }
        }

        const title = item.NegotiationTitle || item.Negotiation || `AGRA Negotiation ${item.AuctionHeaderId || ''}`;
        const link = feed.abstractListingPageUrl + (item.AuctionHeaderId ? `&auctionId=${item.AuctionHeaderId}#auction-${item.AuctionHeaderId}` : '');
        const formattedDeadline = item.CloseDate ? item.CloseDate.substring(0, 10) : '';
        const description = [
            'Buyer: AGRA (Alliance for a Green Revolution in Africa)',
            formattedDeadline ? `Deadline: ${formattedDeadline}` : '',
            item.Negotiation ? `Ref: ${item.Negotiation}` : '',
            item.NegotiationType ? `Type: ${item.NegotiationType}` : '',
            item.CloseDate ? `Closes: ${item.CloseDate}` : '',
            item.Synopsis || '',
            item.PostingDate ? `Posted: ${item.PostingDate}` : '',
            '[Note: link opens the general AGRA listing page]'
        ].filter(Boolean).join(' | ');
        addCandidateIfNew(feed.name, title, link, description || title, existingLinks, existingTitleKeys, bucket, true, null, null, null, feedStats);
    });
}

function buildPaginatedUrl(baseUrl, paramName, pageNum) {
    if (pageNum <= 1) return baseUrl;
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${paramName}=${pageNum}`;
}

/**
 * PARSER 4b: IFAD PROJECT PROCUREMENT OPPORTUNITIES
 *
 * IFAD currently publishes GPNs, SPNs and CANs on the project procurement
 * opportunities page. Only GPN/SPN notices are candidates for active discovery;
 * Contract Award Notices are explicitly excluded because they describe completed
 * procurement processes.
 */

function scrapeIfadProjectProcurement(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const maxPages = (feed.pagination && feed.pagination.maxPages) || 12;
    const paramName = (feed.pagination && feed.pagination.paramName) || 'page';
    for (let page = 1; page <= maxPages; page++) {
        const pageUrl = buildPaginatedUrl(feed.url, paramName, page);
        let response;

        try {
            response = fetchWithRetry(pageUrl, FETCH_OPTIONS);
        } catch (e) {
            Logger.log(`[IFAD Procurement] Request failed for page ${page}: ${e.message}`);
            break;
        }

        let html = "";
        const code = response.getResponseCode();
        if (code !== 200) {
            if (code === 403 || code === 429) {
                Logger.log(`[IFAD Procurement] HTTP ${code} (Cloudflare block). Engaging fast Serper fallback.`);
                queryPortalSerperFallback('ifad.org', ['"Call for Proposals"', '"General Procurement Notice"', '"Specific Procurement Notice"', 'RFP', 'Grant', 'Tender'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
                break;
            } else {
                Logger.log(`[IFAD Procurement] HTTP ${code} on page ${page}. Stopping pagination.`);
                break;
            }
        } else {
            html = response.getContentText();
        }

        if (detectBotBlockSignature(html)) {
            Logger.log(`[IFAD Procurement] Bot-block detected on page ${page}. Engaging fast Serper fallback.`);
            queryPortalSerperFallback('ifad.org', ['"Call for Proposals"', '"General Procurement Notice"', '"Specific Procurement Notice"', 'RFP', 'Grant', 'Tender'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
            break;
        } else {
            extractIfadNoticeCandidates(html, feed, existingLinks, existingTitleKeys, bucket, feedStats);
        }

        if (page < maxPages) Utilities.sleep(250);
    }
}

function extractIfadNoticeCandidates(html, feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const blockRegex = /<(?:article|li|tr|div)\b[^>]*>([\s\S]*?)<\/(?:article|li|tr|div)>/gi;
    let match;
    let foundBlocks = 0;
    while ((match = blockRegex.exec(html)) !== null) {
        const block = match[1];
        const text = decodeHtmlEntities(block.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
        if (text.length < 30) continue;
        const typeMatch = text.match(/\b(General Procurement Notice|Specific Procurement Notice|Contract Award Notice)\b/i);
        if (!typeMatch) continue;
        const noticeType = typeMatch[1];
        if ((feed.excludeNoticeTypes || []).some(t => new RegExp('\\b' + escapeRegex(t) + '\\b', 'i').test(noticeType))) continue;
        if ((feed.includeNoticeTypes || []).length && !(feed.includeNoticeTypes || []).some(t => new RegExp('\\b' + escapeRegex(t) + '\\b', 'i').test(noticeType))) continue;
        const linkMatch = block.match(/href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
        if (!linkMatch) continue;
        let link = linkMatch[1].trim();
        if (!/^https?:\/\//i.test(link)) link = feed.baseUrl + (link.startsWith('/') ? '' : '/') + link;
        const anchor = decodeHtmlEntities(linkMatch[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
        const titleMatch = text.match(new RegExp(noticeType + '\\s*[-:]\\s*(.+?)(?=\\s+Sector Name:|\\s+Country:|\\s+Project:|$)', 'i'));
        const title = (titleMatch && titleMatch[1].trim()) || anchor || text.substring(0, 220);
        const description = `[${noticeType}] ${text}`;
        addCandidateIfNew(feed.name, title, link, description, existingLinks, existingTitleKeys, bucket, false, feed.url, null, null, feedStats);

        foundBlocks++;
    }

    // Fallback for layouts where the notice text and link are not contained in the same block.

    if (foundBlocks === 0) {
        const anchorRegex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
        let a;
        while ((a = anchorRegex.exec(html)) !== null) {
            const anchorText = decodeHtmlEntities(a[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
            if (!/General Procurement Notice|Specific Procurement Notice/i.test(anchorText)) continue;
            if (/Contract Award Notice/i.test(anchorText)) continue;
            let link = a[1].trim();
            if (!/^https?:\/\//i.test(link)) link = feed.baseUrl + (link.startsWith('/') ? '' : '/') + link;
            addCandidateIfNew(feed.name, anchorText, link, anchorText, existingLinks, existingTitleKeys, bucket, false, feed.url, null, null, feedStats);
        }
    }
}

/**
 * PARSER 4c: IFAD CALLS FOR PROPOSALS
 *
 * This is kept separate from project procurement because IFAD's current Calls
 * for Proposals page is a grant/proposal opportunity catalogue with its own
 * pagination and is not the same notice type as GPN/SPN procurement notices.
 */

function scrapeIfadCallsForProposals(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const maxPages = (feed.pagination && feed.pagination.maxPages) || 6;
    const paramName = (feed.pagination && feed.pagination.paramName) || 'page';
    for (let page = 1; page <= maxPages; page++) {
        const pageUrl = buildPaginatedUrl(feed.url, paramName, page);
        let response;

        try {
            response = fetchWithRetry(pageUrl, FETCH_OPTIONS);
        } catch (e) {
            Logger.log(`[IFAD Calls] Request failed for page ${page}: ${e.message}`);
            break;
        }

        let html = "";
        const code = response.getResponseCode();
        if (code !== 200) {
            if (code === 403 || code === 429) {
                Logger.log(`[IFAD Calls] HTTP ${code} (Cloudflare block). Engaging fast Serper fallback.`);
                queryPortalSerperFallback('ifad.org', ['Call for Proposals', 'Call for Applications', 'Grant Opportunity', 'Request for Proposals', 'Challenge Fund'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
                break;
            } else {
                break;
            }
        } else {
            html = response.getContentText();
        }

        const anchorRegex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
        let match;
        while ((match = anchorRegex.exec(html)) !== null) {
            const title = decodeHtmlEntities(match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
            if (!title || title.length < 20 || !/call for proposals|request for expression of interest|call for proposal/i.test(title)) continue;
            let link = match[1].trim();
            if (!/^https?:\/\//i.test(link)) link = feed.baseUrl + (link.startsWith('/') ? '' : '/') + link;
            const description = `IFAD Call for Proposals: ${title}`;
            addCandidateIfNew(feed.name, title, link, description, existingLinks, existingTitleKeys, bucket, true, feed.url, null, null, feedStats);
        }

        if (page < maxPages) Utilities.sleep(250);
    }
}

/**
 * PARSER 4d: ALL BUSINESS AFRICA API
 * Ingests live African procurement, tenders, and funding opportunities
 * from All Business Africa's public REST API (https://allbusiness.africa).
 */

function fetchAllBusinessAfricaNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const baseUrl = feed.url || 'https://allbusiness.africa/api/opportunities';
    const siteBase = feed.baseUrl || 'https://allbusiness.africa';
    const perPage = feed.perPage || 50;
    const maxPages = feed.maxPages || 3;
    const searchTerms = feed.searchTerms || ['seed', 'agriculture', 'crops', 'agribusiness'];

    // 1. Fetch newest live open tenders (limit broad scan to 1 page so targeted queries dominate)

    const broadPages = Math.min(maxPages, 1);
    for (let page = 1; page <= broadPages; page++) {
        const pageUrl = `${baseUrl}?type=tender&status=open&sort=newest&perPage=${perPage}&page=${page}`;
        const stopEarly = processAllBusinessAfricaPage(pageUrl, feed, siteBase, existingLinks, existingTitleKeys, bucket, feedStats);
        if (stopEarly) break;
        Utilities.sleep(250);
    }

    // 2. Fetch targeted keyword queries (seed systems, agriculture, etc.)

    if (Array.isArray(searchTerms)) {
        searchTerms.forEach(term => {
            const searchUrl = `${baseUrl}?type=tender&status=open&search=${encodeURIComponent(term)}&perPage=25&page=1`;
            processAllBusinessAfricaPage(searchUrl, feed, siteBase, existingLinks, existingTitleKeys, bucket, feedStats);
            Utilities.sleep(250);
        });
    }
}

function processAllBusinessAfricaPage(url, feed, siteBase, existingLinks, existingTitleKeys, bucket, feedStats) {
    let response;

    try {
        response = fetchWithRetry(url, FETCH_OPTIONS);
    } catch (e) {
        Logger.log(`[All Business Africa API] Request failed for ${url}: ${e.message}`);
        return true;
    }

    const code = response.getResponseCode();
    if (code !== 200) {
        Logger.log(`[All Business Africa API] Non-200 response (${code}) fetching ${url}`);
        return true;
    }

    let data;

    try {
        data = JSON.parse(response.getContentText());
    } catch (e) {
        Logger.log(`[All Business Africa API] Failed to parse JSON response: ${e.message}`);
        return true;
    }

    const items = data.items || [];
    if (!items.length) return true;
    items.forEach(item => {
        // Check deadline if present
        if (item.deadline) {
            const deadlineDate = new Date(item.deadline);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (!isNaN(deadlineDate.getTime()) && deadlineDate.getTime() < today.getTime()) {
                if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
                return;
            }
        }

        const title = item.title || '';
        if (!title) return;

        // Prefer permalink to ABA tender page; include upstream source notice if available

        const link = item.slug ? `${siteBase}/tenders/${item.slug}` : (item.sourceUrl || `${siteBase}/opportunities`);
        const countryName = item.country && item.country.title ? item.country.title : (item.region || 'Africa');
        const org = item.organization || item.awardingOrganization || '';
        const category = item.primaryCategory || '';
        const ref = item.referenceNumber || '';
        const deadlineStr = item.deadline ? `Deadline: ${item.deadline.split('T')[0]}` : '';
        const description = [
            item.summary || '',
            org ? `Buyer: ${org}` : '',
            countryName ? `Country: ${countryName}` : '',
            category ? `Category: ${category}` : '',
            ref ? `Ref: ${ref}` : '',
            deadlineStr,
            item.sourceUrl ? `Original Notice: ${item.sourceUrl}` : ''
        ].filter(Boolean).join(' | ');
        addCandidateIfNew(
            feed.name,
            title,
            link,
            description || title,
            existingLinks,
            existingTitleKeys,
            bucket,
            true, // assumeAfrican = true (100% African opportunities)

            null,
            null,
            null,
            feedStats
        );
    });
    return false;
}

/**
 * PARSER 4e: AGRA OPPORTUNITIES & CONCEPT NOTES API
 * Ingests live Requests for Concept Notes (RFCNs), consultancies, and grant calls
 * from AGRA's WordPress REST API (https://agra.org/opportunity).
 */

function fetchAgraOpportunitiesNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const url = feed.url || 'https://agra.org/wp-json/wp/v2/opportunity?per_page=20';
    let response;
    const agraRestOptions = {
        muteHttpExceptions: true,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://agra.org/opportunity/'
        }
    };

    try {
        response = fetchWithRetry(url, agraRestOptions);
    } catch (e) {
        Logger.log(`[AGRA Opportunities API] Request failed for ${url}: ${e.message}`);
    }

    const code = response ? response.getResponseCode() : 0;
    const body = response ? response.getContentText() : '';
    let items = null;
    if (code === 200 && body && (body.trim().startsWith('[') || body.trim().startsWith('{'))) {
        try {
            items = JSON.parse(body);
        } catch (e) {
            Logger.log(`[AGRA Opportunities API] Failed to parse JSON: ${e.message}`);
        }
    }

    // 1. Direct WordPress REST API succeeded

    if (Array.isArray(items) && items.length > 0) {
        items.forEach(item => {
            const rawTitle = (item.title && item.title.rendered) ? item.title.rendered : '';
            const cleanTitle = rawTitle.replace(/&#8211;/g, '–').replace(/&#8217;/g, "'").replace(/&#038;/g, '&').replace(/<[^>]+>/g, '').trim();
            if (!cleanTitle) return;
            if (/\b(Officer|Coordinator|Director|Lead|Specialist|Manager|Accountant|Associate|Assistant|Intern|Internship|Chief of Staff)\b/i.test(cleanTitle) &&
                !/\b(Consultant|Consultancy|Firm|RFP|EOI|Call for Proposals|Call for Concept Notes|Grant|Challenge Fund|RFCN)\b/i.test(cleanTitle)) {
                if (feedStats) { feedStats.seen++; feedStats.boilerplate++; feedStats.filtered++; feedStats.preAiRejected++; }
                return;
            }

            const link = item.link || (feed.baseUrl ? `${feed.baseUrl}/opportunity/${item.slug}/` : '');
            const excerpt = (item.excerpt && item.excerpt.rendered) ? item.excerpt.rendered.replace(/<[^>]+>/g, '').trim() : '';
            const dateStr = item.date ? item.date.split('T')[0] : '';
            const description = [
                'Buyer: AGRA (Alliance for a Green Revolution in Africa)',
                dateStr ? `Published: ${dateStr}` : '',
                excerpt
            ].filter(Boolean).join(' | ');
            addCandidateIfNew(feed.name, cleanTitle, link, description, existingLinks, existingTitleKeys, bucket, true, feed.url, null, null, feedStats);
        });

        return;
    }

    // 2. Fallback: Parse HTML opportunity page directly if REST API returned HTML or non-200

    Logger.log(`[AGRA Opportunities API] REST JSON unavailable or non-200 (HTTP ${code}, length ${body ? body.length : 0}). Parsing opportunity cards directly from HTML page.`);
    let html = '';

    try {
        const htmlRes = fetchWithRetry('https://agra.org/opportunity/', FETCH_OPTIONS);
        if (htmlRes && htmlRes.getResponseCode() === 200) {
            html = htmlRes.getContentText();
        } else {
            Logger.log(`[AGRA Opportunities API] HTML fetch returned HTTP ${htmlRes ? htmlRes.getResponseCode() : 'none'}`);
        }
    } catch (e) {
        Logger.log(`[AGRA Opportunities API] Webpage fetch failed: ${e.message}`);
    }

    let htmlCandidateCount = 0;
    if (html) {
        const articleRegex = /<article\b[^>]*>([\s\S]*?)<\/article>/gi;
        let match;
        while ((match = articleRegex.exec(html)) !== null) {
            const block = match[1];
            const titleMatch = block.match(/<h[234][^>]*>([\s\S]*?)<\/h[234]>/i);
            const linkMatch = block.match(/href=["'](https:\/\/agra\.org\/opportunity\/[^"']+)["']/i) || block.match(/href=["']([^"']+)["']/i);
            const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').replace(/&#8211;/g, '–').replace(/&#8217;/g, "'").replace(/&#038;/g, '&').trim() : '';
            let link = linkMatch ? linkMatch[1] : '';
            if (!title || !link) continue;
            if (!/^https?:\/\//i.test(link)) link = feed.baseUrl + (link.startsWith('/') ? '' : '/') + link;
            if (/\b(Officer|Coordinator|Director|Lead|Specialist|Manager|Accountant|Associate|Assistant|Intern|Internship|Chief of Staff)\b/i.test(title) &&
                !/\b(Consultant|Consultancy|Firm|RFP|EOI|Call for Proposals|Call for Concept Notes|Grant|Challenge Fund|RFCN)\b/i.test(title)) {
                if (feedStats) { feedStats.seen++; feedStats.boilerplate++; feedStats.filtered++; feedStats.preAiRejected++; }
                continue;
            }

            addCandidateIfNew(feed.name, title, link, 'Buyer: AGRA (Alliance for a Green Revolution in Africa)', existingLinks, existingTitleKeys, bucket, true, feed.url, null, null, feedStats);

            htmlCandidateCount++;
        }
    }

    // 3. Ultimate Fallback: Google Serper Portal Search

    if (htmlCandidateCount === 0) {
        Logger.log('[AGRA Opportunities API] Webpage parsing returned 0 candidates. Engaging Google Serper fallback for AGRA opportunities.');
        queryPortalSerperFallback('agra.org/opportunity', ['Request for Concept Notes', 'RFCN', 'Call for Proposals', 'Consultancy'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
    }
}

/**
 * PARSER 4f: ASARECA REST API
 * Ingests consultancies and EOIs across 14 Eastern & Central African member countries
 * from ASARECA's WordPress REST API (https://www.asareca.org).
 */

function fetchAsarecaNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const url = feed.url || 'https://www.asareca.org/wp-json/wp/v2/posts?categories=90&per_page=20';

    // Fast Serper Fallback: Bypass slow/hanging asareca.org WordPress server
    if (feed.preferSerperFallback) {
        Logger.log(`[ASARECA REST API] Fast Serper fallback engaged directly (bypassing slow WordPress server).`);
        queryPortalSerperFallback('asareca.org', ['"Terms of Reference"', '"Call for Proposals"', 'Consultancy', '"Expression of Interest"', 'EOI', 'RFP'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
        return;
    }

    let response;

    try {
        response = fetchWithRetry(url, FETCH_OPTIONS, 0);
    } catch (e) {
        Logger.log(`[ASARECA REST API] Request failed/timed out for ${url}: ${e.message}. Engaging fast Serper fallback.`);
        queryPortalSerperFallback('asareca.org', ['"Terms of Reference"', '"Call for Proposals"', 'Consultancy', '"Expression of Interest"', 'EOI', 'RFP'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
        return;
    }

    const code = response.getResponseCode();
    if (code !== 200) {
        Logger.log(`[ASARECA REST API] Non-200 response (${code}) fetching ${url}. Engaging fast Serper fallback.`);
        queryPortalSerperFallback('asareca.org', ['"Terms of Reference"', '"Call for Proposals"', 'Consultancy', '"Expression of Interest"', 'EOI', 'RFP'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
        return;
    }

    let items;

    try {
        items = JSON.parse(response.getContentText());
    } catch (e) {
        Logger.log(`[ASARECA REST API] Failed to parse JSON: ${e.message}. Engaging fast Serper fallback.`);
        queryPortalSerperFallback('asareca.org', ['"Terms of Reference"', '"Call for Proposals"', 'Consultancy', '"Expression of Interest"', 'EOI', 'RFP'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
        return;
    }

    if (!Array.isArray(items) || !items.length) {
        queryPortalSerperFallback('asareca.org', ['"Terms of Reference"', '"Call for Proposals"', 'Consultancy', '"Expression of Interest"', 'EOI', 'RFP'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
        return;
    }

    items.forEach(item => {
        const rawTitle = (item.title && item.title.rendered) ? item.title.rendered : '';
        const cleanTitle = rawTitle.replace(/&#8211;/g, '–').replace(/&#8217;/g, "'").replace(/&#038;/g, '&').replace(/<[^>]+>/g, '').trim();
        if (!cleanTitle) return;
        const link = item.link || '';
        const excerpt = (item.excerpt && item.excerpt.rendered) ? item.excerpt.rendered.replace(/<[^>]+>/g, '').trim() : '';
        const dateStr = item.date ? item.date.split('T')[0] : '';
        if (dateStr) {
            const pDate = parseDateFlexible(dateStr);
            if (pDate && !isNaN(pDate.getTime()) && pDate.getFullYear() < getCurrentYear()) {
                if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
                return;
            }
        }
        const description = [
            'Buyer: ASARECA (Association for Strengthening Agricultural Research in Eastern and Central Africa)',
            dateStr ? `Published: ${dateStr}` : '',
            excerpt
        ].filter(Boolean).join(' | ');
        addCandidateIfNew(
            feed.name,
            cleanTitle,
            link,
            description || cleanTitle,
            existingLinks,
            existingTitleKeys,
            bucket,
            true, // assumeAfrican = true
            null,
            null,
            null,
            feedStats
        );
    });
}

/**
 * PARSER 4g: ILRI PROCUREMENT SCRAPER (CGIAR)
 * Ingests live procurement notices and seed/ag consultancies from ILRI's tenders portal
 * (https://www.ilri.org/tenders).
 */

function fetchIlriNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const url = feed.url || 'https://www.ilri.org/tenders';
    const siteBase = feed.baseUrl || 'https://www.ilri.org';
    let response;

    try {
        response = fetchWithRetry(url, FETCH_OPTIONS);
    } catch (e) {
        Logger.log(`[ILRI Scraper] Request failed for ${url}: ${e.message}. Engaging fast Serper fallback.`);
        queryPortalSerperFallback('ilri.org', ['Tenders', 'Consultancy', 'RFP', 'EOI', '"Request for Proposals"'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
        return;
    }

    const code = response.getResponseCode();
    if (code !== 200) {
        Logger.log(`[ILRI Scraper] Non-200 response (${code}) fetching ${url}. Engaging fast Serper fallback.`);
        queryPortalSerperFallback('ilri.org', ['Tenders', 'Consultancy', 'RFP', 'EOI', '"Request for Proposals"'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
        return;
    }

    const html = response.getContentText();
    const rows = html.match(/<tr[\s\S]*?<\/tr>/gi) || [];
    if (!rows.length) {
        Logger.log(`[ILRI Scraper] No table rows found. Engaging fast Serper fallback.`);
        queryPortalSerperFallback('ilri.org', ['Tenders', 'Consultancy', 'RFP', 'EOI', '"Request for Proposals"'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
        return;
    }

    let validRowsSeen = 0;
    let activeCandidatesAdded = 0;
    rows.forEach(row => {
        const linkMatch = row.match(/<a[^>]+href=[\"']([^\"']+)[\"'][^>]*>([\s\S]*?)<\/a>/i);
        if (!linkMatch || !linkMatch[1].includes('/tenders/')) return;
        let path = linkMatch[1].trim();
        if (!path.startsWith('http')) {
            path = siteBase + (path.startsWith('/') ? path : '/' + path);
        }

        const cells = (row.match(/<td[\s\S]*?<\/td>/gi) || []).map(td => td.replace(/<[^>]+>/g, '').trim());
        if (cells.length < 3) return;

        validRowsSeen++;

        // ILRI Table Structure: [0] Title, [1] Reference No, [2] Posting Date, [3] Closing Date, [4] Status, [5] Link
        const title = cells[0] || '';
        const ref = cells[1] || '';
        const postingDate = cells[2] || '';
        const deadline = cells[3] || '';
        const status = cells[4] || '';
        if (!title) return;

        // Filter out if explicitly marked Closed on the ILRI portal
        if (status.toLowerCase() === 'closed') {
            if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
            return;
        }

        // Filter out past deadline before AI evaluation
        if (deadline) {
            const closing = heuristicClosingCheck(`Deadline: ${deadline}`);
            if (!closing.isOpen && closing.closingDate !== 'Not Specified') {
                if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
                return;
            }
        }

        const description = [
            'Buyer: ILRI / CGIAR (International Livestock Research Institute)',
            ref ? `Ref: ${ref}` : '',
            status ? `Status: ${status}` : '',
            deadline ? `Deadline: ${deadline}` : '',
            postingDate ? `Posted: ${postingDate}` : ''
        ].filter(Boolean).join(' | ');

        addCandidateIfNew(
            feed.name,
            title,
            path,
            description || title,
            existingLinks,
            existingTitleKeys,
            bucket,
            true, // assumeAfrican = true
            null,
            null,
            null,
            feedStats
        );
        activeCandidatesAdded++;
    });

    // If all notices on the legacy table are expired/closed, the portal is functioning normally.
    // Do NOT auto-pivot to Serper: 0 active tenders simply means no tenders are currently published.
    if (validRowsSeen > 0 && activeCandidatesAdded === 0) {
        Logger.log(`[ILRI Scraper] Legacy portal verified: all ${validRowsSeen} listed tender(s) are closed/expired. No active tenders currently published (skipping unneeded search query).`);
    }
}

/**
 * PARSER 4h: AATF TENDERS SCRAPER
 * Ingests live seed technology transfer, agricultural consulting, and procurement notices
 * from AATF (African Agricultural Technology Foundation - https://www.aatf-africa.org/tenders/).
 */

function fetchAatfNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const url = feed.url || 'https://www.aatf-africa.org/tenders/';
    const siteBase = feed.baseUrl || 'https://www.aatf-africa.org';
    let response;

    try {
        response = fetchWithRetry(url, FETCH_OPTIONS);
    } catch (e) {
        Logger.log(`[AATF Scraper] Request failed for ${url}: ${e.message}`);

        return;
    }

    const code = response.getResponseCode();
    if (code !== 200) {
        Logger.log(`[AATF Scraper] Non-200 response (${code}) fetching ${url}`);

        return;
    }

    const html = response.getContentText();
    const sections = html.split(/class=[\"']vc_row wpb_row vc_row-fluid[\"']/i);
    if (sections.length <= 1) return;
    for (let i = 1; i < sections.length; i++) {
        const sec = sections[i];
        const h2Match = sec.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
        if (!h2Match) continue;
        const title = h2Match[1].replace(/<[^>]+>/g, '').trim();
        if (!title) continue;
        const pdfMatch = sec.match(/href=[\"'](https?:\/\/[^\"']+\.pdf)[\"']/i);
        const link = pdfMatch ? pdfMatch[1] : (feed.url || siteBase);
        const dateMatch = sec.match(/Closing Date:\s*([0-9\/\-]+)/i);
        const deadline = dateMatch ? dateMatch[1].trim() : '';
        const statusMatch = sec.match(/Status:\s*(?:<[^>]+>)*\s*<b>([A-Za-z]+)<\/b>/i) || sec.match(/Status:\s*(?:<[^>]+>)*\s*([A-Za-z]+)/i);
        const status = statusMatch ? statusMatch[1].trim() : '';

        // Drop explicitly closed or past-deadline tenders before AI evaluation
        if (/closed/i.test(status)) {
            if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
            return;
        }
        if (deadline) {
            const closing = heuristicClosingCheck(`Closing Date: ${deadline}`);
            if (!closing.isOpen && closing.closingDate !== 'Not Specified') {
                if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
                return;
            }
        }

        const description = [
            'Buyer: AATF (African Agricultural Technology Foundation)',
            status ? `Status: ${status}` : '',
            deadline ? `Closing Date: ${deadline}` : '',
            pdfMatch ? `Document: ${pdfMatch[1]}` : ''
        ].filter(Boolean).join(' | ');
        addCandidateIfNew(
            feed.name,
            title,
            link,
            description || title,
            existingLinks,
            existingTitleKeys,
            bucket,
            true, // assumeAfrican = true

            null,
            null,
            null,
            feedStats
        );
    }
}

/**
 * PARSER 4h-2: CIMMYT OPPORTUNITIES & CONSULTANCIES (CGIAR)
 * Directly ingests consultancies, fellowships, and research program opportunities
 * from CIMMYT's official Workable ATS API (https://apply.workable.com/api/v1/widget/accounts/577052)
 * and monitors the official Careers portal for active Tenders & Requests for Proposals.
 */

function fetchCimmytOpportunities(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const apiUrl = feed.url || 'https://apply.workable.com/api/v1/widget/accounts/577052';
    const webUrl = feed.webUrl || 'https://www.cimmyt.org/careers/';

    // 1. Ingest from CIMMYT Official Workable ATS API
    const cache = (typeof CacheService !== 'undefined' && CacheService.getScriptCache) ? CacheService.getScriptCache() : null;

    try {
        const response = fetchWithRetry(apiUrl, FETCH_OPTIONS);
        const code = response.getResponseCode();
        if (code === 200) {
            const text = response.getContentText();
            let data;

            try {
                data = JSON.parse(text);
            } catch (err) {
                Logger.log('[CIMMYT API] Failed to parse JSON: ' + err.message);
            }

            if (data && Array.isArray(data.jobs)) {
                // Cache Workable jobs for 6 hours (21,600s) to absorb subsequent 429 rate limits
                if (cache) safeCachePut(cache, 'CIMMYT_WORKABLE_JOBS', JSON.stringify(data.jobs), 21600);
                parseCimmytWorkableJobs(data.jobs, feed, existingLinks, existingTitleKeys, bucket, feedStats, apiUrl);
            }
        } else {
            Logger.log(`[CIMMYT API] Non-200 response (${code}) from ${apiUrl}.`);
            // Check cache before engaging search fallback
            let handledFromCache = false;
            if (cache) {
                try {
                    const cachedJobsJson = cache.get('CIMMYT_WORKABLE_JOBS');
                    if (cachedJobsJson) {
                        const cachedJobs = JSON.parse(cachedJobsJson);
                        Logger.log(`[CIMMYT API] Workable rate-limited. Reusing ${cachedJobs.length} cached job(s) from previous cycle (0 API credits used).`);
                        parseCimmytWorkableJobs(cachedJobs, feed, existingLinks, existingTitleKeys, bucket, feedStats, apiUrl);
                        handledFromCache = true;
                    }
                } catch (cErr) { }
            }
            if (!handledFromCache) {
                fetchCimmytSerperFallback(feed, existingLinks, existingTitleKeys, bucket, feedStats);
            }
        }
    } catch (e) {
        Logger.log('[CIMMYT API] Error fetching Workable API: ' + e.message + '.');
        let handledFromCache = false;
        if (cache) {
            try {
                const cachedJobsJson = cache.get('CIMMYT_WORKABLE_JOBS');
                if (cachedJobsJson) {
                    const cachedJobs = JSON.parse(cachedJobsJson);
                    Logger.log(`[CIMMYT API] Reusing ${cachedJobs.length} cached job(s) from previous cycle.`);
                    parseCimmytWorkableJobs(cachedJobs, feed, existingLinks, existingTitleKeys, bucket, feedStats, apiUrl);
                    handledFromCache = true;
                }
            } catch (cErr) { }
        }
        if (!handledFromCache) {
            fetchCimmytSerperFallback(feed, existingLinks, existingTitleKeys, bucket, feedStats);
        }
    }

    // 2. Direct Scrape of CIMMYT Careers page for active Tenders & RFPs card

    try {
        const webResponse = fetchWithRetry(webUrl, FETCH_OPTIONS);
        if (webResponse.getResponseCode() === 200) {
            const html = webResponse.getContentText();
            const tenderMatch = html.match(/<h3[^>]*>Tenders & Requests for Proposals<\/h3>([\s\S]*?)<\/div>/i);
            if (tenderMatch) {
                const block = tenderMatch[1];
                const links = block.match(/<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi) || [];
                links.forEach(l => {
                    const hrefMatch = l.match(/href=["']([^"']+)["']/i);
                    const textMatch = l.match(/>([^<]+)</);
                    if (hrefMatch && textMatch) {
                        let href = hrefMatch[1].trim();
                        if (!href.startsWith('http')) {
                            href = 'https://www.cimmyt.org' + (href.startsWith('/') ? href : '/' + href);
                        }

                        const tenderTitle = textMatch[1].trim();
                        addCandidateIfNew(
                            feed.name,
                            `CIMMYT Tender: ${tenderTitle}`,
                            href,
                            'Buyer: CIMMYT / CGIAR | Tenders and Requests for Proposals',
                            existingLinks,
                            existingTitleKeys,
                            bucket,
                            true, // Assume African relevance for institutional CGIAR tenders

                            webUrl,
                            feed.excludeLinkPatterns,
                            null,
                            feedStats
                        );
                    }
                });
            }
        }
    } catch (e) {
        Logger.log('[CIMMYT Scraper] Error scraping careers page: ' + e.message);
    }
}

function parseCimmytWorkableJobs(jobs, feed, existingLinks, existingTitleKeys, bucket, feedStats, apiUrl) {
    if (!Array.isArray(jobs)) return;
    jobs.forEach(job => {
        const title = job.title || '';
        const country = job.country || '';
        const city = job.city || '';
        const dept = job.department || '';
        const type = job.employment_type || '';
        const link = job.shortlink || job.url || '';
        const published = job.published_on || '';
        if (!title || !link) return;

        // Geography check: Focus strictly on African stations or explicit Pan-African programs
        const isAfrican = isAfricaRelated(`${country} ${city} ${title} ${dept}`);
        if (!isAfrican) {
            const hasAfricaContext = /africa|sub-saharan/i.test(`${title} ${dept}`);
            const isInternationalConsultancy = /consultan|advisory/i.test(title) && /internationally recruited|global/i.test(title);
            if (!hasAfricaContext && !isInternationalConsultancy) {
                if (feedStats) { feedStats.seen++; feedStats.notAfrican++; feedStats.filtered++; feedStats.preAiRejected++; }
                return;
            }
        }

        // Skip non-consulting routine manual labor, drivers, technicians, or local Spanish non-African postings
        if (/ayudante|asistente|reclutamiento local|plomero|jardinero|mantenimiento|seguridad|driver|auxiliar|chofer|cocina|limpieza|technician|supervisor/i.test(title)) {
            if (feedStats) { feedStats.seen++; feedStats.boilerplate++; feedStats.filtered++; feedStats.preAiRejected++; }
            return;
        }
        let cleanTitle = title.replace(/^Job announcement for\s+/i, 'CGIAR Expert Roster: ');
        const displayTitle = `CIMMYT: ${cleanTitle} (${country || 'Africa'})`;
        const description = [
            'Buyer: CIMMYT (International Maize and Wheat Improvement Center) / CGIAR',
            `Location: ${city ? city + ', ' : ''}${country}`,
            `Department: ${dept}`,
            `Employment Type: ${type}`,
            `Published Date: ${published}`,
            `Application URL: ${job.application_url || link}`
        ].filter(Boolean).join(' | ');
        addCandidateIfNew(
            feed.name,
            displayTitle,
            link,
            description,
            existingLinks,
            existingTitleKeys,
            bucket,
            isAfrican,
            apiUrl,
            feed.excludeLinkPatterns,
            null,
            feedStats
        );
    });
}

/**
 * PARSER 4i: UNJOBNET SCRAPER
 * Ingests consultancies, EOIs, and technical solicitations from UNJobNet
 * (https://www.unjobnet.org), covering UN agencies (FAO, IFAD, UNDP) and
 * CGIAR research centers (IITA, ILRI, ICRISAT, CIMMYT, CIAT).
 */

function fetchCimmytSerperFallback(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    if (!isWebSearchAvailable()) return;
    const cache = (typeof CacheService !== 'undefined' && CacheService.getScriptCache) ? CacheService.getScriptCache() : null;
    const cacheKey = 'FALLBACK_DATA_cimmyt_org';
    if (cache) {
        try {
            const cached = cache.get(cacheKey);
            if (cached) {
                const items = JSON.parse(cached);
                Logger.log(`[CIMMYT Opportunities] Using cached search fallback results (${items.length} items, 0 API credits used).`);
                items.forEach(item => {
                    addCandidateIfNew(feed.name, `CIMMYT: ${item.title}`, item.link, item.snippet || 'Buyer: CIMMYT', existingLinks, existingTitleKeys, bucket, true, null, null, null, feedStats);
                });
                return;
            }
        } catch (cErr) { }
    }

    Logger.log('[CIMMYT Opportunities] Workable API rate-limited (HTTP 429). Free fallback engaged: querying web search providers for active CIMMYT consultancies & tenders.');
    const query = 'site:cimmyt.org ("RFP" OR "Request for Proposals" OR "Consultancy" OR "Expression of Interest" OR "EOI" OR "Tender" OR "Procurement") ("seed" OR "maize" OR "wheat" OR "agronomy" OR "Africa" OR "Kenya" OR "Zimbabwe" OR "Ethiopia") -site:knowledgecenter.cimmyt.org -site:repository.cimmyt.org -inurl:koha -inurl:bib -inurl:bitstream -jobs -career -vacancy';
    const payload = { q: query, num: 10, gl: 'ke', hl: 'en' };
    const res = callSerperWithRotation(payload, 'CIMMYT Fallback');
    if (!res || res.getResponseCode() !== 200) return;
    try {
        const data = JSON.parse(res.getContentText());
        const items = data.organic || [];
        Logger.log(`[CIMMYT Opportunities] Serper fallback discovered ${items.length} candidate(s).`);
        if (cache) safeCachePut(cache, cacheKey, JSON.stringify(items), 21600); // 6h TTL
        items.forEach(item => {
            if (!item.title || !item.link) return;
            addCandidateIfNew(
                feed.name,
                `CIMMYT: ${item.title}`,
                item.link,
                item.snippet || 'Buyer: CIMMYT (International Maize and Wheat Improvement Center) / CGIAR',
                existingLinks,
                existingTitleKeys,
                bucket,
                true,
                null,
                null,
                null,
                feedStats
            );
        });
    } catch (e) {
        Logger.log('[CIMMYT Opportunities] Fallback error parsing Serper response: ' + e.message);
    }
}

function fetchUnjobnetNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const baseUrl = feed.baseUrl || 'https://www.unjobnet.org';
    const keywords = feed.searchKeywords || ['seed', 'crops', 'germplasm', 'agronomy'];
    let directSuccessful = false;
    for (let i = 0; i < keywords.length; i++) {
        const kw = keywords[i];
        const url = `${baseUrl}/jobs?keywords=${encodeURIComponent(kw)}`;
        const ok = processUnjobnetQuery(url, kw, feed, baseUrl, existingLinks, existingTitleKeys, bucket, feedStats);
        if (ok) {
            directSuccessful = true;
            Utilities.sleep(250);
        } else {
            Logger.log(`[UNJobNet Scraper] Direct query failed or host unreachable for "${kw}". Stopping direct attempts to preserve discovery budget.`);
            break;
        }
    }

    // Circuit breaker fallback: If direct portal queries fail or host is unreachable, engage Google News RSS syndication
    if (!directSuccessful) {
        queryUnjobnetRssFallback(feed, existingLinks, existingTitleKeys, bucket, feedStats);
    }
}

function queryUnjobnetRssFallback(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    Logger.log('[UNJobNet Scraper] Engaging high-speed Google News RSS syndication fallback.');
    const rssFeed = {
        name: feed.name,
        type: 'GOOGLE_NEWS_RSS_SOCIAL',
        queries: [
            'site:unjobnet.org ("seed" OR "crops" OR "agriculture" OR "agribusiness" OR "consultant") Africa when:30d',
            'site:unjobnet.org ("Request for Proposals" OR "Call for Proposals" OR "EOI" OR "Tender") Africa when:30d'
        ]
    };
    fetchGoogleNewsSocialNotices(rssFeed, existingLinks, existingTitleKeys, bucket, feedStats);
}

function processUnjobnetQuery(url, kw, feed, baseUrl, existingLinks, existingTitleKeys, bucket, feedStats) {
    let response;

    try {
        response = fetchWithRetry(url, FETCH_OPTIONS);
    } catch (e) {
        Logger.log(`[UNJobNet Scraper] Request failed for ${url}: ${e.message}`);

        return false;
    }

    const code = response.getResponseCode();
    if (code !== 200) {
        Logger.log(`[UNJobNet Scraper] Non-200 response (${code}) fetching ${url}`);

        return false;
    }

    const html = response.getContentText();
    const match = html.match(/jobs\s*:\s*(\[\s*\{[\s\S]*?\}\s*\]|\[\s*\])/);
    if (!match) {
        Logger.log(`[UNJobNet Scraper] No jobs JSON found in page for query: ${kw}`);

        return false;
    }

    let jobs;

    try {
        jobs = JSON.parse(match[1]);
    } catch (e) {
        Logger.log(`[UNJobNet Scraper] Failed to parse jobs JSON for ${kw}: ${e.message}`);

        return false;
    }

    if (!Array.isArray(jobs) || !jobs.length) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    jobs.forEach(job => {
        if (job.IsExpired || job.IsGone) {
            if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
            return;
        }
        if (job.DeadlineUtc) {
            const deadlineDate = new Date(job.DeadlineUtc);
            if (!isNaN(deadlineDate.getTime()) && deadlineDate.getTime() < today.getTime()) {
                if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
                return;
            }
        }

        const title = (job.Title || '').trim();
        if (!title) return;

        // Filter out salaried employee positions (UN/CGIAR internal staff recruitments)
        const isConsultancyOrTender = /\b(Consultant|Consultancy|Contractor|Expert|Specialist Adviser|Firm|RFP|EOI|Tender|Call for)\b/i.test(title) ||
            /\b(Consultancy|Individual Contractor|Service Contract|Tender)\b/i.test(job.AppType || '');
        const isSalariedStaff = /\b(Officer|Director|Scientist|Supervisor|Specialist-Scientist|Clerk|Receptionist|Assistant|Accountant|Driver|Intern)\b/i.test(title);
        if (isSalariedStaff && !isConsultancyOrTender) {
            if (feedStats) { feedStats.seen++; feedStats.boilerplate++; feedStats.filtered++; feedStats.preAiRejected++; }
            return;
        }

        const org = job.LongName || job.ShortName || 'UN / International Development Body';
        const location = job.CitiesCountries || (job.IsRemote ? 'Remote' : '');
        const link = job.Url ? (job.Url.startsWith('http') ? job.Url : `${baseUrl}${job.Url}`) : '';
        const deadline = job.DeadlineDate || (job.DeadlineUtc ? job.DeadlineUtc.split('T')[0] : '');
        const description = [
            `Organization: ${org}`,
            location ? `Location: ${location}` : '',
            job.AppType ? `Contract Type: ${job.AppType}` : '',
            deadline ? `Deadline: ${deadline}` : '',
            job.DatePosted ? `Published: ${job.DatePosted.split(' ')[0]}` : ''
        ].filter(Boolean).join(' | ');
        addCandidateIfNew(
            feed.name,
            title,
            link,
            description || title,
            existingLinks,
            existingTitleKeys,
            bucket,
            false, // let isAfricanContext evaluate location & text

            null,
            null,
            null,
            feedStats
        );
    });
    return true;
}

/**
 * PARSER 4j: FUNDSFORNGOS API
 * Ingests calls for proposals, grants, and RFPs from FundsforNGOs'
 * public WordPress REST API (https://www2.fundsforngos.org).
 */

function fetchFundsForNgosNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const baseUrl = feed.url || 'https://www2.fundsforngos.org/wp-json/wp/v2/posts';

    // 1. Primary fast query: Agriculture Food & Nutrition category (ID: 202832) with lean field projection

    // Executes in ~1.5s (8KB payload vs 750KB full content), avoiding WordPress MySQL search table locks

    const categoryUrl = `${baseUrl}?categories=202832&per_page=35&_fields=id,date,title,link,excerpt`;
    processFundsForNgosQuery(categoryUrl, 'Agriculture Category', feed, existingLinks, existingTitleKeys, bucket, feedStats);

    // 2. Focused targeted seed search with lean field projection

    const seedUrl = `${baseUrl}?search=seed&per_page=15&_fields=id,date,title,link,excerpt`;
    processFundsForNgosQuery(seedUrl, 'seed', feed, existingLinks, existingTitleKeys, bucket, feedStats);
}

/**
 * PARSER 4k: GLOBAL SOUTH OPPORTUNITIES (RSS)
 * Ingests live funding, grants, and calls for proposals from Global South Opportunities
 * (https://www.globalsouthopportunities.com/category/funding/).
 */

function fetchGlobalSouthOpportunitiesNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const feedUrl = feed.url || 'https://www.globalsouthopportunities.com/category/funding/feed/';
    let response;

    try {
        response = fetchWithRetry(feedUrl, FETCH_OPTIONS);
    } catch (e) {
        Logger.log(`[Global South Opp] Request failed for ${feedUrl}: ${e.message}`);

        return;
    }

    const code = response.getResponseCode();
    if (code !== 200) {
        Logger.log(`[Global South Opp] Non-200 response (${code}) fetching ${feedUrl}`);

        return;
    }

    const xml = response.getContentText();
    const itemRegex = /<item\b[^>]*>([\s\S]*?)<\/item>/gi;
    let itemMatch;
    while ((itemMatch = itemRegex.exec(xml)) !== null) {
        const itemXml = itemMatch[1];
        const titleMatch = itemXml.match(/<title\b[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
        const linkMatch = itemXml.match(/<link\b[^>]*>([\s\S]*?)<\/link>/i);
        const dateMatch = itemXml.match(/<pubDate\b[^>]*>([\s\S]*?)<\/pubDate>/i);
        const descMatch = itemXml.match(/<description\b[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
        const title = titleMatch ? decodeHtmlEntities(titleMatch[1].trim()) : '';
        let link = linkMatch ? linkMatch[1].trim() : '';
        if (!title || !link) continue;
        const pubDateStr = dateMatch ? dateMatch[1].trim() : '';
        if (pubDateStr) {
            const pDate = parseDateFlexible(pubDateStr);
            if (pDate && !isNaN(pDate.getTime()) && pDate.getFullYear() < getCurrentYear()) {
                if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
                continue;
            }
        }
        const rawSnippet = descMatch ? decodeHtmlEntities(descMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()) : '';
        const description = [
            title,
            rawSnippet,
            pubDateStr ? `Published: ${pubDateStr}` : '',
            'Source: Global South Opportunities'
        ].filter(Boolean).join(' | ');
        addCandidateIfNew(
            feed.name,
            title,
            link,
            description,
            existingLinks,
            existingTitleKeys,
            bucket,
            Boolean(feed.assumeAfrican),
            null,
            null,
            null,
            feedStats
        );
    }
}

/**
 * PARSER 4k-2: ZERO-COST GOOGLE NEWS SOCIAL MEDIA HARVESTER (LINKEDIN, FACEBOOK, X/TWITTER)
 * Ingests live African agricultural solicitations, RFPs, calls for proposals, and tenders
 * syndicated publicly from LinkedIn, Facebook, and Twitter/X via Google News RSS search.
 * 100% Free: Uses UrlFetchApp on open Google News XML feeds with 0 Serper credit consumption.
 */
function fetchGoogleNewsSocialNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const queries = feed.queries || [
        'site:linkedin.com/posts ("Request for Proposals" OR "Call for Proposals" OR "Expression of Interest" OR RFP OR EOI) ("seed" OR "agriculture" OR "agribusiness") Africa',
        'site:facebook.com ("Request for Proposals" OR "Call for Proposals" OR "tender") ("seed" OR "agriculture" OR "agribusiness") Africa',
        '(site:x.com OR site:twitter.com) ("Request for Proposals" OR "Call for Proposals" OR "tender") ("seed" OR "agriculture" OR "agribusiness") Africa'
    ];

    let itemsCollected = 0;
    queries.forEach(q => {
        const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;
        let response;
        try {
            response = fetchWithRetry(url, FETCH_OPTIONS);
        } catch (e) {
            Logger.log(`[Google News Social] Request failed for query "${q}": ${e.message}`);
            return;
        }

        const code = response.getResponseCode();
        if (code !== 200) {
            Logger.log(`[Google News Social] Non-200 response (${code}) for query "${q}"`);
            return;
        }

        const xml = response.getContentText();
        const itemRegex = /<item\b[^>]*>([\s\S]*?)<\/item>/gi;
        let itemMatch;
        let count = 0;
        while ((itemMatch = itemRegex.exec(xml)) !== null && count < 25) {
            const itemXml = itemMatch[1];
            const titleMatch = itemXml.match(/<title\b[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
            const linkMatch = itemXml.match(/<link\b[^>]*>([\s\S]*?)<\/link>/i);
            const dateMatch = itemXml.match(/<pubDate\b[^>]*>([\s\S]*?)<\/pubDate>/i);
            const sourceMatch = itemXml.match(/<source\b[^>]*>([\s\S]*?)<\/source>/i);
            const descMatch = itemXml.match(/<description\b[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);

            const rawTitle = titleMatch ? titleMatch[1].trim() : '';
            const link = linkMatch ? linkMatch[1].trim() : '';
            if (!rawTitle || !link) continue;

            const title = decodeHtmlEntities(rawTitle.replace(/\s+-\s+(?:LinkedIn|Facebook|X|Twitter|DevelopmentAid|UNjobnet|African Development Bank Group|IFAD)$/i, ''));
            const pubDateStr = dateMatch ? dateMatch[1].trim() : '';
            if (pubDateStr && !isOnOrAfterFreshnessFloor(pubDateStr)) {
                if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
                continue;
            }
            const sourceName = sourceMatch ? sourceMatch[1].trim() : 'Social Media';
            const rawSnippet = descMatch ? decodeHtmlEntities(descMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()) : '';

            const description = [
                title,
                rawSnippet,
                pubDateStr ? `Published: ${pubDateStr}` : '',
                `Platform: ${sourceName} via Google News RSS Syndication`
            ].filter(Boolean).join(' | ');

            addCandidateIfNew(
                feed.name,
                title,
                link,
                description,
                existingLinks,
                existingTitleKeys,
                bucket,
                true,
                null,
                null,
                null,
                feedStats
            );
            count++;
            itemsCollected++;
        }
        Utilities.sleep(200);
    });
    Logger.log(`[${feed.name}] Collected ${itemsCollected} candidate(s) across social platforms (0 Serper credits used).`);
}

/**
 * PARSER 4l: TENDERSURE AFRICA API
 * Ingests live East African corporate and NGO tenders, prequalifications, and RFPs
 * from TenderSure's public API (https://website-api.tendersure.africa/api/v1/core/open-bids/).
 */

function fetchTenderSureNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const apiUrl = feed.url || 'https://website-api.tendersure.africa/api/v1/core/open-bids/?page=1&page_size=25';
    let response;

    // Django REST Framework requires Accept: application/json to return pure JSON instead of browsable HTML

    const apiFetchOptions = {
        muteHttpExceptions: true,
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    };

    try {
        response = fetchWithRetry(apiUrl, apiFetchOptions);
    } catch (e) {
        Logger.log(`[TenderSure API] Request failed for ${apiUrl}: ${e.message}`);

        return;
    }

    const code = response.getResponseCode();
    if (code !== 200) {
        Logger.log(`[TenderSure API] Non-200 response (${code}) fetching ${apiUrl}`);

        return;
    }

    let data;

    try {
        data = JSON.parse(response.getContentText());
    } catch (e) {
        Logger.log(`[TenderSure API] Failed to parse JSON response: ${e.message}`);

        return;
    }

    const items = (data && data.results) ? data.results : [];
    if (!items.length) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    items.forEach(bid => {
        const title = decodeHtmlEntities(bid.title || '');
        if (!title) return;
        const slug = bid.slug || '';
        const link = slug ? `https://www.tendersure.africa/open-bids/${slug}/` : 'https://www.tendersure.africa/open-bids';
        const buyer = (bid.company && bid.company.company_name) ? bid.company.company_name : '';
        const country = (bid.country && bid.country.name) ? bid.country.name : 'Africa';
        const ref = bid.unique_reference || '';
        const rawDeadline = bid.closing_date || '';

        // Filter out already-closed bids
        if (rawDeadline && rawDeadline !== 'N/A') {
            const parsedDeadline = parseDateFlexible(rawDeadline);
            if (parsedDeadline && !isNaN(parsedDeadline.getTime()) && parsedDeadline.getTime() < today.getTime()) {
                if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
                return;
            }
        }

        const description = [
            buyer ? `Buyer: ${buyer}` : '',
            ref ? `Ref: ${ref}` : '',
            country ? `Country: ${country}` : '',
            rawDeadline ? `Deadline: ${rawDeadline}` : '',
            bid.advert ? `Advert: ${bid.advert}` : '',
            'Portal: TenderSure Africa'
        ].filter(Boolean).join(' | ');
        addCandidateIfNew(
            feed.name,
            title,
            link,
            description || title,
            existingLinks,
            existingTitleKeys,
            bucket,
            true, // TenderSure is 100% East African

            null,
            null,
            null,
            feedStats
        );
    });
}

function processFundsForNgosQuery(url, kw, feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    let response;

    try {
        response = fetchWithRetry(url, FETCH_OPTIONS);
    } catch (e) {
        Logger.log(`[FundsforNGOs API] Request failed for ${url}: ${e.message}`);

        return;
    }

    const code = response.getResponseCode();
    if (code !== 200) {
        Logger.log(`[FundsforNGOs API] Non-200 response (${code}) fetching ${url}`);

        return;
    }

    let items;

    try {
        items = JSON.parse(response.getContentText());
    } catch (e) {
        Logger.log(`[FundsforNGOs API] Failed to parse JSON for ${kw}: ${e.message}`);

        return;
    }

    if (!Array.isArray(items) || !items.length) return;
    items.forEach(item => {
        const rawTitle = (item.title && item.title.rendered) ? item.title.rendered : '';
        const cleanTitle = rawTitle

            .replace(/&#8211;/g, '–')

            .replace(/&#8217;/g, "'")

            .replace(/&#038;/g, '&')

            .replace(/<[^>]+>/g, '')

            .trim();
        if (!cleanTitle) return;
        const link = item.link || '';
        const excerpt = (item.excerpt && item.excerpt.rendered)

            ? item.excerpt.rendered.replace(/<[^>]+>/g, '').trim()

            : '';
        const dateStr = item.date ? item.date.split('T')[0] : '';
        if (dateStr) {
            const pDate = parseDateFlexible(dateStr);
            if (pDate && !isNaN(pDate.getTime()) && pDate.getFullYear() < getCurrentYear()) {
                if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
                return;
            }
        }
        const description = [
            'Source: FundsforNGOs Funding Intelligence',
            dateStr ? `Published: ${dateStr}` : '',
            excerpt
        ].filter(Boolean).join(' | ');
        addCandidateIfNew(
            feed.name,
            cleanTitle,
            link,
            description || cleanTitle,
            existingLinks,
            existingTitleKeys,
            bucket,
            false, // Let isAfricanContext accept only African notices

            null,
            null,
            null,
            feedStats
        );
    });
}

/**
 * PARSER 5: RENDERED BLOCK SCRAPER
 */

/**
 * Zero-Cost Free Fallback for Cloudflare-Protected Portals (AfDB, IFAD)
 * When paid render proxies (ScraperAPI/Crawlbase) are exhausted or return 520/403,
 * this queries Google Serper directly for recent notices indexed from that portal.
 * 100% FREE, instant, and immune to Cloudflare bot-blocks.
 */

function queryPortalSerperFallback(siteDomain, queryTerms, feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    if (!isWebSearchAvailable()) {
        Logger.log(`[${feed.name}] Web search fallback skipped: No active search provider API keys available. Engaging Google News RSS fallback.`);
        queryPortalRssFallback(siteDomain, queryTerms, feed, existingLinks, existingTitleKeys, bucket, feedStats);
        return;
    }

    const safeDomain = siteDomain.replace(/[^A-Za-z0-9_]/g, '_');
    const cacheKey = 'FALLBACK_DATA_' + safeDomain;
    const cache = (typeof CacheService !== 'undefined' && CacheService.getScriptCache) ? CacheService.getScriptCache() : null;

    if (cache) {
        try {
            const cachedJson = cache.get(cacheKey);
            if (cachedJson) {
                const cachedItems = JSON.parse(cachedJson);
                Logger.log(`[${feed.name}] Using cached portal search results for ${siteDomain} (${cachedItems.length} candidate(s), 0 Serper credits used).`);
                cachedItems.forEach(item => {
                    addCandidateIfNew(
                        feed.name,
                        item.title || '',
                        item.link || '',
                        item.snippet || item.title || '',
                        existingLinks,
                        existingTitleKeys,
                        bucket,
                        feed.assumeAfrican === true,
                        null,
                        null,
                        null,
                        feedStats
                    );
                });
                return;
            }
        } catch (cErr) {
            Logger.log(`[${feed.name}] Cache read error: ${cErr.message}`);
        }
    }

    const termsStr = Array.isArray(queryTerms) ? queryTerms.join(' OR ') : queryTerms;
    const geoFilter = (siteDomain === 'ifad.org' || siteDomain.includes('ifad.org')) ? ' (Africa OR Kenya OR Tanzania OR Uganda OR Ghana OR Nigeria OR Rwanda OR Ethiopia OR "Sub-Saharan")' : '';
    const serperQuery = `site:${siteDomain} (${termsStr})${geoFilter} -jobs -career -vacancy`;
    Logger.log(`[${feed.name}] Free fallback engaged: querying Google Serper for "${serperQuery}"`);

    try {
        const response = callSerperWithRotation({ q: serperQuery, num: 10 }, `${feed.name} fallback`);
        if (response && response.getResponseCode() === 200) {
            const data = JSON.parse(response.getContentText());
            const items = data.organic || [];
            Logger.log(`[${feed.name}] Serper fallback discovered ${items.length} candidate(s).`);

            // Cache fallback results for 6 hours (21,600s max GAS CacheService TTL)
            if (cache) {
                safeCachePut(cache, cacheKey, JSON.stringify(items), 21600);
            }

            items.forEach(item => {
                addCandidateIfNew(
                    feed.name,
                    item.title || '',
                    item.link || '',
                    item.snippet || item.title || '',
                    existingLinks,
                    existingTitleKeys,
                    bucket,
                    feed.assumeAfrican === true,
                    null,
                    null,
                    null,
                    feedStats
                );
            });
        } else {
            const errSnippet = (response && response.getContentText) ? response.getContentText().substring(0, 150) : "";
            Logger.log(`[${feed.name}] Serper fallback returned HTTP ${(response && response.getResponseCode) ? response.getResponseCode() : 'unknown'}${errSnippet ? ": " + errSnippet : ""}. Engaging Google News RSS fallback.`);
            queryPortalRssFallback(siteDomain, queryTerms, feed, existingLinks, existingTitleKeys, bucket, feedStats);
        }
    } catch (e) {
        Logger.log(`[${feed.name}] Serper fallback error: ${e.message}. Engaging Google News RSS fallback.`);
        queryPortalRssFallback(siteDomain, queryTerms, feed, existingLinks, existingTitleKeys, bucket, feedStats);
    }
}

function queryPortalRssFallback(siteDomain, queryTerms, feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const termsList = Array.isArray(queryTerms) ? queryTerms.slice(0, 4) : [queryTerms];
    const termsStr = termsList.map(t => (t.includes(' ') && !t.startsWith('"')) ? `"${t}"` : t).join(' OR ');
    const rssQuery = `site:${siteDomain} (${termsStr}) Africa when:60d`;
    Logger.log(`[${feed.name}] Free Google News RSS fallback engaged for ${siteDomain}: "${rssQuery}"`);
    const rssFeed = {
        name: feed.name,
        type: 'GOOGLE_NEWS_RSS_SOCIAL',
        queries: [rssQuery]
    };
    fetchGoogleNewsSocialNotices(rssFeed, existingLinks, existingTitleKeys, bucket, feedStats);
}

/**
 * PARSER: UNGM DIRECT NATIVE API SCRAPER
 * Connects directly to the United Nations Global Marketplace (https://www.ungm.org)
 * using their public POST search endpoint with session CSRF token verification.
 * 100% FREE, requiring ZERO paid rendering proxies or ScraperAPI credits.
 */

function fetchUngmNoticesDirect(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const baseUrl = feed.baseUrl || 'https://www.ungm.org';
    const keywords = feed.searchKeywords || ['seed', 'agribusiness', 'agriculture', 'crops', 'farming'];
    let noticesFoundCount = 0;

    // 1. Initial GET to retrieve session cookie, verification token, and total label ID

    let token = '';
    let cookieHeader = '';
    let totalLabelId = 'noticeSearchTotal';

    try {
        const initRes = fetchWithRetry(`${baseUrl}/Public/Notice`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html'
            },
            muteHttpExceptions: true
        });
        if (initRes.getResponseCode() !== 200) {
            Logger.log(`[UNGM Direct] Initial GET returned HTTP ${initRes.getResponseCode()}`);
        } else {
            const html = initRes.getContentText();
            const tokenMatch = html.match(/name=["']__RequestVerificationToken["']\s+type=["']hidden["']\s+value=["']([^"']+)["']/i);
            token = tokenMatch ? tokenMatch[1] : '';
            const totalMatch = html.match(/id=["']([^"']*NoticeSearchTotal[^"']*)["']/i);
            if (totalMatch) totalLabelId = totalMatch[1];
            const allH = (initRes && typeof initRes.getAllHeaders === 'function') ? initRes.getAllHeaders() : {};
            const singleH = (initRes && typeof initRes.getHeaders === 'function') ? initRes.getHeaders() : {};
            const rawCookies = allH['Set-Cookie'] || allH['set-cookie'] || singleH['Set-Cookie'] || singleH['set-cookie'];
            if (Array.isArray(rawCookies)) {
                cookieHeader = rawCookies.map(c => c.split(';')[0]).join('; ');
            } else if (typeof rawCookies === 'string') {
                cookieHeader = rawCookies.split(';')[0];
            }
        }
    } catch (e) {
        Logger.log(`[UNGM Direct] Failed to initialize session: ${e.message}`);
    }

    // If token extraction succeeded, run direct search

    if (token) {
        keywords.forEach(kw => {
            try {
                const payload = JSON.stringify({
                    PageIndex: 0,
                    PageSize: 15,
                    Title: kw,
                    Description: '',
                    Reference: '',
                    PublishedFrom: '',
                    PublishedTo: '',
                    DeadlineFrom: '',
                    DeadlineTo: '',
                    Countries: [],
                    Agencies: [],
                    UNSPSCs: [],
                    NoticeTypes: [],
                    SortField: 'Deadline',
                    SortAscending: false,
                    isPicker: false,
                    IsSustainable: null,
                    IsActive: true,
                    NoticeDisplayType: null,
                    NoticeSearchTotalLabelId: totalLabelId,
                    TypeOfCompetitions: []
                });
                const searchRes = fetchWithRetry(`${baseUrl}/Public/Notice/Search`, {
                    method: 'POST',
                    contentType: 'application/json',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Accept': 'text/html, */*; q=0.01',
                        'Cookie': cookieHeader,
                        'X-Requested-With': 'XMLHttpRequest',
                        '__RequestVerificationToken': token,
                        'RequestVerificationToken': token,
                        'Content-Type': 'application/json',
                        'Referer': `${baseUrl}/Public/Notice`,
                        'Origin': baseUrl
                    },
                    payload: payload,
                    muteHttpExceptions: true
                });
                if (searchRes.getResponseCode() !== 200) {
                    Logger.log(`[UNGM Direct] Search failed for "${kw}": HTTP ${searchRes.getResponseCode()}`);

                    return;
                }

                const body = searchRes.getContentText();
                const rowBlocks = body.split(/<div role="row"[^>]*data-noticeid="(\d+)"/i);
                for (let i = 1; i < rowBlocks.length; i += 2) {
                    const noticeId = rowBlocks[i];
                    const rowHtml = rowBlocks[i + 1] || '';
                    const titleMatch = rowHtml.match(/class="[^"]*resultTitle[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
                    const title = titleMatch ? decodeHtmlEntities(titleMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()) : '';
                    if (!title || title.length < 5) continue;
                    const deadlineMatch = rowHtml.match(/class="[^"]*deadline[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
                    const deadline = deadlineMatch ? deadlineMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split('\n')[0].trim() : '';
                    const agencyMatch = rowHtml.match(/class="[^"]*resultAgency[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
                    const agency = agencyMatch ? agencyMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'UN Agency';
                    const refMatch = rowHtml.match(/data-description="Reference"[^>]*>([\s\S]*?)<\/div>/i);
                    const ref = refMatch ? refMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';

                    // Extract Country cell immediately following Reference cell

                    let country = '';
                    const refIdx = rowHtml.indexOf('data-description="Reference"');
                    if (refIdx !== -1) {
                        const afterRef = rowHtml.slice(refIdx);
                        const countryMatch = afterRef.match(/<\/div>\s*<div role="cell" class="tableCell"[^>]*>\s*<span>([\s\S]*?)<\/span>/i);
                        if (countryMatch) country = countryMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
                    }

                    const link = `${baseUrl}/Public/Notice/${noticeId}`;
                    const desc = [
                        `Agency: ${agency}`,
                        country ? `Country: ${country}` : '',
                        ref ? `Ref: ${ref}` : '',
                        deadline ? `Deadline: ${deadline}` : '',
                        `UNGM Notice ID: ${noticeId}`
                    ].filter(Boolean).join(' | ');

                    // Evaluate African geography: check country cell and title

                    const isAfricaNotice = isAfricaRelated(country) || isAfricaRelated(title);
                    addCandidateIfNew(
                        feed.name,
                        title,
                        link,
                        desc,
                        existingLinks,
                        existingTitleKeys,
                        bucket,
                        isAfricaNotice,
                        feed.url,
                        feed.excludeLinkPatterns,
                        null,
                        feedStats
                    );

                    noticesFoundCount++;
                }
            } catch (e) {
                Logger.log(`[UNGM Direct] Error querying "${kw}": ${e.message}`);
            }

            Utilities.sleep(250);
        });
    }

    // 3. Fallback: if direct API found 0 notices or session token failed, engage Serper

    if (noticesFoundCount === 0) {
        Logger.log('[UNGM Direct] Zero notices captured via direct API; engaging Google Serper portal fallback for UNGM.');
        queryPortalSerperFallback('ungm.org/Public/Notice', ['seed', 'agriculture', 'crops', 'farming', 'agribusiness'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
    }
}

function scrapeRenderedPortalBlockLevel(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const maxPages = (feed.pagination && feed.pagination.maxPages) ? feed.pagination.maxPages : 1;
    const paramName = (feed.pagination && feed.pagination.paramName) || 'page';
    for (let page = 1; page <= maxPages; page++) {
        const pageUrl = buildPaginatedUrl(feed.url, paramName, page);
        const renderedHtml = fetchRenderedHtml(pageUrl);
        if (!renderedHtml) {
            if (feed.url && feed.url.includes('afdb.org')) {
                queryPortalSerperFallback('afdb.org', ['Expression of Interest', 'EOI', 'Consultancy Services', 'Consultant', 'Procurement Notice', 'Request for Proposals', 'Tender'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
            }

            if (page > 1) break;

            return;
        }

        if (detectBotBlockSignature(renderedHtml)) {
            Logger.log(`[${feed.name}] Bot-block detected on page ${page}. Engaging Serper fallback.`);
            if (feed.url && feed.url.includes('afdb.org')) {
                queryPortalSerperFallback('afdb.org', ['Expression of Interest', 'EOI', 'Consultancy Services', 'Consultant', 'Procurement Notice', 'Request for Proposals', 'Tender'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
            }
            if (page > 1) break;
            return;
        }

        const scoredCandidates = extractScoredBlockCandidates(renderedHtml, feed.baseUrl);
        scoredCandidates.sort((a, b) => b.score - a.score);
        scoredCandidates.forEach(c => {
            // BUG FIX: Removed verifyLinkReachable here because raw fetches fail against

            // protected domains like AfDB, causing genuine rendered RFPs to be discarded.

            addCandidateIfNew(feed.name, c.title, c.link, c.description, existingLinks, existingTitleKeys, bucket, feed.assumeAfrican === true, feed.url, feed.excludeLinkPatterns, c.score, feedStats);
        });
        if (page < maxPages) Utilities.sleep(300);
    }
}

/**
 * PARSER 4m: AFRICA-EUROPE INNOVATION PLATFORM (AEIP) SCRAPER
 * Specifically handles card-link wrapped elements with fo-title, fo-organisation, and fo-deadline
 */

function fetchAfricaEuropeInnovationNotices(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const maxPages = (feed.pagination && feed.pagination.maxPages) ? feed.pagination.maxPages : 3;
    const paramName = (feed.pagination && feed.pagination.paramName) || 'pg';
    for (let page = 1; page <= maxPages; page++) {
        const pageUrl = buildPaginatedUrl(feed.url, paramName, page);
        let response;

        try {
            response = fetchWithRetry(pageUrl, FETCH_OPTIONS);
        } catch (e) {
            Logger.log(`[AEIP Scraper] Request failed for ${pageUrl}: ${e.message}`);
            break;
        }

        if (response.getResponseCode() !== 200) {
            if (page > 1) break;
            Logger.log(`[AEIP Scraper] Non-200 response (${response.getResponseCode()}) fetching ${pageUrl}`);

            return;
        }

        const html = response.getContentText();
        const cardRegex = /<a\b[^>]*href=["']([^"']*\/funding-opportunity\/[^"']*)["'][^>]*class="[^"]*card-link[^"]*"[^>]*>([\s\S]*?)<\/a>/gi;
        let m;
        let pageCount = 0;
        while ((m = cardRegex.exec(html)) !== null) {
            pageCount++;
            const link = m[1].trim();
            const inner = m[2];
            const titleMatch = inner.match(/<h[1-6][^>]*class="[^"]*fo-title[^"]*"[^>]*>([\s\S]*?)<\/h[1-6]>/i) || inner.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
            const title = titleMatch ? decodeHtmlEntities(titleMatch[1].replace(/<[^>]+>/g, '').trim()) : '';
            if (!title || title.length < 10) continue;
            const orgMatch = inner.match(/class="[^"]*fo-organisation[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
            const org = orgMatch ? decodeHtmlEntities(orgMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()) : '';
            const deadlineMatch = inner.match(/class="[^"]*fo-deadline[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
            const deadline = deadlineMatch ? decodeHtmlEntities(deadlineMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()) : '';
            const description = [
                'Source: Africa-Europe Innovation Platform (AEIP)',
                org ? `Buyer: ${org}` : '',
                deadline ? (deadline.toLowerCase().startsWith('deadline') ? deadline : `Deadline: ${deadline}`) : '',
                'Topic: Food Systems & Agriculture'
            ].filter(Boolean).join(' | ');
            addCandidateIfNew(
                feed.name,
                title,
                link,
                description,
                existingLinks,
                existingTitleKeys,
                bucket,
                true, // assumeAfrican = true

                feed.url,
                feed.excludeLinkPatterns,
                null,
                feedStats
            );
        }

        if (pageCount === 0) break;
        if (page < maxPages) Utilities.sleep(300);
    }
}

/**
 * PARSER 4l: LOCATEFUND AFRICAN FUNDING OPPORTUNITIES
 * Ingests live grants, challenges, equity-free funding, and accelerator opportunities
 * across African nations from LocateFund (https://locatefund.com/opportunities/).
 * Employs direct HTML card parsing, Supabase/Next.js data extraction, and Google Serper fallback.
 */

function fetchLocateFundOpportunities(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const baseUrl = feed.baseUrl || 'https://locatefund.com';
    const targetUrl = feed.url || `${baseUrl}/opportunities/`;
    let candidatesFound = 0;

    // 1. Direct Web Fetch

    let response;

    try {
        response = fetchWithRetry(targetUrl, FETCH_OPTIONS);
    } catch (e) {
        Logger.log(`[${feed.name}] Fetch failed for ${targetUrl}: ${e.message}`);
    }

    const code = response ? response.getResponseCode() : 0;
    const body = response ? response.getContentText() : '';

    // 2. Parse HTML if accessible (and not behind Cloudflare challenge)

    if (code === 200 && body && !body.includes('Just a moment...')) {
        // A. Check for Next.js __NEXT_DATA__ JSON payload

        const nextDataMatch = body.match(/<script\s+id="__NEXT_DATA__"\s+type="application\/json">([\s\S]*?)<\/script>/i);
        if (nextDataMatch) {
            try {
                const nextJson = JSON.parse(nextDataMatch[1]);
                const opps = (nextJson.props && nextJson.props.pageProps && (nextJson.props.pageProps.opportunities || nextJson.props.pageProps.items)) || [];
                if (Array.isArray(opps) && opps.length > 0) {
                    opps.forEach(opp => {
                        const title = opp.title || opp.name || '';
                        if (!title) return;
                        const slug = opp.slug || '';
                        const link = slug ? `${baseUrl}/opportunities/${slug}` : (opp.url || opp.link || targetUrl);
                        const provider = opp.provider || opp.funder || opp.organization || 'LocateFund Directory';
                        const amount = opp.amount ? `Amount: ${opp.amount}` : '';
                        const deadline = opp.deadline ? `Deadline: ${opp.deadline}` : '';
                        const summary = opp.summary || opp.description || '';
                        const description = [
                            `Funder: ${provider}`,
                            amount,
                            deadline,
                            summary
                        ].filter(Boolean).join(' | ');
                        addCandidateIfNew(feed.name, title, link, description, existingLinks, existingTitleKeys, bucket, true, targetUrl, null, null, feedStats);

                        candidatesFound++;
                    });
                }
            } catch (e) {
                Logger.log(`[${feed.name}] Failed to parse __NEXT_DATA__: ${e.message}`);
            }
        }

        // B. Direct Regex HTML Card Extractor

        if (candidatesFound === 0) {
            const cardRegex = /<a\s+[^>]*href=["'](\/opportunities\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
            let m;
            while ((m = cardRegex.exec(body)) !== null) {
                const relLink = m[1];
                const inner = m[2];
                const link = `${baseUrl}${relLink}`;
                const titleMatch = inner.match(/<h[2-5][^>]*>([\s\S]*?)<\/h[2-5]>/i) || inner.match(/class="[^"]*title[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
                const title = titleMatch ? decodeHtmlEntities(titleMatch[1].replace(/<[^>]+>/g, '').trim()) : '';
                if (!title || title.length < 10) continue;
                const description = [
                    `Opportunity: ${title}`,
                    'Source: LocateFund African Funding Opportunities'
                ].join(' | ');
                addCandidateIfNew(feed.name, title, link, description, existingLinks, existingTitleKeys, bucket, true, targetUrl, null, null, feedStats);

                candidatesFound++;
            }
        }
    }

    // 2B. Direct Sitemap XML Ingestion (100% Free, Bypasses Cloudflare on HTML directory)
    if (candidatesFound === 0) {
        try {
            const sitemapUrl = feed.sitemapUrl || `${baseUrl}/sitemap.xml`;
            const sitemapRes = fetchWithRetry(sitemapUrl, FETCH_OPTIONS);
            if (sitemapRes && sitemapRes.getResponseCode() === 200) {
                const sitemapXml = sitemapRes.getContentText();
                const urlMatches = sitemapXml.match(/<loc>(https?:\/\/[^<]*\/opportunities\/[^<]+)<\/loc>/gi) || [];
                const agKeywords = /(?:seed|agri|farm|crop|food|bio|grant|fund|fellowship|innovation|enterprise|empowerment|rural|women|youth|sme|cooperative)/i;
                const nonAgriVentureKeywords = /(?:pre[-_]?seed|angel[-_]?fund|venture[-_]?capital|crypto|web3|blockchain|fintech|saas)/i;

                urlMatches.forEach(tag => {
                    const urlMatch = tag.match(/<loc>([^<]+)<\/loc>/i);
                    if (!urlMatch) return;
                    const oppUrl = urlMatch[1].trim();
                    const slug = oppUrl.replace(/^https?:\/\/[^\/]+\/opportunities\//i, '').replace(/\/$/, '');
                    if (!slug) return;

                    // Filter out generic tech startup accelerators / venture capital lacking agricultural focus
                    if (nonAgriVentureKeywords.test(slug) && !/(?:agri|farm|crop|food|horticultur|rural|livestock)/i.test(slug)) return;

                    // Filter slugs for agricultural / funding relevance
                    if (!agKeywords.test(slug)) return;

                    // Format slug into clean, human-readable opportunity title
                    const cleanTitle = slug
                        .split('-')
                        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ');

                    const description = `Opportunity: ${cleanTitle} | Source: LocateFund African Funding Opportunities | URL: ${oppUrl}`;
                    addCandidateIfNew(feed.name, cleanTitle, oppUrl, description, existingLinks, existingTitleKeys, bucket, true, targetUrl, null, null, feedStats);
                    candidatesFound++;
                });

                if (candidatesFound > 0) {
                    Logger.log(`[${feed.name}] Ingested ${candidatesFound} opportunity candidate(s) directly from sitemap.xml (0 Serper credits used).`);
                }
            }
        } catch (sErr) {
            Logger.log(`[${feed.name}] Sitemap parse error: ${sErr.message}`);
        }
    }

    // 3. Fallback: Google Serper Portal Search
    // ONLY engaged if BOTH HTML and sitemap.xml failed to yield any candidates
    if (candidatesFound === 0) {
        Logger.log(`[${feed.name}] Direct portal and sitemap returned 0 items. Engaging Google Serper fallback.`);
        const keywords = feed.searchKeywords || ['agriculture', 'seed', 'agribusiness', 'grant', 'funding'];
        queryPortalSerperFallback('locatefund.com', keywords, feed, existingLinks, existingTitleKeys, bucket, feedStats);
    }
}

/**
 * Computes calendar deadline date (YYYY-MM-DD) and formatted string from SAIGE relative countdowns
 * (e.g. "17 days left", "2 days left", "Closes today", "11 weeks left", "Rolling").
 */
function computeSaigeDeadline(countdownText, baseDate) {
    if (!countdownText) return { deadlineStr: null, formattedDate: null };
    const raw = countdownText.trim().toLowerCase();
    const now = baseDate || new Date();

    if (raw === 'closes today' || raw === 'closing today') {
        const d = new Date(now.getTime());
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;
        return { deadlineStr: `Deadline: ${dateStr} (Closes today)`, formattedDate: dateStr };
    }

    if (raw === 'rolling') {
        return { deadlineStr: 'Deadline: Rolling (Open-ended)', formattedDate: 'Rolling' };
    }

    const dayMatch = raw.match(/^(\d+)\s+days?\s+left$/);
    if (dayMatch) {
        const days = parseInt(dayMatch[1], 10);
        const target = new Date(now.getTime() + days * 86400000);
        const yyyy = target.getFullYear();
        const mm = String(target.getMonth() + 1).padStart(2, '0');
        const dd = String(target.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;
        return { deadlineStr: `Deadline: ${dateStr} (${days} days left)`, formattedDate: dateStr };
    }

    const weekMatch = raw.match(/^(\d+)\s+weeks?\s+left$/);
    if (weekMatch) {
        const weeks = parseInt(weekMatch[1], 10);
        const target = new Date(now.getTime() + weeks * 7 * 86400000);
        const yyyy = target.getFullYear();
        const mm = String(target.getMonth() + 1).padStart(2, '0');
        const dd = String(target.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;
        return { deadlineStr: `Deadline: ${dateStr} (~${weeks} weeks left)`, formattedDate: dateStr };
    }

    const monthMatch = raw.match(/^(\d+)\s+months?\s+left$/);
    if (monthMatch) {
        const months = parseInt(monthMatch[1], 10);
        const target = new Date(now.getTime() + months * 30 * 86400000);
        const yyyy = target.getFullYear();
        const mm = String(target.getMonth() + 1).padStart(2, '0');
        const dd = String(target.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;
        return { deadlineStr: `Deadline: ${dateStr} (~${months} months left)`, formattedDate: dateStr };
    }

    return { deadlineStr: `Deadline: ${countdownText}`, formattedDate: null };
}

/**
 * PARSER 4o: SAIGE AFRICA OPPORTUNITY PLATFORM SCRAPER
 * Ingests live agricultural funding, grants, tenders, RFQs, agribusiness accelerators,
 * and trade opportunities across Africa from SAIGE Opportunity (https://saigeopportunity.org).
 * Extracts individual opportunity cards, deadlines, values, funders, and slugs (/opportunities/[slug])
 * directly from Next.js RSC payload and HTML, ensuring deep, actionable links and concrete closing dates.
 */
function fetchSaigeOpportunities(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const baseUrl = feed.baseUrl || 'https://saigeopportunity.org';
    const targets = [
        `${baseUrl}/opportunities?family=funding`,
        `${baseUrl}/opportunities?family=funding&page=2`,
        `${baseUrl}/opportunities?family=funding&sort=fresh`,
        `${baseUrl}/opportunities?family=funding&sector=agri-inputs`,
        feed.marketUrl || `${baseUrl}/opportunities?family=market`,
        `${baseUrl}/opportunities?family=market&sort=fresh`,
        `${baseUrl}/opportunities?urg=fresh`,
        `${baseUrl}/opportunities?q=seed`,
        `${baseUrl}/opportunities?family=support`,
        feed.url || `${baseUrl}/opportunities`
    ];
    let candidatesFound = 0;
    const seenPaths = new Set();

    targets.forEach((targetUrl, idx) => {
        if (idx > 0) Utilities.sleep(150);
        let response;
        try {
            response = fetchWithRetry(targetUrl, FETCH_OPTIONS);
        } catch (e) {
            Logger.log(`[${feed.name}] Fetch error for ${targetUrl}: ${e.message}`);
            return;
        }

        const code = response ? response.getResponseCode() : 0;
        const body = response ? response.getContentText() : '';
        if (code !== 200 || !body || body.includes('Just a moment...')) return;

        // Unified Card Extraction: Extracts cards along with their accurate href
        // Handles both Next.js RSC JSON chunks and server-rendered HTML blocks without off-by-one bleeding
        const cards = [];
        // Pattern A: Next.js RSC JSON format
        const rscCardRe = /(?:\\"href\\"|"href")\s*:\s*(?:\\"|")(\/opportunities\/[a-z0-9_-]+)(?:\\"|")[\s\S]*?(?:\\"className\\"|"className")\s*:\s*(?:\\"|")opp-card(?:\\"|")([\s\S]*?)(?=(?:\\"href\\"|"href")\s*:\s*(?:\\"|")\/opportunities\/[a-z0-9_-]+(?:\\"|")[\s\S]*?(?:\\"className\\"|"className")\s*:\s*(?:\\"|")opp-card|$)/gi;
        let m;
        while ((m = rscCardRe.exec(body)) !== null) {
            cards.push({ path: m[1], b: m[2] });
        }

        // Pattern B: Server-rendered HTML fallback
        if (cards.length === 0) {
            const htmlCardRe = /<a[^>]+(?:class=["'][^"']*opp-card[^"']*["'][^>]*href=["'](\/opportunities\/[a-z0-9_-]+)["']|href=["'](\/opportunities\/[a-z0-9_-]+)["'][^>]*class=["'][^"']*opp-card)[^>]*>([\s\S]*?)<\/a>/gi;
            while ((m = htmlCardRe.exec(body)) !== null) {
                cards.push({ path: m[1] || m[2], b: m[3] });
            }
        }

        for (let bIdx = 0; bIdx < cards.length; bIdx++) {
            const path = cards[bIdx].path;
            const b = cards[bIdx].b;
            if (!path || seenPaths.has(path)) continue;

            let title = null;
            const titleJson = b.match(/opp-title[\\"=:\s,\w]+children[\\"=:\s]+(?:\\"|")((?:[^"\\\r\n]|\\.)*?)(?:\\"|")/i);
            const titleHtml = b.match(/<h3[^>]*class=["']opp-title["'][^>]*>([^<]+)<\/h3>/i);
            if (titleJson) {
                title = titleJson[1].replace(/\\u0026/g, '&').replace(/&#8211;/g, '–').replace(/\\'/g, "'").replace(/\\"/g, '"').trim();
            } else if (titleHtml) {
                title = decodeHtmlEntities(titleHtml[1].trim());
            }

            if (!title || title.length < 5) continue;
            seenPaths.add(path);

            let org = null;
            const orgJson = b.match(/opp-org[\\"=:\s,\w]+children[\\"=:\s]+(?:\\"|")((?:[^"\\\r\n]|\\.)*?)(?:\\"|")/i);
            const orgHtml = b.match(/<span[^>]*class=["']opp-org["'][^>]*>([^<]+)<\/span>/i);
            if (orgJson) {
                org = orgJson[1].replace(/\\u0026/g, '&').replace(/\\'/g, "'").trim();
            } else if (orgHtml) {
                org = decodeHtmlEntities(orgHtml[1].trim());
            }

            let subtype = null;
            const subJson = b.match(/opp-subtype[\\"=:\s,\w]+children[\\"=:\s]+(?:\\"|")((?:[^"\\\r\n]|\\.)*?)(?:\\"|")/i);
            const subHtml = b.match(/<div[^>]*class=["']opp-subtype["'][^>]*>([^<]+)<\/div>/i);
            if (subJson) {
                subtype = subJson[1].replace(/\\u0026/g, '&').trim();
            } else if (subHtml) {
                subtype = decodeHtmlEntities(subHtml[1].trim());
            }

            let value = null;
            const valJson = b.match(/opp-value[\\"=:\s,\w]+children[\\"=:\s]+(?:\\"|")((?:[^"\\\r\n]|\\.)*?)(?:\\"|")/i);
            const valHtml = b.match(/<span[^>]*class=["']opp-value["'][^>]*>([^<]+)<\/span>/i);
            if (valJson) {
                value = valJson[1].replace(/\\u0026/g, '&').replace(/\\u0016/g, '–').replace(/^\$+/, '$').trim();
            } else if (valHtml) {
                value = decodeHtmlEntities(valHtml[1].trim()).replace(/^\$+/, '$');
            }

            // Extract Deadline / Countdown (e.g. "17 days left", "2 days left", "Closes today", "Rolling")
            const cdM = b.match(/opp-countdown[\s\S]*?(?:\\"|>|")(\d+\s+(?:days?|weeks?|months?)\s+left|closes?\s+today|closing\s+soon|rolling|closed)(?:\\"|<|")/i);
            const countdownText = cdM ? cdM[1].trim() : null;
            if (countdownText && countdownText.toLowerCase() === 'closed') {
                if (feedStats) { feedStats.seen++; feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }
                continue;
            }
            const deadlineInfo = computeSaigeDeadline(countdownText);

            const directLink = `${baseUrl}${path}`;
            const descParts = [
                `Buyer/Funder: ${org || 'SAIGE Africa Partner'}`,
                `Opportunity Type: ${subtype || 'Grant / Tender'}`
            ];
            if (value && value !== ',') descParts.push(`Value: ${value}`);
            if (deadlineInfo.deadlineStr) descParts.push(deadlineInfo.deadlineStr);
            descParts.push(`Source: SAIGE Africa Opportunity Platform (${path})`);
            const description = descParts.join(' | ');

            addCandidateIfNew(
                feed.name,
                title,
                directLink,
                description,
                existingLinks,
                existingTitleKeys,
                bucket,
                true, // Pan-African agricultural platform
                targetUrl,
                null,
                null,
                feedStats
            );
            candidatesFound++;
        }
    });

    // Strategy D: Serper fallback if direct fetch yielded 0 items
    if (candidatesFound === 0) {
        Logger.log(`[${feed.name}] Direct fetch yielded 0 items. Engaging Serper fallback for individual opportunity paths.`);
        queryPortalSerperFallback('saigeopportunity.org/opportunities', ['agriculture', 'seed', 'agribusiness', 'tenders', 'rfp', 'rfq', 'grant', 'funding'], feed, existingLinks, existingTitleKeys, bucket, feedStats);
    }
}

/**
 * PARSER 6: STANDARD BLOCK SCRAPER
 */

function scrapePortalBlockLevel(feed, existingLinks, existingTitleKeys, bucket, feedStats) {
    const maxPages = (feed.pagination && feed.pagination.maxPages) ? feed.pagination.maxPages : 1;
    const paramName = (feed.pagination && feed.pagination.paramName) || 'page';
    for (let page = 1; page <= maxPages; page++) {
        const pageUrl = buildPaginatedUrl(feed.url, paramName, page);
        const response = fetchWithRetry(pageUrl, FETCH_OPTIONS);
        if (response.getResponseCode() !== 200) {
            if (page > 1) break;
            Logger.log(`[${feed.name}] Non-200 response (${response.getResponseCode()}) fetching ${pageUrl}. Body preview: ${response.getContentText().substring(0, 200)}`);

            return;
        }

        const html = response.getContentText();
        const scoredCandidates = extractScoredBlockCandidates(html, feed.baseUrl);
        scoredCandidates.sort((a, b) => b.score - a.score);
        scoredCandidates.forEach(c => {
            addCandidateIfNew(feed.name, c.title, c.link, c.description, existingLinks, existingTitleKeys, bucket, feed.assumeAfrican === true, feed.url, feed.excludeLinkPatterns, c.score, feedStats);
        });
        if (page < maxPages) Utilities.sleep(300);
    }
}

/**
 * CHUNKED AI EVALUATION
 * Splits candidates into groups of chunkSize (e.g. 12) so the model never runs out
 * of output tokens. If one chunk experiences issues, only that chunk falls back.
 */

/**
 * Scans Active Open RFPs and updates status of expired notices to CLOSED / EXPIRED.
 * Keeps the active sheet lean, fresh, and actionable.
 */

function auditTrackedOpportunitiesStatus(sheet) {
    try {
        if (!sheet || typeof sheet.getLastRow !== 'function') {
            sheet = getOrCreateSheet();
        }
        if (!sheet) return;
        const lastRow = sheet.getLastRow();
        if (lastRow < 2) return;
        const totalCols = Math.max(sheet.getLastColumn(), 12);
        const fullRange = sheet.getRange(2, 1, lastRow - 1, totalCols);
        const fullValues = fullRange.getValues();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let updatedCount = 0;
        let countryBackfillCount = 0;
        let modalityBackfillCount = 0;
        let legacyContradictionsModified = false;

        const numRows = fullValues.length;
        const newStatuses = [];
        const newBgs = [];
        const newFontColors = [];
        const newCountries = [];
        const newModalities = [];

        for (let i = 0; i < numRows; i++) {
            const source = String(fullValues[i][1] || '');
            const title = String(fullValues[i][2] || '');
            const link = String(fullValues[i][3] || '');
            let status = String(fullValues[i][4] || 'OPEN'); // Col 5: Status
            const closing = fullValues[i][5]; // Col 6: Closing Date
            const goNoGo = String(fullValues[i][6] || ''); // Col 7: Recommendation
            const score = Number(fullValues[i][7]) || 0; // Col 8: Score
            const summary = String(fullValues[i][9] || ''); // Col 10: Summary
            let country = String(fullValues[i][10] || '').trim(); // Col 11: Country
            let modality = String(fullValues[i][11] || '').trim(); // Col 12: Bidding Modality

            // 1. Check for legacy contradictory entries (pre-v5.22 vendor ads, medical supplies, physical seeds)
            const isLegacyContradiction = /\b(?:personal social media advertisement|vendor offering services rather than|focuses (?:primarily )?on the medical sector|medical sector rather than agriculture|completely unrelated to agriculture|homestead garden[-_\s]+crop seeds)\b/i.test(summary) ||
                /\b(?:homestead garden[-_\s]+crop seeds)\b/i.test(title);

            if (isLegacyContradiction) {
                fullValues[i][4] = 'CLOSED / EXPIRED';
                fullValues[i][6] = 'NO-GO'; // Col 7: AI Recommendation
                fullValues[i][7] = 0;       // Col 8: Match Score (%)
                newStatuses.push(['CLOSED / EXPIRED']);
                newBgs.push(['#f5f5f5']);
                newFontColors.push(['#757575']);
                newCountries.push([country || 'Sub-Saharan Africa']);
                newModalities.push(['NOT_APPLICABLE']);
                legacyContradictionsModified = true;
                updatedCount++;
                Logger.log(`[Maintenance] Retired legacy contradictory notice in row ${i + 2}: "${title}"`);
                continue;
            }

            // 2. Compute dynamic lifecycle status
            if (closing && String(closing).trim() !== 'Not Specified' && !String(closing).toLowerCase().includes('ongoing')) {
                const parsedDate = parseDateFlexible(closing);
                if (parsedDate && !isNaN(parsedDate.getTime())) {
                    const deadline = new Date(parsedDate);
                    deadline.setHours(23, 59, 59, 999);
                    const msDiff = deadline.getTime() - today.getTime();
                    const daysRemaining = Math.ceil(msDiff / (1000 * 60 * 60 * 24));

                    if (daysRemaining < 0) {
                        newStatuses.push(['EXPIRED / CLOSED']);
                        newBgs.push(['#f5f5f5']);
                        newFontColors.push(['#757575']);
                        if (status !== 'EXPIRED / CLOSED' && status !== 'CLOSED / EXPIRED' && status !== 'CLOSED') {
                            updatedCount++;
                        }
                    } else if (daysRemaining <= 7) {
                        const closingSoonTag = `CLOSING SOON (${daysRemaining}d)`;
                        newStatuses.push([closingSoonTag]);
                        newBgs.push(['#fff9c4']);
                        newFontColors.push(['#e65100']);
                        if (status !== closingSoonTag) {
                            updatedCount++;
                        }
                    } else {
                        const openTag = status.includes('Extended') ? 'OPEN (Extended)' : 'OPEN';
                        newStatuses.push([openTag]);
                        newBgs.push(['#c8e6c9']);
                        newFontColors.push(['#1b5e20']);
                    }
                } else {
                    newStatuses.push([status]);
                    newBgs.push(['#ffffff']);
                    newFontColors.push(['#000000']);
                }
            } else {
                // Missing, 'Not Specified', or rolling deadline
                if (status.includes('CLOSED') || status.includes('EXPIRED')) {
                    newStatuses.push(['EXPIRED / CLOSED']);
                    newBgs.push(['#f5f5f5']);
                    newFontColors.push(['#757575']);
                } else {
                    newStatuses.push(['OPEN (Rolling / TBD)']);
                    newBgs.push(['#e8f5e9']);
                    newFontColors.push(['#2e7d32']);
                }
            }

            // 3. Auto-Audit & Backfill Country (Col 11)
            if (!country || country.toLowerCase() === 'unspecified' || country.toLowerCase() === 'not specified') {
                country = extractOpportunityCountries(title, '', summary, link, source);
                fullValues[i][10] = country;
                countryBackfillCount++;
            }
            newCountries.push([country]);

            // 4. Auto-Audit & Backfill Bidding Modality (Col 12)
            if (!modality || modality === 'N/A' || modality.toLowerCase() === 'unspecified' || modality.toLowerCase() === 'not specified') {
                modality = resolveBiddingModality(null, null, score, goNoGo, title, summary, source);
                fullValues[i][11] = modality;
                modalityBackfillCount++;
            }
            newModalities.push([modality]);
        }

        // Batch update Status column (Col 5)
        const statusRange = sheet.getRange(2, 5, numRows, 1);
        statusRange.setValues(newStatuses);
        statusRange.setBackgrounds(newBgs);
        statusRange.setFontColors(newFontColors);

        // Batch update Country column (Col 11)
        if (countryBackfillCount > 0) {
            sheet.getRange(2, 11, numRows, 1).setValues(newCountries);
            Logger.log(`[Maintenance] Successfully backfilled ${countryBackfillCount} missing/unspecified Country cell(s) in Active sheet.`);
        }

        // Batch update Bidding Modality column (Col 12)
        if (modalityBackfillCount > 0) {
            sheet.getRange(2, 12, numRows, 1).setValues(newModalities);
            Logger.log(`[Maintenance] Successfully backfilled ${modalityBackfillCount} missing/N/A Bidding Modality cell(s) in Active sheet.`);
        }

        // If legacy contradictions were modified, write back columns 3-10
        if (legacyContradictionsModified) {
            sheet.getRange(2, 3, numRows, 8).setValues(fullValues.map(r => r.slice(2, 10)));
        }

        if (updatedCount > 0) {
            Logger.log(`[Maintenance] Automatically audited and updated ${updatedCount} notice lifecycle status(es) in Active sheet.`);
        }
    } catch (e) {
        Logger.log('[Maintenance] Note on auditTrackedOpportunitiesStatus: ' + e.message);
    }
}

/**
 * Backward compatibility alias for updateExpiredProposalsStatus.
 */
function updateExpiredProposalsStatus(sheet) {
    return auditTrackedOpportunitiesStatus(sheet);
}

/**
 * Selective Deep Ingestion & Attached TOR Extractor:
 * For candidates entering AI evaluation whose descriptions are sparse (< 350 chars) or link to institutional
 * opportunity landing pages (AGRA, AATF, AfDB, World Bank, CIMMYT, ASARECA, etc.),
 * fetches the HTML landing page, extracts substantive scope paragraphs, and detects attached downloadable TORs (PDF/DOC).
 * Leverages CacheService (6-hour TTL) so repeat runs incur zero network latency.
 */
function enrichCandidatesWithDeepInspection(candidates, runStartTime) {
    if (!candidates || candidates.length === 0) return;
    const cache = CacheService.getScriptCache();
    const maxLiveDeepFetches = 6;
    let liveFetchesCount = 0;
    const safeDeepInspectionCeilingMs = 175000; // 175s safe ceiling

    for (let i = 0; i < candidates.length; i++) {
        const item = candidates[i];
        if (!item || !item.link) continue;
        if (typeof runStartTime === 'number' && (Date.now() - runStartTime > safeDeepInspectionCeilingMs)) {
            Logger.log(`[Deep Ingestion Guard] Discovery & ingestion reached ${Math.round((Date.now() - runStartTime) / 1000)}s. Bypassing remaining deep fetches to protect AI evaluation budget.`);
            break;
        }

        // Check if item needs deep inspection:
        const isSparse = !item.description || item.description.trim().length < 350;
        const isInstitutionalHost = /\b(?:agra\.org|afdb\.org|aatf-africa\.org|asareca\.org|cimmyt\.org|locatefund\.com|ungm\.org|worldbank\.org|allbusiness\.africa|tendersure\.co\.ke)\b/i.test(item.link);
        const isPdfDirect = /\.pdf(?:$|\?)/i.test(item.link);

        if ((!isSparse && !isInstitutionalHost) || isPdfDirect) {
            continue;
        }

        // Cache Key (using hash of URL)
        const urlHash = 'TOR_DEEP_' + Math.abs(hashString(item.link)).toString(36);
        const cached = cache.get(urlHash);
        if (cached) {
            item.description = `${item.description ? item.description + '\n' : ''}${cached}`.trim();
            continue;
        }

        if (liveFetchesCount >= maxLiveDeepFetches) {
            continue;
        }

        try {
            liveFetchesCount++;
            const response = UrlFetchApp.fetch(item.link, {
                muteHttpExceptions: true,
                followRedirects: true,
                validateHttpsCertificates: false,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                }
            });

            if (response.getResponseCode() === 200) {
                const html = response.getContentText();
                if (html && html.length > 200) {
                    const extracted = extractDeepContentFromHtml(html);
                    if (extracted.bodyText || extracted.pdfNote) {
                        const deepSnippet = `[Deep Ingestion / TOR Details]: ${extracted.bodyText}${extracted.pdfNote ? ' | ' + extracted.pdfNote : ''}`.trim();
                        item.description = `${item.description ? item.description + '\n' : ''}${deepSnippet}`.trim();
                        safeCachePut(cache, urlHash, deepSnippet, 21600);
                        Logger.log(`[DEEP INGESTION] Enriched candidate "${item.title.substring(0, 45)}..." with ${extracted.bodyText.length} chars of scope context.`);
                    }
                }
            }
        } catch (fetchErr) {
            Logger.log(`[DEEP INGESTION NOTE] Could not fetch ${item.link}: ${fetchErr.message}`);
        }
    }
}

function extractDeepContentFromHtml(html) {
    let clean = html.replace(/<script[\s\S]*?<\/script>/gi, '')
                    .replace(/<style[\s\S]*?<\/style>/gi, '')
                    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
                    .replace(/<header[\s\S]*?<\/header>/gi, '')
                    .replace(/<footer[\s\S]*?<\/footer>/gi, '');

    // Extract attached PDF or DOC links
    const docMatches = [];
    const docRegex = /<a[^>]+href=["']([^"']+\.(?:pdf|docx?)(?:\?[^"']*)?)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    while ((m = docRegex.exec(clean)) !== null) {
        const link = m[1];
        const text = m[2].replace(/<[^>]+>/g, '').trim();
        const filename = link.split('/').pop().split('?')[0];
        const label = text && text.length < 80 ? text : filename;
        if (label && !docMatches.includes(label)) docMatches.push(label);
        if (docMatches.length >= 3) break;
    }

    // Extract substantive paragraphs
    const paragraphs = [];
    const pRegex = /<(?:p|div class=["'][^"']*(?:content|body|description|overview|scope)[^"']*["'])[^>]*>([\s\S]*?)<\/(?:p|div)>/gi;
    let pMatch;
    while ((pMatch = pRegex.exec(clean)) !== null) {
        const pText = pMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        if (pText.length > 35 && !paragraphs.includes(pText) && !looksLikeNavigationText(pText)) {
            paragraphs.push(pText);
        }
        if (paragraphs.length >= 4) break;
    }

    const bodyText = paragraphs.join(' ').substring(0, 900);
    const pdfNote = docMatches.length > 0 ? `Attached TOR / Documents: [${docMatches.join(', ')}]` : '';
    return { bodyText, pdfNote };
}

function looksLikeNavigationText(text) {
    return /^(?:home|about us|contact us|privacy policy|terms of use|cookie|copyright|all rights reserved|login|sign in|register)\b/i.test(text);
}

function hashString(str) {
    let hash = 0;
    if (!str) return hash;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return hash;
}

function evaluateRfpInChunks(candidates, chunkSize, runStartTime) {
    if (candidates.length === 0) return [];
    const size = chunkSize || CONFIG.AI_EVALUATION_CHUNK_SIZE || 6;
    const allEvaluations = [];
    for (let i = 0; i < candidates.length; i += size) {
        const chunk = candidates.slice(i, i + size);
        Logger.log(`[AI Evaluator] Evaluating batch chunk ${Math.floor(i / size) + 1}/${Math.ceil(candidates.length / size)} (${chunk.length} items)...`);
        
        try {
            const chunkEvals = evaluateRfpSingleCallWithGemini(chunk);
            allEvaluations.push(...chunkEvals);
        } catch (chunkErr) {
            Logger.log(`[AI Evaluator] Error evaluating chunk: ${chunkErr.message}. Applying heuristic fallback for this chunk.`);
            chunk.forEach(item => {
                const fb = heuristicEvaluateCandidate(item);
                allEvaluations.push({ ...fb, id: item.id });
            });
        }

        // Hard Wall-Clock Timeout Check (GAS 6-minute trigger compliance):
        // Halt chunk evaluation early at 260s (4m20s) so that spreadsheet batch writing,
        // email notifications, and diagnostics ALWAYS have 50+ seconds of dedicated headroom.
        const safeEvaluationCeilingMs = (CONFIG.SCRIPT_TIMEOUT_LIMIT_MS || 310000) - 50000; // 260s
        if (typeof runStartTime === 'number' && (Date.now() - runStartTime > safeEvaluationCeilingMs)) {
            Logger.log(`[Timeout Guard] Approaching safe execution limit (${Math.round((Date.now() - runStartTime) / 1000)}s / ${Math.round(safeEvaluationCeilingMs / 1000)}s). Halting chunk evaluation early to ensure safe sheet write and notifications.`);
            break;
        }

        // Inter-chunk delay to avoid rate limiting while conserving execution time
        if (i + size < candidates.length) Utilities.sleep(2500);
    }

    return allEvaluations;
}

function tryOpenAiCompatibleEvaluator(provider, apiKey, prompt, isLastProvider) {
    const payload = {
        model: provider.model,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0
    };
    if (provider.reasoningEffort && provider.reasoningEffort !== 'none') payload.reasoning_effort = provider.reasoningEffort;
    let attempt = 0;

    // If this is the last provider in the fallback chain, allow 3 attempts so we don't prematurely abort to heuristics

    const maxAttempts = isLastProvider ? 3 : 2;
    while (attempt < maxAttempts) {
        let response;

        try {
            response = UrlFetchApp.fetch(provider.baseUrl, {
                method: 'POST',
                contentType: 'application/json',
                headers: { 'Authorization': `Bearer ${apiKey}` },
                payload: JSON.stringify(payload),
                muteHttpExceptions: true
            });
        } catch (e) {
            return { success: false, reason: `network error (${e.message})` };
        }

        const code = response.getResponseCode();
        const bodyText = response.getContentText();
        if (code === 429) {
            // Check if this is a DAILY quota limit (TPD) rather than per-minute limit (TPM)

            const isDailyLimit = /tokens per day \(TPD\)|try again in \d+m|try again in \d+h/i.test(bodyText);
            if (isDailyLimit) {
                return { success: false, isDailyQuotaExhausted: true, reason: `daily quota exhausted (${bodyText.substring(0, 180)})` };
            }

            attempt++;
            if (attempt < maxAttempts) {
                let waitSecs = 15;

                // Parses dynamic wait time from Groq error message (e.g., "Please try again in 11.66s")

                const waitMatch = bodyText.match(/try again in ([\d.]+)s/i);
                if (waitMatch && waitMatch[1]) {
                    waitSecs = Math.ceil(parseFloat(waitMatch[1])) + 2;
                }

                // Tolerate up to 35s wait for all models so we don't prematurely burn secondary fallback daily limits

                const maxWait = 35;
                if (waitSecs > maxWait) {
                    Logger.log(`[Free Evaluator] ${provider.name} 429 rate limit requested ${waitSecs}s wait. Failing fast to next model/provider...`);
                    return { success: false, reason: `429 rate limit (${waitSecs}s wait exceeds fast threshold of ${maxWait}s)` };
                }

                Logger.log(`[Free Evaluator] ${provider.name} 429 rate limit hit. Waiting ${waitSecs}s before retry...`);
                Utilities.sleep(waitSecs * 1000);
                continue;
            }

            return { success: false, reason: `429 rate/quota limited — ${bodyText.substring(0, 250)}` };
        }

        if (code === 401 || code === 403) return { success: false, reason: `${code} auth/permission error — check the provider key or model permissions` };
        if (code === 404) return { success: false, reason: `404 model/endpoint not found — verify ${provider.model} (${bodyText.substring(0, 160)})` };
        if (code === 400) return { success: false, reason: `400 invalid request — ${bodyText.substring(0, 300)}` };
        if (code !== 200) return { success: false, reason: `HTTP ${code}: ${bodyText.substring(0, 250)}` };
        let result;
        try { result = JSON.parse(bodyText); }

        catch (e) { return { success: false, reason: 'unparseable response body' }; }

        if (result.error) return { success: false, reason: `API error (${result.error.message || JSON.stringify(result.error)})` };
        const choice = result.choices && result.choices[0];
        const content = choice && choice.message && choice.message.content;
        if (!content) return { success: false, reason: 'no message content in response' };
        const cleaned = content.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '');
        let parsedRoot;
        try { parsedRoot = JSON.parse(cleaned); }

        catch (e) { return { success: false, reason: `model output was not valid JSON (${e.message})` }; }

        const evaluations = parsedRoot.evaluations;
        if (!Array.isArray(evaluations)) return { success: false, reason: 'response JSON did not contain an evaluations array' };
        return { success: true, data: evaluations };
    }

    return { success: false, reason: 'retries exhausted' };
}

/**
 * SINGLE-CALL GEMINI / FALLBACK EVALUATOR (PER CHUNK)
 */

function evaluateRfpSingleCallWithGemini(batchItems) {
    const geminiApiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    const today = getLocalDateKey();
    if (batchItems.length === 0) return generateFallbackBatch(batchItems);
    const formattedRfpList = batchItems.map(item => {
        const descSnippet = (item.description || '').substring(0, 800).replace(/\s+/g, ' ').trim();
        return `[ID: ${item.id}]\nTitle: ${item.title}\nSource: ${item.source}\nURL: ${item.link}\nContext: ${descSnippet}\n`;
    }).join('\n---\n');
    const basePrompt = `

    You are an RFP intelligence analyst for Agri Experience Ltd, a Nairobi-based consulting firm specializing in crop SEED SYSTEMS across Sub-Saharan Africa.

    Today's Date: ${today}

    IMPORTANT: Separate PROCUREMENT AUTHENTICITY from BUSINESS FIT.

    A solicitation can be a genuine, open procurement opportunity even when it is a poor fit for Agri Experience Ltd. Do NOT mark a genuine procurement as false merely because it is outside the firm's core capabilities.

    Target Firm Profile:

    Firm: Agri Experience Ltd (headquartered in Nairobi, Kenya, serving Sub-Saharan Africa across 21+ countries) — EXPERT MANAGEMENT & TECHNICAL ADVISORY CONSULTING PRACTICE in crop SEED SYSTEMS, AGTECH (including Agritech, Agri-tech, Agri tech), DIGITAL EXTENSION, and AGRICULTURAL POLICY across Sub-Saharan Africa.

    MANDATORY FIRM PRACTICE BOUNDARY:
    Agri Experience Ltd is a PROFESSIONAL ADVISORY & STRATEGY CONSULTING FIRM. It provides policy advisory, seed sector assessments, regulatory frameworks, AgTech/AI extension advisory, and MEL consulting.
    It is NEVER a commercial seed merchant, seed distributor, fertilizer vendor, farm inputs merchant, or hardware supplier. It does NOT bid on contracts to supply, pack, or deliver physical bags of seeds, seedlings, grain, fertilizers, or machinery.

    Core Practice Pillars:

    1. Seed Systems & Market Development (TASAI, seed value chains, EGS, foundation/certified seed, last-mile agrodealer distribution)

    2. Policy & Regulatory Advisory (seed certification, private inspector authorization, variety release/registration, biotechnology & GMO biosafety)

    3. Technical Studies & Scoping (feasibility, baseline, planting materials: cassava, sweet potato, nurseries, agrodealers)

    4. Digital Platforms, Seed IT & AgTech (anti-counterfeit verification M3/RIMI, MbeguChoice variety selector, VIN, seed information systems SIMS, digital input platforms)

    5. Digital Agriculture, AgTech & AI in Extension (AI-powered extension & advisory tools, mobile advisory, precision agriculture, digital tools for smallholders & agrodealers, evidence and scale-up studies of AgTech/FinTech solutions)

    6. Strategic Advisory, MEL & Convenings (evaluations, program reviews for USAID, Gates Foundation, AGRA, IFAD, World Bank)

    7. Agribusiness, Youth & Women Entrepreneurship (incubation, business models, agrodealer networks, digital innovation hubs for agripreneurs)

    Fit Rules & Percentage Scoring Rubric:
    The AI evaluator MUST compute an objective match percentage (0% to 100%) reflecting Agri Experience's consulting capabilities:
    - 90% - 100% (HIGH Fit | GO): Direct seed systems, seed certification, seed policy/regulation, variety release, biotech & GMO biosafety, national & regional seed trade authorities and regulatory bodies (e.g. STAK, TASTA, AFSTA, KEPHIS, TOSCI, SCCI, TASAI, National Biosafety Authority).
    - 75% - 89% (HIGH Fit | GO): AgTech platforms, AI in agricultural extension and advisory, digital farmer advisory platforms (MbeguChoice), seed verification platforms (M3/RIMI), and scaling AgTech/FinTech solutions for smallholders and agrodealers.
    - 60% - 74% (MEDIUM Fit | MAYBE or GO): Agribusiness value chains, input markets, youth/women agribusiness entrepreneurship, agricultural MEL, feasibility studies, digital innovation hubs for agripreneurs, and agricultural data systems.
    - 40% - 59% (MEDIUM/LOW Fit | MAYBE): Broad food systems policy or general environmental/climate studies with indirect agricultural or input relevance.
    - 0% - 20% (NONE/LOW Fit | NO-GO): PURE PHYSICAL COMMODITY / INPUTS SUPPLY TENDERS: Solicitations for purchasing, delivering, or supplying physical agricultural goods—including bulk grain, bags of crop seeds, planting seedlings, fertilizers, agrochemicals, tractors, irrigation pipes, or equipment—where the client is looking for a physical goods vendor/distributor rather than a consulting firm to provide advisory services, feasibility studies, or technical assistance.
      CRITICAL: The presence of the word 'seed' or 'seeds' in an invitation to supply physical crop seeds/seedlings does NOT make it an advisory consulting fit! Pure physical goods supply must receive score <= 20% and NO-GO.
    - 0% - 19% (NONE Fit | NO-GO): Outside core focus (urban municipal planning, city charters, housing, healthcare, medical/hospital supplies, pharmaceuticals, clinical systems, defense/military, mining, urban commercial IT/software).

    Evaluate the following candidates:

    ${formattedRfpList}

    For EACH candidate return one evaluation object.

    1. isGenuineOpportunity:

       TRUE when the candidate itself represents a specific, actionable organizational proposal, funding, or procurement opportunity that an organization, consulting firm, NGO, company, or consortium could apply or respond to.

       Accept: RFPs, RFQs, EOIs/Expressions of Interest, tenders, consultancy solicitations, competitive calls for proposals (CFPs), calls for concept notes (CFCNs), competitive donor/foundation grants, matching grants, challenge funds, or innovation fund applications.

       CRITICAL ANTI-HALLUCINATION & FACTUAL GROUNDING MANDATE:
       - Extract facts STRICTLY from the provided Title, URL, and Context.
       - NEVER fabricate, invent, or assume the issuing client, authority, or company name if not explicitly written in the provided text. (For example, if a title is 'Supplier Prequalification Notice 2027-2030 - Tenderyetu.com', NEVER assume or state that it is issued by 'Kenya Seed Company Limited'). If the issuer is not mentioned in the text, summarize the scope factually or state the client as 'Not Specified'.
       - NEVER hallucinate an agricultural or seed systems scope for non-agricultural tenders (e.g. refugee education, municipal planning) merely because they mention an African country where Agri Experience operates.
       - Salaried employment posts, hiring announcements ('we are hiring', 'we\'re hiring', 'job vacancy') are NOT RFPs/grants. Classify as isGenuineOpportunity: FALSE, isOpen: FALSE, businessFit: 'NONE', score: 0, goNoGo: 'NO-GO'.

       BARE GOVERNMENT MASTHEADS & GENERIC NATIONAL HEADERS:
       - Documents titled with bare country/government names (e.g. "REPUBLIC OF KENYA", "GOVERNMENT OF RWANDA", "United Republic of Tanzania") that lack a specific, actionable organizational consultancy, procurement, or grant assignment described in the context:
         MUST be classified as: isGenuineOpportunity: FALSE, isOpen: FALSE, businessFit: "NONE", score: 0, goNoGo: "NO-GO",
         with summary stating: "Bare government/country header document without an actionable organizational consultancy or procurement assignment."

       AFRICAN DEVELOPMENT BANK (AfDB) & OFFICIAL PORTAL EOI NOTICES:
       The African Development Bank (afdb.org) publishes official Expressions of Interest and Consultancy RFPs under URLs containing '/documents/eoi-' or '/consultants/eoi-'. Solicitations titled with 'EOI', 'Expression of Interest', 'Consultancy Services', or 'Consulting Firm' on afdb.org are GENUINE, OFFICIAL PROCUREMENT OPPORTUNITIES (isGenuineOpportunity: TRUE).
       Do NOT mislabel them as institutional document pages or generic repositories. Summarize the actual consultancy scope (e.g. advisory services, capacity building, startup acceleration) from the title and context.

       CRITICAL EXCEPTION FOR CONSULTING FIRM EOIs & COMPETITIVE GRANTS:
       Solicitations titled 'Call for Expression of Interest (EOI)', 'EOI', 'Consultancy Services', 'Consulting Firm', 'Terms of Reference (ToR)', 'Request for Proposals (RFP)', competitive Grants, Challenge Funds, or innovation calls—even when hosted on job portals or aggregator domains like unjobnet.org or reliefweb.int—are GENUINE firm-level procurement opportunities (isGenuineOpportunity: TRUE). Do NOT confuse competitive advisory solicitations with standard salaried corporate employment.

       MANDATORY FILTER: STRICT DOMESTIC-ONLY ENTITY RESTRICTIONS & EMERGENCY HUMANITARIAN RELIEF:
Agri Experience Ltd is a regional consulting firm operating across Sub-Saharan Africa from its headquarters in Kenya.
1. Domestic-Only In-Country Restrictions: While Agri Experience actively undertakes assignments across all of Sub-Saharan Africa (e.g. Sudan, Ethiopia, Uganda, Rwanda, Nigeria, Ghana, Tanzania, Malawi, Zambia), solicitations explicitly restricted to locally registered domestic national NGOs or in-country civil society entities only (e.g. "Eligible applicants must be Sudanese national NGOs only", "Local organizations registered in [Country] only") where regional/cross-border consulting firms cannot legally apply:
   MUST be classified as:
   isGenuineOpportunity: FALSE, isOpen: FALSE, businessFit: "NONE", score: 0, goNoGo: "NO-GO",
   with summary stating: "Restricted exclusively to domestic national NGOs/in-country entities, not accessible to regional consulting firms."
2. Frontline Humanitarian Relief Operations: Emergency food distributions, humanitarian camp feeding, conflict emergency relief beneficiary targeting (e.g. WFP/UNHCR emergency targeting/rationing calls) are NOT agricultural advisory or seed systems consulting:
   MUST be classified as:
   businessFit: "NONE", score: 0, goNoGo: "NO-GO".

       MANDATORY FILTER: HACKATHONS, YOUTH PITCH CONTESTS & CASH PRIZE COMPETITIONS:
       Agri Experience Ltd is an established corporate consulting firm that pursues institutional RFPs, tenders, and organizational grants, NOT developer coding hackathons, startup pitch competitions, or youth prize contests.
       Competitions or challenges targeting individual youth, students, startups, or developer teams offering cash prizes, prize money, startup awards, or mentorship (e.g. "Youth in Agribusiness Innovation Contest", "AgriTech Hackathon", "Developer Challenge", "Coding Competition", cash prizes to winners, conference passes):
       MUST be classified as:
       isGenuineOpportunity: FALSE, isOpen: FALSE, businessFit: "NONE", score: 0, goNoGo: "NO-GO",
       with summary stating: "Startup pitch competition / innovation contest or cash prize challenge for individuals/startups, not an institutional consultancy procurement tender or development grant."

       MANDATORY FILTER: INDIVIDUAL CONSULTANCIES (FIRM PROPOSALS ONLY):
       Agri Experience Ltd is a consulting firm that pursues institutional RFPs, consortia, and firm contracts, NOT single freelance individual assignments.
       Solicitations explicitly targeting an "Individual Consultant", "Individual Contractor", "Individual Specialist", "Personal Consultancy", "National Consultant" (individual level), or "Consultant Individuel" MUST be classified as:
       isGenuineOpportunity: FALSE, isOpen: FALSE, businessFit: "NONE", score: 0, goNoGo: "NO-GO",
       with summary stating: "Individual consultancy assignment reserved for single freelance individuals, not consulting firms/organizations."

       MANDATORY FILTER: URBAN & MUNICIPAL NON-AGRICULTURAL PLANNING:
       Tenders for urban municipal planning, city charters (e.g. Inclusive Cities Charter), urban housing, transport, or metropolitan governance that do not have a direct crop seed systems or smallholder agriculture focus MUST be classified as:
       businessFit: "NONE", score: 0-19, goNoGo: "NO-GO", pillar: "N/A - Outside Core Focus".

       Do NOT mark a candidate false merely because it is a grant, matching grant, challenge fund, or call for proposals rather than a commercial procurement tender.

       FALSE for generic category/index pages, search result links, navigation URLs, procurement/funding topic pages with no single actionable solicitation, institutional document repositories or broad organizational document pages with no specific TOR/submission details, news/blog articles, newsletters, bulletins, reports, webinars, workshops, conferences, events, individual salaried employment vacancies (staff roles/officers/directors/assistants), contract award notices / awarded tenders (completed past procurement), or pages that are not current open solicitations.

       If the title clearly identifies a genuine opportunity or grant call but the scraped context is incomplete, do NOT reject it merely because the closing date, reference number, or full scope is missing. Use the title, source, URL and available context together.

    2. isOpen:

       TRUE only when the genuine opportunity is still open for submission relative to ${today}, based on an explicit closing/deadline date or clearly stated current-open status.

       FALSE if the deadline has passed, or if the notice is a Contract Award, past award notice, cancelled, or explicitly marked with status 'Awarded' or 'Closed'.

       If no closing date is available but the notice appears current and active with no evidence of closure or award, you may set TRUE and use closingDate='Not Specified'.

       If isGenuineOpportunity is FALSE, isOpen MUST be FALSE.

    3. closingDate:

       Give the submission deadline as YYYY-MM-DD where confidently determinable; otherwise 'Not Specified'. Do not invent dates.

    4. businessFit:

       One of HIGH, MEDIUM, LOW, or NONE.

       HIGH = directly aligned with seed systems, seed policy/certification, planting materials, agrodealers, AgTech solutions, AI in agricultural advisory/extension, digital platforms, or core practice pillars.

       MEDIUM = agribusiness consultancy or agricultural value-chain / market systems assignment with an input, seed, youth/women agribusiness, agrodealer, AgTech scale-up, or policy/MEL component.

       LOW = genuine agricultural procurement but primarily outside the firm's core seed-system & input value chain specialization.

       NONE = no meaningful capability fit (e.g. commodity grain buying, civil works, livestock-only).

       Business fit MUST NOT determine isGenuineOpportunity.

    5. goNoGo:

       GO, MAYBE, or NO-GO based on the firm's capabilities and geographic focus. A genuine opportunity may be NO-GO even when it is open.

        6. score:
       Match percentage integer (0 to 100) computed strictly using the Percentage Scoring Rubric above. Solicitations outside agriculture and food systems (e.g. healthcare, medical supplies, infrastructure, defense) MUST receive a score between 0 and 19 and goNoGo: NO-GO.

    7. pillar:

       Best matching core capability pillar. If no genuine capability pillar applies, use exactly 'N/A - Outside Core Focus'.

    8. confidence:

       Integer 0-100 representing confidence that the authenticity classification is correct from the supplied evidence.

    9. summary:

       Exactly 2 concise sentences. Sentence 1 states what the procurement is or, if not genuine, what the content actually is. Sentence 2 states current status and business-fit implication.

    10. specificOpportunityTitle:

       - Multi-Opportunity Roundup Posts: For digests or social media roundup posts that bundle multiple opportunities (e.g. from GrantEdge, Opportunities for Youth, FundsforNGOs, LinkedIn digests): provide the exact name of the SINGLE best-fitting opportunity evaluated, prefixed with "[Roundup] " (e.g. "[Roundup] Halcyon Africa Innovation in Agriculture & Food Security Accelerator 2027").
       - Generic, Uninformative, or Masthead Titles: When evaluating a candidate whose scraped Title is generic, uninformative, a bare country/government masthead (e.g. "REPUBLIC OF KENYA", "GOVERNMENT OF RWANDA", "United Republic of Tanzania", "Kenya"), or a bare document type shell (e.g. "Request for Proposals", "REQUEST FOR PROPOSALS (RFP)", "Tender Document", "Bidding Document", "Consultancy Services", "request for proposal for consulting firms", "Expression of Interest", "Project-related Procurement", "Procurement Notice"):
         You MUST extract and construct a concise, substantive, professional title combining the issuing client/authority and assignment subject from the context (e.g. "National Biosafety Authority Kenya - Consultancy for Biosafety Public Awareness Baseline Survey" or "TradeMark Africa - BPR Consultancy for CALAO Trade Corridors").
       - For standard opportunities that already have specific, descriptive titles (e.g. "EOI - Rwanda - TAAT Technical Advisor – Seed Systems"), return the original opportunity title or leave null.

    CRITICAL CONGRUENCE REQUIREMENT (Summary & Scoring Alignment):
    Your summary, isGenuineOpportunity, isOpen, score, and goNoGo MUST be in 100% strict congruence:
    - If your summary describes the URL as an institutional document page, category page, general repository, lacking specific submission details, closed/expired, a vendor advertisement, or not an active/current open solicitation, you MUST return:
      isGenuineOpportunity: FALSE, isOpen: FALSE, businessFit: "NONE", score: 0, goNoGo: "NO-GO".
    - NEVER return a score >= 40, isOpen: TRUE, or goNoGo: "GO" / "MAYBE" when your summary states the content is an institutional document page, not an active procurement notice, or not a current open solicitation.

    MULTI-OPPORTUNITY / ROUNDUP POST HANDLING:
    When evaluating a post or page that bundles multiple distinct funding calls, grants, or tenders in a single listing:
    - Select and evaluate the SINGLE highest-matching agricultural, seed, AgTech, or agribusiness opportunity within the compilation.
    - Your entire evaluation (score, closingDate, country, summary, specificOpportunityTitle) must focus exclusively on that single best-matching opportunity. Do NOT conflate different opportunities.

    11. biddingModality & partnerStrategy:
        Classify the optimal strategic bidding approach for Agri Experience Ltd:
        - "LEAD_BIDDER": For focused advisory consultancies, seed policy and regulatory assessments, variety release frameworks, seed certification digital systems, AgTech extension studies, and targeted agricultural studies (e.g. AGRA, AATF, CIMMYT, ILRI, ASARECA, TradeMark Africa, national ministries). Agri Experience has world-class specialized domain leadership and should bid directly as the prime contractor / lead bidder. Set partnerStrategy to "Direct Prime Advisory Consultant" or specific local partner recommendations.
        - "CONSORTIUM_PARTNER": For mega donor programs, multi-million dollar flagship initiatives (e.g. USAID Feed the Future broad vehicles, World Bank nationwide agricultural commercialization, FCDO economic growth facilities) where prime contractors (e.g. DAI, Chemonics, RTI International, Tetra Tech, TechnoServe, Palladium, ACDI/VOCA, Abt Associates) require a specialized Sub-Saharan African seed systems and agricultural policy partner. Set partnerStrategy to recommend specific prime contractors and Agri Experience's niche role (e.g. "Prime candidate: DAI / Chemonics / RTI; Agri Experience as Seed Systems & Policy Specialist").
        - "NOT_APPLICABLE": When goNoGo is "NO-GO" or score < 40. Set partnerStrategy to "".

    12. country:
        Target geographic country or region for this opportunity (e.g. "Kenya", "Rwanda", "Uganda", "Tanzania", "Ethiopia", "Nigeria", "Ghana", "Mali", "Malawi", "Zambia", "Zimbabwe", "DR Congo", "Senegal", "Côte d'Ivoire", "South Sudan", "Somalia", "Sub-Saharan Africa", or "Africa (Pan-African)"). If multiple countries are mentioned, list them separated by commas. Never return "Unspecified" or empty.

    Return ONLY the requested JSON structure. Do not invent dates, organizations, reference numbers, URLs, or scope details.

    `;
    let aiEvaluations = null;
    const groqApiKey = PropertiesService.getScriptProperties().getProperty('GROQ_API_KEY');
    const preferGroq = (CONFIG.PRIMARY_AI_PROVIDER === 'GROQ' || !geminiApiKey) && !!groqApiKey;

    // GOOGLE WORKSPACE BUSINESS OPTIMIZATION:

    // If GROQ is configured as the primary AI engine, call Groq directly to avoid

    // unneeded Gemini API attempts and rate-limit friction on Workspace domains.

    if (preferGroq) {
        aiEvaluations = evaluateWithFreeProvider(batchItems, basePrompt);
    }

    if (!aiEvaluations && geminiApiKey && consumeGeminiDailyQuota()) {
        const payload = {
            contents: [{ parts: [{ text: basePrompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            id: { type: "INTEGER" },
                            isGenuineOpportunity: { type: "BOOLEAN" },
                            isOpen: { type: "BOOLEAN" },
                            closingDate: { type: "STRING" },
                            businessFit: { type: "STRING", enum: ["HIGH", "MEDIUM", "LOW", "NONE"] },
                            confidence: { type: "INTEGER" },
                            goNoGo: { type: "STRING", enum: ["GO", "MAYBE", "NO-GO"] },
                            score: { type: "INTEGER" },
                            pillar: { type: "STRING" },
                            summary: { type: "STRING" },
                            specificOpportunityTitle: { type: "STRING" },
                            country: { type: "STRING" },
                            biddingModality: { type: "STRING", enum: ["LEAD_BIDDER", "CONSORTIUM_PARTNER", "NOT_APPLICABLE"] },
                            partnerStrategy: { type: "STRING" }
                        },
                        required: ["id", "isGenuineOpportunity", "isOpen", "closingDate", "businessFit", "confidence", "goNoGo", "score", "pillar", "summary", "country", "biddingModality"]
                    }
                }
            }
        };
        const attempt = runWithGeminiModelChain(
            geminiApiKey,
            (model, key) => tryGeminiModel(model, key, payload),
            'Evaluator'
        );
        if (attempt.success) aiEvaluations = attempt.data;
        else {
            Logger.log('[Gemini Evaluator] Fallback models in the chain failed. Trying free-tier fallback providers.');
            notifyAdminAlert('Gemini AI Models Failed in Evaluation Chain', 'All Gemini fallback models in the chain failed. Switched to free-tier fallback providers (Groq/Cerebras/heuristics).');
        }
    } else if (!geminiApiKey) {
        Logger.log('[Gemini Evaluator] No GEMINI_API_KEY configured. Trying free-tier fallback providers.');
    } else {
        Logger.log('[Gemini Quota Guard] Daily call budget exhausted. Trying free-tier fallback providers.');
        notifyAdminAlert('Gemini API Quota Guard Depleted', 'Daily call budget for Gemini API was exhausted. Switched to secondary fallback providers.');
    }

    if (!aiEvaluations) {
        aiEvaluations = evaluateWithFreeProvider(batchItems, basePrompt);
    }

    if (!aiEvaluations) {
        Logger.log('[Evaluator] AI providers failed or unconfigured. Using heuristic fallback scoring for this chunk.');
        return generateFallbackBatch(batchItems);
    }

    // Match evaluations by ID; coerce to numbers to prevent string/number type mismatches.

    // Preserve all valid AI evaluations; only supplement any individually missing items with heuristics.

    const evalMap = new Map();

    (aiEvaluations || []).forEach(e => {
        if (e && e.id !== undefined && e.id !== null) {
            evalMap.set(Number(e.id), e);
        }
    });
    const resolvedEvaluations = batchItems.map(item => {
        const aiEval = evalMap.get(item.id);
        if (aiEval && typeof aiEval.isGenuineOpportunity === 'boolean') {
            return { ...aiEval, id: item.id };
        }

        Logger.log(`[AI Evaluator] Candidate ID ${item.id} missing from AI response; applying heuristic fallback for this candidate only.`);
        const fallback = heuristicEvaluateCandidate(item);
        return { ...fallback, id: item.id };
    });
    return resolvedEvaluations;
}

let _geminiWorkingModelIndex = 0;
function runWithGeminiModelChain(apiKey, attemptFn, contextLabel) {
    const configured = (CONFIG.GEMINI_MODEL_FALLBACK_CHAIN || []).slice();
    const fallback = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-3.7-flash', 'gemini-3.8-flash'];
    const modelChain = configured.length ? configured : fallback;
    const maxAttempts = Math.min(modelChain.length, Number(CONFIG.GEMINI_MAX_MODEL_ATTEMPTS || modelChain.length));
    const label = contextLabel ? ` ${contextLabel}` : '';
    for (let i = _geminiWorkingModelIndex; i < maxAttempts; i++) {
        const model = modelChain[i];
        const attempt = attemptFn(model, apiKey);
        if (attempt.success) {
            _geminiWorkingModelIndex = i;
            if (i > 0) {
                Logger.log(`[Gemini${label}] Used fallback model "${model}" (chain position ${i + 1}/${maxAttempts}).`);
            } else {
                Logger.log(`[Gemini${label}] Active model: "${model}" (chain position 1/${maxAttempts}).`);
            }

            return attempt;
        }

        if (attempt.globalQuotaExhausted) {
            markGeminiDailyQuotaExhausted();
            Logger.log(`[Gemini${label}] Global/model quota exhausted; stopping Gemini fallback chain.`);
            return attempt;
        }

        const nextLabel = (i < maxAttempts - 1) ? `falling back to "${modelChain[i + 1]}"` : 'no fallback models left';
        Logger.log(`[Gemini${label}] Model "${model}" unavailable this run — ${attempt.reason}. ${nextLabel}.`);
    }

    return { success: false, reason: `all ${maxAttempts} Gemini model attempt(s) failed` };
}

function describeGeminiQuotaError(bodyText) {
    try {
        const parsed = JSON.parse(bodyText);
        const details = parsed.error && parsed.error.details;
        if (Array.isArray(details)) {
            const quotaFailure = details.find(d => typeof d['@type'] === 'string' && d['@type'].includes('QuotaFailure'));
            if (quotaFailure && Array.isArray(quotaFailure.violations) && quotaFailure.violations.length > 0) {
                return quotaFailure.violations

                    .map(v => `${v.quotaId || v.quotaMetric || 'unknown quota metric'}${v.quotaValue ? ` (limit: ${v.quotaValue})` : ''}`)

                    .join('; ');
            }
        }

        if (parsed.error && parsed.error.message) return parsed.error.message.substring(0, 300);
    } catch (e) { }

    return bodyText.substring(0, 300);
}

function tryGeminiModel(model, apiKey, payload) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const maxRetries = 2;
    for (let attemptNo = 0; attemptNo <= maxRetries; attemptNo++) {
        let response;

        try {
            response = UrlFetchApp.fetch(url, {
                method: 'POST',
                contentType: 'application/json',
                payload: JSON.stringify(payload),
                muteHttpExceptions: true
            });
        } catch (e) {
            return { success: false, reason: `network error (${e.message})` };
        }

        const code = response.getResponseCode();
        const bodyText = response.getContentText();
        if (code === 404) {
            return { success: false, reason: '404 model not found / unavailable for this API key' };
        }

        if (code === 401 || code === 403) {
            return { success: false, reason: `${code} authentication/permission error — check GEMINI_API_KEY` };
        }

        if (code === 400) {
            return { success: false, reason: `400 invalid request — ${bodyText.substring(0, 250)}` };
        }

        if (code === 429) {
            const quotaReason = describeGeminiQuotaError(bodyText);
            const isDailyExhausted = /perday|per_day|daily_quota|resource_exhausted_daily|requests_per_day/i.test(bodyText) ||

                /(?:exceeded|exhausted).*(?:daily|per[\s_-]?day|24\s*hour)/i.test(bodyText);
            if (isDailyExhausted) {
                return { success: false, globalQuotaExhausted: true, reason: `429 daily quota exhausted — ${quotaReason}` };
            }

            if (attemptNo < maxRetries) {
                Utilities.sleep(5000 * Math.pow(2, attemptNo));
                continue;
            }

            return { success: false, reason: `429 rate limited after retries — ${quotaReason}` };
        }

        if (code === 500 || code === 502 || code === 503 || code === 504) {
            if (attemptNo < 1) {
                Utilities.sleep(1500);
                continue;
            }

            return { success: false, reason: `HTTP ${code} transient server failure after retries` };
        }

        if (code !== 200) {
            return { success: false, reason: `HTTP ${code}: ${bodyText.substring(0, 250)}` };
        }

        let result;

        try {
            result = JSON.parse(bodyText);
        } catch (parseErr) {
            return { success: false, reason: 'unparseable response body' };
        }

        if (result.error) {
            return { success: false, reason: `API error (${result.error.message || JSON.stringify(result.error)})` };
        }

        const candidate = result.candidates && result.candidates[0];
        if (candidate && candidate.finishReason && candidate.finishReason !== 'STOP') {
            return { success: false, reason: `non-STOP finishReason (${candidate.finishReason})` };
        }

        if (!candidate || !candidate.content || !candidate.content.parts) {
            return { success: false, reason: 'no candidate content in response' };
        }

        const text = candidate.content.parts.map(p => p.text || '').filter(Boolean).join('\n');
        if (!text) return { success: false, reason: 'candidate content had no text parts' };

        try {
            return { success: true, data: JSON.parse(text) };
        } catch (e) {
            return { success: false, reason: 'could not parse model output as JSON' };
        }
    }

    return { success: false, reason: 'retries exhausted' };
}

function tryGeminiGroundedSearch(apiKey, prompt) {
    const models = (CONFIG.GEMINI_GROUNDED_SEARCH_MODELS || ['gemini-2.0-flash', 'gemini-3.5-flash', 'gemini-3.7-flash', 'gemini-3.8-flash']).slice();
    for (const model of models) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            tools: [{ google_search: {} }]
        };
        for (let attemptNo = 0; attemptNo <= 1; attemptNo++) {
            let response;
            try {
                response = UrlFetchApp.fetch(url, {
                    method: 'POST',
                    contentType: 'application/json',
                    payload: JSON.stringify(payload),
                    muteHttpExceptions: true
                });
            } catch (e) {
                Logger.log(`[Gemini Grounded Search] Network error on model ${model}: ${e.message}`);
                break;
            }

            const code = response.getResponseCode();
            const bodyText = response.getContentText();
            if (code === 200) {
                let result;
                try { result = JSON.parse(bodyText); } catch (e) { break; }
                const candidate = result.candidates && result.candidates[0];
                if (candidate && candidate.content && candidate.content.parts) {
                    const text = candidate.content.parts.map(p => p.text || '').filter(Boolean).join('\n');
                    if (text || (candidate.groundingMetadata && candidate.groundingMetadata.groundingChunks)) {
                        return { success: true, model: model, data: text, candidate: candidate };
                    }
                }
            } else if (code === 429) {
                if (attemptNo === 0) { Utilities.sleep(4000); continue; }
                Logger.log(`[Gemini Grounded Search] Model ${model} rate limited (HTTP 429): ${bodyText.substring(0, 160)}`);
            } else {
                Logger.log(`[Gemini Grounded Search] Model ${model} returned HTTP ${code}: ${bodyText.substring(0, 160)}`);
                break; // Fall through to next model in list
            }
        }
    }
    return { success: false, reason: 'all grounded search models failed or rate-limited' };
}

/**
 * UNICODE STYLED TEXT NORMALIZATION
 */

const STYLED_LETTER_RANGES = [
    [0x1D400, 0x1D419, 65], [0x1D41A, 0x1D433, 97], // Bold

    [0x1D434, 0x1D44D, 65], [0x1D44E, 0x1D467, 97], // Italic

    [0x1D468, 0x1D481, 65], [0x1D482, 0x1D49B, 97], // Bold Italic

    [0x1D5A0, 0x1D5B9, 65], [0x1D5BA, 0x1D5D3, 97], // Sans-Serif

    [0x1D5D4, 0x1D5ED, 65], [0x1D5EE, 0x1D607, 97], // Sans-Serif Bold

    [0x1D608, 0x1D621, 65], [0x1D622, 0x1D63B, 97], // Sans-Serif Italic

    [0x1D63C, 0x1D655, 65], [0x1D656, 0x1D66F, 97], // Sans-Serif Bold Italic

    [0x1D670, 0x1D689, 65], [0x1D68A, 0x1D6A3, 97], // Monospace
];
const STYLED_DIGIT_RANGES = [
    [0x1D7CE, 0x1D7D7], // Bold digits

    [0x1D7E2, 0x1D7EB], // Sans-Serif digits

    [0x1D7EC, 0x1D7F5], // Sans-Serif Bold digits

    [0x1D7F6, 0x1D7FF], // Monospace digits
];
function normalizeStylizedUnicodeText(text) {
    if (!text) return text;
    let result = '';
    for (const ch of text) {
        const cp = ch.codePointAt(0);
        let mapped = null;
        for (const [start, end, base] of STYLED_LETTER_RANGES) {
            if (cp >= start && cp <= end) { mapped = String.fromCharCode(base + (cp - start)); break; }
        }

        if (mapped === null) {
            for (const [start, end, base] of STYLED_DIGIT_RANGES) {
                if (cp >= start && cp <= end) { mapped = String.fromCharCode(48 + (cp - start)); break; }
            }
        }

        result += (mapped !== null) ? mapped : ch;
    }

    return result;
}

/**
 * LIGHTWEIGHT HTML ENTITY DECODER
 */

function decodeHtmlEntities(str) {
    if (!str) return '';
    return str

        .replace(/&amp;/gi, '&')

        .replace(/&lt;/gi, '<')

        .replace(/&gt;/gi, '>')

        .replace(/&quot;/gi, '"')

        .replace(/&#39;/gi, "'")

        .replace(/&apos;/gi, "'")

        .replace(/&nbsp;/gi, ' ')

        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))

        .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

/**
 * BARE GOVERNMENT / COUNTRY MASTHEAD & GENERIC DOCUMENT SHELL DETECTOR
 * Detects titles that are bare country/government names (e.g. "REPUBLIC OF KENYA")
 * or bare procurement category headers lacking substantive project/service subject.
 */

function isBareGovernmentOrGenericTitle(title) {
    if (!title) return true;
    const clean = String(title).trim().replace(/^[\s\(\[\{]+|[\s\)\]\}]+$/g, '');
    const GENERIC_TITLE_PATTERNS = [
        // Bare country, government, or ministry mastheads
        /^(?:the\s+)?(?:republic|government|state|kingdom|federation|ministry|department|secretariat)\s+of\s+[a-z\s]+$/i,
        /^(?:republic\s+of\s+kenya|government\s+of\s+kenya|kenya)$/i,
        /^(?:republic\s+of\s+rwanda|government\s+of\s+rwanda|rwanda)$/i,
        /^(?:republic\s+of\s+uganda|government\s+of\s+uganda|uganda)$/i,
        /^(?:united\s+republic\s+of\s+tanzania|government\s+of\s+tanzania|tanzania)$/i,
        /^(?:federal\s+republic\s+of\s+nigeria|government\s+of\s+nigeria|nigeria)$/i,
        /^(?:federal\s+democratic\s+republic\s+of\s+ethiopia|government\s+of\s+ethiopia|ethiopia)$/i,
        /^(?:republic\s+of\s+ghana|government\s+of\s+ghana|ghana)$/i,
        /^(?:republic\s+of\s+south\s+africa|government\s+of\s+south\s+africa|south\s+africa)$/i,
        /^(?:republic\s+of\s+zambia|government\s+of\s+zambia|zambia)$/i,
        /^(?:republic\s+of\s+zimbabwe|government\s+of\s+zimbabwe|zimbabwe)$/i,
        /^(?:republic\s+of\s+malawi|government\s+of\s+malawi|malawi)$/i,
        /^(?:republic\s+of\s+sudan|sudan|south\s+sudan)$/i,
        // Bare document shell / procurement category headings
        /^(?:request\s+for\s+proposals?|rfp|rfq|request\s+for\s+quotations?|invitation\s+(?:to|for)\s+bids?|ifb)(?:\s*[\(\[]?(?:rfp|rfq|ifb)[\)\]]?)?$/i,
        /^(?:request\s+for\s+(?:expressions?\s+of\s+interest|eoi)|expressions?\s+of\s+interest|eoi|call\s+for\s+expressions?\s+of\s+interest)(?:\s*[\(\[]?eoi[\)\]]?)?$/i,
        /^(?:call\s+for\s+(?:proposals?|applications?|concept\s+notes?))(?:\s*[\(\[]?(?:cfp|cfcn|rfp)[\)\]]?)?$/i,
        /^(?:tender\s+document|bidding\s+document|standard\s+bidding\s+document|notice\s+of\s+tender|tender\s+notice)$/i,
        /^(?:specific\s+procurement\s+notice|general\s+procurement\s+notice|procurement\s+notice|project-related\s+procurement|project\s+procurement)$/i,
        /^(?:consultancy\s+services?|consulting\s+services?|provision\s+of\s+services?|terms\s+of\s+reference|tor)$/i,
        /^(?:\(?eoi\)?\s*[-–—:]\s*)?provision\s+of\s+services?$/i,
        /^(?:request\s+for\s+proposal\s+for\s+consulting\s+firms?|request\s+for\s+proposals?\s+for\s+consulting\s+services?)$/i,
        /^(?:microsoft\s+word\s*[-–—].*|pdf\s+document|untitled\s+document|scan\s+document|document)$/i,
        /^[\w\s.-]+(?:'s|’s)\s+posts?$/i
    ];
    return GENERIC_TITLE_PATTERNS.some(re => re.test(clean));
}

/**
 * Sanitizes and normalizes raw opportunity titles:
 * - Strips document file extensions (.pdf, .docx, .doc, .xlsx)
 * - Decodes URL entities and percent-encodings
 * - Converts slugified/hyphenated filenames into human-readable spaced titles
 */
function formatCleanOpportunityTitle(rawTitle) {
    if (!rawTitle) return '';
    let clean = String(rawTitle).trim();
    clean = clean.replace(/^\[(?:pdf|doc|docx)\]\s*/i, '');
    clean = clean.replace(/\.(?:pdf|docx?|xlsx?|txt|rtf)$/i, '');
    clean = clean.replace(/\s*[-–—·]\s*(?:closes? in \d+ days?|closing soon).*$/i, '');
    clean = clean.replace(/\s*\|\s*(?:linkedin|grantedge global|facebook|[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\s*(?:\.\.\.|…)).*$/i, '');
    try { clean = decodeURIComponent(clean); } catch (e) {}
    if (!/\s/.test(clean) && /(?:[-_][a-zA-Z0-9]+){2,}/.test(clean)) {
        clean = clean.replace(/[-_]+/g, ' ');
    } else {
        clean = clean.replace(/\b([A-Za-z]{2,})[-_]([A-Za-z]{2,})[-_]([A-Za-z]{2,}(?:[-_][A-Za-z]{2,})*)\b/g, (m) => m.replace(/[-_]/g, ' '));
    }
    return clean.replace(/\s+/g, ' ').trim();
}

/**
 * REJECT NON-LISTING BOILERPLATE
 */

const NON_LISTING_TITLE_PATTERNS = [
    /^submit\b/i, /^topic\b/i, /^categor(y|ies)\b/i, /^filter\b/i,
    /^home$/i,
    /^about\s+(us|this\s+(site|page|program|project))\??$/i,
    /^contact(\s+us)?$/i,
    /^privacy(\s+policy)?$/i,
    /^terms\s+(and\s+conditions|of\s+(service|use))\b/i,
    /^sign\s?up$/i, /^log\s?in$/i, /^subscribe\b/i, /^faq/i,
    /^(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},?\s+\d{4}$/i,
    /^\d{1,2}\s+(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{4}$/i,
    // Awarded / completed contracts

    /\b(contract awards?|awarded tenders?|tender awards?|results of (bidding|tender|procurement))\b/i,
    /^awarded\b/i,
    /[\[\(](awarded|closed)[\]\)]/i,
    /\bstatus:\s*awarded\b/i,
    // Generic search / portal navigation / directory pages
    /^Funding for businesses\s*-\s*SAIGE Opportunity$/i,
    /^Browse opportunities\s*·\s*SAIGE Opportunity$/i,
    /^search for (grants|tenders|jobs|opportunities)\b/i,
    /^opportunities\s*–\s*page\s*\d+/i,
    /^tenders in \w+$/i,
    /^employers in \w+/i,
    /^jobs$/i,
    /^.*jobs\s*in\s*uganda$/i,
    // Generic notice headings lacking tender context
    /^(?:general|specific)?\s*procurement\s+notices?(?:\s*\([a-z0-9\s]+\))?$/i,
    /^gpn(?:\s*[-–—:].*)?$/i,
    /^procurement\s+notice(?:\s*\([a-z0-9\s]+\))?$/i,
    /^project-related\s+procurement$/i,
    /^procurement\s+(?:opportunities|notices|documents?)$/i,
    // Generic procurement process guidelines, portal policy banners, or titles embedding raw URLs
    /^(?:open\s+and\s+transparent\s+procurement|procurement\s+guidelines?|how\s+to\s+bid|tendering\s+procedures?|procurement\s+process)\b/i,
    /\((?:https?:\/\/)?(?:www\.)?[a-z0-9_-]+\.[a-z]{2,}\/?[^)]*\)/i,
    // Conferences, summits, symposiums, webinars, workshops, competitions, calendars, team building

    /\b(?:conference|summit|symposium|webinar|workshop|essay\s+writing|essay\s+contest|poster\s+contest|drawing\s+competition|training\s+calend[ae]r|team\s+building)\b/i,
    // Financial statements, annual reports, non-core facilities/canteen/taxi/security/audits

    /\b(?:annual\s+report|financial\s+statements?|audited\s+accounts?|audit\s+externe|external\s+audit|taxi\s+services?|cleaning\s+services?|security\s+guard|canteen|catering)\b/i,
    // Salaried staff vacancies / non-consultancy individual roles / internships

    /\b(?:chief of staff|programme officer|program officer|finance officer|hr officer|receptionist|data entry|executive director|driver|internship\s+programme|internship\s+program|internship\s+opportunit(?:y|ies)|paid\s+internship|graduate\s+trainee|apprenticeship)\b/i
];
function stripQueryAndHash(url) {
    return (url || '').split('#')[0].split('?')[0];
}

function looksLikeNonListingBoilerplate(title, link, listingPageUrl, description) {
    const trimmedTitle = (title || '').trim();
    if (NON_LISTING_TITLE_PATTERNS.some(re => re.test(trimmedTitle))) return true;
    if (listingPageUrl && stripQueryAndHash(link) === stripQueryAndHash(listingPageUrl)) return true;

    // Bare government/country mastheads and generic document shells:
    if (isBareGovernmentOrGenericTitle(trimmedTitle)) {
        const fullContext = `${trimmedTitle} ${link || ''} ${description || ''}`.toLowerCase();
        const hasExplicitProcurementSignal = /\b(?:rfp|rfq|tender|eoi|expressions?\s+of\s+interest|call\s+for\s+(?:proposals?|applications?|concept\s+notes?)|terms\s+of\s+reference|tor|consultanc(?:y|ies)|consulting\s+firm|grant\s+opportunit)\b/i.test(fullContext);
        const isGenericDirectoryUrl = /\/(?:category|categories|archive|document-library|procurement-notices|consultancy-tenders|all-tenders|tenders)\/?(?:[a-z0-9_-]+\/?)*$/i.test(stripQueryAndHash(link));
        if (!hasExplicitProcurementSignal || isGenericDirectoryUrl) {
            return true;
        }
    }
    if (link) {
        // Exclude salaried employment recruitment / job vacancies across all sources
        if (/(?:were[\s_-]?hiring|we[\s_-]?are[\s_-]?hiring|job[\s_-]?vacanc(?:y|ies)|staff[\s_-]?recruitment|employment[\s_-]?opportunit|career[\s_-]?opportunit|recruitment[\s_-]?(?:notice|alert|of)|hiring[\s_-]?(?:now|for|alert|in))/i.test(link)) return true;

        // Exclude general social media posts (Instagram, TikTok, YouTube, Threads)
        if (/https?:\/\/(?:www\.)?(?:instagram|youtube|tiktok|threads)\.(?:com|net)\b/i.test(link)) return true;

        // Facebook Handling: Allow public procurement posts, photos, stories, permalinks; block generic home, login, directory, personal profile roots

        if (/https?:\/\/(?:(?:[a-z]{2,3}\.)?facebook\.com|fb\.me|fb\.watch)\b/i.test(link)) {
            // Reject generic login, recover, dialog, sharer, policies, help

            if (/\/(?:login|recover|help|policies|sharer|privacy|settings)\b/i.test(link)) return true;

            // Reject non-procurement posts: require procurement / consultancy / grant / tender signals

            const fullText = `${title || ''} ${link || ''} ${description || ''}`;
            const isProcurementSignal = /\b(rfp|rfq|tender|eoi|expressions? of interest|call for (?:proposals?|applications?|concept notes?|expressions? of interest|ideas?|solutions?)|terms of reference|tor|consultanc(?:y|ies)|consulting|grant|funding|solicitation|procurement|market sounding|request for information|rfi|solution partner|(?:quotation|procurement)@[a-z0-9.-]+)\b/i.test(fullText);
            if (isProcurementSignal) {
                // Legitimate Facebook procurement announcement - allow through!
            } else {
                return true;
            }
        }

        // X (Twitter) Handling: Allow public procurement status posts; block generic user profiles, hashtags, lists, home

        if (/https?:\/\/(?:(?:[a-z]{2,3}\.)?(?:twitter|x)\.com|t\.co)\b/i.test(link)) {
            // Reject generic user profiles (no /status/), lists, hashtags, search, explore, home

            const isStatusTweet = /\/status\/\d+/i.test(link) || /t\.co\//i.test(link);
            if (!isStatusTweet) return true;

            // Reject non-procurement status tweets: require procurement / consultancy / grant / tender signals

            const fullText = `${title || ''} ${link || ''} ${description || ''}`;
            const isProcurementSignal = /\b(rfp|rfq|tender|eoi|expressions? of interest|call for (?:proposals?|applications?|concept notes?|expressions? of interest|ideas?|solutions?)|terms of reference|tor|consultanc(?:y|ies)|consulting|grant|funding|solicitation|procurement|market sounding|request for information|rfi|solution partner|(?:quotation|procurement)@[a-z0-9.-]+)\b/i.test(fullText);
            if (isProcurementSignal) {
                // Legitimate X/Twitter procurement announcement - allow through!
            } else {
                return true;
            }
        }

        // LinkedIn Handling: Allow public procurement/consultancy posts & pulse articles; block personal profiles and generic company pages

        if (/https?:\/\/(?:(?:[a-z]{2,3}\.)?linkedin\.com|lnkd\.in)\b/i.test(link)) {
            // Reject personal profiles (/in/), job vacancies (/jobs/), school pages, or generic company root/about/people

            if (/\/(?:in|jobs|school)\b/i.test(link)) return true;
            if (/\/company\/[^/?#]+(?:\/(?:about|people|life))?\/?$/i.test(link)) return true;

            // For LinkedIn posts/articles/feed updates or shortened post links (/p/), require procurement or consultancy intent

            // Check title, link slug, AND description/snippet to catch posts where procurement intent is in the text/slug rather than author headline

            const isPostOrArticle = /\/(?:posts|pulse|feed\/update|p\/)\b/i.test(link) || /lnkd\.in/i.test(link);
            const fullText = `${title || ''} ${link || ''} ${description || ''}`;
            const isProcurementSignal = /\b(rfp|rfq|tender|eoi|expressions? of interest|call for (?:proposals?|applications?|concept notes?|expressions? of interest|ideas?|solutions?)|terms of reference|tor|consultanc(?:y|ies)|consulting|grant|funding|solicitation|procurement|market sounding|request for information|rfi|solution partner|(?:quotation|procurement)@[a-z0-9.-]+)\b/i.test(fullText);
            if (isPostOrArticle && isProcurementSignal) {
                // Legitimate LinkedIn procurement announcement - allow through!
            } else {
                return true;
            }
        }

        // Exclude Indian local tenders aggregators

        if (/(?:bidassist|tenderdetail|tendersinfo)\.com/i.test(link)) return true;

        // Exclude news, press releases, team/bio pages unless title explicitly has procurement terms

        if (/\/(?:media-centre\/latest-news|news|press-releases?|annual-reports?|people\/researchers|board-of-directors)\b/i.test(link)) {
            if (!/\b(rfp|rfq|tender|eoi|expression of interest|call for proposals?|consultanc(?:y|ies))\b/i.test(title)) return true;
        }

        // Exclude paginated document category index pages, e.g. /documents/.../16 or /category/.../page/3

        if (/\/(?:documents?|tenders?|procurement|notices|consultants?)\/(?:[a-z0-9_-]+\/)*\d+$/i.test(link)) return true;
        if (/\/(?:documents?|category|page)\/\d+(?:\/|$|\?)/i.test(link)) return true;

        // Exclude contract awards URLs (e.g. developmentaid.org/awards/view/..., afdb.org/.../contract-awards...)

        if (/\/(?:contract-)?awards?(?:\/|$|\?)/i.test(link)) return true;

        // Exclude FundsforNGOs individual grants/fellowships/challenges (/individuals/)
        if (/fundsforngos\.org\/individuals\//i.test(link)) return true;

        // Exclude developer hackathons, coding challenges, student ideathons, buildathons
        if (/\b(?:hackathons?|ideathons?|datathons?|buildathons?|coding\s+challenges?|developer\s+challenges?)\b/i.test(title) && !/\b(?:challenge\s+funds?|enterprise\s+challenge)\b/i.test(title)) return true;

        // Exclude SAIGE Opportunity aggregator / catalog / directory root pages:
        // Only individual opportunity slugs (e.g. saigeopportunity.org/opportunities/slug) are valid opportunities.
        if (/https?:\/\/(?:www\.)?saigeopportunity\.org\/?(?:[?#].*)?$/i.test(link) ||
            /https?:\/\/(?:www\.)?saigeopportunity\.org\/(?:opportunities\/?(?:\?[^#]*)?$|directory|map|readiness|organizations|account)/i.test(link)) {
            return true;
        }

        // Exclude generic search / index / directory URLs

        if (/\/(?:grants|tenders|jobs)\/search\b/i.test(link)) return true;
        if (/\/jobs\/?(?:\?.*)?$/i.test(link) && !/\/jobs\/\d+/i.test(link) && !/\/jobs\/detail\//i.test(link)) return true;
        if (/\/job-categories\//i.test(link) || /\/employers\//i.test(link)) return true;
    }

    return false;
}

/**
 * CANDIDATE DEDUPLICATION & FILTERING
 * O(1) deduplication: checks against Sets and immediately adds accepted candidate
 * to Sets so subsequent candidates in the same run are deduplicated in O(1) time.
 */

function addCandidateIfNew(sourceName, rawTitle, link, rawDescription, existingLinks, existingTitleKeys, bucket, assumeAfrican, listingPageUrl, excludeLinkPatterns, precomputedScore, feedStats) {
    if (feedStats) feedStats.seen++;
    if (!rawTitle || !link) return;
    const cleanLink = canonicalizeUrl(link);
    const title = decodeHtmlEntities(normalizeStylizedUnicodeText(rawTitle));
    const description = decodeHtmlEntities(normalizeStylizedUnicodeText(rawDescription));
    const combinedText = `${title} ${description || ''} ${link}`.toLowerCase();

    // Enhancement 5: Addendum & Deadline Extension Detector
    const isAddendumSignal = /\b(?:addendum(?:\s+(?:no\.?|number)?\s*\d+)?|corrigendum|deadline\s+exten(?:sion|ded)|extended\s+deadline|extension\s+of\s+submission|amendment(?:\s+(?:no\.?|number)?\s*\d+)?)\b/i.test(combinedText);
    const refCode = extractProcurementRefCode(link, title);

    if (isAddendumSignal && existingLinks && existingLinks.sheet) {
        let matchedRow = null;
        if (refCode && existingLinks.refCodeRowMap && existingLinks.refCodeRowMap.has(refCode)) {
            matchedRow = existingLinks.refCodeRowMap.get(refCode);
        } else if (existingLinks.titleRowMap) {
            const titleKey = normalizeTitleKey(title);
            if (existingLinks.titleRowMap.has(titleKey)) {
                matchedRow = existingLinks.titleRowMap.get(titleKey);
            }
        }

        if (matchedRow) {
            // Found existing tracked opportunity matching this addendum/extension!
            const closingCheck = heuristicClosingCheck(combinedText);
            const newClosingDate = closingCheck && closingCheck.closingDate !== 'Not Specified' ? closingCheck.closingDate : null;

            if (newClosingDate && newClosingDate !== matchedRow.closingDate) {
                try {
                    // Update Closing Date (Col 6)
                    existingLinks.sheet.getRange(matchedRow.rowNumber, 6).setValue(newClosingDate);
                    // Update Status (Col 5)
                    existingLinks.sheet.getRange(matchedRow.rowNumber, 5).setValue('OPEN (Extended)')
                        .setBackground('#c8e6c9').setFontColor('#1b5e20');
                    // Update Executive Summary (Col 10)
                    const currentSummary = matchedRow.summary || '';
                    if (!currentSummary.includes('Deadline extended')) {
                        const updatedSummary = `[Deadline extended to ${newClosingDate} per Addendum] ${currentSummary}`.substring(0, 1000);
                        existingLinks.sheet.getRange(matchedRow.rowNumber, 10).setValue(updatedSummary);
                    }
                    Logger.log(`[ADDENDUM DETECTED] Opportunity "${matchedRow.title}" (Ref: ${refCode || 'N/A'}) deadline extended to ${newClosingDate}. Updated row ${matchedRow.rowNumber}.`);
                    if (feedStats) feedStats.duplicate++;
                    return;
                } catch (addendumErr) {
                    Logger.log(`[ADDENDUM ERROR] Failed to update row ${matchedRow.rowNumber}: ${addendumErr.message}`);
                }
            } else {
                Logger.log(`[ADDENDUM NOTE] Matched addendum for "${matchedRow.title}" (Row ${matchedRow.rowNumber}), but no new deadline date extracted. Preserving logged opportunity.`);
                if (feedStats) feedStats.duplicate++;
                return;
            }
        }
    }

    if (existingLinks.has(cleanLink) || existingLinks.has(link)) {
        if (feedStats) feedStats.duplicate++;

        return;
    }

    if (refCode && existingLinks.refCodes && existingLinks.refCodes.has(refCode)) {
        if (feedStats) feedStats.duplicate++;

        return;
    }

    if (excludeLinkPatterns && excludeLinkPatterns.some(re => re.test(link))) {
        if (feedStats) { feedStats.filtered++; feedStats.preAiRejected++; }

        return;
    }

    if (looksLikeNonListingBoilerplate(title, link, listingPageUrl, description)) {
        if (feedStats) { feedStats.boilerplate++; feedStats.filtered++; feedStats.preAiRejected++; }

        return;
    }

    // Social Media Gatekeeper: Discard social posts lacking explicit procurement keywords
    const isSocialSource = /facebook|linkedin|twitter|\bx\.com\b/i.test(sourceName) || /(?:facebook\.com|linkedin\.com|twitter\.com|x\.com)/i.test(link);
    if (isSocialSource) {
        const hasProcurementSignal = /\b(?:request\s+for\s+proposals?|rfp|expression\s+of\s+interest|eoi|call\s+for\s+proposals?|call\s+for\s+applications?|call\s+for\s+concept\s+notes?|rfcn|cfcn|terms\s+of\s+reference|tor|tender|procurement\s+notice|consultancy\s+services?|grant\s+opportunit(?:y|ies)|concept\s+notes?|market\s+sounding|appel\s+[aà]\s+propositions?|appel\s+d['’]offres?|manifestation\s+d['’]int[eé]r[eê]t|asmi\b)\b/i.test(combinedText);
        if (!hasProcurementSignal) {
            if (feedStats) { feedStats.boilerplate++; feedStats.filtered++; feedStats.preAiRejected++; }
            return;
        }
        const isSocialNoise = /\b(?:project\s+staff\s+recruitment|recruitment\s+of\s+staff|internal\s+vacancy|job\s+vacanc(?:y|ies)|staff\s+recruitment|hiring\s+for|hiring\s+in|we\s+are\s+hiring|we're\s+hiring|were[\s_-]?hiring|hiring[\s_-]?(?:now|alert|notice)|salaried\s+position|job\s+alert|brics\s+backing|standards\s+organisation\s+of\s+nigeria\s+-\s+son|arrested|alleged\s+corruption|court\s+appearance|pleaded\s+guilty|fraud\s+charges|police\s+say|sentenced\s+to|bribery|tender\s+fraud)\b/i.test(combinedText) ||
            /(?:were[\s_-]?hiring|we[\s_-]?are[\s_-]?hiring)/i.test(link);
        if (isSocialNoise) {
            if (feedStats) { feedStats.boilerplate++; feedStats.filtered++; feedStats.preAiRejected++; }
            return;
        }
    }

    // Closed / awarded check in snippet / combined text (catches DevelopmentAid "Closed grant —", "Closed tender —", etc.)

    if (/\b(contract award notice|status:\s*awarded|contract was awarded to|contract has been awarded to|contract awarded to|bidder awarded:|closed grant|closed tender|status:\s*closed)\b/i.test(combinedText)) {
        if (feedStats) { feedStats.boilerplate++; feedStats.filtered++; feedStats.preAiRejected++; }

        return;
    }

    if (isLikelyStaleListing(combinedText)) {
        if (feedStats) { feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }

        return;
    }

    // Universal Publication Date Freshness Gate:
    // Discard only if the explicit publication date is from a prior calendar year (e.g. 2025, 2024)
    // without any current or future year (2026+) context in the listing.
    // Fresh opportunities from the current year (2026+) or rolling/dateless opportunities must NEVER be dropped.
    const pubDateMatch = combinedText.match(/\bpublished[\s:]+([a-z0-9,\s\/:\-]+?)(?:\s*\||\s*$)/i);
    if (pubDateMatch) {
        const rawPubDate = pubDateMatch[1].trim();
        const parsedPubDate = parseDateFlexible(rawPubDate);
        if (parsedPubDate && !isNaN(parsedPubDate.getTime())) {
            const pubYear = parsedPubDate.getFullYear();
            const currentYear = getCurrentYear();
            if (pubYear < currentYear && !/\b202[6-9]\b/.test(combinedText)) {
                if (feedStats) { feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }

                return;
            }
        }
    }

    // Pre-AI negative filter: discard obvious civil works, railway, municipal hardware, curriculum, medical supplies, and non-agri sectors lacking seed/crop context

    const NON_AGRI_CIVIL_WORKS_REGEX = /\b(?:prasa\b|traction substation|substations?|ohte equipment|airfield|airports?|aérodrome|ground lighting|motor spares|water pipes|air conditioning|reconstruction des infrastructures|réhabilitation logement|smart classroom|appareils numériques|biometric registration kit|id cards and printing|wellness essentials|curved display platform|ageroute\b|asphalt|bitumen|road rehabilitation|travaux de bitumage|travaux\s+routiers?|axe\s+routier|route\s+rev[eê]tue|fourniture de bureau|véhicules 4x4|fourniture de carburant|stations? météo|logement d'astreinte|bâtiments administratifs|nettoyage des locaux|gardiennage|guarding\s+services?|security\s+guards?|armed\s+guards?|security\s+services?|physical\s+security|supply\s+(?:and\s+delivery\s+)?of\s+(?:urea|bulk|npk|chemical)\s+fertilizer|fertilizer\s+delivery|automated.*processing\s+equipment|processing\s+equipment|milling\s+equipment|oil\s+processing\s+equipment|heavy\s+machinery|plant\s+machinery|industrial\s+equipment|drilling\s+(?:and\s+equipping\s+)?of\s+boreholes?|equipping\s+of\s+boreholes?|water\s+trucking|borehole\s+drilling|pre[-_\s]?seed\b|angel\s+invest(?:ment|or)|venture\s+capital|equity\s+fund(?:ing)?|series\s+[a-c]\s+funding|incubator\s+cohort|ploughs?|donkey drawn|tractors?\s+with\s+implements|market\s+stalls?|market\s+shed|livestock\s+market|factory\s+extension|travaux\s+de\s+construction|construction\s+of\s+new\s+office|building\s+construction|construction\s+of\s+irrigation\s+canals|spillway|embankment\s+dam|dam\s+instrumentation|périmètre\s+irrigué|prisons?\b|national\s+backbone|cross\s+border\s+links|plans?\s+d'actions?\s+de\s+réinstallation|resettlement\s+action\s+plan|supply\s*&\s*deliver\s+fresh\s+fruits|supply\s*&\s*deliver\s+live\s+(?:chickens|poultry|sheep|goats|livestock)|supply\s*&\s*deliver\s+building\s+hardware|fodder\s+chopper|crop\s+residue\s+crusher|lng\s+terminal|liquefied\s+natural\s+gas|crude\s+oil|petroleum|oil\s+refinery|diesel\s+generator|generator\s+set|maths|mathematics|secondary\s+school\s+curriculum|curriculum\s+\(rsmc\)|provision\s+of\s+printing|printing\s+and\s+binding|medical\s+supply|hospital\s+supplies|clinical\s+supplies|pharmaceuticals?|mineral\s+value\s+chain|mineral\s+economist|chevening\s+master(?:'|’)?s\s+scholarships?|inclusive\s+cities|smart\s+cities\s+charter|urban\s+transport|housing\s+and\s+urban|cybercriminalité|cybersecurity|cyber-security|cyber\s+security|réalité\s+augmentée|augmented\s+reality|virtual\s+reality|réalité\s+virtuelle|software\s+development|développement\s+logiciel|data\s+centre|data\s+center|réseau\s+informatique|csu\s+equipment|equipamento\s+necessario\s+para\s+o\s+csu|computer\s+lab|fibre\s+optic|cloud\s+computing|data\s+science\s+curriculum|dell|lenovo|hp\s+laptops?|tablets?\s+and\s+laptops?|laptops?\s+and\s+tablets?|ssl\s+certificates?|procurement\s+of\s+servers?|server\s+hardware|network\s+switches|photocopiers?|toner\s+cartridges?|office\s+stationery|office\s+furniture|headphones|external drive|double-door refrigerator|refrigerators?|standing tables?|monitor cables?|provision of legal services|violences?\s+basées?\s+sur\s+le\s+genre|gender[-_\s]+based\s+violence|\bvbg\b|\bgbv\b|travel\s+audit|credit\s+life\s+policy|insurance\s+premiums|claims\s+administration|équipements?\s+de\s+p[eê]che|matériel\s+de\s+p[eê]che|outils\s+et\s+d\'équipements?\s+de\s+p[eê]che|marine\s+fisheries|marine\s+fishing|deep[-_\s]sea\s+fisheries|breeding\s+(?:sheep|goats|cattle|pigs|chickens|poultry)|petits\s+ruminants|poussins|alevins|aliments?\s+bétail|midi\s*bus(?:es)?|bus\s+spare\s+parts|spare\s+parts|polyten[e]?\s+tubes?|polythene\s+tubes?|polyethylene\s+tubes?|surplus\s+it\s+assets|written[-_\s]off\s+computer)\b/i;
    if (NON_AGRI_CIVIL_WORKS_REGEX.test(combinedText)) {
        const hasSeedOrCrop = CORE_SEED_KEYWORDS.some(k => new RegExp('(?:^|[^a-zA-Z0-9_])' + escapeRegex(k) + '(?:$|[^a-zA-Z0-9_])', 'i').test(combinedText)) || /\b(seed|semence|semences|variety|vari[eé]t[eé]|breeder|s[eé]lectionneur|germplasm|ressources\s+phytog[eé]n[eé]tiques|crop|culture|agrodealer|agro-dealer|agro\s+dealer|agrodelear|agro-delear|gmo|ogm|biosafety|bios[eé]curit[eé]|biotech|biotechnologie|transgenic|transg[eé]nique|agtech|agritech|agri[-\s]?tech)s?\b/i.test(combinedText);
        if (!hasSeedOrCrop) {
            if (feedStats) { feedStats.lowRelevance++; feedStats.filtered++; feedStats.preAiRejected++; }

            return;
        }
    }

    // Pre-AI physical goods/equipment supply check: discard pure supply and delivery of equipment or farming input kits
    const isPhysicalEquipmentSupply = /\b(?:supply\s+(?:and|&)\s+delivery\s+of\s+equipment|farming\s+inputs?\s+kits?)\b/i.test(combinedText);
    if (isPhysicalEquipmentSupply && !/\b(?:advisory|consultanc(?:y|ies)|study|assessment|policy|strategy|evaluation|training|capacity\s+building|formation|renforcement|[eé]tude|strat[eé]gie|politique|conseil)\b/i.test(combinedText)) {
        if (feedStats) { feedStats.lowRelevance++; feedStats.filtered++; feedStats.preAiRejected++; }

        return;
    }

    // Pre-AI deadline check: drop already-closed/expired tenders before burning AI calls

    const closingCheck = heuristicClosingCheck(combinedText);
    if (!closingCheck.isOpen && closingCheck.closingDate !== 'Not Specified') {
        if (feedStats) { feedStats.stale++; feedStats.filtered++; feedStats.preAiRejected++; }

        return;
    }

    if (!assumeAfrican && !isAfricaRelated(combinedText)) {
        if (feedStats) { feedStats.notAfrican++; feedStats.filtered++; feedStats.preAiRejected++; }

        return;
    }

    const relevance = (typeof precomputedScore === 'number' && precomputedScore > 0) ? precomputedScore : getAgriMatchScore(combinedText);

    // Relevance is diagnostic only before AI. Do not discard a potentially useful

    // opportunity solely because a portal's short title/snippet lacks seed keywords.

    if (relevance < CONFIG.MIN_RELEVANCE_SCORE) {
        if (feedStats) { feedStats.lowRelevance++; feedStats.preAiRejected++; feedStats.filtered++; }

        return;
    }

    const titleKey = normalizeTitleKey(title);
    if (isFuzzyTitleDuplicate(titleKey, existingTitleKeys)) {
        if (feedStats) feedStats.duplicate++;

        return;
    }

    // Immediately register into Sets for O(1) lookups

    existingLinks.add(link);
    existingLinks.add(cleanLink);
    existingTitleKeys.add(titleKey);
    if (refCode && existingLinks.refCodes) existingLinks.refCodes.add(refCode);
    bucket.push({ source: sourceName, title, link, description });
    if (feedStats) feedStats.accepted++;
}

/**
 * HELPER & UTILITY FUNCTIONS
 */

function resetQuotaGuards() {
    const props = PropertiesService.getScriptProperties();
    props.deleteProperty('GEMINI_QUOTA_DATE');
    props.deleteProperty('GEMINI_QUOTA_COUNT');

    const cache = (typeof CacheService !== 'undefined' && CacheService.getScriptCache) ? CacheService.getScriptCache() : null;
    (CONFIG.RENDER_PROVIDERS || []).forEach(provider => {
        const safeName = provider.name.replace(/[^A-Za-z0-9]+/g, '_').toUpperCase();
        props.deleteProperty(`RENDER_${safeName}_COUNT`);
        props.deleteProperty(`RENDER_${safeName}_PERIOD`);
        if (cache) {
            try {
                cache.remove('EXHAUSTED_' + provider.name);
                const pool = getRenderProviderKeyPool(provider);
                (pool || []).forEach(k => cache.remove('DEAD_RENDER_KEY_' + k));
            } catch (e) {
                Logger.log(`[Cache Warning] Failed to clear render provider cache: ${e.message}`);
            }
        }
    });

    // Reset dead Serper keys and search fallback caches
    if (cache) {
        try {
            const serperPool = getSerperApiKeyPool();
            (serperPool || []).forEach(k => cache.remove('DEAD_SERPER_KEY_' + k));
            ['ifad_org', 'asareca_org', 'ilri_org', 'cimmyt_org', 'locatefund_com', 'ungm_org_Public_Notice', 'afdb_org', 'ted_europa_eu'].forEach(d => {
                cache.remove('FALLBACK_DATA_' + d);
            });
            cache.remove('CIMMYT_WORKABLE_JOBS');
        } catch (e) {
            Logger.log(`[Cache Warning] Failed to clear Serper cache: ${e.message}`);
        }
    }

    _serperActiveKeyIndex = 0;
    Logger.log('Gemini daily quota counter, discovery reserve, render-provider credit counters, and Serper key blacklists have been reset.');
}

function sampleRoundRobin(perSourceBuckets, overallCap, sheetLinks, sheetTitleKeys) {
    const sourceNames = Object.keys(perSourceBuckets);
    const cursors = {};
    sourceNames.forEach(name => cursors[name] = 0);
    const result = [];
    const selectedLinks = new Set();
    const selectedTitleKeys = new Set();
    let progressMade = true;
    while (result.length < overallCap && progressMade) {
        progressMade = false;
        for (const name of sourceNames) {
            if (result.length >= overallCap) break;
            const bucket = perSourceBuckets[name];
            while (cursors[name] < bucket.length) {
                const candidate = bucket[cursors[name]];

                cursors[name]++;

                // Double check against sheetLinks and sheetTitleKeys to guarantee

                // that existing opportunities already logged on the sheets are skipped, giving new ones a chance.

                const cleanLink = canonicalizeUrl(candidate.link);
                const titleKey = normalizeTitleKey(candidate.title);
                if (sheetLinks && (sheetLinks.has(cleanLink) || sheetLinks.has(candidate.link))) {
                    continue; // Skip existing link already on sheet
                }

                if (sheetTitleKeys && isFuzzyTitleDuplicate(titleKey, sheetTitleKeys)) {
                    continue; // Skip existing title already on sheet
                }

                // Prevent intra-pool duplicates across different buckets in current run

                if (selectedLinks.has(cleanLink) || selectedLinks.has(candidate.link)) {
                    continue;
                }

                if (isFuzzyTitleDuplicate(titleKey, selectedTitleKeys)) {
                    continue;
                }

                selectedLinks.add(cleanLink);
                selectedLinks.add(candidate.link);
                selectedTitleKeys.add(titleKey);
                result.push(candidate);
                progressMade = true;
                break; // Next source in round-robin
            }
        }
    }

    return result;
}

function getLocalDateKey() {
    return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

function getLocalMonthKey() {
    return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM');
}

function getGeminiRemainingQuota() {
    const props = PropertiesService.getScriptProperties();
    const today = getLocalDateKey();
    const storedDate = props.getProperty('GEMINI_QUOTA_DATE');
    let count = parseInt(props.getProperty('GEMINI_QUOTA_COUNT') || '0', 10);
    if (storedDate !== today) count = 0;
    return Math.max(0, Number(CONFIG.GEMINI_DAILY_CALL_LIMIT || 0) - count);
}

function consumeGeminiDailyQuota(purpose) {
    const props = PropertiesService.getScriptProperties();
    const today = getLocalDateKey();
    const storedDate = props.getProperty('GEMINI_QUOTA_DATE');
    let count = parseInt(props.getProperty('GEMINI_QUOTA_COUNT') || '0', 10);
    if (storedDate !== today) {
        count = 0;
        props.setProperty('GEMINI_QUOTA_DATE', today);
    }

    const limit = Number(CONFIG.GEMINI_DAILY_CALL_LIMIT || 0);
    const reserve = Number(CONFIG.GEMINI_EVALUATION_RESERVE || 0);
    const isDiscovery = purpose === 'discovery';
    const minimumRemaining = isDiscovery ? Math.max(reserve, Number(CONFIG.GEMINI_DISCOVERY_MIN_REMAINING || 0)) : 0;
    if (count >= limit) return false;
    if (isDiscovery && (limit - count) <= minimumRemaining) return false;
    props.setProperty('GEMINI_QUOTA_COUNT', String(count + 1));
    return true;
}

function markGeminiDailyQuotaExhausted() {
    const props = PropertiesService.getScriptProperties();
    const today = getLocalDateKey();
    props.setProperty('GEMINI_QUOTA_DATE', today);
    props.setProperty('GEMINI_QUOTA_COUNT', String(CONFIG.GEMINI_DAILY_CALL_LIMIT));
}

function generateFallbackBatch(batchItems) {
    return batchItems.map(item => {
        const heuristic = heuristicEvaluateCandidate(item);
        return {
            id: item.id,
            isGenuineOpportunity: heuristic.isGenuineOpportunity,
            isOpen: heuristic.isOpen,
            closingDate: heuristic.closingDate,
            businessFit: heuristic.businessFit,
            confidence: heuristic.confidence,
            goNoGo: heuristic.goNoGo,
            score: heuristic.score,
            pillar: heuristic.pillar,
            summary: heuristic.summary,
            specificOpportunityTitle: null,
            biddingModality: heuristic.biddingModality,
            partnerStrategy: heuristic.partnerStrategy
        };
    });
}

function heuristicEvaluateCandidate(item) {
    const text = `${item.title || ''} ${item.description || ''}`.toLowerCase();
    const procurementTerms = [
        'rfp', 'request for proposals', 'request for quotation', 'rfq',
        'expression of interest', 'eoi', 'tender', 'call for proposals',
        'call for concept notes', 'request for concept notes', 'rfcn',
        'concept note', 'concept notes', 'consultancy', 'consultant', 'expert',
        'terms of reference', 'tor', 'grant', 'matching grant',
        'challenge fund', 'innovation fund'
    ];
    const nonOpportunityTerms = [
        'webinar', 'workshop', 'conference', 'event', 'newsletter', 'bulletin',
        'vacancy', 'job opportunity', 'employment', 'career', 'contract award',
        'awarded', 'award notice', 'results of bidding'
    ];
    const hasProcurement = procurementTerms.some(term => text.includes(term));
    const looksNonOpportunity = nonOpportunityTerms.some(term => text.includes(term)) && !/request for proposals|expression of interest|\brfp\b|\brfq\b|\btender\b/i.test(text);
    const isGenuine = hasProcurement && !looksNonOpportunity && !isGenericPortalNavigation(text, item.title, item.link);
    const closing = heuristicClosingCheck(item.description || item.title || '');
    const relevance = getAgriMatchScore(text);
    const score = Math.min(100, Math.max(0, relevance * 5));
    const businessFit = relevance >= 6 ? 'HIGH' : relevance >= 3 ? 'MEDIUM' : relevance >= 2 ? 'LOW' : 'NONE';
    const confidence = isGenuine ? 72 : 86;
    let pillar = 'Unclassified (AI unavailable)';
    if (/policy|regulat|certif|seed law|variety release|registration|inspector|gazett|gmo|biosafety|transgenic|biotech|gene editing/.test(text)) pillar = 'Policy & Regulatory Advisory';
    else if (/seed system|production|multiplication|breeder|foundation|certified seed|egs/.test(text)) pillar = 'Seed Systems & Market Development';
    else if (/scoping|feasibility|baseline|thematic study|market assessment|planting material|nursery|fodder|pasture/.test(text)) pillar = 'Technical Studies & Scoping Exercises';
    else if (/quality|traceab|counterfeit|scratch|testing|inspection|rimi|m3|verification/.test(text)) pillar = 'Digital Platforms, Seed IT & Verification';
    else if (/digital|ict|platform|database|mbeguchoice|vin|software|app\b/.test(text)) pillar = 'Digital Platforms, Seed IT & Verification';
    else if (/agrodealer|agro-dealer|last-mile|retailer|stockist|input distribution|association/.test(text)) pillar = 'Agrodealer Network & Association Development';
    else if (/youth|women|incubat|accelerat|agribusiness|enterprise|business model/.test(text)) pillar = 'Agribusiness, Youth & Seed Enterprise Development';
    else if (/training|capacity building|curriculum|toolbox|institution/.test(text)) pillar = 'Capacity Building & Institutional Strengthening';
    else if (/mel\b|monitoring|evaluation|learning|advisory|review|convening/.test(text)) pillar = 'Strategic Advisory, MEL & Stakeholder Convenings';
    const goNoGo = !isGenuine ? 'NO-GO' : (businessFit === 'HIGH' && closing.isOpen ? 'MAYBE' : 'NO-GO');
    const summary = !isGenuine

        ? `${item.title}. Heuristic screening could not verify this as a specific actionable procurement solicitation, so it was not promoted to the active RFP list.`

        : `${item.title}. AI evaluation was unavailable, so the opportunity was conservatively screened using procurement, relevance, and closing-date heuristics and requires manual review.`;

    let biddingModality = 'LEAD_BIDDER';
    let partnerStrategy = 'Direct Prime Advisory Consultant';
    if (/usaid|world bank|feed the future|multi-million|consortium|prime|large-scale|nationwide|facility/i.test(text)) {
        biddingModality = 'CONSORTIUM_PARTNER';
        partnerStrategy = 'Prime candidate: DAI / Chemonics / RTI; AE as Seed Systems & Policy Specialist';
    } else if (goNoGo === 'NO-GO' || score < 40) {
        biddingModality = 'NOT_APPLICABLE';
        partnerStrategy = '';
    }

    const detectedCountry = extractOpportunityCountries(item.title, item.description, '', item.link, item.source);

    return {
        isGenuineOpportunity: isGenuine,
        isOpen: isGenuine ? closing.isOpen : false,
        closingDate: closing.closingDate,
        businessFit,
        confidence,
        goNoGo,
        score,
        pillar,
        summary,
        country: detectedCountry,
        biddingModality,
        partnerStrategy
    };
}

function resolveBiddingModality(biddingModality, partnerStrategy, score, goNoGo, title, description, source) {
    if (biddingModality === 'CONSORTIUM_PARTNER') {
        return `CONSORTIUM (${partnerStrategy || 'Partner with Prime'})`;
    }
    if (biddingModality === 'LEAD_BIDDER') {
        return 'LEAD BIDDER (Prime)';
    }

    const combined = `${title || ''} ${description || ''} ${source || ''}`.toLowerCase();
    const isConsortiumType = /\b(usaid|world bank|feed the future|multi-million|consortium|prime contractor|large-scale|nationwide|facility|commercialization program|global fund|horizon europe)\b/i.test(combined);
    if (isConsortiumType) {
        return 'CONSORTIUM (Partner with Prime)';
    }
    return 'LEAD BIDDER (Prime)';
}

function heuristicClosingCheck(description) {
    if (!description) return { isOpen: true, closingDate: 'Not Specified' };
    const monthNames = '(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Sept|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)';

    // Matches: 2026-09-30, 17-Jul-2026, 17 July 2026, July 17 2026, 30/09/2026, etc.

    const datePattern = `(\\d{4}-\\d{2}-\\d{2}|\\d{1,2}(?:st|nd|rd|th)?[\\s\\/\\-]+${monthNames}[\\s\\/\\-]+\\d{2,4}|${monthNames}[\\s\\/\\-]+\\d{1,2}(?:st|nd|rd|th)?,?[\\s\\/\\-]+\\d{4}|\\d{1,2}[\\/\\-]\\d{1,2}[\\/\\-]\\d{2,4})`;
    const closingContextRegex = new RegExp(`(?:clos\\w*|deadline|due date|due by|expir\\w*|submission)[^.|]{0,60}?${datePattern}`, 'i');
    const match = description.match(closingContextRegex);

    // Only evaluate deadline if explicitly preceded by a closing/deadline keyword.

    // Never fall back to arbitrary dates (e.g. publication dates, historical references) as deadlines.

    if (!match) return { isOpen: true, closingDate: 'Not Specified' };
    const rawDate = match[1];
    let parsed = parseDateFlexible(rawDate);
    if (!parsed || isNaN(parsed.getTime())) return { isOpen: true, closingDate: 'Not Specified' };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isOpen = parsed.getTime() >= today.getTime();
    const closingDate = Utilities.formatDate(parsed, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    return { isOpen, closingDate };
}

function parseDateFlexible(rawDate) {
    if (!rawDate) return null;
    if (rawDate instanceof Date) {
        return isNaN(rawDate.getTime()) ? null : rawDate;
    }
    const str = String(rawDate).trim();
    if (!str) return null;
    const cleaned = str.replace(/(?:st|nd|rd|th)/gi, '').trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) return new Date(`${cleaned}T23:59:59`);

    // Format: DD-Mon-YYYY or DD Month YYYY (e.g., 17-Jul-2026 or 17 July 2026)

    const dmyMatch = cleaned.match(/^(\d{1,2})[\s\/\-]+([a-z]+)[\s\/\-]+(\d{2,4})$/i);
    if (dmyMatch) {
        const day = parseInt(dmyMatch[1], 10);
        const monStr = dmyMatch[2].toLowerCase().substring(0, 3);
        let year = parseInt(dmyMatch[3], 10);
        if (year < 100) year += 2000;
        const months = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
        if (months[monStr] !== undefined) {
            return new Date(year, months[monStr], day, 23, 59, 59);
        }
    }

    // Format: DD/MM/YYYY or DD-MM-YYYY

    const numMatch = cleaned.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
    if (numMatch) {
        const d1 = parseInt(numMatch[1], 10);
        const d2 = parseInt(numMatch[2], 10);
        let yr = parseInt(numMatch[3], 10);
        if (yr < 100) yr += 2000;
        if (d1 > 12) return new Date(yr, d2 - 1, d1, 23, 59, 59);
        return new Date(yr, d2 - 1, d1, 23, 59, 59);
    }

    const standardParsed = new Date(cleaned);
    return isNaN(standardParsed.getTime()) ? null : standardParsed;
}

function fetchWithRetry(url, options, maxRetries, retryDelayMs) {
    maxRetries = (typeof maxRetries === 'number') ? maxRetries : 1;
    retryDelayMs = (typeof retryDelayMs === 'number') ? retryDelayMs : 1500;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const response = UrlFetchApp.fetch(url, options);
            const code = response.getResponseCode();

            // Handle HTTP 429 (Too Many Requests) and HTTP 5xx server errors with backoff
            if ((code === 429 || code >= 500) && attempt < maxRetries) {
                let waitMs = retryDelayMs * Math.pow(2, attempt);
                try {
                    const headers = response.getAllHeaders() || {};
                    const retryAfter = headers['Retry-After'] || headers['retry-after'];
                    if (retryAfter) {
                        const parsedSecs = parseInt(retryAfter, 10);
                        if (!isNaN(parsedSecs) && parsedSecs > 0 && parsedSecs <= 10) {
                            waitMs = parsedSecs * 1000;
                        }
                    }
                } catch (hErr) { }

                Logger.log(`[HTTP ${code} Backoff] ${url.substring(0, 70)}... Rate limited. Waiting ${waitMs}ms before retry (${attempt + 1}/${maxRetries})...`);
                Utilities.sleep(waitMs);
                continue;
            }

            return response;
        } catch (e) {
            if (attempt < maxRetries) {
                Utilities.sleep(retryDelayMs * Math.pow(2, attempt));
                continue;
            }

            throw e;
        }
    }
}

function isGenericPortalNavigation(text, title, link) {
    const rawTitle = (title || '').trim();
    const t = `${rawTitle} ${text || ''}`.toLowerCase().replace(/\s+/g, ' ').trim();
    const navigationTitles = [
        /^(general procurement notices|specific procurement notices|procurement plans|corporate procurement|project-related procurement)$/i,
        /^(requests? for (eoi|expression of interest)|tenders?|procurement notices?)$/i,
        /^(home|about|contact|search|filter|results|documents|publications|procurement)$/i
    ];
    if (navigationTitles.some(re => re.test(rawTitle))) return true;
    const specific = /\b(rfp|rfq|eoi|expression of interest|request for proposals?|request for quotations?|tender|call for proposals?|call for concept notes?|consultancy|procurement notice)\b/i.test(rawTitle);
    if (specific) return false;
    if (/\b(general procurement notices|specific procurement notices|procurement plans|corporate procurement|project-related procurement)\b/i.test(t)) return true;
    if (/(?:^|\/)procurement(?:\/|$)/i.test(stripQueryAndHash(link || '')) && !/\b(eoi|rfp|rfq|tender|consultancy|proposal)\b/i.test(t)) return true;
    return false;
}

function extractScoredBlockCandidates(html, baseUrl) {
    const blockRegex = /<(?:tr|li|article|div|p)\b[^>]*>([\s\S]*?)<\/(?:tr|li|article|div|p)>/gi;
    const candidates = [];
    const seenLinks = new Set();
    let blockMatch;
    while ((blockMatch = blockRegex.exec(html)) !== null) {
        const blockContent = blockMatch[1];
        const linkRegex = /href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i;
        const linkMatch = linkRegex.exec(blockContent);
        if (!linkMatch) continue;
        const rawLink = linkMatch[1].trim();
        const anchorText = decodeHtmlEntities(linkMatch[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
        const blockText = decodeHtmlEntities(blockContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
        if (blockText.length <= 15) continue;
        const fullLink = rawLink.startsWith('http') ? rawLink : baseUrl + (rawLink.startsWith('/') ? '' : '/') + rawLink;
        if (seenLinks.has(fullLink)) continue;
        const procurementInTitle = /\b(rfp|rfq|eoi|expression of interest|request for proposals?|request for quotations?|tender|call for proposals?|call for concept notes?|consultancy|procurement notice)\b/i.test(anchorText);
        const procurementInBlock = /\b(rfp|rfq|eoi|expression of interest|request for proposals?|request for quotations?|tender|call for proposals?|call for concept notes?|consultancy|procurement notice)\b/i.test(blockText);
        const supportingSpecificity = /\b(project|consultancy|services|closing|deadline|submission|eligible|reference|contract|assignment|firm)\b/i.test(blockText);
        if (!procurementInTitle && !(procurementInBlock && supportingSpecificity)) continue;
        if (isGenericPortalNavigation(blockText, anchorText, fullLink)) continue;
        const score = getAgriMatchScore(blockText);
        if (score < CONFIG.MIN_RELEVANCE_SCORE) continue;
        const title = anchorText.length > 20 && !/^(download|click|view|pdf|link)$/i.test(anchorText)

            ? anchorText

            : blockText.substring(0, 180);
        seenLinks.add(fullLink);
        candidates.push({ title, link: fullLink, description: blockText, score });
    }

    return candidates;
}

function detectBotBlockSignature(html) {
    const signatures = ['checking your browser', 'attention required', 'just a moment', 'access denied', 'are you a human', 'verify you are a human', 'captcha', 'request blocked'];
    const lower = html.toLowerCase();
    for (const sig of signatures) {
        if (lower.includes(sig)) return sig;
    }

    return null;
}

let _renderKeyPools = {};
let _renderActiveKeyIndices = {};
function getRenderProviderKeyPool(provider) {
    if (_renderKeyPools[provider.name]) return _renderKeyPools[provider.name];
    const props = PropertiesService.getScriptProperties();
    const keys = [];

    // 1. Primary property (supports comma/semicolon-separated keys)
    const primaryNames = [provider.apiKeyProperty];
    if (provider.apiKeyProperty === 'RENDER_API_KEY') {
        primaryNames.push('SCRAPERAPI_KEY');
    }
    if (provider.apiKeyProperty === 'SCRAPINGANT_API_KEY') {
        primaryNames.push('SCRAPINGANT_KEY', 'SCRAPING_ANT_API_KEY');
    }
    primaryNames.forEach(propName => {
        const raw = props.getProperty(propName);
        if (raw) {
            raw.split(/[,;\s]+/).forEach(k => {
                const clean = k.trim();
                if (clean && !keys.includes(clean)) keys.push(clean);
            });
        }
    });

    // 2. Numbered properties: RENDER_API_KEY_2..10, SCRAPERAPI_KEY_2..10, CRAWLBASE_JS_TOKEN_2..10, SCRAPINGANT_API_KEY_2..10
    for (let i = 2; i <= 10; i++) {
        const numberedNames = [`${provider.apiKeyProperty}_${i}`];
        if (provider.apiKeyProperty === 'RENDER_API_KEY') {
            numberedNames.push(`SCRAPERAPI_KEY_${i}`);
        }
        if (provider.apiKeyProperty === 'SCRAPINGANT_API_KEY') {
            numberedNames.push(`SCRAPINGANT_KEY_${i}`, `SCRAPING_ANT_API_KEY_${i}`);
        }
        numberedNames.forEach(propName => {
            const numKey = props.getProperty(propName);
            if (numKey) {
                const clean = numKey.trim();
                if (clean && !keys.includes(clean)) keys.push(clean);
            }
        });
    }

    _renderKeyPools[provider.name] = keys;
    if (_renderActiveKeyIndices[provider.name] === undefined) {
        _renderActiveKeyIndices[provider.name] = 0;
    }
    return keys;
}

/**
 * Safely writes a key-value pair to CacheService, guaranteeing that the expiration
 * strictly obeys the Google Apps Script 21,600s (6-hour) maximum TTL ceiling, and
 * absorbing transient cache errors so they never interrupt execution or key rotation.
 */
function safeCachePut(cache, key, value, ttlSeconds) {
    if (!cache || !key) return false;
    try {
        const safeTtl = Math.min(Math.max(1, Number(ttlSeconds) || 600), 21600);
        cache.put(key, value, safeTtl);
        return true;
    } catch (e) {
        Logger.log(`[Cache Warning] Failed to cache key "${key}": ${e.message}`);
        return false;
    }
}

let renderCircuitBreakerTripped = false;
function fetchRenderedHtml(targetUrl) {
    if (renderCircuitBreakerTripped) return null;
    if (targetUrl && targetUrl.includes('ifad.org')) return null; // Cloudflare-heavy domain; use Serper fallback
    const cache = (typeof CacheService !== 'undefined' && CacheService.getScriptCache) ? CacheService.getScriptCache() : null;
    let anyConfigured = false;
    let anyHadCredit = false;
    for (const provider of CONFIG.RENDER_PROVIDERS) {
        // Fast-path: Check if this provider is cached as completely exhausted for the cycle
        let isProviderExhausted = false;
        try {
            if (cache && cache.get('EXHAUSTED_' + provider.name)) isProviderExhausted = true;
        } catch (e) { }
        if (isProviderExhausted) continue;

        const pool = getRenderProviderKeyPool(provider);
        if (!pool || pool.length === 0) continue;
        anyConfigured = true;
        while ((_renderActiveKeyIndices[provider.name] || 0) < pool.length) {
            const activeIdx = _renderActiveKeyIndices[provider.name] || 0;
            const apiKey = pool[activeIdx];
            const keyPreview = apiKey.length > 8
                ? (apiKey.substring(0, 4) + '...' + apiKey.substring(apiKey.length - 4))
                : 'Key #' + (activeIdx + 1);

            // Fast-path: Skip persistently blacklisted keys (e.g. 401 unauthorized / expired keys cached with 6h TTL)
            let isBlacklisted = false;
            try {
                if (cache && cache.get('DEAD_RENDER_KEY_' + apiKey)) isBlacklisted = true;
            } catch (e) { }

            if (isBlacklisted) {
                _renderActiveKeyIndices[provider.name] = activeIdx + 1;
                continue;
            }

            anyHadCredit = true;
            const renderUrl = provider.buildUrl(apiKey, targetUrl);

            try {
                const response = UrlFetchApp.fetch(renderUrl, { muteHttpExceptions: true });
                const responseCode = response.getResponseCode();
                const bodyPreview = response.getContentText().substring(0, 300);
                if (responseCode !== 200) {
                    const isCreditExhausted = /exhausted.*credit|credit.*exhausted|quota.*exceeded|not enough credits/i.test(bodyPreview);
                    const isKeyInvalid = (responseCode === 401 || /unauthorized|invalid.*api.*key|api.*token.*wrong/i.test(bodyPreview));
                    const isBlockOrLimit = (responseCode === 403 || responseCode === 429 || responseCode === 520);
                    if (isCreditExhausted || isKeyInvalid || isBlockOrLimit) {
                        Logger.log(`[Render Key Exhausted] ${provider.name} key ${keyPreview} failed (HTTP ${responseCode}). Rotating to next key (${activeIdx + 1}/${pool.length})...`);
                        _renderActiveKeyIndices[provider.name] = activeIdx + 1;
                        if (isKeyInvalid || isCreditExhausted) {
                            safeCachePut(cache, 'DEAD_RENDER_KEY_' + apiKey, 'true', 21600); // 6-hour persistent blacklist (GAS CacheService max TTL)
                        }
                        continue;
                    }

                    Logger.log(`[Render] ${provider.name} HTTP ${responseCode}. Preview: ${bodyPreview}`);
                    _renderActiveKeyIndices[provider.name] = activeIdx + 1;
                    break;
                }

                const html = response.getContentText();
                const blockSignature = detectBotBlockSignature(html);
                if (blockSignature) {
                    Logger.log(`[Render] ${provider.name}: bot-block page detected ("${blockSignature}"). Rotating key if available...`);
                    _renderActiveKeyIndices[provider.name] = activeIdx + 1;
                    continue;
                }

                return html;
            } catch (e) {
                Logger.log(`[Render] ${provider.name} request failed: ${e.message}`);
                _renderActiveKeyIndices[provider.name] = activeIdx + 1;
                break;
            }
        }

        if ((_renderActiveKeyIndices[provider.name] || 0) >= pool.length) {
            Logger.log(`[Render Pool Exhausted] All ${pool.length} key(s) for ${provider.name} are exhausted.`);
            safeCachePut(cache, 'EXHAUSTED_' + provider.name, 'true', 21600);
        }
    }

    if (!anyConfigured || !anyHadCredit) {
        renderCircuitBreakerTripped = true;
    }

    return null;
}

function consumeProviderCredit(provider) {
    const props = PropertiesService.getScriptProperties();
    const safeName = provider.name.replace(/[^A-Za-z0-9]+/g, '_').toUpperCase();
    const countKey = `RENDER_${safeName}_COUNT`;
    const periodKey = `RENDER_${safeName}_PERIOD`;
    let count = parseInt(props.getProperty(countKey) || '0', 10);
    if (provider.resetPeriod === 'monthly') {
        const thisMonth = getLocalMonthKey();
        const storedPeriod = props.getProperty(periodKey);
        if (storedPeriod !== thisMonth) {
            count = 0;
            props.setProperty(periodKey, thisMonth);
        }
    }

    if (count >= provider.creditBudget) return false;
    props.setProperty(countKey, String(count + 1));
    return true;
}

/**
 * Canonicalizes URLs by stripping tracking parameters (UTMs, fbclid, gclid, ref, source),
 * hash fragments, and trailing slashes for rock-solid O(1) deduplication.
 */

function canonicalizeUrl(url) {
    if (!url) return '';
    let str = String(url).trim();
    const isAuctionHash = /#(?:auction|notice|tender)-/i.test(str);
    if (!isAuctionHash) {
        const hashIdx = str.indexOf('#');
        if (hashIdx !== -1) str = str.substring(0, hashIdx);
    }

    if (str.endsWith('/') && str.length > 8) str = str.slice(0, -1);

    try {
        const parsed = new URL(str);
        const trackingParams = [
            'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
            'fbclid', 'gclid', '_hsenc', '_hsmi', 'mc_cid', 'mc_eid', 'ref', 'source',
            'platform', 'tracking', 'campaign_id', 'ad_id', 'oc'
        ];
        trackingParams.forEach(p => parsed.searchParams.delete(p));
        let clean = parsed.protocol + '//' + parsed.hostname.toLowerCase() + parsed.pathname;
        const remainingQuery = parsed.searchParams.toString();
        if (remainingQuery) clean += '?' + remainingQuery;
        if (isAuctionHash && parsed.hash) clean += parsed.hash;
        if (clean.endsWith('/') && clean.length > 8) clean = clean.slice(0, -1);
        return clean;
    } catch (e) {
        return str.replace(/([?&])(utm_[^&]+|fbclid=[^&]+|gclid=[^&]+|ref=[^&]+)/gi, '$1')

            .replace(/[?&]$/, '')

            .toLowerCase();
    }
}

/**
 * Advanced title key normalization: strips noise procurement boilerplate prefixes
 * (Call for EOI, Request for Proposals, Terms of Reference, etc.) so syndicated
 * tenders across multiple portals match the same underlying opportunity.
 */

function extractProcurementRefCode(link, title) {
    const text = `${link || ''} ${title || ''}`;
    // Matches PRQ20251314, RFP-PRQ20251314, OP00474383, auction-461015, FAOTZ/RFP/2026/009, RFP/AGRA/..., CI-PADCI-..., etc.
    const match = text.match(/\b(?:rfp[-_]?|rfq[-_]?)?(prq[-_]?\d{6,}|op\d{7,}|auction[-_]?\d{5,}|[a-z0-9]{2,10}\/(?:rfp|rfq|itb|eoi)\/[a-z0-9\/_-]+|(?:rfp|rfq|itb|eoi)\/[a-z0-9\/_-]{4,30}|[a-z]{2,5}-[a-z]{2,10}-\d{5,}-[a-z0-9_-]+|wb-p\d{6,}[a-z0-9\/-]*|gcp\/[a-z]{3}\/\d{3}\/[a-z]{3})\b/i);
    return match ? match[1].toLowerCase().replace(/[-_]/g, '') : null;
}

const DUP_STOPWORDS = new Set(['for', 'and', 'the', 'with', 'from', 'into', 'under', 'call', 'proposals', 'proposal', 'eoi', 'rfp', 'rfq', 'tor', 'consultancy', 'consultant', 'services', 'service', 'study', 'seeks', 'seeking', 'notice', 'tender', 'tenders', 'expression', 'expressions', 'interest', 'applications', 'application', 'grant', 'grants', 'opportunity', 'opportunities', 'invitation', 'bids', 'bid', 'document', 'project']);

function extractCountryTokenFromKey(text) {
    if (!text || typeof AFRICAN_COUNTRIES === 'undefined') return null;
    const lower = String(text).toLowerCase();
    for (let i = 0; i < AFRICAN_COUNTRIES.length; i++) {
        const c = AFRICAN_COUNTRIES[i];
        if (new RegExp('(?:^|[^a-z])' + escapeRegex(c) + '(?:$|[^a-z])', 'i').test(lower)) {
            return c;
        }
    }
    return null;
}

function normalizeTitleKey(title) {
    let clean = String(title || '').toLowerCase();
    clean = clean.replace(/\.(?:pdf|docx?|xlsx?)$/i, '');
    clean = clean.replace(/\s*[-–—·]\s*(?:closes? in \d+ days?|closing soon).*$/i, '');
    clean = clean.replace(/\s*\|\s*(?:linkedin|grantedge global|facebook).*$/i, '');
    try { clean = decodeURIComponent(clean); } catch (e) {}
    if (!/\s/.test(clean) && /(?:[-_][a-zA-Z0-9]+){2,}/.test(clean)) {
        clean = clean.replace(/[-_]+/g, ' ');
    }
    clean = clean.replace(/^(?:call for (?:expressions? of interest|eoi|proposals?|concept notes?|applications?)(?:\s*\([a-z0-9\s]+\))?|request for (?:proposals?|quotations?|concept notes?|rfp|rfq)(?:\s*\([a-z0-9\s]+\))?|expressions? of interest(?:\s*\([a-z0-9\s]+\))?|eoi|rfp|rfq|rfcn|tor|terms of reference(?:\s*for)?|invitation to (?:bid|tender)|tender(?:\s+\d{4})?|consultancy services?(?:\s*for)?|consultancy for)\s*[:\-\–\—\.\/]?\s*/gi, '');
    return clean.replace(/[^a-z0-9]+/g, ' ').trim().substring(0, 150);
}

/**
 * Fuzzy title duplicate detector: matches exact keys, substantive phrase containment,
 * and high token similarity (>= 75% on topical keywords) to skip already logged opportunities,
 * guarded by country check so distinct national assignments are never merged.
 */

function isFuzzyTitleDuplicate(newKey, existingKeys) {
    if (!newKey || !existingKeys) return false;
    if (existingKeys.has(newKey)) return true;
    if (newKey.length < 12) return false;

    const country1 = extractCountryTokenFromKey(newKey);

    for (const existing of existingKeys) {
        if (existing.length < 12) continue;

        // Country Guard: If both keys mention a distinct African country, they represent separate national assignments
        const country2 = extractCountryTokenFromKey(existing);
        if (country1 && country2 && country1 !== country2) {
            continue;
        }

        // Direct phrase containment (e.g. "rwanda taat technical advisor seed systems" contains "taat technical advisor seed systems")
        if (existing.includes(newKey) || newKey.includes(existing)) {
            return true;
        }

        // Substantive token overlap check (stripping common procurement noise words)
        const t1Sub = new Set(newKey.split(' ').filter(w => w.length > 2 && !DUP_STOPWORDS.has(w)));
        const t2Sub = new Set(existing.split(' ').filter(w => w.length > 2 && !DUP_STOPWORDS.has(w)));
        if (t1Sub.size >= 3 && t2Sub.size >= 3) {
            let common = 0;
            t1Sub.forEach(w => { if (t2Sub.has(w)) common++; });
            if (common / Math.min(t1Sub.size, t2Sub.size) >= 0.75) {
                return true;
            }
        }

        // Broad token overlap check for general titles
        const t1All = new Set(newKey.split(' ').filter(w => w.length > 2));
        const t2All = new Set(existing.split(' ').filter(w => w.length > 2));
        if (t1All.size >= 4 && t2All.size >= 4) {
            let common = 0;
            t1All.forEach(w => { if (t2All.has(w)) common++; });
            if (common / Math.min(t1All.size, t2All.size) >= 0.80) {
                return true;
            }
        }
    }

    return false;
}

function getOrCreateSheet() {
    let ss;
    const scriptProps = PropertiesService.getScriptProperties();
    try { ss = SpreadsheetApp.getActiveSpreadsheet(); } catch (e) { ss = null; }

    if (!ss) {
        let savedId = scriptProps.getProperty('SPREADSHEET_ID');
        if (savedId) {
            try { ss = SpreadsheetApp.openById(savedId); } catch (e) { ss = null; }
        }

        if (!ss) {
            ss = SpreadsheetApp.create('Global Agribusiness RFP Tracker');
            scriptProps.setProperty('SPREADSHEET_ID', ss.getId());
        }
    }

    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) {
        sheet = ss.insertSheet(CONFIG.SHEET_NAME);
        const defaultSheet = ss.getSheetByName('Sheet1');
        if (defaultSheet && ss.getSheets().length > 1 && defaultSheet.getLastRow() === 0) {
            try { ss.deleteSheet(defaultSheet); } catch (e) { }
        }

        const headers = ['Date Logged', 'Source Portal', 'Opportunity Title', 'Link', 'Status', 'Closing Date', 'AI Recommendation', 'Match Score (%)', 'Pillar', 'Executive Summary', 'Country', 'Bidding Modality'];
        sheet.appendRow(headers);
        const headerRange = sheet.getRange(1, 1, 1, headers.length);
        headerRange.setFontWeight('bold').setBackground('#1b5e20').setFontColor('#ffffff').setWrap(true);
        sheet.setFrozenRows(1);
        sheet.setColumnWidth(1, 110);
        sheet.setColumnWidth(2, 180);
        sheet.setColumnWidth(3, 260);
        sheet.setColumnWidth(4, 200);
        sheet.setColumnWidth(5, 80);
        sheet.setColumnWidth(6, 110);
        sheet.setColumnWidth(7, 130);
        sheet.setColumnWidth(8, 110);
        sheet.setColumnWidth(9, 180);
        sheet.setColumnWidth(10, 350);
        sheet.setColumnWidth(11, 160);
        sheet.setColumnWidth(12, 220);
        sheet.getRange(1, 4, sheet.getMaxRows(), 1).setNumberFormat('@STRING@');
        scriptProps.setProperty('LINK_COLUMN_FORMATTED', 'true');
    }

    if (scriptProps.getProperty('LINK_COLUMN_FORMATTED') !== 'true') {
        sheet.getRange(1, 4, sheet.getMaxRows(), 1).setNumberFormat('@STRING@');
        scriptProps.setProperty('LINK_COLUMN_FORMATTED', 'true');
        Logger.log('[Sheet Fix] Applied plain-text formatting to the Link column to prevent smart-chip URL display. This runs once.');
    }

    // Auto-migrate: Ensure Country header exists at column 11
    if (sheet.getLastColumn() >= 10 && (sheet.getLastColumn() < 11 || !sheet.getRange(1, 11).getValue() || sheet.getRange(1, 11).getValue() !== 'Country')) {
        sheet.getRange(1, 11).setValue('Country')
            .setFontWeight('bold').setBackground('#1b5e20').setFontColor('#ffffff').setWrap(true);
        sheet.setColumnWidth(11, 160);
        Logger.log('[Sheet Migration] Ensured "Country" column exists in Active Open RFPs at Column 11.');
    }

    // Auto-migrate: Ensure Bidding Modality header exists at column 12
    if (sheet.getLastColumn() >= 10 && (sheet.getLastColumn() < 12 || !sheet.getRange(1, 12).getValue() || sheet.getRange(1, 12).getValue() !== 'Bidding Modality')) {
        sheet.getRange(1, 12).setValue('Bidding Modality')
            .setFontWeight('bold').setBackground('#1b5e20').setFontColor('#ffffff').setWrap(true);
        sheet.setColumnWidth(12, 220);
        Logger.log('[Sheet Migration] Ensured "Bidding Modality" column exists in Active Open RFPs at Column 12.');
    }

    return sheet;
}

function getOrCreateFilteredSheet() {
    const scriptProps = PropertiesService.getScriptProperties();
    let ss;
    try { ss = SpreadsheetApp.getActiveSpreadsheet(); } catch (e) { ss = null; }

    if (!ss) {
        const savedId = scriptProps.getProperty('SPREADSHEET_ID');
        if (savedId) { try { ss = SpreadsheetApp.openById(savedId); } catch (e) { ss = null; } }
    }

    let sheet = ss.getSheetByName(CONFIG.FILTERED_SHEET_NAME);
    if (!sheet) {
        sheet = ss.insertSheet(CONFIG.FILTERED_SHEET_NAME);
        const headers = ['Date Logged', 'Source Portal', 'Title', 'Link', 'Why It Was Filtered Out', 'Country'];
        sheet.appendRow(headers);
        const headerRange = sheet.getRange(1, 1, 1, headers.length);
        headerRange.setFontWeight('bold').setBackground('#616161').setFontColor('#ffffff').setWrap(true);
        sheet.setFrozenRows(1);
        sheet.setColumnWidth(1, 110);
        sheet.setColumnWidth(2, 180);
        sheet.setColumnWidth(3, 260);
        sheet.setColumnWidth(4, 200);
        sheet.setColumnWidth(5, 350);
        sheet.setColumnWidth(6, 160);
        sheet.getRange(1, 4, sheet.getMaxRows(), 1).setNumberFormat('@STRING@');
        scriptProps.setProperty('FILTERED_LINK_COLUMN_FORMATTED', 'true');
    }

    if (scriptProps.getProperty('FILTERED_LINK_COLUMN_FORMATTED') !== 'true') {
        sheet.getRange(1, 4, sheet.getMaxRows(), 1).setNumberFormat('@STRING@');
        scriptProps.setProperty('FILTERED_LINK_COLUMN_FORMATTED', 'true');
    }

    // Auto-migrate: Ensure Country header exists at column 6
    if (sheet.getLastColumn() >= 5 && (sheet.getLastColumn() < 6 || !sheet.getRange(1, 6).getValue() || sheet.getRange(1, 6).getValue() !== 'Country')) {
        sheet.getRange(1, 6).setValue('Country')
            .setFontWeight('bold').setBackground('#616161').setFontColor('#ffffff').setWrap(true);
        sheet.setColumnWidth(6, 160);
        Logger.log('[Sheet Migration] Ensured "Country" column exists in Filtered Out sheet at Column 6.');
    }

    return sheet;
}

/**
 * EMAIL NOTIFICATIONS FOR BEST-FITTING OPPORTUNITIES
 * Automatically notifies all collaborators who have access to the Google Sheet
 * (Owner, Editors, Viewers) and any addresses in Script Properties (ALERT_EMAILS).
 */

function getSheetAccessEmails(spreadsheet) {
    const emails = new Set();

    try {
        const owner = spreadsheet.getOwner();
        if (owner && owner.getEmail()) emails.add(owner.getEmail().trim().toLowerCase());
    } catch (e) { }

    try {
        const editors = spreadsheet.getEditors();
        if (Array.isArray(editors)) {
            editors.forEach(u => {
                if (u && u.getEmail()) emails.add(u.getEmail().trim().toLowerCase());
            });
        }
    } catch (e) { }

    try {
        const viewers = spreadsheet.getViewers();
        if (Array.isArray(viewers)) {
            viewers.forEach(u => {
                if (u && u.getEmail()) emails.add(u.getEmail().trim().toLowerCase());
            });
        }
    } catch (e) { }

    // Also include any explicit ALERT_EMAILS configured in Script Properties

    try {
        const propEmails = PropertiesService.getScriptProperties().getProperty('ALERT_EMAILS');
        if (propEmails) {
            propEmails.split(/[,;\s]+/).forEach(em => {
                if (em && em.includes('@')) emails.add(em.trim().toLowerCase());
            });
        }
    } catch (e) { }

    return Array.from(emails);
}

/**
 * AUTOMATED SYSTEM HEALTH & ADMIN ALERTING
 * Dispatches high-priority system alerts (e.g. Serper key depletion, Gemini API quota limits,
 * Discovery Guard trip) to configured script administrators and sheet collaborators.
 * Throttled to at most once per 12 hours per alert topic to prevent inbox flooding.
 */
function notifyAdminAlert(subject, body) {
    try {
        const cache = (typeof CacheService !== 'undefined' && CacheService.getScriptCache) ? CacheService.getScriptCache() : null;
        const alertKey = 'ALERT_' + subject.replace(/[^A-Za-z0-9_]/g, '_').substring(0, 50);
        if (cache) {
            try {
                if (cache.get(alertKey)) return;
            } catch (e) { }
        }
        safeCachePut(cache, alertKey, 'true', 21600); // 6-hour alert deduplication (GAS CacheService max TTL)

        let ss = null;
        try { ss = SpreadsheetApp.getActiveSpreadsheet(); } catch (e) { }
        // System Health & Guard Alerts: Send strictly to the script owner / administrator ONLY.
        // General sheet collaborators (e.g. Claire, Ronald) must NEVER receive technical guard/system alerts.
        const recipients = [];
        const props = PropertiesService.getScriptProperties();
        const configuredAlertEmails = props.getProperty('ALERT_EMAILS');
        if (configuredAlertEmails) {
            configuredAlertEmails.split(/[,;\s]+/).forEach(em => {
                const clean = em ? em.trim().toLowerCase() : '';
                if (clean && clean.includes('@') && !recipients.includes(clean)) {
                    recipients.push(clean);
                }
            });
        }

        // Script owner (effective user under whose authority the trigger executes)
        if (!recipients.length) {
            try {
                const userEmail = Session.getEffectiveUser().getEmail();
                if (userEmail && userEmail.includes('@')) {
                    recipients.push(userEmail.trim().toLowerCase());
                }
            } catch (e) { }
        }

        // Guaranteed fallback to firm script administrator
        if (!recipients.length) {
            recipients.push('moses@agri-experience.com');
        }

        if (recipients.length > 0) {
            const sheetUrl = ss ? ss.getUrl() : '';
            recipients.forEach(recipient => {
                try {
                    MailApp.sendEmail({
                        to: recipient,
                        subject: `[RFP Hunter Alert] ${subject}`,
                        body: `RFP Hunter System Health Alert:\n\n${body}\n\nTimestamp: ${new Date().toISOString()}\nSpreadsheet: ${sheetUrl || 'N/A'}`
                    });
                } catch (sendErr) {
                    Logger.log(`[Admin Alert] Failed to send email to ${recipient}: ${sendErr.message}`);
                }
            });
            Logger.log(`[Admin Alert] Dispatched "${subject}" alert strictly to script owner: ${recipients.join(', ')}`);
        }
    } catch (err) {
        Logger.log(`[Admin Alert Error] ${err.message}`);
    }
}

function sendEmailAlertsForHighPriorityMatches(matches, sheet) {
    if (!matches || matches.length === 0) return;
    const ss = (sheet && typeof sheet.getParent === 'function') ? sheet.getParent() : SpreadsheetApp.getActiveSpreadsheet();
    const recipients = getSheetAccessEmails(ss);
    if (recipients.length === 0) {
        Logger.log('[Email Alert] No sheet collaborator emails found. Skipping email notification.');
        return;
    }

    const sheetUrl = ss ? ss.getUrl() : '';
    const count = matches.length;
    const subject = `RFP Hunter Alert: ${count} High-Priority Opportunit${count === 1 ? 'y' : 'ies'} Logged`;

    // Agri Experience Corporate Color Palette
    const FOREST_GREEN = '#1B4D3E'; // Rich Agri Experience Forest Green
    const EVERTON_BLUE = '#003399'; // Official Everton Blue
    const WHITE = '#FFFFFF';
    const escapeHtml = (text) => {
        if (!text) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };
    let cardsHtml = '';
    matches.forEach(m => {
        const score = Number(m.score) || 0;
        const isTier1 = score >= 85;
        const badgeBg = isTier1 ? '#ECFDF5' : '#EFF6FF';
        const badgeText = isTier1 ? FOREST_GREEN : EVERTON_BLUE;
        const badgeBorder = isTier1 ? '#A7F3D0' : '#BFDBFE';
        const accentBorder = isTier1 ? FOREST_GREEN : EVERTON_BLUE;

        cardsHtml += `
        <div style="background-color: ${WHITE}; border: 1px solid #E2E8F0; border-radius: 10px; padding: 22px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 14px;">
            <tr>
              <td align="left" style="vertical-align: middle;">
                <span style="display: inline-block; background-color: ${badgeBg}; color: ${badgeText}; border: 1px solid ${badgeBorder}; font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 6px; letter-spacing: 0.3px;">
                  ${score}% FIT &bull; ${escapeHtml(m.goNoGo || 'GO')}
                </span>
              </td>
              <td align="right" style="vertical-align: middle;">
                <span style="display: inline-block; background-color: #F8FAFC; color: #475569; border: 1px solid #E2E8F0; font-size: 11px; font-weight: 600; padding: 4px 9px; border-radius: 6px;">
                  ${escapeHtml(m.source || 'Procurement Portal')}
                </span>
              </td>
            </tr>
          </table>

          <h2 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; line-height: 1.45; color: #0F172A;">
            <a href="${m.link}" target="_blank" style="color: #0F172A; text-decoration: none;">
              ${escapeHtml(m.title)}
            </a>
          </h2>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 14px; font-size: 13px; line-height: 1.6; border-collapse: separate; border-spacing: 0 4px;">
            <tr>
              <td width="32%" style="color: #64748B; font-weight: 600;">Strategic Pillar:</td>
              <td width="68%" style="color: ${FOREST_GREEN}; font-weight: 700;">${escapeHtml(m.pillar || 'Seed Systems & Agribusiness')}</td>
            </tr>
            <tr>
              <td style="color: #64748B; font-weight: 600;">Target Geography:</td>
              <td style="color: #334155; font-weight: 500;">${escapeHtml(m.country || 'Sub-Saharan Africa / Regional')}</td>
            </tr>
            <tr>
              <td style="color: #64748B; font-weight: 600;">Submission Deadline:</td>
              <td style="color: #0F172A; font-weight: 700;">${escapeHtml(m.closingDate || 'Not Specified')}</td>
            </tr>
            <tr>
              <td style="color: #64748B; font-weight: 600;">Bidding Modality:</td>
              <td style="color: ${FOREST_GREEN}; font-weight: 700;">${escapeHtml(m.biddingModality || 'Lead Bidder (Prime)')}</td>
            </tr>
          </table>

          <div style="background-color: #F8FAFC; border-left: 3px solid ${accentBorder}; border-radius: 4px; padding: 12px 14px; margin-bottom: 16px;">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; color: ${accentBorder}; margin-bottom: 4px;">
              Executive Assessment
            </div>
            <div style="font-size: 13px; color: #334155; line-height: 1.55;">
              ${escapeHtml(m.summary || 'Strategic alignment identified based on Agri Experience capabilities.')}
            </div>
          </div>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="right">
                <a href="${m.link}" target="_blank" style="display: inline-block; background-color: ${EVERTON_BLUE}; color: ${WHITE}; text-decoration: none; font-size: 12px; font-weight: 600; padding: 8px 18px; border-radius: 6px; letter-spacing: 0.2px;">
                  View Solicitation &rarr;
                </a>
              </td>
            </tr>
          </table>
        </div>
        `;
    });
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agri Experience RFP Hunter Alert</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1E293B;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F1F5F9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 660px; background-color: ${WHITE}; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); border: 1px solid #E2E8F0;">

          <!-- Everton Blue Header with Forest Green Accent Stripe -->
          <tr>
            <td style="height: 5px; background-color: ${FOREST_GREEN};"></td>
          </tr>

          <tr>
            <td style="background-color: ${EVERTON_BLUE}; padding: 28px 32px; color: ${WHITE};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #93C5FD; margin-bottom: 6px;">
                      PROCUREMENT INTELLIGENCE ALERT
                    </div>
                    <h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700; color: ${WHITE}; letter-spacing: -0.3px; line-height: 1.25;">
                      Agri Experience RFP Hunter
                    </h1>
                    <p style="margin: 0; font-size: 14px; color: #DBEAFE; line-height: 1.5;">
                      <strong style="color: ${WHITE}; font-weight: 700;">${count}</strong> high-priority opportunit${count === 1 ? 'y was' : 'ies were'} evaluated and matched to firm capabilities (Score &ge; 70%).
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 24px 24px 16px 24px; background-color: #F8FAFC;">
              ${cardsHtml}

              ${sheetUrl ? `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 16px; margin-bottom: 12px;">
                <tr>
                  <td align="center">
                    <a href="${sheetUrl}" target="_blank" style="display: inline-block; background-color: ${FOREST_GREEN}; color: ${WHITE}; text-decoration: none; font-weight: 600; font-size: 14px; padding: 13px 28px; border-radius: 8px; box-shadow: 0 2px 4px rgba(27, 77, 62, 0.25); letter-spacing: 0.2px;">
                      Open 'Active Open RFPs' Live Tracker &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              ` : ''}
            </td>
          </tr>

          <!-- Minimalist Footer -->
          <tr>
            <td style="padding: 18px 24px; background-color: ${WHITE}; border-top: 1px solid #E2E8F0; text-align: center;">
              <span style="font-size: 11px; font-weight: 700; color: ${FOREST_GREEN}; letter-spacing: 0.5px;">AGRI EXPERIENCE</span>
              <span style="padding: 0 8px; font-size: 11px; color: #CBD5E1;">&bull;</span>
              <span style="font-size: 11px; font-weight: 600; color: ${EVERTON_BLUE}; letter-spacing: 0.5px;">RFP INTELLIGENCE ENGINE</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
    const plainText = matches.map(m =>
        `[${m.score}% MATCH - ${m.goNoGo || 'GO'}] ${m.title}\nSource: ${m.source || 'Portal'} | Country: ${m.country || 'Sub-Saharan Africa'} | Pillar: ${m.pillar || 'Agribusiness'} | Deadline: ${m.closingDate || 'Not Specified'}\nLink: ${m.link}\nSummary: ${m.summary || ''}\n`
    ).join('\n---\n\n') + (sheetUrl ? `\n\nGoogle Sheet: ${sheetUrl}` : '');
    recipients.forEach(recipient => {
        try {
            MailApp.sendEmail({
                to: recipient,
                subject: subject,
                body: plainText,
                htmlBody: html
            });
            Logger.log(`[Email Alert] Sent high-priority match notification to: ${recipient}`);
        } catch (err) {
            Logger.log(`[Email Alert] Failed to send email to ${recipient}: ${err.message}`);
        }
    });
}

function sendSlackWebhookAlert(matches) {
    const webhookUrl = PropertiesService.getScriptProperties().getProperty('SLACK_WEBHOOK_URL');
    if (!webhookUrl || !matches.length) return;

    // Slack enforces a strict 50-block limit per webhook message.

    // Chunk into batches of 20 matches (41 blocks per batch).

    const CHUNK_SIZE = 20;
    for (let i = 0; i < matches.length; i += CHUNK_SIZE) {
        const chunk = matches.slice(i, i + CHUNK_SIZE);

        try {
            const batchLabel = matches.length > CHUNK_SIZE ? ` (Batch ${Math.floor(i / CHUNK_SIZE) + 1}/${Math.ceil(matches.length / CHUNK_SIZE)})` : '';
            const blocks = [{
                type: "header",
                text: { type: "plain_text", text: `🚨 ${matches.length} Global Agribusiness RFP(s) Match Firm Capabilities${batchLabel}` }
            }];
            chunk.forEach(m => {
                blocks.push({
                    type: "section",
                    text: { type: "mrkdwn", text: `*<${m.link}|${m.title}>*\n*Source:* ${m.source} | *Deadline:* \`${m.closingDate}\` | *Score:* \`${m.score}%\`\n*Pillar:* ${m.pillar}\n*Summary:* ${m.summary}` }
                });
                blocks.push({ type: "divider" });
            });
            UrlFetchApp.fetch(webhookUrl, {
                method: 'POST',
                contentType: 'application/json',
                payload: JSON.stringify({ blocks }),
                muteHttpExceptions: true
            });
            if (i + CHUNK_SIZE < matches.length) Utilities.sleep(1000);
        } catch (e) {
            Logger.log(`[SLACK ALERT ERROR] Failed to send Slack alert batch: ${e.message}`);
        }
    }
}

function sendTeamsWebhookAlert(matches) {
    const webhookUrl = PropertiesService.getScriptProperties().getProperty('TEAMS_WEBHOOK_URL');
    if (!webhookUrl) return;

    try {
        let bodyText = `### 🚨 Global Open Agribusiness RFPs Detected\n\n`;
        matches.forEach(m => {
            bodyText += `* **[${m.title}](${m.link})**\n  * **Closing Date:** ${m.closingDate}\n  * **Score:** ${m.score}% (${m.goNoGo})\n  * **Pillar:** ${m.pillar}\n  * **Summary:** ${m.summary}\n\n`;
        });
        const payload = {
            type: "message",
            attachments: [{
                contentType: "application/vnd.microsoft.card.adaptive",
                content: { $schema: "http://adaptivecards.io/schemas/adaptive-card.json", type: "AdaptiveCard", version: "1.2", body: [{ type: "TextBlock", text: bodyText, wrap: true }] }
            }]
        };
        UrlFetchApp.fetch(webhookUrl, { method: 'POST', contentType: 'application/json', payload: JSON.stringify(payload), muteHttpExceptions: true });
    } catch (e) {
        Logger.log(`[TEAMS ALERT ERROR] Failed to send Teams alert: ${e.message}`);
    }
}

const AFRICAN_COUNTRIES = [
    'algeria', 'angola', 'benin', 'botswana', 'burkina faso', 'burundi',
    'cabo verde', 'cape verde', 'cameroon', 'central african republic',
    'chad', 'comoros', 'congo', 'ivory coast', "cote d'ivoire", "côte d'ivoire", "côte d’ivoire",
    'djibouti', 'egypt', 'equatorial guinea', 'eritrea', 'eswatini', 'swaziland',
    'ethiopia', 'gabon', 'gambia', 'ghana', 'guinea-bissau', 'guinea',
    'kenya', 'lesotho', 'liberia', 'libya', 'madagascar', 'malawi', 'mali',
    'mauritania', 'mauritius', 'morocco', 'mozambique', 'namibia', 'niger',
    'nigeria', 'rwanda', 'sao tome', 'senegal', 'seychelles', 'sierra leone',
    'somalia', 'south africa', 'south sudan', 'sudan', 'tanzania', 'togo',
    'tunisia', 'uganda', 'zambia', 'zimbabwe', 'drc', 'democratic republic of congo'
];
const AFRICAN_REGION_TERMS = [
    'africa', 'sub-saharan', 'sub saharan', 'west africa', 'east africa',
    'southern africa', 'north africa', 'central africa', 'horn of africa',
    'sahel', 'maghreb', 'ecowas', 'sadc', 'comesa', 'african union',
    'au commission', 'agra', 'afdb', 'african development bank'
];
function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Pre-compiled word boundary regex for African countries to avoid false positives like 'together' matching 'togo'

const AFRICAN_COUNTRIES_REGEX = new RegExp(`\\b(?:${AFRICAN_COUNTRIES.map(escapeRegex).join('|')})\\b`, 'i');
const AFRICAN_REGION_REGEX = new RegExp(`\\b(?:${AFRICAN_REGION_TERMS.map(escapeRegex).join('|')})\\b`, 'i');

/**
 * COUNTRY EXTRACTION ENGINE
 * Detects African countries and regional corridors mentioned in opportunities.
 * Returns a sorted, comma-separated list of country display names if multiple are found,
 * or regional identifiers ('East Africa', 'COMESA Region', 'Africa (Pan-African)'),
 * or 'Unspecified'.
 */

const COUNTRY_DISPLAY_NAMES = {
    'democratic republic of the congo': 'DR Congo',
    'democratic republic of congo': 'DR Congo',
    'dr congo': 'DR Congo',
    'drc': 'DR Congo',
    'congo': 'Congo',
    'central african republic': 'Central African Republic',
    'south africa': 'South Africa',
    'south sudan': 'South Sudan',
    'sudan': 'Sudan',
    'equatorial guinea': 'Equatorial Guinea',
    'guinea-bissau': 'Guinea-Bissau',
    'guinea bissau': 'Guinea-Bissau',
    'guinea': 'Guinea',
    'cabo verde': 'Cabo Verde',
    'cape verde': 'Cabo Verde',
    'ivory coast': "Côte d'Ivoire",
    "cote d'ivoire": "Côte d'Ivoire",
    "côte d'ivoire": "Côte d'Ivoire",
    "côte d’ivoire": "Côte d'Ivoire",
    'sao tome and principe': 'São Tomé and Príncipe',
    'sao tome': 'São Tomé and Príncipe',
    'burkina faso': 'Burkina Faso',
    'sierra leone': 'Sierra Leone',
    'algeria': 'Algeria',
    'angola': 'Angola',
    'benin': 'Benin',
    'botswana': 'Botswana',
    'burundi': 'Burundi',
    'cameroon': 'Cameroon',
    'chad': 'Chad',
    'comoros': 'Comoros',
    'djibouti': 'Djibouti',
    'egypt': 'Egypt',
    'eritrea': 'Eritrea',
    'eswatini': 'Eswatini',
    'swaziland': 'Eswatini',
    'ethiopia': 'Ethiopia',
    'gabon': 'Gabon',
    'gambia': 'Gambia',
    'ghana': 'Ghana',
    'kenya': 'Kenya',
    'lesotho': 'Lesotho',
    'liberia': 'Liberia',
    'libya': 'Libya',
    'madagascar': 'Madagascar',
    'malawi': 'Malawi',
    'mali': 'Mali',
    'mauritania': 'Mauritania',
    'mauritius': 'Mauritius',
    'morocco': 'Morocco',
    'mozambique': 'Mozambique',
    'namibia': 'Namibia',
    'niger': 'Niger',
    'nigeria': 'Nigeria',
    'rwanda': 'Rwanda',
    'senegal': 'Senegal',
    'seychelles': 'Seychelles',
    'somalia': 'Somalia',
    'tanzania': 'Tanzania',
    'togo': 'Togo',
    'tunisia': 'Tunisia',
    'uganda': 'Uganda',
    'zambia': 'Zambia',
    'zimbabwe': 'Zimbabwe'
};
const REGIONAL_TERMS_MAP = {
    'sub-saharan africa': 'Sub-Saharan Africa',
    'sub saharan africa': 'Sub-Saharan Africa',
    'east africa': 'East Africa',
    'west africa': 'West Africa',
    'southern africa': 'Southern Africa',
    'central africa': 'Central Africa',
    'north africa': 'North Africa',
    'horn of africa': 'Horn of Africa',
    'sahel': 'Sahel',
    'ecowas': 'ECOWAS Region',
    'comesa': 'COMESA Region',
    'sadc': 'SADC Region',
    'eac': 'EAC Region'
};

const CITY_TO_COUNTRY = {
    'nairobi': 'Kenya', 'mombasa': 'Kenya', 'eldoret': 'Kenya', 'kisumu': 'Kenya', 'nakuru': 'Kenya',
    'kigali': 'Rwanda', 'huye': 'Rwanda', 'musanze': 'Rwanda',
    'kampala': 'Uganda', 'entebbe': 'Uganda', 'gulu': 'Uganda', 'mbarara': 'Uganda', 'jinja': 'Uganda',
    'dar es salaam': 'Tanzania', 'dodoma': 'Tanzania', 'arusha': 'Tanzania', 'mwanza': 'Tanzania', 'morogoro': 'Tanzania', 'zanzibar': 'Tanzania',
    'addis ababa': 'Ethiopia', 'addis': 'Ethiopia', 'hawassa': 'Ethiopia', 'bahir dar': 'Ethiopia',
    'abuja': 'Nigeria', 'lagos': 'Nigeria', 'kano': 'Nigeria', 'ibadan': 'Nigeria', 'kaduna': 'Nigeria', 'port harcourt': 'Nigeria', 'enugu': 'Nigeria',
    'accra': 'Ghana', 'kumasi': 'Ghana', 'tamale': 'Ghana',
    'dakar': 'Senegal', 'saint-louis': 'Senegal', 'thies': 'Senegal',
    'abidjan': "Côte d'Ivoire", 'yamoussoukro': "Côte d'Ivoire", 'bouake': "Côte d'Ivoire",
    'lilongwe': 'Malawi', 'blantyre': 'Malawi', 'mzuzu': 'Malawi',
    'lusaka': 'Zambia', 'ndola': 'Zambia', 'kitwe': 'Zambia',
    'harare': 'Zimbabwe', 'bulawayo': 'Zimbabwe',
    'maputo': 'Mozambique', 'beira': 'Mozambique', 'nampula': 'Mozambique',
    'bamako': 'Mali', 'segou': 'Mali', 'sikasso': 'Mali',
    'ouagadougou': 'Burkina Faso', 'bobo-dioulasso': 'Burkina Faso',
    'niamey': 'Niger', 'maradi': 'Niger',
    'conakry': 'Guinea',
    'cotonou': 'Benin', 'porto-novo': 'Benin',
    'lome': 'Togo',
    'yaounde': 'Cameroon', 'douala': 'Cameroon',
    'kinshasa': 'DR Congo', 'lubumbashi': 'DR Congo', 'goma': 'DR Congo',
    'juba': 'South Sudan',
    'mogadishu': 'Somalia', 'hargeisa': 'Somalia'
};

const ENTITY_TO_REGION = {
    'iita': 'Nigeria / Sub-Saharan Africa',
    'ilri': 'Kenya / Sub-Saharan Africa',
    'cimmyt': 'Sub-Saharan Africa',
    'aatf': 'Kenya / Sub-Saharan Africa',
    'agra': 'Sub-Saharan Africa',
    'asareca': 'Eastern & Central Africa',
    'coraf': 'West & Central Africa',
    'comesa': 'COMESA Region',
    'eac': 'EAC Region',
    'sadc': 'SADC Region',
    'ecowas': 'ECOWAS Region',
    'igad': 'Horn of Africa / IGAD Region',
    'tendersure': 'Kenya / East Africa',
    'afdb': 'Africa (Pan-African)',
    'ifad': 'Sub-Saharan Africa'
};

function extractOpportunityCountries(title, description, summary, link, source, aiCountry) {
    if (aiCountry && typeof aiCountry === 'string') {
        const cleanAi = aiCountry.trim();
        if (cleanAi && !/^(?:unspecified|not specified|none|n\/a|unknown)$/i.test(cleanAi)) {
            return cleanAi;
        }
    }

    const combined = `${title || ''} ${description || ''} ${summary || ''} ${link || ''} ${source || ''}`;
    if (!combined.trim()) return 'Sub-Saharan Africa';
    const lower = combined
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[\u2018\u2019]/g, "'")
        .toLowerCase();

    // 1. Check explicit country display names
    const countryKeys = Object.keys(COUNTRY_DISPLAY_NAMES).sort((a, b) => b.length - a.length);
    const matchedRanges = [];
    const foundNames = new Set();
    for (const key of countryKeys) {
        const regex = new RegExp(`\\b${escapeRegex(key)}\\b`, 'gi');
        let m;
        while ((m = regex.exec(lower)) !== null) {
            const start = m.index;
            const end = start + m[0].length;
            const alreadyCovered = matchedRanges.some(r => start >= r.start && end <= r.end);
            if (!alreadyCovered) {
                matchedRanges.push({ start, end });
                foundNames.add(COUNTRY_DISPLAY_NAMES[key]);
            }
        }
    }

    if (foundNames.size > 0) {
        return Array.from(foundNames).sort().join(', ');
    }

    // 2. Check major capital cities and commercial hubs
    for (const [city, country] of Object.entries(CITY_TO_COUNTRY)) {
        if (new RegExp(`\\b${escapeRegex(city)}\\b`, 'i').test(lower)) {
            return country;
        }
    }

    // 3. Check regional economic communities and trading blocs
    const foundRegions = new Set();
    const regionKeys = Object.keys(REGIONAL_TERMS_MAP).sort((a, b) => b.length - a.length);
    for (const key of regionKeys) {
        const regex = new RegExp(`\\b${escapeRegex(key)}\\b`, 'i');
        if (regex.test(lower)) {
            foundRegions.add(REGIONAL_TERMS_MAP[key]);
        }
    }

    if (foundRegions.size > 0) {
        return Array.from(foundRegions).sort().join(', ');
    }

    // 4. Check pan-African institutions and development bodies
    for (const [entity, region] of Object.entries(ENTITY_TO_REGION)) {
        if (new RegExp(`\\b${escapeRegex(entity)}\\b`, 'i').test(lower)) {
            return region;
        }
    }

    // 5. Recognize explicit non-African territories before defaulting to Pan-African
    if (/(?:barbados|undpbarbadosec|st[\s._-]?kitts|nevis|caribbean|eastern caribbean)/i.test(lower)) {
        return 'Barbados / Caribbean';
    }
    if (/\b(?:cambodia|sri lanka|latin america|vietnam|indonesia|philippines|myanmar|brazil|peru|colombia|guyana|trinidad|jamaica|haiti|bahamas|belize|fiji|papua new guinea)\b/i.test(lower)) {
        return 'Outside Target Geography';
    }

    if (/\b(africa|african)\b/i.test(lower)) {
        return 'Africa (Pan-African)';
    }

    // 6. Source portal fallbacks
    if (source) {
        const sLower = source.toLowerCase();
        if (sLower.includes('tendersure')) return 'Kenya / East Africa';
        if (sLower.includes('asareca')) return 'Eastern & Central Africa';
        if (sLower.includes('agra')) return 'Sub-Saharan Africa';
        if (sLower.includes('ilri')) return 'Kenya / Sub-Saharan Africa';
        if (sLower.includes('aatf')) return 'Kenya / Sub-Saharan Africa';
        if (sLower.includes('cimmyt')) return 'Sub-Saharan Africa';
        if (sLower.includes('afdb')) return 'Africa (Pan-African)';
        if (sLower.includes('ifad')) return 'Sub-Saharan Africa';
        if (sLower.includes('all business africa')) return 'Africa (Pan-African)';
    }

    return 'Sub-Saharan Africa';
}

function isAfricaRelated(text) {
    if (!text) return false;
    const lower = text

        .normalize('NFD')

        .replace(/[\u0300-\u036f]/g, '')

        .replace(/[\u2018\u2019]/g, "'")

        .toLowerCase();
    return AFRICAN_COUNTRIES_REGEX.test(lower) || AFRICAN_REGION_REGEX.test(lower);
}

const CORE_SEED_KEYWORDS = [
    'seed', 'seed system', 'seed sector', 'seed policy', 'seed regulation', 'seed law',
    'seed certification', 'e-certification', 'certified seed', 'quality declared seed', 'qds',
    'standard certified seed', 'standard seed', 'standard seed class', 'orphan crops', 'clean planting material',
    'clean planting materials', 'vegetatively propagated', 'vegetatively propagated crops', 'vpm', 'vpc',
    'seed quality', 'seed quality assurance', 'seed testing', 'seed testing laboratory', 'seed testing lab',
    'seed inspection', 'field inspection', 'seed sampling', 'seed analysis', 'seed traceability',
    'private seed inspector', 'authorized seed inspector', 'authorized private inspectors', 'seed inspector authorization',
    'germination', 'moisture content', 'purity analysis', 'ista', 'oecd labels', 'oecd seed schemes',
    'scratch-off', 'scratch-off labels', 'mulika mbegu mbovu', 'm3', 'ripoti mbegu isiyo bora', 'rimi',
    'mbeguchoice', 'variety identification number', 'vin', 'the african seed access index', 'tasai',
    'seedsat', 'seed roadmap', 'national seed roadmap', 'seed road map', 'esseta', 'npt', 'dus',
    'variety release', 'variety registration', 'variety catalogue', 'crop release',
    'plant variety protection', 'pvp', 'plant breeders rights', 'pbr', 'upov', 'plant breeding',
    'crop variety', 'crop varieties', 'germplasm', 'foundation seed', 'breeder seed', 'parent seed', 'basic seed',
    'early generation seed', 'egs', 'seed multiplication', 'seed value chain', 'seed trade',
    'seed company', 'seed companies', 'seed enterprise', 'seed enterprises', 'seed business',
    'seed enterprise development', 'seed production', 'seed distribution', 'seed access', 'smallholder seed',
    'seed outgrower', 'seed outgrowers', 'community seed', 'cbo seed', 'community seed bank',
    'seed processing', 'seed processing plant', 'seed conditioning', 'seed packaging', 'seed storage',
    'seed sieves', 'seed drying', 'seed grading', 'seed demand forecasting', 'seed demand forecast',
    'seed demand', 'sdf', 'effective demand', 'variety positioning', 'seed marketing', 'seed sales',
    'seed investment plan', 'counterfeit seed', 'fake seed', 'seed verification',
    'seed border control', 'seed surveillance', 'seed subsidy', 'agrodealer', 'agro-dealer',
    'agro dealer', 'agrodealers', 'agro-dealers', 'agro dealers', 'agrodealer mapping', 'agrodealer association',
    'agrodealer network', 'agro-dealer network', 'agrodealer training', 'agro-dealer training',
    'agrodealer development', 'agro-dealer development', 'agro-delear', 'agrodelear', 'agro delear',
    'seed trade association', 'stak', 'tasta', 'afsta', 'the african seed company toolbox', 'seed company toolbox',
    'drought tolerant', 'drought-tolerant seed', 'climate-resilient seed', 'climate resilient seed',
    'vision for adapted crops and soils', 'vacs', 'adapted crops', 'opportunity crops',
    'neglected and underutilized species', 'nus', 'traditional food crops',
    'planting material', 'planting materials', 'phytosanitary', 'sanitary and phytosanitary', 'sps compliance',
    'pest risk analysis', 'seedlings', 'horticulture nurseries', 'seedling nurseries',
    'apical rooted cuttings', 'arc', 'seed potato', 'seed potato multiplication', 'potato seed tubers',
    'cassava stem cuttings', 'cassava seed system', 'sweetpotato vine multiplication', 'sweet potato vines',
    'fodder planting materials', 'pasture planting materials', 'seed treatment', 'hybrid seed',
    'open pollinated variety', 'opv', 'isolation distance', 'rogueing', 'roguing',
    'seed crop agronomy', 'tissue culture', 'tissue culture plantlets', 'aeroponics', 'screenhouse seed',
    'gmo', 'gmos', 'gmo seed', 'gmo seeds', 'gmo crops', 'gmo variety',
    'genetically modified', 'genetically modified organism', 'genetically modified organisms',
    'genetically modified crop', 'genetically modified crops', 'genetically modified seed', 'genetically modified seeds',
    'living modified organism', 'living modified organisms', 'lmo', 'lmos',
    'cartagena protocol', 'cartagena protocol on biosafety',
    'transgenic', 'transgenic crops', 'transgenic seeds',
    'biosafety', 'biosafety regulation', 'biosafety regulatory', 'biosafety framework', 'biosafety guidelines',
    'national biosafety authority', 'national biosafety', 'agricultural biotechnology', 'biotechnology regulation',
    'biotech seed', 'biotech crops', 'bt cotton', 'bt maize', 'bt cowpea',
    'tela maize', 'pbr cowpea', 'pod borer resistant cowpea', 'wema',
    'confined field trial', 'confined field trials', 'cft', 'environmental release', 'commercial release of gmo',
    'gene editing', 'genome editing', 'crispr', 'gene drive', 'synthetic biology',
    // Francophone GMO & Biotechnology Terms
    'ogm', 'organismes génétiquement modifiés', 'organisme génétiquement modifié',
    'biosécurité', 'cadre national de biosécurité', 'biotechnologie agricole',
    'culture transgénique', 'semences ogm', 'édition génomique', 'édition du génome', 'dossier de biosécurité',
    'seed advisory', 'seed advisory services', 'seed advisory platform', 'seed extension', 'seed technology',
    'seed systems advisory', 'seed digital platform', 'seed capacity building', 'seed company training',
    'seed sector capacity building', 'breeder training', 'seed inspector training', 'renforcement des capacités semencières',
    // Francophone Seed Terms
    'semence', 'semences', 'système semencier', 'systèmes semenciers', 'secteur semencier', 'filière semencière',
    'semences certifiées', 'certification des semences', 'contrôle de la qualité des semences',
    'multiplication des semences', 'multiplication semencière', 'production semencière',
    'entreprise semencière', 'entreprises semencières', 'variétés améliorées',
    'homologation variétale', 'homologation des variétés', 'catalogue variétal',
    'banque de semences', 'banque communautaire de semences', 'grainothèque'
];
const TRACK_RECORD_COUNTRIES = [
    'burkina faso', 'burundi', 'democratic republic of congo', 'drc',
    'ethiopia', 'ghana', 'kenya', 'liberia', 'malawi', 'mali', 'mozambique',
    'niger', 'nigeria', 'south africa', 'rwanda', 'senegal', 'sierra leone',
    'south sudan', 'tanzania', 'uganda', 'zambia', 'zimbabwe'
];
const TRACK_RECORD_TARGETS = [
    'burkina faso', 'burundi', 'democratic republic of congo', 'drc',
    'ethiopia', 'ghana', 'kenya', 'liberia', 'malawi', 'mali', 'mozambique',
    'niger', 'nigeria', 'south africa', 'rwanda', 'senegal', 'sierra leone',
    'south sudan', 'tanzania', 'uganda', 'zambia', 'zimbabwe',
    'east africa', 'west africa', 'southern africa', 'sub-saharan africa', 'horn of africa',
    'sahel', 'comesa', 'ecowas', 'sadc', 'eac', 'benin', 'cameroon', 'togo', 'ivory coast',
    "cote d'ivoire", 'madagascar', 'angola', 'sudan', 'chad', 'guinea', 'somalia', 'africa'
];
const KNOWN_PARTNER_KEYWORDS = [
    'usaid', 'feed the future', 'fcdo', 'dfid', 'kenya markets trust', 'kmt', 'agra',
    'gates foundation', 'bmgf', 'catholic relief services', 'crs', ' dai ', 'rti international',
    'gatsby', 'gatsby africa', 'mpedigree', 'world bank', 'ifad', 'afdb', 'fao', 'cimmyt',
    'ilri', 'iita', 'cgiar', 'aatf', 'asareca', 'coraf', 'fara', 'kalro', 'kephis', 'tosci',
    'scci', 'agricultural seed agency', 'asa', 'stak', 'seedan', 'tasta', 'usta', 'afsta',
    'semis', 'wacci', 'giz', 'eu', 'european union', 'wfp', 'undp', 'cta', 'trademark africa',
    'trademark east africa', 'tma', 'enabel', 'snv', 'mastercard foundation', 'rockefeller foundation',
    'rvo', 'jica', 'ciat', 'cip', 'africarice', 'icraf', 'technoserve', 'palladium', 'chemonics', 'tetra tech'
];
const SECONDARY_AGRI_KEYWORDS = [
    'agriculture', 'agribusiness', 'youth agribusiness', 'women in agribusiness', 'agribusiness incubation',
    'agribusiness accelerator', 'agribusiness market systems', 'market systems development', 'msd',
    'value chain', 'value chain analysis', 'irrigation', 'farming', 'livestock',
    'fertilizer', 'food security', 'food systems', 'rural', 'crops', 'trade', 'resilience',
    'smallholder', 'cooperative', 'extension services', 'extension officer',
    'input supply', 'input distribution', 'last-mile input', 'agro-input', 'agtech',
    'digital agriculture', 'nutrition', 'agri-finance', 'market access',
    'agritech', 'agri-tech', 'agri tech', 'agronomy', 'agronomist', 'horticulture', 'farm inputs',
    'agro-chemicals', 'post-harvest', 'post harvest', 'agro-processors', 'commodity exporters',
    'demonstration plots', 'demo plots', 'farmer field days', 'last-mile distribution',
    'digital platforms', 'e-certification', 'online application system', 'mbeguchoice',
    'soil health', 'soil kit', 'mechanization', 'biofortified', 'agricultural transformation',
    'crop protection', 'crop production', 'scoping study', 'feasibility analysis', 'thematic study',
    'baseline study', 'stakeholder convening', 'public-private dialogue', 'seedling nursery business',
    'seed business model', 'agribusiness consulting',
    'agrifood', 'agri-food', 'agrifood system', 'agrifood systems', 'food system', 'food systems',
    'baseline survey', 'feasibility study', 'business plan', 'block farm', 'policy advocacy',
    'agri-enterprise', 'youth organizations', 'youth employment', 'rural youth',
    'producteurs', 'producteurs de riz', 'riz', 'bas-fonds', 'sri',
    'farm', 'farms', 'mega farm', 'mega farms', 'agri enterprise', 'agri enterprises', 'green revolution',
    'international trade', 'cross-border trade', 'trade compliance', 'paperless trade',
    'supply chain visibility', 'market intelligence', 'customs digitisation', 'customs digitization',
    'trade facilitation', 'trade logistics', 'market sounding', 'request for information', 'digital tools',
    'agricultural advisory', 'farmer advisory', 'farmer advisory services', 'farmer advisory platform',
    'seed advisory', 'digital extension', 'e-extension', 'digital advisory',
    'agricultural extension', 'advisory platform', 'farmer extension', 'advisory solution',
    'smart subsidy', 'e-voucher', 'electronic voucher', 'input subsidy', 'targeted input subsidy',
    'village-based advisor', 'vba', 'digital farmer registry', 'lead farmer',
    // Agribusiness & Agriculture Capacity Building Keywords
    'capacity building', 'capacity development', 'institutional strengthening', 'institutional capacity',
    'training of trainers', 'tot', 'agribusiness training', 'farmer training', 'curriculum development',
    'skills development', 'cooperative development', 'cooperative capacity building',
    'renforcement des capacités', 'renforcement institutionnel', 'formation des formateurs', 'organisations paysannes',
    // French agricultural advisory & value chain terms
    'conseil agricole', 'vulgarisation agricole', 'conseillers agricoles', 'services de conseil agricole',
    'intrants agricoles', 'distributeur d intrants', 'filière agricole', 'politique agricole',
    'maize', 'sunflower', 'rice', 'wheat', 'sorghum', 'millet', 'cassava', 'cowpea', 'pigeon pea',
    'green gram', 'soya', 'soybean', 'groundnut', 'sesame', 'legumes', 'grain', 'cereals', 'avocado',
    'banana', 'mango', 'pineapple', 'pineapples', 'passion fruit', 'sweet potato', 'sweet potatoes',
    'orange-fleshed sweet potato', 'ofsp', 'african leafy vegetables', 'vegetables', 'cashew', 'coffee',
    'cocoa', 'tea', 'sugarcane', 'sugar cane', 'palm', 'pawpaw', 'apple', 'grape', 'pasture', 'fodder'
];
function isAgriRelated(text) {
    return getAgriMatchScore(text) > 0;
}

/**
 * Optimized keyword hit counter: drops redundant substring matches (e.g. 'agri' when 'agribusiness' matched)
 * using descending length sorting instead of nested quadratic loops.
 */

function countDistinctKeywordHits(lower, keywords) {
    const matched = keywords.filter(kw => {
        return new RegExp('(?:^|[^a-zA-Z0-9_])' + escapeRegex(kw) + '(?:$|[^a-zA-Z0-9_])', 'i').test(lower);
    });
    if (matched.length <= 1) return matched.length;
    matched.sort((a, b) => b.length - a.length);
    const distinct = [];
    for (const kw of matched) {
        if (!distinct.some(d => d.includes(kw))) {
            distinct.push(kw);
        }
    }

    return distinct.length;
}

function getAgriMatchScore(text) {
    const lower = (text || '').toLowerCase();
    let score = 0;
    const coreHits = countDistinctKeywordHits(lower, CORE_SEED_KEYWORDS);
    const countryHits = countDistinctKeywordHits(lower, TRACK_RECORD_TARGETS);
    const partnerHits = countDistinctKeywordHits(lower, KNOWN_PARTNER_KEYWORDS);
    const secondaryHits = countDistinctKeywordHits(lower, SECONDARY_AGRI_KEYWORDS);
    const procurementSignal = /\b(rfp|rfq|eoi|expression of interest|request for proposals?|request for quotations?|tender|call for proposals?|call for concept notes?|consultancy|procurement notice|rfcn|cfcn|call for applications?|terms of reference|tor|appel\s+[aà]\s+propositions?|appel\s+d['’]offres?|manifestation\s+d['’]int[eé]r[eê]t|avis\s+de\s+sollicitation|ami\b|asmi\b)\b/i.test(lower);
    const isAgriInstitution = /\b(?:agra|alliance for a green revolution in africa|cimmyt|ilri|aatf|asareca|coraf|cgiar|fao|ifad)\b/i.test(lower);
    const agricultureSignal = coreHits > 0 || secondaryHits > 0 || /\b(seed|seeds|semence|semences|agriculture|agribusiness|agrifood|agri-food|food\s+systems?|crop|crops|farmer|farmers|farm|farms|farming|smallholder|agrodealer|agro-dealer|agro\s+dealer|agrodelear|agro-delear|planting materials?|mat[eé]riel\s+v[eé]g[eé]tal|agtech|agritech|agri[-\s]?tech|advisory|conseil\s+agricole|vulgarisation|agri[-\s]?enterprise|policy\s+advocacy|block\s+farm|producteurs?|riz|vacs|adapted\s+crops?|orphan\s+crops?|gmo|gmos|ogm|ogms|lmo|lmos|biosafety|bios[eé]curit[eé]|biotech|biotechnologie|transgenic|transg[eé]nique|genetically\s+modified|cartagena\s+protocol|intrants?\s+agricoles?)\b/i.test(lower) || (isAgriInstitution && procurementSignal);

    // An opportunity with zero seed keywords, zero secondary agri keywords, and no agricultural signal

    // must not pass solely on African country or general partner names

    if (!agricultureSignal && coreHits === 0 && secondaryHits === 0) {
        return 0;
    }

    score += coreHits * 3;

    score += countryHits * 1;

    score += partnerHits * 1;

    score += secondaryHits * 1;
    if (procurementSignal && agricultureSignal) score += 1;
    return score;
}

function getExistingLinksAndTitleKeys(sheet) {
    const lastRow = sheet.getLastRow();
    const links = new Set();
    const titleKeys = new Set();
    const refCodes = new Set();
    const refCodeRowMap = new Map();
    const titleRowMap = new Map();
    if (lastRow < 2) return { links, titleKeys, refCodes, refCodeRowMap, titleRowMap };
    const startRow = Math.max(2, lastRow - CONFIG.EXISTING_ROWS_LOOKBACK + 1);
    const numRows = lastRow - startRow + 1;
    // Read Col 3 (Title) to Col 10 (Executive Summary) = 8 columns
    const values = sheet.getRange(startRow, 3, numRows, 8).getValues();
    values.forEach((row, idx) => {
        const actualRowNumber = startRow + idx;
        const title = row[0];
        const link = row[1];
        const status = row[2];
        const closingDate = row[3];
        const summary = row[7];

        const rowData = {
            rowNumber: actualRowNumber,
            title: title ? String(title).trim() : '',
            link: link ? String(link).trim() : '',
            status: status ? String(status).trim() : '',
            closingDate: closingDate ? String(closingDate).trim() : '',
            summary: summary ? String(summary).trim() : ''
        };

        if (link) {
            const canonical = canonicalizeUrl(link);
            const isGenericOracleListing = canonical.includes('oraclecloud.com') && !canonical.includes('auction');
            if (!isGenericOracleListing) {
                links.add(canonical);
                links.add(String(link).trim());
            }
        }

        if (title) {
            const tKey = normalizeTitleKey(title);
            titleKeys.add(tKey);
            titleRowMap.set(tKey, rowData);
        }
        const refCode = extractProcurementRefCode(link, title);
        if (refCode) {
            refCodes.add(refCode);
            refCodeRowMap.set(refCode, rowData);
        }
    });
    return { links, titleKeys, refCodes, refCodeRowMap, titleRowMap };
}

function evaluateWithFreeProvider(batchItems, basePrompt) {
    const candidateIdsList = batchItems.map(b => b.id).join(', ');
    const freeProviderPrompt = basePrompt + `

    Respond with a SINGLE JSON OBJECT of exactly this shape and nothing else:

    {"evaluations": [
      {"id": <integer>, "isGenuineOpportunity": <true|false>, "isOpen": <true|false>,
       "closingDate": "<string>", "businessFit": "HIGH"|"MEDIUM"|"LOW"|"NONE", "confidence": <integer 0-100>,
       "goNoGo": "GO"|"MAYBE"|"NO-GO", "score": <integer 0-100>,
       "pillar": "<string>", "summary": "<string>", "specificOpportunityTitle": "<string>",
       "country": "<string, e.g. Kenya, Nigeria, or Sub-Saharan Africa>",
       "biddingModality": "LEAD_BIDDER"|"CONSORTIUM_PARTNER"|"NOT_APPLICABLE", "partnerStrategy": "<string>"}
    ]}

    MANDATORY COMPLETENESS REQUIREMENT:

    You MUST return an evaluation object for EVERY SINGLE candidate ID listed above: [${candidateIdsList}].

    The evaluations array MUST contain exactly ${batchItems.length} objects. Do NOT omit, truncate, or skip any candidate ID.

  `;
    const freeProviders = CONFIG.FREE_EVALUATOR_PROVIDERS || [];
    for (let pIdx = 0; pIdx < freeProviders.length; pIdx++) {
        const provider = freeProviders[pIdx];
        if (provider.dailyExhausted) continue;
        const isLast = (pIdx === freeProviders.length - 1);
        const providerApiKey = PropertiesService.getScriptProperties().getProperty(provider.apiKeyProperty);
        if (!providerApiKey) continue;
        const attempt = tryOpenAiCompatibleEvaluator(provider, providerApiKey, freeProviderPrompt, isLast);
        if (attempt.success) {
            Logger.log(`[AI Evaluator] Successfully evaluated ${batchItems.length} candidate(s) with "${provider.name}".`);
            return attempt.data;
        }

        if (attempt.isDailyQuotaExhausted) {
            provider.dailyExhausted = true;
            Logger.log(`[AI Evaluator] ${provider.name} marked daily quota exhausted for remainder of run.`);
        }

        Logger.log(`[AI Evaluator] ${provider.name} attempt failed — ${attempt.reason}.`);
    }

    return null;
}


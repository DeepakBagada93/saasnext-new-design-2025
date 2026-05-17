---
name: aeo-optimizer
description: >
  Answer Engine Optimization (AEO) skill for optimizing website pages to rank in Google AI Overviews,
  ChatGPT, Perplexity, Bing Copilot, and other AI-powered answer engines. Use this skill whenever
  the user wants to optimize a webpage, blog post, landing page, or any site content for AI search,
  AEO, GEO (Generative Engine Optimization), AI Overviews, featured snippets, voice search, or
  asks how to "rank on AI". Also trigger for any request involving structured data/schema markup,
  FAQ optimization, entity SEO, or making content "AI-friendly". If the user mentions their website,
  a page URL, or any page content and wants better visibility in search or AI tools — use this skill.
---

# AEO Optimizer Skill

A skill for optimizing website pages for Answer Engine Optimization (AEO) — making content
discoverable and citable by AI-powered search engines like Google AI Overviews, Perplexity,
ChatGPT Search, Bing Copilot, and voice assistants.

---

## What is AEO?

AEO (Answer Engine Optimization) is the practice of structuring web content so AI engines can:
1. **Find it** — crawlable, indexable, fast-loading pages
2. **Understand it** — semantic HTML, schema markup, clear entities
3. **Trust it** — E-E-A-T signals, author credentials, citations
4. **Quote it** — concise, direct answers to specific questions
5. **Cite it** — authoritative, well-linked content

---

## Workflow: How to Optimize a Page for AEO

### Step 1 — Gather Input

Ask the user for (or extract from context):
- The **page URL** or **raw page content** (HTML/text)
- The **page type**: Homepage / Service page / Blog post / Product page / FAQ / Landing page
- The **target topic or keyword** this page should rank for
- The **target audience** (general public, professionals, local, global)
- Any **competitors** or reference URLs they want to outrank

If the user provides a URL, instruct them to paste the page text or key sections since direct
fetching may be restricted. If they paste raw content, proceed directly.

---

### Step 2 — AEO Audit (Run on every page)

Evaluate the page across these 7 pillars and score each 1–10:

#### Pillar 1: Question-First Content Structure
- Does the page answer a clear, specific question in the first 100 words?
- Are H2/H3 headings phrased as questions users actually ask?
- Is there a concise 40–60 word "direct answer" paragraph near the top?

**Fix:** Rewrite the intro to lead with the answer, not the build-up.

#### Pillar 2: Schema Markup (Structured Data)
Check for and recommend the right schema types:

| Page Type        | Required Schema                              |
|------------------|----------------------------------------------|
| FAQ page         | `FAQPage`, `Question`, `Answer`              |
| Blog/Article     | `Article`, `BlogPosting`, `BreadcrumbList`   |
| Product page     | `Product`, `Offer`, `AggregateRating`        |
| Service page     | `Service`, `LocalBusiness`, `Organization`   |
| How-to content   | `HowTo`, `HowToStep`                         |
| Homepage         | `Organization`, `WebSite`, `SiteLinksSearchBox` |
| Event            | `Event`                                      |
| Recipe           | `Recipe`                                     |

**Fix:** Generate the exact JSON-LD block for the page type (see Schema Templates below).

#### Pillar 3: E-E-A-T Signals
(Experience, Expertise, Authoritativeness, Trustworthiness)
- Is there a visible author with credentials/bio?
- Are there references, citations, or outbound links to authoritative sources?
- Is there a "last updated" date on the page?
- Does the site have an About page, Contact page, Privacy Policy?
- Are there reviews, testimonials, or case studies?

**Fix:** Add author schema, cite sources inline, add a "Reviewed by" or "Last updated" note.

#### Pillar 4: Conversational & Long-tail Query Coverage
- Does the content naturally include question phrases ("what is", "how to", "why does", "best way to")?
- Does it address the full search intent (informational / navigational / transactional / local)?
- Are there variations of the core topic covered (synonyms, related entities)?

**Fix:** Add an FAQ section with 5–10 natural-language questions. Use People Also Ask (PAA)
research to find real questions (tools: AlsoAsked, AnswerThePublic, Google PAA boxes).

#### Pillar 5: Snippet-Optimized Formatting
AI engines prefer specific formats for different answer types:

| Answer Type      | Best Format                                  |
|------------------|----------------------------------------------|
| Definition       | 1–2 sentence paragraph after bolded term     |
| Steps/Process    | Numbered list with clear action verbs        |
| Comparison       | Table with clear column headers              |
| List of items    | Bulleted list, 6–8 items max                 |
| Local info       | Name, Address, Phone (NAP) + map embed       |
| Stats/Data       | Inline with source citation and year         |

**Fix:** Restructure content blocks to match these formats explicitly.

#### Pillar 6: Semantic SEO & Entity Optimization
- Is the primary entity (topic, brand, person, place, product) explicitly named in the first paragraph?
- Are related entities, synonyms, and co-occurring terms used naturally?
- Are internal links pointing to topically related pages?
- Is the page part of a topic cluster (pillar + supporting pages)?

**Fix:** Add entity mentions naturally, build internal link clusters, use `sameAs` in Organization schema.

#### Pillar 7: Technical AEO Health
- Page loads under 2.5s (Core Web Vitals: LCP)
- Mobile-friendly (Google mobile-first indexing)
- HTTPS secured
- Canonical tag present
- `robots.txt` allows indexing
- Open Graph + Twitter Card meta tags set
- `hreflang` if multilingual

**Fix:** Provide specific meta tag templates and technical recommendations.

---

### Step 3 — Deliverables to Generate

For each page, produce ALL of the following:

#### A. Optimized Title Tag & Meta Description
```
Title (50–60 chars): [Keyword] — [Benefit/Action] | [Brand]
Meta Description (120–155 chars): Direct answer to the query + CTA.
```

#### B. Optimized H1 + Opening Paragraph
- H1: Contains the primary keyword, reads naturally
- Opening paragraph: 40–60 words, answers the main question directly

#### C. FAQ Section (minimum 5 Q&As)
Format each as:
```
**Q: [Natural language question]**
A: [Concise 2–4 sentence answer. No fluff. Cite sources if factual.]
```
Source questions from: Google PAA, "People Also Ask", AlsoAsked.com,
related searches, and long-tail keyword research.

#### D. JSON-LD Schema Block
Generate complete, valid JSON-LD for the page type (see templates below).
Place in `<head>` or just before `</body>`.

#### E. Content Restructuring Recommendations
List specific changes: which paragraphs to shorten, which headings to
rephrase as questions, which sections need tables/lists, where to add
internal links, and what supporting pages to create.

#### F. AEO Scorecard
| Pillar                        | Score (1–10) | Top Fix                        |
|-------------------------------|--------------|-------------------------------|
| Question-First Structure      | X/10         | ...                           |
| Schema Markup                 | X/10         | ...                           |
| E-E-A-T Signals               | X/10         | ...                           |
| Conversational Query Coverage | X/10         | ...                           |
| Snippet-Optimized Formatting  | X/10         | ...                           |
| Semantic SEO & Entities       | X/10         | ...                           |
| Technical AEO Health          | X/10         | ...                           |
| **Overall AEO Score**         | **X/70**     |                               |

---

## Schema Templates

### FAQPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "QUESTION TEXT HERE",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ANSWER TEXT HERE (plain text, no HTML)"
      }
    }
  ]
}
```

### Article / BlogPosting Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "PAGE TITLE",
  "description": "META DESCRIPTION",
  "author": {
    "@type": "Person",
    "name": "AUTHOR NAME",
    "url": "AUTHOR BIO URL"
  },
  "publisher": {
    "@type": "Organization",
    "name": "BRAND NAME",
    "logo": {
      "@type": "ImageObject",
      "url": "LOGO URL"
    }
  },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "PAGE URL"
  }
}
```

### Organization + WebSite Schema (Homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BRAND NAME",
  "url": "HOMEPAGE URL",
  "logo": "LOGO URL",
  "sameAs": [
    "LINKEDIN URL",
    "TWITTER URL",
    "FACEBOOK URL"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "PHONE",
    "contactType": "customer service"
  }
}
```

### HowTo Schema
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "HOW TO [TASK]",
  "description": "BRIEF DESCRIPTION",
  "step": [
    {
      "@type": "HowToStep",
      "name": "STEP NAME",
      "text": "STEP DESCRIPTION"
    }
  ]
}
```

---

## AEO Content Patterns (Use These Everywhere)

### The "Direct Answer" Pattern
```
[Primary keyword] is [definition]. [One sentence expanding it].
[One sentence on why it matters or what to do next].
```
Example: "AEO (Answer Engine Optimization) is the practice of structuring website 
content so AI search engines can directly quote and cite it. Unlike traditional SEO, 
AEO focuses on question-answer formats, schema markup, and E-E-A-T signals that 
AI models use to select citations."

### The "Inverted Pyramid" Pattern
1. Answer first (most important info)
2. Supporting details
3. Background/context
4. Examples
5. Related links/CTA

### The "PAA Cluster" Pattern
For each target keyword, create a cluster of:
- 1 pillar page (comprehensive guide, 1500–3000 words)
- 3–5 supporting pages (each answering one specific PAA question, 500–800 words)
- FAQ section on the pillar page linking to supporting pages

---

## Multi-Page Website Workflow

When optimizing an entire website (not just one page):

1. **Audit homepage first** — Organization schema, brand entity, site-wide E-E-A-T
2. **Map page types** — Categorize all pages (service, blog, product, FAQ, about, contact)
3. **Prioritize by traffic potential** — High-volume informational pages first
4. **Build topic clusters** — Group related pages, ensure internal linking
5. **Create an AEO content calendar** — New FAQ/how-to pages targeting PAA questions
6. **Monitor AI citations** — Track if pages appear in AI Overviews using tools like:
   - SE Ranking AI Overview Tracker
   - Semrush AI Overview reports
   - Manual spot-checks in Google, Perplexity, ChatGPT Search

---

## Output Format Guidelines

- Always produce **ready-to-use** outputs (copy-paste schema, exact meta tags, rewritten paragraphs)
- Never give vague advice like "improve your content" — give the exact rewritten version
- Flag quick wins (fixes that take under 30 minutes) vs. strategic wins (require content creation)
- If the user gives multiple pages, handle them one at a time with a numbered summary at the end

---

## Reference: AEO vs SEO vs GEO

| Factor            | Traditional SEO           | AEO                          | GEO (Generative Engine Opt.) |
|-------------------|---------------------------|------------------------------|-------------------------------|
| Target            | Google blue links         | AI Overviews, voice, PAA     | ChatGPT, Perplexity, Claude   |
| Key signal        | Backlinks + keywords      | Schema + direct answers      | Authoritative citations       |
| Content format    | Long-form articles        | Q&A, FAQs, How-Tos           | Cited facts, data, expertise  |
| Primary metric    | Rankings / organic clicks | Featured in AI answers       | Brand mentions in AI outputs  |
| Schema importance | Moderate                  | Critical                     | Helpful                       |
| E-E-A-T           | Important                 | Critical                     | Critical                      |

All three strategies overlap — optimizing for AEO also improves GEO and traditional SEO.

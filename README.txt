Holcim UK Talent Hub - colleague and manager pages for Blink
Updated 17th November 2026 (first prepared 15th October 2026)

WHAT THIS IS
Static HTML pages that make up the Talent Hub. No server-side code, no database, no sign-in logic. Host the folder as-is and open index.html.

FILES
  index.html                            Talent Hub landing page. Two doors: colleague tools and manager toolkit
  Your Career Tools.html                Colleague hub, links to the colleague tools below
  Career Conversation Prep.html         Prepare for a career conversation, with "Download as PDF"
  Holcim Career Reflections.html        Career Reflections
  Development Plan.html                 Development Plan (IDP builder)
  Manager Tools.html                    Manager toolkit hub
  Manager Career Conversation Kit.html  Career Conversation Kit for line managers
  vendor/                               Libraries bundled locally:
                                          react.production.min.js      React 18.3.1
                                          react-dom.production.min.js  React DOM 18.3.1
                                          jspdf.umd.min.js             jsPDF 2.5.1 (PDF export on Career Conversation Prep)
                                          babel.min.js                 Babel standalone 7.29.0. Used by build.js only; pages do not load it
  src/                                  Editable source (JSX) for the three React pages. See "Changing a page" below
  build.js                              Compiles src/ into the pages

Keep the pages and the vendor folder together in one directory. Links between the pages are relative, so the folder can sit at any path. Filenames contain spaces; links are written to match, so do not rename files without updating the links.

Only the .html files and vendor/ need to be hosted. src/, build.js and this README can be left out.

CHANGING A PAGE
Career Reflections, the Development Plan and the Manager Career Conversation Kit are React pages. Their code is written in JSX and compiled to plain JavaScript in advance, so browsers do not have to run Babel on every visit.

  To change one of these pages:
    1. Edit its file in src/ (holcim-career-reflections.jsx, development-plan.jsx or manager-career-conversation-kit.jsx). The page's HTML and CSS outside the script stay in the .html file as before.
    2. Run:  node build.js      (needs Node.js; nothing to install)
    3. Commit both the src/ file and the updated .html file.
  Do not edit the compiled block in the .html file: the next build overwrites it.

  If you upload a fresh export of one of these pages that still contains <script type="text/babel">, run "node build.js". It saves the new code into src/ and compiles the page.
  "node build.js --check" lists any page that has not been built, without changing anything.

  An export from a design tool that packs everything into one large self-unpacking file (as the Development Plan used to be, at 1.7 MB) needs unpacking into a normal page first. Ask whoever maintains the repo.

KNOWN GAPS
  - "Team Talent View.html" is linked from Manager Tools ("Discover") but is not in this folder yet. That link will 404 until the page is added.

HOSTING REQUIREMENTS
  - Serve over HTTPS. Career Reflections, Career Conversation Prep, the Development Plan and the Manager Career Conversation Kit save entries in browser localStorage and nothing is sent anywhere. This needs a stable origin, so the pages must stay on one domain and path.
  - Allow outbound access to fonts.googleapis.com and fonts.gstatic.com. The pages load Montserrat and Reddit Sans from Google Fonts. If that is blocked the pages still work but fall back to the system font.
  - Allow outbound access to cdn.jsdelivr.net. Career Conversation Prep fetches Montserrat font files from there to embed in its PDF. If that is blocked the PDF is still produced, in a standard font.
  - Content Security Policy: the pages use inline <script> and <style> blocks, so a CSP must allow 'unsafe-inline' for scripts and styles. 'unsafe-eval' is not needed: the JSX is pre-compiled and the pages do not load Babel. If Blink needs a stricter CSP than that, say so and the inline scripts can be moved into separate files.
  - Pop-ups and downloads must not be blocked for the host domain (PDF and notes export).

OUTBOUND LINKS (open in a new tab)
  SuccessFactors, CareerHub (holcim.gloat.com), Holcim UK Academy (aggregate.csod.com), Holcim University and NextGen pages on connect.holcim.com, Percipio, and the New Manager Toolkit (new-manager-toolkit.vercel.app).

Contact: Liv Adamowicz, Head of Talent.

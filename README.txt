Holcim UK Talent Hub - colleague and manager pages for Blink
Updated 17th November 2026 (first prepared 15th October 2026)

WHAT THIS IS
Static HTML pages that make up the Talent Hub. No server-side code, no database, no sign-in logic. Host the folder as-is and open index.html.

FILES
  index.html                            Talent Hub landing page. Two doors: colleague tools, and the manager toolkit (on its own site, see below)
  Your Career Tools.html                Colleague hub, links to the colleague tools below
  Career Conversation Prep.html         Prepare for a career conversation, with "Download as PDF"
  Holcim Career Reflections.html        Career Reflections
  Development Plan.html                 Development Plan (IDP builder)
  vendor/                               Libraries bundled locally:
                                          react.production.min.js      React 18.3.1
                                          react-dom.production.min.js  React DOM 18.3.1
                                          jspdf.umd.min.js             jsPDF 2.5.1 (PDF export on Career Conversation Prep)
                                          babel.min.js                 Babel standalone 7.29.0. Used by build.js only; pages do not load it
  src/                                  Editable source (JSX) for the two React pages. See "Changing a page" below
  build.js                              Compiles src/ into the pages

Keep the pages and the vendor folder together in one directory. Links between the pages are relative, so the folder can sit at any path. Filenames contain spaces; links are written to match, so do not rename files without updating the links.

MANAGER PAGES LIVE ON THE MANAGER SITE
Manager Tools and the Manager Career Conversation Kit are not in this repository. They live in holcim-uk/New_Manager_ToolKit, served at https://new-manager-toolkit.vercel.app/ (the address Blink uses). The "Manager toolkit" door on index.html and the manager link on Your Career Tools go there. If the manager site moves, update those two links.
The manager site links back here for colleague pages (Your Career Tools, the Development Plan). Keeping one copy of each page means fixes only need making once, and each person's saved notes stay in one place: browsers keep saved entries separately for each website.

Only the .html files and vendor/ need to be hosted. src/, build.js and this README can be left out.

CHANGING A PAGE
Career Reflections and the Development Plan are React pages. Their code is written in JSX and compiled to plain JavaScript in advance, so browsers do not have to run Babel on every visit.

  To change one of these pages:
    1. Edit its file in src/ (holcim-career-reflections.jsx or development-plan.jsx). The page's HTML and CSS outside the script stay in the .html file as before.
    2. Run:  node build.js      (needs Node.js; nothing to install)
    3. Commit both the src/ file and the updated .html file.
  Do not edit the compiled block in the .html file: the next build overwrites it.

  If you upload a fresh export of one of these pages that still contains <script type="text/babel">, run "node build.js". It saves the new code into src/ and compiles the page.
  "node build.js --check" lists any page that has not been built, without changing anything.

  An export from a design tool that packs everything into one large self-unpacking file (as the Development Plan used to be, at 1.7 MB) needs unpacking into a normal page first. Ask whoever maintains the repo.

HOSTING REQUIREMENTS
  - Serve over HTTPS. Career Reflections, Career Conversation Prep and the Development Plan save entries in browser localStorage and nothing is sent anywhere. This needs a stable origin, so the pages must stay on one domain and path.
  - Allow outbound access to fonts.googleapis.com and fonts.gstatic.com. The pages load Montserrat and Reddit Sans from Google Fonts. If that is blocked the pages still work but fall back to the system font.
  - Allow outbound access to cdn.jsdelivr.net. Career Conversation Prep fetches Montserrat font files from there to embed in its PDF. If that is blocked the PDF is still produced, in a standard font.
  - Content Security Policy: the pages use inline <script> and <style> blocks, so a CSP must allow 'unsafe-inline' for scripts and styles. 'unsafe-eval' is not needed: the JSX is pre-compiled and the pages do not load Babel. If Blink needs a stricter CSP than that, say so and the inline scripts can be moved into separate files.
  - Pop-ups and downloads must not be blocked for the host domain (PDF and notes export).

OUTBOUND LINKS (open in a new tab)
  SuccessFactors, CareerHub (holcim.gloat.com), Holcim UK Academy (aggregate.csod.com), Holcim University and NextGen pages on connect.holcim.com, Percipio, and the New Manager Toolkit (new-manager-toolkit.vercel.app).

Contact: Liv Adamowicz, Head of Talent.

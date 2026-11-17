Holcim UK Talent Hub - colleague and manager pages for Blink
Updated 17th November 2026 (first prepared 15th October 2026)

WHAT THIS IS
Static HTML pages that make up the Talent Hub. No server-side code, no database, no sign-in logic. Host the folder as-is and open index.html.

FILES
  index.html                            Talent Hub landing page. Two doors: colleague tools and manager toolkit
  Your Career Tools.html                Colleague hub, links to the colleague tools below
  Career Conversation Prep.html         Prepare for a career conversation, with "Download as PDF"
  Holcim Career Reflections.html        Career Reflections
  Development Plan.html                 Development Plan (IDP builder). Self-contained: React and Babel are embedded in the file
  Manager Tools.html                    Manager toolkit hub
  Manager Career Conversation Kit.html  Career Conversation Kit for line managers
  vendor/                               Libraries bundled locally:
                                          react.production.min.js      React 18.3.1
                                          react-dom.production.min.js  React DOM 18.3.1
                                          babel.min.js                 Babel standalone 7.29.0
                                          jspdf.umd.min.js             jsPDF 2.5.1 (PDF export on Career Conversation Prep)

Keep the pages and the vendor folder together in one directory. Links between the pages are relative, so the folder can sit at any path. Filenames contain spaces; links are written to match, so do not rename files without updating the links.

KNOWN GAPS
  - "Team Talent View.html" is linked from Manager Tools ("Discover") but is not in this folder yet. That link will 404 until the page is added.

HOSTING REQUIREMENTS
  - Serve over HTTPS. Career Reflections, Career Conversation Prep, the Development Plan and the Manager Career Conversation Kit save entries in browser localStorage and nothing is sent anywhere. This needs a stable origin, so the pages must stay on one domain and path.
  - Allow outbound access to fonts.googleapis.com and fonts.gstatic.com. The pages load Montserrat and Reddit Sans from Google Fonts. If that is blocked the pages still work but fall back to the system font.
  - Allow outbound access to cdn.jsdelivr.net. Career Conversation Prep fetches Montserrat font files from there to embed in its PDF. If that is blocked the PDF is still produced, in a standard font.
  - The pages compile their own JSX in the browser via Babel, so a Content Security Policy must allow inline scripts and 'unsafe-eval'. If Blink enforces a strict CSP, say so and the pages can be pre-compiled instead.
  - Pop-ups and downloads must not be blocked for the host domain (PDF and notes export).

OUTBOUND LINKS (open in a new tab)
  SuccessFactors, CareerHub (holcim.gloat.com), Holcim UK Academy (aggregate.csod.com), Holcim University and NextGen pages on connect.holcim.com, Percipio, and the New Manager Toolkit (new-manager-toolkit.vercel.app).

Contact: Liv Adamowicz, Head of Talent.

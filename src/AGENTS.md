# Grand Theft Developer: a GTA VI-style developer portfolio

A developer portfolio built on the layout and motion of the GTA VI website (https://www.rockstargames.com/VI). Fan-made, not affiliated with Rockstar Games.

- **Layout and motion** match the live site exactly: layout, type scale, colours, timing and easing.
- **Content and artwork** are ours: the text in `CONTENT.md`, and the illustrations, logo and videos in `src/assets/`.

## Inputs

1. The user's prompts.
2. This file, and `CONTENT.md` for every word on the page.
3. `src/assets/` (artwork, logo, fonts, `hosted-media.json`) and the screen recordings in `src/references/`.
4. The live site: the source for layout, sizes, timing and motion only.

There is no earlier code, notes or known values. Never assume a value from memory or from how similar sites usually work; find it on the live site.

## Stack

React + Vite, Tailwind CSS, GSAP (ScrollTrigger), Lenis for smooth scrolling. Plain JavaScript, no TypeScript.

## Method: Record → Measure → Extract → Rebuild → Diff

1. **Record:** `src/references/` holds one screen recording per section of the live site. They are the reference for motion and never ship.
2. **Measure:** with playwright-core and headless Chrome, dump computed styles and bounding boxes from the live site, sampling every 50px of scroll at 375, 768, 1024, 1440, 1920 and 2560px wide, plus phone landscape.
3. **Extract:** read the live site's front-end code for exact triggers, durations, eases and values. Prefer these to values fitted from recordings.
4. **Rebuild:** build from the numbers.
5. **Diff:** run the same measurement on localhost and compare.

Rules:
- Measure before building. When something looks off, measure both sites; never adjust by eye.
- Before trusting live-site numbers, check that headless Chrome received the same page a real browser does (compare with the recordings).
- When a value breaks the pattern found so far, measure it at every width instead of forcing it into the pattern.

## Definition of done

A section is done only when:
- its diff is within 1px / 1% at every width above. Mobile is part of the section, never a follow-up;
- its motion matches its recording, checked frame by frame;
- its handoffs work: what happens to the previous section as it arrives, pins, navbar changes, and the cursor glow (a soft light behind the page that follows the pointer: match its size, colour, blur, layering, and when it fades or returns);
- its text fits its artwork;
- `prefers-reduced-motion: reduce` gives a readable, static version, and everything clickable works by keyboard with a visible focus outline;
- nothing earlier broke: re-run earlier sections' checks after changing shared code.

Report what was checked and what still doesn't match.

## Tools

- Measuring and diff scripts live in `tools/` and stay reusable: they take a URL, a viewport width and selectors.
- Measurement output and temporary files go in `.measure/`, which is git-ignored.

## Assets

```
src/assets/
  brand/              the logo poster (VI + wordmark) and the loader logo
  fonts/              Outfit and Barlow Condensed (free, Google Fonts)
  site/               every image the page loads, already cut to size
    hero/             collage pieces + logo layers, desktop + mobile
    meet-the-developer/  services/  highlights/  clients/  blog/  footer/
  source/             the original artwork, grouped by shape, and the hero piece outlines
  hosted-media.json   Cloudinary links to the two scroll-scrubbed videos
```

- Use `site/` as delivered and never edit it by hand. If a slot needs a different crop, re-cut it from `source/` with a script in `tools/`.
- On the first pass through the assets, record which file belongs to which section under Findings, and keep that map current.

## Artwork

Our own artwork only. Never download, hotlink or trace Rockstar's images, video, logos or fonts.

- Measure each artwork slot on the live site (box size, aspect ratio, crop, focal point) at every width and fit our art to it. Never upscale past the original size. When square art fills a wide or tall slot, place it whole and fill the rest with a blurred extension, so text baked into the art stays readable.
- Check every crop at desktop and phone widths: the subject stays in view and clear of the text over it. Put a card's text on the side where the art leaves room.
- **Hero:** match the live site's layer count, canvas size and positions so the intro lines up; measure them first. The poster shown after the intro must match the intro's last frame pixel for pixel, or the logo flickers at the swap. All logo layers come from the same source, so they stack exactly.
- If no asset fits a slot, use a plain placeholder of the right size and list it under Open differences.

## Scroll-scrubbed videos

- Import their links from `src/assets/hosted-media.json`; never copy URLs into components.
- Build renditions with Cloudinary URL transformations: keep every frame, add a keyframe every few frames, drop the audio, and give portrait phones a 9:16 crop that follows the subject. The poster is the first frame of the same crop, so nothing jumps when the video takes over.
- Check each video's real length and frame count before mapping it to scroll, and how many pixels of scroll each frame gets. If a short clip would step, play it over part of the scroll range and hold the first and last frames either side.

## Page map

| Live section | Our section |
|---|---|
| Loader | Loader, with our loader logo as the shape |
| Navbar | GTD monogram, menu icon, and a "Hire Me" pill that appears as the hero scrolls away |
| Hero (layered intro) | Our collage and logo, tagline, "Hire Me" button, tech tags, fan-made line |
| Launch Trailer | Meet the Developer: pinned scene, a wide featured card, and three project cards |
| Ultimate Edition | Services: scroll-scrubbed video backdrop and two service cards |
| Vice City, USA. | Nairobi, Kenya.: bio over the scroll-scrubbed city video |
| Feature cards | Three wide cards: Open to Work, After Hours, The Heist |
| Shop | Clients: two cards in a scroll-snap carousel |
| Featured News | Blog: three posts |
| Footer | Logo, "Build Your Own" pill, socials, links, disclaimer, "Rated D for Developer" badge |

Keep our own titles whatever the live site's headings say, and don't build promo strips or banners above the page. When the live page has something this page map doesn't, ask the user before building it.

## Content

Use the content from `CONTENT.md`, next to this file: it holds every word on the page, section by section. Put it in one content file, `src/content.js`, with one object per section, and have components read from it. `CONTENT.md` is the source of truth: when it changes, update `src/content.js` to match. A viewer makes the site theirs by editing `CONTENT.md` and swapping the artwork. Several images have titles painted into them; the copy in `CONTENT.md` matches them, so if you change one, change the other.

- **Voice:** first person ("I build…"). The developer's name appears only in the page title, the meta description and the bio.
- **Samples:** the name, projects, clients, numbers and links are samples for viewers to replace. Keep every link in one `LINKS` object, all set to `#`. Never present samples as real: where artwork shows real company logos or badges, label it "Sample".
- **Disclaimer:** "Fan-made GTA VI-style portfolio. Not affiliated with Rockstar Games." appears in the hero, the footer and the meta description. Never remove it.

## Project memory

This file is the only context that carries between prompts and sessions. Keep it current so a new session can pick up exactly where the last one stopped.

- **Progress:** update it at the end of every task, before replying: done, in progress, next, and open differences from the live site. Write it for someone with no other context.
- **Findings:** add facts as they're established (asset map, how sizes scale, breakpoints, colours, fonts, code layout, non-obvious problems) with where each was measured.
- Keep both short. Delete anything proven wrong, and collapse finished work into one line.

## Git

- Commits are authored by the user. **Never add an AI co-author or attribution line** to commits or PRs.
- Commit only when asked. Never force-push.

## Progress

**Done:** Updated Hero and Navbar layout to match reference design:
- Navbar: Plain text `GTD` monogram on left, 2-line menu icon on right.
- Hero: Centered framed collage box (`poster.avif` + overlaid `poster-logo.avif`) with restrained purple ambient glow.
- Controls bar: Left-aligned role/availability (`FULL-STACK DEVELOPER` / `BOOKING SPRING 2027`), center pastel-pink `Hire Me` pill button, right-aligned vertical tech list (`REACT`, `NODE.JS`, `POSTGRESQL`).
- Centered small disclaimer and down chevron.
- Deep midnight background (`#07080d`), custom fonts, and GTA VI styled gradient favicon.
- The hero proportions and vertical spacing were rebuilt to match the 1034px reference proportions: 68vw framed canvas, 64px header band, 76px controls separation.
- Browser viewport measurement verified the header, poster, controls, disclaimer, and chevron boxes.

**Done (loading + intro):** Loading screen and intro animation added.
- LoadingScreen component: full-viewport overlay with pulsing `loader-logo.svg`, stays visible until all fonts + images have loaded (minimum 800 ms). Fades out over 0.6 s with `power2.inOut`.
- IntroAnimation component: 10 desktop shards (`shard-01` to `shard-10`) fly in from unique directions with `expo.out` easing, staggered 0.072 s, 1.55 s duration each; logo-vi scales/deblurs in at 0.85 s (`expo.out`, 0.8 s); logo-gta wordmark fades/slides in at 1.05 s (`power3.out`, 0.62 s).
- The intro asset wait now has a 3-second fallback, preventing loading-state stalls when an image or asset event remains pending.
- Mobile intro variants (`site/hero/mobile`) are selected below the 700px breakpoint.
- Intro frame now shares the static poster's 16:9 dimensions and exact top/center position; the poster is hidden during assembly to avoid seeing the complete image underneath.
- Browser geometry check: intro frame and poster bounds match exactly at 1440×900 and 390×844.
- Loader fades completely before the shard timeline begins. Asset readiness no longer waits for `requestAnimationFrame`, which can pause in hidden tabs.
- Static HTML loader in `index.html` prevents any black frame before React mounts.
- `prefers-reduced-motion: reduce` shows static final state, no fly-in.
- Phase machine in App.jsx: loading → intro → done.

**Done:** Loader no longer waits for all below-the-fold assets; page images load lazily, hosted videos load only near their sections and have local poster fallbacks. Fixed short-viewport hero flex-shrink that cut the poster height in half. Matched project, feature, client, and Meet card aspect ratios to their supplied artwork; Services cards now preserve the full desktop art and use a split layout with the supplied portrait image on mobile.

**Done:** Reworked the hero handoff as a scroll-stage crossfade: the pinned hero fades and lifts while Meet the Developer rises behind it; the navbar Hire Me pill appears during the final part of the transition. Browser-checked forward and reverse scrolling on desktop and mobile, including the hero, reveal, and navbar progress values. Production build passes.

**Done:** On short viewports, the hero poster and controls row now share one width cap, keeping their left and right edges aligned. The hero content also fits the viewport without clipping the down chevron. Checked short desktop and mobile layouts in the browser.

**Done:** Finished the lower page with the Nairobi bio/video, three wide highlight cards, a scroll-snap clients carousel using the existing client cards, three blog cards, and the footer. The hosted city video loads and scrubs with section scroll.

**Done:** Full-page responsive polish: the static mobile hero now uses the same mobile artwork as its intro; mobile trailer/highlight art is extended into the card backgrounds instead of leaving empty bands. Added a fine-pointer cursor glow and shared 24 fps scroll-video seeking that coalesces rapid scrolls and waits for each seek before applying the latest position. Video downloads still begin only near their sections.

**Next:** Compare the transition frame by frame with the tutorial recording when it is playable; current timing and easing are verified in the app, not against the inaccessible YouTube video.

**Open differences:** Exact transition timing/easing and some composition details remain unverified because the reference recordings/video kit are inaccessible. Mobile was checked at a 390px device size with the responsive breakpoint active, but the browser reports a 487px CSS viewport due to its scaling; pixel-exact measurements at a 390px CSS viewport remain unavailable. The services clip decoded at 1280×720; city-video network behavior was not verified. Local posters remain visible if hosted media fails.

## Findings

### Reference Comparison
- Rockstar's mobile hero stacks its headline above the collage and platform/CTA controls below. The portfolio now follows that order with its own tagline, mobile poster, Hire Me CTA, and tech tags.
- The browser's mobile emulation reports `screen.width=390` and `innerWidth=487`; `(max-width: 700px)` is active on both the reference and local page. The local hero selects `site/hero/mobile/poster.avif`.

### Asset Map

Every asset in `src/assets/` categorized by its target section, source origin, and purpose:

#### 1. Brand & Loader
- `brand/loader-logo.svg`: Vector monochrome silhouette of the "Grand Theft Developer" wordmark. Used as the animated shape in the initial loader screen.
- `brand/logo-poster.png`: Master high-resolution (1254×~1672) complete logo (vibrant VI gradient numeral + "Grand Theft Developer" wordmark). Master source for the hero and footer logos.

#### 2. Typography (`fonts/`)
- `fonts/outfit-variable.woff2`: Primary body and interface font (variable weight 100-900, Google Fonts Outfit, Latin subset).
- `fonts/barlow-condensed-700.woff2`: Bold condensed display font for headlines, buttons, and badges.
- `fonts/barlow-condensed-900.woff2`: Extra-bold / black condensed display font for major section titles and callouts.

#### 3. Hosted Media (`hosted-media.json`)
- `hosted-media.json` → `services`: Cloudinary video link (`1sec.mp4`, 1280×720, 24fps) featuring developer neck-rotation. Scroll-scrubbed behind the Services cards.
- `hosted-media.json` → `city`: Cloudinary video link (`video2.mp4`, 1280×720, 24fps, 6.2s) pulling back from developer on sportbike to palms. Scroll-scrubbed behind "Nairobi, Kenya.".

#### 4. Site-Ready Assets (`site/`)
*Ready-to-use AVIF web formats, pre-cut to exact live-site slot dimensions:*

- **Hero (`site/hero/`)**:
  - `desktop/` & `mobile/`:
    - `shard-01.avif` through `shard-10.avif`: The 10 collage pieces that explode/assemble into position during the hero intro scroll animation.
    - `logo-vi.avif`: The iconic gradient "VI" layer.
    - `logo-gta.avif`: The "Grand Theft Developer" wordmark overlay layer.
    - `poster-logo.avif`: Combined logo layer (VI + wordmark) swapped in at the end of the intro sequence.
    - `poster.avif`: Static hero collage backdrop image matching the intro's resting frame.

- **Meet the Developer (`site/meet-the-developer/`)**:
  - `scene.avif`: Pinned trailer scene backdrop (developer with supercar).
  - `featured-desktop.avif`: Wide 5:2 featured card art ("Ride Along", sportbike rider).
  - `featured-mobile.avif`: 2:3 aspect ratio crop of the featured card for mobile viewports.
  - `card-1.avif`: Project card 1 ("AI" → "AI Book Assistant").
  - `card-2.avif`: Project card 2 ("3D Web" → "3D Basketball Website").
  - `card-3.avif`: Project card 3 ("Mobile" → "React Native Language App").

- **Services (`site/services/`)**:
  - `card-tall-desktop.avif`: Large featured service card ("Code Rescue", neon hotel sign art).
  - `card-tall-mobile.avif`: Mobile portrait crop of the tall service card.
  - `card-short.avif`: Wide service card ("Full-Stack / Builds", rooftop skyline art).

- **Highlights / Wide Cards (`site/highlights/`)**:
  - `open-to-work.avif`: Card 1 ("Status: Open to Work", sunset coast art).
  - `after-hours.avif`: Card 2 ("Community: After Hours", neon nightclub art).
  - `the-heist.avif`: Card 3 ("Case Study: The Heist", vault heist art).
  - `off-the-clock.avif`: Card 4 ("Personal: Off the Clock", alligator float art).

- **Clients (`site/clients/`)**:
  - `clients.avif`: Card 1 ("Startups, Agencies and Product Teams", motel key-rack art).
  - `testimonial.avif`: Card 2 ("Sample Review", Miami postcard art).

- **Blog (`site/blog/`)**:
  - `post-1.avif`: Post cover ("700 AI Agents Escaped and Became Hackers").
  - `post-2.avif`: Post cover ("Agentic Engineering in 2026").
  - `post-3.avif`: Post cover ("Think System Design & Architecture").

- **Footer (`site/footer/`)**:
  - `logo.avif`: Grand Theft Developer logo badge for the site footer.

#### 5. High-Resolution Source Originals (`source/`)
*Original raw PNG artwork used to generate and re-cut any site slot assets:*
- `banners/`: ~5:2 banners (`alligator-float.png`, `sunset-coast.png`, `vault-heist.png`).
- `blog/`: 1672×941 blog illustrations (`agentic-engineering-2026.png`, `ai-agents-escaped.png`, `system-design-architecture.png`).
- `clients/`: 1254² client art (`happy-clients-key-rack.png`, `miami-postcard-testimonial.png`).
- `hero-masks/`: Shard outline alpha masks for desktop and mobile (`shard-01.png` - `shard-10.png`).
- `posters/`: 941×1672 vertical posters (`full-stack-developer.png`, `off-the-clock.png`, `sunset-codeposter.png`, `the-heist-case-study.png`).
- `projects/`: 1254² square project covers (`3d-basketball-website.png`, `ai-book-assistant.png`, `react-native-language-app.png`).
- `scenes/`: ~16:9 cinematic scenes (`after-hours-nightclub.png`, `code-master-supercar.png`, `projects-developer-supercar.png`, `rooftop-full-stack.png`, `site-glow-hotel-sign.png`, `sportbike-rider.png`).
- `squares/`: ~1254² artwork pieces (`achievements.png`, `beachfront-classic-car.png`, `performance-speedboat.png`, `supercar-projects-tower.png`, `supercar-tech-stack.png`).
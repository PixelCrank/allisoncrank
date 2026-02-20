import type { Metadata } from 'next';
import ScrollAnimations from '../ScrollAnimations';
import DesignerCursor from '../DesignerCursor';
import PrintButton from '@/components/PrintButton';

export const metadata: Metadata = {
  title: 'CV',
  description:
    'Curriculum vitae — Allison Crank. Interaction designer, researcher, and founder of Crank Studio. Experience across XR, AI, spatial computing, and immersive design.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'CV — Allison Crank',
    description:
      'Curriculum vitae — Allison Crank. Interaction designer, researcher, and founder of Crank Studio.',
    url: 'https://allisoncrank.com/cv',
  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="fade-in text-xs uppercase tracking-[0.2em] text-[#a3a3a3] font-medium mb-5 mt-14 first:mt-0">
      {children}
    </h2>
  );
}

function Divider() {
  return <hr className="border-t border-black/8 my-2" />;
}

function Row({
  year,
  title,
  sub,
  detail,
  links,
}: {
  year?: string;
  title: string;
  sub?: string;
  detail?: string;
  links?: { label: string; href: string }[];
}) {
  return (
    <div className="fade-in grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-0.5 sm:gap-6 py-3.5 border-b border-black/8">
      {year && (
        <span className="text-sm text-[#b0b0b0] tabular-nums font-light pt-0.5 flex-shrink-0">{year}</span>
      )}
      <div className={!year ? 'sm:col-span-2' : ''}>
        <p className="text-[0.95rem] text-[#1a1a1a] leading-snug font-normal">{title}</p>
        {sub && <p className="text-sm text-[#737373] font-light mt-0.5">{sub}</p>}
        {detail && <p className="text-sm text-[#737373] font-light mt-0.5 leading-relaxed">{detail}</p>}
        {links && links.length > 0 && (
          <p className="text-sm font-light mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="hover-link-gradient inline-flex items-baseline rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-black/20 text-[#a3a3a3]"
              >
                <span className="link-label underline decoration-1 underline-offset-[3px] decoration-current/40">{l.label}</span>
              </a>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}

export default function CVPage() {
  return (
    <main className="min-h-screen bg-[#fafaf9] text-[#000000]">
      <div className="px-6 md:px-12 lg:px-20 max-w-3xl mx-auto py-16 sm:py-24">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="mb-14">
          <a
            href="/"
            className="no-print hover-link-gradient inline-flex items-baseline rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-black/20 text-xs text-[#c0c0c0] font-light mb-6 block"
          >
            <span className="link-label underline decoration-1 underline-offset-[3px] decoration-current/40">← allisoncrank.com</span>
          </a>
          <p className="text-xs uppercase tracking-[0.2em] text-[#a3a3a3] mb-3">Curriculum Vitae</p>
          <h1
            className="text-[clamp(2rem,4.5vw,3rem)] leading-[0.96] font-light tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-crank)' }}
          >
            Allison Crank
          </h1>
          <p className="text-sm text-[#737373] font-light leading-relaxed max-w-[52ch]">
            Paris, France<br />
            <a href="mailto:hi@allisoncrank.com" className="hover-link-gradient inline-flex items-baseline rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-black/20">
              <span className="link-label underline decoration-1 underline-offset-[3px] decoration-current/40">hi@allisoncrank.com</span>
            </a>
            {' · '}
            <a href="https://www.linkedin.com/in/allison-crank-53366b34" target="_blank" rel="noreferrer" className="hover-link-gradient inline-flex items-baseline rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-black/20">
              <span className="link-label underline decoration-1 underline-offset-[3px] decoration-current/40">LinkedIn</span>
            </a>
            {' · '}
            <a href="https://crankstudio.io" target="_blank" rel="noreferrer" className="hover-link-gradient inline-flex items-baseline rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-black/20">
              <span className="link-label underline decoration-1 underline-offset-[3px] decoration-current/40">crankstudio.io</span>
            </a>
          </p>
        </header>

        <Divider />

        {/* ── Profile ─────────────────────────────────────────────────────── */}
        <SectionLabel>Profile</SectionLabel>
        <p className="text-[0.95rem] font-light leading-relaxed text-[#404040] max-w-[66ch]">
          Designer and researcher working across immersive technology, spatial computing, and
          intelligent systems. Trained in architecture; now working at the edges of XR, AI, and
          interaction design. Founder and Creative Director of Crank Studio, Paris.
          <br /><br />
          Her work has been shown at the Venice Film Festival, Cannes, Tribeca, and SIGGRAPH,
          and recognised with a Venice Immersive Achievement Award and an Emmy nomination.
          She has served as curator of Raumwelten — Germany's leading festival for scenography
          and media — and mentors creators at the Venice VR College at La Biennale di Venezia.
          <br /><br />
          Clients include National Geographic, Meta, Google, MIT, Dreamscape, Audemars Piguet,
          and Gallagher & Associates. Published in <em>Leonardo</em> (MIT Press).
        </p>

        {/* ── Experience ──────────────────────────────────────────────────── */}
        <SectionLabel>Experience</SectionLabel>

        <Row
          year="2020 – Present"
          title="Founder and Creative Director — Crank Studio"
          sub="Paris, France · Independent practice 2020–2024; formally incorporated Fall 2024"
          detail="Digital, spatial, and interactive experiences for cultural institutions, research teams, and organizations navigating emerging technology. Brought in when the stakes are high — when work needs to be intuitive for the public, credible for experts, and built to last."
          links={[{ label: 'crankstudio.io', href: 'https://crankstudio.io' }]}
        />
        <Row
          year="2022"
          title="Design Lead — Polaris (now Spatz)"
          sub="Switzerland · Part-time contract"
          detail="Design and product direction for a social news platform."
          links={[{ label: 'spatz.news', href: 'https://www.spatz.news/de/' }]}
        />
        <Row
          year="2018 – 2020"
          title="Head of Digital Experiences — wowl"
          sub="Switzerland"
          detail="Led XR projects for luxury brands including Omega, Rolex, Cartier, and Swiss Airlines — research, UX, prototyping, and experience delivery."
          links={[{ label: 'wowl.ch', href: 'https://wowl.ch' }]}
        />
        <Row
          year="2016 – 2018"
          title="Design Researcher — EPFL+ECAL Lab"
          sub="Switzerland"
          detail="Research and UX design for digital heritage and public-facing installations. Key project: the UNESCO-recognized Montreux Jazz digital archive."
          links={[
            { label: 'epfl-ecal-lab.ch', href: 'https://epfl-ecal-lab.ch' },
            { label: 'Montreux Jazz project', href: 'https://www.epfl.ch/innovation/domains/fr/centre-dinnovation-dans-les-patrimoines-culturels/projet-montreux-jazz-digital/' },
          ]}
        />
        <Row
          year="2016"
          title="Design Consultant — Maarten Baas Studios"
          sub="Netherlands"
        />
        <Row
          year="2011 – 2015"
          title="Graphic Designer & International Marketing — Engelbrechts A/S"
          sub="Denmark"
        />

        {/* ── Selected Projects ────────────────────────────────────────────── */}
        <SectionLabel>Selected Projects</SectionLabel>

        {[
          { year: '2025–', title: 'Culture Care', detail: 'UX and game design consultant. Clinical trials in preparation.', links: [{ label: 'culturecare.io', href: 'https://culturecare.io' }] },
          { year: '2025', title: 'Audemars Piguet', detail: 'Research and strategic analysis for the innovation team. Delivered a video game industry exploration study and designed two interactive research databases: one mapping 100 timekeeping devices across history from antiquity to the present; one cataloguing 310 cultural works — film, games, music, art — exploring how culture has represented the concept of time.' },
          { year: '2024–25', title: 'My Magic Room', sub: 'DiverSsiTy · Swiss healthtech startup', detail: 'Full game designer and director. Mixed-reality therapeutic game for neurodiverse adolescents (ASD/ADHD, ages 13–20) on Meta Quest — fostering social, cognitive, emotional, and sensorimotor skills through adaptive gameplay. Clinical trials in progress.', links: [{ label: 'my-magic-room.io', href: 'https://www.my-magic-room.io/en/' }] },
          { year: '2024–25', title: 'LazyBrain', detail: 'UX Designer and Product Lead. Community platform built around serendipity and discovery. In development.', links: [{ label: 'lazybrain.ai', href: 'https://lazybrain.ai' }] },
          { year: '2024', title: 'Apple Vision Pro × National Geographic "HOME" (Factory 42)', detail: 'Lead research and experience design for a spatial storytelling concept. Project cancelled pre-release.' },
          { year: '2023–25', title: 'Dreamscape Immersive — Multiplayer VR Classroom', detail: 'UX designer and systems advisor — multiplayer VR classroom experience design. Via Albyon 2023–24; direct engagement 2025.' },
          { year: '2022–23', title: 'IMPULSE: Playing with Reality (Anagram × Meta)', detail: 'Lead interaction designer on a 40-minute mixed reality experience narrated by Academy Award-winner Tilda Swinton — placing audiences inside the minds of four people living with ADHD, transforming their physical surroundings in real time. Winner, Venice Immersive Achievement Award (81st Venice IFF, 2024); nominated for Emmy Award — Outstanding Emerging Media Program. Shown at Tribeca. Available on Meta Quest.', links: [{ label: 'impulse-xr.io', href: 'https://impulse-xr.io/' }, { label: 'Meta Quest', href: 'https://www.meta.com/en-gb/experiences/impulse-playing-with-reality/6468391126573976/' }] },
          { year: '2022 –', title: 'Gallagher & Associates — Gilcrease Museum', detail: 'Head of UX for a landmark cultural project: the entirely new $83.6M Gilcrease Museum in Tulsa, Oklahoma — home to the world\'s largest collection of art of the American West. Designed interactive gallery stations and mobile visitor experiences for the new SmithGroup-designed building, opening 2027.' },
          { year: '2022', title: 'Raumwelten – Platform for Scenography, Architecture & Media', detail: 'Curator of the 11th edition of Germany\'s leading festival for scenography, architecture, and media. Directed the programme around the theme /imagine, focusing on immersion and online social experience. Co-created and built the Raumwelten VR Hub — a digital multi-user environment accessible across mobile, desktop, and virtual reality — with a companion pop-up exhibition at the Ludwigsburg Museum. November 16–18, 2022.' },
          { year: '2021', title: 'Glimpse (Electric Skies)', detail: 'Interaction Design Lead and Line Production. Animated interactive VR experience starring Taron Egerton and Lucy Boynton, directed by Benjamin Cleary. Premiered Venice Biennale 2021. Won Best Interactive Experience at Cannes XR and VR Cristal at Annecy.', links: [{ label: 'electricskies.io/glimpse', href: 'https://www.electricskies.io/glimpse' }] },
          { year: '2020–23', title: 'Pixt — Google News Initiative', detail: 'Head of UX Design and Research. AI-driven trust and verification platform for digital media, funded by the Google News Initiative.', links: [{ label: 'trust.pixt.co', href: 'https://trust.pixt.co/' }] },
        ].map((p) => (
          <Row key={p.title} year={p.year} title={p.title} sub={p.sub} detail={p.detail} links={p.links} />
        ))}

        {/* ── Education ───────────────────────────────────────────────────── */}
        <SectionLabel>Education</SectionLabel>

        <Row
          year="2016 – 2018"
          title="MAS, Design for Digital Innovation — EPFL+ECAL"
          sub="Switzerland · Focus: UX/UI, AR prototyping, digital interface systems"
        />
        <Row
          year="2013 – 2015"
          title="MDes + MA, Contextual Design — Design Academy Eindhoven"
          sub="Netherlands · Graduated cum laude · Research in immersive retail and narrative environments"
        />
        <Row
          year="2007 – 2011"
          title="BA, Architecture — Wellesley College & MIT"
          sub="USA · Graduated magna cum laude · Studio Design at MIT BArch program"
        />

        {/* ── Teaching ────────────────────────────────────────────────────── */}
        <SectionLabel>Teaching</SectionLabel>

        <Row
          year="2021 – Present"
          title="Lecturer — HSLU, Spatial Design"
          sub="Lucerne, Switzerland"
          detail="Spatial design and architectural theory, and thesis mentorship."
          links={[{ label: '307archtheory.crankstudio.io', href: 'https://307archtheory.crankstudio.io/' }]}
        />
        <Row
          year="2022 – Present"
          title="Expert Lecturer — MIT xPRO, Virtual Reality &amp; Augmented Reality"
          detail="Industry expert on the MIT xPRO online programme covering XR design, UX, and immersive experience development."
          links={[{ label: 'MIT xPRO', href: 'https://xpro.mit.edu/courses/course-v1:xPRO+ARVRx+R1/' }]}
        />
        <Row
          year="2019 – 2024"
          title="Visiting Faculty — Architectural Association Visiting School, Melbourne"
          detail="Digital twins, procedural urbanism, speculative design, Unity + GAMA."
          links={[{ label: 'projecttoria.com', href: 'https://projecttoria.com/Home-Set' }]}
        />
        <Row
          year="2021 – Present"
          title="Mentor — Venice Biennale College Cinema (BCC)"
          detail="Advising emerging VR and game designers on immersive storytelling and experience design."
        />

        {/* ── Speaking ────────────────────────────────────────────────────── */}
        <SectionLabel>Speaking</SectionLabel>

        {[
          { year: '2024', title: 'ArtTech Forum', sub: 'Keynote' },
          { year: '2022', title: 'Raumwelten Festival', sub: 'Keynote' },
          { year: '2018', title: 'SIGGRAPH', sub: 'Paper presentation' },
          { year: '2017', title: 'Tate Exchange, London' },
          { year: '2016', title: 'Gottlieb Duttweiler Institute (GDI)' },
        ].map((s) => (
          <Row key={s.title + s.year} year={s.year} title={s.title} sub={s.sub} />
        ))}

        {/* ── Publications ────────────────────────────────────────────────── */}
        <SectionLabel>Publications</SectionLabel>

        <Row
          year="2024"
          title="Urban and ecological simulations: bridging research and education through procedural modeling in GAMA"
          sub="GAMA Days 2024 · IRD HAL Open Science"
          links={[{ label: 'View publication', href: 'https://scanr.enseignementsup-recherche.gouv.fr/publications/halird-04887779' }]}
        />
        <Row
          year="2018"
          title="Digital Heritage: Bringing new life to the Montreux Jazz Festival's audio-visual archives with immersive installations"
          sub="SIGGRAPH 2018 · History of SIGGRAPH"
          links={[{ label: 'View', href: 'https://history.siggraph.org/learning/digital-heritage-bringing-new-life-to-the-montreux-jazz-festivals-audio-visual-archives-with-immersive-installations-by-henchoz-and-crank/' }]}
        />
        <Row
          year="2018"
          title="Leonardo Journal (MIT Press) — Digital Heritage: Montreux Jazz Festival Archives"
          sub="EPFL Infoscience"
          links={[{ label: 'View', href: 'https://infoscience.epfl.ch/entities/person/380a8629-3b11-4faa-905c-c1b64f521f1b' }]}
        />

        {/* ── Press ───────────────────────────────────────────────────────── */}
        <SectionLabel>Press</SectionLabel>

        <Row
          year="2023"
          title="Allison Crank — UX & XR Designer"
          sub="XRMust Magazine · Practice profile"
          links={[{ label: 'Read', href: 'https://xrmust.com/xrmagazine/allison-crank-ux-xr-designer/' }]}
        />

        {/* ── Recognition ─────────────────────────────────────────────────── */}
        <SectionLabel>Recognition</SectionLabel>

        {[
          { year: '2025', title: 'Emmy Nomination — Outstanding Emerging Media Program · IMPULSE', sub: 'As Interaction Design Lead' },
          { year: '2024', title: 'Venice Immersive Achievement Prize — La Biennale di Venezia · IMPULSE', sub: 'As Interaction Design Lead' },
          { year: '2021', title: 'Best Interactive Experience — Cannes XR · Glimpse', sub: 'As Interaction Design Lead' },
          { year: '2021', title: 'VR Cristal — Annecy International Film Festival · Glimpse', sub: 'As Interaction Design Lead' },
        ].map((a) => (
          <Row key={a.title} year={a.year} title={a.title} sub={a.sub} />
        ))}

        {/* ── Awards ──────────────────────────────────────────────────────── */}
        <SectionLabel>Awards</SectionLabel>

        {[
          { year: '2015', title: 'Keep an Eye Grant — Keep an Eye Foundation' },
          { year: '2015', title: 'Gijs Bakker Research Award — Design Academy Eindhoven' },
          { year: '2011', title: 'Eliza Newkirk Rogers Prize for Architecture — Wellesley College' },
          { year: '2011', title: 'Jane Harris Schneider Prize for Sculpture — Wellesley College' },
        ].map((a) => (
          <Row key={a.title} year={a.year} title={a.title} />
        ))}

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-black/8 flex flex-wrap gap-4 items-center justify-between">
          <p className="text-xs text-[#c0c0c0] font-light">
            References available upon request
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <PrintButton />
          </div>
        </div>

      </div>
      <ScrollAnimations />
      <DesignerCursor />
    </main>
  );
}

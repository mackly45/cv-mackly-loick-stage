import { useEffect, useState, useRef } from 'react'
import Navbar from './components/Navbar'
import Background3D from './components/Background3D'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// --- Helper: Typography Splitting ---
const SplitText = ({ text, className }) => {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <span key={i} className="char" style={{ display: 'inline-block' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

const SectionTitle = ({ children }) => {
  return (
    <div className="section-title-wrapper">
      <h2 className="gradient-text reveal-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800 }}>
        {children}
      </h2>
      <div className="title-line" style={{ width: '60px', height: '4px', background: 'var(--accent-color)', marginTop: '10px' }}></div>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isHovering, setIsHovering] = useState(false)
  const cursorRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    // 1. Smooth Scroll (Lenis)
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // 2. Custom Cursor & Tilt Logic
    const moveCursor = (e) => {
      const { clientX, clientY } = e
      const xPos = clientX
      const yPos = clientY

      gsap.to(cursorRef.current, {
        x: xPos,
        y: yPos,
        duration: 0.1,
        ease: 'power2.out'
      })

      // 3D Parallax for Background (via custom property or event)
      window.dispatchEvent(new CustomEvent('mousemove_parallax', { detail: { x: (clientX / window.innerWidth - 0.5) * 2, y: (clientY / window.innerHeight - 0.5) * 2 } }))
    }

    const handleHover = (e) => {
      const target = e.target.closest('a, button, .glass-card, .project-card')
      setIsHovering(!!target)

      // Tilt logic for cards
      const card = e.target.closest('.glass-card, .project-card')
      if (card) {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const xc = rect.width / 2
          const yc = rect.height / 2
          const dx = x - xc
          const dy = y - yc
          gsap.to(card, {
            rotateY: dx / 15,
            rotateX: -dy / 15,
            duration: 0.5,
            ease: 'power2.out'
          })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 1, ease: 'elastic.out(1, 0.3)' })
        })
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleHover)

    // 3. Scroll Progress Logic
    const updateProgress = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      gsap.to(progressRef.current, { width: `${scrollPercent}%`, duration: 0.1 })
    }
    window.addEventListener('scroll', updateProgress)

    // 4. Advanced Animations
    const sections = document.querySelectorAll('section')
    sections.forEach(section => {
      // Title line reveal
      gsap.from(section.querySelector('.title-line'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
        width: 0,
        duration: 1.5,
        ease: 'expo.out'
      })

      // Section cards reveal
      gsap.from(section.querySelectorAll('.glass-card, .project-card'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        rotateX: 10,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      })

      // Active Section Tracking
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
      })
    })

    // 5. Hero Reveal Sequence (Magnificent!)
    const heroTl = gsap.timeline({ delay: 0.5 })

    heroTl.from('.hero-content h3', { opacity: 0, x: -20, duration: 1, ease: 'power3.out' })

    // Animate characters of the name
    heroTl.from('.hero-name .char', {
      opacity: 0,
      y: 40,
      rotateX: -90,
      stagger: 0.03,
      duration: 1.2,
      ease: 'expo.out'
    }, '-=0.5')

    heroTl.from('.hero-content h2', { opacity: 0, y: 20, duration: 1, ease: 'power3.out' }, '-=0.8')
    heroTl.from('.hero-content p', { opacity: 0, y: 20, duration: 1, ease: 'power3.out' }, '-=0.8')
    heroTl.from('.hero-content .tesla-btn', {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8')

    return () => {
      lenis.destroy()
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleHover)
      window.removeEventListener('scroll', updateProgress)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const skillsData = [
    { category: 'Frontend', items: ['HTML5 / CSS3', 'JavaScript (ES6+)', 'React.js', 'Bootstrap / Tailwind', 'Responsive Design'] },
    { category: 'Backend', items: ['Python', 'PHP', 'Node.js / Express', 'API REST', 'PostgreSQL / MySQL'] },
    { category: 'Mobile', items: ['Flutter', 'Cross-Platform', 'Mobile UI/UX', 'App Store Deployment', 'Optimization'] },
    { category: 'Tools & AI', items: ['Git / GitHub', 'Machine Learning', 'Data Science', 'Agile', 'VS Code'] },
  ]

  const experiences = [
    { date: '2024 - 2025', title: 'Développeur Full Stack', company: 'Entreprise partenaire ESCIC (Alternance)', desc: "Développement d'applications complexes en environnement professionnel." },
    { date: '2023 - Présent', title: 'Développeur Full Stack Freelance', company: 'Indépendant', desc: 'Accompagnement de clients dans la création de solutions web et mobiles sur mesure.' },
    { date: '2022 - 2023', title: 'Ingénieur en Intelligence Artificielle', company: 'Projets de Recherche', desc: 'Exploration de modèles prédictifs et de traitement de données complexes.' },
    { date: '2021 - 2022', title: 'Analyste de Données', company: 'Analyse Business', desc: 'Transformation de données brutes en insights stratégiques.' },
  ]

  const education = [
    { date: '2024 - 2025', title: '3ème année Data Full Stack', school: 'Université ESCIC', desc: 'Formation avancée en alternance avec spécialisation architecture et data.' },
    { date: '2023 - 2024', title: '2ème année Data Full Stack', school: 'Université ESCIC', desc: 'Approfondissement des stacks techniques et outils de data science.' },
    { date: '2022 - 2023', title: '1ère année Data Full Stack', school: 'Université ESCIC', desc: 'Bases solides en développement full stack et gestion de bases de données.' },
    { date: '2021 - 2022', title: 'Année Préparatoire', school: 'Université ESCIC', desc: 'Fondamentaux de l\'informatique et de l\'algorithmique.' },
  ]

  const projects = [
    { title: 'Application Full Stack', tech: 'Python / React / Flask', desc: 'Architecture moderne avec intégration de base de données PostgreSQL.', status: 'Terminé' },
    { title: 'Dashboard Analytique', tech: 'Python / Pandas / Plotly', desc: 'Visualisation de données interactive de haute précision.', status: 'Terminé' },
    { title: 'App Mobile Cross-Platform', tech: 'Flutter / Firebase', desc: 'Application native fluide pour iOS et Android.', status: 'Terminé' },
    { title: 'Modèle de Prédiction ML', tech: 'Scikit-learn / Numpy', desc: 'Algorithme d\'analyse prédictive sur données réelles.', status: 'En cours' },
  ]

  return (
    <div className="app-container">
      <div className="noise-overlay"></div>
      <div ref={cursorRef} className={`custom-cursor ${isHovering ? 'hovering' : ''}`}></div>
      <div ref={progressRef} className="scroll-progress"></div>

      <Background3D />
      <Navbar activeSection={activeSection} />

      <main>
        {/* HOME */}
        <section id="home" className="hero">
          <div className="hero-content" style={{ maxWidth: '800px' }}>
            <h3 style={{ color: 'var(--accent-color)', fontFamily: 'var(--font-mono)', marginBottom: '25px', fontSize: '1.2rem', fontWeight: 600 }}>
              &gt; Bonjour, je suis
            </h3>
            <h1 style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', lineHeight: 0.85, marginBottom: '25px' }} className="gradient-text hero-name">
              <SplitText text="Mackly Loick" /><br />
              <SplitText text="Tchicaya" />
            </h1>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', fontWeight: 500, color: '#fff', opacity: 0.95, marginBottom: '35px', letterSpacing: '-0.5px' }}>
              Full Stack Architect & Data Scientist.
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#fff', opacity: 0.8, lineHeight: 1.8, marginBottom: '50px', maxWidth: '650px' }}>
              Concepteur de solutions technologiques haut de gamme, fusionnant design moderne, performance backend et intelligence artificielle.
            </p>
            <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
              <a href="#projects" className="tesla-btn">Explorer mes projets</a>
              <a href="#contact" className="tesla-btn" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>Me contacter</a>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <SectionTitle>Compétences</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', width: '100%' }}>
            {skillsData.map((skill, idx) => (
              <div key={idx} className="glass-card">
                <h3 style={{ color: 'var(--accent-color)', marginBottom: '20px', fontFamily: 'var(--font-mono)', fontSize: '1.2rem' }}>
                  // {skill.category}
                </h3>
                <ul style={{ listStyle: 'none' }}>
                  {skill.items.map((item, i) => (
                    <li key={i} style={{ marginBottom: '10px', fontSize: '1rem', opacity: 0.8 }}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <SectionTitle>Expériences</SectionTitle>
          <div className="timeline" style={{ borderLeft: '1px solid var(--glass-border)', paddingLeft: '40px', marginLeft: '10px' }}>
            {experiences.map((exp, idx) => (
              <div key={idx} className="glass-card" style={{ marginBottom: '30px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-51px', top: '40px', width: '20px', height: '20px', background: 'var(--bg-color)', border: '3px solid var(--accent-color)', borderRadius: '50%' }}></div>
                <span style={{ color: 'var(--accent-color)', fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 600 }}>{exp.date}</span>
                <h3 style={{ marginTop: '10px', marginBottom: '5px', color: '#fff' }}>{exp.title}</h3>
                <h4 style={{ opacity: 0.7, fontWeight: 500, marginBottom: '20px', fontSize: '1.1rem' }}>{exp.company}</h4>
                <p style={{ opacity: 0.85, lineHeight: 1.7 }}>{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education">
          <SectionTitle>Formation</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', width: '100%' }}>
            {education.map((edu, idx) => (
              <div key={idx} className="glass-card">
                <span style={{ color: 'var(--accent-color)', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>{edu.date}</span>
                <h3 style={{ marginTop: '10px', marginBottom: '5px', color: '#fff' }}>{edu.title}</h3>
                <h4 style={{ opacity: 0.7, fontWeight: 500, fontSize: '1rem', marginBottom: '15px' }}>{edu.school}</h4>
                <p style={{ opacity: 0.8, fontSize: '1rem', lineHeight: 1.6 }}>{edu.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <SectionTitle>Projets Sélectionnés</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '30px', width: '100%' }}>
            {projects.map((proj, idx) => (
              <div key={idx} className="glass-card project-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ height: '240px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--glass-border)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '3rem', opacity: 0.1 }}>{proj.title[0]}</div>
                  <div style={{ position: 'absolute', top: '20px', right: '20px', padding: '6px 16px', borderRadius: '2px', fontSize: '0.75rem', fontWeight: 700, background: 'rgba(0,229,255,0.1)', color: 'var(--accent-color)', border: '1px solid var(--accent-color)' }}>
                    {proj.status}
                  </div>
                </div>
                <div style={{ padding: '35px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{proj.tech}</span>
                  <h3 style={{ margin: '12px 0', color: '#fff' }}>{proj.title}</h3>
                  <p style={{ opacity: 0.8, fontSize: '1rem', lineHeight: 1.7 }}>{proj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <SectionTitle>Contact</SectionTitle>
          <div className="glass-card" style={{ maxWidth: '900px' }}>
            <h3 style={{ marginBottom: '35px', fontSize: '2rem' }}>Discutons de votre prochain projet</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
              <div>
                <p style={{ opacity: 0.85, fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '40px' }}>
                  Je suis disponible pour des opportunités de haut niveau en architecture logicielle et data science.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <a href="mailto:contact@mackly.dev" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 700, fontSize: '1.2rem' }}>contact@mackly.dev</a>
                  <div style={{ display: 'flex', gap: '25px', marginTop: '15px' }}>
                    <a href="#" style={{ color: '#fff', opacity: 0.7, textDecoration: 'none', fontWeight: 600 }}>LinkedIn</a>
                    <a href="#" style={{ color: '#fff', opacity: 0.7, textDecoration: 'none', fontWeight: 600 }}>GitHub</a>
                  </div>
                </div>
              </div>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <input type="text" placeholder="NOM COMPLET" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '18px', borderRadius: '2px', color: '#fff', outline: 'none', fontFamily: 'var(--font-mono)' }} />
                <input type="email" placeholder="EMAIL PROFESSIONNEL" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '18px', borderRadius: '2px', color: '#fff', outline: 'none', fontFamily: 'var(--font-mono)' }} />
                <textarea placeholder="VOTRE MESSAGE" rows="5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '18px', borderRadius: '2px', color: '#fff', outline: 'none', resize: 'none', fontFamily: 'var(--font-mono)' }}></textarea>
                <button type="button" className="tesla-btn" style={{ width: '100%' }}>Envoyer le message</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding: '100px 10%', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <p style={{ opacity: 0.4, fontSize: '0.9rem', letterSpacing: '1px' }}>
          &copy; {new Date().getFullYear()} MACKLY LOICK TCHICAYA &bull; ARCHITECTE FULL STACK & DATA SCIENTIST
        </p>
      </footer>
    </div>
  )
}

export default App

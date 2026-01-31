import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Background3D from './components/Background3D'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const SectionTitle = ({ children }) => {
  return (
    <div className="section-title-wrapper" style={{ marginBottom: '60px', overflow: 'hidden' }}>
      <h2 className="gradient-text reveal-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800 }}>
        {children}
      </h2>
      <div className="title-line" style={{ width: '60px', height: '4px', background: 'var(--accent-color)', marginTop: '10px' }}></div>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Scroll Animations
    const sections = document.querySelectorAll('section')
    sections.forEach(section => {
      // Reveal section
      gsap.from(section.querySelectorAll('.glass-card, .project-card, .reveal-text'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      })

      // Animate line in title
      gsap.from(section.querySelector('.title-line'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%'
        },
        width: 0,
        duration: 1.5,
        ease: 'expo.out'
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

    // Hero Specific
    gsap.from('.hero-content > *', {
      y: 30,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out',
      delay: 0.5
    })

    return () => {
      lenis.destroy()
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
      <Background3D />
      <Navbar activeSection={activeSection} />

      <main>
        {/* HOME */}
        <section id="home" className="hero">
          <div className="hero-content" style={{ maxWidth: '800px' }}>
            <h3 style={{ color: 'var(--accent-color)', fontFamily: 'var(--font-mono)', marginBottom: '20px', fontSize: '1.2rem' }}>
              &gt; Bonjour, je suis
            </h3>
            <h1 style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)', lineHeight: 0.9, marginBottom: '20px' }} className="gradient-text">
              Mackly Loick<br />Tchicaya
            </h1>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 400, opacity: 0.8, marginBottom: '30px', letterSpacing: '-0.5px' }}>
              Full Stack Architect & Data Scientist.
            </h2>
            <p style={{ fontSize: '1.15rem', opacity: 0.6, lineHeight: 1.8, marginBottom: '45px', maxWidth: '600px' }}>
              Concepteur de solutions technologiques haut de gamme, fusionnant design moderne, performance backend et intelligence artificielle.
            </p>
            <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
              <a href="#projects" className="tesla-btn">Explorer mes projets</a>
              <a href="#contact" className="tesla-btn" style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'white' }}>Me contacter</a>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <SectionTitle>Compétences</SectionTitle>
          <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', width: '100%' }}>
            {skillsData.map((skill, idx) => (
              <div key={idx} className="glass-card">
                <h3 style={{ color: 'var(--accent-color)', marginBottom: '20px', fontFamily: 'var(--font-mono)', fontSize: '1.2rem' }}>
                  // {skill.category}
                </h3>
                <ul style={{ listStyle: 'none', opacity: 0.7 }}>
                  {skill.items.map((item, i) => (
                    <li key={i} style={{ marginBottom: '10px', fontSize: '0.95rem' }}>• {item}</li>
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
                <div style={{ position: 'absolute', left: '-51px', top: '40px', width: '20px', height: '20px', background: 'var(--bg-color)', border: '2px solid var(--accent-color)', borderRadius: '50%' }}></div>
                <span style={{ color: 'var(--accent-color)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{exp.date}</span>
                <h3 style={{ marginTop: '10px', marginBottom: '5px' }}>{exp.title}</h3>
                <h4 style={{ opacity: 0.5, fontWeight: 500, marginBottom: '20px', fontSize: '1rem' }}>{exp.company}</h4>
                <p style={{ opacity: 0.7, lineHeight: 1.6 }}>{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education">
          <SectionTitle>Formation</SectionTitle>
          <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', width: '100%' }}>
            {education.map((edu, idx) => (
              <div key={idx} className="glass-card">
                <span style={{ color: 'var(--accent-color)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{edu.date}</span>
                <h3 style={{ marginTop: '10px', marginBottom: '5px' }}>{edu.title}</h3>
                <h4 style={{ opacity: 0.5, fontWeight: 500, fontSize: '0.95rem', marginBottom: '15px' }}>{edu.school}</h4>
                <p style={{ opacity: 0.6, fontSize: '0.9rem', lineHeight: 1.6 }}>{edu.desc}</p>
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
                <div style={{ height: '220px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--glass-border)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '20px', right: '20px', padding: '5px 15px', borderRadius: '20px', fontSize: '0.7rem', background: 'rgba(0,212,255,0.1)', color: 'var(--accent-color)', border: '1px solid var(--accent-color)' }}>
                    {proj.status}
                  </div>
                </div>
                <div style={{ padding: '30px' }}>
                  <span style={{ fontSize: '0.8rem', opacity: 0.5, fontFamily: 'var(--font-mono)' }}>{proj.tech}</span>
                  <h3 style={{ margin: '10px 0' }}>{proj.title}</h3>
                  <p style={{ opacity: 0.7, fontSize: '0.95rem', lineHeight: 1.6 }}>{proj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <SectionTitle>Contact</SectionTitle>
          <div className="glass-card" style={{ maxWidth: '800px', margin: '0 0' }}>
            <h3 style={{ marginBottom: '30px' }}>Discutons de votre prochain projet</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
              <div>
                <p style={{ opacity: 0.6, lineHeight: 1.8, marginBottom: '30px' }}>
                  Je suis toujours ouvert à de nouvelles opportunités de collaboration, que ce soit pour du développement full stack ou des missions de data science.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <a href="mailto:contact@mackly.dev" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 500 }}>contact@mackly.dev</a>
                  <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                    <a href="#" style={{ color: 'white', opacity: 0.5 }}>LinkedIn</a>
                    <a href="#" style={{ color: 'white', opacity: 0.5 }}>GitHub</a>
                    <a href="#" style={{ color: 'white', opacity: 0.5 }}>Twitter</a>
                  </div>
                </div>
              </div>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input type="text" placeholder="Nom" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '15px', borderRadius: '8px', color: 'white', outline: 'none' }} />
                <input type="email" placeholder="Email" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '15px', borderRadius: '8px', color: 'white', outline: 'none' }} />
                <textarea placeholder="Message" rows="4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '15px', borderRadius: '8px', color: 'white', outline: 'none', resize: 'none' }}></textarea>
                <button type="button" className="tesla-btn" style={{ width: '100%' }}>Envoyer le message</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding: '80px 10%', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <p style={{ opacity: 0.3, fontSize: '0.85rem' }}>
          CONSTRUIT AVEC PASSION PAR MACKLY LOICK TCHICAYA &bull; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'

const Navbar = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Accueil', href: '#home', id: 'home' },
    { name: 'Compétences', href: '#skills', id: 'skills' },
    { name: 'Expérience', href: '#experience', id: 'experience' },
    { name: 'Formation', href: '#education', id: 'education' },
    { name: 'Projets', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: scrolled ? '15px 8%' : '30px 8%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        backgroundColor: scrolled || isOpen ? 'rgba(5, 5, 5, 0.9)' : 'transparent',
        backdropFilter: scrolled || isOpen ? 'blur(15px)' : 'none',
        borderBottom: scrolled || isOpen ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div
        style={{
          fontSize: '1.4rem',
          fontWeight: 800,
          letterSpacing: '-1px',
          cursor: 'pointer',
          zIndex: 101
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span style={{ color: 'var(--accent-color)' }}>MACKLY</span>.DEV
      </div>

      {/* Desktop Menu */}
      <div className="nav-links-desktop" style={{ display: 'flex', gap: '35px' }}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            style={{
              textDecoration: 'none',
              color: 'var(--text-color)',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              opacity: activeSection === link.id ? 1 : 0.5,
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseOver={(e) => e.target.style.opacity = 1}
            onMouseOut={(e) => e.target.style.opacity = (activeSection === link.id ? 1 : 0.5)}
          >
            {link.name}
            {activeSection === link.id && (
              <div style={{
                position: 'absolute',
                bottom: '-5px',
                left: 0,
                width: '100%',
                height: '2px',
                background: 'var(--accent-color)',
              }}></div>
            )}
          </a>
        ))}
      </div>

      {/* Mobile Menu Toggle (Simplified indicator) */}
      <div
        className="mobile-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'none',
          flexDirection: 'column',
          gap: '6px',
          cursor: 'pointer',
          zIndex: 101
        }}
      >
        <div style={{ width: '25px', height: '2px', background: 'white', transition: '0.3s', transform: isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></div>
        <div style={{ width: '25px', height: '2px', background: 'white', opacity: isOpen ? 0 : 1 }}></div>
        <div style={{ width: '25px', height: '2px', background: 'white', transition: '0.3s', transform: isOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'var(--bg-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          zIndex: 100
        }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '3px'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar

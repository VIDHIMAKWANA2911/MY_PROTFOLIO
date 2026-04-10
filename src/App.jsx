import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FaCode,
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaMoon,
  FaPaintBrush,
  FaReact,
  FaServer,
  FaSun,
  FaTools,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
  FaGitAlt,
  FaBootstrap,
} from 'react-icons/fa'
import {
  SiTailwindcss,
  SiNextdotjs,
  SiVite,
  SiFramer,
  SiExpress,
} from 'react-icons/si'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
const filters = ['All', 'React', 'JavaScript', 'HTML/CSS']

const projects = [
  {
    title: 'Creative Design Portfolio',
    category: 'HTML/CSS',
    stack: ['HTML', 'CSS', 'JavaScript'],
    description: 'A premium-tier creative showcase featuring high-end typography and cinematic motion.',
    image: '/projects/portfolio.png',
    details:
      'Engineered a high-performance portfolio using core web standards. Focused on micro-interactions, custom CSS animations, and a sophisticated visual hierarchy to deliver an elite user experience.',
    demo: 'https://golden-crumble-2c4f80.netlify.app/',
    github: 'https://github.com/VIDHIMAKWANA2911',
  },
  {
    title: 'Industry Standard Dashboard',
    category: 'React',
    stack: ['React.js', 'Bootstrap', 'Framer Motion'],
    description: 'Enterprise-grade analytics engine optimized for complex data visualization and real-time tracking.',
    image: '/projects/dashboard.png',
    details:
      'Developed a scalable dashboard architecture using React and state hooks. Implemented seamless data-flow patterns, custom Bootstrap themes, and fluid animations to simplify enterprise workflows.',
    demo: 'https://deluxe-queijadas-89d7e3.netlify.app/',
    github: 'https://github.com/VIDHIMAKWANA2911',
  },
  {
    title: 'CaterServ Solutions',
    category: 'HTML/CSS',
    stack: ['HTML', 'CSS', 'Bootstrap', 'AOS'],
    description: 'Full-service catering platform engineered for conversion and seamless booking experiences.',
    image: '/projects/catering.png',
    details:
      'Architected a service-driven digital experience focusing on conversion-led design principles. Utilized Bootstrap for responsive grid stability and motion libraries for a modern, inviting feel.',
    demo: 'https://earnest-travesseiro-7e5f6c.netlify.app/',
    github: 'https://github.com/VIDHIMAKWANA2911',
  },
  {
    title: 'WeatherFocus Insights',
    category: 'JavaScript',
    stack: ['HTML', 'CSS', 'JavaScript', 'OpenWeather API'],
    description: 'Real-time meteorological tracking system with dynamic UI updates and global search.',
    image: '/projects/weather.png',
    details:
      'Engineered a responsive weather dashboard that fetches live data from OpenWeather API. Features include current conditions, thermal diagnostics, and atmospheric pressure tracking mapped to a sleek, modern UI.',
    demo: 'https://effulgent-stardust-1d75c2.netlify.app/',
    github: 'https://github.com/VIDHIMAKWANA2911',
  },
  {
    title: 'Mailler Landing Website',
    category: 'HTML/CSS',
    stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    description: 'Marketing-focused email service landing page with modern sections, pricing, and contact flow.',
    image: '/projects/portfolio.png',
    details:
      'Built a complete business landing experience with hero messaging, services, feature highlights, pricing plans, blog blocks, FAQ, and contact section. Focused on conversion-friendly structure and responsive layout.',
    demo: 'https://aesthetic-boba-315e19.netlify.app/',
    github: 'https://github.com/VIDHIMAKWANA2911',
  },
]

const skills = [
  { group: 'Frontend', icon: <FaHtml5 />, name: 'HTML5', level: 95 },
  { group: 'Frontend', icon: <FaCss3Alt />, name: 'CSS3', level: 90 },
  { group: 'Frontend', icon: <FaJs />, name: 'JavaScript', level: 88 },
  { group: 'Frontend', icon: <FaReact />, name: 'React / Next.js', level: 92 },
  { group: 'Frontend', icon: <SiTailwindcss />, name: 'Tailwind CSS', level: 90 },
  { group: 'Frontend', icon: <FaBootstrap />, name: 'Bootstrap', level: 85 },
  { group: 'Animation', icon: <SiFramer />, name: 'Framer Motion', level: 82 },
  { group: 'Backend', icon: <FaNodeJs />, name: 'Node / Express', level: 72 },
  { group: 'Tools', icon: <FaGitAlt />, name: 'Git', level: 86 },
  { group: 'Tools', icon: <SiVite />, name: 'Vite', level: 88 },
]

function App() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [typedText, setTypedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showLoader, setShowLoader] = useState(true)
  const [theme, setTheme] = useState('dark')
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' })
  const [formErrors, setFormErrors] = useState({})
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState('home')

  const phrases = useMemo(
    () => ['Frontend Developer', 'React.js Developer', 'Software Engineer'],
    [],
  )

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]
    const typingSpeed = isDeleting ? 45 : 90
    const timeout = setTimeout(() => {
      setTypedText((prev) =>
        isDeleting ? currentPhrase.slice(0, prev.length - 1) : currentPhrase.slice(0, prev.length + 1),
      )
      if (!isDeleting && typedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 900)
      }
      if (isDeleting && typedText.length === 0) {
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, phraseIndex, phrases])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const height = document.body.scrollHeight - window.innerHeight
      setScrollProgress((scrollTop / height) * 100 || 0)
    }
    const handleMove = (event) => setCursor({ x: event.clientX, y: event.clientY })

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMove)
    }
  }, [])

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.category === activeFilter)

  const onFormSubmit = async (event) => {
    event.preventDefault()
    const errors = {}
    if (!formValues.name.trim()) errors.name = 'Name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) errors.email = 'Valid email is required.'
    if (formValues.message.trim().length < 12) errors.message = 'Message should be at least 12 characters.'
    setFormErrors(errors)
    
    if (Object.keys(errors).length === 0) {
      const formData = new FormData(event.target);
      formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          setFormValues({ name: '', email: '', message: '' })
          alert('Thanks! Your message has been sent successfully.')
        } else {
          alert('Error: ' + data.message)
        }
      } catch (error) {
        console.error("Submission Error:", error)
        alert('Sorry, something went wrong. Please try again later.')
      }
    }
  }

  const sectionContent = {
    home: (
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden py-20 text-center">
        <div className="mesh-bg" />
        <div className="hero-gradient absolute inset-0 -z-10" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-fuchsia-400 uppercase"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-500"></span>
          </span>
          AVAILABLE FOR HIRE
        </motion.div>

        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl font-black leading-[0.9] tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
            Building digital<br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-fuchsia-500 via-indigo-500 to-cyan-500">
              masterpieces.
            </span>
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-2xl font-bold text-white md:text-4xl"
          >
            I'm <span className="text-fuchsia-500">Vidhi Makwana</span>
          </motion.div>

          <h2 className="mt-8 flex items-center justify-center gap-2 text-xl font-medium text-slate-400 md:text-2xl">
            <span className="text-p">{typedText}</span>
            <span className="h-8 w-[3px] bg-fuchsia-500 animate-pulse"></span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
             Specializing in React.js to craft high-performance web applications that merge technical excellence with stunning aesthetics.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => setActiveSection('projects')} 
              className="btn-primary"
            >
              See My Work
            </button>
            <button 
              onClick={() => setActiveSection('contact')} 
              className="btn-secondary"
            >
              Contact Me
            </button>
          </div>
        </motion.div>
      </section>
    ),
    about: (
      <section className="section-spacing">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold tracking-[0.25em] text-fuchsia-400 uppercase md:text-base">About Me</p>
            <h3 className="section-title mb-0 mt-2">Crafting premium digital products</h3>
          </div>
          <div className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-2 text-xs font-semibold tracking-widest text-fuchsia-300 uppercase">
            Frontend Engineer
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-5">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="card md:col-span-3"
          >
            <h4 className="mb-4 text-2xl font-bold text-white">Design-first thinking. Engineering-first execution.</h4>
            <p className="leading-relaxed text-slate-300">
              I build polished web interfaces that feel fast, intuitive, and modern. My focus is translating product ideas into clean, scalable React experiences with premium interaction quality.
            </p>
            <p className="mt-4 leading-relaxed text-slate-300">
              From landing pages to dashboards, I prioritize visual hierarchy, accessibility, and maintainable component architecture so products stay elegant as they grow.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-xs font-semibold tracking-widest text-fuchsia-400 uppercase">Specialization</p>
                <p className="mt-1 text-sm text-slate-300">React.js, Tailwind CSS, motion-driven UI</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-xs font-semibold tracking-widest text-fuchsia-400 uppercase">Work Style</p>
                <p className="mt-1 text-sm text-slate-300">Pixel-perfect delivery and clean code quality</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <h5 className="mb-3 text-sm font-bold tracking-widest text-fuchsia-400 uppercase">Education</h5>
              <div className="space-y-3">
                <div className="rounded-xl border border-white/10 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-fuchsia-400">Present</p>
                  <p className="mt-1 text-sm font-bold text-white">Full-Stack Web Development</p>
                  <p className="text-xs text-slate-400">Red & White Multimedia Education, Navrangpura</p>
                </div>
                <div className="rounded-xl border border-white/10 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-fuchsia-400">07/2023 - Present</p>
                  <p className="mt-1 text-sm font-bold text-white">Bachelor of Commerce (Pursuing)</p>
                  <p className="text-xs text-slate-400">C. C. Sheth Commerce College, Ahmedabad</p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="chip"><FaCode className="text-fuchsia-400" /> Scalable Systems</span>
              <span className="chip"><FaPaintBrush className="text-indigo-400" /> UI Craftsmanship</span>
              <span className="chip"><FaReact className="text-cyan-400" /> Component Architect</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="card bg-linear-to-br from-fuchsia-600/10 to-indigo-600/10 text-center">
              <p className="text-4xl font-black text-white">2+</p>
              <p className="text-sm font-medium uppercase tracking-widest opacity-70">Years of Focus</p>
            </div>
            <div className="card bg-linear-to-br from-cyan-600/10 to-fuchsia-600/10 text-center">
              <p className="text-4xl font-black text-white">10+</p>
              <p className="text-sm font-medium uppercase tracking-widest opacity-70">Projects Delivered</p>
            </div>
            <div className="card bg-linear-to-br from-indigo-600/10 to-slate-700/10 text-center">
              <p className="text-4xl font-black text-white">99%</p>
              <p className="text-sm font-medium uppercase tracking-widest opacity-70">Client Satisfaction</p>
            </div>
            <div className="card flex items-center justify-center gap-4 bg-fuchsia-500/10 border-fuchsia-500/20">
               <a href="/resume.pdf" download className="flex items-center gap-2 font-bold text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
                 <FaDownload /> Download Resume
               </a>
            </div>
          </motion.div>
        </div>
      </section>
    ),
    skills: (
      <section className="section-spacing">
        <h3 className="section-title">Core Expertise</h3>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, idx) => (
            <motion.div 
              key={skill.name} 
              className="card group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 text-4xl text-fuchsia-400 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h4 className="mb-2 font-bold text-white">{skill.name}</h4>
                <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-slate-500">{skill.group}</p>
                
                <div className="relative h-1 w-full rounded-full bg-slate-800">
                  <motion.div
                    className="absolute h-full rounded-full bg-linear-to-r from-fuchsia-500 to-indigo-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    ),
    projects: (
      <section className="section-spacing">
        <h3 className="section-title">Selected Works</h3>
        <div className="mb-12 flex justify-center gap-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeFilter === filter 
                ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/25' 
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.title}
              className="card group cursor-pointer overflow-hidden p-0"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-950/60" />
                <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-sm">
                   <button className="rounded-full bg-white px-6 py-2 text-sm font-bold text-slate-950">View Case Study</button>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-xl font-bold text-white transition-colors group-hover:text-fuchsia-400">{project.title}</h4>
                </div>
                <p className="line-clamp-2 text-sm text-slate-400">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map(s => <span key={s} className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-500/80">{s}</span>)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    ),
    contact: (
      <section className="section-spacing pb-20">
        <h3 className="section-title">Get In Touch</h3>
        <div className="grid gap-12 md:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="card space-y-8"
          >
            <div>
              <h4 className="mb-4 text-2xl font-bold text-white">Let's discuss your next project.</h4>
              <p className="text-slate-400">Whether you have a specific idea or just want to chat about engineering, I'm always open to new opportunities.</p>
            </div>
            
            <form onSubmit={onFormSubmit} className="space-y-4">
              <input
                name="user_name"
                value={formValues.name}
                onChange={(event) => setFormValues((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Full Name"
                className="input"
              />
              {formErrors.name && <p className="text-xs text-rose-500">{formErrors.name}</p>}
              
              <input
                name="user_email"
                value={formValues.email}
                onChange={(event) => setFormValues((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="Email Address"
                className="input"
              />
              {formErrors.email && <p className="text-xs text-rose-500">{formErrors.email}</p>}
              
              <textarea
                name="message"
                value={formValues.message}
                onChange={(event) => setFormValues((prev) => ({ ...prev, message: event.target.value }))}
                placeholder="Tell me about your project..."
                rows={4}
                className="input"
              />
              {formErrors.message && <p className="text-xs text-rose-500">{formErrors.message}</p>}
              
              <button className="btn-primary w-full">Send Message</button>
            </form>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="card">
              <h5 className="mb-4 font-bold text-white tracking-widest uppercase text-xs">Connect with me</h5>
              <div className="flex gap-4">
                <a href="https://github.com/VIDHIMAKWANA2911" target="_blank" rel="noreferrer" className="group flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 text-2xl transition-all hover:bg-fuchsia-500 hover:text-white">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/vidhi-makwana-web-developer/" target="_blank" rel="noreferrer" className="group flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 text-2xl transition-all hover:bg-indigo-600 hover:text-white">
                  <FaLinkedin />
                </a>
                <a href="mailto:vidhim310@gmail.com" className="group flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 text-2xl transition-all hover:bg-rose-500 hover:text-white">
                  <FaEnvelope />
                </a>
              </div>
            </div>
            
            <div className="card bg-linear-to-br from-indigo-600/20 to-fuchsia-600/20">
              <h5 className="mb-2 font-bold text-white">Based in India</h5>
              <p className="text-sm text-slate-400">Available for remote work worldwide.</p>
            </div>
          </motion.div>
        </div>
      </section>
    ),
  }

  return (
    <div
      className={`selection:bg-fuchsia-500/30 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'}`}
    >
      <motion.div className="pointer-events-none fixed inset-0 z-50 hidden md:block" animate={{}}>
        <span
          className="custom-cursor"
          style={{ transform: `translate(${cursor.x - 8}px, ${cursor.y - 8}px)` }}
        />
      </motion.div>

      <div className="fixed top-0 z-50 h-1 bg-fuchsia-500" style={{ width: `${scrollProgress}%` }} />

      <AnimatePresence>
        {showLoader && (
          <motion.div
            className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-[#030712] dark:bg-[#030712] light:bg-[#f8fafc]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)', transition: { duration: 0.8, ease: "circOut" } }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mb-8 text-6xl font-black tracking-tighter text-white dark:text-white light:text-slate-900 md:text-8xl"
            >
              VM
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-fuchsia-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
            <div className="h-[2px] w-48 overflow-hidden rounded-full bg-slate-800 dark:bg-white/10 light:bg-slate-200">
              <motion.div
                className="h-full bg-linear-to-r from-fuchsia-500 to-indigo-500"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="glass-header sticky top-0 z-40">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('home')} 
            className="text-2xl font-black tracking-tighter text-white"
          >
            VIDHI<span className="text-fuchsia-500">.</span>
          </motion.button>
          
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active text-white' : 'text-slate-400'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10"
              aria-label="toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180, scale: theme === 'dark' ? 1 : 0 }}
                className="absolute"
              >
                <FaSun className="text-amber-400" />
              </motion.div>
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? -180 : 0, scale: theme === 'dark' ? 0 : 1 }}
                className="absolute"
              >
                <FaMoon className="text-indigo-400" />
              </motion.div>
            </button>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {sectionContent[activeSection]}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer
        className={`border-t py-12 backdrop-blur-xl ${
          theme === 'dark'
            ? 'border-white/10 bg-slate-950/60'
            : 'border-slate-300 bg-white/80'
        }`}
      >
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-3">
          <div>
            <p className="text-2xl font-black tracking-[0.25em] text-fuchsia-400">VM</p>
            <p className="mt-3 max-w-xs text-sm text-slate-400">
              Frontend developer focused on premium user experiences, scalable UI systems, and conversion-ready products.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-slate-300 uppercase">Quick Links</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition hover:border-fuchsia-400 hover:text-fuchsia-300 ${
                    theme === 'dark' ? 'border-white/10 text-slate-300' : 'border-slate-300 text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-slate-300 uppercase">Connect</p>
            <div className="mt-4 flex gap-3 text-lg">
              <a
                href="https://github.com/VIDHIMAKWANA2911"
                target="_blank"
                rel="noreferrer"
                className={`rounded-full border p-2 transition hover:border-fuchsia-400 hover:text-fuchsia-300 ${
                  theme === 'dark' ? 'border-white/10 text-slate-300' : 'border-slate-300 text-slate-700'
                }`}
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/vidhi-makwana-web-developer/"
                target="_blank"
                rel="noreferrer"
                className={`rounded-full border p-2 transition hover:border-fuchsia-400 hover:text-fuchsia-300 ${
                  theme === 'dark' ? 'border-white/10 text-slate-300' : 'border-slate-300 text-slate-700'
                }`}
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:vidhim310@gmail.com"
                className={`rounded-full border p-2 transition hover:border-fuchsia-400 hover:text-fuchsia-300 ${
                  theme === 'dark' ? 'border-white/10 text-slate-300' : 'border-slate-300 text-slate-700'
                }`}
              >
                <FaEnvelope />
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-500">Ahmedabad, India • Available for remote work</p>
          </div>
        </div>
        <div className={`mx-auto mt-8 max-w-6xl border-t px-5 pt-5 text-center text-xs text-slate-500 ${theme === 'dark' ? 'border-white/10' : 'border-slate-300'}`}>
          © {new Date().getFullYear()} Vidhi Makwana. All rights reserved.
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-70 grid place-items-center bg-slate-950/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="card max-w-xl"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <h4 className="text-2xl font-semibold">{selectedProject.title}</h4>
              <p className="mt-3 text-slate-300">{selectedProject.details}</p>
              <p className="mt-4 text-sm text-fuchsia-300">{selectedProject.stack.join(' • ')}</p>
              <div className="mt-6 flex gap-3">
                <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="chip"><FaExternalLinkAlt /> Live Demo</a>
                <a href={selectedProject.github} target="_blank" rel="noreferrer" className="chip"><FaGithub /> GitHub</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

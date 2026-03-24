/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, Menu, PlayCircle, Play, ArrowLeft, ArrowRight, 
  Quote, ChevronDown, Send, ArrowUp, XCircle 
} from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import { GlitchText } from './components/GlitchText';
import { VideoPlayer } from './components/VideoPlayer';

const projects = [
    {
        id: 0, title: 'Midnight City', category: 'Music Video', year: '2024', role: 'Director / Edit',
        client: 'Davido Worldwide', tools: 'Arri Alexa Mini LF, DaVinci Resolve',
        desc: 'A neon-soaked visual journey exploring the pulse of Lagos nightlife intertwined with high-fashion aesthetics. Shot over three intense nights capturing raw, kinetic energy.',
        cover: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Example YouTube link
        gallery: [
            'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop'
        ]
    },
    {
        id: 1, title: 'Echoes', category: 'Short Film', year: '2023', role: 'Writer / Director',
        client: 'Independent', tools: 'RED Komodo, Premiere Pro',
        desc: 'A poignant narrative exploring themes of isolation and ancestral memory within the modern African diaspora. Premiered at selection of European independent film festivals.',
        cover: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
        videoUrl: 'https://vimeo.com/148751763', // Example Vimeo link
        gallery: [
            'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=2073&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop'
        ]
    },
    {
        id: 2, title: 'Aura', category: 'Commercial', year: '2023', role: 'Creative Director',
        client: 'Nike London', tools: '35mm Film, Custom Rigs',
        desc: 'A dynamic, movement-focused campaign highlighting the intersection of athletic performance and urban streetwear. Conceptualized to bridge London grit with global appeal.',
        cover: 'https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?q=80&w=1887&auto=format&fit=crop',
        videoUrl: '', // Fallback to cover image
        gallery: [
            'https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=2036&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop'
        ]
    },
    {
        id: 3, title: 'Onyx Nights', category: 'Event Visuals', year: '2022', role: 'Director / Color',
        client: 'Boiler Room', tools: 'Sony FX9, Resolume',
        desc: 'Immersive, live-reactive visual setups designed for underground electronic and afrobeats sets. A symphony of shadow and stark lighting.',
        cover: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
        videoUrl: '',
        gallery: [
            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=2070&auto=format&fit=crop'
        ]
    }
];

const btsData = [
    {
        title: 'Arri Alexa Mini LF Setup', location: 'London Studio',
        img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg',
        desc: 'Rigging the primary A-Cam for the high-speed tracking shots required for the Midnight City opening sequence. The large format sensor gave us that crucial depth of field drop-off.',
        notes: 'Lenses: Signature Primes. Handled exclusively by 1st AC Markus.'
    },
    {
        title: 'Blocking Scene 4', location: 'On Location, Essex',
        img: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=1974&auto=format&fit=crop',
        desc: 'Working closely with lead talent to nail the emotional beat before losing natural light. The wind added an unscripted intensity to the performance.',
        notes: 'Shoot time window: 45 minutes of golden hour. We got it on take 3.'
    },
    {
        title: 'Grade & Finish Session', location: 'Post-House, Soho',
        img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg',
        desc: 'Finalizing the look for the Nike Aura campaign. Pushing the mid-tones into a cooler, metallic space while preserving natural skin tones for the athletes.',
        notes: 'Node structure pushed to limits. Print film emulation applied at timeline level.'
    },
    {
        title: 'Stage Prep', location: 'Lagos, Nigeria',
        img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
        desc: 'Pre-lighting the massive soundstage for the pivotal concert scene. Managing over 50 extras and coordinating volumetric lighting cues.',
        notes: 'Haze machines running at 40%. Custom DMX profiles built on set.'
    }
];

const testimonials = {
    'sony': { text: '"Ezekiel brings an unparalleled cinematic eye to everything he touches. His ability to translate raw emotion into stunning visual sequences elevated our entire campaign."', name: 'Sarah Jenkins', role: 'EP, Sony Music UK' },
    'nike': { text: '"Working with Baggiez is seamless. The attention to detail from pre-production through to the final color grade is meticulous. A true visionary director."', name: 'Marcus Thorne', role: 'Creative Dir, Nike' },
    'native': { text: '"His eye for capturing the raw essence of Afro-culture and translating it into a globally resonant, premium format is unmatched right now."', name: 'Seni Saraki', role: 'Co-Founder, The Native' },
    'vogue': { text: '"A masterclass in visual storytelling. Ezekiel understands light and movement in a way that turns standard fashion film into compelling cinema."', name: 'Elena Rossi', role: 'Visual Editor, Vogue Italia' },
    'boiler': { text: '"Baggiez completely redefined how we capture the energy of the room. The aesthetic is grimy yet undeniably high-end."', name: 'James K.', role: 'Head of Video, Boiler Room' }
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [activeClient, setActiveClient] = useState('sony');
  const [testimonialOpacity, setTestimonialOpacity] = useState(1);
  
  const [mainModalOpen, setMainModalOpen] = useState(false);
  const [mainModalView, setMainModalView] = useState<'grid' | 'detail'>('detail');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  
  const [btsModalOpen, setBtsModalOpen] = useState(false);
  const [currentBtsIndex, setCurrentBtsIndex] = useState(0);
  
  const btsCarouselRef = useRef<HTMLDivElement>(null);
  const [activeBtsDot, setActiveBtsDot] = useState(0);

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', type: '', details: '' });

  const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setFormStatus('submitting');
      
      const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
      
      if (!endpoint) {
          console.warn("Formspree endpoint not configured. Simulating success.");
          setTimeout(() => {
              setFormStatus('success');
              setFormData({ name: '', email: '', type: '', details: '' });
              setTimeout(() => setFormStatus('idle'), 3000);
          }, 1000);
          return;
      }

      try {
          const response = await fetch(endpoint, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: JSON.stringify(formData)
          });
          
          if (response.ok) {
              setFormStatus('success');
              setFormData({ name: '', email: '', type: '', details: '' });
              setTimeout(() => setFormStatus('idle'), 3000);
          } else {
              setFormStatus('error');
              setTimeout(() => setFormStatus('idle'), 3000);
          }
      } catch (error) {
          setFormStatus('error');
          setTimeout(() => setFormStatus('idle'), 3000);
      }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen || mainModalOpen || btsModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, mainModalOpen, btsModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMainModalOpen(false);
        setBtsModalOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const changeTestimonial = (clientId: string) => {
    setTestimonialOpacity(0);
    setTimeout(() => {
      setActiveClient(clientId);
      setTestimonialOpacity(1);
    }, 300);
  };

  const openWorkModal = (index: number, fromGrid = false) => {
    setCurrentProjectIndex(index);
    setMainModalView('detail');
    setMainModalOpen(true);
  };

  const openAllWorksModal = () => {
    setMainModalView('grid');
    setMainModalOpen(true);
  };

  const navigateWork = (direction: number) => {
    let newIndex = currentProjectIndex + direction;
    if (newIndex < 0) newIndex = projects.length - 1;
    if (newIndex >= projects.length) newIndex = 0;
    setCurrentProjectIndex(newIndex);
  };

  const handleBtsScroll = () => {
    if (btsCarouselRef.current) {
      const scrollPosition = btsCarouselRef.current.scrollLeft;
      const cardWidth = btsCarouselRef.current.clientWidth * 0.8;
      const activeIndex = Math.round(scrollPosition / cardWidth);
      setActiveBtsDot(activeIndex);
    }
  };

  const scrollBTS = (direction: number) => {
    if (btsCarouselRef.current) {
      const cardWidth = btsCarouselRef.current.clientWidth * 0.8;
      btsCarouselRef.current.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
    }
  };

  const scrollToBTS = (index: number) => {
    if (btsCarouselRef.current) {
      const cards = btsCarouselRef.current.children;
      if (cards[index]) {
        const scrollPos = (cards[index] as HTMLElement).offsetLeft - btsCarouselRef.current.offsetLeft - 24;
        btsCarouselRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
      }
    }
  };

  const openBtsModal = (index: number) => {
    setCurrentBtsIndex(index);
    setBtsModalOpen(true);
  };

  const setupDragScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: React.MouseEvent) => {
      if (!ref.current) return;
      isDown = true;
      ref.current.classList.add('active', 'cursor-grabbing');
      ref.current.classList.remove('cursor-grab');
      startX = e.pageX - ref.current.offsetLeft;
      scrollLeft = ref.current.scrollLeft;
    };

    const onMouseLeaveOrUp = () => {
      if (!ref.current) return;
      isDown = false;
      ref.current.classList.remove('active', 'cursor-grabbing');
      ref.current.classList.add('cursor-grab');
    };

    const onMouseMove = (e: React.MouseEvent) => {
      if (!isDown || !ref.current) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX) * 2;
      ref.current.scrollLeft = scrollLeft - walk;
    };

    return { onMouseDown, onMouseLeave: onMouseLeaveOrUp, onMouseUp: onMouseLeaveOrUp, onMouseMove };
  };

  const btsDragHandlers = setupDragScroll(btsCarouselRef);
  const clientsRef = useRef<HTMLDivElement>(null);
  const clientsDragHandlers = setupDragScroll(clientsRef);

  return (
    <div className="bg-[#050505] text-zinc-300 font-['Inter',sans-serif] antialiased selection:bg-zinc-800 selection:text-zinc-100 overflow-x-hidden min-h-screen">
      <CustomCursor />
      <div className="film-grain"></div>
      <nav id="main-nav" className={`fixed w-full z-50 px-6 py-4 md:px-12 flex justify-between items-center text-xs transition-all duration-300 ${isScrolled ? 'top-0 backdrop-blur-md bg-[#050505]/90 border-b border-zinc-900 py-4' : 'top-4 md:top-6 mix-blend-difference'}`}>
          <a href="#" className="font-normal tracking-tighter uppercase text-zinc-100 z-50 relative">BAGGIEZ</a>
          
          <div className="hidden md:flex items-center space-x-12">
              <a href="#about" className="hover:text-[#FF4F00] transition-colors duration-300">Director</a>
              <a href="#services" className="hover:text-[#FF4F00] transition-colors duration-300">Services</a>
              <a href="#work" className="hover:text-[#FF4F00] transition-colors duration-300">Work</a>
              <a href="#bts" className="hover:text-[#FF4F00] transition-colors duration-300">BTS</a>
              <a href="#clients" className="hover:text-[#FF4F00] transition-colors duration-300">Clients</a>
          </div>

          <div className="flex items-center space-x-8 z-50 relative">
              <span className="hidden lg:inline text-zinc-500">London/Lagos {'{WAT}'}</span>
              <a href="#contact" className="hidden md:flex items-center gap-1 hover:text-[#FF4F00] transition-colors duration-300">
                  <span>Contact</span>
                  <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
              <button id="mobile-menu-btn" onClick={toggleMenu} className="md:hidden text-zinc-100 hover:text-zinc-400 transition-colors focus:outline-none flex items-center p-2 -mr-2 rounded-full bg-transparent hover:bg-zinc-900/50">
                  {menuOpen ? <XCircle size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
          </div>
      </nav>

      <div id="mobile-menu" className={`fixed inset-0 bg-[#050505]/98 backdrop-blur-2xl z-40 flex-col justify-center items-center transition-opacity duration-300 ${menuOpen ? 'flex opacity-100' : 'hidden opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col items-center space-y-6 text-2xl font-light tracking-tight text-zinc-300 w-full px-8">
              <a href="#about" onClick={toggleMenu} className="mobile-link w-full text-center py-4 hover:text-[#FF4F00] transition-colors duration-300 border-b border-zinc-900/50">Director</a>
              <a href="#services" onClick={toggleMenu} className="mobile-link w-full text-center py-4 hover:text-[#FF4F00] transition-colors duration-300 border-b border-zinc-900/50">Services</a>
              <a href="#work" onClick={toggleMenu} className="mobile-link w-full text-center py-4 hover:text-[#FF4F00] transition-colors duration-300 border-b border-zinc-900/50">Work</a>
              <a href="#bts" onClick={toggleMenu} className="mobile-link w-full text-center py-4 hover:text-[#FF4F00] transition-colors duration-300 border-b border-zinc-900/50">Behind The Scenes</a>
              <a href="#clients" onClick={toggleMenu} className="mobile-link w-full text-center py-4 hover:text-[#FF4F00] transition-colors duration-300 border-b border-zinc-900/50">Clients</a>
              <a href="#contact" onClick={toggleMenu} className="mobile-link w-full justify-center hover:text-[#FF4F00] transition-colors duration-300 flex items-center gap-2 mt-4 pt-4 text-lg">
                  Contact <ArrowUpRight size={20} strokeWidth={1.5} />
              </a>
          </div>
      </div>

      <header className="relative pt-40 pb-20 px-6 md:px-12 w-full flex flex-col items-center justify-center min-h-[90vh] overflow-hidden group/hero">
          {/* Background Image with Grayscale and Hover Effect */}
          <div className="absolute inset-0 z-0">
              <img 
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop" 
                  alt="Creative Direction Background" 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 ease-in-out group-hover/hero:grayscale-0 active:grayscale-0"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#050505]/80 to-[#050505] transition-opacity duration-1000 group-hover/hero:opacity-70 active:opacity-70"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-[100rem] mx-auto w-full flex flex-col items-center">
              <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tighter text-zinc-100 mb-8 text-center leading-none"
              >
                  <GlitchText text="Ezekiel Anefiok" delay={0.3} /><span className="text-[#FF4F00]">.</span>
              </motion.h1>
              
              <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="w-full flex flex-col md:flex-row justify-between items-start md:items-end text-xs uppercase tracking-widest text-zinc-500 mb-12 gap-4"
              >
                  <div>
                      <p className="text-zinc-300 mb-1">Baggiez</p>
                      <p>Creative Director</p>
                  </div>
                  <div className="hidden md:block text-center">
                      <p className="text-zinc-300 mb-1">Film &amp; Visual Arts</p>
                      <p>London — Lagos</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                      <div className="flex items-center gap-4">
                          <a href="#work" className="text-zinc-100 border border-zinc-800 hover:bg-[#FF4F00] hover:border-[#FF4F00] hover:text-white transition-colors duration-300 px-4 py-2 rounded-full flex items-center gap-2">
                              View Work
                          </a>
                          <button onClick={() => alert('Showreel video integration coming soon.')} className="flex items-center gap-1 hover:text-[#FF4F00] transition-colors duration-300">
                              <PlayCircle size={16} strokeWidth={1.5} />
                              Showreel
                          </button>
                      </div>
                  </div>
              </motion.div>

              <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  className="w-full aspect-[4/3] md:aspect-[21/9] rounded-lg overflow-hidden relative group cursor-pointer" 
                  onClick={() => alert('Showreel playback initiated.')}
                  data-playable="true"
              >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#050505]/40 to-transparent z-10 pointer-events-none group-hover:opacity-70 transition-opacity duration-700"></div>
                  
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border border-zinc-100/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-[#FF4F00]/50 transition-all duration-500 group-hover:bg-[#FF4F00]/10">
                          <Play size={32} className="text-zinc-100 ml-1 group-hover:text-[#FF4F00] transition-colors" strokeWidth={1.5} />
                      </div>
                  </div>
                  
                  {/* To use your own video, replace the videoUrl prop below with your YouTube, Vimeo, or direct .mp4 link */}
                  <div className="w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-1000 ease-out">
                      <VideoPlayer 
                          videoUrl="#" 
                          poster="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop"
                      />
                  </div>
              </motion.div>
          </div>
      </header>

      <section id="about" className="py-16 px-6 md:px-12 max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="lg:col-span-2 flex lg:justify-end">
                  <span className="text-xs text-[#FF4F00]">(1)</span>
              </div>
              <div className="lg:col-span-10">
                  <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-zinc-100 leading-tight mb-20 max-w-5xl"
                  >
                      Operating under the moniker <span className="text-zinc-100 font-normal relative inline-block"><span className="relative z-10">Baggiez</span><motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }} className="absolute bottom-2 left-0 w-full h-3 bg-[#FF4F00]/40 -z-0 -rotate-1 origin-left"></motion.span></span>, Ezekiel Anefiok is a Creative Director and Filmmaker crafting high-end visual narratives. Known for a <span className="italic text-zinc-300">cinematic approach</span> and meticulous attention to detail, he transforms concepts into striking, immersive motion pictures across the globe.
                  </motion.h2>

                  <div id="services" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                      <div className="lg:col-span-2">
                          <span className="text-xs text-zinc-500">(Services)</span>
                      </div>
                      <div className="lg:col-span-10 flex flex-col">
                          <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 0.1 }}
                              className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-zinc-900 hover:bg-zinc-900/20 transition-colors duration-300 px-4 -mx-4 rounded-lg"
                          >
                              <h3 className="text-xl tracking-tight text-zinc-100 font-light">Creative Direction</h3>
                              <p className="md:col-span-2 text-sm text-zinc-400 font-light leading-relaxed">Developing the overarching vision and aesthetic for campaigns, music videos, and brand films. From initial concept generation and mood boarding to final execution, ensuring a cohesive and powerful visual language.</p>
                          </motion.div>
                          <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                              className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-zinc-900 hover:bg-zinc-900/20 transition-colors duration-300 px-4 -mx-4 rounded-lg"
                          >
                              <h3 className="text-xl tracking-tight text-zinc-100 font-light">Directing &amp; Production</h3>
                              <p className="md:col-span-2 text-sm text-zinc-400 font-light leading-relaxed">Leading sets with precision and artistic intent. Managing talent, coordinating with cinematography departments, and overseeing the entire physical production process to capture compelling, cinematic footage.</p>
                          </motion.div>
                          <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 0.3 }}
                              className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-zinc-900 border-b hover:bg-zinc-900/20 transition-colors duration-300 px-4 -mx-4 rounded-lg"
                          >
                              <h3 className="text-xl tracking-tight text-zinc-100 font-light">Post-Production</h3>
                              <p className="md:col-span-2 text-sm text-zinc-400 font-light leading-relaxed">Refining the narrative through expert offline editing and elevating the visual impact with high-end color grading. Delivering a finalized product that meets premium industry standards.</p>
                          </motion.div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <div className="w-full px-4 md:px-8 py-12">
          <div className="w-full aspect-[4/5] md:aspect-[21/9] rounded-2xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1603218734550-be7fcffeb817?w=2560&q=80" alt="On Set Lighting" className="w-full h-full object-cover opacity-60" />
          </div>
      </div>

      <section id="work" className="py-16 px-6 md:px-12 max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-12">
              <div className="lg:col-span-2 flex lg:justify-end">
                  <span className="text-xs text-[#FF4F00]">(2)</span>
              </div>
              <div className="lg:col-span-10">
                  <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-6xl md:text-8xl font-extralight tracking-tighter text-zinc-100"
                  >
                      Selected Work<span className="text-[#FF4F00]">.</span>
                  </motion.h2>
              </div>
          </div>

          <div className="flex flex-col border-t border-zinc-900">
              {projects.slice(0, 3).map((proj, idx) => (
                  <motion.button 
                      key={proj.id} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      onClick={() => openWorkModal(idx)} 
                      className="w-full text-left group relative flex flex-col md:flex-row items-start md:items-center justify-between py-12 border-b border-zinc-900 hover:bg-zinc-900/20 transition-colors px-4 -mx-4"
                      data-viewable="true"
                  >
                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 z-10">
                          <h3 className="text-4xl md:text-5xl font-extralight tracking-tighter text-zinc-100 group-hover:text-[#FF4F00] transition-colors duration-300">{proj.title}</h3>
                          <span className="text-xs text-zinc-500 uppercase tracking-widest">{proj.category}</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 mt-4 md:mt-0 z-10">
                          <span className="text-xs text-zinc-500">{proj.year}</span>
                          <span className="text-xs text-zinc-500 hidden md:block w-32 text-right">{proj.role}</span>
                      </div>
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] aspect-[16/9] rounded-lg overflow-hidden opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 pointer-events-none z-0 hidden lg:block shadow-2xl">
                          <img src={proj.cover} alt={proj.title} className="w-full h-full object-cover" />
                      </div>
                  </motion.button>
              ))}
          </div>
          
          <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 flex justify-center"
          >
               <button onClick={openAllWorksModal} className="text-xs uppercase tracking-widest text-zinc-100 border-b border-zinc-700 pb-1 hover:text-[#FF4F00] hover:border-[#FF4F00] transition-colors duration-300 focus:outline-none">View All Works</button>
          </motion.div>
      </section>

      <section id="bts" className="py-16 px-6 md:px-12 max-w-[100rem] mx-auto overflow-hidden relative group/section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-12">
              <div className="lg:col-span-2 flex lg:justify-end">
                  <span className="text-xs text-[#FF4F00]">(3)</span>
              </div>
              <div className="lg:col-span-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-6xl md:text-8xl font-extralight tracking-tighter text-zinc-100"
                  >
                      Behind The Scenes<span className="text-[#FF4F00]">.</span>
                  </motion.h2>
              </div>
          </div>

          <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative w-full group/carousel"
          >
              <button onClick={() => scrollBTS(-1)} className="absolute left-2 md:left-6 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-zinc-700/50 bg-[#050505]/60 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-[#FF4F00] hover:border-[#FF4F00] hover:bg-zinc-900 transition-all duration-300 focus:outline-none shadow-2xl opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100">
                  <ArrowLeft size={20} />
              </button>
              <button onClick={() => scrollBTS(1)} className="absolute right-2 md:right-6 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-zinc-700/50 bg-[#050505]/60 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-[#FF4F00] hover:border-[#FF4F00] hover:bg-zinc-900 transition-all duration-300 focus:outline-none shadow-2xl opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100">
                  <ArrowRight size={20} />
              </button>

              <div 
                className="flex overflow-x-auto gap-6 md:gap-8 pb-12 pt-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:-mx-12 md:px-12 cursor-grab active:cursor-grabbing" 
                id="bts-carousel"
                ref={btsCarouselRef}
                onScroll={handleBtsScroll}
                {...btsDragHandlers}
              >
                  {btsData.map((data, idx) => (
                      <div key={idx} className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] snap-center group block cursor-pointer" onClick={() => openBtsModal(idx)} data-viewable="true">
                          <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4 relative bg-zinc-900">
                              <img src={data.img} alt={data.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100 grayscale hover:grayscale-0" />
                          </div>
                          <div className="flex justify-between items-center text-xs font-medium uppercase tracking-wider text-zinc-100">
                              <span>{data.title}</span>
                              <span className="text-zinc-500">{data.location.split(',')[0]}</span>
                          </div>
                      </div>
                  ))}
              </div>

              <div className="flex justify-center items-center gap-3 mt-2 mb-2 w-full px-6 md:px-12" id="bts-dots-container">
                  {btsData.map((_, idx) => (
                      <button 
                        key={idx} 
                        className={`bts-dot rounded-full transition-all duration-300 focus:outline-none hover:scale-150 ${activeBtsDot === idx ? 'w-3 h-3 bg-zinc-100 shadow-[0_0_12px_rgba(255,255,255,0.6)]' : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'}`} 
                        onClick={() => scrollToBTS(idx)}
                      ></button>
                  ))}
              </div>
          </motion.div>
      </section>

      <section id="clients" className="py-16 px-6 md:px-12 max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-12">
              <div className="lg:col-span-2 flex lg:justify-end">
                  <span className="text-xs text-[#FF4F00]">(4)</span>
              </div>
              <div className="lg:col-span-10">
                  <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-6xl md:text-8xl font-extralight tracking-tighter text-zinc-100"
                  >
                      Select Clients<span className="text-[#FF4F00]">.</span>
                  </motion.h2>
              </div>
          </div>

          <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
              <div className="lg:col-span-2"></div>
              <div className="lg:col-span-10 flex flex-col gap-12 md:gap-16">
                  
                  <div 
                    className="w-full flex overflow-x-auto scrollbar-hide gap-3 pb-6 snap-x border-b border-zinc-900 cursor-grab"
                    ref={clientsRef}
                    {...clientsDragHandlers}
                  >
                      <button onClick={() => changeTestimonial('sony')} className={`client-btn snap-start shrink-0 px-6 py-3 rounded-full border transition-all duration-300 focus:outline-none flex items-center justify-center ${activeClient === 'sony' ? 'text-white border-[#FF4F00] bg-[#FF4F00]/10' : 'border-zinc-800 text-zinc-500 bg-transparent hover:text-zinc-100 hover:border-zinc-500'}`}>
                          <span className="text-sm md:text-base font-medium tracking-tight uppercase">Sony Music</span>
                      </button>
                      <button onClick={() => changeTestimonial('nike')} className={`client-btn snap-start shrink-0 px-6 py-3 rounded-full border transition-all duration-300 focus:outline-none flex items-center justify-center ${activeClient === 'nike' ? 'text-white border-[#FF4F00] bg-[#FF4F00]/10' : 'border-zinc-800 text-zinc-500 bg-transparent hover:text-zinc-100 hover:border-zinc-500'}`}>
                          <span className="text-sm md:text-base font-medium tracking-tight uppercase italic font-serif">Nike</span>
                      </button>
                      <button onClick={() => changeTestimonial('native')} className={`client-btn snap-start shrink-0 px-6 py-3 rounded-full border transition-all duration-300 focus:outline-none flex items-center justify-center ${activeClient === 'native' ? 'text-white border-[#FF4F00] bg-[#FF4F00]/10' : 'border-zinc-800 text-zinc-500 bg-transparent hover:text-zinc-100 hover:border-zinc-500'}`}>
                          <span className="text-sm md:text-base font-normal tracking-tight uppercase">The Native</span>
                      </button>
                      <button onClick={() => changeTestimonial('vogue')} className={`client-btn snap-start shrink-0 px-6 py-3 rounded-full border transition-all duration-300 focus:outline-none flex items-center justify-center ${activeClient === 'vogue' ? 'text-white border-[#FF4F00] bg-[#FF4F00]/10' : 'border-zinc-800 text-zinc-500 bg-transparent hover:text-zinc-100 hover:border-zinc-500'}`}>
                          <span className="text-sm md:text-base font-light tracking-widest uppercase">Vogue</span>
                      </button>
                      <button onClick={() => changeTestimonial('boiler')} className={`client-btn snap-start shrink-0 px-6 py-3 rounded-full border transition-all duration-300 focus:outline-none flex items-center justify-center ${activeClient === 'boiler' ? 'text-white border-[#FF4F00] bg-[#FF4F00]/10' : 'border-zinc-800 text-zinc-500 bg-transparent hover:text-zinc-100 hover:border-zinc-500'}`}>
                          <span className="text-sm md:text-base font-light tracking-tight">BOILER ROOM</span>
                      </button>
                  </div>

                  <div className="w-full flex flex-col gap-12 border-l border-zinc-800 pl-6 md:pl-16 lg:pl-20 py-2">
                      <div id="testimonial-container" className="flex flex-col gap-6 fade-transition" style={{ opacity: testimonialOpacity }}>
                          <Quote size={32} className="text-zinc-700" />
                          <p className="text-2xl md:text-3xl lg:text-4xl font-extralight leading-relaxed text-zinc-200">{testimonials[activeClient as keyof typeof testimonials].text}</p>
                          <div className="flex flex-col mt-4">
                              <span className="text-sm font-medium text-zinc-100">{testimonials[activeClient as keyof typeof testimonials].name}</span>
                              <span className="text-xs text-zinc-500 uppercase tracking-wider mt-1">{testimonials[activeClient as keyof typeof testimonials].role}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </motion.div>
      </section>

      <section id="contact" className="py-16 px-6 md:px-12 max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-12">
              <div className="lg:col-span-2 flex lg:justify-end">
                  <span className="text-xs text-[#FF4F00]">(5)</span>
              </div>
              <div className="lg:col-span-10">
                  <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-6xl md:text-8xl font-extralight tracking-tighter text-zinc-100"
                  >
                      Bookings<span className="text-[#FF4F00]">.</span>
                  </motion.h2>
              </div>
          </div>

          <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
              <div className="lg:col-span-2"></div>
              <div className="lg:col-span-10 flex flex-col md:flex-row gap-16">
                  
                  <div className="w-full md:w-1/3 flex flex-col">
                      <div className="py-6 border-t border-zinc-900 flex justify-between items-start">
                          <h3 className="text-sm tracking-tight text-zinc-100 font-light">Location</h3>
                          <div className="text-sm text-zinc-400 font-light text-right">
                              <p>Available Worldwide</p>
                              <p>London — Lagos</p>
                          </div>
                      </div>
                      <div className="py-6 border-t border-zinc-900 flex justify-between items-center">
                          <h3 className="text-sm tracking-tight text-zinc-100 font-light">Email</h3>
                          <a href="mailto:director@baggiez.com" className="text-sm text-zinc-400 hover:text-[#FF4F00] transition-colors duration-300 font-light text-right flex items-center gap-2">
                              director@baggiez.com
                              <ArrowUpRight size={14} />
                          </a>
                      </div>
                      <div className="py-6 border-t border-zinc-900 flex justify-between items-center">
                          <h3 className="text-sm tracking-tight text-zinc-100 font-light">Representation</h3>
                          <div className="text-sm text-zinc-400 font-light text-right flex flex-col">
                              <span>WME Agency</span>
                              <span className="text-xs text-zinc-600 mt-1">Commercial / Music</span>
                          </div>
                      </div>
                      <div className="py-6 border-t border-b border-zinc-900 flex justify-between items-center">
                          <h3 className="text-sm tracking-tight text-zinc-100 font-light">Instagram</h3>
                          <a href="#" className="text-sm text-zinc-400 hover:text-[#FF4F00] transition-colors duration-300 font-light text-right flex items-center gap-2">
                              @baggiez.dir
                              <ArrowUpRight size={14} />
                          </a>
                      </div>
                  </div>

                  <form className="w-full md:w-2/3 flex flex-col gap-6" onSubmit={handleFormSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <input type="text" placeholder="Name / Company" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-zinc-800 py-4 text-zinc-100 focus:border-[#FF4F00] focus:outline-none transition-colors duration-300 rounded-none placeholder-zinc-600 text-sm font-light" />
                          <input type="email" placeholder="Email Address" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-zinc-800 py-4 text-zinc-100 focus:border-[#FF4F00] focus:outline-none transition-colors duration-300 rounded-none placeholder-zinc-600 text-sm font-light" />
                      </div>
                      <div className="grid grid-cols-1 gap-6">
                          <div className="relative w-full">
                              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} required className="w-full appearance-none bg-transparent border-b border-zinc-800 py-4 text-zinc-100 focus:border-[#FF4F00] focus:outline-none transition-colors duration-300 rounded-none text-sm font-light cursor-pointer">
                                  <option value="" disabled className="bg-zinc-950 text-zinc-500">Project Type</option>
                                  <option value="music-video" className="bg-zinc-950">Music Video</option>
                                  <option value="commercial" className="bg-zinc-950">Commercial / Brand</option>
                                  <option value="short-film" className="bg-zinc-950">Short Film</option>
                                  <option value="other" className="bg-zinc-950">Other</option>
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-zinc-500">
                                  <ChevronDown size={16} />
                              </div>
                          </div>
                      </div>
                      <textarea placeholder="Project Details &amp; Timeline" required value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} rows={4} className="w-full bg-transparent border-b border-zinc-800 py-4 text-zinc-100 focus:border-[#FF4F00] focus:outline-none transition-colors duration-300 rounded-none placeholder-zinc-600 text-sm font-light resize-none"></textarea>
                      
                      <button type="submit" disabled={formStatus === 'submitting'} className="mt-4 bg-zinc-100 text-zinc-950 hover:bg-[#FF4F00] hover:text-white transition-colors duration-300 py-4 px-8 rounded-sm text-sm font-medium w-full sm:w-auto self-start flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                          {formStatus === 'submitting' ? 'Sending...' : formStatus === 'success' ? 'Sent Successfully' : formStatus === 'error' ? 'Error Sending' : 'Send Inquiry'}
                          {formStatus === 'idle' && <Send size={16} />}
                      </button>
                  </form>
              </div>
          </motion.div>
      </section>

      <footer className="pt-20 pb-8 px-6 md:px-12 w-full flex flex-col items-center overflow-hidden">
          
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end text-xs uppercase tracking-widest text-zinc-500 mb-20 gap-8 max-w-[100rem] mx-auto">
              <div>
                  <p className="text-zinc-300 mb-1">Ezekiel Anefiok</p>
                  <p>Director &amp; Filmmaker</p>
              </div>
              <div className="text-left sm:text-center">
                  <p className="text-zinc-300 mb-1">Operating out of</p>
                  <p>London — Lagos</p>
              </div>
              <div className="text-left sm:text-right">
                  <p>©2025</p>
              </div>
          </div>

          <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-[18vw] leading-[0.8] font-extralight tracking-tighter text-zinc-100 text-center uppercase select-none w-full mb-24"
          >
              <span className="relative inline-block">
                  BAGGIEZ
              </span>
          </motion.h1>

          <div className="w-full max-w-[100rem] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-wider">
              <span className="text-zinc-100">Ezekiel Anefiok</span>
              <a href="#" className="text-zinc-500 hover:text-[#FF4F00] transition-colors duration-300 flex items-center gap-1">
                  Back to top <ArrowUp size={14} />
              </a>
              <span className="text-zinc-500">All Rights Reserved</span>
          </div>
      </footer>

      <div id="main-modal" className={`fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl transition-opacity duration-300 overflow-y-auto ${mainModalOpen ? 'opacity-100 block' : 'opacity-0 hidden pointer-events-none'}`}>
          
          <div className="fixed top-0 w-full px-6 py-6 md:px-12 flex justify-between items-center z-50 bg-gradient-to-b from-[#050505] to-transparent">
              <button 
                onClick={() => setMainModalView('grid')} 
                className={`text-xs uppercase tracking-widest text-zinc-400 hover:text-[#FF4F00] transition-colors duration-300 flex items-center gap-2 focus:outline-none ${mainModalView === 'detail' && projects.length > 0 ? '' : 'hidden'}`}
              >
                  <ArrowLeft size={16} /> Back to Gallery
              </button>
              <div className={`w-full h-1 ${mainModalView === 'grid' ? '' : 'hidden'}`}></div>
              <button onClick={() => setMainModalOpen(false)} className="text-zinc-400 hover:text-[#FF4F00] transition-colors duration-300 focus:outline-none flex items-center justify-center p-2 rounded-full bg-zinc-900/50 hover:bg-zinc-800 backdrop-blur-md ml-auto">
                  <XCircle size={24} strokeWidth={1.5} />
              </button>
          </div>

          <div className="min-h-screen pt-24 pb-24 px-6 md:px-12 max-w-[100rem] mx-auto flex flex-col">
              
              <div className={`w-full fade-transition ${mainModalView === 'grid' ? 'block' : 'hidden'}`}>
                  <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-zinc-100 mb-12">All Works</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {projects.map((proj, idx) => (
                          <div key={proj.id} className="group cursor-pointer" onClick={() => openWorkModal(idx, true)} data-viewable="true">
                              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 relative bg-zinc-900">
                                  <img src={proj.cover} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" />
                              </div>
                              <h3 className="text-2xl font-light tracking-tight text-zinc-100 group-hover:text-[#FF4F00] transition-colors duration-300">{proj.title}</h3>
                              <span className="text-xs text-zinc-500 uppercase tracking-widest">{proj.category}</span>
                          </div>
                      ))}
                  </div>
              </div>

              <div className={`w-full fade-transition flex-col ${mainModalView === 'detail' ? 'flex' : 'hidden'}`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                      <div>
                          <span className="text-xs text-zinc-500 uppercase tracking-widest mb-2 block">{projects[currentProjectIndex]?.category}</span>
                          <h2 className="text-4xl md:text-6xl lg:text-8xl font-extralight tracking-tighter text-zinc-100">{projects[currentProjectIndex]?.title}</h2>
                      </div>
                      <div className="text-left md:text-right text-xs uppercase tracking-widest text-zinc-500 flex flex-col gap-1">
                          <span>{projects[currentProjectIndex]?.client}</span>
                          <span>{projects[currentProjectIndex]?.year}</span>
                      </div>
                  </div>

                  <div className="w-full aspect-video bg-zinc-900 rounded-xl overflow-hidden relative mb-12 group cursor-pointer" data-playable="true">
                      {projects[currentProjectIndex]?.videoUrl ? (
                          <VideoPlayer 
                              videoUrl={projects[currentProjectIndex].videoUrl} 
                              poster={projects[currentProjectIndex].cover}
                              controls={true}
                              autoPlay={true}
                              muted={false}
                          />
                      ) : (
                          <>
                              <img src={projects[currentProjectIndex]?.cover} alt="Project Cover" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-transparent transition-colors duration-500 pointer-events-none">
                                  <div className="w-16 h-16 rounded-full border border-zinc-100/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-[#FF4F00] transition-all duration-500">
                                      <Play size={24} className="text-zinc-100 ml-1 group-hover:text-[#FF4F00] transition-colors duration-500" strokeWidth={1.5} />
                                  </div>
                              </div>
                          </>
                      )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-zinc-900 pt-12 mb-16">
                      <div className="lg:col-span-8 pr-0 lg:pr-12">
                          <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-300">{projects[currentProjectIndex]?.desc}</p>
                      </div>
                      <div className="lg:col-span-4 flex flex-col gap-6">
                          <div>
                              <span className="text-xs text-zinc-600 uppercase tracking-widest block mb-1">Role</span>
                              <span className="text-sm font-light text-zinc-100">{projects[currentProjectIndex]?.role}</span>
                          </div>
                          <div>
                              <span className="text-xs text-zinc-600 uppercase tracking-widest block mb-1">Tools / Medium</span>
                              <span className="text-sm font-light text-zinc-100">{projects[currentProjectIndex]?.tools}</span>
                          </div>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
                      {projects[currentProjectIndex]?.gallery.map((img, idx) => (
                          <div key={idx} className="aspect-video rounded-lg overflow-hidden bg-zinc-900">
                              <img src={img} className="w-full h-full object-cover" />
                          </div>
                      ))}
                  </div>

                  <div className="flex justify-between items-center border-t border-zinc-900 pt-8 mt-auto">
                      <button onClick={() => navigateWork(-1)} className="text-sm tracking-tight text-zinc-400 hover:text-[#FF4F00] transition-colors duration-300 flex items-center gap-2 focus:outline-none group">
                          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Previous
                      </button>
                      <button onClick={() => navigateWork(1)} className="text-sm tracking-tight text-zinc-400 hover:text-[#FF4F00] transition-colors duration-300 flex items-center gap-2 focus:outline-none group">
                          Next <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                  </div>
              </div>
              
          </div>
      </div>

      <div id="bts-modal" className={`fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl transition-opacity duration-300 items-center justify-center p-6 md:p-12 ${btsModalOpen ? 'opacity-100 flex' : 'opacity-0 hidden pointer-events-none'}`}>
          <button onClick={() => setBtsModalOpen(false)} className="absolute top-6 right-6 md:top-12 md:right-12 text-zinc-400 hover:text-[#FF4F00] transition-colors duration-300 focus:outline-none p-2 rounded-full bg-zinc-900/50 hover:bg-zinc-800 backdrop-blur-md z-50">
              <XCircle size={24} strokeWidth={1.5} />
          </button>
          
          <div className="w-full max-w-6xl bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
              <div className="w-full md:w-3/5 relative bg-zinc-900 h-64 md:h-auto shrink-0">
                  <img src={btsData[currentBtsIndex]?.img} alt="BTS Image" className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col overflow-y-auto scrollbar-hide">
                  <span className="text-xs text-zinc-500 uppercase tracking-widest mb-4">{btsData[currentBtsIndex]?.location}</span>
                  <h3 className="text-3xl font-extralight tracking-tight text-zinc-100 mb-6">{btsData[currentBtsIndex]?.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-zinc-400 mb-8">{btsData[currentBtsIndex]?.desc}</p>
                  
                  <div className="mt-auto pt-8 border-t border-zinc-900">
                      <span className="text-xs text-zinc-600 uppercase tracking-widest block mb-2">Production Notes</span>
                      <p className="text-sm font-light text-zinc-300 italic">{btsData[currentBtsIndex]?.notes}</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

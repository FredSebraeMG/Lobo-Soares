import React from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { INITIAL_PROFILE } from '../constants';
import { Mail, Phone, MapPin, Download, Instagram, Linkedin } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
      <header className="max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-6 block"
        >
          Trajetória
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="serif text-6xl md:text-8xl font-light leading-tight"
        >
          Antonio Carlos <br /> <span className="italic">Lobo Soares</span>
        </motion.h1>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-5 space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl"
          >
            <img
              src={INITIAL_PROFILE.photoUrl}
              alt="Antonio Carlos Lobo Soares"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <div className="space-y-8 p-8 bg-ink text-paper rounded-2xl">
            <h3 className="text-xs uppercase tracking-widest opacity-50">Contato Direto</h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <Mail size={20} className="text-accent shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">E-mail</p>
                  <a href={`mailto:${INITIAL_PROFILE.email}`} className="text-sm hover:text-accent transition-colors">{INITIAL_PROFILE.email}</a>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <Phone size={20} className="text-accent shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Telefone / WhatsApp</p>
                  <a href="https://wa.me/5591993432027" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors">{INITIAL_PROFILE.phone}</a>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <MapPin size={20} className="text-accent shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Localização</p>
                  <p className="text-sm">{INITIAL_PROFILE.address}</p>
                </div>
              </li>
            </ul>
            <button className="w-full flex items-center justify-center space-x-3 border border-paper/20 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-paper hover:text-ink transition-all">
              <Download size={16} />
              <span>Baixar Currículo Lattes</span>
            </button>

            <div className="pt-8 border-t border-paper/10 flex justify-center space-x-8">
              <a href="https://www.instagram.com/aclobosoares/" target="_blank" rel="noopener noreferrer" className="text-paper/60 hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/antonio-carlos-lobo-soares-02851048/" target="_blank" rel="noopener noreferrer" className="text-paper/60 hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-12">
          <div className="prose prose-lg prose-stone max-w-none">
            <div className="serif text-2xl leading-relaxed text-ink/80 italic mb-12 border-l-4 border-accent pl-8">
              "Minha jornada é um diálogo constante entre a rigidez da arquitetura e a fluidez da arte abstrata."
            </div>
            <div className="markdown-body text-ink/70 leading-relaxed space-y-6 text-lg">
              <ReactMarkdown>{INITIAL_PROFILE.bio}</ReactMarkdown>
            </div>
          </div>

          <div className="space-y-12 pt-12 border-t border-ink/10">
            <h3 className="serif text-4xl font-light">Experiência Destacada</h3>
            <div className="space-y-8">
              {[
                { period: '1982 - 2023', title: 'Museu Paraense Emílio Goeldi', role: 'Diretor / Coordenador / Pesquisador' },
                { period: '2003 - 2005', title: 'Programa Monumenta', role: 'Coordenador da Unidade Executora' },
                { period: '1993 - 1995', title: 'Museu do Estado do Pará', role: 'Diretor' },
                { period: '1980 - 1982', title: 'Secretaria de Cultura do Pará', role: 'Técnico em Restauração' }
              ].map((exp, i) => (
                <div key={i} className="flex gap-8 items-start group">
                  <span className="text-[10px] uppercase tracking-widest text-accent font-semibold pt-1">{exp.period}</span>
                  <div>
                    <h4 className="serif text-2xl font-light group-hover:text-accent transition-colors">{exp.title}</h4>
                    <p className="text-sm text-ink/40 uppercase tracking-widest mt-1">{exp.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12 pt-12 border-t border-ink/10">
            <h3 className="serif text-4xl font-light">Formação Acadêmica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-2">Doutorado</p>
                <h4 className="serif text-xl font-light">Arquitetura</h4>
                <p className="text-sm text-ink/60">Universidade de Lisboa, Portugal</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-2">Mestrado</p>
                <h4 className="serif text-xl font-light">Desenvolvimento e Meio Ambiente Urbano</h4>
                <p className="text-sm text-ink/60">Universidade da Amazônia</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-2">Graduação</p>
                <h4 className="serif text-xl font-light">Arquitetura</h4>
                <p className="text-sm text-ink/60">Universidade Federal do Pará</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, query, where, limit, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Work } from '../types';
import WorkCard from '../components/WorkCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const [featuredWorks, setFeaturedWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(
          collection(db, 'works'),
          where('isActive', '==', true),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const snapshot = await getDocs(q);
        const works = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Work));
        setFeaturedWorks(works);
      } catch (error) {
        console.error("Error fetching featured works:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/art-abstract/1920/1080?blur=2"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-6 block"
          >
            Arquiteto PhD • Museólogo • Artista Plástico
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="serif text-6xl md:text-8xl font-light leading-tight mb-8"
          >
            A Arte da <br /> <span className="italic">Preservação</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-ink/60 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Explorando a interseção entre arquitetura, ciência e expressão artística através de quatro décadas de dedicação ao patrimônio cultural.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center space-x-4 bg-ink text-paper px-10 py-5 rounded-full text-xs uppercase tracking-widest hover:bg-accent transition-colors group"
            >
              <span>Explorar Portfólio</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Vertical Text Accent */}
        <div className="hidden lg:block absolute left-12 bottom-24 vertical-text text-[10px] uppercase tracking-[0.5em] opacity-30">
          Belém • Manaus • Lisboa • Paris
        </div>
      </section>

      {/* Featured Works */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="serif text-5xl font-light mb-6">Obras em Destaque</h2>
            <p className="text-ink/60 leading-relaxed">
              Uma seleção de trabalhos recentes que capturam a essência do abstracionismo e a precisão técnica desenvolvida ao longo da carreira.
            </p>
          </div>
          <Link to="/portfolio" className="text-xs uppercase tracking-widest border-b border-ink/20 pb-2 hover:border-accent transition-colors">
            Ver todas as obras
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[3/4] bg-ink/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredWorks.length > 0 ? (
              featuredWorks.map(work => (
                <WorkCard key={work.id} work={work} />
              ))
            ) : (
              <div className="col-span-3 text-center py-20 border border-dashed border-ink/20 text-ink/40 italic">
                Nenhuma obra cadastrada ainda.
              </div>
            )}
          </div>
        )}
      </section>

      {/* Trajectory Teaser */}
      <section className="bg-ink text-paper py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src="https://picsum.photos/seed/antonio-profile/800/1000"
                alt="Antonio Carlos Lobo Soares"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Biografia</span>
            <h2 className="serif text-5xl font-light">Uma Vida Dedicada à <span className="italic">Cultura</span></h2>
            <p className="text-paper/60 leading-relaxed text-lg">
              Com mais de 40 anos de atuação no Museu Paraense Emílio Goeldi e projetos internacionais de restauração, Antonio Carlos Lobo Soares combina rigor acadêmico com sensibilidade artística.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-paper/10">
              <div>
                <div className="text-3xl serif mb-2">40+</div>
                <div className="text-[10px] uppercase tracking-widest opacity-50">Anos de Experiência</div>
              </div>
              <div>
                <div className="text-3xl serif mb-2">35+</div>
                <div className="text-[10px] uppercase tracking-widest opacity-50">Exposições Coletivas</div>
              </div>
            </div>
            <Link
              to="/about"
              className="inline-block border border-paper/30 px-8 py-4 text-xs uppercase tracking-widest hover:bg-paper hover:text-ink transition-all"
            >
              Conhecer Trajetória
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

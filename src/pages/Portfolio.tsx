import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Work } from '../types';
import { CATEGORIES } from '../constants';
import WorkCard from '../components/WorkCard';
import { Search, Filter, X } from 'lucide-react';

const Portfolio = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [filteredWorks, setFilteredWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'works'),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const worksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Work));
      setWorks(worksData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    let result = works;
    if (activeCategory !== 'all') {
      result = result.filter(work => work.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(work => 
        work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredWorks(result);
  }, [works, activeCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <header className="mb-20 space-y-8">
        <h1 className="serif text-6xl font-light">Portfólio</h1>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t border-ink/10">
          {/* Categories */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveCategory('all')}
              className={`text-[10px] uppercase tracking-widest px-6 py-2 rounded-full border transition-all ${
                activeCategory === 'all' ? 'bg-ink text-paper border-ink' : 'border-ink/20 hover:border-ink'
              }`}
            >
              Todos
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`text-[10px] uppercase tracking-widest px-6 py-2 rounded-full border transition-all ${
                  activeCategory === cat.name ? 'bg-ink text-paper border-ink' : 'border-ink/20 hover:border-ink'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-xs w-full">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" />
            <input
              type="text"
              placeholder="Buscar obra..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-ink/5 border-none rounded-full pl-12 pr-6 py-3 text-xs focus:ring-1 focus:ring-accent transition-all"
            />
          </div>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="aspect-[3/4] bg-ink/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map(work => (
              <WorkCard key={work.id} work={work} onClick={() => setSelectedWork(work)} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {filteredWorks.length === 0 && !loading && (
        <div className="text-center py-40 border border-dashed border-ink/10 rounded-2xl">
          <p className="text-ink/40 italic">Nenhuma obra encontrada para os filtros selecionados.</p>
        </div>
      )}

      {/* Modal Detalhes */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-ink/90 backdrop-blur-sm"
            onClick={() => setSelectedWork(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-paper max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-2xl flex flex-col md:flex-row"
              onClick={e => e.stopPropagation()}
            >
              <div className="md:w-1/2 bg-ink/5 flex items-center justify-center p-8">
                {selectedWork.mediaType === 'image' ? (
                  <img
                    src={selectedWork.mediaUrl}
                    alt={selectedWork.title}
                    className="max-w-full max-h-[70vh] object-contain shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="text-ink/40 italic">Visualização de mídia em breve.</div>
                )}
              </div>
              <div className="md:w-1/2 p-12 flex flex-col">
                <button
                  onClick={() => setSelectedWork(null)}
                  className="self-end text-ink/40 hover:text-ink transition-colors mb-8"
                >
                  <X size={24} />
                </button>
                <div className="flex-grow space-y-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-2 block">
                      {selectedWork.category}
                    </span>
                    <h2 className="serif text-4xl font-light">{selectedWork.title}</h2>
                  </div>
                  <p className="text-ink/60 leading-relaxed whitespace-pre-wrap">
                    {selectedWork.description || "Sem descrição disponível."}
                  </p>
                  {selectedWork.price && (
                    <div className="pt-8 border-t border-ink/10">
                      <p className="text-xs uppercase tracking-widest text-ink/40 mb-2">Valor</p>
                      <p className="text-2xl font-medium text-accent">
                        R$ {selectedWork.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}
                </div>
                {selectedWork.externalLink && (
                  <a
                    href={selectedWork.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-12 bg-ink text-paper text-center py-4 rounded-full text-xs uppercase tracking-widest hover:bg-accent transition-colors"
                  >
                    Adquirir Obra
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;

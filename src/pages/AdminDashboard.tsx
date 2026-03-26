import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc, OperationType, handleFirestoreError } from '../firebase';
import { db } from '../firebase';
import { Work } from '../types';
import { Plus, Edit2, Trash2, Eye, EyeOff, LayoutGrid, List as ListIcon, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import WorkForm from '../components/WorkForm';

const AdminDashboard = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  useEffect(() => {
    const q = query(collection(db, 'works'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const worksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Work));
      setWorks(worksData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'works');
    });
    return unsubscribe;
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta obra permanentemente?')) {
      try {
        await deleteDoc(doc(db, 'works', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, 'works');
      }
    }
  };

  const toggleStatus = async (work: Work) => {
    try {
      await updateDoc(doc(db, 'works', work.id), { isActive: !work.isActive });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'works');
    }
  };

  const filteredWorks = works.filter(work => 
    work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    work.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="serif text-5xl font-light mb-4">Gestão de Conteúdo</h1>
          <p className="text-ink/40 text-sm uppercase tracking-widest">Gerencie suas obras, projetos e mídias.</p>
        </div>
        <button
          onClick={() => {
            setEditingWork(null);
            setIsFormOpen(true);
          }}
          className="bg-ink text-paper px-8 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-accent transition-all flex items-center space-x-3"
        >
          <Plus size={18} />
          <span>Adicionar Obra</span>
        </button>
      </header>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 p-6 bg-white rounded-2xl shadow-sm border border-ink/5">
        <div className="relative flex-grow max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" />
          <input
            type="text"
            placeholder="Buscar por título ou categoria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-ink/5 border-none rounded-full pl-12 pr-6 py-3 text-xs focus:ring-1 focus:ring-accent transition-all"
          />
        </div>
        <div className="flex items-center space-x-2 bg-ink/5 p-1 rounded-full">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-ink' : 'text-ink/40'}`}
          >
            <ListIcon size={18} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-ink' : 'text-ink/40'}`}
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-20 bg-ink/5 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          {viewMode === 'list' ? (
            <div className="bg-white rounded-3xl shadow-sm border border-ink/5 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-ink/5 text-[10px] uppercase tracking-widest text-ink/40">
                  <tr>
                    <th className="px-8 py-6 font-semibold">Obra</th>
                    <th className="px-8 py-6 font-semibold">Categoria</th>
                    <th className="px-8 py-6 font-semibold">Status</th>
                    <th className="px-8 py-6 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {filteredWorks.map(work => (
                    <tr key={work.id} className="hover:bg-ink/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-lg bg-ink/5 overflow-hidden shrink-0">
                            {work.mediaType === 'image' && (
                              <img src={work.mediaUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            )}
                          </div>
                          <span className="serif text-lg font-light">{work.title}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-[10px] uppercase tracking-widest text-ink/40">{work.category}</span>
                      </td>
                      <td className="px-8 py-6">
                        <button
                          onClick={() => toggleStatus(work)}
                          className={`flex items-center space-x-2 text-[10px] uppercase tracking-widest font-semibold ${
                            work.isActive ? 'text-green-600' : 'text-red-400'
                          }`}
                        >
                          {work.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                          <span>{work.isActive ? 'Ativa' : 'Inativa'}</span>
                        </button>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-4">
                          <button
                            onClick={() => {
                              setEditingWork(work);
                              setIsFormOpen(true);
                            }}
                            className="p-2 text-ink/40 hover:text-accent transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(work.id)}
                            className="p-2 text-ink/40 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredWorks.map(work => (
                <div key={work.id} className="bg-white rounded-3xl shadow-sm border border-ink/5 overflow-hidden group">
                  <div className="aspect-[3/4] relative overflow-hidden bg-ink/5">
                    {work.mediaType === 'image' && (
                      <img src={work.mediaUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    )}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                       <button
                        onClick={() => toggleStatus(work)}
                        className={`p-2 rounded-full shadow-lg transition-all ${
                          work.isActive ? 'bg-green-600 text-white' : 'bg-red-400 text-white'
                        }`}
                      >
                        {work.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="serif text-xl font-light truncate">{work.title}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-ink/40">{work.category}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-ink/5">
                      <button
                        onClick={() => {
                          setEditingWork(work);
                          setIsFormOpen(true);
                        }}
                        className="text-[10px] uppercase tracking-widest font-semibold text-ink/40 hover:text-accent transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(work.id)}
                        className="text-[10px] uppercase tracking-widest font-semibold text-ink/40 hover:text-red-500 transition-colors"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {isFormOpen && (
          <WorkForm
            work={editingWork}
            onClose={() => setIsFormOpen(false)}
            onSuccess={() => {
              setIsFormOpen(false);
              setEditingWork(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;

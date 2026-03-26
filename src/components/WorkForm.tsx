import React, { useState, useEffect } from 'react';
import { Work } from '../types';
import { CATEGORIES } from '../constants';
import { X, Save, Upload, Trash2, Check, AlertCircle } from 'lucide-react';
import { db, collection, addDoc, updateDoc, doc, OperationType, handleFirestoreError } from '../firebase';

interface WorkFormProps {
  work?: Work | null;
  onClose: () => void;
  onSuccess: () => void;
}

const WorkForm: React.FC<WorkFormProps> = ({ work, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<Partial<Work>>(
    work || {
      title: '',
      description: '',
      mediaType: 'image',
      mediaUrl: '',
      category: CATEGORIES[0].name,
      isActive: true,
      price: undefined,
      externalLink: '',
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const dataToSave = {
        ...formData,
        createdAt: work ? work.createdAt : new Date().toISOString(),
      };

      if (work) {
        await updateDoc(doc(db, 'works', work.id), dataToSave);
      } else {
        await addDoc(collection(db, 'works'), dataToSave);
      }
      onSuccess();
    } catch (err) {
      handleFirestoreError(err, work ? OperationType.UPDATE : OperationType.CREATE, 'works');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-ink/90 backdrop-blur-sm">
      <div className="bg-paper max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-12 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 text-ink/40 hover:text-ink transition-colors">
          <X size={24} />
        </button>

        <h2 className="serif text-4xl font-light mb-12">{work ? 'Editar Obra' : 'Nova Obra'}</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-ink/40 font-semibold">Título</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-ink/5 border-none rounded-xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent transition-all"
              placeholder="Título da obra ou projeto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-ink/40 font-semibold">Categoria</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-ink/5 border-none rounded-xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent transition-all appearance-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-ink/40 font-semibold">Tipo de Mídia</label>
              <select
                value={formData.mediaType}
                onChange={e => setFormData({ ...formData, mediaType: e.target.value as any })}
                className="w-full bg-ink/5 border-none rounded-xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent transition-all appearance-none"
              >
                <option value="image">Imagem</option>
                <option value="video">Vídeo</option>
                <option value="audio">Áudio</option>
                <option value="text">Texto/Documento</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-ink/40 font-semibold">URL da Mídia</label>
            <input
              required
              type="url"
              value={formData.mediaUrl}
              onChange={e => setFormData({ ...formData, mediaUrl: e.target.value })}
              className="w-full bg-ink/5 border-none rounded-xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent transition-all"
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-ink/40 font-semibold">Descrição</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-ink/5 border-none rounded-xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent transition-all resize-none"
              placeholder="Conte a história desta obra..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-ink/40 font-semibold">Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price || ''}
                onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) || undefined })}
                className="w-full bg-ink/5 border-none rounded-xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent transition-all"
                placeholder="0,00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-ink/40 font-semibold">Link E-commerce</label>
              <input
                type="url"
                value={formData.externalLink}
                onChange={e => setFormData({ ...formData, externalLink: e.target.value })}
                className="w-full bg-ink/5 border-none rounded-xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent transition-all"
                placeholder="Link para venda externa"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-5 h-5 rounded border-ink/20 text-accent focus:ring-accent"
            />
            <label htmlFor="isActive" className="text-sm text-ink/60">Obra ativa e visível no portfólio</label>
          </div>

          <div className="pt-8 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-grow bg-ink text-paper py-4 rounded-full text-xs uppercase tracking-widest hover:bg-accent transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={18} />
                  <span>Salvar Obra</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-10 border border-ink/20 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-ink hover:text-paper transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkForm;

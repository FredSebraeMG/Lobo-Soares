import React from 'react';
import { motion } from 'motion/react';
import { Work } from '../types';
import { ExternalLink, Play, FileText, Music } from 'lucide-react';

interface WorkCardProps {
  work: Work;
  onClick?: () => void;
}

const WorkCard: React.FC<WorkCardProps> = ({ work, onClick }) => {
  const renderMediaPreview = () => {
    switch (work.mediaType) {
      case 'image':
        return (
          <img
            src={work.mediaUrl}
            alt={work.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        );
      case 'video':
        return (
          <div className="w-full h-full bg-ink/5 flex items-center justify-center">
            <Play size={48} className="text-ink/20" />
          </div>
        );
      case 'audio':
        return (
          <div className="w-full h-full bg-ink/5 flex items-center justify-center">
            <Music size={48} className="text-ink/20" />
          </div>
        );
      case 'text':
        return (
          <div className="w-full h-full bg-ink/5 flex items-center justify-center">
            <FileText size={48} className="text-ink/20" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-ink/5 mb-4">
        {renderMediaPreview()}
        <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-paper text-xs uppercase tracking-widest border border-paper/30 px-4 py-2">Ver Obra</span>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="serif text-xl font-light">{work.title}</h3>
        <p className="text-[10px] uppercase tracking-widest text-ink/40">{work.category}</p>
        {work.price && (
          <p className="text-sm font-medium text-accent mt-2">
            R$ {work.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default WorkCard;

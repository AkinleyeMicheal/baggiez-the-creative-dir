// ─────────────────────────────────────────────────────────────
// WorkModal — displays project grid and project detail views.
// Single Responsibility: work modal only.
// Interface Segregation: receives only what it needs.
// ─────────────────────────────────────────────────────────────

import { Play, ArrowLeft, ArrowRight, XCircle } from 'lucide-react';
import type { Project, ModalView } from '../../types';
import { VideoPlayer } from './VideoPlayer';

interface WorkModalProps {
  open: boolean;
  view: ModalView;
  projects: Project[];
  currentIndex: number;
  onClose: () => void;
  onSetView: (view: ModalView) => void;
  onOpenDetail: (index: number) => void;
  onNavigate: (direction: number) => void;
}

export function WorkModal({
  open, view, projects, currentIndex,
  onClose, onSetView, onOpenDetail, onNavigate,
}: WorkModalProps) {
  const current = projects[currentIndex];

  return (
    <div
      className={`fixed inset-0 z-100 bg-[#050505]/95 backdrop-blur-xl transition-opacity duration-300 overflow-y-auto ${
        open ? 'opacity-100 block' : 'opacity-0 hidden pointer-events-none'
      }`}
    >
      {/* Modal top bar */}
      <div className="fixed top-0 w-full px-6 py-6 md:px-12 flex justify-between items-center z-50 bg-linear-to-b from-[#050505] to-transparent">
        {view === 'detail' ? (
          <button
            onClick={() => onSetView('grid')}
            className="text-xs uppercase tracking-widest text-zinc-400 hover:text-[#FF4F00] transition-colors duration-300 flex items-center gap-2 focus:outline-none font-raleway"
          >
            <ArrowLeft size={16} /> Back to Gallery
          </button>
        ) : (
          <div className="w-full h-1" />
        )}
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-[#FF4F00] transition-colors duration-300 focus:outline-none flex items-center justify-center p-2 rounded-full bg-zinc-900/50 hover:bg-zinc-800 backdrop-blur-md ml-auto"
          aria-label="Close modal"
        >
          <XCircle size={24} strokeWidth={1.5} />
        </button>
      </div>

      <div className="min-h-screen pt-24 pb-24 px-6 md:px-12 max-w-400 mx-auto flex flex-col">

        {/* Grid view */}
        {view === 'grid' && (
          <div className="w-full">
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-zinc-100 mb-12">All Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj, idx) => (
                <div key={proj.id} className="group cursor-pointer" onClick={() => onOpenDetail(idx)}>
                  <div className="aspect-4/3 rounded-xl overflow-hidden mb-4 bg-zinc-900">
                    <img
                      src={proj.cover} alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                    />
                  </div>
                  <h3 className="text-2xl font-light tracking-tight text-zinc-100 group-hover:text-[#FF4F00] transition-colors duration-300">
                    {proj.title}
                  </h3>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest">{proj.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detail view */}
        {view === 'detail' && current && (
          <div className="w-full flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
              <div>
                <span className="text-xs text-zinc-500 uppercase tracking-widest mb-2 block font-raleway">{current.category}</span>
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-extralight tracking-tighter text-zinc-100">{current.title}</h2>
              </div>
              <div className="text-left md:text-right text-xs uppercase tracking-widest text-zinc-500 flex flex-col gap-1 font-raleway">
                <span>{current.client}</span>
                <span>{current.year}</span>
              </div>
            </div>

            {/* Video or cover image */}
            <div className="w-full aspect-video bg-zinc-900 rounded-xl overflow-hidden relative mb-12 group cursor-pointer">
              {current.videoUrl ? (
                // Inside WorkModal, in the detail view where the video is rendered:
                <VideoPlayer
                    key={projects[currentIndex].id}   // ← forces remount on project change
                    videoUrl={projects[currentIndex].videoUrl}
                    poster={projects[currentIndex].cover}
                    autoPlay={false}                  // ← explicit, never autoplay
                    controls={true}
                    muted={false}                     // ← unmuted since user chose to watch
                    className="w-full h-full object-contain"
                />
              ) : (
                <>
                  <img src={current.cover} alt="Project Cover" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-transparent transition-colors duration-500 pointer-events-none">
                    <div className="w-16 h-16 rounded-full border border-zinc-100/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-[#FF4F00] transition-all duration-500">
                      <Play size={24} className="text-zinc-100 ml-1 group-hover:text-[#FF4F00] transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t font-raleway border-zinc-900 pt-12 mb-16">
              <p className="lg:col-span-8 text-xl md:text-2xl font-light leading-relaxed text-zinc-300 pr-0 lg:pr-12">
                {current.desc}
              </p>
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div>
                  <span className="text-xs text-zinc-600 uppercase tracking-widest block mb-1">Role</span>
                  <span className="text-sm font-light text-zinc-100">{current.role}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-600 uppercase tracking-widest block mb-1">Tools / Medium</span>
                  <span className="text-sm font-light text-zinc-100">{current.tools}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
              {current.gallery.map((img, idx) => (
                <div key={idx} className="aspect-video rounded-lg overflow-hidden bg-zinc-900">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-zinc-900 pt-8 mt-auto font-raleway">
              <button
                onClick={() => onNavigate(-1)}
                className="text-sm tracking-tight text-zinc-400 hover:text-[#FF4F00] transition-colors duration-300 flex items-center gap-2 focus:outline-none group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Previous
              </button>
              <button
                onClick={() => onNavigate(1)}
                className="text-sm tracking-tight text-zinc-400 hover:text-[#FF4F00] transition-colors duration-300 flex items-center gap-2 focus:outline-none group"
              >
                Next <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
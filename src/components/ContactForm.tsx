// ─────────────────────────────────────────────────────────────
// ContactForm — booking / inquiry form.
// Single Responsibility: form UI + submission only.
// Dependency Inversion: submission logic lives in useContactForm.
// ─────────────────────────────────────────────────────────────

import { ChevronDown, Send, ArrowUpRight } from 'lucide-react';
import { useContactForm } from '../../hooks';

export function ContactForm() {
  const { status, formData, submit, update } = useContactForm();

  return (
    <div className="lg:col-span-10 flex flex-col md:flex-row gap-16 font-raleway">

      {/* Contact details */}
      <div className="w-full md:w-1/3 flex flex-col">
        {[
          {
            label: 'Location',
            content: (
              <div className="text-sm text-zinc-400 text-right">
                <p>Available Worldwide</p>
                <p>London — Lagos</p>
              </div>
            ),
          },
          {
            label: 'Email',
            content: (
              <a href="mailto:director@baggiez.com" className="text-sm text-zinc-400 hover:text-[#FF4F00] transition-colorstext-right flex items-center gap-2">
                director@baggiez.com <ArrowUpRight size={14} />
              </a>
            ),
          },
          {
            label: 'Representation',
            content: (
              <div className="text-sm text-zinc-400 text-right flex flex-col">
                <span>WME Agency</span>
                <span className="text-xs text-zinc-600 mt-1">Commercial / Music</span>
              </div>
            ),
          },
          {
            label: 'Instagram',
            content: (
              <a href="#" className="text-sm text-zinc-400 hover:text-[#FF4F00] transition-colors text-right flex items-center gap-2">
                @baggiez.dir <ArrowUpRight size={14} />
              </a>
            ),
          },
        ].map(({ label, content }, i, arr) => (
          <div key={label} className={`py-6 border-t ${i === arr.length - 1 ? 'border-b' : ''} border-zinc-900 flex justify-between items-center`}>
            <h3 className="text-sm tracking-tight text-zinc-100">{label}</h3>
            {content}
          </div>
        ))}
      </div>

      {/* Form */}
      <form className="w-full md:w-2/3 flex flex-col gap-6" onSubmit={submit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text" placeholder="Name / Company" required
            value={formData.name}
            onChange={e => update('name', e.target.value)}
            className="w-full bg-transparent border-b border-zinc-800 py-4 text-zinc-100 focus:border-[#FF4F00] focus:outline-none transition-colors duration-300 rounded-none placeholder-zinc-600 text-sm"
          />
          <input
            type="email" placeholder="Email Address" required
            value={formData.email}
            onChange={e => update('email', e.target.value)}
            className="w-full bg-transparent border-b border-zinc-800 py-4 text-zinc-100 focus:border-[#FF4F00] focus:outline-none transition-colors duration-300 rounded-none placeholder-zinc-600 text-sm"
          />
        </div>

        <div className="relative">
          <select
            value={formData.type} required
            onChange={e => update('type', e.target.value)}
            className="w-full appearance-none bg-transparent border-b border-zinc-800 py-4 text-zinc-100 focus:border-[#FF4F00] focus:outline-none transition-colors duration-300 rounded-none text-sm cursor-pointer"
          >
            <option value="" disabled className="bg-zinc-950 text-zinc-500">Project Type</option>
            <option value="music-video"  className="bg-zinc-950">Music Video</option>
            <option value="commercial"   className="bg-zinc-950">Commercial / Brand</option>
            <option value="short-film"   className="bg-zinc-950">Short Film</option>
            <option value="other"        className="bg-zinc-950">Other</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-zinc-500">
            <ChevronDown size={16} />
          </div>
        </div>

        <textarea
          placeholder="Project Details & Timeline" required rows={4}
          value={formData.details}
          onChange={e => update('details', e.target.value)}
          className="w-full bg-transparent border-b border-zinc-800 py-4 text-zinc-100 focus:border-[#FF4F00] focus:outline-none transition-colors duration-300 rounded-none placeholder-zinc-600 text-sm resize-none"
        />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-4 bg-zinc-100/90 text-zinc-950 hover:bg-[#FF4F00] hover:text-white transition-colors duration-300 py-4 px-8 rounded-sm text-sm font-bold w-full sm:w-auto self-start flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending…'
            : status === 'success'  ? 'Sent Successfully'
            : status === 'error'    ? 'Error Sending'
            : 'Send Inquiry'}
          {status === 'idle' && <Send size={16} />}
        </button>
      </form>
    </div>
  );
}
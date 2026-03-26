// ─────────────────────────────────────────────────────────────
// Custom hooks — business logic decoupled from UI
// (Dependency Inversion: components depend on hook abstractions)
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from 'react';
import type { ContactFormData, FormStatus } from '../types';

// ── useDragScroll ─────────────────────────────────────────────
// Attaches mouse-drag-to-scroll behaviour to any scrollable ref.

export function useDragScroll(ref: React.RefObject<HTMLDivElement | null>) {
  const isDown    = useRef(false);
  const startX    = useRef(0);
  const savedLeft = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    isDown.current    = true;
    startX.current    = e.pageX - ref.current.offsetLeft;
    savedLeft.current = ref.current.scrollLeft;
    ref.current.classList.replace('cursor-grab', 'cursor-grabbing');
  }, [ref]);

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    isDown.current = false;
    ref.current.classList.replace('cursor-grabbing', 'cursor-grab');
  }, [ref]);

  const onMouseUp = onMouseLeave;

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDown.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    ref.current.scrollLeft = savedLeft.current - (x - startX.current) * 2;
  }, [ref]);

  return { onMouseDown, onMouseLeave, onMouseUp, onMouseMove };
}

// ── useScrolled ───────────────────────────────────────────────
// Tracks whether the page has scrolled past a given threshold.

export function useScrolled(threshold = 50): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);
  return scrolled;
}

// ── useBodyLock ───────────────────────────────────────────────
// Prevents body scroll when any of the supplied booleans is true.

export function useBodyLock(...locked: boolean[]) {
  useEffect(() => {
    document.body.style.overflow = locked.some(Boolean) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [locked]);  // eslint-disable-line react-hooks/exhaustive-deps
}

// ── useEscapeKey ──────────────────────────────────────────────
// Calls the supplied callback when the Escape key is pressed.

export function useEscapeKey(callback: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') callback(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [callback]);
}

// ── useCarousel ───────────────────────────────────────────────
// Auto-advancing carousel state with manual navigation.

export function useCarousel(length: number, interval = 4000) {
  const [index, setIndex]   = useState(0);
  const timerRef            = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX         = useRef(0);

  const startTimer = useCallback((from: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex(i => (i + 1) % length);
    }, interval);
    setIndex(from);
  }, [length, interval]);

  useEffect(() => {
    startTimer(0);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const goTo = useCallback((idx: number) => {
    startTimer(((idx % length) + length) % length);
  }, [startTimer, length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 48) goTo(index + (dx < 0 ? 1 : -1));
  }, [goTo, index]);

  return { index, goTo, handleTouchStart, handleTouchEnd };
}

// ── useBTSCarousel ────────────────────────────────────────────
// Scroll-snap carousel logic for the BTS section.

export function useBTSCarousel() {
  const ref                       = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  /**
   * Derive the active index by finding which child card's centre
   * is closest to the container's centre. This works at every
   * breakpoint regardless of card width or gap size.
   */
  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const containerCentre = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(el.children).forEach((child, idx) => {
      const card = child as HTMLElement;
      const cardCentre = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(containerCentre - cardCentre);
      if (dist < minDist) { minDist = dist; closest = idx; }
    });
    setActiveDot(closest);
  }, []);

  /**
   * scrollBy: advance by one card-width in either direction,
   * then immediately sync the dot without waiting for onScroll.
   */
  const scrollBy = useCallback((direction: number) => {
    const el = ref.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const containerCentre = el.scrollLeft + el.clientWidth / 2;
    let current = 0;
    let minDist = Infinity;
    cards.forEach((card, idx) => {
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - containerCentre);
      if (dist < minDist) { minDist = dist; current = idx; }
    });
    const next = Math.min(Math.max(current + direction, 0), cards.length - 1);
    scrollTo(next);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * scrollTo: scroll the card at idx into centre view AND
   * immediately update the active dot — no scroll-event lag.
   */
  const scrollTo = useCallback((idx: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2,
      behavior: 'smooth',
    });
    setActiveDot(idx); // ← instant dot sync on click
  }, []);

  return { ref, activeDot, setActiveDot, onScroll, scrollBy, scrollTo };
}

// ── useContactForm ────────────────────────────────────────────
// Manages contact form state and submission logic.

export function useContactForm() {
  const [status, setStatus]     = useState<FormStatus>('idle');
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', type: '', details: '' });

  const reset = useCallback(() => {
    setFormData({ name: '', email: '', type: '', details: '' });
    setTimeout(() => setStatus('idle'), 3000);
  }, []);

  const submit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const endpoint = (import.meta as any).env?.VITE_FORMSPREE_ENDPOINT as string | undefined;

    if (!endpoint) {
      setTimeout(() => { setStatus('success'); reset(); }, 1000);
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) { setStatus('success'); reset(); }
      else        { setStatus('error'); setTimeout(() => setStatus('idle'), 3000); }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }, [formData, reset]);

  const update = useCallback((field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  return { status, formData, submit, update };
}

// ── useTestimonial ────────────────────────────────────────────
// Manages the fading client testimonial switcher.

export function useTestimonial(initial: string) {
  const [activeClient, setActiveClient] = useState(initial);
  const [opacity, setOpacity]           = useState(1);

  const change = useCallback((clientId: string) => {
    setOpacity(0);
    setTimeout(() => { setActiveClient(clientId); setOpacity(1); }, 300);
  }, []);

  return { activeClient, opacity, change };
}

// ── useWorkModal ──────────────────────────────────────────────
// Manages work modal open/close, view mode, and project navigation.

export function useWorkModal(totalProjects: number) {
  const [open, setOpen]           = useState(false);
  const [view, setView]           = useState<'grid' | 'detail'>('detail');
  const [projectIndex, setIndex]  = useState(0);

  const openDetail = useCallback((index: number) => {
    setIndex(index);
    setView('detail');
    setOpen(true);
  }, []);

  const openGrid = useCallback(() => {
    setView('grid');
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const navigate = useCallback((direction: number) => {
    setIndex(i => (i + direction + totalProjects) % totalProjects);
  }, [totalProjects]);

  return { open, view, projectIndex, setView, openDetail, openGrid, close, navigate };
}
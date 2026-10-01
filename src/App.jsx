import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useReveal } from './hooks/useReveal';
import { useScrollProgress } from './hooks/useScrollProgress';

import Loader from './components/Loader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Footer from './components/Footer';

import ApprovedChapter from './components/chapters/ApprovedChapter';
import LocatedChapter from './components/chapters/LocatedChapter';
import AmenitiesChapter from './components/chapters/AmenitiesChapter';
import OwnedChapter from './components/chapters/OwnedChapter';
import FinancedChapter from './components/chapters/FinancedChapter';
import TrustedChapter from './components/chapters/TrustedChapter';
import ContactedChapter from './components/chapters/ContactedChapter';

export default function App() {
  useSmoothScroll();
  useReveal();
  useScrollProgress();

  return (
    <>
      <Loader />
      <div id="scrollBar"><div id="scrollBarFill" /></div>
      <Nav />

      <Hero />
      <ApprovedChapter />
      <LocatedChapter />
      <AmenitiesChapter />
      <OwnedChapter />
      <FinancedChapter />
      <TrustedChapter />
      <ContactedChapter />

      <Footer />

      {/* Fixed WhatsApp (mobile) */}
      <a href="https://wa.me/917416416416" className="lg:hidden fixed bottom-5 right-5 w-14 h-14 bg-green-600 rounded-full shadow-2xl flex items-center justify-center z-40">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-.9-.3-.1-.4-.2-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.6-1.5-.9-2c-.2-.5-.5-.4-.6-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/></svg>
      </a>

      {/* Spec badge */}
      <div className="fixed bottom-5 left-5 z-40 group">
        <div className="backdrop-blur-xl bg-bg/70 border border-gold/30 rounded-full px-4 py-2 text-[10px] tracking-wider uppercase text-cream/70 flex items-center gap-2 cursor-help">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          Concept redesign
        </div>
        <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-bg2 border border-gold/20 rounded-lg text-xs text-cream/70 opacity-0 group-hover:opacity-100 transition pointer-events-none">
          This is a design concept, not an official site. Built as a spec pitch by an independent developer.
        </div>
      </div>
    </>
  );
}

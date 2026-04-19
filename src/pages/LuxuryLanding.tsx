import LuxuryNavbar from '../components/luxury/LuxuryNavbar';
import LuxuryHero from '../components/luxury/LuxuryHero';

export default function LuxuryLanding() {
  return (
    <div className="bg-black min-h-screen selection:bg-white/30 selection:text-white">
      <LuxuryNavbar />
      <LuxuryHero />
      <main className="z-10 relative">
        {/* Sections will go here */}
      </main>
    </div>
  );
}

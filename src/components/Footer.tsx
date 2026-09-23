export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-16 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div>
            <span className="text-xl font-bold tracking-widest text-white uppercase font-display block">
              AURELIS
            </span>
            <p className="mt-2 text-neutral-400 max-w-sm text-xs leading-relaxed">
              Engineering Motion. Designed for Tomorrow. An original automotive design study in
              aerodynamic purity and digital spatial interaction.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <span className="text-white font-medium uppercase tracking-wider block mb-3 text-[11px]">
                Vehicle
              </span>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollTo('#overview')} className="hover:text-white transition-colors cursor-pointer">
                    Aurelis X1
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('#configure')} className="hover:text-white transition-colors cursor-pointer">
                    Studio Configurator
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('#performance')} className="hover:text-white transition-colors cursor-pointer">
                    Dynamic Telemetry
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-white font-medium uppercase tracking-wider block mb-3 text-[11px]">
                Engineering
              </span>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollTo('#design')} className="hover:text-white transition-colors cursor-pointer">
                    Aero Silhouette
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('#technology')} className="hover:text-white transition-colors cursor-pointer">
                    800V Architecture
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('#technology')} className="hover:text-white transition-colors cursor-pointer">
                    Neural Drive
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-white font-medium uppercase tracking-wider block mb-3 text-[11px]">
                Showroom
              </span>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollTo('#gallery')} className="hover:text-white transition-colors cursor-pointer">
                    Visual Archive
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('#configure')} className="hover:text-white transition-colors cursor-pointer">
                    Reserve Allocation
                  </button>
                </li>
                <li>
                  <a
                    href="https://lemon.io"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Lemon.io Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p>© {new Date().getFullYear()} AURELIS MOTORS. All rights reserved. Fictional automotive portfolio demonstration.</p>
          <div className="flex items-center gap-4">
            <span>Concept Vehicle Study</span>
            <span aria-hidden="true">·</span>
            <span>WebGL 3D Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Three.js + React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

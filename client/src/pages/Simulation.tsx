import React, { useEffect } from 'react';
import Graph from '../components/Graph';
import { GraphType } from '../types';

const Simulation: React.FC = () => {
  useEffect(() => {
    document.title = 'Graphlung Virtual Lab - Simulation';
  }, []);

  return (
    <div className="pt-[70px] bg-gray-50">
      <section id="cubic" className="min-h-screen p-4">
        <Graph type={GraphType.CUBIC} />
      </section>

      <section id="sinus" className="min-h-screen p-4">
        <Graph type={GraphType.SINUS} />
      </section>

      <section id="cosinus" className="min-h-screen p-4">
        <Graph type={GraphType.COSINUS} />
      </section>

      <section id="tangen" className="min-h-screen p-4">
        <Graph type={GraphType.TANGEN} />
      </section>
    </div>
  );
};

export default Simulation;
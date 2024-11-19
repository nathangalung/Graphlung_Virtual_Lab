import React, { useEffect, useState } from 'react';
import Graph from '../components/Graph';
import { GraphType } from '../types';

const Simulation: React.FC = () => {
  useEffect(() => {
    document.title = 'Graphlung Virtual Lab - Simulation';
  }, []);

  const [cubicParams, setCubicParams] = useState({ a: 0, b: 0, c: 0, d: 0 });
  const [sinusParams, setSinusParams] = useState({ a: 0, b: 0, c: 0, d: 0 });
  const [cosinusParams, setCosinusParams] = useState({ a: 0, b: 0, c: 0, d: 0 });
  const [tangenParams, setTangenParams] = useState({ a: 0, b: 0, c: 0, d: 0 });

  return (
    <div className="pt-[70px] bg-gray-50">
      <section id="cubic" className="min-h-screen p-4">
        <Graph type={GraphType.CUBIC} initialParameters={cubicParams} />
      </section>

      <section id="sinus" className="min-h-screen p-4">
        <Graph type={GraphType.SINUS} initialParameters={sinusParams} />
      </section>

      <section id="cosinus" className="min-h-screen p-4">
        <Graph type={GraphType.COSINUS} initialParameters={cosinusParams} />
      </section>

      <section id="tangen" className="min-h-screen p-4">
        <Graph type={GraphType.TANGEN} initialParameters={tangenParams} />
      </section>
    </div>
  );
};

export default Simulation;
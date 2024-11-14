import { useEffect, useRef, useState } from 'react';
import { GraphType } from '../types';
import { drawGrid, showCoordinates } from '../utils/Grid';
import { calculateGraph } from '../utils/Calculation';

interface GraphProps {
  type: GraphType;
  readOnly?: boolean;
  initialParameters?: Parameters;
}

interface Parameters {
  a: number;
  b: number;
  c: number;
  d: number;
}

const Graph: React.FC<GraphProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [parameters, setParameters] = useState<Parameters>({ a: 0, b: 0, c: 0, d: 0 });
  const [comparator, setComparator] = useState<string>("=");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawGraph(ctx, canvas.width, canvas.height);
    const cleanup = showCoordinates(canvas, ctx);
    return cleanup;
  }, [parameters, type]);

  const drawGraph = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    drawGrid(ctx, { width, height });

    // Draw graph
    const { a, b, c, d } = parameters;
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;

    for (let x = -10; x <= 10; x += 0.1) {
      const y = calculateGraph(type, x, parameters);
      const canvasX = width / 2 + x * (width / 22);
      const canvasY = height / 2 - y * (height / 22);

      if (x === -10) ctx.moveTo(canvasX, canvasY);
      else ctx.lineTo(canvasX, canvasY);
    }
    ctx.stroke();
  };

  const handleParameterChange = (param: keyof Parameters, value: number) => {
    setParameters(prev => ({ ...prev, [param]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="w-full md:w-2/3">
          <h3 className="text-2xl text-purple-900 mb-4">{type.toUpperCase()} GRAPH</h3>
          <canvas
            ref={canvasRef}
            width={440}
            height={440}
            className="border border-gray-300 rounded"
          />
        </div>
        
        <div className="w-full md:w-1/3 mt-4 md:mt-0">
          {Object.keys(parameters).map((param) => (
            <div key={param} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                {param}: {parameters[param as keyof Parameters]}
              </label>
              <input
                type="range"
                min="-10"
                max="10"
                step="1"
                value={parameters[param as keyof Parameters]}
                onChange={(e) => handleParameterChange(param as keyof Parameters, parseInt(e.target.value))}
                className="w-full mt-1"
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Comparator: {comparator}
            </label>
            <select
              value={comparator}
              onChange={(e) => setComparator(e.target.value)}
              className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm border"
            >
              <option value="=">=</option>
              <option value="<">{'<'}</option>
              <option value=">">{'>'}</option>
            </select>
          </div>

          <p className="mt-4">
            Equation: y {comparator} {parameters.a}x³ + {parameters.b}x² + {parameters.c}x + {parameters.d}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Graph;
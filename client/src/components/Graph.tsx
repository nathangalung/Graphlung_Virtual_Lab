import React, { useEffect, useRef, useState } from 'react';
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

const Graph: React.FC<GraphProps> = ({ type, readOnly = false, initialParameters = { a: 0, b: 0, c: 0, d: 0 } }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [parameters, setParameters] = useState<Parameters>(initialParameters);
  const [comparator, setComparator] = useState<string>("=");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGraph = () => {
      drawGrid(ctx, { width: canvas.width, height: canvas.height });
      drawGraphContent(ctx, canvas.width, canvas.height);
    };

    drawGraph();
    const cleanup = showCoordinates(canvas, ctx, 20, drawGraph);
    return cleanup;
  }, [parameters, type]);

  useEffect(() => {
    setParameters(initialParameters); // Ensure parameters are updated automatically
  }, [initialParameters]);

  const drawGraphContent = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw graph
    const { a, b, c, d } = parameters;
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;

    const range = readOnly ? 7 : 10;
    const scale = readOnly ? 15 : 22; // Adjust scale for read-only mode

    for (let x = -range; x <= range; x += 0.1) {
      const y = calculateGraph(type, x, parameters);
      const canvasX = width / 2 + x * (width / scale);
      const canvasY = height / 2 - y * (height / scale);

      if (x === -range) ctx.moveTo(canvasX, canvasY);
      else ctx.lineTo(canvasX, canvasY);
    }
    ctx.stroke();
  };

  const handleParameterChange = (param: keyof Parameters, value: number) => {
    setParameters(prev => ({ ...prev, [param]: value }));
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-8 mx-auto ${readOnly ? 'max-w-md w-[350px]' : 'max-w-7xl w-[900px]'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className={`w-full ${readOnly ? 'md:w-full' : 'md:w-2/3'}`}>
          <h3 className="text-2xl text-purple-900 mb-4">{readOnly ? 'GRAPH' : `${type.toUpperCase()} GRAPH`}</h3>
          <canvas
            ref={canvasRef}
            width={readOnly ? 300 : 440}
            height={readOnly ? 300 : 440}
            className="border border-gray-300 rounded"
          />
        </div>
        
        {!readOnly && ( // Show sliders and comparator only if not read-only
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

            <div className="mb-1">
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
        )}
      </div>
    </div>
  );
};

export default Graph;
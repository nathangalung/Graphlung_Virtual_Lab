export interface GridProps {
  width: number;
  height: number;
  unitSize?: number;
}

export const drawGrid = (ctx: CanvasRenderingContext2D, { width, height, unitSize = 20 }: GridProps) => {
  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw grid lines
  ctx.beginPath();
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 1;

  // Vertical lines
  for (let x = 0; x <= width; x += unitSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }

  // Horizontal lines
  for (let y = 0; y <= height; y += unitSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();

  // Draw axes
  ctx.beginPath();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;

  // X-axis
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);

  // Y-axis
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, height);
  ctx.stroke();

  // Draw labels
  ctx.font = '12px Arial';
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';

  // X-axis labels
  for (let x = -10; x <= 10; x++) {
    const xPos = centerX + x * unitSize;
    ctx.fillText(x.toString(), xPos, centerY + 15);
  }

  // Y-axis labels
  ctx.textAlign = 'right';
  for (let y = -10; y <= 10; y++) {
    const yPos = centerY - y * unitSize;
    ctx.fillText(y.toString(), centerX - 5, yPos + 5);
  }
};

export const showCoordinates = (
  canvas: HTMLCanvasElement, 
  ctx: CanvasRenderingContext2D,
  unitSize = 20
) => {
  const rect = canvas.getBoundingClientRect();
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const handleMouseMove = (event: MouseEvent) => {
    const x = ((event.clientX - rect.left) - centerX) / unitSize;
    const y = -((event.clientY - rect.top) - centerY) / unitSize;
    
    if (x < -10 || x > 10 || y < -10 || y > 10) return;

    // Clear previous coordinates
    ctx.clearRect(centerX + 100, 10, 90, 30);
    
    // Show coordinates
    ctx.font = '12px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(`(${x.toFixed(1)}, ${y.toFixed(1)})`, centerX + 110, 30);
  };

  canvas.addEventListener('mousemove', handleMouseMove);
  return () => canvas.removeEventListener('mousemove', handleMouseMove);
};
// Math utilities
export const MyMath = {
  random: (min: number, max: number) => Math.random() * (max - min) + min,
  randomChoice: <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)],
  clamp: (value: number, min: number, max: number) => Math.min(Math.max(value, min), max),
  pointDist: (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  },
  pointAngle: (x1: number, y1: number, x2: number, y2: number) => {
    return Math.atan2(y2 - y1, x2 - x1);
  }
};

// Stage class for canvas management
export class Stage {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  dpr: number;

  constructor(canvas: HTMLCanvasElement) {
    if (!canvas) {
      throw new Error('Canvas element is required');
    }
    
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get 2d context');
    }
    this.ctx = ctx;
    
    this.dpr = window.devicePixelRatio || 1;
    this.width = 0;
    this.height = 0;
    
    this.resize(canvas.offsetWidth || window.innerWidth, canvas.offsetHeight || window.innerHeight);
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.width = width * this.dpr;
    this.canvas.height = height * this.dpr;
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);
  }
}

// Fireworks core logic - based on original code
import { MyMath } from './utils';

export const GRAVITY = 0.9;
export const PI_2 = Math.PI * 2;
export const PI_HALF = Math.PI * 0.5;

export const COLOR = {
  Red: '#ff0043',
  Green: '#14fc56',
  Blue: '#1e7fff',
  Purple: '#e60aff',
  Gold: '#ffbf36',
  White: '#ffffff'
};

const COLOR_NAMES = Object.keys(COLOR);
export const COLOR_CODES = COLOR_NAMES.map(colorName => COLOR[colorName as keyof typeof COLOR]);

export interface Star {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  color: string;
  speedX: number;
  speedY: number;
  life: number;
  fullLife: number;
  visible: boolean;
  heavy?: boolean;
  sparkFreq?: number;
  sparkSpeed?: number;
  sparkLife?: number;
  sparkColor?: string;
  sparkTimer?: number;
  secondColor?: string;
  transitionTime?: number;
  colorChanged?: boolean;
  strobe?: boolean;
  strobeFreq?: number;
  onDeath?: (star: Star) => void;
  updateFrame?: number;
  spinAngle?: number;
  spinRadius?: number;
  spinSpeed?: number;
  sparkLifeVariation?: number;
}

export interface Spark {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  color: string;
  speedX: number;
  speedY: number;
  life: number;
}

export class FireworksEngine {
  stars: Star[] = [];
  sparks: Spark[] = [];
  currentFrame = 0;
  quality = 3; // High quality for more particles

  // Create burst helper - exactly like original
  createBurst(count: number, particleFactory: (angle: number, speedMult: number) => void, startAngle: number = 0, arcLength: number = PI_2) {
    const R = 0.5 * Math.sqrt(count / Math.PI);
    const C = 2 * R * Math.PI;
    const C_HALF = C / 2;

    for (let i = 0; i <= C_HALF; i++) {
      const ringAngle = i / C_HALF * PI_HALF;
      const ringSize = Math.cos(ringAngle);
      const partsPerFullRing = C * ringSize;
      const partsPerArc = partsPerFullRing * (arcLength / PI_2);
      
      const angleInc = PI_2 / partsPerFullRing;
      const angleOffset = Math.random() * angleInc + startAngle;
      const maxRandomAngleOffset = angleInc * 0.33;
      
      for (let j = 0; j < partsPerArc; j++) {
        const randomAngleOffset = Math.random() * maxRandomAngleOffset;
        let angle = angleInc * j + angleOffset + randomAngleOffset;
        particleFactory(angle, ringSize);
      }
    }
  }

  // Crysanthemum shell - most common type
  createCrysanthemumShell(x: number, y: number, size: number = 3) {
    const glitter = Math.random() < 0.25;
    const singleColor = Math.random() < 0.72;
    const color = singleColor 
      ? COLOR_CODES[Math.floor(Math.random() * COLOR_CODES.length)]
      : [COLOR_CODES[Math.floor(Math.random() * COLOR_CODES.length)], COLOR_CODES[Math.floor(Math.random() * COLOR_CODES.length)]];
    
    const pistil = singleColor && Math.random() < 0.42;
    const pistilColor = pistil ? (color === COLOR.White || color === COLOR.Gold 
      ? COLOR_CODES[Math.floor(Math.random() * COLOR_CODES.length)]
      : Math.random() < 0.5 ? COLOR.White : COLOR.Gold) : null;
    
    const streamers = !pistil && color !== COLOR.White && Math.random() < 0.42;
    
    let starDensity = glitter ? 1.1 : 1.25;
    if (this.quality === 1) starDensity *= 0.8;
    if (this.quality === 3) starDensity = 1.2;

    const spreadSize = 300 + size * 100;
    const starLife = 900 + size * 200;
    const scaledSize = spreadSize / 54;
    const starCount = Math.max(6, scaledSize * scaledSize * starDensity);

    const speed = spreadSize / 96;
    const standardInitialSpeed = spreadSize / 1800;

    // Spark properties
    let sparkFreq = 0;
    let sparkSpeed = 0;
    let sparkLife = 0;
    let sparkLifeVariation = 0.25;
    const glitterColor = Math.random() < 0.5 ? COLOR.Gold : COLOR.White;

    if (glitter) {
      sparkFreq = 400 / this.quality;
      sparkSpeed = 0.3;
      sparkLife = 300;
      sparkLifeVariation = 2;
    }

    const starFactory = (angle: number, speedMult: number) => {
      const starColor = Array.isArray(color) 
        ? (Math.random() < 0.5 ? color[0] : color[1])
        : color;
      
      const star: Star = {
        x,
        y,
        prevX: x,
        prevY: y,
        color: starColor,
        speedX: Math.sin(angle) * speed * speedMult,
        speedY: Math.cos(angle) * speed * speedMult - standardInitialSpeed,
        life: starLife + Math.random() * starLife * 0.125,
        fullLife: starLife,
        visible: true,
        updateFrame: -1,
        spinAngle: Math.random() * PI_2,
        spinSpeed: 0.8,
        spinRadius: 0
      };

      if (glitter) {
        star.sparkFreq = sparkFreq;
        star.sparkSpeed = sparkSpeed;
        star.sparkLife = sparkLife;
        star.sparkLifeVariation = sparkLifeVariation;
        star.sparkColor = glitterColor;
        star.sparkTimer = Math.random() * star.sparkFreq;
      }

      this.stars.push(star);
    };

    this.createBurst(starCount, starFactory);

    // Add pistil
    if (pistil && pistilColor) {
      const innerSpreadSize = spreadSize * 0.5;
      const innerStarLife = starLife * 0.6;
      const innerScaledSize = innerSpreadSize / 54;
      const innerStarCount = Math.max(6, innerScaledSize * innerScaledSize * 1.4);
      const innerSpeed = innerSpreadSize / 96;

      const pistilFactory = (angle: number, speedMult: number) => {
        const star: Star = {
          x,
          y,
          prevX: x,
          prevY: y,
          color: pistilColor,
          speedX: Math.sin(angle) * innerSpeed * speedMult,
          speedY: Math.cos(angle) * innerSpeed * speedMult - standardInitialSpeed,
          life: innerStarLife + Math.random() * innerStarLife * 0.125,
          fullLife: innerStarLife,
          visible: true,
          updateFrame: -1,
          sparkFreq: 400 / this.quality,
          sparkSpeed: 0.3,
          sparkLife: 300,
          sparkLifeVariation: 2,
          sparkColor: pistilColor === COLOR.Gold ? COLOR.Gold : COLOR.White,
          sparkTimer: Math.random() * (400 / this.quality),
          spinAngle: Math.random() * PI_2,
          spinSpeed: 0.8,
          spinRadius: 0
        };
        this.stars.push(star);
      };

      this.createBurst(innerStarCount, pistilFactory);
    }

    // Add streamers
    if (streamers) {
      const streamerSpreadSize = spreadSize * 0.9;
      const streamerStarLife = starLife * 0.8;
      const streamerStarCount = Math.floor(Math.max(6, spreadSize / 45));
      const streamerSpeed = streamerSpreadSize / 96;

      const streamerFactory = (angle: number, speedMult: number) => {
        const star: Star = {
          x,
          y,
          prevX: x,
          prevY: y,
          color: COLOR.White,
          speedX: Math.sin(angle) * streamerSpeed * speedMult,
          speedY: Math.cos(angle) * streamerSpeed * speedMult - standardInitialSpeed,
          life: streamerStarLife + Math.random() * streamerStarLife * 0.125,
          fullLife: streamerStarLife,
          visible: true,
          updateFrame: -1,
          sparkFreq: 32 / this.quality,
          sparkSpeed: 1.05,
          sparkLife: 620,
          sparkLifeVariation: 2,
          sparkColor: COLOR.White,
          sparkTimer: Math.random() * (32 / this.quality),
          spinAngle: Math.random() * PI_2,
          spinSpeed: 0.8,
          spinRadius: 0
        };
        this.stars.push(star);
      };

      this.createBurst(streamerStarCount, streamerFactory);
    }
  }

  launchShell(x: number, y: number, burstY: number, size: number = 3) {
    const launchDistance = y - burstY;
    const launchVelocity = Math.pow(launchDistance * 0.04, 0.64);
    
    // Create comet
    const comet: Star = {
      x,
      y,
      prevX: x,
      prevY: y,
      color: COLOR.White,
      speedX: 0,
      speedY: -launchVelocity,
      life: launchVelocity * 400,
      fullLife: launchVelocity * 400,
      visible: true,
      heavy: true,
      sparkFreq: 32 / this.quality,
      sparkSpeed: 0.5,
      sparkLife: 320,
      sparkLifeVariation: 3,
      sparkColor: COLOR.White,
      sparkTimer: 0,
      spinRadius: MyMath.random(0.32, 0.85),
      spinAngle: Math.random() * PI_2,
      spinSpeed: 0.8,
      updateFrame: -1
    };

    this.stars.push(comet);

    // Randomly make comet "burn out" early
    if (Math.random() > 0.4) {
      comet.secondColor = COLOR_CODES[COLOR_CODES.length - 1]; // INVISIBLE equivalent
      comet.transitionTime = Math.pow(Math.random(), 1.5) * 700 + 500;
    }

    // Set burst callback
    const originalLife = comet.life;
    comet.onDeath = () => {
      this.createCrysanthemumShell(comet.x, comet.y, size);
    };

    // Auto-burst when comet reaches target
    setTimeout(() => {
      const index = this.stars.indexOf(comet);
      if (index >= 0 && comet.life > 0) {
        comet.life = 0;
        if (comet.onDeath) {
          comet.onDeath(comet);
        }
        this.stars.splice(index, 1);
      }
    }, originalLife);
  }

  update(timeStep: number, speed: number = 1) {
    this.currentFrame++;
    const starDrag = 1 - (1 - 0.98) * speed;
    const starDragHeavy = 1 - (1 - 0.992) * speed;
    const sparkDrag = 1 - (1 - 0.9) * speed;
    const gAcc = timeStep / 1000 * GRAVITY;

    // Update stars
    for (let i = this.stars.length - 1; i >= 0; i--) {
      const star = this.stars[i];
      
      if (star.updateFrame === this.currentFrame) continue;
      star.updateFrame = this.currentFrame;

      star.life -= timeStep;
      if (star.life <= 0) {
        if (star.onDeath) {
          star.onDeath(star);
        }
        this.stars.splice(i, 1);
        continue;
      }

      star.prevX = star.x;
      star.prevY = star.y;
      star.x += star.speedX * speed;
      star.y += star.speedY * speed;
      
      if (!star.heavy) {
        star.speedX *= starDrag;
        star.speedY *= starDrag;
      } else {
        star.speedX *= starDragHeavy;
        star.speedY *= starDragHeavy;
      }
      star.speedY += gAcc;

      // Handle spin
      if (star.spinRadius) {
        star.spinAngle = (star.spinAngle || 0) + star.spinSpeed * speed;
        star.x += Math.sin(star.spinAngle) * star.spinRadius * speed;
        star.y += Math.cos(star.spinAngle) * star.spinRadius * speed;
      }

      // Handle color transitions
      if (star.secondColor && star.life < (star.transitionTime || 0) && !star.colorChanged) {
        star.colorChanged = true;
        star.color = star.secondColor;
        if (star.sparkFreq) {
          star.sparkFreq = 0; // Disable sparks for invisible stars
        }
      }

      // Handle strobe
      if (star.strobe) {
        star.visible = Math.floor(star.life / (star.strobeFreq || 40)) % 3 === 0;
      }

      // Generate sparks
      if (star.sparkFreq && star.sparkFreq > 0) {
        star.sparkTimer = (star.sparkTimer || 0) - timeStep;
        while (star.sparkTimer < 0) {
          const burnRate = Math.pow(star.life / star.fullLife, 0.5);
          const burnRateInverse = 1 - burnRate;
          
          star.sparkTimer += star.sparkFreq * 0.75 + star.sparkFreq * burnRateInverse * 4;
          
          const angle = Math.random() * PI_2;
          const sparkSpeed = (star.sparkSpeed || 1) * Math.random() * burnRate;
          
          this.sparks.push({
            x: star.x,
            y: star.y,
            prevX: star.x,
            prevY: star.y,
            color: star.sparkColor || star.color,
            speedX: Math.sin(angle) * sparkSpeed,
            speedY: Math.cos(angle) * sparkSpeed,
            life: (star.sparkLife || 750) * 0.8 + Math.random() * (star.sparkLifeVariation || 0.25) * (star.sparkLife || 750)
          });
        }
      }
    }

    // Update sparks
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const spark = this.sparks[i];
      spark.life -= timeStep;
      if (spark.life <= 0) {
        this.sparks.splice(i, 1);
        continue;
      }

      spark.prevX = spark.x;
      spark.prevY = spark.y;
      spark.x += spark.speedX * speed;
      spark.y += spark.speedY * speed;
      spark.speedX *= sparkDrag;
      spark.speedY *= sparkDrag;
      spark.speedY += gAcc;
    }
  }

  render(ctx: CanvasRenderingContext2D, trailsCtx: CanvasRenderingContext2D, width: number, height: number, speed: number) {
    // Clear main canvas
    ctx.clearRect(0, 0, width, height);

    // Fade trails
    trailsCtx.globalCompositeOperation = 'source-over';
    trailsCtx.fillStyle = `rgba(0, 0, 0, ${0.175 * speed})`;
    trailsCtx.fillRect(0, 0, width, height);
    trailsCtx.globalCompositeOperation = 'lighten';

    // Draw stars
    trailsCtx.lineWidth = this.quality === 3 ? 0.75 : 1;
    trailsCtx.lineCap = this.quality === 1 ? 'square' : 'round';
    
    const colorGroups: { [key: string]: Star[] } = {};
    this.stars.forEach(star => {
      if (!colorGroups[star.color]) {
        colorGroups[star.color] = [];
      }
      colorGroups[star.color].push(star);
    });

    Object.keys(colorGroups).forEach(color => {
      const stars = colorGroups[color];
      trailsCtx.strokeStyle = color;
      trailsCtx.beginPath();
      stars.forEach(star => {
        if (star.visible) {
          trailsCtx.moveTo(star.x, star.y);
          trailsCtx.lineTo(star.prevX, star.prevY);
        }
      });
      trailsCtx.stroke();
    });

    // Draw main canvas stars (bright core)
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    this.stars.forEach(star => {
      if (star.visible) {
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.speedX * 1.6, star.y - star.speedY * 1.6);
      }
    });
    ctx.stroke();

    // Draw sparks
    trailsCtx.lineWidth = this.quality === 3 ? 0.75 : 1;
    trailsCtx.lineCap = 'butt';
    
    const sparkColorGroups: { [key: string]: Spark[] } = {};
    this.sparks.forEach(spark => {
      if (!sparkColorGroups[spark.color]) {
        sparkColorGroups[spark.color] = [];
      }
      sparkColorGroups[spark.color].push(spark);
    });

    Object.keys(sparkColorGroups).forEach(color => {
      const sparks = sparkColorGroups[color];
      trailsCtx.strokeStyle = color;
      trailsCtx.beginPath();
      sparks.forEach(spark => {
        trailsCtx.moveTo(spark.x, spark.y);
        trailsCtx.lineTo(spark.prevX, spark.prevY);
      });
      trailsCtx.stroke();
    });
  }
}

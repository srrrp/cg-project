class Particle {
    #f = new Vec2(0, 0);
    constructor(mass, position, color) {
        if (!(position instanceof Vec2)) {
            throw "x not instance of Vec2";
        }
        this.mass = mass;
        this.position = position;
        this.velocity = new Vec2(0, 0);
        this.color = color;
    }

    get f() {
        return this.#f;
    }

    applyForce(f) {
        this.#f.x += f.x;
        this.#f.y += f.y;
    }

    clearForceAccumulator() {
        this.#f.x = 0;
        this.#f.y = 0;
    }

    draw(ctx) {
        const radius = 25;
        const speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        const lightIntensity = Math.min(1, speed / 10);

        const lightX = this.position.x - radius * 0.4;
        const lightY = this.position.y - radius * 0.4;

        const gradient = ctx.createRadialGradient(
            lightX,
            lightY,
            0,
            this.position.x,
            this.position.y,
            radius * 1.2
        );

        const baseHue = this.color.h;
        const baseSat = this.color.s;

        gradient.addColorStop(0, `hsl(${baseHue}, ${baseSat}%, ${80 + lightIntensity * 20}%)`);
        gradient.addColorStop(0.3, `hsl(${baseHue}, ${baseSat}%, ${60 + lightIntensity * 10}%)`);
        gradient.addColorStop(0.6, `hsl(${baseHue}, ${baseSat}%, ${45}%)`);
        gradient.addColorStop(0.9, `hsl(${baseHue}, ${baseSat}%, ${25}%)`);
        gradient.addColorStop(1, `hsl(${baseHue}, ${baseSat}%, ${15}%)`);

        ctx.shadowColor = `hsla(${baseHue}, ${baseSat}%, 50%, 0.8)`;
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.shadowColor = 'transparent';

        const highlightGradient = ctx.createRadialGradient(
            lightX,
            lightY,
            0,
            lightX,
            lightY,
            radius * 0.5
        );
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = highlightGradient;
        ctx.fill();
    }
}

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.forces = [];
        this.time = undefined;
    }

    get nparticles() {
        return this.particles.length;
    }

    get nforces() {
        return this.forces.length;
    }

    addParticle(position) {
        const color = {
            h: Math.floor(Math.random() * 360),
            s: 70 + Math.floor(Math.random() * 30)
        };
        this.particles.push(new Particle(1, position, color));
    }

    addForce(force) {
        if (!(force instanceof Force)) {
            throw "Cannot addForce. Please use a real force";
        }

        this.forces.push(force);
    }

    draw(ctx) {
        this.particles.forEach((p) => p.draw(ctx));
    }

    solve(deltaTs) {
        for (const particle of this.particles) {
            particle.clearForceAccumulator();
        }

        this.forces.forEach((f) => {
            f.applyTo(this);
        });

        this.particles.forEach((p) => {
            EulerStep(p, deltaTs);
            if (p.f.some((val) => isNaN(val))) {
                throw "Force is not a number";
            }
            if (p.velocity.some((val) => isNaN(val))) {
                throw "Velocity is not a number";
            }
            if (p.position.some((val) => isNaN(val))) {
                throw "Position is not a number";
            }
        });
    }
}
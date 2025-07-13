class Particle {
    #f = new Vec2(0, 0);
    constructor(mass, position) {
        if (!(position instanceof Vec2)) {
            throw "x not instance of Vec2";
        }
        this.mass = mass;
        this.position = position;
        this.velocity = new Vec2(0, 0);
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
        drawCircle(ctx, this.position.x, this.position.y, 25, "red", "black", 1);
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
        this.particles.push(new Particle(1, position));
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
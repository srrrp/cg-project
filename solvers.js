function EulerStep(p, deltaTs) {
    const accelerationStep = new Vec2(0, 0);
    p.f.divideScalar(p.mass, accelerationStep);
    accelerationStep.multiplyScalar(deltaTs, accelerationStep);

    p.velocity.add(accelerationStep, p.velocity);

    const velocityStep = p.velocity.clone();
    velocityStep.multiplyScalar(deltaTs, velocityStep);
    p.position.add(velocityStep, p.position);
}
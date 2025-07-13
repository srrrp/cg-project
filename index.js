const main = () => {
    const canvas = document.getElementById("container");
    const ctx = canvas.getContext("2d");

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    const particleSystem = new ParticleSystem();
    particleSystem.addParticle(new Vec2(50, 25));
    particleSystem.addForce(new GravityForce(0.000981));

    canvas.addEventListener("click", (event) => {
        particleSystem.addParticle(new Vec2(event.clientX, event.clientY));
    });

    let deltaTs = 0;
    let lastElapsedTs = 0;

    const run = (currentElapsedTs) => {
        unimportantCanvasDrawStuff(ctx);

        deltaTs = currentElapsedTs - lastElapsedTs;
        lastElapsedTs = currentElapsedTs;

        ctx.save();
        particleSystem.solve(deltaTs);
        particleSystem.draw(ctx);
        ctx.restore();

        requestAnimationFrame(run);
    };

    requestAnimationFrame(run);
};

main();
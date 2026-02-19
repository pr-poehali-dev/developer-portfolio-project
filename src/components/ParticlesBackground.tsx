const ParticlesBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large purple orb - top left */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full animate-float"
        style={{
          background:
            "radial-gradient(circle, hsla(262, 83%, 58%, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Blue orb - top right */}
      <div
        className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full animate-float-delayed"
        style={{
          background:
            "radial-gradient(circle, hsla(200, 95%, 55%, 0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Pink orb - center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-float"
        style={{
          background:
            "radial-gradient(circle, hsla(320, 80%, 55%, 0.04) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Small purple orb - bottom left */}
      <div
        className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] rounded-full animate-float-delayed"
        style={{
          background:
            "radial-gradient(circle, hsla(262, 83%, 58%, 0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Blue orb - bottom right */}
      <div
        className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] rounded-full animate-float"
        style={{
          background:
            "radial-gradient(circle, hsla(200, 95%, 55%, 0.05) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Tiny floating dots */}
      <div className="absolute top-[15%] left-[25%] w-1.5 h-1.5 rounded-full bg-primary/30 animate-float" />
      <div className="absolute top-[45%] right-[20%] w-1 h-1 rounded-full bg-accent/30 animate-float-delayed" />
      <div className="absolute bottom-[35%] left-[40%] w-2 h-2 rounded-full bg-primary/20 animate-float" />
      <div className="absolute top-[70%] left-[60%] w-1 h-1 rounded-full bg-accent/25 animate-float-delayed" />
      <div className="absolute top-[25%] right-[35%] w-1.5 h-1.5 rounded-full bg-primary/25 animate-float-delayed" />
    </div>
  );
};

export default ParticlesBackground;

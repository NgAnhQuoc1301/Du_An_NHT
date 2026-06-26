import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      
      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-cyan-500/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-blue-500/30 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 py-28">

        {/* badge */}
        <span className="inline-block bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 px-4 py-2 rounded-full text-sm backdrop-blur-md">
          Digital Transformation Platform
        </span>

        {/* title */}
        <h1 className="text-6xl font-bold mt-6 max-w-4xl leading-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-200 text-transparent bg-clip-text">
          NHT Solution Showcase
        </h1>

        {/* description */}
        <p className="text-xl mt-6 text-slate-300 max-w-3xl leading-relaxed">
          Discover enterprise solutions including ERP,
          CRM, Business Dashboards, Mobile Applications,
          AI and Digital Transformation Platforms.
        </p>

        {/* buttons */}
        <div className="flex gap-4 mt-10">

          <Link
            to="/solutions"
            className="
              bg-cyan-500
              text-white
              px-6 py-3
              rounded-xl
              font-semibold
              shadow-lg shadow-cyan-500/30
              hover:bg-cyan-400
              transition
            "
          >
            Explore Solutions
          </Link>

          <Link
            to="/dashboards"
            className="
              border border-cyan-400/40
              text-cyan-300
              px-6 py-3
              rounded-xl
              backdrop-blur-md
              hover:bg-cyan-500/10
              transition
            "
          >
            View Dashboards
          </Link>

        </div>

      </div>
    </section>
  );
}
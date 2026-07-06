import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-green-50/30">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-green-200/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-emerald-100/30 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32">

        {/* Badge */}
        <span
          className="
            inline-block
            bg-green-50
            border border-green-100
            text-green-700
            px-4 py-1.5
            rounded-full
            text-xs md:text-sm
            font-semibold
            shadow-sm
          "
        >
          🌱 Digital Transformation Platform
        </span>

        {/* Title */}
        <h1
          className="
            text-4xl
            sm:text-5xl
            md:text-7xl
            font-extrabold
            tracking-tight
            mt-6
            max-w-5xl
            leading-tight
            bg-gradient-to-r
            from-green-700
            via-green-600
            to-emerald-600
            text-transparent
            bg-clip-text
          "
        >
          NHT Solution Showcase
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl mt-6 text-slate-600 max-w-3xl leading-relaxed">
          Discover enterprise solutions including ERP, CRM, Business Dashboards, 
          Mobile Applications, AI and Digital Transformation Platforms.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">

          <Link
            to="/solutions"
            className="
              bg-green-600
              text-white
              px-8 py-3.5
              rounded-xl
              text-sm
              font-semibold
              shadow-lg shadow-green-600/15
              hover:bg-green-700
              hover:shadow-xl hover:shadow-green-700/20
              transition-all
              duration-300
              text-center
            "
          >
            Explore Solutions
          </Link>

          <Link
            to="/dashboards"
            className="
              bg-white
              border
              border-slate-200
              text-slate-700
              px-8 py-3.5
              rounded-xl
              text-sm
              font-semibold
              shadow-sm
              hover:bg-slate-50
              hover:border-green-600
              hover:text-green-600
              transition-all
              duration-300
              text-center
            "
          >
            View Dashboards
          </Link>

        </div>

      </div>
    </section>
  );
}
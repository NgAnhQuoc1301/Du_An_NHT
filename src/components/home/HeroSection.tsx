import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-green-100">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-green-300/30 blur-[180px] rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-emerald-200/40 blur-[180px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32">

        {/* Badge */}
        <span
          className="
            inline-block
            bg-green-100
            border border-green-300
            text-green-700
            px-5 py-2
            rounded-full
            text-sm
            font-semibold
            shadow-sm
          "
        >
          Digital Transformation Platform
        </span>

        {/* Title */}
        <h1
          className="
            text-5xl
            md:text-7xl
            font-extrabold
            mt-8
            max-w-5xl
            leading-tight
            bg-gradient-to-r
            from-green-700
            via-green-600
            to-emerald-500
            text-transparent
            bg-clip-text
          "
        >
          NHT Solution Showcase
        </h1>

        {/* Description */}
        <p className="text-lg md:text-2xl mt-8 text-gray-600 max-w-3xl leading-relaxed">
          Discover enterprise solutions including ERP,
          CRM, Business Dashboards, Mobile Applications,
          AI and Digital Transformation Platforms.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mt-12">

          <Link
            to="/solutions"
            className="
              bg-green-600
              text-white
              px-8 py-4
              rounded-xl
              font-semibold
              shadow-lg
              hover:bg-green-700
              hover:shadow-xl
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
              border-green-300
              text-green-700
              px-8 py-4
              rounded-xl
              font-semibold
              shadow-md
              hover:bg-green-50
              hover:border-green-500
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
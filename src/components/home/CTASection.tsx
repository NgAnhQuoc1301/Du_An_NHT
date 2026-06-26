import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[450px] h-[450px] bg-cyan-500/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-140px] right-[-140px] w-[500px] h-[500px] bg-blue-500/20 blur-[160px] rounded-full" />

      <div className="relative max-w-5xl mx-auto text-center px-6">

        {/* TITLE */}
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-200 text-transparent bg-clip-text">
          Ready To Transform Your Business?
        </h2>

        {/* DESCRIPTION */}
        <p className="mb-10 text-xl text-slate-300">
          Explore enterprise solutions and dashboard systems.
        </p>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4">

          <Link
            to="/dashboards"
            className="
              bg-cyan-500
              text-white
              px-8 py-3
              rounded-xl
              font-semibold
              shadow-lg shadow-cyan-500/30
              hover:bg-cyan-400
              transition
            "
          >
            Request Demo
          </Link>

          <Link
            to="/contact"
            className="
              border border-cyan-400/40
              text-cyan-300
              px-8 py-3
              rounded-xl
              backdrop-blur-md
              hover:bg-cyan-500/10
              transition
            "
          >
            Contact Us
          </Link>

        </div>

      </div>
    </section>
  );
}
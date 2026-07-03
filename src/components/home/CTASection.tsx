import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[450px] h-[450px] blur-[150px] rounded-full" />
      <div className="absolute bottom-[-140px] right-[-140px] w-[500px] h-[500px] blur-[160px] rounded-full" />

      <div className="relative max-w-5xl mx-auto text-center px-6">

        {/* TITLE */}
        <h2 className="text-5xl font-bold mb-6">
          Ready To Transform Your Business?
        </h2>

        {/* DESCRIPTION */}
        <p className="mb-10 text-xl">
          Explore enterprise solutions and dashboard systems.
        </p>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4">

          <Link
            to="/dashboards"
            className="
            border
              bg-green-600
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            Request Demo
          </Link>

          <Link
            to="/contact"
            className="
              border
              px-8
              py-3
              rounded-xl
              backdrop-blur-md
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
export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-5xl mx-auto text-center px-6">

        <h2 className="text-5xl font-bold mb-6">
          Ready To Transform Your Business?
        </h2>

        <p className="mb-10 text-xl">
          Explore enterprise solutions and dashboard systems.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold">
            Request Demo
          </button>

          <button className="border border-white px-8 py-3 rounded-xl">
            Contact Us
          </button>
        </div>

      </div>
    </section>
  );
}
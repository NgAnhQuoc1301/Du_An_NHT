export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-28">
        <span className="bg-blue-500 px-4 py-2 rounded-full text-sm">
          Digital Transformation Platform
        </span>

        <h1 className="text-6xl font-bold mt-6 max-w-4xl leading-tight">
          NHT Solution Showcase
        </h1>

        <p className="text-xl mt-6 text-blue-100 max-w-3xl">
          Discover enterprise solutions including ERP,
          CRM, Business Dashboards, Mobile Applications,
          AI and Digital Transformation Platforms.
        </p>

        <div className="flex gap-4 mt-10">
          <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold">
            Explore Solutions
          </button>

          <button className="border border-white px-6 py-3 rounded-xl">
            View Dashboards
          </button>
        </div>
      </div>
    </section>
  );
}
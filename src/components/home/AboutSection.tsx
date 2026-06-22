export default function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <span className="text-blue-600 font-semibold">
              ABOUT NHT SOLUTIONS
            </span>

            <h2 className="text-4xl font-bold mt-4 text-slate-900">
              Empowering Businesses Through
              Digital Transformation
            </h2>

            <p className="mt-6 text-slate-600 leading-8">
              NHT Solutions delivers enterprise-grade
              ERP, CRM, Dashboard Analytics,
              Mobile Applications and Digital
              Transformation Platforms helping
              organizations optimize operations
              and accelerate growth.
            </p>
          </div>

          <div className="bg-blue-50 rounded-3xl p-10">
            <div className="grid grid-cols-2 gap-6">

              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-3xl font-bold text-blue-600">
                  100+
                </h3>
                <p>Projects Delivered</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-3xl font-bold text-blue-600">
                  12
                </h3>
                <p>Business Dashboards</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-3xl font-bold text-blue-600">
                  ERP
                </h3>
                <p>Enterprise Solutions</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-3xl font-bold text-blue-600">
                  CRM
                </h3>
                <p>Customer Management</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
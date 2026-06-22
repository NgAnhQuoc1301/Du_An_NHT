export default function WhyChooseSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose NHT
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-8 border rounded-2xl">
            <h3 className="font-bold mb-3">
              Enterprise Solutions
            </h3>
            <p>
              Scalable architecture for business growth.
            </p>
          </div>

          <div className="p-8 border rounded-2xl">
            <h3 className="font-bold mb-3">
              Real-Time Analytics
            </h3>
            <p>
              Monitor KPIs and performance instantly.
            </p>
          </div>

          <div className="p-8 border rounded-2xl">
            <h3 className="font-bold mb-3">
              Responsive Design
            </h3>
            <p>
              Works across desktop, tablet and mobile.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
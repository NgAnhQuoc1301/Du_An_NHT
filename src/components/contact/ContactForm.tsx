import {
  Building2,
  User,
  Phone,
  Mail,
  Briefcase,
  LayoutDashboard,
  CalendarClock,
  Wallet,
  FileText,
  ShieldCheck,
  Headphones,
  Clock3,
  Send,
} from "lucide-react";

export default function ContactForm() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-green-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
            💬 REQUEST CONSULTATION
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            Tell us about your{" "}
            <span className="text-green-600">
              business
            </span>
          </h2>

          <p className="mt-4 text-lg text-slate-500 max-w-3xl mx-auto">
            Leave your information and business requirements.
            NHT experts will contact you within 24 hours
            to recommend the most suitable solution.
          </p>
        </div>

        {/* Card */}

        <div
          className="
            bg-white
            rounded-[32px]
            border
            border-green-100
            shadow-[0_20px_60px_rgba(0,0,0,.08)]
            p-10
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <InputField
              icon={<Building2 size={18} />}
              label="Company Name"
              placeholder="Enter company name"
            />

            <InputField
              icon={<User size={18} />}
              label="Contact Person"
              placeholder="Enter full name"
            />

            <InputField
              icon={<Phone size={18} />}
              label="Phone Number"
              placeholder="Phone number"
            />

            <InputField
              icon={<Mail size={18} />}
              label="Email"
              placeholder="Email address"
            />

            <SelectField
              icon={<Briefcase size={18} />}
              label="Industry"
              options={[
                "Manufacturing",
                "Retail",
                "Logistics",
                "Education",
                "Healthcare",
                "Construction",
              ]}
            />

            <SelectField
              icon={<LayoutDashboard size={18} />}
              label="Interested Solution"
              options={[
                "ERP",
                "CRM",
                "Dashboard",
                "HRM",
                "AI",
                "IoT",
              ]}
            />

            <InputField
              icon={<CalendarClock size={18} />}
              label="Expected Timeline"
              placeholder="Example: Q4/2026"
            />

            <InputField
              icon={<Wallet size={18} />}
              label="Estimated Budget"
              placeholder="Example: 200 Million VND"
            />
          </div>

          <div className="mt-8">
            <label className="block font-semibold text-slate-700 mb-3">
              Business Requirements
            </label>

            <div className="relative">
              <FileText
                size={18}
                className="absolute left-4 top-5 text-green-600"
              />

              <textarea
                rows={6}
                placeholder="Describe your current business process, challenges and expected goals..."
                className="
                  w-full
                  pl-12
                  pr-4
                  py-4
                  rounded-xl
                  border
                  border-slate-200
                  focus:ring-4
                  focus:ring-green-100
                  focus:border-green-500
                  outline-none
                  transition
                  resize-none
                "
              />
            </div>
          </div>

          {/* Features */}

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <Feature
              icon={<ShieldCheck size={28} />}
              title="100% Secure"
              desc="Your information is completely confidential."
            />

            <Feature
              icon={<Headphones size={28} />}
              title="Expert Consultant"
              desc="Experienced NHT Solution consultants."
            />

            <Feature
              icon={<Clock3 size={28} />}
              title="Quick Response"
              desc="Response within 24 working hours."
            />

          </div>

          <button
            className="
              w-full
              mt-10
              py-4
              rounded-xl
              bg-green-600
              hover:bg-green-700
              text-white
              font-semibold
              text-lg
              flex
              items-center
              justify-center
              gap-3
              transition
            "
          >
            <Send size={20} />

            Request Consultation
          </button>

          <p className="text-center text-sm text-slate-400 mt-4">
            We respect your privacy. Your information will never be shared with third parties.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Components ---------- */

function InputField({
  icon,
  label,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-4 top-4 text-green-600">
          {icon}
        </div>

        <input
          placeholder={placeholder}
          className="
            w-full
            pl-12
            pr-4
            py-4
            rounded-xl
            border
            border-slate-200
            focus:ring-4
            focus:ring-green-100
            focus:border-green-500
            outline-none
            transition
          "
        />
      </div>
    </div>
  );
}

function SelectField({
  icon,
  label,
  options,
}: {
  icon: React.ReactNode;
  label: string;
  options: string[];
}) {
  return (
    <div>
      <label className="block font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-4 top-4 text-green-600">
          {icon}
        </div>

        <select
          className="
            w-full
            pl-12
            pr-4
            py-4
            rounded-xl
            border
            border-slate-200
            focus:ring-4
            focus:ring-green-100
            focus:border-green-500
            outline-none
            transition
          "
        >
          <option>Select...</option>

          {options.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-4 border border-green-100 rounded-2xl p-5">
      <div className="text-green-600">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold text-slate-700">
          {title}
        </h4>

        <p className="text-sm text-slate-500">
          {desc}
        </p>
      </div>
    </div>
  );
}
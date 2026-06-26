export default function Footer() {
  return (
    <footer className="relative py-10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-500/20 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">

        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-cyan-300 font-semibold">
            NHT Solutions
          </span>. All rights reserved.
        </p>

      </div>

    </footer>
  );
}
export default function Footer() {
  return (
    <footer className="py-10 bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <p>&copy; {new Date().getFullYear()} NHT. All rights reserved.</p>
      </div>
    </footer>
  );
}
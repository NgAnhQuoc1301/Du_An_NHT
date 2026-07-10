import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <section className="bg-white py-24 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Contact Details */}
          <div className="space-y-10">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-bold tracking-wide uppercase mb-4 border border-green-100">
                Thông tin liên hệ
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                CÔNG TY CỔ PHẦN <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                  CÔNG NGHỆ CAO NAGAKAWA
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:shadow-lg group-hover:shadow-green-600/30 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold mb-1">Địa chỉ</h4>
                  <p className="text-slate-600 leading-relaxed font-light">
                    Tầng 3, Toà nhà Gold Tower, <br/>
                    275 Nguyễn Trãi, Thanh Xuân, Hà Nội
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:shadow-lg group-hover:shadow-green-600/30 transition-all duration-300">
                  <Phone className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold mb-1">Hotline</h4>
                  <p className="text-slate-600 leading-relaxed font-light">
                    <a href="tel:0328992139" className="hover:text-green-600 transition-colors">
                      0328992139
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:shadow-lg group-hover:shadow-green-600/30 transition-all duration-300">
                  <Mail className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold mb-1">Email</h4>
                  <p className="text-slate-600 leading-relaxed font-light">
                    <a href="mailto:cskh@anerp.com.vn" className="hover:text-green-600 transition-colors">
                      cskh@anerp.com.vn
                    </a>
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:shadow-lg group-hover:shadow-green-600/30 transition-all duration-300">
                  <Clock className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold mb-1">Giờ làm việc</h4>
                  <p className="text-slate-600 leading-relaxed font-light">
                    Thứ 2 - Thứ 6: 08:00 - 17:30 <br/>
                    Thứ 7: 08:00 - 12:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Google Map */}
          <div className="h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-green-900/10 border-4 border-white relative group">
            <div className="absolute inset-0 bg-green-600/10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
            <iframe
              title="Google Map - Gold Tower"
              src="https://maps.google.com/maps?q=To%C3%A0%20nh%C3%A0%20Gold%20Tower,%20275%20Nguy%E1%BB%85n%20Tr%C3%A3i,%20Thanh%20Xu%C3%A2n,%20H%C3%A0%20N%E1%BB%99i&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover grayscale-[20%] contrast-125"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
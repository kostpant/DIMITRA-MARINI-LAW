import React from 'react';
import { Phone, Mail, Landmark, CreditCard } from 'lucide-react';

export default function Contact() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-pearl pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-pearl/60 mb-4">ΕΠΙΚΟΙΝΩΝΙΑ</p>
          <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-normal mb-8">
            Επικοινωνήστε μαζί μας
          </h1>
          <div className="w-16 h-1 bg-cerulean mx-auto"></div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 lg:py-32 bg-pearl px-6">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <a href="tel:2741307884" className="group block p-8 bg-white border border-navy/10 hover:border-navy/30 transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-cerulean/10 transition-colors">
                <Phone className="w-5 h-5 text-navy group-hover:text-cerulean transition-colors" />
              </div>
              <h3 className="font-bold text-navy uppercase tracking-wider text-sm mb-2">Σταθερο</h3>
              <p className="font-serif text-2xl text-navy/80 group-hover:text-navy transition-colors">2741 307 884</p>
            </a>

            <a href="tel:6950126588" className="group block p-8 bg-white border border-navy/10 hover:border-navy/30 transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-cerulean/10 transition-colors">
                <Phone className="w-5 h-5 text-navy group-hover:text-cerulean transition-colors" />
              </div>
              <h3 className="font-bold text-navy uppercase tracking-wider text-sm mb-2">Κινητο</h3>
              <p className="font-serif text-2xl text-navy/80 group-hover:text-navy transition-colors">6950 126 588</p>
            </a>

            <a href="mailto:dimitramarinilaw@gmail.com" className="group block p-8 bg-white border border-navy/10 hover:border-navy/30 transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-cerulean/10 transition-colors">
                <Mail className="w-5 h-5 text-navy group-hover:text-cerulean transition-colors" />
              </div>
              <h3 className="font-bold text-navy uppercase tracking-wider text-sm mb-2">Email</h3>
              <p className="font-serif text-lg lg:text-xl text-navy/80 group-hover:text-navy transition-colors break-all">dimitramarinilaw<br/>@gmail.com</p>
            </a>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-24 lg:py-32 bg-navy text-pearl px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-pearl/60 mb-4">ΠΛΗΡΩΜΕΣ</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-normal mb-6">
              Ευελιξία στις <span className="font-bold italic">συναλλαγές.</span>
            </h2>
            <div className="w-16 h-1 bg-cerulean mx-auto md:mx-0 mb-6"></div>
            <p className="text-lg font-light opacity-80">
              Για την καλύτερη εξυπηρέτησή σας, το γραφείο μας υποστηρίζει πολλαπλούς τρόπους πληρωμής.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <div className="flex items-center gap-6 p-6 border border-white/10 bg-white/5">
              <Landmark className="w-8 h-8 text-cerulean shrink-0" />
              <span className="font-serif text-xl">Μετρητά στην έδρα</span>
            </div>
            <div className="flex items-center gap-6 p-6 border border-white/10 bg-white/5">
              <Landmark className="w-8 h-8 text-cerulean shrink-0" />
              <span className="font-serif text-xl">Κατάθεση σε τραπεζικό λογαριασμό</span>
            </div>
            <div className="flex items-center gap-6 p-6 border border-white/10 bg-white/5">
              <CreditCard className="w-8 h-8 text-cerulean shrink-0" />
              <span className="font-serif text-xl">Χρεωστική κάρτα</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

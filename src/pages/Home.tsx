import React from 'react';
import { ChevronDown, ArrowUpRight, MapPin, Clock, Phone, Mail, Landmark, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data';
import HeroCanvas from '../components/HeroCanvas';

export default function Home() {
  return (
    <>
      {/* Scroll-Driven Video Hero */}
      <HeroCanvas />

      {/* Intro Section */}
      <section className="py-20 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-normal mb-8 leading-tight text-navy">
            Με σεβασμό, ειλικρίνεια και <br className="hidden md:block" />
            <em className="font-bold italic">επαγγελματική αφοσίωση.</em>
          </h1>
          <div className="w-px h-24 bg-navy mx-auto mb-10"></div>
          <p className="text-lg lg:text-xl leading-relaxed text-navy/80 max-w-3xl mx-auto font-light">
            Η Δήμητρα Μαρίνη είναι Δικηγόρος, μέλος του Δικηγορικού Συλλόγου Κορίνθου. Παρέχει υψηλού επιπέδου νομικές υπηρεσίες συμβουλευτικής και δικαστηριακής φύσεως, πορευόμενη σταθερά με στόχο την αποτελεσματική και συμφέρουσα για τον εντολέα παροχή υπηρεσιών.
          </p>
        </div>
      </section>

      {/* Services Grid (Tile Group) */}
      <section className="bg-navy text-pearl" id="services">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <Link to={`/service/${service.id}`} key={index} className="group relative border-b border-r border-white/10 p-8 lg:p-12 min-h-[320px] flex flex-col justify-center bg-navy hover:bg-[#6e6e70] transition-colors duration-500 cursor-pointer overflow-hidden block">
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <ArrowUpRight className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-serif text-2xl lg:text-3xl mb-4 relative z-10">{service.title}</h3>
              <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                <div className={`w-8 h-1 ${service.color} my-4`}></div>
                <p className="text-sm opacity-80 font-light leading-relaxed">{service.desc}</p>
              </div>
            </Link>
          ))}
          {/* Fill remaining grid spots to make it look complete */}
          <div className="hidden xl:block border-b border-r border-white/10 p-8 lg:p-12 min-h-[320px] bg-navy"></div>
          <div className="hidden xl:block border-b border-r border-white/10 p-8 lg:p-12 min-h-[320px] bg-navy"></div>
          <div className="hidden xl:block border-b border-white/10 p-8 lg:p-12 min-h-[320px] bg-navy"></div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-24 lg:py-32 bg-pearl" id="about">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[3/4] lg:aspect-square bg-navy/5 relative overflow-hidden">
              <img src="/images/office-workspace.jpg" alt="Δικηγορικό Γραφείο" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 w-full bg-navy/90 backdrop-blur p-6 text-center text-pearl">
                <p className="font-sans text-sm font-bold tracking-widest uppercase mb-1">Δήμητρα Κ. Μαρίνη</p>
                <p className="font-serif italic text-lg opacity-80">Δικηγόρος, Κόρινθος</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-navy/60 mb-4">ΤΟ ΠΡΟΦΙΛ</p>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-normal mb-8 text-navy">
              Έμπιστη <br className="hidden lg:block" />
              <span className="font-bold">Νομική Σύμβουλος</span>
            </h2>
            <div className="w-16 h-1 bg-navy mx-auto lg:mx-0 mb-8"></div>
            <p className="text-lg leading-relaxed text-navy/80 mb-12 font-light max-w-2xl mx-auto lg:mx-0">
              Αποφοίτησε από τη Νομική Σχολή του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης (ΑΠΘ). Από το έτος 2022 διατηρεί Δικηγορικό Γραφείο στην Κόρινθο, παρέχοντας νομικές υπηρεσίες σε όλη την Ελλάδα.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left max-w-2xl mx-auto lg:mx-0 mb-12">
              <div className="border-l-2 border-cerulean pl-4">
                <h4 className="font-bold text-navy mb-1 uppercase tracking-wider text-xs">Εκπαιδευση</h4>
                <p className="text-navy/80 font-serif italic">Νομική Σχολή, ΑΠΘ</p>
              </div>
              <div className="border-l-2 border-teal pl-4">
                <h4 className="font-bold text-navy mb-1 uppercase tracking-wider text-xs">Συλλογος</h4>
                <p className="text-navy/80 font-serif italic">Δικηγορικός Σύλλογος Κορίνθου</p>
              </div>
              <div className="border-l-2 border-sage pl-4">
                <h4 className="font-bold text-navy mb-1 uppercase tracking-wider text-xs">Ιδρυση</h4>
                <p className="text-navy/80 font-serif italic">2022</p>
              </div>
              <div className="border-l-2 border-orange pl-4">
                <h4 className="font-bold text-navy mb-1 uppercase tracking-wider text-xs">Εμβελεια</h4>
                <p className="text-navy/80 font-serif italic">Όλη η Ελλάδα</p>
              </div>
            </div>
            
            <Link to="/about" className="inline-flex items-center justify-center border border-navy px-8 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-navy hover:text-pearl transition-colors duration-300">
              Περισσοτερα
            </Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-navy text-pearl py-24 lg:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-pearl/60 mb-4">ΕΞΥΠΗΡΕΤΗΣΗ</p>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-normal mb-8">
            Δίπλα σας σε κάθε <span className="font-bold italic">νομικό ζήτημα.</span>
          </h2>
          <div className="w-16 h-1 bg-cerulean mx-auto mb-8"></div>
          <p className="text-lg lg:text-xl leading-relaxed text-pearl/80 font-light mb-12">
            Το γραφείο μας λειτουργεί καθημερινά για να σας παρέχει άμεση και υπεύθυνη νομική υποστήριξη. Εξυπηρετούμε πελάτες στην Κόρινθο αλλά και σε ολόκληρη την επικράτεια.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-cerulean" />
              <span className="font-serif text-xl">Δευ – Παρ, 09:00 – 17:00</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/20"></div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-cerulean" />
              <span className="font-serif text-xl">Κολιάτσου 34, Κόρινθος</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 lg:py-32 bg-pearl px-6" id="contact">
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-navy/60 mb-4">ΕΠΙΚΟΙΝΩΝΙΑ</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy">Επικοινωνήστε μαζί μας</h2>
          </div>

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
    </>
  );
}

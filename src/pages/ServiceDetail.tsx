import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { services } from '../data';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pearl text-navy pt-24">
        <h1 className="font-serif text-4xl mb-4">Η υπηρεσία δεν βρέθηκε</h1>
        <Link to="/services" className="text-cerulean hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Επιστροφή στις υπηρεσίες
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-pearl pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-pearl/60 mb-4">ΥΠΗΡΕΣΙΑ</p>
          <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-normal mb-8">
            {service.title}
          </h1>
          <div className={`w-16 h-1 ${service.color} mx-auto`}></div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-32 px-6 bg-pearl">
        <div className="max-w-3xl mx-auto text-center lg:text-left">
          <p className="text-xl leading-relaxed text-navy/80 mb-12 font-light">
            {service.desc}
          </p>
          
          <div className="prose prose-lg prose-navy max-w-none text-navy/80 font-light">
            <p>
              Το δικηγορικό μας γραφείο αναλαμβάνει με υπευθυνότητα και επαγγελματισμό υποθέσεις που αφορούν το <strong>{service.title}</strong>. 
              Με βαθιά γνώση της νομοθεσίας και της νομολογίας, παρέχουμε εξατομικευμένες νομικές συμβουλές και εκπροσώπηση ενώπιον των δικαστηρίων.
            </p>
            <p className="mt-6">
              Στόχος μας είναι η αποτελεσματική προάσπιση των δικαιωμάτων σας και η εξεύρεση της βέλτιστης δυνατής λύσης για την υπόθεσή σας, 
              με γνώμονα πάντα το δικό σας συμφέρον.
            </p>
          </div>

          <div className="mt-16 pt-12 border-t border-navy/10 text-center">
            <h3 className="font-serif text-2xl mb-6 text-navy">Χρειάζεστε νομική υποστήριξη;</h3>
            <Link to="/contact" className="inline-flex items-center justify-center border border-navy px-8 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-navy hover:text-pearl transition-colors duration-300">
              Επικοινωνηστε μαζι μας
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

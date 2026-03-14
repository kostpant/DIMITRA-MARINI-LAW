import React from 'react';
import { Landmark } from 'lucide-react';

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-pearl pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-pearl/60 mb-4">ΤΟ ΠΡΟΦΙΛ</p>
          <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-normal mb-8">
            Δήμητρα Κ. Μαρίνη
          </h1>
          <div className="w-16 h-1 bg-cerulean mx-auto"></div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-32 px-6 bg-pearl">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-16">
          <div className="w-full max-w-md aspect-[3/4] bg-navy/5 relative overflow-hidden flex items-center justify-center">
            <Landmark className="w-32 h-32 text-navy/10" />
          </div>
          
          <div className="text-center lg:text-left w-full">
            <h2 className="font-serif text-3xl lg:text-4xl font-normal mb-8 text-navy">
              Έμπιστη <span className="font-bold">Νομική Σύμβουλος</span>
            </h2>
            <p className="text-lg leading-relaxed text-navy/80 mb-8 font-light">
              Η Δήμητρα Μαρίνη είναι Δικηγόρος, μέλος του Δικηγορικού Συλλόγου Κορίνθου. Αποφοίτησε από τη Νομική Σχολή του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης. Από το έτος 2022 διατηρεί Δικηγορικό Γραφείο στην Κόρινθο, επί της οδού Κολιάτσου 34, παρέχοντας υψηλού επιπέδου νομικές υπηρεσίες συμβουλευτικής και δικαστηριακής φύσεως.
            </p>
            <p className="text-lg leading-relaxed text-navy/80 mb-12 font-light">
              Με σεβασμό, ειλικρίνεια και επαγγελματική αφοσίωση στα συμφέροντα του εκάστοτε εντολέως της, πορεύεται σταθερά με στόχο την αποτελεσματική και συμφέρουσα γι' αυτόν, παροχή υπηρεσιών.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left border-t border-navy/10 pt-12">
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
          </div>
        </div>
      </section>
    </div>
  );
}

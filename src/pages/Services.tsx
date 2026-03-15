import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data';

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-pearl pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-pearl/60 mb-4">ΥΠΗΡΕΣΙΕΣ</p>
          <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-normal mb-8">
            Νομικές Υπηρεσίες
          </h1>
          <div className="w-16 h-1 bg-cerulean mx-auto"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-navy text-pearl">
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
    </div>
  );
}

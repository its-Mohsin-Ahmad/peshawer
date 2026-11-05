import React from 'react';
import { Building, ShieldCheck, Clock, Users } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { AnimatedSection } from '../common/AnimatedSection';

export const StatsSection: React.FC = () => {
  const { projects, properties } = useData();

  const stats = [
    {
      label: 'Signature Developments',
      value: `${projects.length}`,
      subtext: 'Peshawar & Swat Valley',
      icon: Building,
    },
    {
      label: 'Published Properties',
      value: `${properties.filter((p) => p.published).length}+`,
      subtext: 'Verified Prime Listings',
      icon: ShieldCheck,
    },
    {
      label: 'Easy Installment Horizon',
      value: '5 Years',
      subtext: 'Predictable Monthly Plans',
      icon: Clock,
    },
    {
      label: 'Regulatory Approvals',
      value: '100%',
      subtext: 'TMA & Authority Compliant',
      icon: Users,
    },
  ];

  return (
    <section className="py-16 bg-[#064E3B] text-white border-y-2 border-[#D6A84F]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection stagger={0.12} variant="fadeUp" className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center p-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#022C22] text-[#D6A84F] flex items-center justify-center mb-3 shadow transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#E6C678] tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="font-heading text-sm font-bold text-white mb-0.5 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-xs text-[#ECFDF5]/70">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </AnimatedSection>
      </div>
    </section>
  );
};


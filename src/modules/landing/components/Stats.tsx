'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiTrendingUp, FiEye, FiZap } from 'react-icons/fi';
import { HiShieldCheck } from 'react-icons/hi2';

// Counter component removed as we are no longer using fake numbers

export default function Stats() {
    const statsList = [
        {
            highlightText: 'Automate',
            title: 'Production Workflows',
            description: 'Manage production workflows and monitor production progress effortlessly.',
            icon: FiTrendingUp,
            color: 'text-purple-600 bg-purple-50 border-purple-100',
            badge: 'Operational Efficiency'
        },
        {
            highlightText: 'Track',
            title: 'Inventory & Materials',
            description: 'Track materials, stock levels, and inventory movements in real-time.',
            icon: HiShieldCheck,
            color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
            badge: 'Centralized Control'
        },
        {
            highlightText: 'Manage',
            title: 'Workforce & Attendance',
            description: 'Manage employee information, track attendance, and assign tasks easily.',
            icon: FiEye,
            color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
            badge: 'Better Accountability'
        },
        {
            highlightText: 'Analyze',
            title: 'Reports & Insights',
            description: 'View operational insights and make better data-driven business decisions.',
            icon: FiZap,
            color: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100',
            badge: 'Data-Driven Decisions'
        }
    ];

    return (
        <section className="relative py-28 bg-[#FAFAFC] overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-purple-100/20 blur-[150px] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="text-xs font-extrabold uppercase tracking-[0.2em] text-purple-700 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100"
                    >
                        Proven Operational Impact
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4"
                    >
                        Quantifiable Results for Enterprise Floor Operations
                    </motion.h2>
                </div>

                {/* 4 Large Statistic Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statsList.map((stat, idx) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="relative rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-xl p-8 shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(124,58,237,0.08)] hover:border-purple-300 transition-all duration-300 flex flex-col justify-between group"
                        >
                            {/* Card Top Icon & Badge */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`p-3 rounded-2xl border ${stat.color}`}>
                                        <stat.icon size={22} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                                        {stat.badge}
                                    </span>
                                </div>

                                {/* Highlight Text */}
                                <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-2 group-hover:text-purple-700 transition-colors">
                                    <span>{stat.highlightText}</span>
                                </div>

                                <h3 className="text-base font-bold text-slate-900 mb-2">
                                    {stat.title}
                                </h3>

                                <p className="text-xs text-slate-500 leading-relaxed">
                                    {stat.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

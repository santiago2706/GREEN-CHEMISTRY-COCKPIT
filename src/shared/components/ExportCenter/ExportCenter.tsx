import React, { useState } from 'react';
import { Download, FileText, Database, Shield, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReactionStore } from '@core/stores/useReactionStore';
import { analyzeChemistry } from '@core/utils/chemistryEngine';

interface ExportCenterProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ExportCenter: React.FC<ExportCenterProps> = ({ isOpen, onClose }) => {
    const { activeMixture, processContext } = useReactionStore();
    const analysis = analyzeChemistry(activeMixture);
    const [exportingType, setExportingType] = useState<'pdf' | 'csv' | 'json' | null>(null);

    const handleExport = (type: 'pdf' | 'csv' | 'json') => {
        setExportingType(type);
        setTimeout(() => {
            setExportingType(null);
            // In a real app, this would trigger a download
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl bg-[#0B0F14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="p-8 border-b border-white/5 bg-gradient-to-r from-slate-900 to-[#0B0F14]">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                                    <Download className="w-8 h-8 text-emerald-500" />
                                    Centro de Exportación Técnica
                                </h2>
                                <p className="text-slate-400 text-sm mt-2 font-medium">
                                    Generación de documentación para el proceso: <span className="text-emerald-400">{processContext.name}</span>
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-slate-500 hover:text-white transition-colors"
                            >
                                <Clock className="w-6 h-6 rotate-45" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-8">
                        {/* Summary Block */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4">
                                <span className="text-[10px] font-black text-slate-500 uppercase block mb-1">Score Detectado</span>
                                <span className="text-2xl font-black text-emerald-400">{analysis.score} / 100</span>
                            </div>
                            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4">
                                <span className="text-[10px] font-black text-slate-500 uppercase block mb-1">Estatus Regulatorio</span>
                                <span className={`text-sm font-black uppercase ${analysis.status === 'nominal' ? 'text-emerald-400' : analysis.status === 'evaluation' ? 'text-amber-400' : 'text-red-400'}`}>
                                    {analysis.status === 'nominal' ? 'Autorizado' : analysis.status === 'evaluation' ? 'En Revisión' : 'Restringido'}
                                </span>
                            </div>
                        </div>

                        {/* Export Options */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Formatos Disponibles</h3>

                            <div className="grid grid-cols-1 gap-3">
                                {/* PDF - Executive */}
                                <button
                                    onClick={() => handleExport('pdf')}
                                    disabled={!!exportingType}
                                    className="group flex items-center justify-between p-4 bg-slate-900/40 border border-white/5 hover:border-emerald-500/30 rounded-2xl transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Reporte Ejecutivo (PDF)</div>
                                            <div className="text-[10px] text-slate-500 font-medium">Resumen para decidores, Score global e impactos clave.</div>
                                        </div>
                                    </div>
                                    {exportingType === 'pdf' ? (
                                        <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Download className="w-5 h-5 text-slate-600 group-hover:text-emerald-400" />
                                    )}
                                </button>

                                {/* CSV - Technical */}
                                <button
                                    onClick={() => handleExport('csv')}
                                    disabled={!!exportingType}
                                    className="group flex items-center justify-between p-4 bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 rounded-2xl transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                                            <Database className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">Matriz de Datos (CSV/EXCEL)</div>
                                            <div className="text-[10px] text-slate-500 font-medium">Desglose de CAS, porcentajes y métricas LCA por componente.</div>
                                        </div>
                                    </div>
                                    {exportingType === 'csv' ? (
                                        <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Download className="w-5 h-5 text-slate-600 group-hover:text-cyan-400" />
                                    )}
                                </button>

                                {/* JSON - System Integration */}
                                <button
                                    onClick={() => handleExport('json')}
                                    disabled={!!exportingType}
                                    className="group flex items-center justify-between p-4 bg-slate-900/40 border border-white/5 hover:border-amber-500/30 rounded-2xl transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Snapshot Técnico (JSON)</div>
                                            <div className="text-[10px] text-slate-500 font-medium">Integración ERP/LIMS. Estructura de datos determinística.</div>
                                        </div>
                                    </div>
                                    {exportingType === 'json' ? (
                                        <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Download className="w-5 h-5 text-slate-600 group-hover:text-amber-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Warning */}
                    <div className="p-6 bg-slate-950 border-t border-white/5 flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-500 opacity-50" />
                        <p className="text-[10px] text-slate-600 font-mono italic">
                            AVISO: Este es un reporte de simulación preliminar basado en motores industriales. No constituye un certificado legal de terceros.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

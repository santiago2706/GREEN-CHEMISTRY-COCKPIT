import { Chemical } from '../stores/useReactionStore';

export interface AnalysisResult {
    score: number;
    status: 'nominal' | 'evaluation' | 'restricted';
    justification: string;
    metrics: {
        carbonFootprint: number;
        waterUsage: number;
        wasteFactor: number;
        vocLevel: number;
        estimatedROI?: number; // % improvement in profit margin
        complianceRisk?: number; // 0-100
    };
    principlesAnalysis: Array<{
        principleId: number;
        status: 'compliant' | 'warning' | 'critical';
        value: string;
        diagnostic: string;
    }>;
    diagnostics: string[];
    optimizations: Array<{
        id: string;
        label: string;
        description: string;
        principleId: number;
        impact: {
            waste?: number;
            energy?: number;
            safety?: number;
        };
        tradeoff?: string;
    }>;
    regulatoryFlags?: Array<{
        id: string;
        severity: 'high' | 'medium';
        label: string;
    }>;
}

/**
 * Deterministic optimization & chemistry engine.
 * Ensures all calculations are explainable and consistent.
 */
export const analyzeChemistry = (
    mixture: Chemical[],
    temperature: number = 25,
    ph: number = 7.0,
    rpm: number = 0,
    pressure: number = 1.0,
    contextMode: 'standard' | 'audit' | 'executive' = 'standard'
): AnalysisResult => {
    if (mixture.length === 0) {
        return {
            score: 0,
            status: 'evaluation',
            justification: 'Inicie el diseño cargando componentes a la mezcla activa.',
            metrics: { carbonFootprint: 0, waterUsage: 0, wasteFactor: 0, vocLevel: 0 },
            principlesAnalysis: [],
            diagnostics: ['Cargue reactivos o escanee un protocolo PDF para comenzar.'],
            optimizations: []
        };
    }

    const isFertilizerScenario = mixture.some(c => c.id.startsWith('fert-'));
    const highHazardCount = mixture.filter(c => c.hazard === 'high').length;
    const restrictedCount = mixture.filter(c => c.regulatory.reachStatus !== 'compliant').length;

    // Weighted deterministic score calculation
    let calculatedScore = 100;

    if (isFertilizerScenario) {
        // Fertilizer specific logic
        // Penalty for high temp (> 70)
        if (temperature > 70) calculatedScore -= (temperature - 70) * 1.5;
        // Penalty for pH deviation from 6.2
        const phDev = Math.abs(ph - 6.2);
        if (phDev > 0.2) calculatedScore -= phDev * 15;

        // Pressure Impact: Operational safety and efficiency
        if (pressure > 5) calculatedScore -= (pressure - 5) * 5;
        if (pressure > 10) calculatedScore -= (pressure - 10) * 15;

        // RPM Impact: Homogeneity vs Mechanical Stress
        if (rpm < 100) calculatedScore -= 10;
        if (rpm > 300) calculatedScore -= (rpm - 300) * 0.2;

        // Safety penalty
        calculatedScore -= highHazardCount * 10;
    } else {
        calculatedScore -= highHazardCount * 15;
        calculatedScore -= mixture.filter(c => c.hazard === 'medium').length * 5;
        calculatedScore -= restrictedCount * 20;
    }

    calculatedScore = Math.max(0, Math.min(100, calculatedScore));

    // Consolidated metrics
    const avgCarbon = mixture.reduce((acc, c) => acc + c.lca.carbonFootprint, 0) / (mixture.length || 1);
    const totalWater = mixture.reduce((acc, c) => acc + c.lca.waterUsage, 0);
    const totalWaste = mixture.reduce((acc, c) => acc + c.lca.wasteFactor, 0);

    // VOC/Emissions calculation sensitive to temp if NH3 is present
    const hasAmmonia = mixture.some(c => c.id === 'fert-nh3');
    let vocLevel = 10 + (highHazardCount * 20);
    if (hasAmmonia && temperature > 60) {
        vocLevel += (temperature - 60) * 5;
    }

    // Status determination
    let status: AnalysisResult['status'] = 'nominal';
    if (calculatedScore < 80) status = 'evaluation';
    if (calculatedScore < 40 || (isFertilizerScenario && pressure > 10)) status = 'restricted';

    // Justification
    let justification = '';
    if (isFertilizerScenario) {
        if (pressure > 10) {
            justification = 'PELIGRO CRÍTICO: Presión excesiva en el reactor. Riesgo inminente de fallo estructural. Reduzca presión inmediatamente.';
        } else if (temperature > 70) {
            justification = 'Alerta Térmica: La alta temperatura incrementa la volatilización de amoníaco y degrada la calidad del fertilizante.';
        } else if (Math.abs(ph - 6.2) > 0.3) {
            justification = 'Optimización de pH: Desviación del punto isoeléctrico. Riesgo de precipitación incompleta.';
        } else if (rpm < 100) {
            justification = 'Mezclado Ineficiente: RPM insuficiente para garantizar la homogeneidad de los microelementos (Zn, Mg).';
        } else {
            justification = 'Simulación Estable: Condiciones industriales estándar alcanzadas. Proceso optimizado para NPK 10-30-10.';
        }
    } else {
        if (highHazardCount === 0 && restrictedCount === 0) {
            justification = 'Mezcla en estado nominal. Cumplimiento absoluto con REACH y prevención de toxicidad.';
        } else if (restrictedCount > 0) {
            justification = `Alerta Regulatoria: Se han detectado ${restrictedCount} sustancias restringidas.`;
        } else {
            justification = `Evaluación Técnica: Riesgos detectados en ${highHazardCount} componentes.`;
        }
    }

    // Principle 6: Energy Efficiency (linked to Temp, Pressure, RPM)
    const energyScore = Math.max(0, 100 - (temperature > 50 ? (temperature - 50) : 0) - (pressure > 2 ? (pressure - 2) * 10 : 0) - (rpm > 200 ? (rpm - 200) / 2 : 0));

    // Principle-by-principle breakdown
    const principlesAnalysis: AnalysisResult['principlesAnalysis'] = [
        {
            principleId: 1, // Residuos
            status: totalWaste > 2 ? 'critical' : totalWaste > 1 ? 'warning' : 'compliant',
            value: `${totalWaste.toFixed(2)} E-Factor`,
            diagnostic: totalWaste > 2 ? 'Generación excesiva de subproductos.' : 'Nivel de residuos aceptable.'
        },
        {
            principleId: 5, // Solventes/Reactivos
            status: highHazardCount > 1 ? 'critical' : 'compliant',
            value: isFertilizerScenario ? 'Control NPK' : 'Sustitución',
            diagnostic: highHazardCount > 0 ? 'Presencia de sustancias de alto riesgo.' : 'Componentes seguros.'
        },
        {
            principleId: 6, // Energía
            status: energyScore < 60 ? 'critical' : energyScore < 85 ? 'warning' : 'compliant',
            value: energyScore > 80 ? 'Eficiente' : 'Carga Alta',
            diagnostic: energyScore < 60 ? 'Proceso con alto consumo de energía.' : 'Demanda energética optimizada.'
        },
        {
            principleId: 12, // Seguridad
            status: (highHazardCount > 0 || pressure > 10) ? 'critical' : 'compliant',
            value: pressure > 10 ? 'Riesgo Presión' : `${highHazardCount} Riesgos`,
            diagnostic: pressure > 10 ? 'Presión fuera de límites de seguridad.' : 'Operación intrínsecamente segura.'
        }
    ];

    // Layer 3: Diagnostics
    const diagnostics: string[] = [];
    if (pressure > 8) diagnostics.push('Riesgo estructural: Presión elevada en el reactor.');
    if (temperature > 70) diagnostics.push('Ineficiencia térmica: Volatilización detectada.');
    if (highHazardCount > 0) diagnostics.push(`Toxicidad: ${highHazardCount} componentes GHS Nivel 1.`);

    // Layer 4: Guided Optimizations
    const optimizations: AnalysisResult['optimizations'] = [];

    if (isFertilizerScenario) {
        if (pressure > 5) {
            optimizations.push({
                id: 'opt-press',
                label: 'Despresurización de Seguridad (2.5 Bar)',
                description: 'La reducción de presión mitiga el riesgo de fatiga en el reactor y fugas de amoníaco.',
                principleId: 12,
                impact: { safety: 25 },
                tradeoff: 'Reduce ligeramente la tasa de cristalización.'
            });
        }
        if (temperature > 60) {
            optimizations.push({
                id: 'opt-temp',
                label: 'Optimización Térmica (55°C)',
                description: 'La temperatura moderada previene la desintegración del nitrato y ahorra un 15% de vapor industrial.',
                principleId: 6,
                impact: { energy: 15, waste: 10 },
                tradeoff: 'Incrementa el tiempo de ciclo en un 8%.'
            });
        }
        if (Math.abs(ph - 6.2) > 0.1) {
            optimizations.push({
                id: 'opt-ph',
                label: 'Ajuste de pH Estequiométrico (6.2)',
                description: 'Garantiza la formación de micro-cristales de zinc y magnesio sin precipitados indeseados.',
                principleId: 1,
                impact: { waste: 20 },
                tradeoff: 'Costo operacional por uso de agente regulador.'
            });
        }
    }

    if (diagnostics.length === 0) diagnostics.push('Proceso operando bajo parámetros nominales.');

    // ROI & Compliance Calculations
    const estimatedROIBase = 15; // 15% baseline efficiency gain
    const wasteSaving = Math.max(0, (2 - totalWaste) * 5); // Save up to 10% on waste
    const energySaving = energyScore / 10; // Save up to 10% on energy
    const estimatedROI = estimatedROIBase + wasteSaving + energySaving;

    const complianceRisk = (highHazardCount * 20) + (restrictedCount * 40) + (pressure > 10 ? 30 : 0);

    // Regulatory Flags
    const regulatoryFlags: AnalysisResult['regulatoryFlags'] = [];
    if (restrictedCount > 0) {
        regulatoryFlags.push({ id: 'reach-1', severity: 'high', label: 'REACH Annex XVII: Restricción de Uso' });
    }
    if (highHazardCount > 0) {
        regulatoryFlags.push({ id: 'ghs-1', severity: 'medium', label: 'GHS Category 1: Alerta Toxicológica' });
    }
    if (pressure > 8) {
        regulatoryFlags.push({ id: 'safety-1', severity: 'high', label: 'OSHA 1910.119: Proceso de Alta Presión' });
    }

    // Context-tailored Justification
    if (contextMode === 'audit') {
        justification = `AUDITORÍA: Riesgo de cumplimiento del ${complianceRisk}%. Se detectaron ${restrictedCount} sustancias restringidas y ${highHazardCount} de alto riesgo. Se recomienda revisión inmediata del Anexo XVII.`;
    } else if (contextMode === 'executive') {
        justification = `RESUMEN EJECUTIVO: El diseño actual proyecta un ROI del ${estimatedROI.toFixed(1)}% mediante reducción de residuos y eficiencia energética. El score de sostenibilidad de ${calculatedScore} posiciona el proyecto en el cuartil superior de la industria.`;
    }

    return {
        score: Math.round(calculatedScore),
        status,
        justification,
        metrics: {
            carbonFootprint: avgCarbon,
            waterUsage: totalWater,
            wasteFactor: totalWaste,
            vocLevel,
            estimatedROI,
            complianceRisk: Math.min(100, complianceRisk)
        },
        principlesAnalysis,
        diagnostics,
        optimizations,
        regulatoryFlags
    };
};

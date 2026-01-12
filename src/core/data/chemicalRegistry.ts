import { Chemical } from '../stores/useReactionStore';

export const chemicalRegistry: Chemical[] = [
    {
        id: 'sol-hal',
        cas: '75-09-2',
        name: 'Diclorometano (DCM)',
        hazard: 'high',
        type: 'solvent',
        role: 'solvent',
        physicalState: 'liquid',
        ghsClass: 'skull',
        substituteId: 'sol-cyrene',
        lca: { carbonFootprint: 4.5, waterUsage: 120, wasteFactor: 1.5 },
        regulatory: { reachStatus: 'restricted', isAnnexXVII: true, isOsherCompliant: false }
    },
    {
        id: 'sol-tol',
        cas: '108-88-3',
        name: 'Tolueno',
        hazard: 'high',
        type: 'solvent',
        role: 'solvent',
        physicalState: 'liquid',
        ghsClass: 'skull',
        substituteId: 'sol-cyrene',
        lca: { carbonFootprint: 3.8, waterUsage: 90, wasteFactor: 1.2 },
        regulatory: { reachStatus: 'svhc', isAnnexXVII: true, isOsherCompliant: true }
    },
    {
        id: 'reag-alk',
        cas: '74-88-4',
        name: 'Yoduro de Metilo',
        hazard: 'high',
        type: 'reagent',
        ghsClass: 'skull',
        lca: { carbonFootprint: 8.2, waterUsage: 250, wasteFactor: 2.5 },
        regulatory: { reachStatus: 'restricted', isAnnexXVII: false, isOsherCompliant: false }
    },
    {
        id: 'sol-cyrene',
        cas: '53716-82-8',
        name: 'Cyrene™',
        hazard: 'low',
        type: 'solvent',
        lca: { carbonFootprint: 0.8, waterUsage: 15, wasteFactor: 0.1 },
        regulatory: { reachStatus: 'compliant', isAnnexXVII: false, isOsherCompliant: true }
    },
    {
        id: 'sol-bio-1',
        cas: '5989-27-5',
        name: 'D-Limoneno',
        hazard: 'low',
        type: 'solvent',
        lca: { carbonFootprint: 1.2, waterUsage: 30, wasteFactor: 0.2 },
        regulatory: { reachStatus: 'compliant', isAnnexXVII: false, isOsherCompliant: true }
    },
    {
        id: 'sol-bio-2',
        cas: '97-64-3',
        name: 'Etil Lactato',
        hazard: 'low',
        type: 'solvent',
        lca: { carbonFootprint: 1.1, waterUsage: 25, wasteFactor: 0.15 },
        regulatory: { reachStatus: 'compliant', isAnnexXVII: false, isOsherCompliant: true }
    },
    {
        id: 'cat-met-1',
        cas: '7440-05-3',
        name: 'Pd/C (10%)',
        hazard: 'low',
        type: 'catalyst',
        role: 'catalyst',
        physicalState: 'solid',
        lca: { carbonFootprint: 15.0, waterUsage: 500, wasteFactor: 0.05 },
        regulatory: { reachStatus: 'compliant', isAnnexXVII: false, isOsherCompliant: true }
    },
    {
        id: 'cat-met-2',
        cas: '18540-29-9',
        name: 'Cromo (VI)',
        hazard: 'high',
        type: 'catalyst',
        ghsClass: 'bio',
        lca: { carbonFootprint: 12.0, waterUsage: 450, wasteFactor: 0.8 },
        regulatory: { reachStatus: 'restricted', isAnnexXVII: true, isOsherCompliant: false }
    },
    {
        id: 'reag-a',
        cas: '110-16-7',
        name: 'Acido Maleico',
        hazard: 'medium',
        type: 'reagent',
        ghsClass: 'corrosive',
        lca: { carbonFootprint: 2.1, waterUsage: 60, wasteFactor: 0.4 },
        regulatory: { reachStatus: 'compliant', isAnnexXVII: false, isOsherCompliant: true }
    },
    {
        id: 'reag-b',
        cas: '107-13-1',
        name: 'Acrilonitrilo',
        hazard: 'medium',
        type: 'reagent',
        ghsClass: 'flame',
        lca: { carbonFootprint: 4.2, waterUsage: 110, wasteFactor: 0.9 },
        regulatory: { reachStatus: 'svhc', isAnnexXVII: false, isOsherCompliant: false }
    },
    {
        id: 'fert-h3po4',
        cas: '7664-38-2',
        name: 'Ácido Fosfórico (85%)',
        hazard: 'high',
        type: 'reagent',
        role: 'acid',
        physicalState: 'liquid',
        ghsClass: 'corrosive',
        lca: { carbonFootprint: 2.5, waterUsage: 80, wasteFactor: 0.5 },
        regulatory: { reachStatus: 'compliant', isAnnexXVII: false, isOsherCompliant: true }
    },
    {
        id: 'fert-nh3',
        cas: '1336-21-6',
        name: 'Amoníaco Acuoso',
        hazard: 'high',
        type: 'reagent',
        role: 'base',
        physicalState: 'liquid',
        ghsClass: 'skull',
        substituteId: 'fert-nh4no3',
        lca: { carbonFootprint: 3.2, waterUsage: 120, wasteFactor: 0.8 },
        regulatory: { reachStatus: 'compliant', isAnnexXVII: false, isOsherCompliant: false }
    },
    {
        id: 'fert-h2o',
        cas: '7732-18-5',
        name: 'Agua (Moderador)',
        hazard: 'low',
        type: 'reagent',
        role: 'additive',
        physicalState: 'liquid',
        lca: { carbonFootprint: 0.1, waterUsage: 5, wasteFactor: 0.05 },
        regulatory: { reachStatus: 'compliant', isAnnexXVII: false, isOsherCompliant: true }
    },
    {
        id: 'fert-nh4no3',
        cas: '6484-52-2',
        name: 'Nitrato de Amonio (Sol)',
        hazard: 'medium',
        type: 'reagent',
        role: 'reactant',
        physicalState: 'liquid',
        lca: { carbonFootprint: 1.8, waterUsage: 40, wasteFactor: 0.2 },
        regulatory: { reachStatus: 'compliant', isAnnexXVII: false, isOsherCompliant: true }
    },
    {
        id: 'fert-k2o',
        cas: '12136-45-7',
        name: 'Óxido de Potasio (K2O)',
        hazard: 'low',
        type: 'reagent',
        role: 'additive',
        physicalState: 'solid',
        ghsClass: 'corrosive',
        lca: { carbonFootprint: 0.4, waterUsage: 1.5, wasteFactor: 0.1 },
        regulatory: { reachStatus: 'compliant', isAnnexXVII: false, isOsherCompliant: true }
    },
    {
        id: 'fert-znso4',
        cas: '7733-02-0',
        name: 'Sulfato de Zinc (Zinc-Mic)',
        hazard: 'medium',
        type: 'reagent',
        ghsClass: 'skull',
        lca: { carbonFootprint: 0.8, waterUsage: 3.2, wasteFactor: 0.25 },
        regulatory: { reachStatus: 'compliant', isAnnexXVII: false, isOsherCompliant: true }
    },
    {
        id: 'fert-mgso4',
        cas: '7487-88-9',
        name: 'Sulfato de Magnesio',
        hazard: 'low',
        type: 'reagent',
        lca: { carbonFootprint: 0.3, waterUsage: 1.2, wasteFactor: 0.05 },
        regulatory: { reachStatus: 'compliant', isAnnexXVII: false, isOsherCompliant: true }
    }
];

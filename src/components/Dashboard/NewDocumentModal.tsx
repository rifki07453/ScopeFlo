import React from 'react';
import {
  FileText,
  FileSpreadsheet,
  FileSignature,
  ShieldCheck,
  Handshake,
  EyeOff,
  GitPullRequestArrow,
  BarChart3,
  Receipt,
  PackageCheck,
  Lightbulb,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDocumentGeneratorStore } from '@/store/useDocumentGeneratorStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PHASES = [
  {
    id: 'phase1',
    label: 'Phase 1 — Pre-Project',
    color: 'from-blue-500 to-cyan-400',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-100',
    hoverBorder: 'hover:border-blue-400',
    hoverBg: 'hover:bg-blue-50/70',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-100',
    docs: [
      {
        id: 'quotation',
        label: 'Quotation',
        desc: 'Itemized pricing & cost estimation for clients.',
        icon: FileSpreadsheet,
      },
      {
        id: 'proposal',
        label: 'Proposal',
        desc: 'Solutions, portfolio, and project approach.',
        icon: Lightbulb,
      },
    ],
  },
  {
    id: 'phase2',
    label: 'Phase 2 — Agreement',
    color: 'from-violet-600 to-purple-400',
    bgLight: 'bg-violet-50',
    borderColor: 'border-violet-100',
    hoverBorder: 'hover:border-violet-400',
    hoverBg: 'hover:bg-violet-50/70',
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-100',
    docs: [
      {
        id: 'sow',
        label: 'Statement of Work',
        desc: 'Scope, deliverables & timeline.',
        icon: FileText,
      },
      {
        id: 'contract',
        label: 'Contract Agreement',
        desc: 'Legal terms, payment & conditions.',
        icon: FileSignature,
      },
      {
        id: 'sla',
        label: 'Service Level Agreement',
        desc: 'Uptime guarantees & support terms.',
        icon: ShieldCheck,
      },
      {
        id: 'msa',
        label: 'Master Service Agreement',
        desc: 'Umbrella terms for all future SOWs.',
        icon: Handshake,
      },
      {
        id: 'nda',
        label: 'Non-Disclosure Agreement',
        desc: 'Confidentiality & information protection.',
        icon: EyeOff,
      },
    ],
  },
  {
    id: 'phase3',
    label: 'Phase 3 — Execution',
    color: 'from-amber-500 to-orange-400',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-100',
    hoverBorder: 'hover:border-amber-400',
    hoverBg: 'hover:bg-amber-50/70',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
    docs: [
      {
        id: 'cr',
        label: 'Change Request',
        desc: 'Document scope changes during the project.',
        icon: GitPullRequestArrow,
      },
      {
        id: 'progress_report',
        label: 'Progress Report',
        desc: 'Weekly/monthly work completion update.',
        icon: BarChart3,
      },
    ],
  },
  {
    id: 'phase4',
    label: 'Phase 4 — Closing',
    color: 'from-emerald-500 to-green-400',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
    hoverBorder: 'hover:border-emerald-400',
    hoverBg: 'hover:bg-emerald-50/70',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    docs: [
      {
        id: 'invoice',
        label: 'Invoice',
        desc: 'Final billing & payment request.',
        icon: Receipt,
      },
      {
        id: 'bast',
        label: 'BAST / Handover',
        desc: 'Project delivery & acceptance sign-off.',
        icon: PackageCheck,
      },
    ],
  },
];

export function NewDocumentModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const { resetDraft, updateField } = useDocumentGeneratorStore();

  if (!isOpen) return null;

  const handleSelect = (type: string) => {
    resetDraft();
    updateField('docType', type);
    onClose();
    router.push(`/generator?type=${type}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100 flex items-start justify-between shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Document</h2>
            <p className="text-gray-500 mt-1 text-sm">
              Choose a document type from your project lifecycle.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-8 space-y-8 flex-1">
          {PHASES.map((phase) => (
            <div key={phase.id}>
              {/* Phase Label */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`h-px flex-1 bg-gradient-to-r ${phase.color} opacity-30`} />
                <span
                  className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${phase.bgLight} ${phase.iconColor}`}
                >
                  {phase.label}
                </span>
                <div className={`h-px flex-1 bg-gradient-to-l ${phase.color} opacity-30`} />
              </div>

              {/* Doc Cards */}
              <div
                className={`grid gap-3 ${
                  phase.docs.length === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : phase.docs.length === 5
                    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
                    : 'grid-cols-1 sm:grid-cols-2'
                }`}
              >
                {phase.docs.map((doc) => {
                  const Icon = doc.icon;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => handleSelect(doc.id)}
                      className={`text-left border-2 ${phase.borderColor} ${phase.hoverBorder} ${phase.hoverBg} rounded-xl p-4 cursor-pointer transition-all group flex items-start gap-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-400`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg ${phase.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform mt-0.5`}
                      >
                        <Icon className={`w-5 h-5 ${phase.iconColor}`} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">
                          {doc.label}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{doc.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

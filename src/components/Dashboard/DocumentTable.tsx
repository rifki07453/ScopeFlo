import React from 'react';
import { useDashboardStore, DocStatus } from '@/store/useDashboardStore';
import { useHistoryStore } from '@/store/useHistoryStore';
import { useDocumentGeneratorStore } from '@/store/useDocumentGeneratorStore';
import { useRouter } from 'next/navigation';

export function DocumentTable() {
  const { filterCategory } = useDashboardStore();
  const { projects, deleteProject } = useHistoryStore();
  const { loadDraft } = useDocumentGeneratorStore();
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Signed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Viewed': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Sent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredDocs = filterCategory === 'All' 
    ? projects 
    : projects.filter(doc => doc.docType.toLowerCase() === filterCategory.toLowerCase());

  const handleOpenProject = (project: any) => {
    loadDraft(project);
    router.push(`/generator?type=${project.docType}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50/50 text-gray-500 uppercase text-xs font-semibold border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Project Name</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{doc.title || 'Untitled Project'}</td>
                <td className="px-6 py-4">{doc.clientName || '-'}</td>
                <td className="px-6 py-4 uppercase">{doc.docType}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(doc.date).toLocaleDateString('id-ID')}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleOpenProject(doc)}
                    className="text-purple-600 hover:text-purple-800 font-medium text-sm mr-4"
                  >
                    Open
                  </button>
                  <button 
                    onClick={() => deleteProject(doc.id)}
                    className="text-red-500 hover:text-red-700 font-medium text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredDocs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No documents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

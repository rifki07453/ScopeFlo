import { SowData } from '@/types/project';
import { formatBulletPoints, getCurrentDateFormatted } from './formatters';

/**
 * Generates a structured and professionally formatted HTML string for the Statement of Work.
 */
export function generateSowDocument(data: SowData): string {
  const dateStr = getCurrentDateFormatted();
  const bulletsArr = formatBulletPoints(data.scopeOfWork);
  const scopeHtml = bulletsArr.map(item => `<li style="margin-bottom: 0.5rem;">${item}</li>`).join('');

  return `
    <div style="font-family: inherit; line-height: 1.6; color: #374151; max-width: 800px; margin: 0 auto; padding: 2rem; background: #ffffff;">
      <h1 style="text-align: center; color: #111827; font-size: 2.25rem; font-weight: bold; margin-bottom: 0.5rem;">Statement of Work</h1>
      <p style="text-align: center; color: #6b7280; font-size: 0.875rem; margin-bottom: 3rem;">Date: ${dateStr}</p>
      
      <div style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.25rem; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">1. Project Overview</h2>
        <table style="width: 100%; text-align: left; border-collapse: collapse;">
          <tbody>
            <tr>
              <td style="padding: 0.5rem 0; font-weight: 600; width: 30%;">Client Name:</td>
              <td style="padding: 0.5rem 0;">${data.clientName}</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; font-weight: 600; width: 30%;">Project Title:</td>
              <td style="padding: 0.5rem 0;">${data.projectTitle}</td>
            </tr>
          </tbody>
        </table>
        <p style="margin-top: 1rem;">This Statement of Work (SOW) outlines the mutual agreement, scope, and parameters of the deliverables to be executed for the Client.</p>
      </div>

      <div style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.25rem; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">2. Scope of Work</h2>
        <ul style="padding-left: 1.5rem; list-style-type: disc;">
          ${scopeHtml}
        </ul>
      </div>

      <div style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.25rem; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">3. Timeline & Deliverables</h2>
        <p style="white-space: pre-wrap;">${data.timeline}</p>
      </div>

      <div style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.25rem; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">4. Pricing & Payment Terms</h2>
        <p style="white-space: pre-wrap;">${data.pricing}</p>
      </div>

      <div style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.25rem; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">5. Terms & Conditions</h2>
        <ul style="padding-left: 1.5rem; list-style-type: disc;">
          <li style="margin-bottom: 0.5rem;">Any feature requests or requirements outside the defined Scope of Work will force a separate agreement or change order and may incur additional fees.</li>
          <li style="margin-bottom: 0.5rem;">The project timeline is contingent upon timely feedback, approvals, and content delivery from the Client.</li>
          <li style="margin-bottom: 0.5rem;">Intellectual property rights are transferred to the Client only upon full and final payment of all invoices.</li>
        </ul>
      </div>
      
      <div style="margin-top: 4rem; display: flex; justify-content: space-between;">
        <div style="width: 45%;">
          <p style="margin-bottom: 3rem; font-weight: 600;">Service Provider / Agency</p>
          <div style="border-top: 1px solid #d1d5db; padding-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">Authorized Signature & Date</div>
        </div>
        <div style="width: 45%;">
          <p style="margin-bottom: 3rem; font-weight: 600;">${data.clientName}</p>
          <div style="border-top: 1px solid #d1d5db; padding-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">Client Signature & Date</div>
        </div>
      </div>
    </div>
  `;
}

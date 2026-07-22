// ============================================
// UTILS - Export Functions
// ============================================

import type { AnalysisResult, AnalysisHistory, ExportOptions } from '../types';

/**
 * Exporta dados para JSON
 */
export function exportToJSON(
  data: AnalysisHistory[] | AnalysisResult,
  filename: string = 'export'
): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Exporta dados para CSV
 */
export function exportToCSV(
  data: AnalysisHistory[],
  filename: string = 'export'
): void {
  const headers = ['ID', 'Tipo', 'Data', 'Duração (ms)', 'Confiança', 'Status', 'Exportado'];

  const rows = data.map(item => {
    const result = item.result as any;
    return [
      item.id,
      item.mode,
      new Date(item.timestamp).toLocaleString('pt-BR'),
      item.duration,
      (result?.confidence || 0).toFixed(2),
      result?.status || 'unknown',
      item.exported ? 'Sim' : 'Não'
    ].map(cell => `"${cell}"`).join(',');
  });

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Exporta dados para Markdown
 */
export function exportToMarkdown(
  data: AnalysisHistory[],
  filename: string = 'export'
): void {
  let md = `# Relatório de Análises - AI Pipeline\n\n`;
  md += `**Gerado em:** ${new Date().toLocaleString('pt-BR')}\n\n`;
  md += `## Resumo\n\n`;
  md += `- **Total de Análises:** ${data.length}\n`;
  md += `- **Taxa de Sucesso:** ${((data.filter(d => (d.result as any)?.status === 'success').length / data.length) * 100).toFixed(1)}%\n`;
  md += `- **Tempo Médio:** ${Math.round(data.reduce((sum, d) => sum + d.duration, 0) / data.length)}ms\n\n`;

  md += `## Análises Individuais\n\n`;

  data.forEach((item, index) => {
    const result = item.result as any;
    md += `### ${index + 1}. ${item.mode.toUpperCase()} - ${item.id}\n\n`;
    md += `- **Data:** ${new Date(item.timestamp).toLocaleString('pt-BR')}\n`;
    md += `- **Status:** ${result?.status || 'N/A'}\n`;
    md += `- **Confiança:** ${((result?.confidence || 0) * 100).toFixed(1)}%\n`;
    md += `- **Modelo:** ${result?.model || 'N/A'}\n`;
    md += `- **Duração:** ${item.duration}ms\n`;

    if (item.input.text) {
      md += `\n**Texto de Entrada:**\n\n> ${item.input.text.substring(0, 200)}${item.input.text.length > 200 ? '...' : ''}\n\n`;
    }

    if (result?.sentiment) {
      md += `**Sentimento:** ${result.sentiment.label} (${((result.sentiment.score || 0) * 100).toFixed(1)}%)\n\n`;
    }

    md += `---\n\n`;
  });

  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}-${new Date().toISOString().split('T')[0]}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Exporta dados para PDF (usando impressão do navegador)
 */
export function exportToPDF(
  data: AnalysisHistory[],
  title: string = 'Relatório AI Pipeline'
): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Permita pop-ups para exportar para PDF');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
        h1 { color: #1e40af; border-bottom: 3px solid #3b82f6; padding-bottom: 10px; }
        h2 { color: #1e3a8a; margin-top: 30px; }
        .summary { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .stat { text-align: center; padding: 15px; background: white; border-radius: 6px; }
        .stat-value { font-size: 24px; font-weight: bold; color: #2563eb; }
        .stat-label { font-size: 12px; color: #64748b; margin-top: 5px; }
        .analysis-item { border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin: 15px 0; }
        .analysis-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .badge { padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
        .badge-success { background: #dcfce7; color: #166534; }
        .badge-error { background: #fee2e2; color: #991b1b; }
        .badge-pending { background: #fef3c7; color: #92400e; }
        .text-preview { background: #f8fafc; padding: 10px; border-radius: 4px; font-size: 13px; white-space: pre-wrap; max-height: 100px; overflow-y: auto; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e2e8f0; }
        th { background: #f1f5f9; font-weight: 600; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <h1>🧠 ${title}</h1>
      <p>Gerado em: ${new Date().toLocaleString('pt-BR')}</p>

      <div class="summary">
        <h2>📊 Resumo Executivo</h2>
        <div class="summary-grid">
          <div class="stat">
            <div class="stat-value">${data.length}</div>
            <div class="stat-label">Total de Análises</div>
          </div>
          <div class="stat">
            <div class="stat-value">${((data.filter(d => (d.result as any)?.status === 'success').length / data.length) * 100).toFixed(1)}%</div>
            <div class="stat-label">Taxa de Sucesso</div>
          </div>
          <div class="stat">
            <div class="stat-value">${Math.round(data.reduce((sum, d) => sum + d.duration, 0) / data.length)}ms</div>
            <div class="stat-label">Tempo Médio</div>
          </div>
        </div>
      </div>

      <h2>📋 Detalhamento das Análises</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tipo</th>
            <th>Data</th>
            <th>Status</th>
            <th>Confiança</th>
            <th>Duração</th>
          </tr>
        </thead>
        <tbody>
          ${data.map((item, i) => {
            const result = item.result as any;
            return `
              <tr>
                <td>${i + 1}</td>
                <td>${item.mode.toUpperCase()}</td>
                <td>${new Date(item.timestamp).toLocaleString('pt-BR')}</td>
                <td>
                  <span class="badge ${result?.status === 'success' ? 'badge-success' : result?.status === 'error' ? 'badge-error' : 'badge-pending'}">
                    ${result?.status || 'N/A'}
                  </span>
                </td>
                <td>${((result?.confidence || 0) * 100).toFixed(0)}%</td>
                <td>${item.duration}ms</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>

      <h2>📝 Prévia das Entradas</h2>
      ${data.map((item, i) => {
        const result = item.result as any;
        return `
          <div class="analysis-item">
            <div class="analysis-header">
              <strong>#${i + 1} - ${item.mode.toUpperCase()}</strong>
              <span class="badge ${result?.status === 'success' ? 'badge-success' : 'badge-error'}">
                ${(item.exported ? 'Exportado' : 'Pendente')}
              </span>
            </div>
            ${item.input.text ? `
              <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">Texto:</div>
              <div class="text-preview">${escapeHtml(item.input.text)}</div>
            ` : ''}
            ${item.input.image ? `
              <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">Imagem: ${item.input.image}</div>
            ` : ''}
            ${result?.sentiment ? `
              <div style="margin-top: 10px; font-size: 13px;">
                <strong>Sentimento:</strong>
                <span style="color: ${result.sentiment.label === 'positivo' ? '#166534' : result.sentiment.label === 'negativo' ? '#991b1b' : '#64748b'}">
                  ${result.sentiment.label} (${((result.sentiment.score || 0) * 100).toFixed(1)}%)
                </span>
              </div>
            ` : ''}
          </div>
        `;
      }).join('')}
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Função unificada de exportação
 */
export function exportData(
  data: AnalysisHistory[] | AnalysisResult,
  options: ExportOptions = {
    format: 'json',
    includeInput: true,
    includeMetadata: true,
    prettyPrint: true
  },
  filename: string = 'export'
): void {
  const { format } = options;

  switch (format) {
    case 'json':
      exportToJSON(data as AnalysisHistory[], filename);
      break;
    case 'csv':
      if (Array.isArray(data)) {
        exportToCSV(data, filename);
      } else {
        console.warn('CSV export requires array data');
      }
      break;
    case 'markdown':
      if (Array.isArray(data)) {
        exportToMarkdown(data, filename);
      } else {
        console.warn('Markdown export requires array data');
      }
      break;
    case 'pdf':
      if (Array.isArray(data)) {
        exportToPDF(data, filename);
      } else {
        console.warn('PDF export requires array data');
      }
      break;
    default:
      console.error('Formato não suportado:', format);
  }
}

export default exportData;
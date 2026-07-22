import { useState, useEffect } from 'react';

interface Settings {
  apiUrl: string;
  timeout: number;
  autoSave: boolean;
  theme: 'dark' | 'light' | 'auto';
  language: 'pt' | 'en' | 'es';
  notifications: boolean;
  analytics: boolean;
  maxRetries: number;
}

const DEFAULT_SETTINGS: Settings = {
  apiUrl: 'http://localhost:8000',
  timeout: 30000,
  autoSave: true,
  theme: 'dark',
  language: 'pt',
  notifications: true,
  analytics: true,
  maxRetries: 3
};

interface SettingsPanelProps {
  settings?: Partial<Settings>;
  onSave?: (settings: Settings) => void;
  onClose?: () => void;
}

export function SettingsPanel({ settings: userSettings, onSave, onClose }: SettingsPanelProps) {
  const [settings, setSettings] = useState<Settings>({
    ...DEFAULT_SETTINGS,
    ...userSettings
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [activeSection, setActiveSection] = useState<'general' | 'api' | 'advanced'>('general');

  // Carregar configurações salvas
  useEffect(() => {
    const saved = localStorage.getItem('ai-pipeline-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Erro ao carregar configurações:', e);
      }
    }
  }, []);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    localStorage.setItem('ai-pipeline-settings', JSON.stringify(settings));
    onSave?.(settings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setHasChanges(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-slate-700 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-white">⚙️ Configurações</h2>
            <p className="text-sm text-slate-400 mt-1">Personalize sua experiência</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Navegação de Seções */}
        <div className="flex gap-2 p-4 border-b border-slate-700 bg-slate-800/50">
          {[
            { id: 'general', label: 'Geral', icon: '🔧' },
            { id: 'api', label: 'API', icon: '🌐' },
            { id: 'advanced', label: 'Avançado', icon: '🧠' }
          ].map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as typeof activeSection)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white'}
              `}
            >
              {section.icon} {section.label}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="p-6 overflow-y-auto max-h-96">
          {/* Seção Geral */}
          {activeSection === 'general' && (
            <div className="space-y-6">
              {/* Theme Selector */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  🎨 Tema da Interface
                </label>
                <div className="flex gap-3">
                  {[
                    { value: 'dark', label: 'Escuro', icon: '🌙' },
                    { value: 'light', label: 'Claro', icon: '☀️' },
                    { value: 'auto', label: 'Auto', icon: '🔄' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateSetting('theme', option.value as Settings['theme'])}
                      className={`
                        flex-1 py-3 px-4 rounded-xl border-2 transition-all
                        ${settings.theme === option.value
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500'}
                      `}
                    >
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <div className="text-sm font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selector */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  🌐 Idioma / Language
                </label>
                <div className="flex gap-2">
                  {[
                    { value: 'pt', label: 'Português', flag: '🇧🇷' },
                    { value: 'en', label: 'English', flag: '🇺🇸' },
                    { value: 'es', label: 'Español', flag: '🇪🇸' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateSetting('language', option.value as Settings['language'])}
                      className={`
                        flex-1 py-2 px-3 rounded-lg border transition-all
                        ${settings.language === option.value
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500'}
                      `}
                    >
                      <span className="mr-2">{option.flag}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                <Toggle
                  label="💾 Auto Save"
                  description="Salvar automaticamente análises"
                  checked={settings.autoSave}
                  onChange={checked => updateSetting('autoSave', checked)}
                />
                <Toggle
                  label="🔔 Notificações"
                  description="Mostrar notificações de conclusão"
                  checked={settings.notifications}
                  onChange={checked => updateSetting('notifications', checked)}
                />
                <Toggle
                  label="📊 Analytics"
                  description="Coletar dados de uso anônimos"
                  checked={settings.analytics}
                  onChange={checked => updateSetting('analytics', checked)}
                />
              </div>
            </div>
          )}

          {/* Seção API */}
          {activeSection === 'api' && (
            <div className="space-y-6">
              {/* API URL */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  🌐 URL da API
                </label>
                <input
                  type="text"
                  value={settings.apiUrl}
                  onChange={e => updateSetting('apiUrl', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="http://localhost:8000"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Endereço do backend para processamento das análises
                </p>
              </div>

              {/* Timeout */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  ⏱️ Timeout (ms)
                </label>
                <input
                  type="range"
                  min="5000"
                  max="60000"
                  step="5000"
                  value={settings.timeout}
                  onChange={e => updateSetting('timeout', parseInt(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-slate-500">5s</span>
                  <span className="text-sm font-medium text-blue-400">{settings.timeout / 1000}s</span>
                  <span className="text-xs text-slate-500">60s</span>
                </div>
              </div>

              {/* Max Retries */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  🔄 Tentativas Máximas
                </label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 5].map(retries => (
                    <button
                      key={retries}
                      onClick={() => updateSetting('maxRetries', retries)}
                      className={`
                        flex-1 py-2 rounded-lg border transition-all text-sm font-medium
                        ${settings.maxRetries === retries
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500'}
                      `}
                    >
                      {retries}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Seção Avançado */}
          {activeSection === 'advanced' && (
            <div className="space-y-6">
              {/* Data Management */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <h4 className="text-white font-medium mb-3">💾 Gerenciamento de Dados</h4>
                <div className="space-y-3">
                  <button className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-colors text-left">
                    📥 Exportar todas as análises
                  </button>
                  <button className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-colors text-left">
                    📤 Importar backup
                  </button>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      handleReset();
                    }}
                    className="w-full py-2 px-4 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 rounded-lg text-sm text-red-400 transition-colors text-left"
                  >
                    🗑️ Limpar todos os dados
                  </button>
                </div>
              </div>

              {/* Cache Settings */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <h4 className="text-white font-medium mb-3">⚡ Cache e Performance</h4>
                <Toggle
                  label="Cache de Resultados"
                  description="Armazenar resultados para consultas repetidas"
                  checked={true}
                  onChange={() => {}}
                />
                <Toggle
                  label="Pré-carregamento"
                  description="Carregar dados antecipadamente"
                  checked={false}
                  onChange={() => {}}
                />
              </div>

              {/* About */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <h4 className="text-white font-medium mb-3">ℹ️ Sobre</h4>
                <div className="text-sm text-slate-400 space-y-2">
                  <div className="flex justify-between">
                    <span>Versão:</span>
                    <span className="text-white">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Build:</span>
                    <span className="text-white">2024.01.19</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer com Ações */}
        <div className="flex items-center justify-between p-6 border-t border-slate-700 bg-slate-800/50">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            🔄 Restaurar Padrões
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
            >
              {hasChanges ? '💾 Salvar Alterações' : '✓ Salvo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente Toggle
function Toggle({
  label,
  description,
  checked,
  onChange
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="text-sm font-medium text-white">{label}</div>
        {description && (
          <div className="text-xs text-slate-500 mt-0.5">{description}</div>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`
          relative w-12 h-6 rounded-full transition-colors
          ${checked ? 'bg-blue-600' : 'bg-slate-600'}
        `}
      >
        <div
          className={`
            absolute top-1 w-4 h-4 rounded-full bg-white transition-transform
            ${checked ? 'left-7' : 'left-1'}
          `}
        />
      </button>
    </div>
  );
}

export default SettingsPanel;
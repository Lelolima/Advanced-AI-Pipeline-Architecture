import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para persistência em localStorage com tipagem genérica
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao ler localStorage[${key}]:`, error);
      return initialValue;
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setStoredValue(prev => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch (error) {
      console.error(`Erro ao escrever localStorage[${key}]:`, error);
    }
  }, [key]);

  return [storedValue, setValue, isLoading];
}

/**
 * Hook para gerenciar histórico de análises com persistência
 */
export function useAnalysisHistory(maxItems: number = 100) {
  const [history, setHistory, isLoading] = useLocalStorage<Array<{
    id: string;
    mode: string;
    timestamp: string;
    result: unknown;
    duration: number;
  }>>('ai-pipeline-history', []);

  const addAnalysis = useCallback((analysis: {
    mode: string;
    result: unknown;
    duration: number;
  }) => {
    const newAnalysis = {
      ...analysis,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    };

    setHistory(prev => {
      const updated = [newAnalysis, ...prev];
      return updated.slice(0, maxItems);
    });

    return newAnalysis.id;
  }, [maxItems, setHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const getStats = useCallback(() => {
    const total = history.length;
    const successCount = history.filter(h => (h.result as any)?.status === 'success').length;
    const avgDuration = total > 0
      ? history.reduce((sum, h) => sum + h.duration, 0) / total
      : 0;

    return {
      total,
      successRate: total > 0 ? (successCount / total) * 100 : 0,
      avgDuration: Math.round(avgDuration)
    };
  }, [history]);

  return {
    history,
    addAnalysis,
    clearHistory,
    getStats,
    isLoading
  };
}

/**
 * Hook para gerenciar configurações com persistência
 */
export function useSettings() {
  const [settings, setSettings, isLoading] = useLocalStorage('ai-pipeline-settings', {
    apiUrl: 'http://localhost:8000',
    timeout: 30000,
    theme: 'dark' as 'dark' | 'light' | 'auto',
    language: 'pt' as 'pt' | 'en' | 'es'
  });

  const updateSetting = useCallback(<K extends keyof typeof settings>(key: K, value: typeof settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, [setSettings]);

  return {
    settings,
    updateSetting,
    isLoading
  };
}

/**
 * Hook para gerenciar tema da aplicação
 */
export function useTheme() {
  const [storedTheme] = useLocalStorage<'dark' | 'light' | 'auto'>('ai-pipeline-theme', 'dark');

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = storedTheme === 'dark' || (storedTheme === 'auto' && prefersDark);

    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);
  }, [storedTheme]);

  return storedTheme;
}

/**
 * Hook para debounce de valores
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook para detecção de conexão com backend
 */
export function useBackendHealth(apiUrl: string, checkInterval: number = 30000) {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [latency, setLatency] = useState<number>(-1);
  const [version, setVersion] = useState<string | null>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkHealth = useCallback(async () => {
    const start = performance.now();
    try {
      const response = await fetch(`${apiUrl}/health`, { method: 'GET' });
      const elapsed = Math.round(performance.now() - start);

      if (response.ok) {
        const data = await response.json();
        setIsOnline(true);
        setLatency(elapsed);
        setVersion(data.version || null);
        setLastCheck(new Date());
      } else {
        throw new Error('Backend returned non-OK status');
      }
    } catch {
      setIsOnline(false);
      setLatency(-1);
      setLastCheck(new Date());
    }
  }, [apiUrl]);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, checkInterval);
    return () => clearInterval(interval);
  }, [checkHealth, checkInterval]);

  return { isOnline, latency, version, lastCheck, refresh: checkHealth };
}

export default useLocalStorage;
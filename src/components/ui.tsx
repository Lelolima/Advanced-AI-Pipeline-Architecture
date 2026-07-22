import { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'purple' | 'green' | 'white';
  text?: string;
  fullscreen?: boolean;
}

export function LoadingSpinner({
  size = 'md',
  color = 'blue',
  text,
  fullscreen = false
}: LoadingSpinnerProps) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  const colors = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    white: 'border-white'
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`${sizes[size]} border-4 ${colors[color]} border-t-transparent rounded-full animate-spin`}
      />
      {text && <span className="text-sm text-slate-400 animate-pulse">{text}</span>}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}

// ============================================
// Alert / Toast Component
// ============================================

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  onClose?: () => void;
  duration?: number;
}

export function Alert({ type, title, message, onClose, duration }: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: { bg: 'bg-green-500/10', border: 'border-green-500/30', icon: '✓', text: 'text-green-400' },
    error: { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: '✕', text: 'text-red-400' },
    warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: '⚠', text: 'text-yellow-400' },
    info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: 'ℹ', text: 'text-blue-400' }
  };

  const style = styles[type];

  return (
    <div
      className={`
        ${style.bg} ${style.border} border rounded-xl p-4
        animate-slide-in flex items-start gap-3
      `}
    >
      <span className={`text-lg ${style.text}`}>{style.icon}</span>
      <div className="flex-1">
        <h4 className={`font-semibold ${style.text}`}>{title}</h4>
        {message && <p className="text-sm text-slate-400 mt-1">{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
}

// ============================================
// Modal Component
// ============================================

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden border border-slate-700 shadow-2xl animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-96">{children}</div>
        {footer && <div className="p-6 border-t border-slate-700 bg-slate-800/50">{footer}</div>}
      </div>
    </div>
  );
}

// ============================================
// Tooltip Component
// ============================================

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`
            absolute z-50 px-3 py-2 bg-slate-800 border border-slate-600
            rounded-lg text-xs text-slate-300 whitespace-nowrap shadow-xl
            animate-fade-in ${positionClasses[position]}
          `}
        >
          {content}
        </div>
      )}
    </div>
  );
}

// ============================================
// Skeleton Loader
// ============================================

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className = ''
}: SkeletonProps) {
  const baseClasses = 'bg-slate-700/50 animate-pulse rounded';

  if (variant === 'circular') {
    return (
      <div
        className={`${baseClasses} rounded-full ${className}`}
        style={{ width, height, minWidth: width, minHeight: height }}
      />
    );
  }

  if (variant === 'rectangular') {
    return (
      <div
        className={`${baseClasses} ${className}`}
        style={{ width, height }}
      />
    );
  }

  return (
    <div
      className={`${baseClasses} h-4 ${className}`}
      style={{ width: width || '100%' }}
    />
  );
}

// ============================================
// Badge Component
// ============================================

interface BadgeProps {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function Badge({ variant = 'default', size = 'md', children }: BadgeProps) {
  const variants = {
    default: 'bg-slate-700 text-slate-300',
    success: 'bg-green-500/20 text-green-400',
    error: 'bg-red-500/20 text-red-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    info: 'bg-blue-500/20 text-blue-400'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}

// ============================================
// Card Component
// ============================================

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Card({ title, description, children, footer, className = '' }: CardProps) {
  return (
    <div className={`bg-slate-800/30 rounded-2xl border border-slate-700 overflow-hidden ${className}`}>
      {(title || description) && (
        <div className="px-6 py-4 border-b border-slate-700">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/30">
          {footer}
        </div>
      )}
    </div>
  );
}

export default LoadingSpinner;
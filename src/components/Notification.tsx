import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
  duration = 1500, // Reduzido de 3000 para 1500ms
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsLeaving(true);
        // Animação de saída mais rápida
        setTimeout(() => {
          setIsVisible(false);
          onClose?.();
        }, 150); // Reduzido de 300 para 150ms
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} className="text-green-400 flex-shrink-0" />;
      case 'error':
        return <AlertCircle size={18} className="text-red-400 flex-shrink-0" />;
      default:
        return <Info size={18} className="text-blue-400 flex-shrink-0" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-900/95 border-green-600/60 shadow-green-500/20';
      case 'error':
        return 'bg-red-900/95 border-red-600/60 shadow-red-500/20';
      default:
        return 'bg-blue-900/95 border-blue-600/60 shadow-blue-500/20';
    }
  };

  if (!message || !isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg border backdrop-blur-md shadow-xl transition-all duration-150 ease-out transform ${
        isLeaving 
          ? 'translate-x-full opacity-0 scale-95' 
          : 'translate-x-0 opacity-100 scale-100'
      } ${getBgColor()}`}
      style={{
        animation: isLeaving ? 'slideOut 150ms ease-in forwards' : 'slideIn 200ms ease-out'
      }}
    >
      {getIcon()}
      <span className="text-white text-sm font-medium leading-tight">{message}</span>
    </div>
  );
};
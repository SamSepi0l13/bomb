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
  duration = 1500,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsLeaving(true);
        setTimeout(() => {
          setIsVisible(false);
          onClose?.();
        }, 150);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} className="text-[#4ec9b0] flex-shrink-0" />;
      case 'error':
        return <AlertCircle size={16} className="text-[#f44747] flex-shrink-0" />;
      default:
        return <Info size={16} className="text-[#569cd6] flex-shrink-0" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-[#2d2d2d] border-[#4ec9b0]';
      case 'error':
        return 'bg-[#2d2d2d] border-[#f44747]';
      default:
        return 'bg-[#2d2d2d] border-[#569cd6]';
    }
  };

  const getPrefix = () => {
    switch (type) {
      case 'success':
        return ':echo';
      case 'error':
        return ':echoerr';
      default:
        return ':echom';
    }
  };

  if (!message || !isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded border backdrop-blur-md shadow-xl transition-all duration-150 ease-out transform font-mono ${
        isLeaving 
          ? 'translate-x-full opacity-0 scale-95' 
          : 'translate-x-0 opacity-100 scale-100'
      } ${getBgColor()}`}
    >
      <span className="text-[#6a9955] text-sm">{getPrefix()}</span>
      {getIcon()}
      <span className="text-[#d4d4d4] text-sm font-medium leading-tight">{message}</span>
    </div>
  );
};
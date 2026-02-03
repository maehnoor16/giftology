import React from "react";
import "../styles/dialog.css";

interface DialogProps {
  open: boolean;
  title: string;
  message?: string;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: "info" | "success" | "error" | "warning";
}

const Dialog: React.FC<DialogProps> = ({
  open,
  title,
  message,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Close",
  type = "info",
}) => {
  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className={`dialog-header dialog-${type}`}>
          <h2>{title}</h2>
          <button className="dialog-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="dialog-body">
          {message && <p>{message}</p>}
          {children}
        </div>

        <div className="dialog-footer">
          <button className="dialog-btn dialog-cancel" onClick={onClose}>
            {cancelText}
          </button>
          {onConfirm && (
            <button className="dialog-btn dialog-confirm" onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;

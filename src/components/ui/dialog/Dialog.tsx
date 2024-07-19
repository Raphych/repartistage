import Modal from '../modal/Modal';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | null;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function Dialog({
  isOpen,
  onClose,
  title = null,
  actions = null,
  children,
}: DialogProps) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="dialog">
        <div className="dialog-content">{children}</div>
        {actions && <div className="dialog-actions">{actions}</div>}
      </div>
    </Modal>
  );
}

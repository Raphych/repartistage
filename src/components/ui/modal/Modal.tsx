import { ReactNode, useEffect, useRef } from "react";
import CloseButton from "../buttons/CloseButton";
import useClickOutside from "../../../hooks/useClickOutside";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string | null;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, title = null, children }: ModalProps) {

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleEsc(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        } else {
            document.removeEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    function handleClickOutside(e: MouseEvent) {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    useClickOutside(modalRef, handleClickOutside);

    if (!isOpen) return null;

    return (
        <div className='modal' tabIndex={-1} ref={modalRef}>
            <CloseButton onClick={onClose} />
            {title !== null && <h2>{title}</h2>}
            {children}
        </div>
    );
};
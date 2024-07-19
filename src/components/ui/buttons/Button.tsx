import { ReactNode } from "react";

interface ButtonProps {
    children: string | ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    disabled?: boolean;
}

export default function Button({ onClick, type = "button", className = "", disabled = false, children = "" }: ButtonProps) {
    return (
        <button type={type} onClick={onClick} className={`btn ${className}`} disabled={disabled}>
            {children}
        </button>
    )
}
import { ReactNode } from "react";
import "./MessageBox.css";

interface MessageBoxProps {
    classNames: string;
    children: ReactNode;
}

export default function MessageBox({classNames, children}: MessageBoxProps) {
    return (
        <div className={`message-box ${classNames}`}>
            {children}
        </div>
    )
}
import { ReactNode } from "react";

interface BannerProps {
    children: ReactNode;
    state: 'success' | 'error' | 'warning' | 'info';
    classNames?: string;
}

export default function Banner({state = "info", classNames = '', children}: BannerProps) {
    return <div className={`banner ${state} ${classNames}`}>{children}</div>
}
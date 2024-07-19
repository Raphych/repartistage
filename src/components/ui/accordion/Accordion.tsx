import { useState } from "react";

interface AccordionProps {
    title: string;
    children: React.ReactNode;
}

export default function  Accordion ({ title, children }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
        </div>
        // Accordion implementation
    );
};
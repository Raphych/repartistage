interface TooltipProps {
    content: string; // Text or component to display in the tooltip
    children: React.ReactElement; // The element that the tooltip is attached to
}

export default function Tooltip ({ content, children }: TooltipProps) {
    return (
        <div></div>
        // Tooltip implementation
    );
};
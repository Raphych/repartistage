interface CloseButtonProps {
    onClick: () => void;
}

export default function CloseButton({ onClick }: CloseButtonProps) {
    return (
        <button type="button" onClick={onClick} className="btn-close">
            x
        </button>
    )
}
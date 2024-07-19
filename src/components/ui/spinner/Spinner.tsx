import "./Spinner.css";

interface SpinnerProps {
    size?: number; // Size of the spinner (optional)
}

export default function Spinner ({ size = 24 }: SpinnerProps) {
    return (
        <span className="loader"></span>
    );
};
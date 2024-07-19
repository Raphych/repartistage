import { useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
    const error = useRouteError()
    function errorMessage() {
        switch (error) {
            case 404: return "404 Not Found";
            case 500: return "Server Error";
            default: return "Error"
        }
    }
    return (
        <div className="error-message">
            {
                errorMessage()
            }
        </div>
    )
}
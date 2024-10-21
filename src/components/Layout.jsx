import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

export default function Layout({ children }) {
    return (
        <div>
            <AppHeader />
            <div className="py-4 px-4">
                {children}
            </div>
            <AppFooter />
        </div>
    )
}
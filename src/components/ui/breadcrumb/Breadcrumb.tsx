import { Link } from "react-router-dom";

interface BreadcrumbProps {
    items: { label: string; link?: string }[];
}

export default function Breadcrumb ({ items }: BreadcrumbProps) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {items.map((item, index) => (
                    <li key={index} className="breadcrumb-item">
                        {item.link ? (
                            <Link to={item.link}>{item.label}</Link>
                        ) : (
                            <span>{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
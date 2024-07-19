import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">
                            {/* <img src={home_icon} alt="home"/> */}
                            Home
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
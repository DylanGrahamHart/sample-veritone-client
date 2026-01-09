import { Link } from "react-router";

export function Header() {
    return (
        <div id="header">
            <ul>
                <li>
                    <Link to="/">Shopping List</Link>
                </li>
                <li className="dev-dashboard-link">
                    <Link to="/dev-dashboard">Dev</Link>
                </li>
            </ul>
        </div>
    );
}


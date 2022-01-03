import './styles.css';
import { Logo } from "../Logo/Logo";
import { Navigation } from "../Navigation/Navigation";

export const Header = () => {
    return (
    <div className="header">
        <Logo />
        <Navigation />
    </div>
    );
};
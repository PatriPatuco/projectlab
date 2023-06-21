import { Link } from "react-router-dom";
import equipo from "../images/Equipo_palique.svg";
const Header = () => {
  return (
    <header className="header">
      <section className="header__logo">
        <Link to="/" className="header__link">
          <i class="header__logo fa-solid fa-virus"></i>
        </Link>
        <Link to="/" className="header__name">
          <p>ProjectLab</p>
        </Link>
      </section>
      <nav>
        <ul className="header__menu">
          <Link to="/" className="header__menu--item">
            <li>Home</li>
          </Link>
          <Link to="/" className="header__menu--item">
            <li>Projects</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

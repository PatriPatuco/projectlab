import { Link } from "react-router-dom";
import user from "../images/user-image.png";
import Card from "./Preview/Card";
import "../styles/app.scss";
import { useEffect, useState } from "react";
import api from "../services/Api";

const Landing = () => {
  const [allCards, setAllCards] = useState([]);

  useEffect(() => {
    api.dataApiBD().then((data) => {
      setAllCards(data);
      console.log(data);
    });
  }, []);

  const render = "https://projectlab.onrender.com";
  /*  const render = "//localhost:4000"  */
  const renderCards = () => {
    return allCards.map((data) => {
      return (
        <a
          href={`${render}/projects/${data.idprojects}`}
          className="card-links"
        >
          {" "}
          <Card
            className={"preview__card--autor--img"}
            data={data}
            defaultAvatar={user}
          />{" "}
        </a>
      );
    });
  };
  return (
    <main className="landingPage">
      <section className="landingPage__hero">
        <i class="landingPage__logo fa-solid fa-virus"></i>
        <h1 className="landingPage__title">ProjectLab</h1>
        <h2 className="landingPage__subtitle">
          Encuentra la idea perfecta entre miles de proyectos
        </h2>
      </section>

      <section className="landingPage__btns">
        <Link to="/CreateCard">
          <button className="landingPage__btn">crear proyecto</button>
        </Link>
      </section>

      <section className="landingPage__projects-list">{renderCards()}</section>
    </main>
  );
};

export default Landing;

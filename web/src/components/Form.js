import GetAvatar from "./GetAvatar";
import { Link } from "react-router-dom";
import "../styles/app.scss";

const Form = ({
  data,
  handleInput,
  url,
  handleClickCreateCard,
  isError,
  updateAvatar,
  updateProjectImg,
  handleResetEvent,
  message,
}) => {
  return (
    <section className="form">
      <Link to="/" className="form__back-btn">
        <p>⬅ Volver</p>
      </Link>
      <h2 className="form__title">Información</h2>
      <p className="form__subtitle">Cuéntanos sobre el proyecto</p>

      <fieldset className="form__project">
        <label className="form__label" htmlFor="name">
          Nombre del proyecto<span className="span"> *</span>
        </label>
        <input
          className="form__input"
          type="text"
          placeholder="Ej: Elegant Workspace"
          name="name"
          id="name"
          value={data.name}
          onInput={handleInput}
        />
        <p className="form__message"> {message.name}</p>
        <input
          className="form__input"
          type="text"
          name="slogan"
          id="slogan"
          placeholder="Ej: Diseños Exclusivos"
          value={data.slogan}
          onChange={handleInput}
          pattern="/^[A - ZÁ - üñÑ]+$/i"
        />
        <p className="form__message"> {message.slogan}</p>
        <div className="form__project--links">
          <label className="form__label" htmlFor="repo">
            Repositorio<span className="span"> *</span>
          </label>
          <input
            className="form__inputLinks"
            type="text"
            name="repo"
            id="repo"
            placeholder="Ej: https://github.com/User/projectlab"
            value={data.repo}
            onInput={handleInput}
          />
          <p className="form__message"> {message.repo}</p>
          <label className="form__label" htmlFor="demo">
            Demo<span className="span"> *</span>
          </label>
          <input
            className="form__inputLinks"
            type="text"
            placeholder="http://myweb.com"
            name="demo"
            id="demo"
            value={data.demo}
            onChange={handleInput}
            pattern="/^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/"
          />
          <p className="form__message"> {message.demo}</p>
        </div>
        <label className="form__label" htmlFor="technologies">
          Tecnologías<span className="span"> *</span>
        </label>
        <input
          className="form__input"
          type="text"
          placeholder="Ej: React - SCSS - MongoDB"
          name="technologies"
          id="technologies"
          value={data.technologies}
          onChange={handleInput}
          pattern="/^[A - ZÁ - üñÑ]+$/i"
        />
        <p className="form__message"> {message.technologies}</p>
        <textarea
          className="form__textarea"
          type="text"
          placeholder="Ej: Consigue tus propios diseños exclusivos con tan sólo un par de clicks."
          name="desc"
          id="desc"
          value={data.desc}
          onChange={handleInput}
        ></textarea>
        <p className="form__message"> {message.desc}</p>
      </fieldset>

      <fieldset className="form__autor">
        <label className="form__label" htmlFor="autor">
          Nombre autora<span className="span"> *</span>
        </label>
        <input
          className="form__input"
          type="text"
          placeholder="Ej: Emmelie Björklund"
          name="autor"
          id="autor"
          value={data.autor}
          onChange={handleInput}
          pattern="/^[A - ZÁ - üñÑ]+$/i"
        />
        <p className="form__message"> {message.autor}</p>
        <input
          className="form__input"
          type="text"
          placeholder="Ej: Full Stack Developer"
          name="job"
          id="job"
          value={data.job}
          onChange={handleInput}
          pattern="/^[A - ZÁ - üñÑ]+$/i"
        />
        <p className="form__message"> {message.job}</p>
      </fieldset>

      <section className="form__btn">
        <GetAvatar
          value={"Imagen del proyecto"}
          className={"form__btn"}
          updateAvatar={updateProjectImg}
        />
        <GetAvatar
          value={"Subir foto de autora"}
          className={"form__btn"}
          updateAvatar={updateAvatar}
        />
        <button className="form__btn--card" onClick={handleClickCreateCard}>
          <i class="form__btn--icon fa-solid fa-plus"></i>
          Crear Proyecto
        </button>
        <button className="form__btn--reset" onClick={handleResetEvent}>
          {" "}
          <i class="form__btn--icon fa-solid fa-rotate-right"></i>
          <p>Empezar de nuevo</p>
        </button>
      </section>

      <section className="form__create-message">
        <div className={`form__success-message ${message.type === "success" ? "show" : "hide"}`}>
          <h3 className="form__success-message--title">
            La tarjeta ha sido creada:
          </h3>
          <div className="form__success-message--box">
            <a className="form__success-message--link" href={url}>
              <i class="fa-solid fa-copy"></i>
              {url}
            </a>
          </div>
        </div>

        <div className={`form__error-message ${isError ? "show" : "hide"}`}>
          <h3 className="form__error-message--title">Error:</h3>
          <div className="form__error-message--box">
            <i class="fa-solid fa-circle-exclamation"></i>
            {url}
            <p>{isError}</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Form;

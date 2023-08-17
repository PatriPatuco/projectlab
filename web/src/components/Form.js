import GetAvatar from "./GetAvatar";
import { Link } from "react-router-dom";
import "../styles/app.scss";

const Form = ({
  data,
  handleInput,
  url,
  handleClickCreateCard,
  updateAvatar,
  updateProjectImg,
  handleResetEvent,
  inputMessage,
  isError,
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
        {((isError === "Faltan datos por rellenar" && data.desc === "") ||
          inputMessage.desc) && (
          <p className="form__message">
            {isError === "Faltan datos por rellenar" && data.name === ""
              ? "Este campo es obligatorio"
              : inputMessage.desc}
          </p>
        )}
        <input
          className="form__input"
          type="text"
          name="slogan"
          id="slogan"
          placeholder="Ej: Diseños Exclusivos"
          value={data.slogan}
          onChange={handleInput}
          pattern="^[A-Za-zñÑáéíóúÁÉÍÓÚüÜïÏç.,-_\s]*$"
        />
        <p className="form__message">
          {isError === "Faltan datos por rellenar" && data.slogan === ""
            ? "Este campo es obligatorio"
            : inputMessage.slogan}
        </p>
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
          <p className="form__message">
            {isError === "Faltan datos por rellenar" && data.repo === ""
              ? "Este enlace no es válido. No olvides añadir HTTP: o HTTPS:"
              : inputMessage.repo}
          </p>
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
          <p className="form__message">
            {isError === "Faltan datos por rellenar" && data.demo === ""
              ? "Este enlace no es válido. No olvides añadir HTTP: o HTTPS:"
              : inputMessage.demo}
          </p>
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
          pattern="^[A-Za-zñÑáéíóúÁÉÍÓÚüÜïÏç.,-_\s]*$"
        />
        <p className="form__message">
          {isError === "Faltan datos por rellenar" && data.technologies === ""
            ? "Este campo es obligatorio"
            : inputMessage.technologies}
        </p>
        <textarea
          className="form__textarea"
          type="text"
          placeholder="Ej: Consigue tus propios diseños exclusivos con tan sólo un par de clicks."
          name="desc"
          id="desc"
          value={data.desc}
          onChange={handleInput}
        ></textarea>
        <p className="form__message">
          {isError === "Faltan datos por rellenar" && data.desc === ""
            ? "Este campo es obligatorio"
            : inputMessage.desc}
        </p>
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
          pattern="^[A-Za-zñÑáéíóúÁÉÍÓÚüÜïÏç.,-_\s]*$"
        />
        <p className="form__message">
          {isError === "Faltan datos por rellenar" && data.autor === ""
            ? "Este campo es obligatorio"
            : inputMessage.autor}
        </p>
        <input
          className="form__input"
          type="text"
          placeholder="Ej: Full Stack Developer"
          name="job"
          id="job"
          value={data.job}
          onChange={handleInput}
          pattern="^[A-Za-zñÑáéíóúÁÉÍÓÚüÜïÏç.,-_\s]*$"
        />
        <p className="form__message">
          {isError === "Faltan datos por rellenar" && data.job === ""
            ? "Este campo es obligatorio"
            : inputMessage.job}
        </p>
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
        {isError === "La tarjeta ha sido creada" && (
          <div className="form__success-message">
            <h3 className="form__success-message--title">
              La tarjeta ha sido creada:
            </h3>
            <div className="form__success-message--box">
              <a className="form__success-message--link" href={url}>
                <i className="fa-solid fa-copy"></i>
                <p>{url}</p>
              </a>
            </div>
          </div>
        )}

        {isError === "Faltan datos por rellenar" && (
          <div className="form__error-message">
            <h3 className="form__error-message--title">Error:</h3>
            <div className="form__error-message--box">
              <i className="fa-solid fa-circle-exclamation"></i>
              <p>{isError}</p>
            </div>
          </div>
        )}
      </section>
    </section>
  );
};

export default Form;

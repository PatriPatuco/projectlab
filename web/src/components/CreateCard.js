import ImgCard from "./Preview/ImgCard";
import Card from "./Preview/Card";
import Form from "./Form";
import Header from "./Header";
import cover from "../images/cover.jpeg";
import user from "../images/user-image.png";
import { useState } from "react";
import api from "../services/Api.js";
import "../styles/app.scss";
import ls from "../services/LocalStorage";

const CreateCard = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(
    ls.get("card", {
      name: "",
      slogan: "",
      repo: "",
      demo: "",
      technologies: "",
      desc: "",
      autor: "",
      job: "",
      image: "",
      photo: "",
    })
  );

  const defaultCard = {
    name: "",
    slogan: "",
    repo: "",
    demo: "",
    technologies: "",
    desc: "",
    autor: "",
    job: "",
    image: "",
    photo: "",
  }

  const [isError, setIsError] = useState('');
  const [message, setMessage] = useState({})

  const updateAvatar = (avatar) => {
    setData({ ...data, photo: avatar });
  };

  const updateProjectImg = (avatar) => {
    setData({ ...data, image: avatar });
  };

  const handleInput = (ev) => {
    const inputValue = ev.target.value;
    const inputName = ev.target.name;
    const textValidation = /^[A-Za-zñÑáéíóúÁÉÍÓÚüÜïÏç.,-_\s]*$/;
    const linkValidation =
      /^((https?|ftp|file):\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (inputName === "name") {
      setData({ ...data, name: inputValue });
      if (inputValue === '') {
        setMessage({
          ...message,
          [inputName]: `Este campo es obligatorio`,
        });
      } else {
        setMessage({
          ...message,
          [inputName]: ``,
        });
      }
    } else if (inputName === "slogan") {
      setData({ ...data, slogan: inputValue });
      if (inputValue === '') {
        setMessage({
          ...message,
          [inputName]: `Este campo es obligatorio`,
        });
      } else {
        setMessage({
          ...message,
          [inputName]: ``,
        });
      }
    } else if (inputName === "repo") {
      setData({ ...data, repo: inputValue });
      if (!linkValidation.test(inputValue)) {
        setMessage({
          ...message,
          [inputName]: `Este enlace no es válido. No olvides añadir HTTP: o HTTPS:`,
        });
      } else {
        setMessage({
          ...message,
          [inputName]: ``,
        });
      }
    } else if (inputName === "demo") {
      setData({ ...data, demo: inputValue });
      if (!linkValidation.test(inputValue)) {
        setMessage({
          ...message,
          [inputName]: `Este campo es obligatorio con un enlace HTTP: o HTTPS:`,
        });
      } else {
        setMessage({
          ...message,
          [inputName]: ``,
        });
      }
    } else if (inputName === "technologies") {
      setData({ ...data, technologies: inputValue });
      if (inputValue === '') {
        setMessage({
          ...message,
          [inputName]: `Este campo es obligatorio`,
        });
      } else {
        setMessage({
          ...message,
          [inputName]: ``,
        });
      }
    } else if (inputName === "desc") {
      setData({ ...data, desc: inputValue });
      if (inputValue === '') {
        setMessage({
          ...message,
          [inputName]: `Este campo es obligatorio`,
        });
      } else {
        setMessage({
          ...message,
          [inputName]: ``,
        });
      }
    } else if (inputName === "autor" && textValidation.test(inputValue)) {
      setData({ ...data, autor: inputValue });
      if (inputValue === '') {
        setMessage({
          ...message,
          [inputName]: `Este campo es obligatorio`,
        });
      } else {
        setMessage({
          ...message,
          [inputName]: ``,
        });
      }
    } else if (inputName === "job" && textValidation.test(inputValue)) {
      setData({ ...data, job: inputValue });
      if (inputValue === '') {
        setMessage({
          ...message,
          [inputName]: `Este campo es obligatorio`,
        });
      } else {
        setMessage({
          ...message,
          [inputName]: ``,
        });
      }
    }
  };


  /* const handleClickCreateCard = (ev) => {
    ev.preventDefault();
    console.log(data);
    api.dataApi(data).then((info) => {
      console.log(info);// info es igual a data.cardURL
      if (info === undefined) {
        console.log(info.error)
        setIsError(`Ocurrió un error inesperado ${info.error}`);
      }
      else {
        setUrl(info);
        setIsError('La tarjeta ha sido creada');
      }
    });
  }; */

/* const handleClickCreateCard = (ev) => {
  ev.preventDefault();
  console.log(data);
  api.dataApi(data)
  .then((responseData) => {
   if (responseData && responseData.cardURL) {
     setUrl(responseData.cardURL);
     setIsError(""); // Limpia el mensaje de error
     setMessage({
       type: "success",
       text: "La tarjeta ha sido creada.",
     });
   } else if (responseData && responseData.error) {
     // Verifica si responseData tiene la propiedad error
     setIsError(`Ocurrió un error inesperado ${responseData.error}`);
     setMessage({
       type: "error",
       text: `Ocurrió un error inesperado ${responseData.error}`,
     });
   } else {
     setIsError(`Ocurrió un error inesperado`);
     setMessage({
       type: "error",
       text: `Ocurrió un error inesperado`,
     });
   }

  });
}; */

const handleClickCreateCard = (ev) => {
  ev.preventDefault();
  console.log(data);

  // Realizar verificación adicional de campos vacíos aquí
  if (
    data.name === "" ||
    data.slogan === "" ||
    data.demo === "" ||
    data.repo === "" ||
    data.technologies === "" ||
    data.desc === "" ||
    data.image === "" ||
    data.photo === "" ||
    data.autor === "" ||
    data.job === ""
  ) {
    setIsError("Todos los campos son obligatorios");
    return;
  }

  api.dataApi(data).then((responseData) => {
    if (responseData && responseData.cardURL) {
      setUrl(responseData.cardURL);
      setIsError(""); // Limpia el mensaje de error
      setMessage({
        type: "success",
        text: "La tarjeta ha sido creada.",
      });
    } else {
      setIsError(`Ocurrió un error inesperado ${responseData.error}`);
      setMessage({
        type: "error",
        text: `Ocurrió un error inesperado ${responseData.error}`,
      });
    }
  });
};



  const handleResetEvent = (ev) => {
    ev.preventDefault();
    console.log('reset');
    setData(defaultCard);
    ls.remove('cards');
    setUrl('');
    setIsError('');
  }

  return (
    <main className="main">
      <Header />
      <section className="preview">
        <ImgCard
          className={"preview__cover-img"}
          data={data}
          defaultAvatar={cover}
        />
        <div className="preview__card-position">
          <Card
            className={"preview__card--autor--img"}
            data={data}
            defaultAvatar={user}
          />
        </div>
      </section>
      <Form
        data={data}
        handleInput={handleInput}
        handleClickCreateCard={handleClickCreateCard}
        url={url}
        isError={isError}
        updateAvatar={updateAvatar}
        updateProjectImg={updateProjectImg}
        handleResetEvent={handleResetEvent}
        message={message}
      />
    </main>

  );
};

export default CreateCard;



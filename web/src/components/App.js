import "../styles/app.scss"
import { Route, Routes } from "react-router-dom";
import CreateCard from "./CreateCard";
import Landing from "./Landing";
import Details from "./Details";


function App({ data, defaultAvatar }) {



  return (
    <div className="container">
      <Routes>
        <Route
          path="/Details"
          element={<Details data={data} defaultAvatar={defaultAvatar} />}
        >
          {" "}
        </Route>
        <Route
          path="/"
          element={<Landing data={data} defaultAvatar={defaultAvatar} />}
        ></Route>
        <Route
          path="/CreateCard"
          element={<CreateCard data={data} defaultAvatar={defaultAvatar} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

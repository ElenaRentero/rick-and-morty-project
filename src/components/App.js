import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation, matchPath } from "react-router";
import "../styles/App.scss";
import "../styles/core/Reset.scss";
import fetchData from "../services/api";
import CharacterList from "../components/Characters/CharacterList";
import CharacterDetail from "../components/Characters/CharacterDetail";
import Form from "../components/Filters/Form";
import PageNotFound from "./PageNotFound";
import ls from "../services/localStorage";

function App() {
  // Variables estado
  const [allCharacters, setAllCharacters] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterSpecie, setFilterSpecie] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // UseEffect: llamada a la API

  useEffect(() => {
  fetchData().then((data) => {
    setAllCharacters(data);
  });
}, []);

  // Reciben los criterios de filtrado
  const filterByName = (value) => {
    ls.set('Name', value);
    setFilterName(value);
  };

  const filterBySpecie = (value) => {
    ls.set('Specie', value);
    setFilterSpecie(value);
  };

  const filterByStatus = (value) => {
    ls.set('Status', value);
    setFilterStatus(value);
  };

  const handleReset = () => {
    setFilterName('');
    setFilterSpecie('All');
    setFilterStatus('All');
    ls.clear();
  }

  // Filtran el array según los input
  const charactersFiltered = allCharacters
    .filter((eachCharacter) =>
      eachCharacter.name.toLowerCase().includes(filterName.toLowerCase()))
    .filter((eachCharacter) =>
      filterSpecie === "All" ? true : eachCharacter.species === filterSpecie)
    .filter((character) => filterStatus === "All" ? true : character.status === filterStatus)

  // Rutas
  const { pathname } = useLocation();
  const routeData = matchPath("/CharacterDetail/:characterId", pathname);
  const characterId = routeData !== null ? routeData.params.characterId : "";

  const foundCharacter = (id) => { return allCharacters.find(
    (character) => character.id === parseInt(characterId)
  )};

  //Return
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Form
                filterName={filterName}
                filterByName={filterByName}
                filterSpecie={filterSpecie}
                filterBySpecie={filterBySpecie}
                filterStatus={filterStatus}
                filterByStatus={filterByStatus}
                handleReset={handleReset}
              />
              {charactersFiltered.length > 0 ? (
                <CharacterList charactersFiltered={charactersFiltered} />
              ) : (
                <h4 className="text">
                  Ningún resultado coincide con su búsqueda.
                </h4>
              )}
            </>
          }
        />
        <Route
          path="/CharacterDetail/:characterId"
          element={<CharacterDetail character={foundCharacter}/>}
        />
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </div>
  );
}

export default App;

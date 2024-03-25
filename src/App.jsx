import "bootstrap/dist/css/bootstrap.min.css";
import NavbarCustom from "./Components/NavbarCustom.jsx";
import CharacterList from "./Components/CharacterList.jsx";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import CharacterDetails from "./Components/CharacterDetails.jsx";
import EpisodesList from "./Components/EpisodesList.jsx";

function App() {
  const [charcters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [episodes, setEpisodes] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        setCharacters(data.results.slice(0, 5));
        setIsLoading(false);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
    fetchData();
  }, [query]);

  const selectCharacterHandler = (id) => {
    setSelectedCharacterId((prev) => (prev === id ? null : id));
  };

  console.log("selected id from APP : ", selectedCharacterId);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <NavbarCustom setQuery={setQuery} />

      <div className="container">
        <div className="row p-0 m-0">
          <div className="col-12 col-sm-5">
            <CharacterList
              charcters={charcters}
              setCharacters={setCharacters}
              isLoading={isLoading}
              selectCharacterHandler={selectCharacterHandler}
              selectedCharacterId={selectedCharacterId}
            />
          </div>
          <div className="col-12 col-sm-7">
            <CharacterDetails
              selectedCharacterId={selectedCharacterId}
              setEpisodes={setEpisodes}
            />
            <EpisodesList
              selectedCharacterId={selectedCharacterId}
              episodes={episodes}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

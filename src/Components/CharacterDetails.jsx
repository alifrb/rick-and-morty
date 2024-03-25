import { RxDotFilled } from "react-icons/rx";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import LoadingSpinner from "./Loading/Loading";

const CharacterDetails = ({ selectedCharacterId, setEpisodes }) => {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedCharacterId}`
        );
        setCharacter(data);
        setIsLoading(false);

        console.log("aidin", data);

        const episodesId = data.episode.map((ep) => ep.split("/").at(-1));

        const { data: episodesData } = await axios.get(
          `https://rickandmortyapi.com/api/location/${episodesId}`
        );

        console.log("ali", [episodesData]);
        setEpisodes([episodesData].flat().slice(0, 5));
      } catch (error) {
        setIsLoading(true);
        toast.error(error.response.data.error);
      }
    }

    if (selectedCharacterId) {
      fetchData();
    }
  }, [selectedCharacterId]);

  if (isLoading) {
    return (
      <div className="row w-100 mt-3   justify-content-center align-items-center">
        <LoadingSpinner />
      </div>
    );
  }

  // important Block
  if (selectedCharacterId === null || character === null) {
    return;
  }

  return (
    <div className="row w-100 character-details-section">
      <div className="col-4">
        <img
          className="character-details-image"
          src={character.image}
          alt="asd"
        />
      </div>
      <div className="col-8">
        <div className="row mb-3">
          <div className="col-12 caracter-details-name">{character.name}</div>
          <div className="col-12">
            <RxDotFilled
              style={{ color: character.status == "Alive" ? "0e0" : "red" }}
            />{" "}
            {character.status} - {character.species}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 m-0">
            <p className="m-0" style={{ color: "#ccc" }}>
              Last Known Location :{" "}
            </p>
          </div>
          <div className="col-12 m-0">{character.location.name}</div>
        </div>
        <div className="row">
          <div className="col-8">
            {true ? (
              <div className="w-100 p-0 m-0 d-flex flex-row justify-content-start align-items-center">
                <span style={{ color: "#fff", paddingRight: "10px" }}>
                  Already Added to Favourites
                </span>
                <AiOutlineCheckCircle
                  style={{ fontSize: "22px", color: "0d0" }}
                />
              </div>
            ) : (
              <p
                className="add-to-fav-btn btn"
                onClick={() => addToFavourites(character)}
              >
                Add to Favorites
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;

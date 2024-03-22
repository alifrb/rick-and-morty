import { RxDotFilled } from "react-icons/rx";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useEffect, useState } from "react";
import Loading from "./Loading/Loading";

const CharacterList = ({
  charcters,
  isLoading,
  selectCharacterHandler,
  selectedCharacterId,
}) => {
  if (isLoading) {
    return (
      <div className="mt-3">
        <Loading />
      </div>
    );
  }

  return (
    <div className="row w-100 p-0 m-0">
      {charcters.map((character) => (
        <Character
          key={character.id}
          character={character}
          selectCharacterHandler={selectCharacterHandler}
          selectedCharacterId={selectedCharacterId}
        />
      ))}
    </div>
  );
};

export default CharacterList;

export const Character = ({
  character,
  selectCharacterHandler,
  selectedCharacterId,
}) => {
  return (
    <div className="row w-100 character-list-row">
      <div className="col-2">
        <img
          src={character.image}
          className="character-list-img"
          alt={character.name}
        />
      </div>
      <div className="col-8">
        <div className="col-12">{character.name}</div>
        <div className="col-12">
          <span>
            <RxDotFilled
              style={{ color: character.status === "Alive" ? "0e0" : "red" }}
            />
          </span>
          <span>{character.status}</span> - <span>{character.species}</span>
        </div>
      </div>
      <div className="col-2 d-flex justify-content-center align-items-center">
        {selectedCharacterId == character.id ? (
          <HiOutlineEyeOff
            style={{ color: "red", fontSize: "22px" }}
            onClick={() => {
              selectCharacterHandler(character.id);
            }}
          />
        ) : (
          <HiOutlineEye
            style={{ color: "red", fontSize: "22px" }}
            onClick={() => {
              selectCharacterHandler(character.id);
            }}
          />
        )}
      </div>
    </div>
  );
};

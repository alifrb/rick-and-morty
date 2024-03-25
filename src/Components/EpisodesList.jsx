import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "./Loading/Loading";

const EpisodesList = ({ episodes, selectedCharacterId }) => {
  if (!episodes) return;

  if (selectedCharacterId === null || episodes === null) {
    return;
  }  

  return (
    <div className="row w-100 episodes-list-section">
      <div className="col-12 mb-2">
        <p className="p-0 m-0" style={{ fontSize: "18px", fontWeight: "800" }}>
          List of Episodes
        </p>
      </div>
      <div className="col-12">
        {console.log(episodes)}
        {episodes.map((episode) => (
          <Episode key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
};

export default EpisodesList;

const Episode = ({ episode }) => {
  return (
    <div className="row w-100 p-0 m-0">
      <div className="col-8">
        <span>{episode.id}</span>
        <span>&nbsp;&nbsp;{episode.name}</span>
      </div>
      <div className="col-4">
        <p className="air-date-back">{episode.air_date}</p>
      </div>
    </div>
  );
};

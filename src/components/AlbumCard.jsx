import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentSong } from "../redux//reducers/SongsSlice";

const AlbumCard = ({ songInfo }) => {
  const dispatch = useDispatch();

  const handlePlaySong = () => {
    dispatch(setCurrentSong(songInfo));
  };

  return (
    <div className="col text-center pointer" id={songInfo.id} onClick={handlePlaySong}>
      <img className="img-fluid" src={songInfo.album.cover_medium} alt={songInfo.title} />
      <p>
        Track: "{songInfo.title.length < 16 ? songInfo.title : `${songInfo.title.substring(0, 16)}...`}"
        <br />
        Artist: {songInfo.artist.name}
      </p>
    </div>
  );
};

export default AlbumCard;

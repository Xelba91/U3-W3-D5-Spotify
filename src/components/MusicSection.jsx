import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMusicSection } from "../redux/reducers/MusicSlice"; // Aggiorna il percorso se necessario
import { fetchSongs } from "../redux/reducers/SongsSlice"; // Aggiorna il percorso se necessario
import AlbumCard from "./AlbumCard";
import { Col, Row } from "react-bootstrap";

function MusicSection({ genre, isSearchResult }) {
  const dispatch = useDispatch();
  const musicData = useSelector((state) => (isSearchResult ? state.song.searchResults : state.music.sections[genre]));

  useEffect(() => {
    if (isSearchResult) {
      dispatch(fetchSongs(genre));
    } else {
      dispatch(fetchMusicSection({ genre }));
    }
  }, [genre, isSearchResult, dispatch]);

  const sliceAlbumsToShow = (albums, limit) => {
    return isSearchResult ? albums : albums.slice(0, limit);
  };

  return (
    <Row className="justify-content-center align-items-center">
      <Col xs={10}>
        <div id={genre}>
          <h2 className="text-light">{genre}</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
            {musicData &&
              sliceAlbumsToShow(musicData, 12).map((songInfo) => <AlbumCard key={songInfo.id} songInfo={songInfo} />)}
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default MusicSection;

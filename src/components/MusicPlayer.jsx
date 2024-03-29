import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Image, ProgressBar, Button } from "react-bootstrap";
import { play, pause, next, preview, shuffle, repeat } from "../redux/reducers/SongsSlice";
import { Pause } from "react-bootstrap-icons";

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.song);
  const audioRef = useRef(new Audio());
  const [likedSongs, setLikedSongs] = useState({});

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.preview;
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.error("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong, isPlaying]);

  const handlePlay = () => {
    dispatch(play());
  };

  const handlePause = () => {
    dispatch(pause());
  };

  const handleNext = () => {
    dispatch(next());
  };

  const handlePreview = () => {
    dispatch(preview());
  };

  const handleShuffle = () => {
    dispatch(shuffle());
  };

  const handleRepeat = () => {
    dispatch(repeat());
  };

  const handleLikeClick = () => {
    setLikedSongs((prevLikedSongs) => {
      return {
        ...prevLikedSongs,
        [currentSong.id]: !prevLikedSongs[currentSong.id],
      };
    });
  };

  return (
    <Container fluid className="fixed-bottom bg-container">
      <Row>
        <Col lg={{ offset: 2 }}>
          <Row className="align-items-center">
            <Col xs={4} md={3} className="d-flex align-items-center">
              {currentSong ? (
                <>
                  <Image
                    className="img align-items-center me-2"
                    style={{ objectFit: "cover", maxHeight: "60px", maxWidth: "60px" }}
                    src={currentSong.album.cover_medium}
                    alt={currentSong.title}
                  />
                  <div className="text-light">
                    <p className="fs-5 d-inline">{currentSong.title}</p>
                    <p className="">{currentSong.artist.name}</p>
                  </div>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className={`bi bi-heart-fill ms-3 ${likedSongs[currentSong.id] ? "opacity-100" : "opacity-50"}`}
                      viewBox="0 0 16 16"
                      onClick={handleLikeClick}
                      style={{ color: likedSongs[currentSong.id] ? "#1ed760" : "currentColor", cursor: "pointer" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                      />
                    </svg>
                  </p>
                </>
              ) : (
                <div className="text-light">No Song Selected...</div>
              )}
            </Col>
            <Col xs={8} md={6}>
              <div className="playerControls d-flex justify-content-around">
                <Button variant="link" onClick={handleShuffle}>
                  <Image src="/assets/img/playerbuttons/shuffle.png" alt="shuffle" />
                </Button>
                <Button variant="link" onClick={handlePreview}>
                  <Image src="/assets/img/playerbuttons/prev.png" alt="prev" />
                </Button>
                {isPlaying ? (
                  <Button variant="link" onClick={handlePause}>
                    <Pause className="text-secondary" style={{ height: "40px", width: "25px" }} />
                  </Button>
                ) : (
                  <Button variant="link" onClick={handlePlay}>
                    <Image src="/assets/img/playerbuttons/play.png" alt="play" />
                  </Button>
                )}
                <Button variant="link" onClick={handleNext}>
                  <Image src="/assets/img/playerbuttons/next.png" alt="next" />
                </Button>
                <Button variant="link" onClick={handleRepeat}>
                  <Image src="/assets/img/playerbuttons/repeat.png" alt="repeat" />
                </Button>
              </div>
              <ProgressBar />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MusicPlayer;

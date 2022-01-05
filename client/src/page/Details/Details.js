import { default as Rate } from "antd/es/rate";
import "antd/es/rate/style/index.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Simular from "../../Components/Simular/Simular";
import ModalTrailer from "../../Components/Trailer/ModalTrailer";
import { API_KEY, BASE_URL } from "../../constans";
import Cast from "../Cast/Cast";
import "./Details.css";

function DetailsMovie() {
  const param = useParams();

  const { media_type, id } = param;

  const [data, setData] = useState({});

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getDetailsMovie = (media_type, id) => {
      fetch(`${BASE_URL}/${media_type}/${id}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((details) => {
          setData(details);
        })
        .catch((err) => console.log(err));
    };

    getDetailsMovie(media_type, id);
  }, [id, media_type]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id, media_type]);

  return (
    <div>
      <div
        className="details"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${
            data && data.backdrop_path
          })`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="details-container">
            <div className="details-poster">
              <img
                className="details-poster-img"
                src={`https://image.tmdb.org/t/p/w500${
                  data && data.poster_path
                }`}
                alt="poster"
              />
            </div>
            <div className="details-info">
              <h1 className="details-info-title">{data.name || data.title}</h1>
              <h3 className="details-overview" style={{textDecoration: "uppercase"}}>overview</h3>
              <p className="details-info-overview">{data.overview}</p>
              <p className="details-info-overview" style={{color: 'red'}}>{data.director}</p>
              <p className="release_date">
                {data.release_date
                  ? `Release date: ${data.release_date}`
                  : `Last episode: ${data.last_air_date}`}
              </p>
              <div className="genres">
                  <ul>
                {data.genres &&
                  data.genres.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                  </ul>
              </div>
              <div className="ratings">
                <Rate allowHalf={true} count={10} value={data && data.vote_average} color="#f1c40f"/>
                {" "}
                <div className="ratings-count">{`(${data.vote_count} vote)`}</div>
              </div>

              <div className="watch">
                <span className="watch-link" onClick={() => setShowModal(true)}>
                  Watch Trailer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <p className="homepage">
          Homepage:{" "}
          <a className="homepage-link" href={data.homepage}>
            {data.homepage}
          </a>
        </p>

        <Cast />
        <Simular />
        {showModal ? (
          <ModalTrailer show={showModal} setShow={setShowModal} />
        ) : null}
      </div>
    </div>
  );
}

export default DetailsMovie;

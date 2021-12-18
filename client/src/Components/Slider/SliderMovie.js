// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import useInnerWidth from "../../Custom/useInnerWidth";
import Skeleton from "../Skeleton/Skeleton";
import "./Slider.css";
import { API_KEY, BASE_URL } from "../../constans";
import { Link } from "react-router-dom";

const SliderMovie = ({ type }) => {
  SwiperCore.use([Navigation]);

  const [movie, setMovie] = useState([]);

  const [loading, setLoading] = useState(true);

  const width = useInnerWidth();

  let item;

  if (width >= 1024) {
    item = 5;
  } else if (width < 1024 && width >= 740) {
    item = 3;
  } else if (width < 740 && width >= 500) {
    item = 2;
  } else {
    item = 1;
  }

  useEffect(() => {
    const getMovie = () => {
      try {
        fetch(
          type === "trending"
            ? `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
            : `${BASE_URL}/movie/${type}?api_key=${API_KEY}`
        )
          .then((res) => res.json())
          .then(async (data) => {
            await setMovie(data.results);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };

    setLoading(true);
    getMovie();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="slider">
      <div className="title">
        <h1 style={{textTransform: 'capitalize'}}>Movie {type}</h1>
        <Link to={`/movie/${type}`}>
          <Button content="View more" />
        </Link>
      </div>
      <Swiper
        navigation
        grabCursor={true}
        spaceBetween={20}
        slidesPerView={item}
      >
        {!loading ? (
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={`/details/movie/${item.id}`}>
                <div className="movie-item">
                  <img
                    className="image-slider"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.original_title}
                  />

                  <p className="movie-title">{item.title}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <div className="grid-layout grid-gap-20px-20px">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default SliderMovie;

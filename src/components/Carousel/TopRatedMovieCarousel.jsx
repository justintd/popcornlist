import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard.jsx";
import "./Carousel.scss";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import Loader from "../Loader/Loader";

function TopRatedCarousel(props) {
  const movies = useSelector((state) => state.movies);
  const config = useSelector((state) => state.config);
  const genres = useSelector((state) => state.genres);
  const shows = useSelector((state) => state.shows);
  const [selection, toggleSelection] = useState(true);
  const media = () => {
    return selection ? movies : shows;
  };
  const genreList = new Map();
  selection
    ? genres.movies.genreList.map((genre) =>
        genreList.set(genre.id, genre.name)
      )
    : genres.shows.genreList.map((genre) =>
        genreList.set(genre.id, genre.name)
      );
  useEffect(() => {
    var topRatedSwiper = new Swiper(".top-rated-swiper", {
      loop: true,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 70,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 90,
        },
        1600: {
          slidesPerView: 6,
          spaceBetween: 110,
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });

  return media().topRated.loading ? (
    <div></div>
  ) : (
    <div className="carousel-container">
      <span className="carousel-title">Top Rated </span>
      <button
        className="toggle-media"
        onClick={() => toggleSelection(!selection)}
      >
        <span style={selection ? { color: "#db3636" } : { color: "#f1e7e3" }}>
          Movies
        </span>{" "}
        <span style={!selection ? { color: "#db3636" } : { color: "#f1e7e3" }}>
          Shows
        </span>
      </button>
      <div className="carousel-wrapper">
        <div className="swiper-container top-rated-swiper">
          <div className="swiper-wrapper">
            {media()
              .topRated.results.slice(0, 10)
              .map((movie) => (
                <MovieCard
                  movie={movie}
                  config={config}
                  genreList={genreList}
                  selection={selection}
                />
              ))}
          </div>
        </div>
        {/* <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div> */}
      </div>
    </div>
  );
}

export default TopRatedCarousel;

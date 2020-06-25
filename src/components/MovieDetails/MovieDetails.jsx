import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestMovie } from "../../redux/actions/index";
import "./MovieDetails.scss";
import { findByLabelText } from "@testing-library/react";

function MovieDetails(props) {
  const { movieId } = useParams();
  const dispatch = useDispatch();

  const config = useSelector((state) => state.config);
  const movie = useSelector((state) => state.movie);
  const moviePoster = `${config.base.images.secure_base_url}${config.base.images.poster_sizes[4]}${movie.poster_path}`;

  useEffect(() => {
    dispatch(requestMovie(movieId));
  }, []);

  return movie.loading ? (
    <div>LOADING...</div>
  ) : (
    <div>
      <div className="movie-wrapper">
        <div className="movie-container">
          <div
            className="movie-poster"
            style={{
              background: `url(${config.base.images.secure_base_url}${config.base.images.poster_sizes[4]}${movie.poster_path}) no-repeat`,
              backgroundSize: "cover",
              borderRadius: "20px",
              minWidth: "400px",
              minHeight: "625px",
              // marginRight: "100px",
            }}
          ></div>
          <div className="movie-text-container">
            <div className="movie-title">{movie.original_title}</div>
            <div className="movie-tagline">{movie.tagline}</div>
            <div className="movie-info">
              <i className="fas fa-star"></i> {movie.vote_average} Rating |
              Science Fiction, Drama {/*CHANGE GENRE*/} | English{" "}
              {/* CHANGE ORIGINAL LANGUAGE */} | {movie.runtime} min.
            </div>
            <div className="movie-extra-details">[ MORE DETAILS HERE ]</div>
            <div className="movie-secondary-title">Synopsis</div>
            <div className="movie-synopsis">{movie.overview}</div>
            <div className="movie-secondary-title">Cast</div>
            <div className="movie-cast"></div>
            <div classname="buttons-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MovieDetails;

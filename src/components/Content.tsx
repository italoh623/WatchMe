import { useEffect, useState } from 'react';
import { MovieCard } from './MovieCard';
import { Header } from './Header';

import GenreResponseInterface from '../model/GenreResponseInterface';
import MovieInterface from '../model/MovieInterface';

import '../styles/content.scss';
import { css } from "@emotion/react";
import { ClipLoader } from 'react-spinners';

interface ContentProps {
  selectedGenre: GenreResponseInterface;
  movies: MovieInterface[];
  isLoading: boolean;
}

export function Content(props: ContentProps) {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseInterface>(props.selectedGenre);
  const [movies, setMovies] = useState<MovieInterface[]>(props.movies);

  useEffect(() => {
    setSelectedGenre(props.selectedGenre);
    setMovies(props.movies);
  }, [props]);

  return (
    <div className="container">
      <Header title={selectedGenre.title} />

      <main>
        <div className="movies-list">
          {!props.isLoading ? movies.map(movie => (
            <MovieCard
              key={movie.Title}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          )) : (
            <div className="spinner">
              <ClipLoader
                color={"#FFFFFF"}
                loading={props.isLoading}
                css={css`
              display: block;
              margin: auto 0;
            `}
                size={100}
              />
            </div>)}
        </div>
      </main>
    </div>
  )
}
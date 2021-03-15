import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import GenreResponseInterface from './model/GenreResponseInterface';
import MovieInterface from './model/MovieInterface';

import { api } from './services/api';

import './styles/global.scss';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseInterface[]>([]);

  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseInterface>({} as GenreResponseInterface);

  useEffect(() => {
    api.get<GenreResponseInterface[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieInterface[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseInterface>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        selectedGenreId={selectedGenreId}
        genres={genres}
        handleClickButton={handleClickButton}
      />

      <Content 
        movies={movies}
        selectedGenre={selectedGenre}
      />
    </div>
  )
}
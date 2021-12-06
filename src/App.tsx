import { useCallback, useEffect, useState } from 'react';

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

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api.get<GenreResponseInterface[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    api.get<MovieInterface[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
      setIsLoading(false);
    });

    api.get<GenreResponseInterface>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        selectedGenreId={selectedGenreId}
        genres={genres}
        handleClickButton={handleClickButton}
      />

      <Content
        isLoading={isLoading}
        movies={movies}
        selectedGenre={selectedGenre}
      />
    </div>
  )
}
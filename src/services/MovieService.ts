//Importing the required files
//Movie — complete movie structure.
//CreateMovie — new movie create chesetappudu kavalsina data, without id.
//UpdateMovie — update cheyadaniki optional fields.
//Genre — allowed genres such as "Action" and "Comedy".
//InMemoryRepository — movie data ni store and retrieve cheyadaniki.
//NotFoundError — requested movie dorakakapothe.
//ValidationError — input data invalid ayithe.
//fakeApiCall — API request laga delay/failure simulate cheyadaniki.
import type { Movie, CreateMovie, UpdateMovie, Genre } from "../types/Movie.js";
import { InMemoryRepository } from "../repository/InMemoryRepository.js";
import { AppError, NotFoundError, ValidationError } from "../errors/AppError.js";
import { fakeApiCall } from "../utils/fakeApi.js";

//Creating the MovieService class
export class MovieService {
  constructor(
    private readonly repository: InMemoryRepository<Movie>
  ) {}

  //Getting all movies

  async getAllMovies(): Promise<Movie[]> {
    return this.repository.getAll();
  }

//Finding a movie by id
  async getMovieById(id: number): Promise<Movie> {
    const movie = await this.repository.getById(id);

    if (!movie) {
      throw new NotFoundError(`Movie with ID ${id} was not found`);
    }

    return movie;
  }

  //Grouping movies by year - reduce()
  groupByYear(movies: Movie[]): Record<number, Movie[]> {
    return movies.reduce<Record<number, Movie[]>>((groups, movie) => {
      if (!groups[movie.year]) {
        groups[movie.year] = [];
      }

      groups[movie.year].push(movie);
      return groups;
    }, {});
  }

  //Finding the top three rated movies
  top3Rated(movies: Movie[]): Movie[] {
    return [...movies]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }

  //Filtering movies by genre
  filterByGenre(movies: Movie[], genre: Genre): Movie[] {
    return movies.filter(movie => movie.genre === genre);
  }

//searching by title
  searchByTitle(movies: Movie[], searchText: string): Movie[] {
    const search = searchText.trim().toLowerCase();

    return movies.filter(movie =>
      movie.title.toLowerCase().includes(search)
    );
  }

  //calculating the average rating

  averageRating(movies: Movie[]): number {
    if (movies.length === 0) {
      return 0;
    }

    const total = movies.reduce(
      (sum, movie) => sum + movie.rating,
      0
    );

    return Number((total / movies.length).toFixed(2));
  }


  //Adding a movie with validation
  async addMovie(data: CreateMovie): Promise<Movie> {
    if (data.title.trim().length === 0) {
      throw new ValidationError("Movie title cannot be empty");
    }

    if (data.rating < 0 || data.rating > 10) {
      throw new ValidationError("Rating must be between 0 and 10");
    }

    return this.repository.create(data);
  }

  //Updating a movie
  async updateMovie(
    id: number,
    data: UpdateMovie
  ): Promise<Movie> {
    await this.getMovieById(id);

    if (data.title !== undefined && data.title.trim().length === 0) {
      throw new ValidationError("Movie title cannot be empty");
    }

    if (
      data.rating !== undefined &&
      (data.rating < 0 || data.rating > 10)
    ) {
      throw new ValidationError("Rating must be between 0 and 10");
    }

    const updatedMovie = await this.repository.update(id, data);

    if (!updatedMovie) {
      throw new NotFoundError(`Movie with ID ${id} was not found`);
    }

    return updatedMovie;
  }

  //Loading the dashboard with asynchronous calls
  async loadDashboard(): Promise<{
    movies: Movie[];
    topRated: Movie[];
    averageRating: number;
  }> {
    const movies = await fakeApiCall(
      await this.getAllMovies()
    );

    const [topRated, averageRating] = await Promise.all([
      fakeApiCall(this.top3Rated(movies)),
      fakeApiCall(this.averageRating(movies))
    ]);

    return {
      movies,
      topRated,
      averageRating
    };
  }
}

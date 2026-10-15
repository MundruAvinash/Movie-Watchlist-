
import moviesData from "./data/movies.json" ;
import type { Movie } from "./types/Movie.js";
import { InMemoryRepository } from "./repository/InMemoryRepository.js";
import { MovieService } from "./services/MovieService.js";
import { debounce } from "./utils/debounce.js";

async function main(): Promise<void> {
  try {
    // 1. Load initial movie data
    const movies = moviesData as Movie[];

    // 2. Create repository
    const repository = new InMemoryRepository<Movie>(movies);

    // 3. Create service
    const movieService = new MovieService(repository);

    // 4. Display all movies
    const allMovies = await movieService.getAllMovies();
    console.log("\n===== ALL MOVIES =====");
    console.log(allMovies);

    // 5. Display the top 3 rated movies
    const topMovies = movieService.top3Rated(allMovies);
    console.log("\n===== TOP 3 RATED MOVIES =====");
    console.log(topMovies);

    // 6. Search movies by title
    const searchResults = movieService.searchByTitle(
      allMovies,
      "inception"
    );
    console.log("\n===== SEARCH RESULTS =====");
    console.log(searchResults);

    // 7. Calculate average rating
    const average = movieService.averageRating(allMovies);
    console.log("\n===== AVERAGE RATING =====");
    console.log(average);

    // 8. Group movies by year
    const groupedMovies = movieService.groupByYear(allMovies);
    console.log("\n===== MOVIES GROUPED BY YEAR =====");
    console.log(groupedMovies);

    // 9. Demonstrate debounce
    const showMessage = debounce((message: string) => {
      console.log("\nDebounced message:", message);
    }, 500);

    showMessage("Movie Manager started");

    // 10. Load dashboard using the simulated API
    console.log("\n===== DASHBOARD =====");
    const dashboard = await movieService.loadDashboard();
    console.log("Total movies:", dashboard.movies.length);
    console.log("Top rated movies:", dashboard.topRated);
    console.log("Average rating:", dashboard.averageRating);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("\nError:", error.message);
    } else {
      console.error("\nAn unknown error occurred.");
    }
  }
}

main();

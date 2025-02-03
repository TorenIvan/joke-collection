# Joke Collection App

## Summary
Joke Collection is a Vue 3 application that allows users to browse, rate, and save their favorite jokes. The app features a clean UI, dynamic joke listing, and interactive features such as favoriting and rating jokes.

## Technologies Used
- **Vue 3**: Chosen for its reactivity, composition API, and efficient rendering.
- **Vite**: Ensures fast build times and an optimized development experience.
- **TypeScript**: Provides type safety and better code maintainability.
- **Tailwind CSS & DaisyUI**: Used for styling with utility-first and component-based design.
- **i18n**: Used for internationalization and toggling between English and Greek.
- **Pinia**: State management for storing and handling favorite jokes. Basically, not needed due to local storage, but anyway! 😆
- **Vue Query**: Efficient data fetching and caching.
- **Axios**: API requests.
- **vue3-toastify**: API error handling; but it could be used for a warning, info or success action as well.

## How to Run the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/TorenIvan/joke-collection.git
   cd joke-collection
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open the app in your browser at `http://localhost:5173/` (default Vite port).

## How to Use
- **Browse Jokes**: The homepage displays a list of jokes, only the setup, fetched from an API; categorized in All, Favorites(your collection), Programming, Dad, and Knock-Knock.
- **View Joke Details**: Click the joke to view the punchline or the play icon on the Favorite list.
- **Favorite Jokes**: Double-click on a joke or press the heart icon to favorite/unfavorite it.
- **Rate Favorite Jokes**: Click on a star rating to rate a joke on the Favorite List. Press the same to remove the rating.
- **Sort Favorite Jokes**: Click on type or setup headers to sort alphabetically or rating to sort numerically.
- **Filter Favorite Jokes**: Click on a star rating above the list to filter by specific rating. Press the same rating to remove the filter.
- **Search Favorite Jokes**: Use the search bar to search jokes by keywords.

## Deployment & Preview
The app is hosted on **GitHub Pages**.
- **Live Demo**: [Joke Collection App](https://TorenIvan.github.io/joke-collection/)
- The deployment is handled via **GitHub Actions**, ensuring automatic updates upon every push to the `master` branch.

---

Enjoy the humor and have fun rating jokes! 😆


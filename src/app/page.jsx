import HomeClient from "./HomeClient";

const featuredSearches = [
  "Bollywood songs",
  "Hindi songs",
  "Punjabi songs",
  "English songs",
  "Trending songs",
  "New releases",
];

export default function Home() {
  return (
    <div>
      <section className="sr-only" aria-label="Hayasaka music streaming">
        <h1>Hayasaka Music - Free Music Streaming and MP3 Download</h1>
        <p>
          Hayasaka is a free music streaming app for Bollywood, Hindi, Punjabi,
          English and regional songs. Listen online, download MP3 tracks, create
          playlists, save favourites, explore albums, and discover artists in a
          fast web music player.
        </p>
        <ul>
          {featuredSearches.map((search) => (
            <li key={search}>{search}</li>
          ))}
        </ul>
      </section>
      <HomeClient />
    </div>
  );
}

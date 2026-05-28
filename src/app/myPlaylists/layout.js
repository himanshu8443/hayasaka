export const metadata = {
  title: "My Playlists",
  description: "Your personal playlists.",
  // Personal user data; never index.
  robots: { index: false, follow: false },
};

export default function MyPlaylistsLayout({ children }) {
  return <>{children}</>;
}

const siteUrl = "https://hayasaka.8man.in";

async function getPlaylistData(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SAAVN_API}/api/playlists?id=${id}&limit=50`,
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const playlistData = await getPlaylistData(params.playlistId);

  if (!playlistData) {
    return {
      title: "Playlist",
      description: "Listen to this playlist on Hayasaka",
    };
  }

  const playlistName = playlistData?.name || "Playlist";
  const songCount = playlistData?.songCount || 0;
  const description = playlistData?.description || "";

  return {
    title: `${playlistName} - Playlist`,
    description: `Listen to ${playlistName} playlist. ${songCount} songs. ${description}. Stream and download all songs for free on Hayasaka.`,
    keywords: [
      playlistName,
      `${playlistName} playlist`,
      `${playlistName} songs`,
      "music playlist",
      "free playlist download",
      "stream playlist",
    ],
    openGraph: {
      title: `${playlistName} Playlist | Hayasaka`,
      description: `Listen to ${playlistName} playlist. ${songCount} songs. Stream and download for free.`,
      url: `${siteUrl}/playlist/${params.playlistId}`,
      siteName: "Hayasaka",
      type: "music.playlist",
      images: playlistData?.image?.[2]?.url
        ? [
            {
              url: playlistData.image[2].url,
              width: 500,
              height: 500,
              alt: playlistName,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${playlistName} Playlist | Hayasaka`,
      description: `Listen to ${playlistName} playlist. ${songCount} songs. Stream and download for free.`,
      images: playlistData?.image?.[2]?.url ? [playlistData.image[2].url] : [],
    },
    alternates: {
      canonical: `${siteUrl}/playlist/${params.playlistId}`,
    },
  };
}

export default function PlaylistLayout({ children }) {
  return <>{children}</>;
}

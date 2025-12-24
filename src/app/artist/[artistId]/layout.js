const siteUrl = "https://hayasaka.8man.in";

async function getArtistData(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SAAVN_API}/api/artists?id=${id}`,
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
  const artistData = await getArtistData(params.artistId);

  if (!artistData) {
    return {
      title: "Artist",
      description: "Listen to this artist on Hayasaka",
    };
  }

  const artistName = artistData?.name || "Artist";
  const fanCount = artistData?.fanCount
    ? `${(artistData.fanCount / 1000000).toFixed(1)}M fans`
    : "";

  return {
    title: `${artistName} Songs - Download & Listen Free`,
    description: `Listen to ${artistName} songs online for free. ${fanCount}. Download ${artistName} mp3 songs, albums, and top hits. Stream all ${artistName} music on Hayasaka.`,
    keywords: [
      artistName,
      `${artistName} songs`,
      `${artistName} mp3`,
      `${artistName} download`,
      `${artistName} albums`,
      `${artistName} hits`,
      `best of ${artistName}`,
      "artist songs download",
    ],
    openGraph: {
      title: `${artistName} - Songs, Albums & Music | Hayasaka`,
      description: `Listen to ${artistName} songs online for free. ${fanCount}. Stream all ${artistName} music and download mp3.`,
      url: `${siteUrl}/artist/${params.artistId}`,
      siteName: "Hayasaka",
      type: "profile",
      images: artistData?.image?.[2]?.url
        ? [
            {
              url: artistData.image[2].url,
              width: 500,
              height: 500,
              alt: artistName,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${artistName} - Songs, Albums & Music | Hayasaka`,
      description: `Listen to ${artistName} songs online for free. Stream and download all ${artistName} music.`,
      images: artistData?.image?.[2]?.url ? [artistData.image[2].url] : [],
    },
    alternates: {
      canonical: `${siteUrl}/artist/${params.artistId}`,
    },
  };
}

export default function ArtistLayout({ children }) {
  return <>{children}</>;
}

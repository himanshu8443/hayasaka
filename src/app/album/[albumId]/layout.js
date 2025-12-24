const siteUrl = "https://hayasaka.8man.in";

async function getAlbumData(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SAAVN_API}/api/albums?id=${id}`,
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
  const albumData = await getAlbumData(params.albumId);

  if (!albumData) {
    return {
      title: "Album",
      description: "Listen to this album on Hayasaka",
    };
  }

  const albumName = albumData?.name || "Album";
  const artistNames = albumData?.primaryArtists || "";
  const songCount = albumData?.songCount || 0;
  const year = albumData?.year || "";

  return {
    title: `${albumName} - ${artistNames}`,
    description: `Listen to ${albumName} by ${artistNames}. ${songCount} songs. Download and stream ${albumName} album for free on Hayasaka. Released in ${year}.`,
    keywords: [
      albumName,
      artistNames,
      `${albumName} album`,
      `${albumName} songs`,
      `${albumName} download`,
      `${artistNames} songs`,
      "album download",
      "free music",
    ],
    openGraph: {
      title: `${albumName} by ${artistNames} | Hayasaka`,
      description: `Listen to ${albumName} by ${artistNames}. ${songCount} songs. Stream and download for free.`,
      url: `${siteUrl}/album/${params.albumId}`,
      siteName: "Hayasaka",
      type: "music.album",
      images: albumData?.image?.[2]?.url
        ? [
            {
              url: albumData.image[2].url,
              width: 500,
              height: 500,
              alt: albumName,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${albumName} by ${artistNames} | Hayasaka`,
      description: `Listen to ${albumName} by ${artistNames}. ${songCount} songs. Stream and download for free.`,
      images: albumData?.image?.[2]?.url ? [albumData.image[2].url] : [],
    },
    alternates: {
      canonical: `${siteUrl}/album/${params.albumId}`,
    },
  };
}

export default function AlbumLayout({ children }) {
  return <>{children}</>;
}

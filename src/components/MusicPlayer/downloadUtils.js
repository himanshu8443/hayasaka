import { getlyricsData } from "@/services/dataAPI";

export const QUALITY_OPTIONS = [
  { label: "12 kbps", index: 0, tag: "12kbps" },
  { label: "48 kbps", index: 1, tag: "48kbps" },
  { label: "96 kbps", index: 2, tag: "96kbps" },
  { label: "160 kbps", index: 3, tag: "160kbps" },
  { label: "320 kbps", index: 4, tag: "320kbps" },
];

export const sanitize = (str) =>
  str
    ?.replace(/&#039;/g, "'")
    ?.replace(/&amp;/g, "&")
    ?.replace(/&quot;/g, '"') || "";

export const getCoverType = (contentType) => {
  const lower = (contentType || "").toLowerCase();
  if (lower.includes("png")) return "image/png";
  if (lower.includes("webp")) return "image/webp";
  return "image/jpeg";
};

export const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const fetchLyricsForDownload = async (
  song,
  lyricsMode = "synced",
  separateLrc = false,
) => {
  if (!song || (lyricsMode === "none" && !separateLrc)) {
    return { embedLyrics: null, lrcContent: null };
  }

  try {
    const data = await getlyricsData(song);
    if (!data) return { embedLyrics: null, lrcContent: null };

    const lrcContent =
      data.syncedLyrics?.trim() || data.plainLyrics?.trim() || null;

    let embedLyrics = null;
    if (lyricsMode === "synced") {
      embedLyrics =
        data.syncedLyrics?.trim() || data.plainLyrics?.trim() || null;
    } else if (lyricsMode === "plain") {
      if (data.plainLyrics?.trim()) {
        embedLyrics = data.plainLyrics.trim();
      } else if (data.syncedLyrics?.trim()) {
        embedLyrics = data.syncedLyrics
          .replace(/\[\d{1,2}:\d{2}(?:\.\d{1,3})?\]/g, "")
          .trim();
      }
    }

    return {
      embedLyrics,
      lrcContent: separateLrc ? lrcContent : null,
    };
  } catch (error) {
    console.error("Error fetching lyrics for download:", error);
    return { embedLyrics: null, lrcContent: null };
  }
};

export const fetchEmbeddableLyrics = async (song, lyricsMode = "synced") => {
  const { embedLyrics } = await fetchLyricsForDownload(song, lyricsMode, false);
  return embedLyrics;
};

export const buildTagInput = (activeSong, lyrics = null) => {
  const primaryArtists = Array.isArray(activeSong?.artists?.primary)
    ? activeSong.artists.primary
    : Array.isArray(activeSong?.artists)
    ? activeSong.artists
    : [];

  const artists =
    primaryArtists
      ?.map((artist) => sanitize(artist?.name))
      ?.filter(Boolean) || [];

  const tags = {
    title: sanitize(activeSong?.name),
    artist: artists.join(", "),
    album: sanitize(activeSong?.album?.name),
    year: activeSong?.year ? Number(activeSong.year) : undefined,
    genre: activeSong?.language ? sanitize(activeSong.language) : undefined,
    comment: activeSong?.copyright ? sanitize(activeSong.copyright) : undefined,
  };

  if (lyrics && typeof lyrics === "string" && lyrics.trim()) {
    tags.lyrics = lyrics.trim();
    tags.LYRICS = lyrics.trim();
  }

  return tags;
};

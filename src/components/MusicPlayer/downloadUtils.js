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

export const buildTagInput = (activeSong) => {
  const artists =
    activeSong?.artists?.primary
      ?.map((artist) => sanitize(artist.name))
      ?.filter(Boolean) || [];

  return {
    title: sanitize(activeSong?.name),
    artist: artists.join(", "),
    album: sanitize(activeSong?.album?.name),
    year: activeSong?.year ? Number(activeSong.year) : undefined,
    genre: activeSong?.language ? sanitize(activeSong.language) : undefined,
    comment: activeSong?.copyright ? sanitize(activeSong.copyright) : undefined,
  };
};

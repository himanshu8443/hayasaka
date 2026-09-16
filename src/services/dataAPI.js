// home page data
export async function homePageData(language) {
  try {
    const lang = Array.isArray(language) ? language.join(",") : language?.toString() || "";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SAAVN_API}/api/modules?language=${encodeURIComponent(lang)}`,
      {
        next: {
          revalidate: 86400,
        },
      },
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log("homePageData error:", error);
    return null;
  }
}

// get song data
export async function getSongData(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SAAVN_API}/api/songs/${id}`,
    );
    if (!response.ok) return null;
    const data = await response.json();
    console.log("song data", data);
    return data?.data;
  } catch (error) {
    console.log("getSongData error:", error);
    return null;
  }
}

// get album data
export async function getAlbumData(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SAAVN_API}/api/albums?id=${id}`,
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log("getAlbumData error:", error);
    return null;
  }
}

// get playlist data
export async function getplaylistData(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SAAVN_API}/api/playlists?id=${id}&limit=50`,
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log("getplaylistData error:", error);
    return null;
  }
}

// get Lyrics data from lrclib.net
export async function getlyricsData(songOrId) {
  try {
    let trackName = "";
    let artistName = "";
    let albumName = "";
    let duration = null;

    if (typeof songOrId === "object" && songOrId !== null) {
      trackName = songOrId.name || songOrId.title || "";
      const primaryArtists = Array.isArray(songOrId?.artists?.primary)
        ? songOrId.artists.primary
        : Array.isArray(songOrId?.artists)
        ? songOrId.artists
        : [];
      artistName =
        primaryArtists?.[0]?.name ||
        (typeof songOrId.artists === "string" ? songOrId.artists : "");
      albumName = songOrId.album?.name || songOrId.album || "";
      if (songOrId.duration) {
        duration = Math.round(Number(songOrId.duration));
      }
    } else if (typeof songOrId === "string") {
      trackName = songOrId;
    }

    // Clean track name: remove HTML entities and trailing version tags
    const cleanTrack = trackName
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/\s*\([^)]*version[^)]*\)/gi, "")
      .replace(/\s*\[[^\]]*version[^\]]*\]/gi, "")
      .trim();

    const cleanArtist = artistName
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&")
      .trim();

    if (!cleanTrack) return null;

    // 1. Try exact match using /api/get
    const params = new URLSearchParams({
      track_name: cleanTrack,
    });
    if (cleanArtist) params.append("artist_name", cleanArtist);
    if (albumName) params.append("album_name", albumName);
    if (duration) params.append("duration", duration.toString());

    let res = await fetch(`https://lrclib.net/api/get?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (data && (data.syncedLyrics || data.plainLyrics || data.instrumental)) {
        return data;
      }
    }

    // 2. If exact get failed, try /api/get without album_name
    if (albumName) {
      const noAlbumParams = new URLSearchParams({
        track_name: cleanTrack,
      });
      if (cleanArtist) noAlbumParams.append("artist_name", cleanArtist);
      if (duration) noAlbumParams.append("duration", duration.toString());
      res = await fetch(`https://lrclib.net/api/get?${noAlbumParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data && (data.syncedLyrics || data.plainLyrics || data.instrumental)) {
          return data;
        }
      }
    }

    // 3. Fallback to /api/search with track_name and artist_name
    const searchParams = new URLSearchParams({
      track_name: cleanTrack,
    });
    if (cleanArtist) searchParams.append("artist_name", cleanArtist);
    res = await fetch(`https://lrclib.net/api/search?${searchParams.toString()}`);
    if (res.ok) {
      const items = await res.json();
      if (Array.isArray(items) && items.length > 0) {
        const withSynced = items.filter((item) => item.syncedLyrics);
        if (withSynced.length > 0) {
          if (duration) {
            withSynced.sort(
              (a, b) =>
                Math.abs((a.duration || 0) - duration) -
                Math.abs((b.duration || 0) - duration)
            );
          }
          return withSynced[0];
        }
        return items[0];
      }
    }

    // 4. Last resort: /api/search with query string
    const q = `${cleanTrack} ${cleanArtist}`.trim();
    res = await fetch(`https://lrclib.net/api/search?q=${encodeURIComponent(q)}`);
    if (res.ok) {
      const items = await res.json();
      if (Array.isArray(items) && items.length > 0) {
        const withSynced = items.filter((item) => item.syncedLyrics);
        return withSynced.length > 0 ? withSynced[0] : items[0];
      }
    }

    return null;
  } catch (error) {
    console.log("getlyricsData error:", error);
    return null;
  }
}

// get artist data
export async function getArtistData(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SAAVN_API}/api/artists?id=${id}`,
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log("getArtistData error:", error);
    return null;
  }
}

// get artist songs
export async function getArtistSongs(id, page) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SAAVN_API}/api/artists/${id}/songs?page=${page}&`,
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log("getArtistSongs error:", error);
    return null;
  }
}

// get artist albums
export async function getArtistAlbums(id, page) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SAAVN_API}/api/artists/${id}/albums?page=${page}`,
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log("getArtistAlbums error:", error);
    return null;
  }
}

// get search data
export async function getSearchedData(query) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SAAVN_API}/api/search?query=${query}`,
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log("getSearchedData error:", error);
    return null;
  }
}

// add and remove from favourite
export async function addFavourite(id) {
  try {
    const response = await fetch("/api/favourite", {
      method: "POST",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Add favourite API error", error);
    return null;
  }
}

// get favourite
export async function getFavourite() {
  try {
    const response = await fetch("/api/favourite");
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data?.favourites;
  } catch (error) {
    console.log("Get favourite API error", error);
    return null;
  }
}

// user info
export async function getUserInfo() {
  try {
    const response = await fetch("/api/userInfo");
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log("Get user info API error", error);
    return null;
  }
}

// reset password
export async function resetPassword(password, confirmPassword, token) {
  try {
    const response = await fetch("/api/forgotPassword", {
      method: "PUT",
      body: JSON.stringify({ password, confirmPassword, token }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Reset password API error", error);
    return null;
  }
}

// send reset password link
export async function sendResetPasswordLink(email) {
  try {
    const response = await fetch("/api/forgotPassword", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Send reset password link API error", error);
    return null;
  }
}

// get  recommended songs
export async function getRecommendedSongs(artistId, songId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SAAVN_API}/api/songs/${songId}/suggestions`,
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log("getRecommendedSongs error:", error);
    return null;
  }
}

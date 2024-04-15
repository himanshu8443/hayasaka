// create playlist
export async function createPlaylist(name) {
  try {
    const response = await fetch(`/api/userPlaylists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Create playlist error", error);
  }
}

// get user playlists
export async function getUserPlaylists() {
  try {
    const response = await fetch(`/api/userPlaylists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Get user playlists error", error);
  }
}

// delete playlist
export async function deletePlaylist(id) {
  try {
    const response = await fetch(`/api/userPlaylists`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playlistId: id,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Delete playlist error", error);
  }
}

// add song to playlist
export async function addSongToPlaylist(playlistID, song) {
  try {
    const response = await fetch(`/api/userPlaylists/songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playlistID,
        song,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Add song to playlist error", error);
  }
}

// delete song from playlist
export async function deleteSongFromPlaylist(playlistID, song) {
  try {
    const response = await fetch(`/api/userPlaylists/songs`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playlistID,
        song,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Delete song from playlist error", error);
  }
}

// get single playlist by id
export async function getSinglePlaylist(id) {
  try {
    const response = await fetch(`/api/userPlaylists/songs?playlist=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Get single playlist error", error);
  }
}


// home page data
export async function homePageData(language){
    try {
    const response = await fetch(`https://saavn.me/modules?language=${language.toString()}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }

}

// get song data
export async function getSongData(id){
    try {
    const response = await fetch(`https://saavn.me/songs?id=${id.toString()}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }

}

// get album data
export async function getAlbumData(id){
    try {
    const response = await fetch(`https://saavn.me/albums?id=${id}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }
}

// get playlist data
export async function getplaylistData(id){
    try {
    const response = await fetch(`https://saavn.me/playlists?id=${id}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }
}

// get Lyrics data
export async function getlyricsData(id){
    try {
    const response = await fetch(`https://saavn.me/lyrics?id=${id}`);
    const data = await response.json();
    return data;
    } catch (error) {
        console.log(error);
    }
}

// get artist data
export async function getArtistData(id){
    try {
    const response = await fetch(`https://saavn.me/artists?id=${id}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }
}

// get artist songs
export async function getArtistSongs(id,page){
    try {
    const response = await fetch(`https://saavn.me/artists/${id}/songs?page=${page}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }
}

// get artist albums
export async function getArtistAlbums(id,page){
    try {
    const response = await fetch(`https://saavn.me/artists/${id}/albums?page=${page}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }
}

// get search data
export async function getSearchedData(query){
    try {
    const response = await fetch(`https://saavn.me/search/all?query=${query}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }
}

// add and remove from favourite
export async function addFavourite(id){
    try {
        const response = await fetch("/api/favourite", {
            method: "POST",
            body: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Add favourite API error",error);
    }
}

// get favourite
export async function getFavourite(){
    try {
        const response = await fetch("/api/favourite");
        const data = await response.json();
        return data?.data?.favourites;
    } catch (error) {
        console.log("Get favourite API error",error);
    }
}

// user info
export async function getUserInfo(){
    try {
        const response = await fetch("/api/userInfo");
        const data = await response.json();
        return data?.data;
    } catch (error) {
        console.log("Get user info API error",error);
    }
}


// reset password
export async function resetPassword(password,confirmPassword, token){
    try {
        const response = await fetch("/api/forgotPassword", {
            method: "PUT",
            body: JSON.stringify({password,confirmPassword, token}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Reset password API error",error);
    }
}

// send reset password link
export async function sendResetPasswordLink(email){
    try {
        const response = await fetch("/api/forgotPassword", {
            method: "POST",
            body: JSON.stringify({email}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Send reset password link API error",error);
    }
}

// get  recommended songs
export async function getRecommendedSongs(artistId, sondId){
    try {
    const response = await fetch(`https://saavn.me/artists/${artistId}/recommendations/${sondId}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }
}

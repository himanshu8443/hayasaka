

export async function homePageData(language){
    try {
    const response = await fetch(`https://saavn.me/modules?language=${language.toString()}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }

}

export async function getSongData(id){
    try {
    const response = await fetch(`https://saavn.me/songs?id=${id.toString()}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }

}

export async function getAlbumData(id){
    try {
    const response = await fetch(`https://saavn.me/albums?id=${id}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getplaylistData(id){
    try {
    const response = await fetch(`https://saavn.me/playlists?id=${id}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getlyricsData(id){
    try {
    const response = await fetch(`https://saavn.me/lyrics?id=${id}`);
    const data = await response.json();
    return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getArtistData(id){
    try {
    const response = await fetch(`https://saavn.me/artists?id=${id}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getArtistSongs(id,page){
    try {
    const response = await fetch(`https://saavn.me/artists/${id}/songs?page=${page}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getArtistAlbums(id,page){
    try {
    const response = await fetch(`https://saavn.me/artists/${id}/albums?page=${page}`);
    const data = await response.json();
    return data?.data;
    } catch (error) {
        console.log(error);
    }
}

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
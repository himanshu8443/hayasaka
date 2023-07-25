'use client'



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
    const response = await fetch(`https://saavn.me/songs?id=${id}`);
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
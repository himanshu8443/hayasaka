import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import User from "@/models/User";
import dbConnect from "@/utils/dbconnect";
import Playlist from "@/models/Playlist";
import auth from "@/utils/auth";


// add song to playlist
export async function POST(req){
    const { playlistID, song } = await req.json();
    try {
        const user = await auth(req);
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not logged in",
                    data: null
                },
                { status: 404 }
            );
        }
        await dbConnect();
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                    data: null
                },
                { status: 404 }
            );
        }
        const playlist = await Playlist.findById(playlistID);
        if (!playlist) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Playlist not found",
                    data: null
                },
                { status: 404 }
            );
        }
        if (playlist.user.toString() !== user._id.toString()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                    data: null
                },
                { status: 401 }
            );
        }
        // check if song already exists in playlist
        const songExists = playlist.songs.find((s) => s === song);
        if (songExists) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Song already exists in playlist",
                    data: null
                },
                { status: 400 }
            );
        }
         await Playlist.findByIdAndUpdate(playlistID, {
            $push: {
                songs: song
            }
        });
        return NextResponse.json(
            {
                success: true,
                message: "Song added to playlist",
                data: null
            },
            { status: 200 }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
                data: null
            },
            { status: 500 }
        );
    }
}


// delete song from playlist
export async function DELETE(req){
    const { playlistID, song } = await req.json();
    try {
        const user = await auth(req);
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not logged in",
                    data: null
                },
                { status: 404 }
            );
        }
        await dbConnect();
        const playlist = await Playlist.findById(playlistID);
        if (!playlist) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Playlist not found",
                    data: null
                },
                { status: 404 }
            );
        }
        if (playlist.user.toString() !== user._id.toString()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                    data: null
                },
                { status: 401 }
            );
        }
        // check if song exists in playlist
        const songExists = playlist.songs.find((s) => s === song);
        if (!songExists) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Song does not exist in playlist",
                    data: null
                },
                { status: 400 }
            );
        }
        await Playlist.findByIdAndUpdate(playlistID, {
            $pull: {
                songs: song
            }
        });
        return NextResponse.json(
            {
                success: true,
                message: "Song deleted from playlist",
                data: playlist.songs
            },
            { status: 200 }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
                data: null
            },
            { status: 500 }
        );
    }
}


// get songs of playlist
export async function GET(req){
    const { searchParams } = new URL(req.url);
    const playlistID = searchParams.get("playlist");
    // console.log('playlistID', playlistID);
    // console.log('searchParams', searchParams);
    try {
        const user = await auth(req);
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not logged in",
                    data: null
                },
                { status: 404 }
            );
        }
        await dbConnect();
        const playlist = await Playlist.findById(playlistID);
        if (!playlist) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Playlist not found",
                    data: null
                },
                { status: 404 }
            );
        }
        if (playlist.user.toString() !== user._id.toString()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                    data: null
                },
                { status: 401 }
            );
        }
        return NextResponse.json(
            {
                success: true,
                message: "Songs of playlist",
                data: playlist
            },
            { status: 200 }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
                data: null
            },
            { status: 500 }
        );
    }
}
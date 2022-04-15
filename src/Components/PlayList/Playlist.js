import React from 'react';
import { TrackList } from './Components/TrackList';



class Playlist extends React.Component {
    render() {
        return (
            <div className="Playlist">
                <head href="Playlist.css" rel="stylesheet"></head>
                <input defaultValue={'New Playlist'} />
                <Tracklist />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}
const clientID = 'f585f89141934866b06c01d1407552d7'
const redirectURI = 'http://localhost:3000/'
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresinMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresinMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresinMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000)
            window.history.pushState('Access Token', null, '/')
            return accessToken
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).then(response => {
            return response.json();

        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return []
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
    },

    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId

        return fetch('https://api.spotify.com/v1/me', { headers: headers })
            .then(response => response.json()
            ).then(jsonResponse => {
                userId = jsonResponse.id
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
                    {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ name: name })
                    }).then(response => response.json())
                    .then(jsonResponse => {
                        const playlistId = jsonResponse.id
                        return (`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                        {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({ uris: trackURIs })
                        })
                    })
            })
    }
}


/*
const Spotify = () => {
    const getAccessToken = () => {
        if (token) {
            return token
        }

        const accessToken = window.location.href.match(/access_token=([^&]*)/);
        const expiresinMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessToken && expiresinMatch) {
            token = accessToken[1];
            const expiresIn = Number(expiresinMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000)
            window.history.pushState('Access Token', null, '/')
            return accessToken
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            window.location = accessUrl;
        }
    }
    
    const search = (term) => {
        const accessToken = Spotify.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {Authorization: `Bearer ${accessToken}`} 
        }).then(response => {
            return response.json();

        }).then(jsonResponse => {
            if (!jsonResponse) {
                return []
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artist[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
    }

    const playlistMethod = (name, trackURIs) => {
        if (!playlistName || !trackURIs.length) {
            return;
        }
        const accessToken =  Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId

        return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json())
            .then(jsonResponse => {
                const playlistId = jsonResponse.id
                return (`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackURIs})
                })
            })
        })
    }

}
*/

export default Spotify;
const token = '';
const clientID = '5bd24c1988614f44a400b56ebdbd3037'
const redirectURI = 'http://localhost:3000/'

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
            windows.history.pushState('Access Token', null, '/')
            return accessToken
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            window.location = accessUrl;
        }
    }

}

export default Spotify;
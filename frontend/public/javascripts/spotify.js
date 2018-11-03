window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQCNb_YOhAih3wS8IK8smv552ik6cjtqUFfpzk58FjZyO4bu7ldMzX58p7jwvFUEIYtiW5AV-S8QT0IfYC1cdCgbUpT7gLSlrByRLPRr4p1FX-l35a_SqrZXbWY9ipqpE3lj-P7IcfabhKTXlzi01EEcDWnXUBeOJWxwk6NcH1__C5kTp6pkPjSl';
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();


};
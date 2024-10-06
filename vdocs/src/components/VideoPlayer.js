import React, { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import YouTube from 'react-youtube';

function VideoPlayer({ url, onTimeUpdate, setPlayerRef }) {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      setPlayerRef(playerRef.current);
    }
  }, [setPlayerRef]);

  if (!url) {
    return (
      <Box sx={{ bgcolor: '#f0f0f0', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5">Enter a YouTube URL to start</Typography>
      </Box>
    );
  }

  // Extract video ID from URL
  const videoId = url.split('v=')[1];

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    setPlayerRef(event.target);
  };

  return (
    <Box sx={{ position: 'relative', paddingTop: '56.25%', height: '0', overflow: 'hidden' }}>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onStateChange={(event) => {
          if (event.data === YouTube.PlayerState.PLAYING) {
            setInterval(() => {
              onTimeUpdate(event.target.getCurrentTime());
            }, 1000);
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
}

export default VideoPlayer;
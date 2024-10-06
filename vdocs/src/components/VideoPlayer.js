import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function VideoPlayer({ url }) {
  if (!url) {
    return (
      <Box sx={{ bgcolor: '#f0f0f0', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5">Enter a YouTube URL to start</Typography>
      </Box>
    );
  }

  // Extract video ID from URL
  const videoId = url.split('v=')[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube video"
      />
    </Box>
  );
}

export default VideoPlayer;
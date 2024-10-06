import React, { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

function TranscriptViewer({ transcript, isLoading, error, currentTime }) {
  const transcriptRef = useRef(null);

  useEffect(() => {
    if (transcript && transcriptRef.current) {
      const currentSlide = transcript.slides.find(slide => slide.timestamp <= currentTime);
      if (currentSlide) {
        const slideElement = transcriptRef.current.querySelector(`[data-timestamp="${currentSlide.timestamp}"]`);
        if (slideElement) {
          slideElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  }, [currentTime, transcript]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ bgcolor: '#fff0f0', height: '400px', p: 2 }}>
        <Typography variant="h6" color="error">Error</Typography>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  if (!transcript) {
    return (
      <Box sx={{ bgcolor: '#f0f0f0', height: '400px', p: 2 }}>
        <Typography variant="h5">Transcript Viewer</Typography>
        <Typography>
          The transcript and slide images will be displayed here once a video is processed.
        </Typography>
      </Box>
    );
  }

  return (
    <Box ref={transcriptRef} sx={{ bgcolor: '#ffffff', height: '400px', overflowY: 'auto', p: 2 }}>
      <Typography variant="h5">Transcript</Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
        {transcript.text}
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Slides</Typography>
      {transcript.slides.map((slide, index) => (
        <Box 
          key={index} 
          sx={{ 
            mt: 2, 
            backgroundColor: slide.timestamp <= currentTime ? '#e6f7ff' : 'transparent',
            transition: 'background-color 0.3s'
          }}
          data-timestamp={slide.timestamp}
        >
          <Typography variant="caption">Timestamp: {slide.timestamp}s</Typography>
          <img src={slide.imageUrl} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
        </Box>
      ))}
    </Box>
  );
}

export default TranscriptViewer;
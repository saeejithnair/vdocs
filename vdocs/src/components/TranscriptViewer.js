import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

function TranscriptViewer({ transcript, isLoading, error, currentTime, onSlideClick }) {
  const transcriptRef = useRef(null);
  const slidesRef = useRef(null);
  const [showSlides, setShowSlides] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const lastTimeRef = useRef(currentTime);

  useEffect(() => {
    if (transcript && slidesRef.current && autoScroll) {
      const currentSlide = transcript.slides.reduce((prev, curr) => 
        Math.abs(curr.timestamp - currentTime) < Math.abs(prev.timestamp - currentTime) ? curr : prev
      );

      if (currentSlide) {
        const slideElement = slidesRef.current.querySelector(`[data-timestamp="${currentSlide.timestamp}"]`);
        if (slideElement) {
          const isForwardSeek = currentTime > lastTimeRef.current;
          slideElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: isForwardSeek ? 'nearest' : 'center'
          });
        }
      }
    }
    lastTimeRef.current = currentTime;
  }, [currentTime, transcript, autoScroll]);

  const handleManualScroll = () => {
    setAutoScroll(false);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ bgcolor: '#fff0f0', height: '100%', p: 2, overflowY: 'auto' }}>
        <Typography variant="h6" color="error">Error</Typography>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  if (!transcript) {
    return (
      <Box sx={{ bgcolor: '#f0f0f0', height: '100%', p: 2, overflowY: 'auto' }}>
        <Typography variant="h5">Transcript Viewer</Typography>
        <Typography>
          The transcript and slide images will be displayed here once a video is processed.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h5">Transcript</Typography>
        <Box>
          <FormControlLabel
            control={<Switch checked={showSlides} onChange={(e) => setShowSlides(e.target.checked)} />}
            label="Show Slides"
          />
          <FormControlLabel
            control={<Switch checked={autoScroll} onChange={(e) => setAutoScroll(e.target.checked)} />}
            label="Auto Scroll"
          />
        </Box>
      </Box>
      <Box 
        ref={transcriptRef} 
        sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}
        onScroll={handleManualScroll}
      >
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
          {transcript.text}
        </Typography>
        {showSlides && (
          <Box ref={slidesRef}>
            <Typography variant="h6" sx={{ mt: 2 }}>Slides</Typography>
            {transcript.slides.map((slide, index) => (
              <Box 
                key={index} 
                sx={{ 
                  mt: 2, 
                  backgroundColor: slide.timestamp <= currentTime ? '#e6f7ff' : 'transparent',
                  transition: 'background-color 0.3s',
                  cursor: 'pointer',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}
                data-timestamp={slide.timestamp}
                onClick={() => onSlideClick(slide.timestamp)}
              >
                <Typography variant="caption" sx={{ display: 'block', p: 1, bgcolor: '#f0f0f0' }}>
                  Timestamp: {formatTime(slide.timestamp)}
                </Typography>
                <img src={slide.imageUrl} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

// Helper function to format time in HH:MM:SS
function formatTime(seconds) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, '0');
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
  }
  return `${mm}:${ss}`;
}

export default TranscriptViewer;
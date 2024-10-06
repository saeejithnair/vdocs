import React, { useState, useCallback } from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import Header from './components/Header';
import VideoInput from './components/VideoInput';
import VideoPlayer from './components/VideoPlayer';
import TranscriptViewer from './components/TranscriptViewer';

// At the top of your App.js file, add this line:
console.log('process.env:', process.env);

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [transcript, setTranscript] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [playerRef, setPlayerRef] = useState(null);

  const mockProcessVideo = async (url) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Extract video ID from URL
      const videoId = url.split('v=')[1];
      
      console.log('Fetching video details for ID:', videoId);
      console.log('Using API Key:', process.env.REACT_APP_YOUTUBE_API_KEY);
      
      // Use the environment variable here
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (!data.items || data.items.length === 0) {
        throw new Error('No video details found');
      }
      
      // Parse duration (PT1H23M45S format)
      const duration = data.items[0].contentDetails.duration;
      const durationInSeconds = parseDuration(duration);
      
      // Generate mock slides
      const numberOfSlides = Math.floor(durationInSeconds / 60) + 1; // One slide per minute
      const slides = Array.from({ length: numberOfSlides }, (_, index) => ({
        timestamp: Math.floor(Math.random() * durationInSeconds),
        imageUrl: `https://via.placeholder.com/400x300?text=Slide+${index + 1}`
      }));
      
      // Sort slides by timestamp
      slides.sort((a, b) => a.timestamp - b.timestamp);
      
      // Mock transcript data
      return {
        text: `This is a sample transcript for the video at ${url}.\n\nIt contains multiple paragraphs to simulate a real transcript.\n\nIn a real implementation, this would be the actual transcript of the video.`,
        slides: slides,
        duration: durationInSeconds
      };
    } catch (error) {
      console.error('Error in mockProcessVideo:', error);
      throw error;
    }
  };

  const handleVideoSubmit = async (url) => {
    setVideoUrl(url);
    setIsLoading(true);
    setError(null);

    try {
      const processedTranscript = await mockProcessVideo(url);
      setTranscript(processedTranscript);
    } catch (err) {
      console.error('Error processing video:', err);
      setError(`Failed to process video: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  const handleSlideClick = useCallback((timestamp) => {
    if (playerRef) {
      playerRef.seekTo(timestamp, true);
      setCurrentTime(timestamp);
    }
  }, [playerRef]);

  const setPlayerRefCallback = useCallback((ref) => {
    setPlayerRef(ref);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, height: '100%' }}>
          <VideoInput onSubmit={handleVideoSubmit} />
          <Grid container spacing={3} sx={{ mt: 2, height: 'calc(100% - 80px)' }}>
            <Grid item xs={12} md={6} sx={{ height: '100%' }}>
              <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <VideoPlayer url={videoUrl} onTimeUpdate={handleTimeUpdate} setPlayerRef={setPlayerRefCallback} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ height: '100%' }}>
              <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <TranscriptViewer 
                  transcript={transcript} 
                  isLoading={isLoading} 
                  error={error}
                  currentTime={currentTime}
                  onSlideClick={handleSlideClick}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

// Helper function to parse YouTube duration format
function parseDuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (parseInt(match[1]) || 0);
  const minutes = (parseInt(match[2]) || 0);
  const seconds = (parseInt(match[3]) || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

export default App;
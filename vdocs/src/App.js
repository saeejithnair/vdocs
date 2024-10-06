import React, { useState } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import Header from './components/Header';
import VideoInput from './components/VideoInput';
import VideoPlayer from './components/VideoPlayer';
import TranscriptViewer from './components/TranscriptViewer';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [transcript, setTranscript] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mockProcessVideo = async (url) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock transcript data
    return {
      text: `This is a sample transcript for the video at ${url}.\n\nIt contains multiple paragraphs to simulate a real transcript.\n\nIn a real implementation, this would be the actual transcript of the video.`,
      slides: [
        { timestamp: 0, imageUrl: 'https://via.placeholder.com/400x300?text=Slide+1' },
        { timestamp: 30, imageUrl: 'https://via.placeholder.com/400x300?text=Slide+2' },
        { timestamp: 60, imageUrl: 'https://via.placeholder.com/400x300?text=Slide+3' },
      ]
    };
  };

  const handleVideoSubmit = async (url) => {
    setVideoUrl(url);
    setIsLoading(true);
    setError(null);

    try {
      const processedTranscript = await mockProcessVideo(url);
      setTranscript(processedTranscript);
    } catch (err) {
      setError("Failed to process video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <VideoInput onSubmit={handleVideoSubmit} />
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <VideoPlayer url={videoUrl} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <TranscriptViewer 
                transcript={transcript} 
                isLoading={isLoading} 
                error={error}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function VideoInput({ onSubmit }) {
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoUrl) {
      onSubmit(videoUrl);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        fullWidth
        label="YouTube Video URL"
        variant="outlined"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button type="submit" variant="contained" size="large">
        Process
      </Button>
    </Box>
  );
}

export default VideoInput;
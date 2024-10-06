**Project Title: VDocs (Video Documents)**

### **Project Overview**
The app aims to provide an efficient way for users to consume educational content from YouTube lectures or presentations without having to watch the entire video. Users will paste a YouTube link of a lecture video, and the app will generate a readable transcript accompanied by relevant slide screenshots, allowing the user to navigate through the lecture more effectively.

### **Core Features**
1. **Video Input and Processing**: Users paste a YouTube link and click a button to initiate processing.
2. **Left Pane - Video Player**: Embedded video player with standard controls, syncing with the transcript.
3. **Right Pane - Transcript and Slide Viewer**:
   - Full transcript in paragraph form, cleaned of filler words and awkward breaks.
   - Screenshots of corresponding slides beneath each paragraph.
   - Clicking text or slide images syncs the video player.
   - Optional toggle for hiding/showing slide images.
4. **Synchronization**:
   - Video-player and transcript auto-scroll synchronization.
5. **Export Feature**: Option to export the transcript, with images, as a PDF document.

### **User Flow**
1. **Input**: User pastes a YouTube link into a text box and clicks "Process."
2. **Processing**:
   - The app checks if the video is supported (English language, lecture-style video).
   - If unsupported, the user is notified.
   - If supported, the app generates the transcript and slide extraction.
3. **Output**:
   - Video is displayed in the left pane with standard controls.
   - Transcript and slide screenshots are displayed in the right pane.
   - User can interact by clicking text or screenshots to navigate the video.

### **UI/UX Design**
- **Design Aesthetic**: Material UI design principles should guide the overall look and feel, ensuring a clean, modern, and user-friendly experience.
- **Left Pane (Video Player)**: The video player will have standard YouTube controls without additional navigation features. Users will skip to specific parts of the lecture by interacting with the right pane.
- **Right Pane (Transcript and Slide Viewer)**:
  - Each paragraph of the transcript should be followed by the corresponding slide screenshot.
  - Users will have an option to toggle the visibility of the slide images for a simplified view.
  - Annotations and visual cue features are reserved for future versions.
- **Synchronization**:
  - Clicking on a text paragraph or slide image will make the video jump to that point.
  - Moving the video player to a specific timestamp will cause the right pane to scroll to the relevant transcript section.

### **Backend Considerations**
- **Transcript and Slide Synchronization**:
  - The app will process the video entirely before presenting the interactive pane to the user. This will involve:
    - Using YouTube's transcript API to extract captions.
    - Piping the extracted captions into Gemini1.5 Flash for cleanup (removing filler words and formatting into readable paragraphs).
    - Using Gemini1.5 Flash for slide detection, drawing bounding boxes around estimated slide areas.
    - Indicators will be provided for unclear or hard-to-extract slides.
- **Storage**:
  - For the prototype, all generated transcripts, screenshots, and metadata will be stored locally on the user's laptop, assuming a single-user setup.

### **Technology Stack**
- **Frontend**:
  - Framework: React.js (for creating a responsive, interactive UI based on Material UI principles).
  - UI Library: Material-UI to maintain consistency and simplify development.
- **Backend**:
  - Node.js with Express: To handle API requests, YouTube video processing, and interactions between the frontend and backend.
  - **Gemini1.5 Flash Integration**:
    - API calls to Gemini1.5 Flash for transcript cleanup and slide detection.
  - **Storage**:
    - Local storage for initial prototype: Use SQLite or simple file-based storage to store processed videos and their associated data.
- **APIs and Services**:
  - **YouTube Transcript API**: For extracting captions from YouTube videos.
  - **Gemini1.5 Flash**: For cleaning the transcript and detecting slide areas.

### **Scalability and User Experience**
- **Transcript Processing**: The app will process videos asynchronously in the background after users paste the link. Once the video is ready, it will be presented with all interactive features.
- **User Storage**: For the prototype, assume local storage with no authentication required. In the future, consider adding user accounts and cloud storage for saving data.

### **Future Considerations**
- **Annotations**: Add functionality for users to annotate the transcript and slides directly in the app. Annotations can be saved and exported.
- **Visual Cues**: Introduce a visual cue (e.g., a highlighted line) to indicate which part of the transcript is currently being discussed in the video.
- **Multi-User Support**: Expand storage capabilities to support multiple users with secure cloud-based storage.
- **Advanced AI Features**: Continue leveraging Gemini1.5 Flash or other models for improved slide detection and interactive features.
- **VPS Hosting**: Plan for deploying the app on a VPS for wider accessibility. This will require setting up server infrastructure, configuring a domain, and managing remote storage for data persistence.

### **Step-by-Step Implementation Plan**

1. **Frontend Setup**
   - Set up a new React.js project using Material-UI for UI components.
   - Design the layout with two panes: video player (left) and transcript viewer (right).
   - Implement the input form for users to paste YouTube links.

2. **Backend Setup**
   - Set up a Node.js server with Express to handle API requests.
   - Create endpoints for processing YouTube links and managing transcript data.
   - Integrate YouTube Transcript API to extract video captions.

3. **Transcript Cleanup and Slide Extraction**
   - Call Gemini1.5 Flash to clean up the transcript (removing filler words and formatting).
   - Use Gemini1.5 Flash to detect slides in the video and generate bounding boxes around slide areas.
   - Store the cleaned transcript and slide data in a local SQLite database or as JSON files.

4. **Frontend Integration with Backend**
   - Connect the React frontend to the Node.js backend using API calls.
   - Display the video in the left pane using an embedded YouTube player.
   - Display the cleaned transcript in the right pane, formatted into paragraphs.
   - Insert slide images beneath each corresponding paragraph.

5. **Synchronization Features**
   - Implement click functionality on transcript paragraphs and slide images to sync the video player.
   - Add logic to auto-scroll the transcript when the user scrubs through the video.

6. **Slide Visibility Toggle**
   - Add a toggle button to the UI allowing users to show or hide slide images.

7. **PDF Export Feature**
   - Implement functionality to export the transcript and slide images as a PDF document.
   - Use a library like jsPDF to generate and download the PDF.

8. **Storage and Persistence**
   - Save processed video data (transcript, slides) locally for prototype purposes.
   - Implement a mechanism to retrieve saved data when the user revisits the app.

9. **Error Handling**
   - Implement error handling for unsupported videos (e.g., non-English or non-lecture videos).
   - Display appropriate messages to guide the user.

10. **Testing and Debugging**
    - Test the app with various YouTube videos to ensure transcript extraction, slide detection, and synchronization work as expected.
    - Debug issues related to UI responsiveness, video syncing, and data persistence.

11. **VPS Hosting Setup**
    - Set up a VPS to host the app, including configuring the server environment for Node.js and React.
    - Set up a domain and SSL for secure access.
    - Configure remote storage and backup solutions to manage user data efficiently.

12. **Future Feature Planning**
    - Plan for the addition of annotations, visual cues, multi-user support, and cloud storage.
    - Document and prioritize these features for future iterations.
# TODO for Cleartranscript.co

## UI Changes

1. [x] **Recording Button Color**
   - Change the recording button color to red while recording (currently stays black).

2. [x] **Transcript Text Length**
   - Increase the maximum length of the text displayed on the transcript card.

3. [x] **Copy Button Update**
   - Replace the current "Copy" text button with an icon.
   - Add a tooltip to the copy button (use CSS for implementation).

4. [x] **Copy Icon in Modal**
   - Add the copy icon in the modal for the transcript, similar to how it is displayed on the main page cards.

5. [x] **Loading Indicator**
   - Create a loading indicator using a grey box, similar to YouTube's loading placeholders.
   - Display loading boxes as the initial HTML before the recordings are fully loaded.

6. [x] **Headers Display Logic**
   - Ensure "Today" and "Yesterday" headers are only displayed if there are notes available for those days.

7. **Timestamp Display**
   - In the "All" section, replace the current time-only format (e.g., `13:32, 9:33`) with the full date and time unless it's for today or yesterday.
   - For notes that are not under "Today" or "Yesterday," only display the date, no time.

8. **Playback Speed in Modal**
   - Ensure the playback speed control is always visible within the modal, even when the audio is playing.

9. **Edit Title**
   - Add an edit button to the title in the modal. Make it similar to the Copy Button with the tooltip, but with a pencil icon. When clicked, it converts the title into contenteditable.

10. **Dark Mode**
    - Add dark mode to the app.

## Backend Changes

1. [x] **AI Title Generation**
   - Implement a Deno server to handle the AI title generation server-side using LemonFox's LLM APIs.
   
## New Features

2. **Daily Summary Feature**
   - Implement a cron job that runs every 24 hours to generate a summary for all notes recorded that day.
   - Use an LLM (e.g., GPT-3) to create a concise summary of the day's notes, providing a brief overview of key topics and information.

## Performance Improvements

1. **Lazy Loading Recordings**
   - Only load a few recordings at the start (maximum 10 recordings).
   - Implement a lazy loading functionality to load more recordings when scrolling down (Firestore can be used for pagination).
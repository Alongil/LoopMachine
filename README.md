# Loop Machine

Playing tracks by clicking on pads.

## Short overview of the project

There are 9 pads, each playing a different song loop for 8 seconds.

Clicking on the play button will turn an 8 second loop on.

If pads are clicked while the loop is on, it will wait for the loop to finish and then start playing.

Clicking on a pad and then clicking on play will turn the track loop on.

Clicking on the same pad again will turn it off immediately.

A track loop will not start unless the previous loop has finished, which makes all clicked tracks play at the same time.

There is an option to save a session (a track or several tracks playing at the same time) and play it again.

I used the React Bootstrap library along with custom CSS to design the app and make it responsive.

## Main elements

- App components-rendering the header and the controllers component

- LoopProggressBar component-in charge of rendering a progress bar and the logic to control its animation. 

- Controllers component-this component is in charge of most of the logic in this app.

- The tracks helper, contains an array of objects, each containing track information.

- useInterval-custom hook designed to set up an interval that still has access to the current state.


## Controllers component logic and functions

- The component imports the track helper and creates an object for each track with track id as key is checked, track url and an audio object as properties using the useEffect hook with no dependencies, so it will only run when the component mounts.

- For each track in the object, the component renders a button with the audio file.

## Controllers component's functions

- handlePlay function-in charge of changing the playing state to true and calling the playCheckedTracks function.

- playCheckedTracks function in charge of playing the tracks that are checked.

- handleStop in charge of setting the playing state to false and pausing the checked tracks.

- handleClick incharge of handling a track being clicked, pausing the track if needed, and setting the new track state.

- recordTracks inchatge of recording the session.

- handlePlayRecordedTracks-gets the recorded session and setting the playing state to true, cuasing the recorded session to play.

## Notes

- If I had more time, I would divide the controller component into two separate components, one to handle the recorded session and one to handle the rest of the tracks.

  I would also make the functions inside Controllers conponent leaner by exporting some code duplication to an external function (for instance, in the handleClick and handleStop     functions, I will take the for loop and set it inside a function Stop ()).

  I enjoyed the task and I am going to improve the code in the upcoming days, will be happy to talk about it in person if it will be relevant.

- link to the site: https://condescending-lewin-389312.netlify.app/.



Thank you,

Have fun!

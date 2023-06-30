# Loop Machine

The App allows you to play up to 9 tracks simultaniously, constructed over an 8-seconds loop.

### EDIT (4.9.21): Please read the notes below about today's commit

## Project Overview

There are 9 pads, each represents a different 8 seconds track.

Clicking on the play button will activate an 8 second loop which will be the baseline of the music session.

Once attached, the track will be played along with the loop, in every cycle:

- If pads are clicked while the loop is on, the tracks will be attached to the loop and start playing - but only at the next cycle.

- Clicking on a pad and then clicking on play will turn the track loop on.

- Clicking on the same pad again will turn it off immediately and also will detach it from the loop.

There is an option to save a session (The current state of activated tracks in the tracks-pad):

- Once the loop is active, the user can save the tracks state (If at least one track is activated).

- When the loop is stopped, the user can load and play a saved session.

- The user can continue and modify a loaded session, then re-save it.

I used the React Bootstrap library along with custom CSS to design the app and make it responsive.

## Main elements

- Controllers component - in charge of most of the app's logic. (More on this in the next chapter).

- RecordTracks component - handles the save and play saved session logic.

- The TracksInfo helper - contains an array of objects, each containing information about an individual track, including it's audio source url and name.

- Tracks object - an object that contains all of the tracks information, their audio object, and their state (activated or not).

- useInterval - custom hook designed to set up an interval that still has access to the current pad's in-memory state. (Will be happy to elaborate on the decision to include this face to face)


## Controllers component

- The component imports the track helper and creates a general 'Tracks-State' object, with each track id, state, track url and a corresponding audio object.

- For each track in the object, the component renders a track button using its properties.

### Component's Functions

- handlePlay / handleStop - In charge of changing the playing state to true/false, held in the tracks-state object.

- play / stop - In charge of playing/stopping the tracks that are checked/unchecked in the tracks-state object.

- handleClick - In charge of handling a track click, pausing the track if needed, and setting the new track's state.

## Additional Importatnt Componenets

### LoopProggressBar Component

In charge of rendering a progress bar and the logic to control its animation.

### RecodTracks Component

In charge of the the recording save and load buttons. Functions includes:

- recordTracks incharge of recording the session.

- handlePlayRecordedTracks-gets the recorded session and setting the playing state to true, cuasing the controllers component to rerender and play the recorded session.

## Notes

- As for Saturday (4.9.21) I had an idea of how to improve my code design and applied it to the project. The redisgn is basically the addition of a new component that handles the already-existing recording related buttons, which saves some unnecessary re-renders. If you'd like to review my code as it was at the given deadline (a day before), please revert to commit: c0a20cf32d05b0e2100f79b5a5c06048149c6e69

- link to the site: https://looin.netlify.app/

- I enjoyed the task, will be happy to talk about it in person. Thank you for the opportunity.


Have fun!

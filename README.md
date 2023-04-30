# Dent Intern Task
This project is a React component that allows you to play an audio file and highlight the transcript words in sync with the audio playback. You can also click on any word to jump to the corresponding audio timestamp. The component uses the Mousetrap library to handle keyboard shortcuts.

## Features
* Play an audio file and display the transcript words below it.
* Highlight the current transcript word based on the audio playback.
* Click on any transcript word to jump to the corresponding audio timestamp.
* Use the j key to skip forward 5 seconds.
* Display a highlight box around the current word.
* Display the text of the current word in the highlight box.

# Installation
To use this component in your project, you can either download the Player.js file and import it into your React code:

```
import Player from './Player';

function App() {
  return (
    <div>
      <Player transcript={/* your transcript data */} />
    </div>
  );
}
```

Or you can clone this GitHub repository and run the example app:

```
git clone https://github.com/gupta123shivam/dent-intern-task.git
cd dent-intern-task
npm install
npm start
```

Then open http://localhost:3000 to see the app running.

## Usage
The Player component accepts a transcript prop that should be an object with an array of words, where each word has a text, startTime, and endTime property. Here's an example:

```
const transcript = {
  words: [
    { text: "Lorem", startTime: 0.0, endTime: 1.2 },
    { text: "ipsum", startTime: 1.2, endTime: 2.4 },
    { text: "dolor", startTime: 2.4, endTime: 3.6 },
    { text: "sit", startTime: 3.6, endTime: 4.8 },
    { text: "amet", startTime: 4.8, endTime: 6.0 },
  ],
};
```

You can pass this transcript object as a prop to the Player component:

```
<Player transcript={transcript} />
```

## Keyboard Shortcuts
The following keyboard shortcuts are available:

* j: skip forward 5 seconds.

## Credits
This component was developed by Shivam Gupta as part of the Dent Intern Task. It uses the Mousetrap library for keyboard shortcuts.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

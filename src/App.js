import "./styles.css";

import Player from "./Player";

import { transcript } from "./data/data";

export default function App() {
  return <Player transcript={transcript} />;
}

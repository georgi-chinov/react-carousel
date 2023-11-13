import { useState } from "react";
import Carousel from "./components/Carousel/Carousel";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import video from "./assets/mov_bbb.mp4";
function App() {
  const [items, setitems] = useState([
    { type: "image", content: img1 },
    { type: "image", content: img2 },
    { type: "image", content: img3 },
    { type: "video", content: video },
  ]);
  return (
    <div
      className="d-flex container align-items-center flex-column text-center "
      style={{ color: "white" }}
    >
      <header style={{ height: "10vh" }}>HEADER PLACEHOLDER</header>
      <main style={{ height: "85vh" }}>
        <Carousel itemsArr={items} />
      </main>
      <footer style={{ height: "5vh" }}>FOOTER PLACEHOLDER</footer>
    </div>
  );
}

export default App;

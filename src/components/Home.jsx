import largemapImg from "../Images/largemap.jpeg";
//import blueworldImg from "../Images/blueworld.jpg";
//import fullmapImg from "../Images/fullmap.jpeg";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="app">
      <div className="bannerWrapper">
        <img src={largemapImg} />
        <div className="bottom">
          <div>
            {" "}
            Discover the world at your fingertips! Our website is a hub of
            geography knowledge, featuring a countries page where you can
            explore diverse cultures, landscapes, and histories. From Tokyo's
            bustling streets to Rome's ancient ruins, immerse yourself in the
            wonders of different nations. Test your skills on our quiz page and
            challenge your geography expertise. Whether you're a curious
            traveler, a passionate student, or simply eager to expand your
            understanding, our website offers an immersive experience. Unlock
            the secrets of the globe, one country at a time, and ignite your
            sense of wonder on our geography knowledge page.{" "}
          </div>
          <div className="linkcontainer">
            <Link to="/quiz">Take Quiz</Link>
            <Link to="/countries">Search for Countries</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

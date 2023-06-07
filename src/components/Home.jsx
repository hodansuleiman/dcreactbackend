import blueworldImg from "../Images/blueworld.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="app">
      <div
        className="bannerWrapper"
        style={{
          backgroundImage: `url("${blueworldImg}")`,
        }}
      >
        <div className="bottom">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            non saepe corrupti dolorem sint optio a maiores obcaecati, minima
            temporibus? Nihil deserunt officiis accusamus rem temporibus, labore
            perferendis repellendus, ullam cupiditate iusto dolores fugiat
            voluptates reiciendis non tempore praesentium. Iure consequatur,
            quae reprehenderit deserunt deleniti fuga quas rem aut molestiae.
          </div>
          <div>
            <Link to="/quiz">Take Quiz</Link>
            <Link to="/countries">Search for Countries</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

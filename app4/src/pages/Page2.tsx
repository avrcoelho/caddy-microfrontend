import { Link } from "react-router-dom";

function Page2() {
  return (
    <div>
      <Link to="/page1">Go to Page 1</Link>
      <br />
      <Link to="/page2">Go to Page 2</Link>
      <br />
      <Link to="/page3">Go to Page 3</Link>

      <h1>Page 2</h1>
    </div>
  );
}

export default Page2;

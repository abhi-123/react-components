import "./App.css";
import NestedComments from "./components/NestedComments";

function App() {
  // const [dogUrl, setDogUrl] = useState("");
  // let cancelled = false;
  // useLayoutEffect(() => {
  //   try {
  //     if (!cancelled)
  //       fetch("https://dog.ceo/api/breeds/image/random")
  //         .then((res) => res.json())
  //         .then((data) => setDogUrl(data.message));
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return () => {
  //     cancelled = true;
  //   };
  // }, []);
  return (
    <div className="container">
      <div className="dogContainer">
        <h1>Nested Comments</h1>
      </div>
      <NestedComments />
    </div>
  );
}

export default App;

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Loading from "./components/CircularProgress/Loading";

function App() {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const fetchData = async () => {
    try {
      const apiData = await axios.get("https://opentdb.com/api.php?amount=10");
      setData((prev) => apiData?.data?.results);
    } catch (error) {
      alert("Something Went Wrong. Please try after Sometime!");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="app-container">
      <Navbar score={score} />
      {data.length === 0 ? (
        <Loading />
      ) : (
        <Hero data={data} setScore={setScore} />
      )}
    </section>
  );
}

export default App;

import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Gallery from "../components/Gallery";
// import Banner from "../components/Banner";

function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Gallery />
      {/* <Banner /> */}
    </div>
  );
}

export default Home;

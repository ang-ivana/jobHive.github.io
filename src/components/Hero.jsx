import heroImg1 from "../assets/images/hero-1.png";
import heroImg2 from "../assets/images/hero-2.png";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="hero main-padding">
      <div className="hero-content">
        <div className="images-container">
          <img src={heroImg1} alt="hero image" />
          <img src={heroImg2} alt="hero image" />
        </div>
        <div className="info-container">
          <h2>Find</h2>
          <ul>
            <li>remote jobs</li>
            <li>onsite careers</li>
            <li>hybrid roles</li>
            <li>and much more...</li>
          </ul>
        </div>
        <div className="title-container">
          <h1>Discover your next Hive</h1>
          <div className="hero-search">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  )
}
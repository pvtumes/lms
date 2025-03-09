import React from "react";
import "./Testimonials.css";
import img1 from "./P1.png"; // Replace with actual image paths
import img2 from "./P2.png";
import img3 from "./P3.png";

const testimonials = [
  {
    image: img1,
    name: "BRIAN ARMSTRONG",
    title: "Coinbase",
    quote: "KEEP TRACK OF THE HOTTEST NFTS.",
    description:
      "Rarible makes it easier for me to keep track of the most trending pieces of NFTs. They have the biggest collection. Simple and efficient. Payments are hassle-free. Less. I love Rarible.",
  },
  {
    image: img2,
    name: "CHANGPENG ZHAO",
    title: "Binance",
    quote: "NO EXTRA CHARGES. LESS ROYALTIES.",
    description:
      "Rarible keeps it clear and transparent. No hidden charges. The publishing of NFTs is quicker than ever. Processing takes less than a day. The best part about exchanging on Rarible is less royalties on sales.",
  },
  {
    image: img3,
    name: "VITALIK BUTERIN",
    title: "Ethereum",
    quote: "DECENTRALIZATION IS THE FUTURE.",
    description:
      "Rarible is a great step towards a decentralized and open marketplace. It allows artists and creators to truly own their digital assets and earn fair rewards without middlemen.",
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials">
      <h1 className="heading">
        WHAT THE <span>BIGGEST CRYPTO LEADERS</span> SAY ABOUT RARIBLE
      </h1>
      
      <div className="cards">
        {testimonials.map((testimonial, index) => (
          <div className="card" key={index}>
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="avatar"
            />
            <div className="card-content">
              <p className="quote">“{testimonial.quote}”</p>
              <p className="description">{testimonial.description}</p>
              <p className="author">{testimonial.name}</p>
              <p className="title">{testimonial.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="navigation-dots">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === 0 ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

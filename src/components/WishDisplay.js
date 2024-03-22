import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import wishes from "../wishes";
import "./WishDisplay.css";
import WishImageGenerator from "./WishImageGenerator";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const names = [
  "Ádám",
  "Balázs",
  "Beni",
  "Geri",
  "Isti",
  "Kriszti",
  "Laci",
  "Lilla",
  "Marci",
  "Palázs",
  "Peti",
  "Sanyi",
];

function WishDisplay() {
  let { category } = useParams();
  let navigate = useNavigate();
  const [index, setIndex] = useState(
    Math.floor(Math.random() * wishes[category].length)
  );
  const [selectedName, setSelectedName] = useState("");
  const [showImage, setShowImage] = useState(false);

  const shuffleWish = () => {
    setIndex(Math.floor(Math.random() * wishes[category].length));
  };

  const goBack = () => {
    navigate("/");
  };

  const copyWishToClipboard = () => {
    const wishText = `${selectedName ? selectedName + ", " : ""}${
      wishes[category][index]
    }`;
    navigator.clipboard.writeText(wishText).then(() => {
      alert("Wish copied to clipboard!");
    });
  };

  return (
    <div className="wish-display">
      <div className="names-list">
        {names.map((name) => (
          <button
            key={name}
            onClick={() => setSelectedName(name)}
            className="name-button"
            data-tooltip-id="choose-name"
            data-tooltip-content="Név kiválasztása"
          >
            {name}
          </button>
        ))}
      </div>
      <button
        className="icon go-back-icon"
        onClick={goBack}
        data-tooltip-id="go-back"
        data-tooltip-content="Vissza a főoldalra"
      >
        ⬅️
      </button>
      <div className="wish-card">
        <p>
          {selectedName ? selectedName + ", " : ""}
          {wishes[category][index]}
        </p>
        <button
          className="icon image-icon"
          onClick={() => setShowImage(true)}
          data-tooltip-id="generate-image"
          data-tooltip-content="Kép generálása"
        >
          🖼️
        </button>
        <Tooltip id="generate-image" />
        <button
          className="icon shuffle-icon"
          onClick={shuffleWish}
          data-tooltip-id="shuffle-wish"
          data-tooltip-content="Másik kívánság"
        >
          🔀
        </button>
        <Tooltip id="shuffle-wish" />
        <button
          className="icon copy-icon"
          onClick={copyWishToClipboard}
          data-tooltip-id="copy-wish"
          data-tooltip-content="Kívánság másolása"
        >
          📋
        </button>
        <Tooltip id="copy-wish" />
      </div>
      {showImage && (
        <WishImageGenerator
          wish={wishes[category][index]}
          name={selectedName}
          category={category}
        />
      )}
    </div>
  );
}

export default WishDisplay;

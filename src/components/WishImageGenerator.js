import React, { useRef, useState, useEffect } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

function WishImageGenerator({
  wish,
  name,
  category,
  onShuffleClick,
  onCopyClick,
}) {
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  const backgroundImages = [
    "/dark-1.jpg",
    "/dark-2.jpg",
    "/dark-3.jpg",
    "/dark-4.jpg",
    "/dark-5.jpg",
    "/dark-6.jpg",
    "/light-1.jpg",
    "/light-2.jpg",
    "/light-3.jpg",
    "/light-4.jpg",
  ];

  const images = backgroundImages.map((image) => ({
    original: image,
    thumbnail: image,
  }));
  const [selectedImage, setSelectedImage] = useState(backgroundImages[0]);

  useEffect(() => {
    drawImage();
  }, [selectedImage, wish, name]);

  const drawImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ha a canvas még nem érhető el, nem folytatjuk
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = selectedImage;
    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      addText(ctx);
      const dataUrl = canvas.toDataURL("image/png");
      setImageUrl(dataUrl);
    };
  };

  const addText = (ctx) => {
    ctx.font = "30px Arial";
    const isLightBackground = selectedImage.includes("light");
    const textColor = isLightBackground ? "black" : "white";
    const shadowColor = isLightBackground
      ? "rgba(255, 255, 255, 0.7)"
      : "rgba(0, 0, 0, 0.5)";
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const maxWidth = canvasRef.current.width * 0.75;
    const lineHeight = 35;
    const x = canvasRef.current.width / 2;
    const y = canvasRef.current.height / 2 - lineHeight;
    ctx.strokeStyle = shadowColor;
    ctx.lineWidth = 4;
    wrapText(ctx, `${name}, ${wish}`, x, y, maxWidth, lineHeight, "stroke");
    wrapText(ctx, `${name}, ${wish}`, x, y, maxWidth, lineHeight, "fill");
  };

  function wrapText(context, text, x, y, maxWidth, lineHeight, method) {
    const words = text.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        if (method === "stroke") {
          context.strokeText(line, x, y); // Az árnyék vagy kontúr hozzáadása
        } else {
          context.fillText(line, x, y); // A szöveg kitöltése
        }
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    if (method === "stroke") {
      context.strokeText(line, x, y);
    } else {
      context.fillText(line, x, y);
    }
  }

  const downloadImage = () => {
    const link = document.createElement("a");
    link.download = `${category}-${name}.png`;
    link.href = imageUrl;
    link.click();
  };

  return (
    <div style={{ maxWidth: "1024px", margin: "0 auto", position: "relative" }}>
      {imageUrl && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button onClick={downloadImage}>Download Image</button>
        </div>
      )}
      <div style={{ transform: "scale(0.5)", margin: "0 auto" }}>
        <ImageGallery
          items={backgroundImages.map((image) => ({
            original: image,
            thumbnail: image,
          }))}
          onSlide={(currentIndex) =>
            setSelectedImage(backgroundImages[currentIndex])
          }
          showPlayButton={false}
          showFullscreenButton={false}
          showThumbnails={false}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default WishImageGenerator;

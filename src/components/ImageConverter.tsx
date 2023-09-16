import React, { useState, useRef } from "react";

const ImageConverter: React.FC = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [desiredWidth, setDesiredWidth] = useState<string>("");
  const [desiredHeight, setDesiredHeight] = useState<string>("");

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setWidth(img.width);
          setHeight(img.height);

          // Display the original image
          const originalImage = new Image();
          originalImage.src = e.target?.result as string;
          document.getElementById("original-image")!.innerHTML = "";
          document.getElementById("original-image")!.appendChild(originalImage);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResize = () => {
    const newWidth = parseInt(desiredWidth, 10);
    const newHeight = parseInt(desiredHeight, 10);
    const originalImage = document
      .getElementById("original-image")!
      .getElementsByTagName("img")[0];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx && originalImage) {
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
      const resizedImage = new Image();
      resizedImage.src = canvas.toDataURL("image/jpeg");
      document.getElementById("resized-image")!.innerHTML = "";
      document.getElementById("resized-image")!.appendChild(resizedImage);
    }
  };

  const handleDownload = () => {
    const resizedImage = document
      .getElementById("resized-image")!
      .getElementsByTagName("img")[0];
    if (resizedImage) {
      const a = document.createElement("a");
      a.href = resizedImage.src;
      a.download = "resized_image.jpg";
      a.click();
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Конвертор Картинок</h2>
      <input
        type="file"
        accept="image/*"
        ref={inputFileRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <button onClick={() => inputFileRef.current?.click()}>
        Выберите изображение
      </button>
      <div>
        <h3>Детали исходного изображения:</h3>
        <p>Ширина: {width}px</p>
        <p>Высота: {height}px</p>
        <div id="original-image"></div>
      </div>
      <div>
        <label>
          Желаемая ширина:
          <input
            type="number"
            value={desiredWidth}
            onChange={(e) => setDesiredWidth(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Желаемая Height:
          <input
            type="number"
            value={desiredHeight}
            onChange={(e) => setDesiredHeight(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleResize}>Изменить размер изображения</button>
      <div>
        <h3>Измененное изображение::</h3>
        <div id="resized-image"></div>
      </div>
      <button onClick={handleDownload} disabled={width === 0 || height === 0}>
        Скачать измененное изображение
      </button>
    </div>
  );
};

export default ImageConverter;

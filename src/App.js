import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [inputText, setInputText] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleTextareaChange = (event) => {
    setInputText(event.target.value);
  };

  const generateImage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/generate-image",
        {
          htmlContent: `<html><body><h1>${inputText}</h1></body></html>`,
        },
        { responseType: "blob" }
      );

      const imageUrl = URL.createObjectURL(new Blob([response.data]));
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadImage = () => {
    // Créez un lien pour le téléchargement
    const downloadLink = document.createElement("a");
    downloadLink.href = generatedImage;
    downloadLink.download = "generated_image.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="App">
      <h1>Application React</h1>
      <p>Message du serveur Node.js : {message}</p>

      <textarea
        rows="4"
        cols="50"
        value={inputText}
        onChange={handleTextareaChange}
        placeholder="Entrez du texte ici..."
      />
      <br />
      <br />
      {generatedImage && (
        <div>
          <h2>Image générée :</h2>
          <img src={generatedImage} alt="Image générée" />
          <button
            onClick={downloadImage}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "5px",
              marginTop: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Télécharger l'image
          </button>
        </div>
      )}
      <button
        onClick={generateImage}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "5px",
          marginTop: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        Générer une image
      </button>
    </div>
  );
}

export default App;

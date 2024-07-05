import React, { useState, useRef, useEffect } from "react";
import "./fileshare.css";
import { uploadFile } from "./service/api";

export default function FileShare() {
  const fileInputRef = useRef();
  const [file, setFile] = useState();
  const [output, setOutput] = useState("");

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setOutput(response);
        console.log("response", response);
      }
    };

    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="fileshare">
      <div
        className="main-wrapper"
        style={{
          backgroundImage: `url('https://cdn.pixabay.com/photo/2017/08/20/17/42/gulls-2662550_1280.jpg')`,
        }}
      >
        <div className="container">
          <div className="wrapper">
            <h1>Share and Download seamlessly</h1>
            <p>Upload and share the download link</p>
            <button onClick={onUploadClick}>Upload</button>
            <input
              className="inputh"
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            {output && (
              <>
                <a href={output} target="_blank" rel="noopener noreferrer">
                  {output}
                </a>
                <button onClick={copyToClipboard} className="copy-button">
                  Copy Link
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

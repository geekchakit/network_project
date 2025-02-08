"use client";

import { useState, useEffect } from "react";
import ImageTracer from "imagetracerjs";
import { XIcon, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import Loader from "../loader";

const LogoUploadModal = ({ isOpen, onClose, device }) => {
  const [currentLogo, setCurrentLogo] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [svg, setSvg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);

  useEffect(() => {
    if (device?.logo) {
      setCurrentLogo(device.logo);
    }
  }, [device]);

  console.log("Device", device);

  if (!isOpen) return null;

  const convertImageToSVG = async (file) => {
    setImageLoader(true); // Start loading

    try {
      const reader = new FileReader();

      const imageDataUrl = await new Promise((resolve, reject) => {
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

      const img = new Image();
      img.src = imageDataUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Create an off-screen canvas to resize the image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const targetSize = 128; // 8rem in pixels
      canvas.width = targetSize;
      canvas.height = targetSize;

      // Draw resized image onto canvas
      ctx.drawImage(img, 0, 0, targetSize, targetSize);

      // Convert the canvas image to a data URL
      const resizedImageData = canvas.toDataURL();

      // Convert to SVG using ImageTracer
      const svgString = await new Promise((resolve) => {
        ImageTracer.imageToSVG(resizedImageData, (svg) => resolve(svg), {
          pathomit: 8,
        });
      });

      // Modify the SVG output to enforce size
      const resizedSvg = svgString.replace(
        /<svg([^>]*)>/,
        `<svg$1 width="128" height="128" viewBox="0 0 128 128">`
      );

      return resizedSvg;
    } catch (error) {
      console.error("Error converting image to SVG:", error);
      return null;
    } finally {
      setImageLoader(false); // Stop loading
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setLoading(true);
      try {
        const svgData = await convertImageToSVG(file);
        setSvg(svgData);
      } catch (error) {
        console.error("Error converting image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-background w-[80%] max-w-lg p-6 rounded-lg relative shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upload Your Logo</h2>
          <button onClick={onClose} className="hover:text-green-400">
            <XIcon />
          </button>
        </div>

        {/* Display Current Logo */}
        {currentLogo && (
          <div className="flex flex-col items-center mb-4">
            {/* Display Current Logo Properly */}
            {currentLogo && (
              <div className="flex flex-col items-center mb-4">
                {currentLogo.endsWith("</svg>\n") ? (
                  // Render SVG inline
                  <>
                    <h3 className="text-lg font-medium">Current Logo</h3>
                    <div
                      className="h-24 w-auto mt-2"
                      dangerouslySetInnerHTML={{ __html: currentLogo }}
                    />
                  </>
                ) : (
                  <h3 className="text-lg font-medium">No Current Logo</h3>
                )}
              </div>
            )}
          </div>
        )}

        {/* File Upload Input */}
        <input type="file" accept="image/*" onChange={handleFileUpload} />

        {/* Display Uploaded Image */}
        {/* {uploadedImage && (
          <div className="flex flex-col items-center mt-4">
            <h3 className="text-lg font-medium">Uploaded Image</h3>
            <img
              src={uploadedImage}
              alt="Uploaded Logo"
              className="h-24 w-auto mt-2"
            />
          </div>
        )} */}

        {/* Loader While Converting */}
        {imageLoader ? (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : (
          svg && (
            <div className="flex flex-col items-center mt-4">
              <h3 className="text-lg font-medium">Generated SVG</h3>
              <div
                dangerouslySetInnerHTML={{ __html: svg }}
                className="border p-2 mt-2"
              />
            </div>
          )
        )}

        {/* Modal Actions */}
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default LogoUploadModal;

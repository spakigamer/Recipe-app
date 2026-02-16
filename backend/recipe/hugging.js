import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      console.error("No file received");
      return res.status(400).json({ success: false, error: "No image file provided" });
    }

    console.log(`Starting analysis for file. Size: ${req.file.size} bytes`);

    // Upload to Cloudinary using stream (since we have a buffer)
    console.log("Uploading image to Cloudinary...");
    
    const cloudinaryResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "food-analysis",
                resource_type: "auto",
                transformation: [
                    { width: 800, crop: "limit" },
                    { quality: "auto" },
                    { fetch_format: "auto" }
                ]
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload failed:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        uploadStream.end(req.file.buffer);
    });

    console.log(`Cloudinary upload successful. URL: ${cloudinaryResult.secure_url}`);

    // You can also create different versions
    const thumbnailUrl = cloudinary.url(cloudinaryResult.public_id, {
      width: 200,
      height: 200,
      crop: "fill",
      gravity: "auto"
    });

    // Send the optimized image to Hugging Face
    console.log("Sending image to Hugging Face model...");
    const imageResponse = await fetch(cloudinaryResult.secure_url);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/microsoft/resnet-50",
      {
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: base64Image,
        }),
      }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Hugging Face API error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    console.log("Hugging Face analysis complete.");
    
    // No local file to delete since we used memory storage
    
    res.json({ 
      success: true, 
      data: {
        raw: result,
        original: cloudinaryResult.secure_url,
        thumbnail: thumbnailUrl,
        publicId: cloudinaryResult.public_id
      }
    });

  } catch (err) {
    console.error("Error during analysis:", err);
    // No local file to delete
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};

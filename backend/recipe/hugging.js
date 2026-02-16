import fs from "fs";
import fetch from "node-fetch";

export const analyzeImage = async (req, res) => {
  try {
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString('base64');

    // Using a food-specific model
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
    
    res.json({ 
      success: true, 
      data: {
        raw: result
      }
    });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};
// This is a simplified client for Gemini API
// In a real app, you would use the official Google AI SDK

import axios from "axios";

// In a real app, you would use environment variables for API keys
const API_KEY = "YOUR_GEMINI_API_KEY"; 
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent";

export interface GeminiResponse {
  text: string;
  error?: string;
}

export async function generatePromptFromImage(imageBase64: string): Promise<GeminiResponse> {
  try {
    // This is a simplified version of the Gemini API request
    // In a real app, you would use the official Google AI SDK
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: "Generate a detailed prompt that describes this image for AI image generation. Focus on style, composition, lighting, subject matter, and mood. Make it detailed enough to recreate a similar image."
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: imageBase64.replace(/^data:image\/[a-z]+;base64,/, "")
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 1024,
        }
      }
    );

    // Extract the generated text from the response
    const generatedText = response.data.candidates[0].content.parts[0].text;
    return { text: generatedText };
  } catch (error: any) {
    console.error("Error generating prompt:", error);
    return { 
      text: "", 
      error: error.response?.data?.error?.message || "Failed to generate prompt" 
    };
  }
}

// Mock function for development without API key
export async function mockGeneratePromptFromImage(imageUrl: string): Promise<GeminiResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return mock responses based on different images
  if (imageUrl.includes("landscape")) {
    return { 
      text: "A breathtaking mountain landscape at golden hour, with dramatic peaks silhouetted against a vibrant orange and purple sky. The foreground features a serene alpine lake reflecting the mountains and sky. Shot with ultra-wide angle lens, high dynamic range, professional nature photography, crisp details, atmospheric lighting." 
    };
  } else if (imageUrl.includes("portrait")) {
    return { 
      text: "Professional portrait photography of a person with soft, natural lighting from a large window. Shallow depth of field with background bokeh. Subject positioned using rule of thirds, with thoughtful expression. Muted, natural color palette with subtle skin tones. Shot with 85mm lens at f/1.8." 
    };
  } else if (imageUrl.includes("urban")) {
    return { 
      text: "Urban street photography capturing a bustling city intersection at dusk. Neon signs reflect on wet pavement after rain. Long exposure creating light trails from passing vehicles. Cinematic composition with strong leading lines. Cyberpunk aesthetic with high contrast and vibrant blues and purples." 
    };
  } else {
    return { 
      text: "Detailed photographic image with professional composition and lighting. Subject is clearly focused with balanced exposure and natural colors. Background provides context while maintaining subject emphasis. Shot with professional camera equipment using optimal settings for the scene." 
    };
  }
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Loader2, RefreshCw } from "lucide-react";
import Image from "next/image";
import { CameraCapture } from "@/components/camera-capture";
import { PokemonResult } from "@/components/pokemon-result";
import { useMobile } from "@/hooks/use-mobile";

export default function CapturePage() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const isMobile = useMobile();

  const handleCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc);
  };

  // const handleAnalyze = async () => {
  //   if (!capturedImage) return

  //   setIsAnalyzing(true)

  //   // Simulate AI analysis with a delay
  //   setTimeout(() => {
  //     // Mock result - in a real app, this would come from an AI model
  //     const mockResult = {
  //       name: "Pikachu",
  //       confidence: 0.92,
  //       description:
  //         "Pikachu is an Electric-type Pokémon introduced in Generation I. It evolves from Pichu when leveled up with high friendship and evolves into Raichu when exposed to a Thunder Stone.",
  //       type: "Electric",
  //       stats: {
  //         hp: 35,
  //         attack: 55,
  //         defense: 40,
  //         speed: 90,
  //       },
  //     }

  //     setResult(mockResult)
  //     setIsAnalyzing(false)
  //   }, 2000)
  // }

  const handleAnalyze = async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);

    try {
      const res = await fetch("/api/query-llm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64: capturedImage,
          prompt: `You are a Pokédex assistant. Analyze the following Pokémon image and return a JSON object in the following format:

          {
            "id": number,
            "name": string,
            "confidence": number (0.0 to 1.0),
            "description": string,
            "type": string,
            "stats": {
              "hp": number,
              "attack": number,
              "defense": number,
              "specialAttack": number,
              "specialDefense": number,
              "speed": number,

            }
          }

          Only return the JSON. Do not include any extra text.

          What Pokémon is in this image? If its not a pokemon return most related pokemon details. Just return JSON as above and dont include any extra text like \`\`\`json.`,
        }),
      });

      const data = await res.json();
      try {
        // const parsed = JSON.parse(data.response);
        const parsed = data.response; // Assuming the API returns a valid JSON string
        console.log("API response:", parsed);
        setResult(parsed)
      } catch (e) {
        console.error("Invalid JSON", e)
      }
      // setResult(data?.response || { error: "No response from model" });
    } catch (err: any) {
      setResult({ error: err.message || "Fetch failed" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setCapturedImage(null);
    setResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gradient-pokemon mb-8">
        Capture Pokémon
      </h1>

      <div className="max-w-md mx-auto">
        {!capturedImage ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <p className="text-lg font-medium">
                  Take a photo of a Pokémon to identify it
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {isMobile
                    ? "Use your camera to snap a photo"
                    : "Upload an image or use your webcam"}
                </p>
              </div>
              <CameraCapture onCapture={handleCapture} />
            </CardContent>
          </Card>
        ) : result ? (
          <div className="space-y-6">
            <div className="aspect-square relative rounded-lg overflow-hidden border">
              <Image
                src={capturedImage || "/placeholder.svg"}
                alt="Captured image"
                fill
                className="object-cover"
              />
            </div>

            <PokemonResult pokemon={result} />

            <Button onClick={handleReset} className="w-full" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Capture Another
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="aspect-square relative rounded-lg overflow-hidden border">
              <Image
                src={capturedImage || "/placeholder.svg"}
                alt="Captured image"
                fill
                className="object-cover"
              />
            </div>

            {isAnalyzing ? (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Image...
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1"
                >
                  Retake
                </Button>
                <Button
                  onClick={handleAnalyze}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Identify
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


import Resizer from "react-image-file-resizer";


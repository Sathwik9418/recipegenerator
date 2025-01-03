"use client";
import "@/app/globals.css";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react"; // Using Lucide icon for spinner

export default function Home() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    if (!query) {
      setError("Please enter an ingredient or recipe name.");
      return;
    }

    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const response = await axios.post("http://localhost:5000/api/recipes", { query });
      setRecipes(response.data.recipes);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-500 to-green-600 p-6">
      <Card className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-4xl font-bold text-center text-green-700">Recipe Finder</h1>
        <p className="text-lg text-center text-gray-600">
          Find delicious recipes based on ingredients or dish names.
        </p>

        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Enter ingredient or recipe name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow p-4 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <Button
            onClick={fetchRecipes}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" size={24} /> : "Search"}
          </Button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mt-6 space-y-4">
          {recipes.map((recipe, index) => (
            <Card key={index} className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-xl font-bold text-gray-800">{recipe.title}</h2>
              <a
                href={recipe.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:underline"
              >
                View Recipe
              </a>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

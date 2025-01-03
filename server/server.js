const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/recipes", async (req, res) => {
  const { query } = req.body;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          query,
          number: 10,
          apiKey,
        },
      }
    );

    res.json({ recipes: response.data.results.map((recipe) => ({
      title: recipe.title,
      url: `https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`,
    })) });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

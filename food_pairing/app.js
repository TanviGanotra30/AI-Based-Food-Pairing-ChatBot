/*const apiKey = "2ccfadacdb104e29a1bc9fa8d8d9d9d7"; // 🔥 Replace with your Spoonacular API key
const chatbox = document.getElementById("chatbox");

// Handle user input on Enter key
function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// Send user message to chatbot
function sendMessage() {
  const userInput = document.getElementById("userInput").value.trim();

  if (userInput === "") {
    return;
  }

  // Add user message to chatbox
  addMessage(userInput, "user");
  getPairings(userInput);
  document.getElementById("userInput").value = "";
}

// Add messages to chatbox
function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "bot" ? "bot-message" : "user-message";
  messageDiv.innerText = text;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Get pairings from API
function getPairings(ingredient) {
  const searchUrl = `https://api.spoonacular.com/food/ingredients/search?query=${ingredient}&number=1&apiKey=${apiKey}`;

  fetch(searchUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to search for ingredient.");
      }
      return response.json();
    })
    .then((data) => {
      if (data.results.length === 0) {
        addMessage(`Sorry, I couldn't find pairings for "${ingredient}". 😞`, "bot");
        return;
      }

      // Get the ingredient ID
      const ingredientId = data.results[0].id;
      const ingredientName = data.results[0].name;
      getIngredientPairings(ingredientId, ingredientName);
    })
    .catch((error) => {
      console.error("Error:", error);
      addMessage("Oops! Something went wrong. Please try again.", "bot");
    });
}

// Get Ingredient Pairings by ID
function getIngredientPairings(ingredientId, ingredientName) {
  const url = `https://api.spoonacular.com/food/ingredients/${ingredientId}/information?amount=1&apiKey=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch ingredient information.");
      }
      return response.json();
    })
    .then((data) => {
      // Check if pairings exist
      if (data.pairings && data.pairings.length > 0) {
        const pairingsList = data.pairings.join(", ");
        addMessage(`For "${ingredientName}", try pairing with: ${pairingsList}. 😋`, "bot");
      } else {
        addMessage(`No pairings found for "${ingredientName}". Try something else! 🤔`, "bot");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      addMessage("Error fetching pairings. Please try again.", "bot");
    });
}*/

/*const apiKey = "YOUR_API_K2ccfadacdb104e29a1bc9fa8d8d9d9d7Y"; // 🔥 Replace with your Spoonacular API key
const chatbox = document.getElementById("chatbox");

// Handle user input on Enter key
function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// Send user message to chatbot
function sendMessage() {
  const userInput = document.getElementById("userInput").value.trim();

  if (userInput === "") {
    return;
  }

  // Add user message to chatbox
  addMessage(userInput, "user");
  getPairings(userInput);
  document.getElementById("userInput").value = "";
}

// Add messages to chatbox
function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "bot" ? "bot-message" : "user-message";
  messageDiv.innerHTML = text;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Get pairings from API
function getPairings(ingredient) {
  const searchUrl = `https://api.spoonacular.com/food/ingredients/search?query=${ingredient}&number=1&apiKey=${apiKey}`;

  fetch(searchUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to search for ingredient.");
      }
      return response.json();
    })
    .then((data) => {
      if (data.results.length === 0) {
        addMessage(`Sorry, I couldn't find any ingredients named "${ingredient}". 😞`, "bot");
        return;
      }

      // Get the first result and normalize its name (e.g., "chicken fat" should be treated as "chicken")
      const ingredientId = data.results[0].id;
      const ingredientName = normalizeIngredientName(data.results[0].name);

      getIngredientPairings(ingredientId, ingredientName);
    })
    .catch((error) => {
      console.error("Error:", error);
      addMessage("Oops! Something went wrong. Please try again.", "bot");
    });
}

// Normalize ingredient name to avoid mismatches (like "chicken fat")
function normalizeIngredientName(name) {
  const normalizedNames = {
    "chicken fat": "chicken",
    "chicken breast": "chicken",
    "chocolate hazelnut spread": "nutella"
    // Add any other specific ingredient fixes you may encounter
  };

  return normalizedNames[name] || name;
}

// Get Ingredient Pairings by ID
function getIngredientPairings(ingredientId, ingredientName) {
  const url = `https://api.spoonacular.com/food/ingredients/${ingredientId}/information?amount=1&apiKey=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch ingredient information.");
      }
      return response.json();
    })
    .then((data) => {
      // Check if pairings exist
      if (data.pairings && data.pairings.length > 0) {
        const pairingsList = data.pairings.map(pairing => `<li>${pairing}</li>`).join('');
        addMessage(`For "${ingredientName}", try pairing with the following ingredients:`, "bot");
        addMessage(`<ul>${pairingsList}</ul>`, "bot");
      } else {
        addMessage(`No predefined pairings found for "${ingredientName}". Here's a suggestion instead:`, "bot");
        getRecipeSuggestions(ingredientName);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      addMessage("Error fetching pairings. Please try again.", "bot");
    });
}

// Fallback: Get Recipe Suggestions for Ingredient
function getRecipeSuggestions(ingredientName) {
  const recipeUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientName}&number=3&apiKey=${apiKey}`;

  fetch(recipeUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch recipe suggestions.");
      }
      return response.json();
    })
    .then((data) => {
      if (data.length === 0) {
        addMessage(`Sorry, no recipes found for "${ingredientName}". Try a different ingredient! 🤔`, "bot");
      } else {
        const recipeList = data.map(recipe => `<li><a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}" target="_blank">${recipe.title}</a></li>`).join('');
        addMessage(`Here are some recipes you can try with "${ingredientName}":`, "bot");
        addMessage(`<ul>${recipeList}</ul>`, "bot");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      addMessage("Oops! Something went wrong. Please try again later.", "bot");
    });
}*/


/*const apiKey = "2ccfadacdb104e29a1bc9fa8d8d9d9d7"; // Replace with your Spoonacular API key
const chatbox = document.getElementById("chatbox");

// Handle user input on Enter key
function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// Send user message to chatbot
function sendMessage() {
  const userInput = document.getElementById("userInput").value.trim().toLowerCase();

  if (userInput === "") return;

  addMessage(userInput, "user");
  getPairings(userInput);
  document.getElementById("userInput").value = "";
}

// Add messages to chatbox
function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "bot" ? "bot-message" : "user-message";
  messageDiv.innerHTML = text; // Allows rendering HTML lists
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Get pairings from API
function getPairings(ingredient) {
  const searchUrl = `https://api.spoonacular.com/food/ingredients/search?query=${ingredient}&number=5&apiKey=${apiKey}`;

  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("🔍 Ingredient Search Response:", data);

      if (data.results.length === 0) {
        addMessage(`❌ No ingredients found for "${ingredient}". Try something else!`, "bot");
        return;
      }

      // Find best match (avoid "chicken fat" issue)
      let bestMatch = data.results.find((item) => item.name.toLowerCase() === ingredient.toLowerCase()) || data.results[0];

      const ingredientId = bestMatch.id;
      const ingredientName = bestMatch.name;
      console.log(`✅ Best Match: ID=${ingredientId}, Name="${ingredientName}"`);

      getIngredientPairings(ingredientId, ingredientName);
    })
    .catch((error) => {
      console.error("❌ Error fetching ingredient:", error);
      addMessage("⚠️ Oops! Something went wrong. Please try again.", "bot");
    });
}

// Get Ingredient Pairings by ID
function getIngredientPairings(ingredientId, ingredientName) {
  const url = `https://api.spoonacular.com/food/ingredients/${ingredientId}/information?amount=1&apiKey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("🔗 Pairing Response:", data);

      if (data.pairings && data.pairings.length > 0) {
        // Display pairings as a list
        const pairingsList = `<ul>${data.pairings.map((pair) => `<li>${pair}</li>`).join("")}</ul>`;
        addMessage(`🍽️ **Best pairings for "${ingredientName}":** ${pairingsList}`, "bot");
      } else {
        // If no pairings, get recipe suggestions instead
        addMessage(`❌ No predefined pairings found for "${ingredientName}". Here are some recipe ideas instead!`, "bot");
        getRecipes(ingredientName);
      }
    })
    .catch((error) => {
      console.error("❌ Error fetching pairings:", error);
      addMessage("⚠️ Error fetching pairings. Please try again.", "bot");
    });
}

// Fetch recipes if no pairings are found
function getRecipes(ingredientName) {
  const recipeUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientName}&number=3&apiKey=${apiKey}`;

  fetch(recipeUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("🍽️ Recipe Response:", data);

      if (data.length === 0) {
        addMessage(`❌ No recipes found for "${ingredientName}". Try another ingredient!`, "bot");
        return;
      }

      // Display recipes as clickable links
      const recipesList = `<ul>${data
        .map(
          (recipe) =>
            `<li><a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}" target="_blank">${recipe.title}</a></li>`
        )
        .join("")}</ul>`;

      addMessage(`👨‍🍳 Here are some **recipes** for "${ingredientName}": ${recipesList}`, "bot");
    })
    .catch((error) => {
      console.error("❌ Error fetching recipes:", error);
      addMessage("⚠️ Error fetching recipes. Please try again.", "bot");
    });
}*/


const apiKey = "2ccfadacdb104e29a1bc9fa8d8d9d9d7"; // Replace with your Spoonacular API key
const chatbox = document.getElementById("chatbox");

// Handle user input on Enter key
function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// Send user message to chatbot
function sendMessage() {
  const userInput = document.getElementById("userInput").value.trim().toLowerCase();

  if (userInput === "") return;

  addMessage(userInput, "user");
  getPairings(userInput);
  document.getElementById("userInput").value = "";
}

// Add messages to chatbox
function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "bot" ? "bot-message" : "user-message";
  messageDiv.innerHTML = text; // Allows rendering HTML lists
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Get pairings from API
function getPairings(ingredient) {
  const searchUrl = `https://api.spoonacular.com/food/ingredients/search?query=${ingredient}&number=5&apiKey=${apiKey}`;

  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("🔍 Ingredient Search Response:", data);

      if (data.results.length === 0) {
        addMessage(`❌ No ingredients found for "${ingredient}". Try something else!`, "bot");
        return;
      }

      // Find best match that exactly matches user input or closely resembles it
      let bestMatch = data.results.find((item) => 
        item.name.toLowerCase() === ingredient.toLowerCase() || 
        item.name.toLowerCase().includes(ingredient.toLowerCase())
      );

      if (!bestMatch) {
        bestMatch = data.results[0]; // Fallback to first result if no close match
      }

      const ingredientId = bestMatch.id;
      const ingredientName = bestMatch.name;
      console.log(`✅ Best Match: ID=${ingredientId}, Name="${ingredientName}"`);

      getIngredientPairings(ingredientId, ingredientName);
    })
    .catch((error) => {
      console.error("❌ Error fetching ingredient:", error);
      addMessage("⚠️ Oops! Something went wrong. Please try again.", "bot");
    });
}

// Get Ingredient Pairings by ID
/*function getIngredientPairings(ingredientId, ingredientName) {
  const url = `https://api.spoonacular.com/food/ingredients/${ingredientId}/information?amount=1&apiKey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("🔗 Pairing Response:", data);

      if (data.pairings && data.pairings.length > 0) {
        // Display pairings as a list
        const pairingsList = `<ul>${data.pairings.map((pair) => `<li>${pair}</li>`).join("")}</ul>`;
        addMessage(`🍽️ **Best pairings for "${ingredientName}":** ${pairingsList}`, "bot");
      } else {
        // If no pairings, get recipe suggestions instead
        addMessage(`❌ No predefined pairings found for "${ingredientName}". Here are some recipe ideas instead!`, "bot");
        getRecipes(ingredientName);
      }
    })
    .catch((error) => {
      console.error("❌ Error fetching pairings:", error);
      addMessage("⚠️ Error fetching pairings. Please try again.", "bot");
    });
}

// Fetch recipes if no pairings are found
function getRecipes(ingredientName) {
  const recipeUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientName}&number=3&apiKey=${apiKey}`;

  fetch(recipeUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("🍽️ Recipe Response:", data);

      if (data.length === 0) {
        addMessage(`❌ No recipes found for "${ingredientName}". Try another ingredient!`, "bot");
        return;
      }

      // Display recipes as clickable links
      const recipesList = `<ul>${data
        .map(
          (recipe) =>
            `<li><a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}" target="_blank">${recipe.title}</a></li>`
        )
        .join("")}</ul>`;

      addMessage(`👨‍🍳 Here are some **recipes** for "${ingredientName}": ${recipesList}`, "bot");
    })
    .catch((error) => {
      console.error("❌ Error fetching recipes:", error);
      addMessage("⚠️ Error fetching recipes. Please try again.", "bot");
    });
}*/

// Get Ingredient Pairings by ID
function getIngredientPairings(ingredientId, ingredientName) {
  const url = `https://api.spoonacular.com/food/ingredients/${ingredientId}/information?amount=1&apiKey=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch ingredient information.");
      }
      return response.json();
    })
    .then((data) => {
      let message = `🍽️ **Results for "${ingredientName}":**\n\n`;

      // ✅ Show Pairings if available
      if (data.pairings && data.pairings.length > 0) {
        message += `🥗 **Best Pairings:**\n${data.pairings.map((pair) => `- ${pair}`).join("\n")}\n\n`;
      }

      // ✅ Fetch & Show Recipe Ideas
      fetchRecipes(ingredientName, message);
    })
    .catch((error) => {
      console.error("Error:", error);
      addMessage("Error fetching pairings. Please try again.", "bot");
    });
}

// Fetch Recipes for the Ingredient
/*function fetchRecipes(ingredientName, existingMessage) {
  const recipeUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientName}&number=3&apiKey=${apiKey}`;

  fetch(recipeUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch recipes.");
      }
      return response.json();
    })
    .then((recipes) => {
      let message = `🍽️ Results for "${ingredientName}"\n\n`;

      if (existingMessage.includes("🥗")) {
        message += existingMessage.replace("🍽️", "").trim() + "\n\n";
      }

      if (recipes.length > 0) {
        message += `👨‍🍳 Try these Recipes:\n\n`;
        recipes.forEach((recipe) => {
          message += `- 🔗 <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}" target="_blank">${recipe.title}</a><br>\n`;
        });
      } else {
        message += `😞 No recipes found for "${ingredientName}". Try something else! 🤔\n`;
      }

      addMessage(message, "bot");
    })
    .catch((error) => {
      console.error("Error:", error);
      addMessage(existingMessage, "bot");
    });
}*/

// Fetch Recipes for the Ingredient
function fetchRecipes(ingredientName, existingMessage) {
  const recipeUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientName}&number=3&apiKey=${apiKey}`;

  fetch(recipeUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch recipes.");
      }
      return response.json();
    })
    .then((recipes) => {
      let message = `🍽️Results for "${ingredientName}"<br><br>`;

      if (recipes.length > 0) {
        message += `👨‍🍳 Try these Recipes:<br><br>`;
        recipes.forEach((recipe) => {
          // Add each recipe as a clickable link with a line break after each
          message += `- 🔗 <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}" target="_blank">${recipe.title}</a><br>`;
        });
      } else {
        message += `😞 No recipes found for "${ingredientName}". Try something else! 🤔<br>`;
      }

      addMessage(message, "bot");
    })
    .catch((error) => {
      console.error("Error:", error);
      addMessage(existingMessage, "bot");
    });
}

// Add messages to chatbox
function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "bot" ? "bot-message" : "user-message";
  messageDiv.innerHTML = text;  // Use innerHTML to render HTML properly
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}


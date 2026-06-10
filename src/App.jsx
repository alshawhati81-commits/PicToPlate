import { useState, useRef } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background: #0f1a10;
    color: #f0ece0;
    min-height: 100vh;
  }

  .app {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* HERO */
  .hero {
    padding: 48px 24px 32px;
    text-align: center;
  }

  .logo-icon {
    font-size: 48px;
    margin-bottom: 16px;
    display: block;
  }

  .hero h1 {
    font-family: 'Fraunces', serif;
    font-size: 44px;
    font-weight: 700;
    line-height: 1.1;
    color: #7ecf60;
    margin-bottom: 8px;
    letter-spacing: -1px;
  }

  .hero p {
    font-size: 15px;
    color: #9aab8a;
    line-height: 1.5;
    max-width: 300px;
    margin: 0 auto;
  }

  /* UPLOAD ZONE */
  .upload-section {
    padding: 0 24px 24px;
  }

  .upload-zone {
    border: 2px dashed #2e4a2e;
    border-radius: 20px;
    padding: 40px 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #141f14;
    position: relative;
    overflow: hidden;
  }

  .upload-zone:hover, .upload-zone.drag-over {
    border-color: #7ecf60;
    background: #1a2e1a;
  }

  .upload-zone input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .upload-preview {
    width: 100%;
    border-radius: 16px;
    max-height: 240px;
    object-fit: cover;
    display: block;
  }

  .upload-placeholder .upload-emoji {
    font-size: 44px;
    display: block;
    margin-bottom: 12px;
  }

  .upload-placeholder h3 {
    font-size: 17px;
    font-weight: 600;
    color: #f0ece0;
    margin-bottom: 6px;
  }

  .upload-placeholder p {
    font-size: 13px;
    color: #6a8060;
  }

  .change-photo-btn {
    margin-top: 12px;
    background: #1e321e;
    border: 1px solid #2e4a2e;
    color: #9aab8a;
    padding: 8px 20px;
    border-radius: 100px;
    font-size: 13px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s;
  }

  .change-photo-btn:hover {
    border-color: #7ecf60;
    color: #7ecf60;
  }

  /* SCAN BUTTON */
  .scan-btn {
    display: block;
    width: calc(100% - 48px);
    margin: 0 24px 32px;
    padding: 18px;
    background: #7ecf60;
    color: #0a1208;
    border: none;
    border-radius: 16px;
    font-size: 17px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: -0.2px;
  }

  .scan-btn:hover:not(:disabled) {
    background: #91db72;
    transform: translateY(-1px);
  }

  .scan-btn:disabled {
    background: #2e4a2e;
    color: #4a6a40;
    cursor: not-allowed;
    transform: none;
  }

  /* LOADING */
  .loading-section {
    padding: 0 24px 32px;
    text-align: center;
  }

  .loading-spinner {
    width: 48px;
    height: 48px;
    border: 3px solid #1e321e;
    border-top-color: #7ecf60;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 16px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading-section p {
    color: #9aab8a;
    font-size: 15px;
  }

  .loading-section .loading-sub {
    font-size: 13px;
    color: #4a6a40;
    margin-top: 4px;
  }

  /* INGREDIENTS FOUND */
  .ingredients-bar {
    margin: 0 24px 20px;
    background: #141f14;
    border: 1px solid #2e4a2e;
    border-radius: 14px;
    padding: 14px 16px;
  }

  .ingredients-bar .label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.8px;
    color: #4a6a40;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .ingredient-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .ingredient-tag {
    background: #1e321e;
    color: #9aab8a;
    padding: 4px 10px;
    border-radius: 100px;
    font-size: 13px;
    border: 1px solid #2e4a2e;
  }

  /* RECIPES */
  .recipes-section {
    padding: 0 24px 40px;
  }

  .recipes-header {
    font-family: 'Fraunces', serif;
    font-size: 24px;
    font-weight: 700;
    color: #f0ece0;
    margin-bottom: 16px;
  }

  .recipe-card {
    background: #141f14;
    border: 1px solid #2e4a2e;
    border-radius: 20px;
    margin-bottom: 16px;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .recipe-card:hover {
    border-color: #4a6a40;
  }

  .recipe-header {
    padding: 20px 20px 0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }

  .recipe-meta {
    flex: 1;
  }

  .recipe-emoji {
    font-size: 32px;
    display: block;
    margin-bottom: 8px;
  }

  .recipe-name {
    font-family: 'Fraunces', serif;
    font-size: 20px;
    font-weight: 700;
    color: #f0ece0;
    margin-bottom: 6px;
    line-height: 1.2;
  }

  .recipe-badges {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .badge {
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 100px;
    font-weight: 500;
  }

  .badge-time {
    background: #1a2e3a;
    color: #60a8c8;
    border: 1px solid #1e4060;
  }

  .badge-diff {
    background: #2e2a14;
    color: #c8a840;
    border: 1px solid #4a3e1a;
  }

  .expand-btn {
    background: #1e321e;
    border: 1px solid #2e4a2e;
    color: #7ecf60;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    font-size: 16px;
    transition: all 0.2s;
    margin-top: 4px;
  }

  .expand-btn:hover {
    background: #2e4a2e;
  }

  .recipe-desc {
    padding: 10px 20px 16px;
    font-size: 14px;
    color: #6a8060;
    line-height: 1.5;
  }

  .recipe-details {
    border-top: 1px solid #1e321e;
    padding: 20px;
  }

  .detail-section-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.8px;
    color: #4a6a40;
    text-transform: uppercase;
    margin-bottom: 10px;
< truncated lines 341-352 >
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ingredients-list li::before {
    content: '';
    width: 5px;
    height: 5px;
    background: #7ecf60;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .steps-list {
    list-style: none;
    counter-reset: steps;
  }

  .steps-list li {
    font-size: 14px;
    color: #9aab8a;
    line-height: 1.6;
    padding: 10px 0 10px 40px;
    border-bottom: 1px solid #1a2a1a;
    position: relative;
    counter-increment: steps;
  }

  .steps-list li::before {
    content: counter(steps);
    position: absolute;
    left: 0;
    top: 10px;
    width: 24px;
    height: 24px;
    background: #1e321e;
    border: 1px solid #2e4a2e;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    color: #7ecf60;
    line-height: 24px;
    text-align: center;
  }

  /* RESET */
  .reset-btn {
    display: block;
    width: calc(100% - 48px);
    margin: 0 24px 40px;
    padding: 14px;
    background: transparent;
    color: #4a6a40;
    border: 1px solid #2e4a2e;
    border-radius: 14px;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
  }

  .reset-btn:hover {
    border-color: #4a6a40;
    color: #9aab8a;
  }

  /* ERROR */
  .error-box {
    margin: 0 24px 24px;
    background: #2a1414;
    border: 1px solid #4a1e1e;
    border-radius: 14px;
    padding: 16px;
    font-size: 14px;
    color: #c87070;
    line-height: 1.5;
  }
`;

export default function FridgeToFork() {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImage(url);
    setResult(null);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result.split(",")[1];
      setImageBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const analyzeImage = async () => {
    if (!imageBase64) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setExpandedRecipe(null);

    try {
      const prompt = `You are a world-class chef. Look at this photo of ingredients and return ONLY a valid JSON object (no markdown, no backticks, no explanation).

Return this exact structure:
{
  "ingredients": ["ingredient1", "ingredient2", ...],
  "recipes": [
    {
      "name": "Recipe Name",
      "emoji": "🍳",
      "time": "20 mins",
      "difficulty": "Easy",
      "description": "One sentence description",
      "ingredients": ["ingredient with amount", ...],
      "steps": ["Step 1 instruction", "Step 2 instruction", ...]
    }
  ]
}

Rules:
- Identify ALL visible ingredients in the photo
- Suggest exactly 3 recipes using mainly those ingredients
- Each recipe needs 4-6 ingredients and 4-6 steps
- Steps must be clear and detailed
- Return ONLY the JSON, nothing else`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: "image/jpeg", data: imageBase64 }
              },
              { type: "text", text: prompt }
            ]
          }]
        })
      });

      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
      setExpandedRecipe(0);
    } catch (err) {
      setError("Couldn't read the image. Try a clearer photo with good lighting.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setImageBase64(null);
    setResult(null);
    setError(null);
    setExpandedRecipe(null);
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        {/* HERO */}
        <div className="hero">
          <span className="logo-icon">🍽️</span>
          <h1>PicToPlate</h1>
          <p>Snap your ingredients, get instant recipes. No typing. Just cook.</p>
        </div>

        {/* UPLOAD */}
        <div className="upload-section">
          <div
            className={`upload-zone ${dragOver ? "drag-over" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => !image && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => handleFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            {image ? (
              <img src={image} alt="Ingredients" className="upload-preview" />
            ) : (
              <div className="upload-placeholder">
                <span className="upload-emoji">📸</span>
                <h3>Take or upload a photo</h3>
                <p>Photo your fridge, counter, or pantry</p>
              </div>
            )}
          </div>

          {image && (
            <div style={{ textAlign: "center", marginTop: "12px" }}>
              <button
                className="change-photo-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                Change photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          )}
        </div>

        {/* SCAN BUTTON */}
        {!result && !loading && (
          <button
            className="scan-btn"
            onClick={analyzeImage}
            disabled={!image}
          >
            {image ? "✨ Find Recipes" : "Upload a photo first"}
          </button>
        )}

        {/* LOADING */}
        {loading && (
          <div className="loading-section">
            <div className="loading-spinner" />
            <p>Scanning your ingredients...</p>
            <p className="loading-sub">Finding the best recipes for you</p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="error-box">⚠️ {error}</div>
        )}

        {/* RESULTS */}
        {result && (
          <>
            {/* Ingredients found */}
            <div className="ingredients-bar">
              <div className="label">Ingredients found</div>
              <div className="ingredient-tags">
                {result.ingredients?.map((ing, i) => (
                  <span key={i} className="ingredient-tag">{ing}</span>
                ))}
              </div>
            </div>

            {/* Recipes */}
            <div className="recipes-section">
              <div className="recipes-header">3 recipes for you</div>
              {result.recipes?.map((recipe, i) => (
                <div key={i} className="recipe-card">
                  <div
                    className="recipe-header"
                    onClick={() => setExpandedRecipe(expandedRecipe === i ? null : i)}
                  >
                    <div className="recipe-meta">
                      <span className="recipe-emoji">{recipe.emoji}</span>
                      <div className="recipe-name">{recipe.name}</div>
                      <div className="recipe-badges">
                        <span className="badge badge-time">⏱ {recipe.time}</span>
                        <span className="badge badge-diff">⚡ {recipe.difficulty}</span>
                      </div>
                    </div>
                    <button className="expand-btn">
                      {expandedRecipe === i ? "−" : "+"}
                    </button>
                  </div>

                  <div className="recipe-desc">{recipe.description}</div>

                  {expandedRecipe === i && (
                    <div className="recipe-details">
                      <div className="detail-section-title">Ingredients</div>
                      <ul className="ingredients-list">
                        {recipe.ingredients?.map((ing, j) => (
                          <li key={j}>{ing}</li>
                        ))}
                      </ul>

                      <div className="detail-section-title" style={{ marginTop: "16px" }}>Steps</div>
                      <ol className="steps-list">
                        {recipe.steps?.map((step, j) => (
                          <li key={j}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button className="reset-btn" onClick={reset}>
              📸 Try different ingredients
            </button>
          </>
        )}
      </div>
    </>
  );
}

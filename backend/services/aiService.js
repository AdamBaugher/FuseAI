const genAI = require("../utils/geminiClient");
const { jsonrepair } = require('jsonrepair');

/**
 * Generates a MongoDB filter from a natural language query using Gemini LLM.
 * Retries the generation up to `retryCounts` times if it fails.
 * 
 * @param {string} query - The user's natural language query.
 * @param {number} retryCounts - Number of retries on failure.
 * @returns {Promise<object>} - The generated MongoDB filter object.
 */
const getMongoFilterfromLLM = async (query, retryCounts) => {
    if (retryCounts === 0)
        return {};

    // Initialize the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prompt definition
    const prompt = `
    Given a user query, return a MongoDB filter as JSON using this schema:
    
    - name (string)
    - website (string)
    - industry (string)
    - region (string)
    - country (string)
    - locality (string)
    - size (string): one of ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5001-10000", "10000+"]
    - founded (number)
    
    Map phrases like "small", "mid-size", "enterprise", or "over 5k employees" to the nearest 'size' values above.
    For all string fields, use case-insensitive regular expressions that match partial values.
    
    Respond ONLY with a JSON object.
    
    Query: "${query}"
    `;

    try {
        // Generate response from LLM
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();

        // Clean up the response to extract raw JSON
        const cleanJson = responseText
            .replace(/```json\s*/i, '') // Remove ```json if present
            .replace(/```/, '')         // Remove closing ```
            .trim();

        // Repair any malformed JSON
        const fixedJson = jsonrepair(cleanJson);

        // Safely parse the JSON string
        const cleanQuery = Function('"use strict"; return ' + fixedJson)();

        return cleanQuery;
    } catch (e) {
        // Retry on failure
        return getMongoFilterfromLLM(query, retryCounts - 1);
    }
};

module.exports = {
    getMongoFilterfromLLM
};

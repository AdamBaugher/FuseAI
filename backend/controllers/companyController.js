const { getMongoFilterfromLLM } = require("../services/aiService");
const Company = require("../models/Company");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to perform a free text search with optional filter
async function freeTextSearch(req, res) {
    const { query, filterQuery } = req.body;

    try {
        // Generate MongoDB filter based on the query
        const cleanQuery = await getMongoFilterfromLLM(query, 2);

        // Combine the generated filter with the provided filter
        const finalQuery = { $and: [cleanQuery, filterQuery] };

        // Execute the search query and limit to 10 results
        const results = await Company.find(finalQuery).limit(10);

        res.json({ data: results, query: cleanQuery });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}

// Function to filter companies based on user-provided criteria
const filterCompanies = async (req, res) => {
    try {
        const filter = {};
        const queryMap = [
            { key: 'name', type: 'regex' },
            { key: 'website', type: 'regex' },
            { key: 'industry', type: 'regex' },
            { key: 'country', type: 'regex' },
            { key: 'region', type: 'regex' },
            { key: 'locality', type: 'regex' },
            { key: 'size', type: 'exact' },
        ];
        const { searchQuery } = req.body;

        // Dynamically build the filter object based on the queryMap
        for (const { key, type } of queryMap) {
            const value = req.body[key];
            if (value) {
                filter[key] = type === 'regex' ? { $regex: value, $options: 'i' } : value;
            }
        }

        // Handle date range filtering for the 'founded' field
        const { foundedMin, foundedMax } = req.query;
        if (foundedMin || foundedMax) {
            filter.founded = {};
            if (foundedMin) filter.founded.$gte = parseInt(foundedMin);
            if (foundedMax) filter.founded.$lte = parseInt(foundedMax);
        }

        const finalQuery = { $and: [filter, searchQuery] };

        // Fetch companies based on the filter and limit results to 10
        const companies = await Company.find(finalQuery).limit(10);
        res.json({ data: companies, query: filter });
    } catch (err) {
        console.error("Filter error:", err);
        res.status(500).json({ error: "Server error while filtering companies" });
    }
};

// Function to enrich a company's details by generating a summary using AI
async function enrichCompany(req, res) {
    const { id } = req.params;

    try {
        // Fetch the company by ID
        const company = await Company.findById(id);
        if (!company) return res.status(404).json({ error: "Company not found" });

        // Create the prompt for AI to generate a company summary
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });
        const prompt = `Analyze the company(${company.name}) at this URL: ${company.website}.
        Generate a concise 2–3 sentence summary explaining what the company does, its industry, and any unique selling points.`;

        // Get the result from the AI model
        const result = await model.generateContent(prompt);
        const summary = result.response.text().trim();

        // Update the company's summary and save it
        company.summary = summary;
        await company.save();

        res.json({ id: company._id, summary });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    freeTextSearch,
    filterCompanies,
    enrichCompany,
};

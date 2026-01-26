import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDovHXVL9qU3sPfGbPsHRiiyDB_XhHiv78";
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        const models = await genAI.listModels();
        console.log("Available models:");
        for await (const model of models) {
            console.log(`- ${model.name}`);
            console.log(`  Supported methods: ${model.supportedGenerationMethods.join(', ')}`);
        }
    } catch (error) {
        console.error("Error listing models:", error.message);
    }
}

listModels();

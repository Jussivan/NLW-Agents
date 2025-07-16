import { GoogleGenAI } from '@google/genai';
import { env } from '../env.ts';

const gemini = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
});

const model = 'gemini-2.5-flash';

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: "Transcribe the audio accurately and naturally into its original language. Detect the language automatically, then format the transcription with proper punctuation and paragraph breaks where appropriate. Preserve the speaker's tone and nuances.",
            },
            {
                inlineData: {
                    mimeType,
                    data: audioAsBase64,
                }
            },
        ],
    })
    if (!response.text) {
        throw new Error('No transcription returned from Gemini API');
    }
    return response.text;
}

export async function generateEmbeddings(text: string) {
    const response = await gemini.models.embedContent({
        model: 'text-embedding-004',
        contents: [{text}],
        config: {
            taskType: 'RETRIEVAL_DOCUMENT',
        }
    });
    if (!response.embeddings?.[0].values) {
        throw new Error('No embeddings returned from Gemini API');
    }
    return response.embeddings[0].values;
}

export async function generateAnswer(question: string, transcriptions: string[]) {
    const context = transcriptions.join('\n\n');
    const prompt = `Based on the provided context, answer the question clearly and precisely using the same language as the query. Maintain a direct and objective format while preserving the linguistic nuances of the original language.
        CONTEXT: ${context}
        QUESTION: ${question}
        INSTRUCTIONS:
        - Use only information contained in the provided context;
        - If the answer cannot be found in the context, simply state that you don't have enough information to respond;
        - Be concise;
        - Maintain an educational and professional tone;
        - Quote relevant passages from the context when appropriate;
        - When quoting the context, use the term "lesson content";
    `.trim();
    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: prompt
            }
        ]
    })
    console.log('Generated answer:', response.text);
    if (!response.text) {
        throw new Error('No answer returned from Gemini API');
    }
    console.log('Generated answer:', response.text);
    return response.text;
}
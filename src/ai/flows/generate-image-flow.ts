
'use server';
/**
 * @fileOverview An AI flow to generate an image from a text prompt.
 *
 * - generateImage - A function that takes a topic and returns an image URL.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateImageInputSchema = z.object({
  topic: z.string().describe('The topic or prompt for the image to be generated.'),
  tags: z.array(z.string()).optional().describe('Optional tags to provide more context for the image generation.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async ({ topic, tags }) => {
    const prompt = `Create a professional, high-quality blog header image for a technical article. The image should be abstract and visually appealing, suitable for a data engineering blog. Avoid including any text in the image.
    
    The main topic is: "${topic}".
    
    Use the following keywords for additional context: ${tags?.join(', ')}`;

    const { media } = await ai.generate({
      // IMPORTANT: This specific model is required for image generation.
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt,
      config: {
        // IMPORTANT: Must provide both TEXT and IMAGE modalities.
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    const imageUrl = media.url;
    if (!imageUrl) {
        throw new Error('Image generation failed to return a URL.');
    }
    
    return { imageUrl };
  }
);

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

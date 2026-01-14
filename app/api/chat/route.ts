// app/api/chat/route.ts
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Missing messages", { status: 400 });
    }

    // Filter out empty assistant messages
    const cleanMessages = messages.filter(
      (m: any) => m.content && m.content.trim() !== ""
    );

    // Stream response from OpenAI with a valid model
    const result = streamText({
      model: openai("gpt-3.5-turbo"), // ✅ Most commonly available model
      system: `
You are Vic, the digital assistant for Victory House Chicago.
Personality: warm, helpful, slightly cheeky, loves Jesus.
Address: 4352 W. Parker Avenue, Chicago, IL 60639.
Service Times:
- Sundays 9am (Bethel)
- 10:30am (Word)
- 11am (Victory House)
`,
      messages: cleanMessages,
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error("Chat route error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}

import {
  applicationDefault,
  cert,
  initializeApp,
} from "npm:firebase-admin/app";
import {
  FieldValue,
  Filter,
  getFirestore,
  Timestamp,
} from "npm:firebase-admin/firestore";

const credentialObj = {
    "type": "service_account",
    "project_id": "cleartranscript",
    "private_key_id": "3c427756fd9c54cedf6a40fabc82fced0c40c694",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxkrGzxLJFD0FA\nKj/nAWFvM0QIqccshCta226uvRtojNr6VdUBI3Nzf2ygTiD2CiEInXBZdlNQ4//u\n6gLuNSmb6wXSym+2muCVxqW2RkMSl1lDW1bo8Ar3DGHsKkSDXPar/LtBE2JMFZUB\nh7ghYLRUBUDrKHtnI6jrpvwjyPXHYkENLowq9ByB0zyHRYlTCvSBLi7gu+YGdqEJ\neUtSCCa/XBZlzWGCxltgSqN6wJoCmNrR1O2x8pZ552Xt0X4GZAVS1wjgm23fKI5w\nN6oahPlYsfwnqszQLoLraRx/CnnOjo+T9NLmINbJDuRQutl8nWE6nSKWiff3K9+K\n9s5VPMSBAgMBAAECggEAANwWQO+r1V+gAtzQDG+EhoqYbld8/wizmX0Uh3HSKyw1\nxadGaWOokphIriWNmRKf+0XPUTCoCO0ze4jLjZwZU8SsUpze4ouZ6kHnhXCCgmUl\nmdRzoSdmXRmExTaw5tFHM0YaZvyBPk4xzsi/dCykncVuSSUtdiLOChV9rbOst1Dg\nXr6ScqdsJcqy+TFNwe5XWgD1jgn6TjCt3kcYFX1SVyd7WY9pKaH3nGd2WI+HtHdY\ndFRTOUl0JXgsFfBVnhhOJ8ROF2e7DfV0n6eH/cQ7mw3t0oYFXwIBh4ScGSFBUKf8\nWLfYhlEDtl33cSgivpXES0LTfbtVb5sV4iCFrh3YUQKBgQDmlB5du2+4fIKeIA5g\nSCAMLhQlCZRsmaGCNP68UXfZdYGnDO4jJBCLKks0CxXB/NupRkNAi1zGzDRy18xm\nlUSvLdv9MGNME6CKSqjEvHwxiRjvNgeG3ow2N00o3MJZsBMQxgiP8NQfOdlOztfn\nPgPDRlBBn2i/e2fCUJBOos3mGQKBgQDFJooOwCgwNiQfFiUaJaom/xtZHKSHR9dd\nijoNJZtZdxrsE6kP3pPzTSJ+w/z/mKGM+l9yFtZfuJc8H6NGOJQ3CsXMyd6IxK79\nG7uquXIeVJ8laCWDRopzOmfYfEcknBp90JK/QsJlzK0zyGI/Is+NLAn3Ts+YuiFr\nqp/dfN6OqQKBgQC1z71R82XYdnUX8fbj/Hson3zK547dQxaS8O6b1zFFit48tnlf\nxCQ3V5YM52C0oYkjJIAK+Nii+ImytG47xR9vch2wuuLRLfi8kroYxva2qH+8v0GY\nGws8BMcWnVuyFKAz7bL6rM7WAGtVNMwRTljxNRQ7alLSCaB7G8Nt/fmUoQKBgD3l\nu7Kl4fhBB1Y7ParX6HQV5CA2PfG7PILBwzgddojAPFOiWJIC77CTpyDlp6kX4qDA\nevb29JdY/SKDTF/fo6kkWLXTK2sFVWtiKamQT6P2LYExEZYFr7I9xBzT6AI2gJq/\nwVMLQr1zZW28nBv2cfOAwCBFPihVR+jlyQthCP8BAoGBAIEkIeCxrfnDD0KGulYW\nWg5ql8gA09578bdyyZ1CzW72ex14VNRFARE7HBuH8LLC9MYdDmRmItv6wLRzpEwj\neJo8l8B1Wtwo3t2xXZ+rGLrvqoO/JMZiYlv1Zf2tN05riG+kOyqSymVTvs5migNX\nhCACRhIVc9QVqMmF8sJkxaac\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-42qi9@cleartranscript.iam.gserviceaccount.com",
    "client_id": "111858693777802842467",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-42qi9%40cleartranscript.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };

initializeApp({
  credential: cert(credentialObj),
});

const db = getFirestore();

// Define allowed origins
const acceptedUrls: string[] = [
  "https://cleartranscript.web.app",
  "https://cleartranscript.co",
  "http://localhost:5000"
];

// Load API key from environment variables for security
const LEMONFOX_API_KEY = Deno.env.get("LEMONFOX_API_KEY");
if (!LEMONFOX_API_KEY) {
  throw new Error("LEMONFOX_API_KEY environment variable is not set.");
}

async function generateSummary() {
  try {
    // Get today's date at the start of the day in UTC
    const todayStartUTC = new Date();
    todayStartUTC.setUTCHours(0, 0, 0, 0);
    const todayEndUTC = new Date(todayStartUTC);
    todayEndUTC.setUTCDate(todayStartUTC.getUTCDate() + 1); // Set to the start of the next day

    console.log("todayStartUTC", todayStartUTC);
    console.log("todayEndUTC", todayEndUTC);

    // Query recordings from today
    const recordingsRef = db.collection("recordings");
    const snapshot = await recordingsRef
      .where("date", ">=", todayStartUTC)
      .where("date", "<", todayEndUTC)
      .get();

    console.log(`Found ${snapshot.size} recordings for today`);

    if (snapshot.empty) {
      console.log("No recordings found for today.");
      return;
    }

    // Extract transcripts and their IDs
    const transcripts = snapshot.docs.map((doc) => ({
      id: doc.id,
      transcript: doc.data().transcript,
      date: doc.data().date,
    }));

    console.log("transcripts", transcripts);

    if (transcripts.length === 0) {
      console.log("No valid transcripts found for today's recordings.");
      return;
    } else {
      console.log(`${transcripts.length} transcripts today to summarize.`);
    }

    // Generate a combined summary for all transcripts
    // const combinedSummary = await generateCombinedSummary(transcripts);

    // Store the combined summary
    // await db.collection("summaries").add({
    //   date: todayStartUTC, // Use today's date for the summary
    //   summary: combinedSummary,
    //   createdAt: new Date(), // Timestamp of when summary was created
    // });

    console.log("Daily combined summarization completed successfully");
  } catch (error) {
    console.error("Error in daily summarization:", error);
  }
}

// New helper to generate a summary for a SINGLE note
async function generateNoteSummary(transcript: string, title: string): Promise<string> {
    const NOTE_SUMMARY_PROMPT = `
You are an expert summarizer. Based on the following title and transcript from a short voice note, generate a concise 1-2 sentence summary that captures the main point.

Title: "${title}"

Transcript:
"""
${transcript}
"""

Provide only the summary text, with no preamble or explanation.`;

    try {
        const response = await fetch(
            "https://api.lemonfox.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${LEMONFOX_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama-70b-chat", // Using the larger model as requested
                    messages: [{
                        role: "system",
                        content: "You are a helpful assistant that summarizes text concisely."
                    }, {
                        role: "user",
                        content: NOTE_SUMMARY_PROMPT
                    }, ],
                }),
            },
        );

        if (!response.ok) {
            console.error("LLM API failed for individual note summary. Status:", response.status);
            return "Could not generate summary for this note."; // Graceful failure for a single note
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content?.trim() || "Summary not available.";

    } catch (error) {
        console.error("Error calling LLM for individual note summary:", error);
        return "Could not generate summary due to an error.";
    }
}

// New helper to generate the OVERALL summary
async function generateOverallSummary(allNotesContent: string): Promise<string> {
    const OVERALL_SUMMARY_PROMPT = `
You are a master synthesizer. I will provide you with a collection of titles and transcripts from several voice notes recorded on the same day. Your task is to read all of them and write a high-level summary of the day's main themes and activities in 1 to 3 sentences.

Here is the content of the notes:
"""
${allNotesContent}
"""

Generate only the overall summary text, without any introduction.`;

    try {
        const response = await fetch(
            "https://api.lemonfox.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${LEMONFOX_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama-70b-chat", // Using the larger model as requested
                    messages: [{
                        role: "system",
                        content: "You are a helpful assistant that synthesizes information into a high-level summary."
                    }, {
                        role: "user",
                        content: OVERALL_SUMMARY_PROMPT
                    }, ],
                }),
            },
        );

        if (!response.ok) {
            console.error("LLM API failed for overall summary. Status:", response.status);
            return "Could not generate an overall summary.";
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content?.trim() || "Overall summary not available.";

    } catch (error) {
        console.error("Error calling LLM for overall summary:", error);
        return "Could not generate an overall summary due to an error.";
    }
}

// Main function now orchestrates the text generation and builds the final JSON
async function generateFullSummary(recordings: any[]): Promise<any> {
    // 1. Prepare content for the overall summary
    const allNotesText = recordings.map(r => `Title: ${r.title}\nTranscript: ${r.transcript}`).join("\n\n---\n\n");

    // 2. Start all summary requests in parallel for efficiency
    const overallSummaryPromise = generateOverallSummary(allNotesText);
    const noteSummaryPromises = recordings.map(rec => generateNoteSummary(rec.transcript, rec.title));

    // 3. Await all promises to complete
    const overallSummary = await overallSummaryPromise;
    const individualSummaries = await Promise.all(noteSummaryPromises);

    // 4. Assemble the final, valid JSON object in our code
    const noteSummaries = recordings.map((rec, index) => ({
        id: rec.id,
        summary: individualSummaries[index] // The text summary from the LLM
    }));

    const finalResponse = {
        overallSummary: overallSummary, // The text summary from the LLM
        noteSummaries: noteSummaries
    };

    return finalResponse;
}

// Function to generate a title given a transcript using LemonFox's LLM API
async function generateTitle(transcript: string): Promise<string> {
  const TITLE_PROMPT = `
    You will be generating a concise, engaging title for a given transcript. The title should capture the essence of the conversation or content in just a few words, starting with an appropriate emoji. Here's the transcript:
    
    <transcript>
    ${transcript}
    </transcript>
    
    To create an effective title:
    
    1. Carefully read and analyze the transcript, identifying the main themes, topics, or key points discussed.
    
    2. Distill the core message or most interesting aspect of the transcript into a brief, catchy phrase.
    
    3. Choose an appropriate emoji that represents the overall tone, theme, or subject matter of the transcript. This emoji should be placed at the beginning of the title.
    
    4. Combine the emoji with your concise phrase to create a title that is only a few words long but gives the gist of the transcript.
    
    5. Ensure the title is engaging and would make someone want to read or listen to the full transcript.
    
    Remember, the title should:
    - Start with an emoji
    - Be only a few words long
    - Capture the essence of the transcript
    - Be engaging and interesting
    
    Do not include any explanation or alternative options - just the single best title you can create based on these instructions.
    `;

  try {
    const response = await fetch(
      "https://api.lemonfox.ai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${LEMONFOX_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-8b-chat",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: TITLE_PROMPT },
          ],
        }),
      },
    );

    if (!response.ok) {
      console.error("LemonFox API responded with status:", response.status);
      throw new Error("Failed to generate title.");
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || "Untitled Recording";
  } catch (error) {
    console.error("Error generating title from LemonFox LLM API:", error);
    throw new Error("Internal Server Error");
  }
}

// *** NEW FUNCTION TO VALIDATE THE SUMMARY REQUEST ***
function validateSummaryRequest(body: any): { valid: boolean; message?: string; recordings?: any[] } {
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
        return { valid: false, message: 'Request body must be a JSON object.' };
    }

    if (!body.hasOwnProperty('recordings')) {
        return { valid: false, message: "Request body must contain a 'recordings' property." };
    }

    const recordings = body.recordings;
    if (!Array.isArray(recordings)) {
        return { valid: false, message: "'recordings' must be an array." };
    }

    if (recordings.length === 0) {
        return { valid: false, message: "'recordings' array cannot be empty." };
    }

    for (const rec of recordings) {
        if (typeof rec !== 'object' || rec === null || !rec.id || !rec.transcript || !rec.title) {
            return { valid: false, message: "Each item in 'recordings' must be an object with at least 'id', 'transcript', and 'title' properties." };
        }
    }

    return { valid: true, recordings: recordings };
}

// Utility function to validate the request
function validateRequest(body: any): { valid: boolean; message?: string } {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { valid: false, message: "Request body must be a JSON object." };
  }

  const keys = Object.keys(body);
  if (keys.length !== 1 || keys[0] !== "transcript") {
    return {
      valid: false,
      message: "Request body must contain only the 'transcript' key.",
    };
  }

  if (typeof body.transcript !== "string") {
    return { valid: false, message: "'transcript' must be a string." };
  }

  // Optionally, limit the size of the transcript to prevent abuse
  //   if (body.transcript.length > 5000) { // example limit
  //     return { valid: false, message: "'transcript' is too long." };
  //   }

  return { valid: true };
}

// Function to handle CORS
function handleCORS(req: Request, origin: string): Response | null {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        // "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      },
    });
  }
  return null;
}

// *** NEW HELPER FUNCTION TO ENSURE CORS HEADERS ON ALL RESPONSES ***
function createCorsResponse(body: any, init: ResponseInit): Response {
    init.headers = {
        ...init.headers, // Keep existing headers
        "Access-Control-Allow-Origin": "*", // Add CORS header
    };
    return new Response(body, init);
}

// Start the Deno server
Deno.serve(async (req: Request) => {
  const requestUrl = new URL(req.url);
  const path = requestUrl.pathname;

  const origin = req.headers.get("Origin") || req.headers.get("Referer") || "";

  // Handle CORS preflight request
  const corsResponse = handleCORS(req, origin);
  if (corsResponse) {
    return corsResponse;
  }

  if (req.method === "GET" && path === "/summary") {
    generateSummary();
    return createCorsResponse("Summary generation triggered.", { status: 200 });
  }

  if (req.method === "POST" && path === "/summary") {
    try {
        const contentType = req.headers.get("Content-Type") || "";
        if (!contentType.includes("application/json")) {
            // Use the helper for this error response
            return createCorsResponse("Unsupported Media Type: Expected application/json", { status: 415 });
        }
        
        const body = await req.json();

        const validation = validateSummaryRequest(body);
        console.log("validation", validation);
        console.log("body", body);
        if (!validation.valid || !validation.recordings) {
             // Use the helper for this error response
            return createCorsResponse(validation.message, { status: 400 });
        }
        
        const summary = await generateFullSummary(validation.recordings);

        // Use the helper for the success response
        return createCorsResponse(JSON.stringify(summary), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
        
    } catch (error) {
        console.error("Error processing /summary request:", error);
        if (error instanceof SyntaxError) {
            // Use the helper for this error response
            return createCorsResponse("Bad Request: Malformed JSON in request body.", { status: 400 });
        }
        // Use the helper for the generic 500 error
        return createCorsResponse("Internal Server Error", { status: 500 });
    }
  }


  if (req.method === "POST" && path === "/title") {
    try {
      const contentType = req.headers.get("Content-Type") || "";
      if (!contentType.includes("application/json")) {
        // Use the helper for this error response
        return createCorsResponse("Unsupported Media Type: Expected application/json", { status: 415 });
      }

      const body = await req.json();

      const validation = validateRequest(body);
      if (!validation.valid) {
        // Use the helper for this error response
        return createCorsResponse(validation.message, { status: 400 });
      }

      const transcript: string = body.transcript;
      const sanitizedTranscript = transcript.trim();
      const title = await generateTitle(sanitizedTranscript);

      // Use the helper for the success response
      return createCorsResponse(title, {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    } catch (error) {
      console.error("Error processing /title request:", error);
      // Use the helper for the generic 500 error
      return createCorsResponse("Internal Server Error", { status: 500 });
    }
  }

  // Handle other routes
  return createCorsResponse("Not Found", { status: 404 });
});

// Deno.cron("0 0 * * *", () => {
//   console.log("Running daily summarization...");
//   generateSummary();
// });

/**
 * POST /api/transcribe
 * Audio flow: FormData (audio file) → Whisper transcription → text
 * Returns the transcribed text as JSON.
 */
import { NextResponse } from "next/server";
import { transcribeAudio } from "@/lib/ai/aiUtils";

export const runtime = "nodejs";

// Groq Whisper limit is 25MB
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

const SUPPORTED_AUDIO_FORMATS = [
  "audio/mpeg", // .mp3
  "audio/mp4", // .m4a
  "audio/wav", // .wav
  "audio/webm", // .webm
  "audio/ogg", // .ogg
  "audio/flac", // .flac
  "video/mp4", // .mp4 (audio track)
  "video/webm", // .webm (audio track)
];

const SUPPORTED_EXTENSIONS = [
  ".mp3",
  ".m4a",
  ".wav",
  ".webm",
  ".ogg",
  ".flac",
  ".mp4",
];

export async function POST(req: Request) {
  try {
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return NextResponse.json(
        { error: "Invalid form data" },
        { status: 400 }
      );
    }

    const fileEntry = formData.get("audio");
    if (!fileEntry || !(fileEntry instanceof File)) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    const file = fileEntry;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        },
        { status: 413 }
      );
    }

    // Validate file type
    const hasValidMimeType = SUPPORTED_AUDIO_FORMATS.includes(file.type);
    const hasValidExtension = SUPPORTED_EXTENSIONS.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );

    if (!hasValidMimeType && !hasValidExtension) {
      return NextResponse.json(
        {
          error: `Unsupported audio format. Supported formats: ${SUPPORTED_EXTENSIONS.join(", ")}`,
        },
        { status: 415 }
      );
    }

    // Convert to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Transcribe audio
    const { text } = await transcribeAudio(buffer, file.name);

    if (!text.trim()) {
      return NextResponse.json(
        { error: "Transcription resulted in empty text" },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      text,
      metadata: {
        filename: file.name,
        size: file.size,
        duration: null, // Could add duration extraction if needed
      },
    });
  } catch (error) {
    console.error("[transcribe]", error);

    const message =
      error instanceof Error ? error.message : "Transcription failed";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

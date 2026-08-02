import type { ExtractedSource } from "@/lib/tools/types";

/**
 * Text extraction, kept behind one function so a real PDF parser or OCR step
 * can be dropped in without touching the UI.
 *
 * What works today: plain text and markdown files are read in the browser.
 * What does not: PDF, DOCX, and images. Rather than fabricate text for those,
 * the extractor returns a `needs-paste` state and the UI asks the teacher to
 * paste the text into the editable preview. Nothing is uploaded anywhere —
 * reading happens locally in the browser.
 */

const TEXT_TYPES = ["text/plain", "text/markdown", "text/csv"];
const TEXT_EXTENSIONS = [".txt", ".md", ".markdown", ".csv"];

export const ACCEPTED_FILE_TYPES =
  ".pdf,.doc,.docx,.txt,.md,.csv,.png,.jpg,.jpeg,.webp,.heic";

export const MAX_FILE_BYTES = 10 * 1024 * 1024;

function isTextFile(file: File) {
  const name = file.name.toLowerCase();
  return (
    TEXT_TYPES.includes(file.type) ||
    TEXT_EXTENSIONS.some((extension) => name.endsWith(extension))
  );
}

function describeKind(file: File) {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf")) return "PDF";
  if (name.endsWith(".doc") || name.endsWith(".docx")) return "Word document";
  if (/\.(png|jpe?g|webp|heic)$/.test(name)) return "image";
  return "file";
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function extractFromFile(file: File): Promise<ExtractedSource> {
  if (file.size > MAX_FILE_BYTES) {
    return {
      text: "",
      label: file.name,
      status: "needs-paste",
      notice: `That file is ${formatBytes(file.size)}. Files over ${formatBytes(
        MAX_FILE_BYTES,
      )} are not read here — paste the section you need instead.`,
    };
  }

  if (isTextFile(file)) {
    const text = await file.text();
    return {
      text,
      label: file.name,
      status: text.trim().length > 0 ? "ready" : "needs-paste",
      notice:
        text.trim().length > 0
          ? undefined
          : "That file came through empty. Paste the text instead.",
    };
  }

  return {
    text: "",
    label: file.name,
    status: "needs-paste",
    notice: `${describeKind(
      file,
    )} parsing is not wired up in this build. Copy the text out of the file and paste it below — everything else in the flow works the same way.`,
  };
}

export function extractFromText(text: string): ExtractedSource {
  return {
    text,
    label: "Pasted text",
    status: text.trim().length > 0 ? "ready" : "empty",
  };
}

export const EMPTY_SOURCE: ExtractedSource = {
  text: "",
  label: "",
  status: "empty",
};

/** A short, realistic worksheet so the flow can be tried without a file. */
export const DEMO_SOURCE_TEXT = `Worksheet 7.2 — Solving quadratic equations

1. Solve x² + 6x + 8 = 0 by factorising.
2. Solve x² − 3x − 10 = 0 by factorising.
3. Solve 2x² + 7x + 3 = 0 using the quadratic formula.
4. The graph of y = x² + kx + 16 touches the x-axis at exactly one point.
   Find the possible values of k.
5. A rectangular garden has an area of 60 m² and a perimeter of 34 m.
   Find its dimensions.

Extension: explain how the discriminant tells you the number of solutions
before you solve the equation.`;

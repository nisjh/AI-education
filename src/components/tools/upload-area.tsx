"use client";

import * as React from "react";
import { FileText, Loader2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ACCEPTED_FILE_TYPES,
  DEMO_SOURCE_TEXT,
  extractFromFile,
  extractFromText,
  formatBytes,
} from "@/lib/tools/extraction";
import type { ExtractedSource } from "@/lib/tools/types";
import { cn } from "@/lib/utils";

interface UploadAreaProps {
  onExtracted: (source: ExtractedSource) => void;
}

export function UploadArea({ onExtracted }: UploadAreaProps) {
  const [dragging, setDragging] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [fileInfo, setFileInfo] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setFileInfo(`${file.name} · ${formatBytes(file.size)}`);
    const source = await extractFromFile(file);
    onExtracted(source);
    setBusy(false);
  }

  return (
    <div>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          const file = event.dataTransfer.files?.[0];
          if (file) void handleFile(file);
        }}
        className={cn(
          "rounded-xl border border-dashed p-6 text-center transition-colors",
          dragging ? "border-accent bg-accent-soft/40" : "border-border bg-surface/50",
        )}
      >
        <span className="mx-auto flex size-11 items-center justify-center rounded-lg bg-background text-accent">
          {busy ? (
            <Loader2 className="size-5 animate-spin" aria-hidden />
          ) : (
            <Upload className="size-5" aria-hidden />
          )}
        </span>

        <p className="mt-3 text-sm font-medium">
          Drop a worksheet here, or choose a file
        </p>
        <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-muted-foreground">
          PDF, Word, images, or plain text. Files are read in your browser and never
          uploaded. Text files are read directly; for PDFs and images you paste the text
          in the next panel.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_FILE_TYPES}
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void handleFile(file);
            event.target.value = "";
          }}
        />

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            <FileText aria-hidden />
            Choose a file
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              onExtracted({
                ...extractFromText(DEMO_SOURCE_TEXT),
                label: "Sample worksheet",
              })
            }
          >
            Try it with a sample worksheet
          </Button>
        </div>

        {fileInfo && (
          <p className="mt-3 font-mono text-[0.6875rem] text-muted-foreground">
            {fileInfo}
          </p>
        )}
      </div>
    </div>
  );
}

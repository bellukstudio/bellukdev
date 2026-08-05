"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { FileDown, Loader2 } from "lucide-react";
import type { Experience, Profile, Project, Skill } from "@/types";

type Props = {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
};

const MARGIN = 18;
const PAGE_WIDTH = 210; // A4 mm
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const NEON = [0, 150, 160] as const;
const INK = [20, 20, 20] as const;
const MUTED = [95, 95, 95] as const;

function formatDate(date: string | null) {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

/**
 * Builds a clean, print-friendly PDF (not a screenshot of the neon UI —
 * a screenshot would render badly with all the glow/blur effects) from
 * whatever is currently in Supabase, and triggers a browser download.
 */
export function DownloadPortfolioButton({
  profile,
  skills,
  projects,
  experiences,
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleDownload() {
    setIsGenerating(true);
    try {
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      let y = MARGIN;

      const ensureSpace = (next: number) => {
        if (y + next > PAGE_HEIGHT - MARGIN) {
          doc.addPage();
          y = MARGIN;
        }
      };

      const heading = (text: string) => {
        ensureSpace(12);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(...INK);
        doc.text(text, MARGIN, y);
        y += 2;
        doc.setDrawColor(...NEON);
        doc.setLineWidth(0.5);
        doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
        y += 7;
      };

      const paragraph = (
        text: string,
        size = 10,
        color: readonly [number, number, number] = MUTED
      ) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(size);
        doc.setTextColor(...color);
        const lines: string[] = doc.splitTextToSize(text, CONTENT_WIDTH);
        for (const line of lines) {
          ensureSpace(6);
          doc.text(line, MARGIN, y);
          y += 5.5;
        }
      };

      // Header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(...INK);
      doc.text(profile.name, MARGIN, y);
      y += 9;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.setTextColor(...NEON);
      doc.text(profile.title, MARGIN, y);
      y += 7;

      const contactBits = [profile.email, profile.github, profile.linkedin].filter(
        Boolean
      ) as string[];
      if (contactBits.length) {
        doc.setFontSize(9.5);
        doc.setTextColor(...MUTED);
        doc.text(contactBits.join("   |   "), MARGIN, y);
        y += 8;
      } else {
        y += 4;
      }

      if (profile.overview) {
        heading("Overview");
        paragraph(profile.overview);
        y += 4;
      }

      if (skills.length > 0) {
        heading("Skills");
        paragraph(skills.map((s) => s.name).join("  ·  "));
        y += 4;
      }

      if (experiences.length > 0) {
        heading("Experience");
        experiences.forEach((exp) => {
          ensureSpace(10);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(...INK);
          doc.text(`${exp.position} · ${exp.company}`, MARGIN, y);
          y += 5;

          doc.setFont("helvetica", "italic");
          doc.setFontSize(9);
          doc.setTextColor(...NEON);
          doc.text(`${formatDate(exp.startDate)} — ${formatDate(exp.endDate)}`, MARGIN, y);
          y += 5.5;

          paragraph(exp.description, 9.5);
          y += 4;
        });
      }

      if (projects.length > 0) {
        heading("Projects");
        projects.forEach((project) => {
          ensureSpace(10);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(...INK);
          doc.text(project.title, MARGIN, y);
          y += 5.5;

          paragraph(project.description, 9.5);

          if (project.techStack.length > 0) {
            paragraph(`Tech: ${project.techStack.join(", ")}`, 8.5, NEON);
          }

          const links = [project.github, project.demo].filter(Boolean) as string[];
          if (links.length) {
            paragraph(links.join("   |   "), 8.5, MUTED);
          }
          y += 4;
        });
      }

      const fileName = `${profile.name.toLowerCase().replace(/\s+/g, "-")}-portfolio.pdf`;
      doc.save(fileName);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-neon-blue/60 bg-background/90 px-5 py-3 font-mono text-sm text-neon-blue shadow-neon-blue backdrop-blur-md transition-all hover:bg-neon-blue/10 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isGenerating ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <FileDown size={16} />
      )}
      {isGenerating ? "Generating..." : "Download Portfolio PDF"}
    </button>
  );
}
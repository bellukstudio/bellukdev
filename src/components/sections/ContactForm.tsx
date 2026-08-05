"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { sendContactMessage } from "@/services/contact.service";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    setServerError(null);
    const { error } = await sendContactMessage(values);

    if (error) {
      setStatus("error");
      setServerError(error);
      return;
    }

    setStatus("success");
    reset();
  }

  return (
    <section id="contact" className="relative px-6 py-24">
      <div className="mx-auto max-w-xl">
        <SectionHeading eyebrow="05 · connect" title="Contact" />

        {status === "success" ? (
          <div className="flex items-center gap-3 rounded-md border border-neon-green/40 bg-neon-green/5 p-6 font-mono text-sm text-neon-green">
            <CheckCircle2 size={20} />
            Message sent. I&apos;ll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-white/60">
                Name
              </label>
              <input
                id="name"
                {...register("name")}
                className="w-full rounded-md border border-neon-blue/20 bg-surface/40 px-4 py-2.5 text-white outline-none focus:border-neon-blue"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-white/60">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full rounded-md border border-neon-blue/20 bg-surface/40 px-4 py-2.5 text-white outline-none focus:border-neon-blue"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-white/60">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                className="w-full resize-none rounded-md border border-neon-blue/20 bg-surface/40 px-4 py-2.5 text-white outline-none focus:border-neon-blue"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
              )}
            </div>

            {status === "error" && serverError && (
              <p className="font-mono text-xs text-red-400">{`> error: ${serverError}`}</p>
            )}

            <Button type="submit" disabled={isSubmitting}>
              <Send size={16} />
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

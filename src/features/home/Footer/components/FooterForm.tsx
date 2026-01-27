"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { Button, Input } from "@/components/ui";
import { FooterLabels } from "../types";
import { IconCheck, IconLoader2 } from "@tabler/icons-react";

interface FooterFormProps {
  labels: FooterLabels;
}

export function FooterForm({ labels }: FooterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);

  // Form validation schema with translated messages
  const formSchema = z.object({
    name: z.string().min(2, labels.errors.name),
    email: z.string().email(labels.errors.email),
    message: z.string().min(5, labels.errors.message),
  });

  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onInitialSubmit = (data: FormValues) => {
    setFormData(data);
    setShowCaptcha(true);
  };

  const onCaptchaSubmit = async () => {
    if (!captchaValue) {
      setCaptchaError(labels.captcha.error);
      return;
    }

    if (!formData) return;

    setCaptchaError("");
    setIsSubmitting(true);

    try {
      // Here you would typically send the form data to your API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      reset();
      setCaptchaValue(null);
      setShowCaptcha(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    if (value) {
      setCaptchaError("");
    }
  };

  return (
    <div className="backdrop-blur-xs rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-md mx-auto relative overflow-hidden border border-(--border-primary)/50 bg-(--surface-primary)/80">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-(--text-primary)">
        {labels.title}
      </h3>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-6"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-(--status-success-bg) border border-(--status-success-border)">
            <IconCheck className="w-6 h-6 text-(--status-success-text)" />
          </div>
          <h4 className="text-xl font-semibold mb-2 text-(--text-primary)">
            {labels.success.title}
          </h4>
          <p className="mb-4 text-sm text-(--text-tertiary) max-w-sm mx-auto">
            {labels.success.description}
          </p>
          <Button variant="default" onClick={() => setIsSubmitted(false)}>
            {labels.success.button}
          </Button>
        </motion.div>
      ) : showCaptcha ? (
        <div className="flex flex-col gap-4">
          <div className="pt-1">
            <p className="text-(--text-tertiary) mb-3 text-sm">
              {labels.captcha.title}
            </p>
            <ReCAPTCHA
              size="normal"
              sitekey={
                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              }
              onChange={handleCaptchaChange}
              theme="dark"
            />
            {captchaError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-xs text-(--status-error-text)"
              >
                {captchaError}
              </motion.p>
            )}
          </div>

          <div className="pt-1 flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowCaptcha(false)}
            >
              {labels.captcha.back}
            </Button>
            <Button
              variant="default"
              className="flex-1"
              onClick={onCaptchaSubmit}
              disabled={isSubmitting || !captchaValue}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <IconLoader2 className="w-4 h-4 animate-spin" />
                  {labels.form.submitting}
                </span>
              ) : (
                labels.captcha.confirm
              )}
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onInitialSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col md:flex-row md:gap-3 gap-4">
            <div className="flex-1">
              <label
                htmlFor="name"
                className="block text-xs uppercase tracking-wider text-(--text-tertiary) mb-1.5 font-medium"
              >
                {labels.form.name}
              </label>
              <Input
                id="name"
                type="text"
                {...register("name")}
                placeholder={labels.form.namePlaceholder}
                error={!!errors.name}
                errorMessage={errors.name?.message}
                variant="filled"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-wider text-(--text-tertiary) mb-1.5 font-medium"
              >
                {labels.form.email}
              </label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder={labels.form.emailPlaceholder}
                error={!!errors.email}
                errorMessage={errors.email?.message}
                variant="filled"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs uppercase tracking-wider text-(--text-tertiary) mb-1.5 font-medium"
            >
              {labels.form.message}
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows={3}
              className="w-full px-4 py-3 text-sm rounded-2xl bg-(--surface-tertiary) text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--border-secondary) transition-all border-none resize-none"
              placeholder={labels.form.messagePlaceholder}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-(--status-error-text)"
              >
                {errors.message.message}
              </motion.p>
            )}
          </div>

          <div className="pt-1">
            <Button variant="default" type="submit" className="w-full">
              {labels.form.submit}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

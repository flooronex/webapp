"use client";

import React from "react";
import { IconUser, IconMail } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useContactForm } from "../../hooks/useContactForm";
import { FormField } from "@/components/ui/FormField";
import { Input, Textarea } from "@/components/ui";
import { FormContainer, FormHeader, SubmitButton } from "./components";

export function ContactForm() {
  const t = useTranslations("ContactSection.form");
  const { register, handleSubmit, errors, isValid, isDirty, submitStatus } =
    useContactForm();

  const isSubmitDisabled =
    submitStatus === "submitting" ||
    submitStatus === "success" ||
    !isValid ||
    !isDirty;

  return (
    <FormContainer>
      <FormHeader />

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
        {/* Name and Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label={t("name.label")} name="name" required>
            <Input
              id="name"
              placeholder={t("name.placeholder")}
              startIcon={<IconUser className="w-5 h-5" />}
              error={errors.name?.message}
              autoComplete="name"
              {...register("name")}
            />
          </FormField>

          <FormField label={t("email.label")} name="email" required>
            <Input
              id="email"
              type="email"
              placeholder={t("email.placeholder")}
              startIcon={<IconMail className="w-5 h-5" />}
              error={errors.email?.message}
              autoComplete="email"
              {...register("email")}
            />
          </FormField>
        </div>

        {/* Subject */}
        <FormField label={t("subject.label")} name="subject" required>
          <Input
            id="subject"
            placeholder={t("subject.placeholder")}
            error={errors.subject?.message}
            {...register("subject")}
          />
        </FormField>

        {/* Message */}
        <FormField label={t("message.label")} name="message" required>
          <Textarea
            id="message"
            placeholder={t("message.placeholder")}
            error={!!errors.message}
            errorMessage={errors.message?.message}
            maxLength={2000}
            showCounter={true}
            rows={5}
            rounded="lg"
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
          />
        </FormField>

        {/* Submit Button */}
        <SubmitButton isDisabled={isSubmitDisabled} />
      </form>
    </FormContainer>
  );
}

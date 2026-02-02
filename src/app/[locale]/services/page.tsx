import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Browse Services | FloorOneX",
  description:
    "Browse flooring services, search by keyword, and request a quote in minutes.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}

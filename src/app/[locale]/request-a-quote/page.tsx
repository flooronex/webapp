import type { Metadata } from "next";
import RequestAQuoteClient from "./RequestAQuoteClient";

export const metadata: Metadata = {
  title: "Request a Quote | FloorOneX",
  description:
    "Request a flooring quote. Share project details and receive offers from professionals.",
};

export default function RequestAQuotePage() {
  return <RequestAQuoteClient />;
}
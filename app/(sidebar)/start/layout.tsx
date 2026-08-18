import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "start here",
  description: "An introduction to Varun Goyal.",
};

export default function StartLayout({ children }: { children: ReactNode }) {
  return children;
}

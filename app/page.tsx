import ArtworkRotation from "@/components/ui/ArtworkRotation";

// The landing page intentionally remains independent from the sidebar layout.
export const dynamic = "force-static";

export default function HomePage() {
  return <ArtworkRotation />;
}

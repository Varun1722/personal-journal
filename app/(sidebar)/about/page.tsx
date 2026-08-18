import { Metadata } from "next";
import Timeline from "@/components/visualizations/Timeline";
import { timelineEvents } from "./events";

export const metadata: Metadata = {
  title: "about",
  description: "my life made up of small, meaningful moments",
};

export const dynamic = "force-static";

const ChronologyPage = () => (
  <div className="min-h-screen font-serif">
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8 pb-4">
        <h1 className="text-base text-ink dark:text-chalk">
          my life made up of small, meaningful moments
        </h1>
      </div>
      {timelineEvents.length > 0 ? (
        <Timeline events={timelineEvents} />
      ) : (
        <p className="text-sm text-ink-soft dark:text-chalk-soft">
          timeline in progress
        </p>
      )}
    </div>
  </div>
);

export default ChronologyPage;

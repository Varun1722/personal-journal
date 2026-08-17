type RawEvent = {
  year: string;
  month?: string;
  day?: string;
  description: string;
  imageLinks?: { text: string; imagePath: string; altText: string }[];
};

// Add your milestones in chronological order. To show a photo on hover, place
// it in public/images and include the matching words in `description`.
const rawEvents: RawEvent[] = [
  {
    year: "2002",
    description: "born in Jaipur, India",
  },
  {
    year: "2021",
    description: "started college @LNMIIT",
  },
  // {
  //   year: "2026",
  //   month: "august",
  //   description: "started building my personal journal",
  //   imageLinks: [
  //     {
  //       text: "personal journal",
  //       imagePath: "/images/personal-journal.png",
  //       altText: "Personal journal",
  //     },
  //   ],
  // },
];

const grouped = rawEvents.reduce(
  (acc, { year, month, day, description, imageLinks }) => {
    (acc[year] ??= []).push({ month, day, description, imageLinks });
    return acc;
  },
  {} as Record<string, Omit<RawEvent, "year">[]>
);

export const timelineEvents = Object.entries(grouped).map(
  ([period, items]) => ({ period, items })
);

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const INTERESTS = [
  "solving hard problems",
  "playing cricket",
  "badminton",
  "reading books and poetry",
  "paintings",
];

const StartPage = () => {
  const [index, setIndex] = useState(0);

  // Randomize only after hydration; random in render/initializer would
  // mismatch the server HTML.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndex(Math.floor(Math.random() * INTERESTS.length));
  }, []);

  const cycle = () => {
    setIndex((prev) => {
      if (INTERESTS.length <= 1) return prev;
      let next = prev;
      while (next === prev) {
        next = Math.floor(Math.random() * INTERESTS.length);
      }
      return next;
    });
  };

  const currentInterest = INTERESTS[index];

  return (
    <div>
      <article className="prose">
        <p>welcome to my corner on the internet</p>

        <p>
          a little <Link href="/about">about me</Link>.
        </p>

        <p>
          i like{" "}
          <button type="button" onClick={cycle} className="start-interest">
            {currentInterest}
          </button>
          .
        </p>

        <p>
          see what i&apos;m up to <Link href="/now">now</Link>, what i&apos;m{" "}
          <Link href="/library">reading</Link>.
        </p>

        <p>
          see my <Link href="/projects">work portfolio</Link>.
        </p>
      </article>
    </div>
  );
};

export default StartPage;

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const INTERESTS = [
  "solving hard problems",
  "cricket",
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
        <p>
          Hii, I&apos;m Varun! I&apos;m a researcher, engineer, and sports
          aficionado.
        </p>

        <p>
          I train machines to be smart so that they can make people dumb (jk,
          but it&apos;s happening).
        </p>

        <p>
          Currently, I&apos;m an AI engineer at Virima Technologies, building
          governance and guardrails for agents. In parallel, I&apos;m also
          working on making a language model that can run on a CPU.
        </p>

        <p>
          I studied Computer Science at LNMIIT Jaipur, where I started working
          on improving link prediction between drugs and diseases as a research
          student, advised by Dr. Abhijit Adhikari. I helped as a teaching
          assistant in the ML lab and also spent a semester doing a quantitative
          study on social media&apos;s influence on body image, advised by Dr.
          Rajbala.
        </p>

        <p>
          Somewhere around that, I enjoyed quizzing, won a few, and hosted
          multiple quiz events.
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

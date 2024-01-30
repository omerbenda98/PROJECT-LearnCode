import Courses from "../components/Courses";
import { BouncyCardsFeatures } from "../components/BouncyCardsFeatures";
import LessonsDisplay from "../components/LessonsDisplay";

export default function Home() {
  return (
    <>
      <BouncyCardsFeatures />
      <Courses />
      <LessonsDisplay />
    </>
  );
}

import Courses from "../components/Courses";
import { BouncyCardsFeatures } from "../components/BouncyCardsFeatures";
import FreeLessons from "../components/FreeLessons";

export default function Home() {
  return (
    <>
      <BouncyCardsFeatures />
      <Courses />
      <FreeLessons />
    </>
  );
}

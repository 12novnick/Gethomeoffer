import { Approach } from '../../components/home/Approach';
import { Hero } from '../../components/home/Hero';
import { NextChapter } from '../../components/home/NextChapter';
import { Options } from '../../components/home/Options';
import { Process } from '../../components/home/Process';
import { Situations } from '../../components/home/Situations';

export function HomePage() {
  return (
    <>
      <Hero />
      <Situations />
      <Options />
      <Approach />
      <Process />
      <NextChapter />
    </>
  );
}

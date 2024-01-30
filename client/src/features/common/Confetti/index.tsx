import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { ReactElement } from 'react';

export default function ConfettiCelebration(): ReactElement {
  const { width, height } = useWindowSize();

  return <Confetti style={{ zIndex: 44444 }} width={width} height={height} numberOfPieces={400} />;
}

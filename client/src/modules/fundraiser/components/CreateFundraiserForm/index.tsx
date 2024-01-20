import { ReactElement } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function CreateFundraiserForm(): ReactElement {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Create Fundraiser Fom</p>
      <Confetti
        style={{ zIndex: 44444 }}
        width={width}
        height={height}
        numberOfPieces={400}
      />
    </div>
  );
}

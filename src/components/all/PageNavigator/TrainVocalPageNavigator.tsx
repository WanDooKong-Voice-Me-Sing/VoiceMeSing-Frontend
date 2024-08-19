import LeftGrayArrowSVG from '@public/all/PageNavigator/leftGrayArrow.svg';
import RightGreenArrowSVG from '@public/all/PageNavigator/rightGreenArrow.svg';

interface PageNavigatorProp {
  progressState: 1 | 2 | 3;
  handleProgressState: (nextState: 1 | 2 | 3) => void;
}

export default function TrainVocalPageNavigator({
  progressState,
  handleProgressState,
}: PageNavigatorProp) {
  const clickRightArrow = () => {
    if (progressState === 1) {
      handleProgressState(2);
    } else if (progressState === 2) {
      handleProgressState(3);
    } else if (progressState === 3) {
      handleProgressState(3);
    }
  };

  const clickLeftArrow = () => {
    if (progressState === 1) {
      handleProgressState(1);
    } else if (progressState === 2) {
      handleProgressState(1);
    } else if (progressState === 3) {
      handleProgressState(2);
    }
  };

  return (
    <div className="w-[530px] flex flex-col grow justify-end">
      <section className="flex justify-center items-center">
        <LeftGrayArrowSVG
          className="mr-[45px] hover:cursor-pointer"
          onClick={clickLeftArrow}
        />
        <span className="text-[40px] normalFont text-progressBarGray mr-[50px]">
          Prev
        </span>
        <span className="text-[40px] normalFont text-themeColor ml-[50px]">
          Next
        </span>

        <RightGreenArrowSVG
          className="ml-[45px] hover:cursor-pointer"
          onClick={clickRightArrow}
        />
      </section>
    </div>
  );
}
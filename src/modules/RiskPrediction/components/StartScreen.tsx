import { Header, Button } from '@/components';

interface Props {
  onStart: () => void;
}

const StartScreen = ({ onStart }: Props) => (
  <>
    <Header
      showProfile={false}
      rightComponent={
        <Button className="!w-[124px] text-xs !h-[29px]" variant="outline">
          Log symptoms
        </Button>
      }
    />
    <div className="flex flex-col gap-3">
      <h3 className="text-sm text-primary font-bold">Breast Cancer Risk Predictor</h3>
      <p className="text-xs text-gray-500 mt-2">
        Curious about your breast cancer risk? Answer a few simple questions...
      </p>
      <div className="w-full h-[167px] bg-pink-100 rounded-lg flex items-center justify-center">
        <p className="text-center text-xs text-gray-600 px-4">
          Quick, personalized assessment. It only takes 2 minutes!
        </p>
      </div>
    </div>
    <Button className="text-sm" onClick={onStart}>
      Start Risk Prediction
    </Button>
  </>
);

export default StartScreen;

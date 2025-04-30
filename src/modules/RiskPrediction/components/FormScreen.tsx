/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from 'formik';
import { Button } from '@/components';

interface Props {
  steps: any[];
  stepIndex: number;
  initialValues: any;
  isLastStep: boolean;
  handleSubmit: (values: any) => void;
  prev: () => void;
  loading?: boolean;
}

const FormScreen = ({
  steps,
  stepIndex,
  initialValues,
  isLastStep,
  handleSubmit,
  prev,
  loading
}: Props) => (
  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    {() => (
      <Form className="grid gap-6">
        <div className="flex gap-2 justify-center items-center mt-4">
          {steps.map((_, index) => (
            <span
              key={index}
              className={`h-2 rounded-full ${index === stepIndex ? 'w-6 bg-pink-500' : 'w-2 bg-gray-300'}`}
            />
          ))}
        </div>

        <div className="flex flex-col gap-6">{steps[stepIndex].component}</div>

        <div className="flex justify-between gap-4 mt-4">
          <Button
            type="button"
            className="text-xs"
            variant="outline"
            onClick={prev}
            disabled={stepIndex === 0}
          >
            Back
          </Button>
          <Button type="submit" className="text-xs">
            {loading ? 'Loading...' : isLastStep ? 'Finish' : 'Next'}
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default FormScreen;

import { useMemo } from 'react';

export const useMultiStepQuestionnaire = <
  T extends {
    question: string;
    options?: {
      value: string;
      label: string;
    }[];
    name: string;
  }
>(
  questions: T[],
  chunkSize: number,
  renderQuestion: (q: T, index: number) => React.ReactNode
) => {
  const questionChunks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < questions.length; i += chunkSize) {
      chunks.push(questions.slice(i, i + chunkSize));
    }
    return chunks;
  }, [questions, chunkSize]);

  const steps = questionChunks.map((group, index) => ({
    component: (
      <div key={index} className="flex flex-col gap-5">
        {group.map((q, i) => renderQuestion(q, index * chunkSize + i))}
      </div>
    )
  }));

  const initialValues = useMemo(() => {
    return questions.reduce(
      (acc, q) => {
        acc[q.name] = '';
        return acc;
      },
      {} as Record<string, string>
    );
  }, [questions]);

  return { steps, initialValues };
};

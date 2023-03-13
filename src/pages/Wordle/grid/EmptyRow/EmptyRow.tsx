import { Cell } from "pages/Wordle/grid/Cell/Cell";
import { mapRange } from "services/utils";

export interface EmptyRowProps {
  solutionLength: number;
}

export const EmptyRow: React.FC<EmptyRowProps> = ({ solutionLength }) => {
  return (
    <div className="mb-1 flex justify-center">
      {mapRange(solutionLength, (i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};

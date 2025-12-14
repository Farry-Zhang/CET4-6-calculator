export enum ExamType {
  CET4 = 'CET4',
  CET6 = 'CET6',
}

export enum Difficulty {
  Hard = 'Hard',
  Medium = 'Medium',
  Easy = 'Easy',
}

export interface ScoreTable {
  listening: {
    [key in Difficulty]: number[];
  };
  reading: {
    [key in Difficulty]: number[];
  };
  writing: number[];
}

export interface ExamData {
  [ExamType.CET4]: ScoreTable;
  [ExamType.CET6]: ScoreTable;
}

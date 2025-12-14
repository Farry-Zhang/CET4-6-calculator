import { ExamData, ExamType, Difficulty } from './types';

// Arrays are stored from index 0 (Raw Score 0) to index 35 (Raw Score 35)
// This maps the Raw Score (index) to the Scaled Score (value).

const CET4_LISTENING_HARD = [86, 86, 88, 92, 97, 102, 107, 112, 116, 121, 126, 131, 136, 140, 145, 150, 155, 160, 164, 169, 174, 179, 184, 188, 193, 198, 203, 208, 212, 217, 222, 227, 232, 236, 241, 249];
const CET4_LISTENING_MEDIUM = [86, 86, 86, 86, 90, 95, 99, 104, 109, 114, 119, 123, 128, 133, 138, 143, 147, 152, 157, 162, 167, 171, 176, 181, 186, 191, 195, 200, 205, 210, 215, 219, 224, 229, 234, 249];
const CET4_LISTENING_EASY = [86, 86, 86, 86, 86, 87, 92, 97, 101, 106, 111, 116, 121, 125, 130, 135, 140, 145, 149, 154, 159, 164, 169, 173, 178, 183, 188, 193, 197, 202, 207, 212, 217, 221, 226, 249];

const CET4_READING_HARD = [81, 83, 88, 92, 97, 102, 107, 112, 116, 121, 126, 131, 136, 140, 145, 150, 155, 160, 164, 169, 174, 179, 184, 188, 193, 198, 203, 208, 212, 217, 222, 227, 232, 236, 241, 249];
const CET4_READING_MEDIUM = [81, 81, 81, 85, 90, 95, 99, 104, 109, 114, 119, 123, 128, 133, 138, 143, 147, 152, 157, 162, 167, 171, 176, 181, 186, 191, 195, 200, 205, 210, 215, 219, 224, 229, 234, 249];
const CET4_READING_EASY = [81, 81, 81, 81, 82, 87, 92, 97, 101, 106, 111, 116, 121, 125, 130, 135, 140, 145, 149, 154, 159, 164, 169, 173, 178, 183, 188, 193, 197, 202, 207, 212, 217, 221, 226, 249];

// Writing goes from 0 to 30
const CET4_WRITING = [68, 73, 78, 82, 87, 92, 97, 102, 106, 111, 116, 121, 126, 130, 135, 140, 145, 150, 154, 159, 164, 169, 174, 178, 183, 188, 193, 198, 202, 207, 212];


const CET6_LISTENING_HARD = [45, 45, 51, 57, 63, 69, 75, 81, 87, 93, 99, 105, 111, 117, 123, 129, 135, 141, 147, 153, 159, 165, 171, 177, 183, 189, 195, 201, 207, 213, 219, 225, 231, 237, 243, 249];
const CET6_LISTENING_MEDIUM = [45, 45, 45, 51, 57, 63, 69, 75, 81, 87, 93, 99, 105, 111, 117, 123, 129, 135, 141, 147, 153, 159, 165, 171, 177, 183, 189, 195, 201, 207, 213, 219, 225, 231, 237, 249];
const CET6_LISTENING_EASY = [45, 45, 45, 45, 51, 57, 63, 69, 75, 81, 87, 93, 99, 105, 111, 117, 123, 129, 135, 141, 147, 153, 159, 165, 171, 177, 183, 189, 195, 201, 207, 213, 219, 225, 231, 249];

const CET6_READING_HARD = [51, 57, 63, 69, 75, 81, 87, 93, 99, 105, 111, 117, 123, 129, 135, 141, 147, 153, 159, 165, 171, 177, 183, 189, 195, 201, 207, 213, 219, 225, 231, 237, 243, 248, 248, 249];
const CET6_READING_MEDIUM = [45, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120, 126, 132, 138, 144, 150, 156, 162, 168, 174, 180, 186, 192, 198, 204, 210, 216, 222, 228, 234, 240, 246, 249];
const CET6_READING_EASY = [45, 45, 45, 51, 57, 63, 69, 75, 81, 87, 93, 99, 105, 111, 117, 123, 129, 135, 141, 147, 153, 159, 165, 171, 177, 183, 189, 195, 201, 207, 213, 219, 225, 231, 237, 249];

// Writing goes from 0 to 30
const CET6_WRITING = [32, 38, 44, 50, 56, 62, 68, 74, 80, 86, 92, 98, 104, 110, 116, 122, 128, 134, 140, 146, 152, 158, 164, 170, 176, 182, 188, 194, 200, 206, 212];


export const SCORING_DATA: ExamData = {
  [ExamType.CET4]: {
    listening: {
      [Difficulty.Hard]: CET4_LISTENING_HARD,
      [Difficulty.Medium]: CET4_LISTENING_MEDIUM,
      [Difficulty.Easy]: CET4_LISTENING_EASY,
    },
    reading: {
      [Difficulty.Hard]: CET4_READING_HARD,
      [Difficulty.Medium]: CET4_READING_MEDIUM,
      [Difficulty.Easy]: CET4_READING_EASY,
    },
    writing: CET4_WRITING,
  },
  [ExamType.CET6]: {
    listening: {
      [Difficulty.Hard]: CET6_LISTENING_HARD,
      [Difficulty.Medium]: CET6_LISTENING_MEDIUM,
      [Difficulty.Easy]: CET6_LISTENING_EASY,
    },
    reading: {
      [Difficulty.Hard]: CET6_READING_HARD,
      [Difficulty.Medium]: CET6_READING_MEDIUM,
      [Difficulty.Easy]: CET6_READING_EASY,
    },
    writing: CET6_WRITING,
  },
};

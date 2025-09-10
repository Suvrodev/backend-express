import { Model } from "mongoose";

export type TStudent = {
  id: number;
  name: string;
  taka: number;
  image: string;
  email: string;
  dob: string;
  sex: "male" | "female";
  age: number;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  password: string;
  isDelete: boolean;
  isBlocked: boolean;
};

/**
 * For Custom Instance
 */
// export type StudentMethods = {
//   isUserExists(email: string): Promise<TStudent | null>;
// };

// export type MStudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;

/**
 * For Creating Static
 */

export interface MStudentModel extends Model<TStudent> {
  isStudentExists(email: string): Promise<TStudent | null>;
}

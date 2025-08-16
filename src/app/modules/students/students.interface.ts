export type TStudent = {
  id: number;
  name: string;
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

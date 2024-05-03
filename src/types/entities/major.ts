export default interface Major {
  id: string;
  name: string;
  headLecturer: {
    id: number;
    majors: Object;
    degree: string;
    isAdmin: string;
    createdAt: string;
    updatedAt: string;
  };
}

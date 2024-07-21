import { ResponseType } from "../axios.type";

export default interface Major {
  id?: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export type MajorResponse = Pick<ResponseType, 'message' | 'success' | 'major' | 'majors'> 
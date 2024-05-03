export enum TypeNotify {
  UPDATESTATUS_COMMENT_MY_TOPIC = 'UPDATESTATUS_COMMENT_MY_TOPIC',
}

export default interface Notify {
  id: number;
  type: '';
  message: string;
  read: number;
}

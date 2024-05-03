interface Term {
  id: number;
  key: number;
  createdAt: Date;
  dateDiscussion: Date;
  dateReport: Date;
  endDate: Date;
  endDateChooseTopic: Date;
  endDateSubmitTopic: Date;
  name: string;
  startDate: Date;
  startDateChooseTopic: Date;
  startDateSubmitTopic: Date;
  updatedAt: Date;
  startDateDiscussion: Date;
  endDateDiscussion: Date;
  startDateReport: Date;
  endDateReport: Date;
  isPublicResult: boolean;
}

export default Term;

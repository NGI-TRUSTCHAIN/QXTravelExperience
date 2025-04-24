export type ActiveBody = {
  active: boolean;
};

export type StatusBody = {
  status: string;
};

export type StatusOrActiveBody = ActiveBody | StatusBody;
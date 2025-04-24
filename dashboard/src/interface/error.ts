export interface CustomError<T> {
    response: {
      data: T;
    };
  }

  export interface LoginErrorResponseData {
    success: boolean;
    msg: string;
  }
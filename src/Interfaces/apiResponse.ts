export default interface apiResponse {
    data?: {
      // this will be included in suggestions
      statusCode?: number;
      message?: string;
      result: {
        // this will not give suggestions
        [key: string]: any;
      };
    };
    error?: any;
  }
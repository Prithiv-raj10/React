export default interface apiResponse {
    data?: {
      // this will be included in suggestions so if possible use the format if you know that.
      statusCode?: number;
      message?: string;
      result: {
        // this will not give suggestions
        [key: string]: string;
      };
    };
    error?: any;
  }
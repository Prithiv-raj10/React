import { bookingModel } from "../../../Interfaces";

export interface orderSummaryProps {
    data: {
        result: any;
        value:{[key: string]: any};
    };
    userInput: {
      name: string;
      email: string;
      phoneNumber: string;
    };
  }
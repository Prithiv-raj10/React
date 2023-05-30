import { bookingModel } from "../../../Interfaces";
import { SD_Status } from "../../../Utility/SD";

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
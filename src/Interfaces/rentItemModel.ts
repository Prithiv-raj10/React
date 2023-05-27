import carListModel from "./carListModel"


export default interface rentItemModel{
    id?: number;
    carListId?: number;
    carList?: carListModel;
    
  }
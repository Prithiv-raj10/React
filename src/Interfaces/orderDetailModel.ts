import carListModel from "./carListModel"

export default interface orderDetailModel{
    orderDetailId?: number
    orderHeaderId?: number
    carListId?: number
    carList?: carListModel
    itemName?: string
    price?: number
  }
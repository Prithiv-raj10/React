import orderDetail from "./orderDetailModel"

export default interface orderDetailModel {
    orderHeaderId?: number
    pickupName?: string
    pickupPhoneNumber?: string
    pickupEmail?: string
    applicationUserId?: string
    user?: any
    orderTotal?: number
    orderDate?: string
    stripePaymentIntentID?: string
    status?: string
    orderDetails?: orderDetail[]
  }
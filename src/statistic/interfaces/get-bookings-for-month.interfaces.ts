export interface IGetBookingsForMonth {
  year?: number
  month?: number
}

export interface IGetBookingForMonthRequired {
  startOfMonth: Date
  endOfMonth: Date
}

import moment from 'moment/moment'

export interface IReservedScheduleInterface {
  roomId: string
  startDay: moment.Moment
  endDay: moment.Moment
}

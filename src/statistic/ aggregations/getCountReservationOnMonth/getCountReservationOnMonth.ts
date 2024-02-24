import { IGetBookingForMonthRequired } from '../../interfaces'

export const aggregationPipeline = ({
  startOfMonth,
  endOfMonth
}: IGetBookingForMonthRequired) => [
  {
    $lookup: {
      from: 'schedules',
      let: { room_id: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: [{ $toObjectId: '$roomId' }, '$$room_id'] },
                { $gte: ['$startDay', startOfMonth] },
                { $lt: ['$startDay', endOfMonth] }
              ]
            }
          }
        }
      ],
      as: 'bookings'
    }
  },
  {
    $addFields: {
      bookingsCount: { $size: '$bookings' }
    }
  },
  {
    $project: {
      _id: 0,
      roomNumber: '$roomNumber',
      bookingsCount: 1
    }
  }
]

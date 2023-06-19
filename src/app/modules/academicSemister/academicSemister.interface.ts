import { Model } from 'mongoose'

export type IAcademicSemister = {
  title: 'Autumn' | 'Summer' | 'Fail'
  year: number
  code: '01' | '02' | '03'
  startMonth:
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December'

  endMonth:
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December'
}

export type AcademicSemisterMOdel = Model<IAcademicSemister>

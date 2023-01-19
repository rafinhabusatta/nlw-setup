import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beggining"
import { HabitDay } from "./HabitDay"

const WeekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const SummaryDates = generateDatesFromYearBeginning()
console.log(SummaryDates)

export function SummaryTable() {
  return (
    <div className="w-full flex">
      <div className="grid-rows-7 grid-flow-row gap-3">
        {WeekDays.map((weekDay,i) => {
          return (
            <div key={`${weekDay}-${i}`} className="text-zind-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
              {weekDay}
            </div>
          )
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
       {SummaryDates.map(date => {
        return (
          <HabitDay key={date.toString()} />
        )
       })}
      </div>
    </div>
  )
}
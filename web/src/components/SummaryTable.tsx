import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beggining"
import { HabitDay } from "./HabitDay"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import dayjs from "dayjs"

const WeekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const SummaryDates = generateDatesFromYearBeginning()
console.log(SummaryDates)

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - SummaryDates.length

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[]

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([])
  useEffect(() => {
    api.get('summary').then(response => {
      setSummary(response.data)
  })
}, [])
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {WeekDays.map((weekDay,i) => {
          return (
            <div key={`${weekDay}-${i}`} className="text-zind-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
              {weekDay}
            </div>
          )
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
       {summary.length >0 && SummaryDates.map((date) => {
        const dayIntSummary = summary.find(day => {
          return dayjs(date).isSame(day.date, 'day')
        })
        return (
          <HabitDay 
            key={date.toString()} 
            date={date}
            amount={dayIntSummary?.amount}
            defaultCompleted={dayIntSummary?.completed}
          />
        )
       })}
       {amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_, i) => {
        return (
          <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>
        )
       })}
      </div>
    </div>
  )
}
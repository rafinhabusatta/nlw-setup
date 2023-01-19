import { View, Text, ScrollView } from 'react-native'

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beggining'
import { DAY_SIZE, HabitDay } from '../components/HabitDay'
import { Header } from '../components/Header'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const dateFromYearStart = generateDatesFromYearBeginning()

const minimumSummaryDays = 18 * 5
const amountOfDaysToFill = minimumSummaryDays - dateFromYearStart.length

export function Home() {
  return (
    <View className='flex-1 bg-background  px-8 pt-16'>
     <Header></Header>
     <View className='flex-row mt-6 mb-2'>
      {
        weekDays.map((weekDay, i) => (
          <Text 
            key={`${weekDay}-${i}`} 
            className='text-zinc-400 text-center text-xl font-bold mx-l'
            style={{width: DAY_SIZE}}
          >
            {weekDay}
          </Text>
        ))
      }
     </View>
     
     <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 100}}
     >
      <View className='flex-row flex-wrap'>
          {
          dateFromYearStart.map(date => (
            <HabitDay
              key={date.toString()}
            />
          ))
          }
          {
          amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_, i) => (
            <View
              
              className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
              style={{width: DAY_SIZE, height: DAY_SIZE}}
            />
      
            
          ))
        }
      </View>
     </ScrollView>
    </View>
  )
}
import { View, Text, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import dayjs from "dayjs";
import { Checkbox } from "../components/Checkbox";
import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import clsx from "clsx";

interface Params {
  date: string;
}

interface DayInfoProps {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[]
}

export function Habit() {
  const[loading, setLoading] = useState(true)
  const[dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
  const[completedHabits, setCompletedHabits] = useState<String[]>([])
  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf("day").isBefore(new Date())
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const habitsProgress = dayInfo?.possibleHabits.length 
  ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0

  async function fetchHabits() {
    try{
      setLoading(true)
      const response = await api.get('/day', { params: { date }})
      setDayInfo(response.data)
      setCompletedHabits(response.data.completedHabits)
    }
    catch (error) {
    console.log(error)
    Alert.alert('Ops', 'Não foi possível carregar os hábitos')
    }
    finally{
      setLoading(false)
    }

    useEffect(() => {
      fetchHabits()
    }, [])

    if(loading) {
      return <Loading />
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`)
      if(completedHabits.includes(habitId)) {
        setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
      } else {
        setCompletedHabits(prevState => [...prevState, habitId])
      }
    } catch(error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível atualizar o hábito')
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 100}}
     >
      <BackButton />

      <Text className="text-zinc-400 text-base font-semibold mt-6 lowercase">
        {dayOfWeek}
      </Text>

      <Text className="text-white text-3xl font-extrabold mt-6">
        {dayAndMonth}
      </Text>

      <ProgressBar 
        progress={habitsProgress}
      />
      <View className={clsx("mt-6", {
        ["opacity-50"]: isDateInPast
      })}>
        {
          dayInfo?.possibleHabits &&
          dayInfo?.possibleHabits.map(habit => (
            <Checkbox 
              key={habit.id}
              title={habit.title}
              checked={completedHabits.includes(habit.id)}
              disabled={isDateInPast}
              onPress={() => handleToggleHabit(habit.id)}
               />
          ))
          }
      </View>
      {
        isDateInPast && (
          <Text className="text-white text-center mt-10">
            Você não pode mais marcar ou desmarcar hábitos
          </Text>
        )
      }
    </ScrollView>
    </View>
  );
}
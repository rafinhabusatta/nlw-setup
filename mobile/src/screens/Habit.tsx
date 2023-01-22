import { View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import dayjs from "dayjs";
import { Checkbox } from "../components/Checkbox";

interface Params {
  date: string;
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

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
        progress={30}
      />
      <View className="mt-6">
        <Checkbox title="Fazer exercícios" checked={false} />
        <Checkbox title="Beber 2L de água" checked={true} />
        <Checkbox title="Estudar" checked={true} />
      </View>
    </ScrollView>
    </View>
  );
}
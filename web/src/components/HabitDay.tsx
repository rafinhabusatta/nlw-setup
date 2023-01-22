import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgessBar";
import clsx from "clsx";

interface HabitProps {
  amount: number,
  completed: number;
}

export function HabitDay(props: HabitProps) {
  const completedPercentage = Math.round(props.completed / props.amount * 100);
  return (
    <Popover.Root>
      <Popover.Trigger className={clsx("w-10 h-10  rounded-lg border-2", {
        'bg-zinc-900 border-zinc-800' : completedPercentage === 0,
        'bg-violet-900 border-violet-700' : completedPercentage > 0 && completedPercentage < 20,
        'bg-violet-800 border-violet-600' : completedPercentage >= 20 && completedPercentage < 40,
        'bg-violet-700 border-violet-500' : completedPercentage >= 40 && completedPercentage < 60,
        'bg-violet-600 border-violet-500' : completedPercentage > 0 && completedPercentage < 80,
        'bg-violet-500 border-violet-400' : completedPercentage >= 80,
      })}/>

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">terça-feira</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">17/1</span>
          <ProgressBar progress={15} />
        <Popover.Arrow width={16} height={8} className="fill-zic-900" />

        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
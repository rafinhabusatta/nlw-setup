import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgessBar";
import clsx from "clsx";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, Divide } from "phosphor-react";

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

          <div className="flex flex-col gap-3 mt-6">
            <Checkbox.Root
              className="flex items-center gap-3 group"
            >
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                  <Checkbox.Indicator>
                    <Check size={20} className="text-white" />
                  </Checkbox.Indicator>
                </div>
              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Beber 2L de água
              </span>
            </Checkbox.Root>

            <Checkbox.Root
              className="flex items-center gap-3 group"
            >
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                  <Checkbox.Indicator>
                    <Check size={20} className="text-white" />
                  </Checkbox.Indicator>
                </div>
              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Beber 2L de água
              </span>
            </Checkbox.Root>
          </div>
        <Popover.Arrow width={16} height={8} className="fill-zic-900" />

        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
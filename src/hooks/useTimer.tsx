import type { ReactChild } from 'react'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface TimerContextType {
  hours: number
  minutes: number
  seconds: number
}

interface TimerContextProviderProps {
  children: ReactChild
}

export const TimerContext = createContext({} as TimerContextType)

export function TimerContextProvider({ children }: TimerContextProviderProps) {
  const [hours, setHours] = useState(2)
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(() => seconds - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [seconds])

  if (seconds === 0) {
    setMinutes(() => minutes - 1)
    setSeconds(59)
  }

  if (minutes === 0) {
    setHours(() => hours - 1)
  }

  return (
    <TimerContext.Provider
      value={{
        hours,
        minutes,
        seconds,
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}

export function useTimer() {
  const context = useContext(TimerContext)

  return context
}

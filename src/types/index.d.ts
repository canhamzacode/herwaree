import { ReactNode } from "react";

export interface IFeedCard {
    title: string;
    description: string;
    slug: string;
    image: string;
}

export interface INavProps {
    name: string;
    icon: ReactNode;
    path: string;
}


export type EventType = 'period' | 'ovulation' | 'breast-test';

// Define the structure for a single calendar event
export interface CalendarEvent {
  date: string;
  type: EventType;
}

// Define the structure for the calendar data map
export type CalendarEventMap = { [key: string]: EventType };

interface CustomCalendarProps {
  markedDates?: CalendarEventMap;
}
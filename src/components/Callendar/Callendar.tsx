import { COLORS } from '@/constants';
import { CalendarEvent, EventType } from '@/types';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export type CalendarEventMap = { [key: string]: EventType };

// Using array format for dummy data
const dummyData: CalendarEvent[] = [
  { date: '2025-03-10', type: 'period' },
  { date: '2025-03-15', type: 'ovulation' },
  { date: '2025-03-20', type: 'breast-test' },
  { date: '2025-03-25', type: 'period' },
  { date: '2025-03-30', type: 'ovulation' }
];

interface CustomCalendarProps {
  events?: CalendarEvent[];
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ events = dummyData }) => {
  const markedDates: CalendarEventMap = events.reduce((acc, event) => {
    acc[event.date] = event.type;
    return acc;
  }, {} as CalendarEventMap);

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateString: string = date.toISOString().split('T')[0];
      if (markedDates[dateString]) {
        return `marked-date ${markedDates[dateString]}`;
      }
    }
    return '';
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateString: string = date.toISOString().split('T')[0];
      const eventType = markedDates[dateString];
      const eventColor = COLORS.find((c) => c.type === eventType)?.color;

      if (eventColor) {
        return (
          <div className="flex items-center justify-center w-full h-full absolute top-0 left-0">
            <div
              className="w-8 h-8 opacity-50 rounded-full"
              style={{ backgroundColor: eventColor }}
            />
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="calendar-container flex flex-col gap-3">
      <Calendar
        tileClassName={tileClassName}
        tileContent={tileContent}
        className="!border-0 relative"
      />
      <div className="legend flex justify-between">
        {COLORS.map((item, index) => (
          <div key={index} className="flex items-center gap-1 flex-wrap">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <p className="text-[10px]">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;

import * as Yup from 'yup';

export const ReminderDetailsSchema = Yup.object().shape({
  title: Yup.string()
    .required('Task title is required')
    .min(3, 'Title must be at least 3 characters'),
  date: Yup.date()
    .required('Reminder date is required')
    .min(new Date(), 'Reminder date cannot be in the past'),
  time: Yup.string().required('Reminder time is required'),
  period: Yup.string()
    .oneOf(['AM', 'PM'], 'Please select AM or PM')
    .required('Please select AM or PM')
});

export const ReminderFrequencySchema = Yup.object().shape({
  note: Yup.string().max(300, 'Note cannot exceed 300 characters'),
  frequency: Yup.string()
    .oneOf(['daily', 'weekly', 'monthly'], 'Select a valid frequency')
    .required('Reminder frequency is required')
});

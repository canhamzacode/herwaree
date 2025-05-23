import { EventType } from '@/types';

export const avatars = [
  { id: '1', src: '/avatar1.png' },
  { id: '2', src: '/avatar2.png' },
  { id: '3', src: '/avatar3.png' },
  { id: '4', src: '/avatar4.png' },
  { id: '5', src: '/avatar3.png' },
  { id: '6', src: '/avatar2.png' },
  { id: '7', src: '/avatar4.png' },
  { id: '8', src: '/avatar1.png' }
];

export const COLORS: Array<{ color: string; text: string; type: EventType }> = [
  {
    color: '#FFD8DF',
    text: 'Period',
    type: 'period'
  },
  {
    color: '#D8E8F8',
    text: 'Ovulation',
    type: 'ovulation'
  },
  {
    color: '#EAD4F8',
    text: 'Breast Test Examination',
    type: 'breast-test'
  }
];

export const questions = [
  {
    question: 'Lump or Thickening?',
    options: ['Hard or soft lump', 'No noticeable lump'],
    name: 'lump'
  },
  {
    question: 'Skin Dimpling?',
    options: ['Noticeable dimpling', 'Skin looks normal'],
    name: 'skin'
  },
  { question: 'Pain?', options: ['Unusual pain', 'No unusual pain'], name: 'pain' },
  { question: 'Redness?', options: ['Redness around breast', 'No redness'], name: 'redness' },
  {
    question: 'Swelling?',
    options: ['Swollen breast or underarm', 'No swelling'],
    name: 'swelling'
  }
];

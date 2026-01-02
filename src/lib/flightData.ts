export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  class: 'economy' | 'business' | 'first';
  stops: number;
  aircraft: string;
}

export interface Booking {
  id: string;
  trackingCode: string;
  flight: Flight;
  passenger: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    passport: string;
  };
  seat: string;
  gate: string;
  boardingTime: string;
  status: 'confirmed' | 'checked-in' | 'boarded' | 'completed' | 'cancelled';
  bookedAt: string;
}

export const airports = [
  { code: 'JFK', city: 'New York', country: 'USA' },
  { code: 'LAX', city: 'Los Angeles', country: 'USA' },
  { code: 'LHR', city: 'London', country: 'UK' },
  { code: 'CDG', city: 'Paris', country: 'France' },
  { code: 'DXB', city: 'Dubai', country: 'UAE' },
  { code: 'SIN', city: 'Singapore', country: 'Singapore' },
  { code: 'HND', city: 'Tokyo', country: 'Japan' },
  { code: 'SYD', city: 'Sydney', country: 'Australia' },
  { code: 'FRA', city: 'Frankfurt', country: 'Germany' },
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands' },
  { code: 'ORD', city: 'Chicago', country: 'USA' },
  { code: 'MIA', city: 'Miami', country: 'USA' },
];

export const sampleFlights: Flight[] = [
  {
    id: '1',
    airline: 'SkyWings Airlines',
    flightNumber: 'SW 201',
    origin: 'New York',
    originCode: 'JFK',
    destination: 'London',
    destinationCode: 'LHR',
    departureTime: '08:30',
    arrivalTime: '20:45',
    duration: '7h 15m',
    price: 649,
    class: 'economy',
    stops: 0,
    aircraft: 'Boeing 787 Dreamliner',
  },
  {
    id: '2',
    airline: 'SkyWings Airlines',
    flightNumber: 'SW 205',
    origin: 'New York',
    originCode: 'JFK',
    destination: 'London',
    destinationCode: 'LHR',
    departureTime: '14:00',
    arrivalTime: '02:30',
    duration: '7h 30m',
    price: 589,
    class: 'economy',
    stops: 0,
    aircraft: 'Airbus A350',
  },
  {
    id: '3',
    airline: 'Atlantic Airways',
    flightNumber: 'AA 112',
    origin: 'New York',
    originCode: 'JFK',
    destination: 'London',
    destinationCode: 'LHR',
    departureTime: '22:00',
    arrivalTime: '10:15',
    duration: '7h 15m',
    price: 520,
    class: 'economy',
    stops: 0,
    aircraft: 'Boeing 777-300ER',
  },
  {
    id: '4',
    airline: 'Global Connect',
    flightNumber: 'GC 445',
    origin: 'New York',
    originCode: 'JFK',
    destination: 'London',
    destinationCode: 'LHR',
    departureTime: '11:30',
    arrivalTime: '01:45',
    duration: '9h 15m',
    price: 425,
    class: 'economy',
    stops: 1,
    aircraft: 'Airbus A320neo',
  },
];

export function generateTrackingCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'SW';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function generateSeat(): string {
  const row = Math.floor(Math.random() * 30) + 1;
  const seat = ['A', 'B', 'C', 'D', 'E', 'F'][Math.floor(Math.random() * 6)];
  return `${row}${seat}`;
}

export function generateGate(): string {
  const terminal = ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)];
  const gate = Math.floor(Math.random() * 40) + 1;
  return `${terminal}${gate}`;
}

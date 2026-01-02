import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { FlightCard } from '@/components/FlightCard';
import { BookingForm } from '@/components/BookingForm';
import { FlightTicket } from '@/components/FlightTicket';
import { sampleFlights, Flight, Booking, airports } from '@/lib/flightData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Printer, Download, CheckCircle } from 'lucide-react';

type SortOption = 'price-low' | 'price-high' | 'duration' | 'departure';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<SortOption>('price-low');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);

  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const passengers = searchParams.get('passengers') || '1';

  const originAirport = airports.find((a) => a.code === origin);
  const destAirport = airports.find((a) => a.code === destination);

  const sortedFlights = [...sampleFlights].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'duration':
        return a.duration.localeCompare(b.duration);
      case 'departure':
        return a.departureTime.localeCompare(b.departureTime);
      default:
        return 0;
    }
  });

  const handlePrint = () => {
    window.print();
  };

  // Booking confirmation view
  if (booking) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Success Message */}
            <div className="text-center mb-8 animate-fade-in no-print">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-muted-foreground">
                Your flight has been booked successfully. Here's your boarding pass.
              </p>
            </div>

            {/* Ticket */}
            <div className="mb-8">
              <FlightTicket booking={booking} />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 no-print">
              <Button variant="default" size="lg" className="flex-1" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print Ticket
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6 no-print">
              Your booking reference <span className="font-mono font-bold text-primary">{booking.trackingCode}</span> has been sent to {booking.passenger.email}
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Booking form view
  if (selectedFlight) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <BookingForm
              flight={selectedFlight}
              onComplete={setBooking}
              onBack={() => setSelectedFlight(null)}
            />
          </div>
        </main>
      </div>
    );
  }

  // Search results view
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {originAirport?.city || origin} → {destAirport?.city || destination}
            </h1>
            <p className="text-muted-foreground">
              {sortedFlights.length} flights found · {passengers} passenger{parseInt(passengers) > 1 ? 's' : ''}
            </p>
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="departure">Departure Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {sortedFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                onSelect={setSelectedFlight}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

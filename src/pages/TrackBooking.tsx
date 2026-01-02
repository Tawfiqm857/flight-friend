import { useState } from 'react';
import { Search, Plane, AlertCircle, Printer, Download, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/Header';
import { FlightTicket } from '@/components/FlightTicket';
import { Booking, sampleFlights, generateSeat, generateGate } from '@/lib/flightData';

// Simulated bookings database
const simulatedBookings: Record<string, Booking> = {
  SWAB1234: {
    id: '1',
    trackingCode: 'SWAB1234',
    flight: sampleFlights[0],
    passenger: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      passport: 'A12345678',
    },
    seat: '14A',
    gate: 'B22',
    boardingTime: '07:30',
    status: 'confirmed',
    bookedAt: new Date().toISOString(),
  },
  SWCD5678: {
    id: '2',
    trackingCode: 'SWCD5678',
    flight: sampleFlights[2],
    passenger: {
      firstName: 'Emma',
      lastName: 'Johnson',
      email: 'emma@example.com',
      phone: '+1 987 654 3210',
      passport: 'B87654321',
    },
    seat: '22F',
    gate: 'A15',
    boardingTime: '21:00',
    status: 'checked-in',
    bookedAt: new Date().toISOString(),
  },
};

export default function TrackBooking() {
  const [trackingCode, setTrackingCode] = useState('');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBooking(null);
    setIsSearching(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const code = trackingCode.toUpperCase().trim();
    const found = simulatedBookings[code];

    if (found) {
      setBooking(found);
    } else {
      setError('No booking found with this tracking code. Please check and try again.');
    }

    setIsSearching(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-primary/10 text-primary';
      case 'checked-in':
        return 'bg-success/10 text-success';
      case 'boarded':
        return 'bg-accent/10 text-accent';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-12 no-print">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Plane className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Track Your Booking
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Enter your booking reference code to view your flight details and download your boarding pass
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-lg mx-auto mb-12 no-print">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trackingCode">Booking Reference</Label>
                <div className="flex gap-2">
                  <Input
                    id="trackingCode"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                    placeholder="e.g., SWAB1234"
                    className="text-lg font-mono tracking-wider"
                    maxLength={10}
                  />
                  <Button type="submit" disabled={!trackingCode.trim() || isSearching}>
                    {isSearching ? (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>

            {/* Demo codes hint */}
            <p className="text-center text-sm text-muted-foreground mt-4">
              Try demo codes: <span className="font-mono font-medium">SWAB1234</span> or{' '}
              <span className="font-mono font-medium">SWCD5678</span>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="max-w-lg mx-auto mb-8 no-print">
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-destructive">{error}</p>
              </div>
            </div>
          )}

          {/* Booking Result */}
          {booking && (
            <div className="max-w-3xl mx-auto animate-slide-up">
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-6 no-print">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Booking Status</p>
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Ticket */}
              <div className="mb-8">
                <FlightTicket booking={booking} />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 no-print">
                <Button variant="default" size="lg" className="flex-1" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print Boarding Pass
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

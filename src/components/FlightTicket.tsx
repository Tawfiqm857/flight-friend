import { forwardRef } from 'react';
import { Plane, QrCode, Clock, MapPin, User, Calendar } from 'lucide-react';
import { Booking } from '@/lib/flightData';
import { format } from 'date-fns';

interface FlightTicketProps {
  booking: Booking;
}

export const FlightTicket = forwardRef<HTMLDivElement, FlightTicketProps>(
  ({ booking }, ref) => {
    const { flight, passenger, seat, gate, boardingTime, trackingCode } = booking;

    return (
      <div ref={ref} className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
        {/* Header */}
        <div className="hero-gradient p-6 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Plane className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">SkyWings Airlines</h3>
                <p className="text-sm opacity-90">Boarding Pass</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Flight</p>
              <p className="text-2xl font-bold">{flight.flightNumber}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Route */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">{flight.originCode}</p>
              <p className="text-sm text-muted-foreground">{flight.origin}</p>
            </div>
            <div className="flex-1 flex items-center justify-center px-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <div className="h-0.5 w-20 md:w-32 bg-border relative">
                  <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-primary rotate-90" />
                </div>
                <div className="w-3 h-3 rounded-full bg-accent" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">{flight.destinationCode}</p>
              <p className="text-sm text-muted-foreground">{flight.destination}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <User className="w-4 h-4" />
                Passenger
              </div>
              <p className="font-semibold text-foreground">
                {passenger.firstName} {passenger.lastName}
              </p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <MapPin className="w-4 h-4" />
                Gate
              </div>
              <p className="font-semibold text-foreground text-2xl">{gate}</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <Calendar className="w-4 h-4" />
                Seat
              </div>
              <p className="font-semibold text-foreground text-2xl">{seat}</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <Clock className="w-4 h-4" />
                Boarding
              </div>
              <p className="font-semibold text-foreground text-2xl">{boardingTime}</p>
            </div>
          </div>

          {/* Flight Times */}
          <div className="flex items-center justify-between bg-secondary/50 rounded-xl p-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Departure</p>
              <p className="text-xl font-bold text-foreground">{flight.departureTime}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium text-foreground">{flight.duration}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Arrival</p>
              <p className="text-xl font-bold text-foreground">{flight.arrivalTime}</p>
            </div>
          </div>

          {/* Tracking Code */}
          <div className="border-t-2 border-dashed border-border pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
                <p className="text-3xl font-mono font-bold tracking-wider text-primary">{trackingCode}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use this code to track your booking
                </p>
              </div>
              <div className="w-24 h-24 bg-muted rounded-xl flex items-center justify-center">
                <QrCode className="w-16 h-16 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FlightTicket.displayName = 'FlightTicket';

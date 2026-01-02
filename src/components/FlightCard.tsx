import { Plane, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flight } from '@/lib/flightData';
import { cn } from '@/lib/utils';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
}

export function FlightCard({ flight, onSelect }: FlightCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 card-hover animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Airline Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Plane className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{flight.airline}</p>
            <p className="text-sm text-muted-foreground">{flight.flightNumber} · {flight.aircraft}</p>
          </div>
        </div>

        {/* Flight Times */}
        <div className="flex items-center gap-4 flex-1 justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{flight.departureTime}</p>
            <p className="text-sm font-medium text-muted-foreground">{flight.originCode}</p>
          </div>

          <div className="flex flex-col items-center flex-1 max-w-[200px]">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {flight.duration}
            </div>
            <div className="relative w-full h-[2px] bg-border mt-2">
              <div className="flight-path-line absolute inset-0 rounded-full" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
              <Plane className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-primary transform rotate-90" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent" />
            </div>
            <Badge variant={flight.stops === 0 ? "secondary" : "outline"} className="mt-2">
              {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
            </Badge>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{flight.arrivalTime}</p>
            <p className="text-sm font-medium text-muted-foreground">{flight.destinationCode}</p>
          </div>
        </div>

        {/* Price & Book */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">from</p>
            <p className="text-3xl font-bold text-foreground">${flight.price}</p>
            <p className="text-sm text-muted-foreground">per person</p>
          </div>
          <Button variant="accent" onClick={() => onSelect(flight)}>
            Select Flight
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

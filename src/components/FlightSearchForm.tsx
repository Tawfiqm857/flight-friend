import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Calendar, Users, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { airports } from '@/lib/flightData';

interface FlightSearchFormProps {
  variant?: 'hero' | 'compact';
}

export function FlightSearchForm({ variant = 'hero' }: FlightSearchFormProps) {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      origin,
      destination,
      departDate,
      returnDate: tripType === 'roundtrip' ? returnDate : '',
      passengers,
      tripType,
    });
    navigate(`/search?${params.toString()}`);
  };

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const isHero = variant === 'hero';

  return (
    <form onSubmit={handleSearch} className={isHero ? "glass-card rounded-2xl p-6 md:p-8" : "bg-card rounded-xl p-4 shadow-card"}>
      {/* Trip Type Toggle */}
      <div className="flex gap-2 mb-6">
        <Button
          type="button"
          variant={tripType === 'roundtrip' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTripType('roundtrip')}
        >
          Round Trip
        </Button>
        <Button
          type="button"
          variant={tripType === 'oneway' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTripType('oneway')}
        >
          One Way
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Origin */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">From</Label>
          <Select value={origin} onValueChange={setOrigin}>
            <SelectTrigger className={isHero ? "h-14 bg-white/95" : ""}>
              <SelectValue placeholder="Select origin" />
            </SelectTrigger>
            <SelectContent>
              {airports.map((airport) => (
                <SelectItem key={airport.code} value={airport.code}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{airport.code}</span>
                    <span className="text-muted-foreground">{airport.city}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Swap Button (hidden on mobile) */}
        <div className="hidden lg:flex items-end justify-center pb-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={swapLocations}
            className="rounded-full"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">To</Label>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger className={isHero ? "h-14 bg-white/95" : ""}>
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {airports.map((airport) => (
                <SelectItem key={airport.code} value={airport.code}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{airport.code}</span>
                    <span className="text-muted-foreground">{airport.city}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dates */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Departure</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className={isHero ? "h-14 pl-10 bg-white/95" : "pl-10"}
            />
          </div>
        </div>

        {tripType === 'roundtrip' && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Return</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className={isHero ? "h-14 pl-10 bg-white/95" : "pl-10"}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4 mt-4">
        <div className="space-y-2 w-full md:w-40">
          <Label className="text-sm font-medium">Passengers</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger className={isHero ? "h-14 pl-10 bg-white/95" : "pl-10"}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Passenger' : 'Passengers'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          variant={isHero ? "hero" : "default"}
          size={isHero ? "xl" : "lg"}
          className="w-full md:w-auto md:flex-1 lg:flex-none lg:px-12"
        >
          <Plane className="w-5 h-5 mr-2" />
          Search Flights
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </form>
  );
}

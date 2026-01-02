import { useState } from 'react';
import { User, Mail, Phone, CreditCard, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Flight, Booking, generateTrackingCode, generateSeat, generateGate } from '@/lib/flightData';

interface BookingFormProps {
  flight: Flight;
  onComplete: (booking: Booking) => void;
  onBack: () => void;
}

export function BookingForm({ flight, onComplete, onBack }: BookingFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passport: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const booking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      trackingCode: generateTrackingCode(),
      flight,
      passenger: formData,
      seat: generateSeat(),
      gate: generateGate(),
      boardingTime: calculateBoardingTime(flight.departureTime),
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
    };

    onComplete(booking);
  };

  const calculateBoardingTime = (departureTime: string): string => {
    const [hours, minutes] = departureTime.split(':').map(Number);
    const boardingHours = hours === 0 ? 23 : hours - 1;
    return `${boardingHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 animate-slide-up">
      <h2 className="text-2xl font-bold text-foreground mb-2">Passenger Details</h2>
      <p className="text-muted-foreground mb-6">
        Please enter your details exactly as they appear on your passport
      </p>

      {/* Flight Summary */}
      <div className="bg-muted/50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">{flight.flightNumber}</p>
            <p className="text-sm text-muted-foreground">{flight.airline}</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">
              {flight.originCode} → {flight.destinationCode}
            </p>
            <p className="text-sm text-muted-foreground">{flight.departureTime} - {flight.arrivalTime}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">${flight.price}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="pl-10"
                placeholder="John"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="pl-10"
                placeholder="Doe"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10"
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-10"
                placeholder="+1 234 567 8900"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="passport">Passport Number</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="passport"
                value={formData.passport}
                onChange={(e) => setFormData({ ...formData, passport: e.target.value })}
                className="pl-10"
                placeholder="A12345678"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onBack} className="sm:flex-1">
            Back to Flights
          </Button>
          <Button type="submit" variant="accent" size="lg" className="sm:flex-1" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Confirm Booking
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

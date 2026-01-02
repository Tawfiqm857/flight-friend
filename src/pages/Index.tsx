import { Link } from 'react-router-dom';
import { Plane, Shield, Clock, CreditCard, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FlightSearchForm } from '@/components/FlightSearchForm';
import heroImage from '@/assets/hero-sky.jpg';

const features = [
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Your payment and personal data are protected with bank-level security',
  },
  {
    icon: Clock,
    title: 'Real-time Tracking',
    description: 'Track your flight status and get instant updates on any changes',
  },
  {
    icon: CreditCard,
    title: 'Best Price Guarantee',
    description: 'Find the lowest fares with our price match promise',
  },
  {
    icon: MapPin,
    title: '500+ Destinations',
    description: 'Fly to destinations worldwide with our global airline partners',
  },
];

const destinations = [
  { city: 'Paris', country: 'France', price: 449, image: '🗼' },
  { city: 'Tokyo', country: 'Japan', price: 899, image: '🗾' },
  { city: 'Dubai', country: 'UAE', price: 599, image: '🏙️' },
  { city: 'Sydney', country: 'Australia', price: 1099, image: '🏖️' },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Airplane flying above clouds"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-20">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
              Your Journey Begins Here
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow">
              Book flights to over 500 destinations worldwide with the best prices guaranteed
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-5xl mx-auto animate-slide-up">
            <FlightSearchForm variant="hero" />
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-white/90">
            <div className="text-center">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm">Destinations</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">50M+</p>
              <p className="text-sm">Happy Travelers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose SkyWings?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We make booking your next adventure simple, secure, and affordable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Destinations
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our most-booked destinations this month
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl overflow-hidden border border-border card-hover"
              >
                <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                    {dest.image}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-foreground">{dest.city}</h3>
                  <p className="text-sm text-muted-foreground">{dest.country}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">from</p>
                      <p className="text-xl font-bold text-foreground">${dest.price}</p>
                    </div>
                    <Button size="sm" variant="default">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Booking CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Plane className="w-16 h-16 mx-auto mb-6 animate-float" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Already Booked?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Track your flight status and download your boarding pass using your booking reference code
          </p>
          <Link to="/track">
            <Button variant="glass" size="xl">
              Track Your Booking
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Plane className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">SkyWings</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2026 SkyWings Airlines. All rights reserved.
            </p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">4.9/5 (2.5k reviews)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

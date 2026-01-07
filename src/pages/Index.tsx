import { Link } from 'react-router-dom';
import { Plane, Shield, Clock, CreditCard, MapPin, Star, Sparkles, ArrowRight, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FlightSearchForm } from '@/components/FlightSearchForm';
import heroImage from '@/assets/hero-sky.jpg';
import destTokyo from '@/assets/dest-tokyo.jpg';
import destParis from '@/assets/dest-paris.jpg';
import destNyc from '@/assets/dest-nyc.jpg';
import destBali from '@/assets/dest-bali.jpg';

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
    icon: Crown,
    title: 'Private Charters',
    description: 'Exclusive access to luxury private jet flights worldwide',
  },
];

const destinations = [
  { city: 'Paris', country: 'France', price: 449, image: destParis, tag: 'Most Popular' },
  { city: 'Tokyo', country: 'Japan', price: 899, image: destTokyo, tag: 'Trending' },
  { city: 'New York', country: 'USA', price: 299, image: destNyc, tag: 'Best Value' },
  { city: 'Bali', country: 'Indonesia', price: 799, image: destBali, tag: 'Paradise' },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Private jet flying above clouds at sunset"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-28 pb-16">
          <div className="text-center mb-14 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-5 py-2.5 mb-8 border border-white/20 shadow-lg">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-white/95 font-medium tracking-wide">Trusted by 50M+ travelers worldwide</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 tracking-tight leading-[0.9]">
              Fly Beyond
              <span className="block mt-2 bg-gradient-to-r from-accent via-yellow-400 to-accent bg-clip-text text-transparent drop-shadow-lg">
                Expectations
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/85 max-w-2xl mx-auto font-light leading-relaxed">
              Book commercial flights or charter private jets to over 500 destinations worldwide
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-5xl mx-auto animate-slide-up">
            <FlightSearchForm variant="hero" />
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-20">
            {[
              { value: '500+', label: 'Destinations' },
              { value: '50M+', label: 'Happy Travelers' },
              { value: '24/7', label: 'Support' },
              { value: '99.9%', label: 'On-time Rate' },
            ].map((stat) => (
              <div key={stat.label} className="text-center group cursor-default">
                <p className="text-4xl md:text-6xl font-extrabold text-white group-hover:text-accent transition-colors duration-300">{stat.value}</p>
                <p className="text-sm text-white/70 mt-2 font-semibold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-7 h-12 rounded-full border-2 border-white/40 flex items-start justify-center p-2 backdrop-blur-sm">
            <div className="w-1.5 h-3.5 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6">WHY CHOOSE US</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">
              Premium Travel <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              We make booking your next adventure simple, secure, and unforgettable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-3xl p-8 border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-3 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/25">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-28 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-6">POPULAR DESTINATIONS</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">
              Where Will You <span className="text-gradient">Go Next?</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              Explore our most-booked destinations this month
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, index) => (
              <Link
                key={index}
                to={`/search?destination=${dest.city}`}
                className="group relative bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={`${dest.city}, ${dest.country}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/20">
                      {dest.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-3xl font-bold text-white mb-1">{dest.city}</h3>
                    <p className="text-white/80 font-medium">{dest.country}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">starting from</p>
                      <p className="text-4xl font-extrabold text-gradient">${dest.price}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Track Booking CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm mb-10 shadow-2xl">
            <Plane className="w-12 h-12 text-white animate-float" />
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Already Booked?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light">
            Track your flight status and download your boarding pass using your booking reference code
          </p>
          <Link to="/track">
            <Button variant="glass" size="xl" className="text-lg px-10 py-7 font-semibold shadow-2xl hover:bg-white/30 transition-all">
              <MapPin className="w-5 h-5 mr-3" />
              Track Your Booking
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                <Plane className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-foreground">SkyWings</span>
                <p className="text-sm text-muted-foreground">Premium Air Travel</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              © 2026 SkyWings Airlines. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
              ))}
              <span className="ml-3 text-foreground font-bold text-lg">4.9/5</span>
              <span className="text-muted-foreground">(2.5k reviews)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { BriefcaseMedical, CalendarCheck, MessageSquareHeart, ShieldCheck, Star, Users } from 'lucide-react';

const features = [
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Expert Doctors',
    description: 'Access profiles of verified doctors with detailed specializations and patient reviews.',
    dataAiHint: 'doctor team'
  },
  {
    icon: <CalendarCheck className="h-10 w-10 text-primary" />,
    title: 'Easy Scheduling',
    description: 'Book appointments at your convenience with our intuitive scheduling system and get timely reminders.',
    dataAiHint: 'calendar schedule'
  },
  {
    icon: <MessageSquareHeart className="h-10 w-10 text-primary" />,
    title: 'Virtual Consultations',
    description: 'Connect with doctors via secure video or audio calls and share files easily.',
    dataAiHint: 'video call'
  },
  {
    icon: <Star className="h-10 w-10 text-primary" />,
    title: 'Transparent Reviews',
    description: 'Read genuine patient ratings and reviews to make informed decisions.',
    dataAiHint: 'reviews feedback'
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 animate-fade-in">
            Your Health, <span className="text-primary">Connected</span>.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in animation-delay-300">
            DoctorConnect provides a seamless platform to find trusted medical professionals, schedule appointments, and consult virtually. 
            Take control of your healthcare journey today.
          </p>
          <div className="space-x-4 animate-fade-in animation-delay-600">
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
              <Link href="/doctors">Find a Doctor</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-primary border-primary hover:bg-primary/10 transition-all duration-300 transform hover:scale-105">
              <Link href="/register">Join Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-16">
            Why Choose DoctorConnect?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-up" style={{animationDelay: `${index * 150}ms`}}>
                <CardHeader className="items-center">
                  {feature.icon}
                  <CardTitle className="mt-4 text-xl font-headline">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-16">
            Simple Steps to Better Health
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div className="flex flex-col items-center text-center animate-slide-in-up" style={{animationDelay: `100ms`}}>
              <div className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2 font-headline">Create Your Profile</h3>
              <p className="text-muted-foreground">Sign up as a patient or doctor and complete your profile with relevant information.</p>
            </div>
            <div className="flex flex-col items-center text-center animate-slide-in-up" style={{animationDelay: `250ms`}}>
              <div className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2 font-headline">Find & Book</h3>
              <p className="text-muted-foreground">Patients can search for doctors by specialty and book appointments online.</p>
            </div>
            <div className="flex flex-col items-center text-center animate-slide-in-up" style={{animationDelay: `400ms`}}>
              <div className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2 font-headline">Consult Virtually</h3>
              <p className="text-muted-foreground">Connect with your doctor through secure video or audio calls for consultations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial/Trust Section Placeholder */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">
            Trusted by Patients and Doctors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We prioritize your privacy and security, ensuring a safe and reliable platform for all your healthcare needs.
          </p>
           <div className="mt-10">
            <Image src="https://placehold.co/800x400.png" alt="Diverse group of people" width={800} height={400} className="rounded-lg shadow-lg mx-auto" data-ai-hint="healthcare professionals community" />
          </div>
        </div>
      </section>
    </div>
  );
}

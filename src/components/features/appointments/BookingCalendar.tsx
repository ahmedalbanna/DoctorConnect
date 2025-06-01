"use client";

import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Doctor } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface BookingCalendarProps {
  availability: Doctor['availability'];
  doctorId: string;
}

export function BookingCalendar({ availability, doctorId }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Booking Incomplete",
        description: "Please select a date and time for your appointment.",
        variant: "destructive",
      });
      return;
    }
    // Simulate booking
    console.log(`Booking for doctor ${doctorId} on ${selectedDate.toDateString()} at ${selectedTime}`);
    toast({
      title: "Appointment Booked!",
      description: `Your appointment is confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
    });
    setSelectedDate(undefined);
    setSelectedTime(undefined);
  };

  const availableSlotsForSelectedDate = () => {
    if (!selectedDate) return [];
    const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const dayAvailability = availability.find(a => a.day === dayOfWeek);
    return dayAvailability ? dayAvailability.slots : [];
  };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of today for comparison

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-headline">Select Date & Time</CardTitle>
        <CardDescription>Choose an available slot for your consultation.</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2 text-foreground">Pick a Date:</h4>
           <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                disabled={(date) => date < today || !availability.some(a => a.day === date.toLocaleDateString('en-US', { weekday: 'long' }))}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <h4 className="font-medium mb-2 text-foreground">Available Times:</h4>
          {selectedDate ? (
            availableSlotsForSelectedDate().length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableSlotsForSelectedDate().map((time, index) => (
                  <Button
                    key={index}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                    className={selectedTime === time ? 'bg-primary text-primary-foreground' : 'border-primary text-primary hover:bg-primary/10'}
                  >
                    <Clock className="mr-2 h-4 w-4" /> {time}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No slots available for this date. Please select another day.</p>
            )
          ) : (
            <p className="text-muted-foreground text-sm">Please select a date to see available times.</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleBooking} 
          disabled={!selectedDate || !selectedTime}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
}

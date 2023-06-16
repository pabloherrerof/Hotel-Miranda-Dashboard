import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BookingChartContainer } from "./BookingChartStyled";
import { useSelector } from "react-redux";
import { getBookingsData } from "../../features/bookings/bookingsSlice";

export const BookingChart = () => {
  const bookingsData = useSelector(getBookingsData);

  const [eventCounts, setEventCounts] = useState({});

  const countEventsInCurrentWeek = () => {
    const currentDate = new Date();

    const startOfWeek = currentDate.getDate() - currentDate.getDay();
    const endOfWeek = startOfWeek + 6;
    const counts = [];
    for (let day = startOfWeek; day <= endOfWeek; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const eventsForDay = bookingsData.filter((booking) => {
        const bookingStart = new Date(booking.checkIn);
        const bookingEnd = new Date(booking.checkOut);
        return date >= bookingStart && date <= bookingEnd;
      });

      counts.push({
        weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
        bookings: eventsForDay.length,
      });
    }

    setEventCounts(counts);
  };

  useEffect(() => {
    countEventsInCurrentWeek();
  }, []);

  const data = eventCounts;

  return (
    <BookingChartContainer>
      <h2>Bookings per day this week:</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={600}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 10,
          }}
          barSize={25}
        >
          <XAxis
            dataKey="weekday"
            scale="point"
            padding={{ left: 30, right: 30 }}
          />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="bookings" fill="#8884d8" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </BookingChartContainer>
  );
};

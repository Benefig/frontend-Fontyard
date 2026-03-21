import getVenues from "@/libs/getVenues";
import BookingClient from "@/components/BookingClient";

export default async function BookingPage() {
    const venues = await getVenues();

    return <BookingClient venues={venues} />;
}
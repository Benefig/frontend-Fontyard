import getHotels from "@/libs/getHotels";
import Link from "next/link";
import HotelsAdminTable from "./HotelsAdminTable";

export default async function AdminHotelsPage() {
    const hotels = await getHotels();

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">จัดการโรงแรม</h1>
                <Link
                    href="/admin/hotels/new"
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                    + เพิ่มโรงแรมใหม่
                </Link>
            </div>
            <HotelsAdminTable hotels={hotels} />
        </div>
    );
}

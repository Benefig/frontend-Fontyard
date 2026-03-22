'use client'

import { useState, useTransition } from "react";
import { deleteBookingAction, updateBookingAction } from "./actions";

export default function BookingsAdminTable({ bookings }: { bookings: ApiBookingJson }) {
    const [pending, startTransition] = useTransition();
    const [editId, setEditId] = useState<string | null>(null);
    const [editDate, setEditDate] = useState('');

    const handleDelete = (id: string) => {
        if (!window.confirm('ต้องการลบการจองนี้?')) return;
        startTransition(() => deleteBookingAction(id));
    };

    const handleEditSave = (id: string) => {
        if (!editDate) return;
        startTransition(async () => {
            await updateBookingAction(id, editDate);
            setEditId(null);
        });
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr className="text-left text-xs text-gray-500 uppercase">
                        <th className="px-4 py-3 font-medium">User ID</th>
                        <th className="px-4 py-3 font-medium">โรงแรม</th>
                        <th className="px-4 py-3 font-medium">จังหวัด</th>
                        <th className="px-4 py-3 font-medium">วันเข้าพัก</th>
                        <th className="px-4 py-3 font-medium">วันที่จอง</th>
                        <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {bookings.data.filter((b) => b.hotel?.name).map((b) => (
                        <tr key={b._id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-400 font-mono text-xs">{typeof b.user === 'string' ? b.user : b.user?._id ?? '-'}</td>
                            <td className="px-4 py-3 font-medium text-gray-800">{b.hotel?.name}</td>
                            <td className="px-4 py-3 text-gray-500">{b.hotel?.province ?? '-'}</td>
                            <td className="px-4 py-3 text-gray-600">
                                {editId === b._id ? (
                                    <input
                                        type="date"
                                        value={editDate}
                                        onChange={(e) => setEditDate(e.target.value)}
                                        className="px-2 py-1 border border-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    new Date(b.apptDate).toLocaleDateString('th-TH')
                                )}
                            </td>
                            <td className="px-4 py-3 text-gray-400">
                                {new Date(b.createdAt).toLocaleDateString('th-TH')}
                            </td>
                            <td className="px-4 py-3">
                                {editId === b._id ? (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEditSave(b._id)}
                                            disabled={pending}
                                            className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                                        >
                                            บันทึก
                                        </button>
                                        <button
                                            onClick={() => setEditId(null)}
                                            className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-md hover:bg-gray-50"
                                        >
                                            ยกเลิก
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                setEditId(b._id);
                                                setEditDate(b.apptDate.slice(0, 10));
                                            }}
                                            className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            แก้ไข
                                        </button>
                                        <button
                                            onClick={() => handleDelete(b._id)}
                                            disabled={pending}
                                            className="px-3 py-1.5 text-xs font-medium text-red-500 border border-red-200 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50"
                                        >
                                            ลบ
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {bookings.data.length === 0 && (
                <p className="text-center text-gray-400 text-sm py-8">ไม่มีข้อมูลการจอง</p>
            )}
        </div>
    );
}

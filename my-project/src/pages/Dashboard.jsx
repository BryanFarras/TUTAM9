import React, { useState } from "react";
import dayjs from "dayjs";

const Dashboard = () => {
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today.format("YYYY-MM-DD"));
  const [notes, setNotes] = useState({});
  const [noteInput, setNoteInput] = useState("");

  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");
  const startDay = startOfMonth.day();

  const daysInMonth = [];
  for (let i = 1; i <= endOfMonth.date(); i++) {
    daysInMonth.push(dayjs().date(i));
  }

  const handleDateClick = (date) => {
    const formatted = date.format("YYYY-MM-DD");
    setSelectedDate(formatted);
    setNoteInput(notes[formatted] || "");
  };

  const saveNote = () => {
    setNotes({ ...notes, [selectedDate]: noteInput });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">📅 Kalender & Catatan</h1>

        <div className="grid grid-cols-7 gap-2 text-center mb-6">
          {["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map((day) => (
            <div key={day} className="font-semibold text-sm">{day}</div>
          ))}

          {Array(startDay).fill(null).map((_, i) => (
            <div key={`pad-${i}`}></div>
          ))}

          {daysInMonth.map((date) => {
            const formatted = date.format("YYYY-MM-DD");
            const isToday = formatted === today.format("YYYY-MM-DD");
            const hasNote = notes[formatted];

            return (
              <button
                key={formatted}
                className={`p-2 rounded-lg text-sm border hover:bg-blue-100
                  ${formatted === selectedDate ? "bg-blue-300 text-white" : ""}
                  ${isToday ? "border-blue-500" : ""}
                  ${hasNote ? "font-bold text-green-600" : ""}`}
                onClick={() => handleDateClick(date)}
              >
                {date.date()}
              </button>
            );
          })}
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">
            Catatan untuk: {dayjs(selectedDate).format("DD MMMM YYYY")}
          </h2>
          <textarea
            className="w-full h-24 p-2 border rounded-md"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Tulis catatan di sini..."
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={saveNote}
          >
            Simpan Catatan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

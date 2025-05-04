import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios"; // Import axios

const Dashboard = () => {
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today.format("YYYY-MM-DD"));
  const [notes, setNotes] = useState({});
  const [noteInput, setNoteInput] = useState("");
  const userId = 1; // Replace this with actual user id after authentication

  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");
  const startDay = startOfMonth.day();

  const daysInMonth = [];
  for (let i = 1; i <= endOfMonth.date(); i++) {
    daysInMonth.push(dayjs().date(i));
  }

  // Fetch the notes when the component mounts
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/api/notes/user/${userId}`) // Use VITE_API environment variable
      .then((response) => {
        const notesData = response.data.data.reduce((acc, note) => {
          acc[note.date] = note.content;
          return acc;
        }, {});
        setNotes(notesData);
      })
      .catch((error) => console.error("Error fetching notes:", error));
  }, [userId]);

  const handleDateClick = (date) => {
    const formatted = date.format("YYYY-MM-DD");
    setSelectedDate(formatted);
    setNoteInput(notes[formatted] || "");
  };

  const saveNote = () => {
    const note = { user_id: userId, title: `Note for ${selectedDate}`, content: noteInput, date: selectedDate };

    const method = notes[selectedDate] ? "put" : "post"; // If note exists, update, else create
    const url = notes[selectedDate]
      ? `${import.meta.env.VITE_API}/api/notes/${selectedDate}` // Update URL
      : `${import.meta.env.VITE_API}/api/notes`; // Create URL

    axios({
      method: method,
      url: url,
      data: note,
    })
      .then((response) => {
        // Update the UI with the new or updated note
        setNotes((prevNotes) => ({
          ...prevNotes,
          [selectedDate]: noteInput,
        }));
      })
      .catch((error) => console.error("Error saving note:", error));
  };

  return (
    <div className="min-h-screen p-6 font-sans">
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
                className={`p-2 rounded-lg text-sm hover:bg-blue-100
                  ${formatted === selectedDate ? "bg-blue-300 text-white" : ""}
                  ${isToday ? "bg-blue-500 text-white" : ""}
                  ${hasNote ? "font-bold text-green-600" : ""}`}
                onClick={() => handleDateClick(date)}
              >
                {date.date()}
              </button>
            );
          })}
        </div>

        <div className="pt-4">
          <h2 className="text-xl font-semibold mb-2">
            Catatan untuk: {dayjs(selectedDate).format("DD MMMM YYYY")}
          </h2>
          <textarea
            className="w-full h-24 p-2 bg-black text-white rounded-md"
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

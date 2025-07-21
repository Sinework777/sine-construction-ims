import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FileText, HelpCircle, Upload, CalendarPlus, AlertTriangle } from 'lucide-react';

const actions = [
  { label: 'New Daily Report', icon: <FileText />, form: 'daily-report' },
  { label: 'New RFI', icon: <HelpCircle />, form: 'rfi' },
  { label: 'Submit Submittal', icon: <Upload />, form: 'submittal' },
  { label: 'Schedule Meeting', icon: <CalendarPlus />, form: 'meeting' },
  { label: 'Log HSE Incident', icon: <AlertTriangle />, form: 'hse' },
];

export default function QuickActionsPM() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(null);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative">
        <button className="bg-blue-700 text-white rounded-full shadow-xl p-5 hover:scale-110 transition flex items-center justify-center" onClick={() => setOpen(o => !o)}>
          <Plus className="w-6 h-6" />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 flex flex-col gap-3 bg-white/90 rounded-2xl shadow-xl p-4 ring-1 ring-blue-200"
            >
              {actions.map(a => (
                <button key={a.form} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition" onClick={() => setForm(a.form)}>{a.icon} {a.label}</button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {form && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-32 right-8 bg-white rounded-2xl shadow-2xl p-8 ring-2 ring-blue-300 z-50 w-96 max-w-full"
            >
              <div className="font-bold text-lg mb-2">{actions.find(a => a.form === form)?.label}</div>
              <div className="mb-4 text-slate-600">(Mock form placeholder)</div>
              <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-xl shadow hover:bg-blue-700 transition" onClick={() => setForm(null)}>Close</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

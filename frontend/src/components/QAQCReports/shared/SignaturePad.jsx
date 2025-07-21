import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

export default function SignaturePad({ onSave }) {
  const sigCanvas = useRef(null);

  function clear() {
    sigCanvas.current.clear();
  }

  function save() {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    if (onSave) onSave(dataURL);
  }

  return (
    <div className="space-y-4">
      <SignatureCanvas ref={sigCanvas} penColor="black" canvasProps={{ width: 500, height: 200, className: 'border rounded-xl' }} />
      <div className="flex gap-4">
        <button className="bg-red-600 text-white px-4 py-2 rounded-xl shadow hover:bg-red-700 transition" type="button" onClick={clear}>Clear</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition" type="button" onClick={save}>Save</button>
      </div>
    </div>
  );
}

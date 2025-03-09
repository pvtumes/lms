import React from "react";

const Dialog = ({ children, open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

const DialogTrigger = ({ children, onClick }) => (
  <div onClick={onClick}>{children}</div>
);

const DialogContent = ({ children }) => <div>{children}</div>;

const DialogHeader = ({ children }) => (
  <div className="border-b pb-4 mb-4">{children}</div>
);

const DialogTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

const DialogDescription = ({ children }) => (
  <p className="text-gray-600">{children}</p>
);

const DialogFooter = ({ children }) => (
  <div className="border-t pt-4 mt-4">{children}</div>
);

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};
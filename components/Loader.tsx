"use client";

import React from "react";

export default function Loader(): JSX.Element {
  return (
    <div className="flex justify-center items-center h-screen bg-brand-dark">
      <div
        className="
          animate-spin
          rounded-full
          h-16 w-16
          border-4
          border-brand-lime
          border-t-transparent
        "
      />
    </div>
  );
}

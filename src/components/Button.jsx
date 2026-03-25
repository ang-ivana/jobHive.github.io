import { useState } from "react";
export default function Button({ variant = "primary", text, onClick }) {
  return (
    <button className={`btn ${variant}-btn`} onClick={onClick}>
      <div className="btn-inside">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </button>
  )
}
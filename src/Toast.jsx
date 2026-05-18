import "./Toast.css";

export default function Toast({ type = "success", title, message }) {
  if (!message) return null;

  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      <div className="toastIcon">{type === "success" ? "✓" : "!"}</div>
      <div className="toastContent">
        <strong>{title}</strong>
        <span>{message}</span>
      </div>
    </div>
  );
}

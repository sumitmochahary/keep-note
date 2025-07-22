import { useErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div
      role="alert"
      style={{
        textAlign: "center",
        margin: "0 auto",
        fontSize: "1.3rem",
        padding: "20px",
      }}
    >
      <p>Something went wrong. Try after sometime</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetBoundary}>Try again</button>
    </div>
  );
}

export default ErrorFallback;

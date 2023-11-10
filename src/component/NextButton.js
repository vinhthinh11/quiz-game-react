function NextButton({ action, children }) {
  return (
    <button className="btn btn-ui" onClick={action}>
      {children}
    </button>
  );
}

export default NextButton;

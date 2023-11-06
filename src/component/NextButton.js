function NextButton({ handleSelectAnwer, children }) {
  return (
    <button className="btn btn-ui" onClick={handleSelectAnwer}>
      {children}
    </button>
  );
}

export default NextButton;

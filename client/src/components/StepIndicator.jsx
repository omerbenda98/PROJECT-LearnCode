const StepIndicator = ({ currentStep }) => {
  return (
    <div className="step-indicator-container">
      {[1, 2, 3, 4, 5, 6].map((step) => (
        <div
          key={step}
          className={`step-indicator ${step <= currentStep ? "filled" : ""}`}
        ></div>
      ))}
    </div>
  );
};
export default StepIndicator;

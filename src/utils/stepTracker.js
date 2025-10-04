export function stepTracker({ stepsLength = 0, callback }) {
  const triggeredSteps = Array(stepsLength).fill(false);

  return function track(stepIndex = 0) {
    if (!triggeredSteps[stepIndex]) {
      triggeredSteps[stepIndex] = true;
      callback(stepIndex);
    }
  };
}
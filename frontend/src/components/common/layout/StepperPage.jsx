import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BackEndPage from 'components/common/layout/BackEndPage';
import TopMessage from 'components/common/layout/TopMessage';

const MIN_STEP = 1;

const StepperPage = ({
  allSteps,
  doneStatus,
  initialStep,
  pageSteps,
  title
}) => {
  const [currentStep, setCurrentStep] = React.useState(initialStep);
  const MAX_STEP = allSteps.length - 1;

  const handleCurrentStep = step => setCurrentStep(step);
  const moveToPreviousStep = () =>
    currentStep <= MIN_STEP
      ? setCurrentStep(1)
      : setCurrentStep(currentStep - 1);
  const moveToNextStep = () =>
    currentStep >= MAX_STEP
      ? setCurrentStep(MAX_STEP)
      : setCurrentStep(currentStep + 1);

  return (
    <BackEndPage title={title}>
      <div className="main-app">
        <TopMessage message={`${title} (Step ${currentStep}/${MAX_STEP})`} />

        <section className="app-content">
          <StepperList
            currentStep={currentStep}
            doneStatus={doneStatus}
            pageSteps={pageSteps}
            setCurrentStep={handleCurrentStep}
          />
          {allSteps[currentStep]}
        </section>
        <StepperNavigation
          currentStep={currentStep}
          maxStep={MAX_STEP}
          moveToNextStep={moveToNextStep}
          moveToPreviousStep={moveToPreviousStep}
        />
      </div>
    </BackEndPage>
  );
};

StepperPage.propTypes = {
  allSteps: PropTypes.array.isRequired,
  doneStatus: PropTypes.array.isRequired,
  initialStep: PropTypes.number,
  pageSteps: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

StepperPage.defaultProps = {
  initialStep: 1
};

const StepperList = ({
  currentStep,
  doneStatus,
  pageSteps,
  setCurrentStep
}) => {
  const steps = Object.keys(pageSteps);
  const status = steps.map((_, index) => ({
    active: currentStep === index + 1,
    done: doneStatus[index]
  }));

  return (
    <div className="stepper">
      <ul role="tablist">
        {Object.keys(pageSteps).map((step, index) => (
          <Stepper
            currentStep={currentStep}
            key={index}
            number={index + 1}
            onClick={() => setCurrentStep(index + 1)}
            status={status[index]}
            title={pageSteps[step].title}
          />
        ))}
      </ul>
    </div>
  );
};
StepperList.propTypes = {
  currentStep: PropTypes.number.isRequired,
  doneStatus: PropTypes.array.isRequired,
  pageSteps: PropTypes.object.isRequired,
  setCurrentStep: PropTypes.func.isRequired
};

const Stepper = ({ number, onClick, status, title }) => {
  return (
    <li
      className={classNames({
        active: status.active,
        done: status.done
      })}
      onClick={onClick}
      role="tab"
    >
      <button>
        <div className="title">
          <span className="step-inner-circle">
            <span>{number}</span>
          </span>
          <span className="step-text">{title}</span>
        </div>
      </button>
    </li>
  );
};

Stepper.propTypes = {
  number: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

const StepperNavigation = ({
  maxStep,
  moveToPreviousStep,
  moveToNextStep,
  currentStep
}) => (
  <section className="row mt-3">
    <div className="col-6">
      {currentStep > MIN_STEP && (
        <button
          className="btn btn-info btn-circle btn-transparent"
          onClick={moveToPreviousStep}
        >
          <span className="icon icon-angle-left"></span> Previous Step
        </button>
      )}
    </div>
    <div className="col-6 text-right">
      {currentStep < maxStep && (
        <button
          className="btn btn-info btn-circle btn-transparent"
          onClick={moveToNextStep}
        >
          Next Step <span className="icon icon-angle-right"></span>
        </button>
      )}
    </div>
  </section>
);

StepperNavigation.propTypes = {
  currentStep: PropTypes.number.isRequired,
  maxStep: PropTypes.number.isRequired,
  moveToNextStep: PropTypes.func.isRequired,
  moveToPreviousStep: PropTypes.func.isRequired
};

export default StepperPage;

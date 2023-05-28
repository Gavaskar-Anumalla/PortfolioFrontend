const Validation = (values) => {
  let errors = {};

  if (!values.portfolioName) {
    errors.portfolioName = "Portfolio name is Required";
  }

  if (!values.fundManagerName) {
    errors.fundManagerName = "Fund Manger name is Required";
  }

  if (!values.baseCurrency) {
    errors.baseCurrency = "Base Currency is Required";
  }

  if (!values.initialInvestment) {
    errors.initialInvestment = "Initial Investment is Required";
  }

  if (!values.exchange) {
    errors.exchange = "Exchange is Required";
  }

  if (!values.rebalancingFrequency) {
    errors.rebalancingFrequency = "Rebalancing Frequency is Required";
  }

  if (!values.benchmark) {
    errors.benchmark = "Benchmark is Required";
  }

  if (!values.themeName) {
    errors.themeName = "Theme name is Required";
  }

  return errors;
};

export default Validation;

/**
 * Endogenous module constructor.
 * @param {number} bodyMass Body mass (kg).
 */
module.exports = (bodyMass) => {
  const EGP_0 = 0.0161 * bodyMass; // mmol min^-1

  return {
    /**
     * Endogenous glucose production.
     * @param {number} x Insulin effect (unitless).
     * @return {number} Endogenous glucose production (mmol min^-1).
     */
    EGP: x => EGP_0 * Math.max(1 - x, 0) // assuming here that EGP cannot be negative
  };
};

const EGP_0_m = 0.0161; // mmol kg^−1 min^−1

/**
 * Endogenous module constructor.
 * @param {number} bodyMass Body mass (kg).
 */
module.exports = (bodyMass) => {
  const EGP_0 = EGP_0_m * bodyMass; // mmol min^-1

  return {
    /**
     * Endogenous glucose production.
     * @param {number} x Insulin effect (unitless).
     * @return {number} Endogenous glucose production (mmol min^-1).
     */
    EGP: x => EGP_0 * (1 - x),
  };
};

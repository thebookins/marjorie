module.exports = ({
  dt = 1,
  state = { Q: 0 },
} = {}) => {
  // constants
  const k = 0.066; // min^-1

  /**
   * @typedef {Object} State
   * @property {number} Q - Total glucose (mmol)
   */
   let { Q } = state;

  // API
  const api = {
    /**
     * Step forward dt minutes.
     * @param {number} q_in Glucose flux from accessible compartment (mmol min^-1).
     * @param {number} x Insulin action on glucose disposal (min^-1).
     */
    step: (q_in, x) => {
      Q += (q_in - api.q_out - x * Q) * dt;
    },
    /**
     * Get glucose flux into accessible compartment.
     * @return {number} Glucose flux into accessible compartment (mmol min^-1).
     */
    get q_out() {
      return k * Q;
    },
    /**
     * Get state.
     * @return {State} Module state variables.
     */
    get state() {
      return { Q };
    },
  };

  return api;
};

export function filterSignals(signals, category) {
  return category === 'Todos'
    ? signals
    : signals.filter((signal) => signal.category === category)
}

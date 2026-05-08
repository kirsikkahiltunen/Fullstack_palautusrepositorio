import { useFeedbackStore } from "../store"

const Buttons = () => {
  const incrementAll = useFeedbackStore(state => state.incrementAll)
  const incrementGood = useFeedbackStore(state => state.incrementGood)
  const incrementNeutral = useFeedbackStore(state => state.incrementNeutral)
  const incrementBad = useFeedbackStore(state => state.incrementBad)
  const updateAverage = useFeedbackStore(state => state.updateAverage)
  const updatePositive = useFeedbackStore(state => state.updatePositive)
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => { incrementGood(), updateAverage(), updatePositive() }}>good</button>
      <button onClick={() => { incrementNeutral(), updateAverage(), updatePositive() }}>neutral</button>
      <button onClick={() => {incrementBad(), updateAverage(), updatePositive() }}>bad</button>
    </div>
  )
}

export default Buttons

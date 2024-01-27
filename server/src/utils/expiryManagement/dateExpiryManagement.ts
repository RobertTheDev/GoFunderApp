// Get the current date and time
const currentDate: Date = new Date()

// Add 10 minutes to the current date and time
export const tenMinuteExpiryDateTime: Date = new Date(
  currentDate.getTime() + 10 * 60000,
)

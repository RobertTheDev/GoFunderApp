// Get the current date and time
const currentDate = new Date()

// Add 10 minutes to the current date and time
export const tenMinuteExpiryDateTime = new Date(
  currentDate.getTime() + 10 * 60000,
) // 1 minute = 60000 milliseconds

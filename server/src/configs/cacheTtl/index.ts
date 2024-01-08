// Used and added to avoid thundering herds or dog piling.
// This happens when many different application processes simultaneously
// request a cache key, get a cache miss, and then each hits the same
// database query in parallel
const randomAddedSeconds = Math.floor(Math.random() * 120) + 1

export const cacheTtlOneMinute = 60 + randomAddedSeconds

export const cacheTtlOneHour = 3600 + randomAddedSeconds

export const cacheTtlOneDay = 86400 + randomAddedSeconds

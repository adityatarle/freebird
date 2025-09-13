import { describe, it, expect } from 'vitest'

// Simple utility functions for testing
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

describe('Utility Functions', () => {
  it('formats date correctly', () => {
    const date = '2024-01-15'
    const formatted = formatDate(date)
    expect(formatted).toBe('1/15/2024')
  })

  it('validates email correctly', () => {
    expect(validateEmail('test@example.com')).toBe(true)
    expect(validateEmail('invalid-email')).toBe(false)
    expect(validateEmail('test@')).toBe(false)
    expect(validateEmail('@example.com')).toBe(false)
  })

  it('handles empty email', () => {
    expect(validateEmail('')).toBe(false)
    expect(validateEmail(null)).toBe(false)
    expect(validateEmail(undefined)).toBe(false)
  })
})
import type { QuoteInput, QuoteResult } from '@/types/quote'

const RATE_PER_KG = 14  // USD/kg

export function calculateQuote(input: QuoteInput): QuoteResult {
  const baseRateUsd = parseFloat((input.weightKg * RATE_PER_KG).toFixed(2))

  return {
    baseRateUsd,
    totalUsd: baseRateUsd,
    estimatedDaysMin: 5,
    estimatedDaysMax: 8,
  }
}

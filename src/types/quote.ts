export interface QuoteInput {
  destinationProvince: string
  weightKg: number
  packageType: 'envelope' | 'small_box' | 'medium_box' | 'large_box'
}

export interface QuoteResult {
  baseRateUsd: number
  totalUsd: number
  estimatedDaysMin: number
  estimatedDaysMax: number
}

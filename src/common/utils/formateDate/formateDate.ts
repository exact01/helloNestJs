export const formatDate = (date: Date): string => {
  return new Date(date).toISOString().split('T')[0]
}

export const formatDateString = (dateString: string) => {
  return dateString.split('T')[0]
}

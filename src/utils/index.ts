export const formatDate = (newDate: string) => {
    const date = new Date(newDate)
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    const joinedDate = `${date.getDate()} ${month[date.getMonth()]}, ${date.getFullYear()}`
    return joinedDate
  }
  
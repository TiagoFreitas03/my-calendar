function isDateValid(text: string) {
	if (!text || !(/^\d{4}-\d{1,2}-\d{1,2}$/).test(text))
		return false

	const [year, month, day] = text.split('-').map(t => Number(t))

	if (year < 1000 || year > 3000 || month == 0 || month > 12)
		return false

	var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

	if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
		monthLength[1] = 29

	return day > 0 && day <= monthLength[month - 1]
}

export { isDateValid }

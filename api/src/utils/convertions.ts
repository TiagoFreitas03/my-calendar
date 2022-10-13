function stringToDate(text: string, time?: string) {
	const parts = text.split('-').map(x => Number(x))

	const [year, month, day] = parts

	let [hours, minutes] = [0, 0]

	if (time)
		[hours, minutes] = time.split(':').map(x => Number(x))

	const date = new Date(year, month - 1, day, hours, minutes, 0, 0)

	return date
}

export { stringToDate }

import { useState, useEffect } from 'react'
import { format, sub, add } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { IconButton } from '../components/IconButton'
import { SpecialDates } from '../components/SpecialDates'
import { MonthEvents } from '../components/MonthEvents'

import { DatesController } from '../controllers/DatesController'
import { Dates } from '../interfaces/Date'
import { Calendar } from '../components/Calendar'

type ChangeDateOperations = 'DY' | 'DM' | 'IY' | 'IM'

export function Home() {
	const [date, setDate] = useState(new Date())
	const [specialDates, setSpecialDates] = useState<Dates>()

	const month = date.getMonth()
	const year = date.getFullYear()

	useEffect(() => { getSpecialDates(month + 1, year) }, [])

	/**
	 * busca as datas especiais por referência (mes e ano)
	 * @param m mês
	 * @param y ano
	 */
	async function getSpecialDates(m: number, y: number) {
		const dates = await new DatesController().listByReference({ month: m, year: y })
		setSpecialDates(dates)
	}

	/** trata a mudança de mês/ano */
	async function handleChangeDate(operation: ChangeDateOperations) {
		let newDate: Date

		switch (operation) {
			case 'DY': newDate = sub(date, { years: 1 }); break;
			case 'DM': newDate = sub(date, { months: 1 }); break;
			case 'IY': newDate = add(date, { years: 1 }); break;
			case 'IM': newDate = add(date, { months: 1 }); break;
		}

		await getSpecialDates(newDate.getMonth() + 1, newDate.getFullYear())
		setDate(newDate)
	}

	/** decrementa o ano em 1 */
	const decrementYear = () => handleChangeDate('DY')
	/** incrementa o ano em 1 */
	const incrementYear = () => handleChangeDate('IY')
	/** decrementa o mês em 1 */
	const decrementMonth = () => handleChangeDate('DM')
	/** incrementa o mês em 1 */
	const incrementMonth = () => handleChangeDate('IM')

	return (
		<div className="flex gap-4 max-w-6xl w-full p-4 mx-auto">
			<div className="lg:w-[75%] w-full">
				<header className="flex justify-between items-center">
					<div>
						<IconButton icon="angles-left" color="blue" onClick={decrementYear} />
						<IconButton icon="angle-left" color="purple" onClick={decrementMonth} />
					</div>

					<h2 className="capitalize">
						{format(date, 'MMMM yyyy', { locale: ptBR })}
					</h2>

					<div>
						<IconButton icon="angle-right" color="purple" onClick={incrementMonth} />
						<IconButton icon="angles-right" color="blue" onClick={incrementYear} />
					</div>
				</header>

				<table className='w-full mt-8 border-collapse text-lg text-center'>
					<Calendar date={date} specialDates={specialDates} onChangeDate={d => setDate(d)} />
				</table>

				<SpecialDates dates={specialDates?.dates ?? []} />
			</div>

			<MonthEvents month={month} year={year} />
		</div>
	)
}

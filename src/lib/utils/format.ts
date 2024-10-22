import { browser } from '$app/environment'

export function formatAddress(address: string, digits = 4) {
	return `${address.substring(0, digits + 2)}…${address.substring(address.length - digits - 1)}`
}

export function formatEpoch(duration: number): string {
	const second = 1000
	const minute = second * 60
	const hour = minute * 60

	const hours = Math.floor(duration / hour)
	const minutes = Math.floor((duration - hours * hour) / minute)
	const seconds = Math.floor((duration - hours * hour - minutes * minute) / second)

	return `${hours.toFixed()}h ${minutes.toFixed()}' ${seconds.toFixed()}''`
}

export function formatDateAndTime(timestamp: number) {
	if (!browser) {
		return ''
	}
	const locale = navigator.language
	const date = new Date(timestamp)

	const dateFormat = new Intl.DateTimeFormat(locale, {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	})
	let dateString = dateFormat.format(date)

	const today = new Date()
	const yesterday = new Date(today).setDate(today.getDate() - 1)

	if (dateString === dateFormat.format(today)) {
		dateString = 'Today'
	} else if (dateString === dateFormat.format(yesterday)) {
		dateString = 'Yesterday'
	}

	const timeFormat = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric' })
	const dateTime = timeFormat.format(date)

	return `${dateString} • ${dateTime}`
}

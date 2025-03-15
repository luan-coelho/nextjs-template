import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

function defaultFormatDate(date?: Date, formatString: string = 'dd/MM/yyyy', locale = ptBR): string {
    if (!date) {
        return ''
    }
    return format(date, formatString, { locale })
}

function formatDateToISO(date: Date): string {
    return defaultFormatDate(date, 'yyyy-MM-dd')
}

function formatDate(date: Date): string {
    return defaultFormatDate(date, 'dd/MM/yyyy')
}

function formatDateTime(date?: Date): string {
    return defaultFormatDate(date, 'dd/MM/yyyy HH:mm')
}

function formatTime(date: Date): string {
    return defaultFormatDate(date, 'HH:mm')
}

export const dateUtils = {
    formatDateToISO,
    formatDate,
    formatDateTime,
    formatTime,
}

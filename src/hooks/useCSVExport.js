// Converts json object to CSV
export function convertToCSV(columns, list) {

    if (!columns || !list || !columns.length || !list.length) {
        return null;
    }

    const formattedColumns = columns.map(column => firstLetterCapital(column))

    const csvContent = [
        formattedColumns.join(','), // Header row
        ...list.map(item =>
            columns.map(column => escapeCSVValue(item[column])).join(',')
        )
    ].join('\n');

    return encodeURI("data:text/csv;charset=utf-8," + csvContent)
}

// Function to trigger file download
export function downloadCSV(csvData, filename) {
    const link = document.createElement('a')
    link.setAttribute('href', csvData)
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

// Handles the click to export
export function exportToCSV(columns, list, filename) {
    const csvData = convertToCSV(columns, list)
    downloadCSV(csvData, filename)

}


function escapeCSVValue(value) {
    // If the value contains a comma, double quotes, or newline characters, 
    // surround it with double quotes and escape any existing double quotes
    if (/[,"]/.test(value)) {
        return `"${value.replace(/"/g, '""')}"`
    }
    return value
}

function firstLetterCapital(str) {
    str = str.replace(/_/g, " ")
    return str.charAt(0).toUpperCase() + str.slice(1)
}
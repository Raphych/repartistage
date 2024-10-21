import { CFormTextarea } from "@coreui/react"

export default function CopyTable({ setList, setHeaders }) {

    function handlePasteList(value) {
        if (value && value !== '') {
            const rows = value.trim().split('\n').map(item => item.split('\t'))
            const headers = rows[0].map(cell => ({ label: cell, value: '' }))
            setList(rows.slice(1))
            setHeaders(headers)
        }
    }

    return (
        <div>
            <CFormTextarea
                placeholder="Paste table here"
                onChange={(e) => handlePasteList(e.target.value)}
                className="my-4"
            />
        </div>
    )
}
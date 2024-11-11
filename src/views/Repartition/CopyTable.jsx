import { CFormInput, CFormTextarea } from "@coreui/react"
import * as XLSX from "xlsx";

export function CopyTable({ setList, setHeaders }) {

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
                placeholder="Collez votre table Excel ici"
                onChange={(e) => handlePasteList(e.target.value)}
                className="my-4"
            />
        </div>
    )
}


export function AddFromXLSX({ setList, setHeaders }) {

    function handleExcel(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                // Set headers and rows
                const headers = json[0].map(cell => ({ label: cell, value: '' }));
                const rows = json.slice(1);
                setHeaders(headers);
                setList(rows);
            };
            reader.readAsArrayBuffer(file);
        }
    }

    return (
        <CFormInput
            type="file"
            accept="xlsx xls"
            onChange={handleExcel}
        />
    )
}
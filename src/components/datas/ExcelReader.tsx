import * as XLSX from 'xlsx';

interface ExcelReaderProps {
    data: any[]
    setData: (datas: any[]) => void;
}

export default function ExcelReader({ data, setData }: ExcelReaderProps) {

    function handleFileUpload(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const arrayBuffer = e.target?.result;
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            if (jsonData && jsonData.length > 0)
                setData(jsonData);
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            <div className='table-container'>
                {data.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(data[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(0,10).map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((cell: any, i) => (
                                        <td key={i}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
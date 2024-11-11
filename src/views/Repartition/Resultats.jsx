import { cibLibreoffice } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { CSpinner } from "@coreui/react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { minWeightAssign } from "munkres-algorithm";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';

export default function Resultats({ matrix, preferences, headers, stages, stagiaires, stageColIndex, stagiaireColIndex }) {

    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState(null);
    const [table, setTable] = useState(null);

    // Run the assignment algorithm
    useEffect(() => {
        if (matrix) {
            const res = minWeightAssign(matrix);
            setResults(res.assignments);
            setIsLoading(false);
        }
    }, [matrix]);

    useEffect(() => {
        if (!!results) {
            const displayTable = []
            results.forEach((col, i) => {
                const stagiaire = stagiaires[i]
                const stage = stages[col]
                const stagiaireRow = preferences?.find(preference => preference[stagiaireColIndex] === stagiaire)

                const stageRow = preferences?.find(preference => preference[stageColIndex] === stage)

                const obj = {}
                headers?.forEach((header, i) => {
                    if (!!stagiaireRow[i]) {
                        // if (header.value === "meta-stagiaire") {
                        //     obj["meta-stagiaire"][header.label] = stagiaireRow[i]
                        // }
                        if (header.value === 'id' || header.value === 'meta-stagiaire' )
                            obj[header.label] = stagiaireRow[i]
                        else if (header.value === 'idStage' || header.value === 'meta-stage')
                            obj[header.label] = stageRow[i]
                    }
                })
                obj['preference'] = matrix[i][col]
                displayTable.push(obj)
            })
            setTable(displayTable)
        }
    }, [results])

    if (isLoading) return <CSpinner />;

    if (!!results && stagiaires.length && stages.length && table) {
        return <ResultsTable data={table} headers={headers} />
    }

    if (!results) {
        return <div>No Results to show</div>;
    }
}


function ResultsTable({ data, headers }) {

    const columns = headers?.map(header => {
        if (!!header.value && header.value !== '' && header.value !== 'nbPlaces')
            return ({
                header: header.label,
                accessorKey: header.label
            })
    }).filter(header => header !== undefined)

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    if (!columns) return <CSpinner />


    // Function to export filtered data to Excel
    function exportToExcel() {

        const filteredData = table.getPrePaginationRowModel().rows.map(row => {
            const rowData = {};
            row.getVisibleCells().forEach(cell => {
                const cellValue = cell.getValue();
                let formattedValue = cellValue || "";
                const columnMeta = cell.column.columnDef.meta;
                if (columnMeta) {
                    switch (columnMeta.type) {
                        case 'date':
                            formattedValue = formatDate(cellValue)
                            break;
                        case 'percentage':
                            formattedValue = cellValue / 100;
                            break;
                        default:
                            break;
                    }
                }

                rowData[cell.column.id] = formattedValue || "";
            });
            return rowData;
        });

        // Extract column headers from the table columns definition
        const headerTitles = table.getHeaderGroups()[0].headers.map(header =>
            flexRender(header.column.columnDef.header, header.getContext())
        );

        // Convert data to worksheet format
        const worksheetData = [headerTitles, ...filteredData.map(row => {
            return table.getHeaderGroups()[0].headers.map(header => row[header.column.id]);
        })];

        // Create a worksheet from the data
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // Apply cell formatting for currency, percentage, and date types
        table.getHeaderGroups()[0].headers.forEach((header, colIndex) => {
            const columnMeta = header.column.columnDef.meta;
            const range = XLSX.utils.decode_range(worksheet['!ref']);
            for (let rowIndex = 1; rowIndex <= range.e.r; rowIndex++) { // Skip header row (start from row 1)
                const cellRef = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
                const cell = worksheet[cellRef];

                if (columnMeta && cell) {
                    switch (columnMeta.type) {
                        case 'currency':
                            cell.z = `"${'$'}"#,##0.00`; // Excel currency format
                            break;
                        case 'date':
                            cell.z = 'yyyy-mm-dd'; // Excel date format
                            break;
                        case 'percentage':
                            cell.z = '0.00%'; // Excel percentage format
                            break;
                        default:
                            // No specific format
                            break;
                    }
                }
            }
        });

        // Create a workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Data');

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, "Resultats.xlsx");
    };

    return (
        <>
            <CButton color="primary" onClick={exportToExcel} className="my-3">
                <CIcon icon={cibLibreoffice} /> Exporter vers Excel
            </CButton>
            <CTable responsive bordered borderColor="secondary">
                <CTableHead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <CTableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <CTableHeaderCell key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </CTableHeaderCell>
                            ))}
                        </CTableRow>
                    ))}
                </CTableHead>
                <CTableBody>
                    {table.getRowModel().rows.map(row => (
                        <CTableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <CTableDataCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </CTableDataCell>
                            ))}
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </>
    );
}
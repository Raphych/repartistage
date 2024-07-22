import Button from "../ui/buttons/Button";

interface MatrixMakerProps {
    array: any[];
    setMatrix: (matrix: number[][]) => void;
    columns: { [key: string]: string; };
    setColumns: React.Dispatch<React.SetStateAction<{
        [key: string]: string;
    }>>;
    setIds: React.Dispatch<React.SetStateAction<any[]>>
    setOptions: React.Dispatch<React.SetStateAction<any[]>>
}

export default function MatrixMaker({ array: dataArray, setMatrix, columns, setColumns, setIds, setOptions }: MatrixMakerProps) {

    function handleColumnRoleChange(columnName: string, role: string) {
        setColumns((prevColumns) => ({
            ...prevColumns,
            [columnName]: role,
        }));
    };


    function defineMatrix() {

        const idCol = Object.keys(columns).find((col) => columns[col] === 'id');
        const offerCol = Object.keys(columns).find((col) => columns[col] === 'offre');
        const preferenceCol = Object.keys(columns).find((col) => columns[col] === 'preference');
        const multiplicatorCol = Object.keys(columns).find((col) => columns[col] === 'multiplicator');




        if (!idCol || !offerCol || !preferenceCol) {
            alert('Please assign roles to all columns.');
            return;
        }

        // Get unique IDs and choices
        const uniqueIds = Array.from(new Set(dataArray.map((row) => row[idCol])));

        // Get unique offers and their multiplicators
        const offerMap = new Map();
        dataArray.forEach((row) => {
            const offer = row[offerCol];
            const multiplicator = multiplicatorCol ? parseInt(row[multiplicatorCol]) || 1 : 1;
            if (!offerMap.has(offer)) {
                offerMap.set(offer, multiplicator);
            }
        });

        // Expand offers based on multiplicators
        let allOffers: string[] = [];
        offerMap.forEach((multiplicator, offer) => {
            for (let i = 0; i < multiplicator; i++) {
                allOffers.push(offer);
            }
        });

        // Initialize matrix with large values
        const matrix = Array(uniqueIds.length)
            .fill(0)
            .map(() => Array(allOffers.length).fill(999999));

        dataArray.forEach((row) => {
            const idIndex = uniqueIds.indexOf(row[idCol]);
            for (let i = 0; i < allOffers.length; i++) {
                if (allOffers[i] === row[offerCol]) {
                    matrix[idIndex][i] = parseFloat(row[preferenceCol]);
                }
            }
        });

        setIds(uniqueIds);
        setOptions(allOffers);
        setMatrix(matrix);
    };


    if (!dataArray || dataArray.length === 0) {
        return <div>Upload xlsx file</div>;
    }

    return (
        <div>
            <table>
                <tbody>

                    {
                        Object.keys(dataArray[0])?.map((col, index) => (
                            <tr key={index}>
                                <td>{col}</td>
                                <td>
                                    <select
                                        name="col"
                                        value={columns[col] || ''}
                                        onChange={(e) => handleColumnRoleChange(col, e.target.value)}
                                    >
                                        <option value={''}></option>
                                        <option value={'id'}>ID</option>
                                        <option value={'offre'}>Offre</option>
                                        <option value={'preference'}>Preference</option>
                                        <option value={'multiplicator'}>Multiplicateur</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Button type="button" onClick={defineMatrix}>Créer la matrice</Button>
        </div>
    )
}
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

export default function MatrixMaker({ array, setMatrix, columns, setColumns, setIds, setOptions }: MatrixMakerProps) {

    function handleColumnRoleChange(columnName: string, role: string) {
        setColumns((prevColumns) => ({
            ...prevColumns,
            [columnName]: role,
        }));
    };


    function defineMatrix() {



        const idCol = Object.keys(columns).find((col) => columns[col] === 'id');
        const choiceCol = Object.keys(columns).find((col) => columns[col] === 'choice');
        const preferenceCol = Object.keys(columns).find((col) => columns[col] === 'preference');

        if (!idCol || !choiceCol || !preferenceCol) {
            alert('Please assign roles to all columns.');
            return;
        }

        // Get unique IDs and choices
        const uniqueIds = Array.from(new Set(array.map((row) => row[idCol])));
        const uniqueChoices = Array.from(new Set(array.map((row) => row[choiceCol])));

        // Initialize matrix with zeros
        const matrix = Array(uniqueIds.length)
            .fill(0)
            .map(() => Array(uniqueChoices.length).fill(999999));

        array.forEach((row) => {
            const idIndex = uniqueIds.indexOf(row[idCol]);
            const choiceIndex = uniqueChoices.indexOf(row[choiceCol]);
            matrix[idIndex][choiceIndex] = parseFloat(row[preferenceCol]);
        })

        setIds(uniqueIds);
        setOptions(uniqueChoices);
        setMatrix(matrix);
    };


    if (!array || array.length === 0) {
        return <div>Upload xlsx file</div>;
    }

    return (
        <div>
            <table>
                <tbody>

                    {
                        Object.keys(array[0])?.map((col, index) => (
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
                                        <option value={'choice'}>Choix</option>
                                        <option value={'preference'}>Preference</option>
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
import { useEffect, useState } from "react";
import ExcelReader from "../components/datas/ExcelReader";
import Hungarian from "../components/datas/Hungarian";
import MatrixMaker from "../components/datas/MatrixMaker";

export default function Home() {

    const [data, setData] = useState<any[]>([])
    const [ids, setIds] = useState<any[]>([]);
    const [options, setOptions] = useState<any[]>([])
    const [columns, setColumns] = useState<{ [key: string]: string; }>({});
    const [matrix, setMatrix] = useState<number[][]>([])

    console.log(matrix)

    return (
        <div>
            <ExcelReader data={data} setData={setData} />
            <MatrixMaker array={data} setMatrix={setMatrix} columns={columns} setColumns={setColumns} setIds={setIds} setOptions={setOptions} />
            <Hungarian matrix={matrix} array={data} columns={columns} ids={ids} options={options} />
        </div>
    )
}
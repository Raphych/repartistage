import { CFormLabel, CFormSelect, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";

export default function Colonnes({ preferences, headers, setHeaders }) {

    function handleHeaderChange(e, h) {
        const { value } = e.target;
        setHeaders(() => headers.map(header => header.label === h.label ? ({ ...header, value }) : header))
    }

    return (
        <CTable responsive bordered borderColor="secondary">
            <CTableHead>
                <CTableRow>
                    {
                        headers?.map((header, index) => (
                            <CTableHeaderCell className="p-0 pt-1 text-center" md="5" lg="4" xl="3" xxl="2" key={index}>
                                <CFormLabel>{header.label || ""}</CFormLabel>
                            </CTableHeaderCell>
                        ))
                    }
                </CTableRow>

                <CTableRow>
                    {
                        headers?.map((header, index) => (
                            <CTableHeaderCell md="5" lg="4" xl="3" xxl="2" key={index}>
                                <CFormSelect
                                    size="sm"
                                    value={header.value || ""}
                                    onChange={(e) => handleHeaderChange(e, header)}
                                    options={[
                                        '',
                                        { label: "ID de Stagiaire", value: "id" },
                                        { label: "ID de Stage", value: "idStage" },
                                        { label: "Nb de places", value: "nbPlaces" },
                                        { label: "Rang de préférence", value: "score" },
                                        { label: "Identification de stagiaire", value: "meta-stagiaire" },
                                        { label: "Identification du stage", value: "meta-stage" },
                                    ]}
                                />
                            </CTableHeaderCell>
                        ))
                    }
                </CTableRow>

            </CTableHead>
            <CTableBody>
                {
                    preferences?.slice(0, 10).map((row, index) => (
                        <CTableRow key={index}>
                            {
                                headers?.map((_, i) => (
                                    <CTableDataCell key={i}>{row[i]}</CTableDataCell>
                                ))
                            }
                        </CTableRow>
                    ))
                }
            </CTableBody>
        </CTable>
    )
}
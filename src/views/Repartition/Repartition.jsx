import { CButton, CSpinner, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import {  useState } from "react";
import {CopyTable, AddFromXLSX} from "./CopyTable";
import Colonnes from "./Colonnes";
import Resultats from "./Resultats";

export default function Repartition() {

    const [preferences, setPreferences] = useState(null)
    const [headers, setHeaders] = useState(null)
    const [matrix, setMatrix] = useState(null)
    const [stages, setStages] = useState(null)
    const [stagiaires, setStagiaires] = useState(null)
    const [stagiaireIndex, setStagiaireIndex] = useState(null)
    const [stageIndex, setStageIndex] = useState(null)

    function handleSetResults() {
        const {matrix, stages, stagiaires, stageIndex, stagiaireIndex} = makeMatrix(headers, preferences)
        setMatrix(matrix)
        setStages(stages)
        setStagiaires(stagiaires)
        setStagiaireIndex(stagiaireIndex)
        setStageIndex(stageIndex)
    }

    return (
        <CTabs activeItemKey="preferences" onChange={(val) => { if (val === 'resultats') handleSetResults() }}>
            <CTabList variant="tabs">
                <CTab itemKey="preferences">Préférences</CTab>
                <CTab itemKey="colonnes" disabled={!preferences}>Colonnes</CTab>
                <CTab itemKey="resultats" disabled={!headers}>Résultats</CTab>
            </CTabList>
            <CTabContent>
                <CTabPanel className="p-3" itemKey="preferences">
                <p className="my-3"><em>Veuillez téléverser votre fichier Excel ou copier-coller directement votre table.</em></p>
                    <div className="my-4">
                        <AddFromXLSX setList={setPreferences} setHeaders={setHeaders} />
                        <CopyTable setList={setPreferences} setHeaders={setHeaders} />
                    </div>
                    <CButton color="success" disabled={!preferences}><CTab itemKey="colonnes">Suivant</CTab></CButton>
                </CTabPanel>

                <CTabPanel className="p-3" itemKey="colonnes">
                    <p className="my-3"><em>Veuillez identifier le context des colonnes ou les laisser vides si elle ne s'applique pas.</em></p>
                    <Colonnes preferences={preferences} headers={headers} setHeaders={setHeaders} />
                    <CButton color="success"><CTab itemKey="preferences">Précédent</CTab></CButton>
                    <CButton color="success" disabled={!headers}><CTab itemKey="resultats">Suivant</CTab></CButton>
                </CTabPanel>

                <CTabPanel className="p-3" itemKey="resultats">
                    <div className="my-3">
                        {
                            !matrix ? <CSpinner /> : <Resultats matrix={matrix} headers={headers} preferences={preferences} stages={stages} stagiaires={stagiaires} stageColIndex={stageIndex} stagiaireColIndex={stagiaireIndex} />
                        }
                    </div>
                    <CButton color="success"><CTab itemKey="colonnes">Précédent</CTab></CButton>
                </CTabPanel>
            </CTabContent>
        </CTabs>
    )
}




function makeMatrix(headers, preferences) {
    const stageIndex = headers?.findIndex(header => header.value === 'idStage')
    const stageNbPlacesIndex = headers?.findIndex(header => header.value === 'nbPlaces')
    const stagiaireIndex = headers?.findIndex(header => header.value === 'id')
    const scoreIndex = headers?.findIndex(header => header.value === 'score')

    const options = [...new Set(preferences?.map(preference => {
        const milieu = String(preference[stageIndex])
        return milieu
    }))]

    const stages = options?.map(option => {
        const index = preferences?.findIndex(preference => {
            return preference[stageIndex] === option
        })
        let nbPlaces = 1
        if (stageNbPlacesIndex >= 0 && index >= 0)
            nbPlaces = Number(preferences[index][stageNbPlacesIndex] || 1)

        return [].concat(...Array(nbPlaces).fill(option))
    }).flat()

    const stagiaires = [...new Set(preferences?.map(preference => preference[stagiaireIndex]))]

    const matrix = [];

    // Fill the matrix with preferences (scores) for each stagiaire and stage
    stagiaires?.forEach(stagiaire => {
        const row = [];

        stages?.forEach(stage => {
            // Find the preference score for this stagiaire and this stage
            const pref = preferences?.find(preference =>
                preference[stagiaireIndex] === stagiaire && preference[stageIndex] === stage
            );
            
            // If there's a preference, get the score, otherwise put a default value (e.g., 0)
            const score = pref ? Number(pref[scoreIndex]) : 1000000;
            row.push(score);
        });

        matrix.push(row);
    });

    return {matrix, stages, stagiaires, stageIndex, stagiaireIndex};
}
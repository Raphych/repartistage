import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react'
import './App.css'
import Layout from './components/Layout'
import { CSpinner } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Repartition = React.lazy(() => import('./views/Repartition/Repartition'))
const Tutoriel = React.lazy(() => import('./views/Tutoriel/Tutoriel'))

const basename = '/repartistage' // || process.env.REACT_APP_BASENAME;

function App() {
    return (
        <BrowserRouter basename={basename}>
            <Suspense
                fallback={
                    <div className="pt-3 text-center">
                        <CSpinner color="primary" variant="grow" />
                    </div>
                }
            >
                <Layout>
                    <Routes>
                        
                        <Route
                            exact
                            path='/'
                            name="Repartition"
                            element={<Repartition />}
                        />

                        {/* <Route
                            exact
                            path='/tutoriel'
                            name="Tutoriel"
                            element={<Tutoriel />}
                        /> */}
                    </Routes>
                </Layout>
            </Suspense>
        </BrowserRouter>
    )
}

export default App

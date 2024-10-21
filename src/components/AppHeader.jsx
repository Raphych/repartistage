import {
    CContainer,
    CNavbar,
    CNavbarNav,
    CNavLink,
} from '@coreui/react'

export default function AppHeader() {
    // const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

    return (
        <>
        <CNavbar expand="sm" className="bg-body-tertiary">
          <CContainer fluid>
              <CNavbarNav as="nav">
                <CNavLink href="/">Repartition</CNavLink>
                <CNavLink href="/tutoriel">Tutoriel</CNavLink>
              </CNavbarNav>
          </CContainer>
        </CNavbar>
      </>
    )
}
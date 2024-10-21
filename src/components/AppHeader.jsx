import {
    CContainer,
    CNavbar,
    CNavbarNav,
    CNavLink,
} from '@coreui/react'


export default function AppHeader() {
    const basename = '/repartistage'
    // const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

    return (
        <>
        <CNavbar expand="sm" className="bg-body-tertiary">
          <CContainer fluid>
              <CNavbarNav as="nav">
                <CNavLink href={`${basename}/`}>Repartition</CNavLink>
                <CNavLink href={`${basename}/tutoriel`}>Tutoriel</CNavLink>
              </CNavbarNav>
          </CContainer>
        </CNavbar>
      </>
    )
}
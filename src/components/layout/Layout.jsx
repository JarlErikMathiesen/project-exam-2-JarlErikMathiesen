import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  margin: 0 auto;
  width: 100%;
  padding: 1.5rem;
`;

export default function Layout({ children }) {
  return (
    <PageWrapper>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </PageWrapper>
  );
}

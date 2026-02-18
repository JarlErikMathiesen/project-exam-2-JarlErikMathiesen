import styled from 'styled-components';

const FooterBar = styled.footer`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 2rem 1.5rem;
  display: flex;

  flex-direction: column;
  gap: 2rem;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }
`;

const FooterDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const FooterH3 = styled.h3`
  margin-bottom: 0.5rem;
`;

const FooterText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 10px;
  }

  p {
    margin: 0.25rem 0;
    word-break: break-word;
    overflow-wrap: break-word;
  }
`;

export default function Footer() {
  return (
    <FooterBar>
      <FooterDiv>
        <FooterH3>Contact</FooterH3>
        <FooterText>
          <p>Email: support@holidaze.com</p>
        </FooterText>
      </FooterDiv>
      <FooterDiv>
        <FooterH3>Follow us</FooterH3>
        <FooterText>
          <p>facebook</p>
          <p>x</p>
          <p>instagram</p>
        </FooterText>
      </FooterDiv>
    </FooterBar>
  );
}

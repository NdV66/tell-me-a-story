import { Container, styled } from '@mui/material';
import { OneFooterColumn, useSettingsContext } from 'views';

const StyledFooterWrapper = styled('div')(({ theme }) => ({
  padding: '24px 0',
  background: theme.palette.background.default,
  fontSize: theme.typography.fontSize * 0.9,
}));

export const FooterPage = () => {
  const { translations } = useSettingsContext();

  return (
    <Container maxWidth="md">
      <StyledFooterWrapper>
        <OneFooterColumn title={translations.author} link={translations.lnLink} />
        <OneFooterColumn title={translations.repo} link={translations.repoLink} />
        <OneFooterColumn title={translations.github} link={translations.githubLink} />
      </StyledFooterWrapper>
    </Container>
  );
};

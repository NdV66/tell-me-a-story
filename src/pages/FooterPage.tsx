import { styled } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { OneFooterColumn, useSettingsContext } from 'views';

const StyledFooterWrapper = styled('div')(({ theme }) => ({
  padding: '24px 0',
  background: theme.palette.background.default,
  fontSize: theme.typography.fontSize * 0.9,
}));

export const FooterPage = () => {
  const { translations } = useSettingsContext();

  return (
    <StyledFooterWrapper>
      <Grid2 container>
        <OneFooterColumn title={translations.author} link={translations.lnLink} />
        <OneFooterColumn title={translations.repo} link={translations.repoLink} />
        <OneFooterColumn title={translations.github} link={translations.githubLink} />
      </Grid2>
    </StyledFooterWrapper>
  );
};

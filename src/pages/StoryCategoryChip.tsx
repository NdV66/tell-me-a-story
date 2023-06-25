import { Box, Chip } from '@mui/material';
import { EStoryCategory } from 'types';

type Props = {
  selected: EStoryCategory[];
  translateCategoryByKey: (key: EStoryCategory) => string;
};

export const StoryCategoryChip = ({ selected, translateCategoryByKey }: Props) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((value) => (
        <Chip
          key={value}
          label={translateCategoryByKey(value as EStoryCategory)}
          color="primary"
          variant="filled"
        />
      ))}
    </Box>
  );
};

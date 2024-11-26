import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

export function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton sx={{ px: 2, py: 1 }} />
      <GridToolbarDensitySelector sx={{ px: 2, py: 1 }} />
    </GridToolbarContainer>
  );
}

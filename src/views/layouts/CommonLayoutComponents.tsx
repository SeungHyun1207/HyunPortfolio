import { Box, styled } from "@mui/material";

export const FlexBox = styled(Box)({
    display : 'flex',
})

export const AlignCenter = styled(FlexBox)({
    alignItems : 'center',
})

export const CenterBox = styled(AlignCenter)({
    justifyContent : 'center',
})
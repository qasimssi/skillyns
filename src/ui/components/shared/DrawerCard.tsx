import React, { useContext } from 'react'
import { Box, Button, Divider, IconButton, Typography, styled, useTheme } from '@mui/material'
import ImageComponent from 'ui/components/shared/ImageComponent'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import RadialSeparators from '../pages/skills/RadialSeparators'
import { TextSizeContext } from 'data/index'
import { TextSizes } from 'entities/constants'
import MoreIcon from 'assets/icons/More-Vertical.png'
import MoreIconDark from 'assets/icons/More-Vertical-dark.png'
import { useTranslation } from 'react-i18next'
import { Unstable_Popup } from '@mui/base/Unstable_Popup';

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: '1'
}))

const OptionsPopup = styled(Unstable_Popup)(({ theme }) => ({
    paddingRight: '4.2rem'
}))

const OptionsBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    width: '108px',
    borderRadius: '4px',
    boxShadow: '0px 8px 16px 0px rgba(127, 127, 127, 0.25)',
    padding: '10px 0',
}))

const Option = styled(Button)(({ theme }) => ({
    width: '100%',
    height: '40px',
    display: 'flex',
    padding: '4px 12px 4px 20px',
    gap: '8px',
    textTransform: 'none',
    justifyContent: 'flex-start'
}))

const OptionsArrowBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    position:'absolute',
    marginTop: '-15px',
    marginLeft: '82px',
    width: '12px',
    height: '12px',
    transform: 'rotate(45deg)',
    flexShrink: 0
}))

const DrawerCard = ({ label, image, imageDark, courseId, menu = [], active = false, progress = 20, isSettings = false }: any) => {
    const theme = useTheme()
    const { state: textSize } = useContext(TextSizeContext)
    const { t } = useTranslation()
    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

    const handleMore = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;

    return (
        <Wrapper>
            {isSettings ?
                <ImageComponent src={theme.palette.mode === 'light' ? image : imageDark} alt='skill' width='3rem' height='3rem' />
                :
                <CircularProgressbarWithChildren
                    value={Math.floor((progress / 12.5)) * 12.5}
                    strokeWidth={6}
                    styles={{
                        root: { width: '4.6rem', height: '4.6rem', display: 'flex' },
                        path: {
                            stroke: theme.palette.primary.main,
                            // strokeLinecap: 'round',
                        },
                        trail: {
                            stroke: 'transparent',
                        },
                        text: {
                            display: 'none',
                        },
                    }}
                >
                    <ImageComponent src={image} alt='skill' width='3.75rem' height='3.75rem' borderRadius='50%' />
                    <RadialSeparators
                        count={8}
                        style={{
                            background: theme.palette.common.white,
                            width: "4px",
                            height: `${7}%`
                        }}
                    />
                </CircularProgressbarWithChildren>
            }
            <Typography sx={{ fontWeight: active ? '700' : '400', fontSize: TextSizes[textSize].body, flexGrow: '1', paddingRight: '0.2rem' }}>{t(label)}</Typography>
            {!isSettings && active &&
                <IconButton onClick={handleMore}>
                    <ImageComponent src={theme.palette.mode === 'light' ? MoreIcon : MoreIconDark} alt='more' width='1.5rem' height='1.5rem' />
                </IconButton>
            }
            <OptionsPopup id={id} open={open} anchor={anchor}>
                <OptionsBox>
                    {menu.map((item: any, index: number) => (
                        <>
                            <Option key={index} sx={{ fontSize: TextSizes[textSize].subhead, color: item.color }}
                                onClick={()=>item.clickHandler(courseId)}>
                                <ImageComponent src={item.icon} alt='icon' width='1.25rem' height='1.25rem' />
                                {item.title}
                            </Option>
                            {index !== menu.length - 1 && <Divider />}
                        </>
                    ))}
                    <OptionsArrowBox />
                </OptionsBox>
            </OptionsPopup>
        </Wrapper>
    )
}

export default DrawerCard
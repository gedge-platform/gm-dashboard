import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from '@material-ui/core/DialogContent';
import { CDialogAction, CDialogTitle, CDialogTopAction } from './index'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import styled, { createGlobalStyle } from 'styled-components';
import theme from '@/styles/theme';

const useStyles = makeStyles(() =>
    createStyles({
        dialog: {
            '& .MuiDialog-paper': {
                backgroundColor: '#0088f2',
                paddingTop: 0,
                '& .MuiDialogTitle-root': {
                    height: 37,
                    backgroundColor: '#0090ff',
                    margin: '0 -2px',
                },
                '& .MuiDialogActions-root.dialog-topBtn': {
                    display: 'block',
                    padding: '2px 0',
                    border: 0,
                    borderTop: '1px solid #0085eb',
                    boxShadow: 'none',
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    '& .btn_common': {
                        backgroundColor: '#52a5ff',
                        border: '1px solid #0085eb',
                        '&:not(:first-child)': {
                            marginLeft: 1
                        }
                    }
                }
            }
        },
        '@global': {
            '.MuiDialog-paper': {
                padding: 2,
                borderRadius: 3,
                backgroundColor: '#0090ff',
                boxShadow: 'none',
                '& .MuiDialogTitle-root': {
                    display: 'flex',
                    alignItems: 'center',
                    height: 35,
                    padding: '0 15px 2px',
                    '& .MuiTypography-h6': {
                        font: 'inherit',
                        fontSize: '13px',
                        color: '#fff',
                        fontWeight: '300'
                    }
                },
                '& .MuiDialogContent-root': {
                    padding: 14,
                    border: '1px solid #0085eb',
                    borderBottom: '0',
                    backgroundColor: '#fff'
                },
                '& .MuiDialogActions-root': {
                    padding: '11px 10px 10px',
                    border: '1px solid #0085eb',
                    borderTop: '0',
                    boxShadow: 'inset 0 1px 0 #ebecef',
                    backgroundColor: '#f5f6f9',
                    justifyContent: 'center',
                },
                '& .dialog-topBtn': {
                    display: 'none',
                }
            }
        },
    }),
);

const CDialog = (props) => {
    const {
        id,
        title,
        modules,
        children,
        fullWidth = true,
        maxWidth,
        onUpdate,
        onClose,
        onCustom,
        onCreate,
        onDelete,
        topBtn = false,
        topModules,
        ...other
    } = props;
    const classes = useStyles();

    return (
        <Dialog
            aria-labelledby={props.id}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            topBtn={topBtn}
            {...other}
            className={
                topBtn && classes.dialog
            }
        >
            <CDialogTitle id={props.id} onClose={onClose}>
                {title}
            </CDialogTitle>
            <CDialogTopAction
                topModules={topModules}
                onUpdate={onUpdate}
                onDelete={onDelete}
                className="dialog-topBtn"
            />
            <DialogContent dividers>{children}</DialogContent>
            <CDialogAction
                modules={modules}
                onUpdate={onUpdate}
                onClose={onClose}
                onCustom={onCustom}
                onCreate={onCreate}
            />
        </Dialog>
    );
};

export { CDialog };

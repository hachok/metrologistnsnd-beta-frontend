import React from "react";
import {withTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddDevice from "./AddDevice";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import RefreshIcon from '@material-ui/icons/Refresh';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import TableRow from "@material-ui/core/TableRow";
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import i18n from "../menu/translations/i18n";
import Link from "@material-ui/core/Link";
import UserMenu from "./UserMenu";
import LinearDeterminate from "./LinearDeterminate";
import {AUTH_TOKEN, GC_USER_ID} from "../constants";
import DeleteIcon from "@material-ui/icons/Delete"
const drawerWidth = 240;
 const userId = localStorage.getItem(GC_USER_ID);
const authToken = localStorage.getItem(AUTH_TOKEN)
const useStyles = makeStyles(theme => ({
  root: {
        width: '80%',
        overflow: 'auto',
        marginRight:"auto",
        marginLeft:"auto",
        height:"100%"
    },
    table: {
maxWidth:"100%",
        maxHeight:"300px",

        color:"#fff"
    },
    inner:{
        minWidth: "60%"
    },
    row:{
        backgroundColor:"#fff"
    }
}));
  

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const GET_MyDevice = gql`query { me{mydevices{type_device, brand_device, module_device, notes,  verification_device, calibration next_calibration} }}`;
function MyDeviceForm({t,className, rest}) {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);
    const [component, setComponent] = React.useState(' ');
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
 
    return(  
                   <div className={classes.content}>
                     
                <Query query={GET_MyDevice} fetchPolicy={"network-only"} pollInterval={500} >
                    {( {loading, error, data} ) =>  {
                        if (loading) {return <LinearDeterminate />}
                        if (error) { return error.message }
                        const devicelist = data.me.mydevices;
                       if(authToken){           
                           return(
                <Paper >
                    <Table stickyHeader>
                        <TableHead  >
                            <TableRow >
                                <StyledTableCell align="right">{t('Device')}</StyledTableCell>
                                <StyledTableCell align="right">{t('Category')}</StyledTableCell>
                                <StyledTableCell align="right">{t('Module')}</StyledTableCell>
                                
                                <StyledTableCell align="right">{t('Calibration')}</StyledTableCell>
                                <StyledTableCell align="right">{t('Next Calibration')}</StyledTableCell>
                                   <StyledTableCell align="right">{t('Delete')} </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {devicelist.map(device =>(
                                <TableRow>
                                    <TableCell lign="center">{device.brand_device}</TableCell>
                                    <TableCell lign="center">{device.type_device}</TableCell>
                                    <TableCell lign="center">{device.module_device}</TableCell>
                                   
                                    <TableCell lign="center">{device.calibration}</TableCell>
                                    <TableCell lign="center">{device.next_calibration}</TableCell>
                                    <TableCell lign="center"><IconButton>
                <DeleteIcon className={classes.block}  />
            </IconButton></TableCell>
                                </TableRow>))}
                        </TableBody>
                    </Table>
                </Paper>)}else return null}}  
                                </Query>

            </div>
       
    )



}
export default withTranslation()(MyDeviceForm)
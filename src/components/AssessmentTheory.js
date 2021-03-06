import React from 'react';
import {Grid, makeStyles, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {withTranslation} from "react-i18next";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
       
    },
}));
 function AssessmentTheory({t}){
    const posts={
        title: "",
        excerpt:""


    };
    const classes = useStyles();
return(
    <div className={classes.root}>
                <Paper>
                    <Typography variant="h5" component="h3">
                        {t('Terminology')}<br/></Typography>
                    <Typography>
                        {t('Measuring Technology')}<br/>
                        {t('Errors')}<br/>
                        {t('Calibration is')}<br/>
                        {t('Fault')}<br/>
                        {t('Test')}<br/>
                        {t('Test procedure')}<br/>
                        {t('Test program')}<br/>
                    </Typography>

                </Paper>



        </div>



)


}
export default withTranslation()(AssessmentTheory)

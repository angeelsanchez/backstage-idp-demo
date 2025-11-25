import {
  HomePageStarredEntities,
  HomePageToolkit,
} from '@backstage/plugin-home';
import { Content, Page, InfoCard, Header } from '@backstage/core-components';
import { Grid, Typography, makeStyles, Box, Button } from '@material-ui/core';
import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import CloudIcon from '@material-ui/icons/Cloud';
import StorageIcon from '@material-ui/icons/Storage';
import BuildIcon from '@material-ui/icons/Build';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(5, 0),
  },
  welcomeTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    fontSize: '1.2rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
  },
  flowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
  },
  flowStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    minWidth: 120,
    boxShadow: theme.shadows[2],
  },
  flowIcon: {
    fontSize: 40,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  arrow: {
    fontSize: '1.5rem',
    color: theme.palette.text.secondary,
  },
  actionButton: {
    margin: theme.spacing(1),
  },
  quickActions: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
}));

const GitOpsFlowCard = () => {
  const classes = useStyles();

  const steps = [
    { icon: <BuildIcon className={classes.flowIcon} />, label: 'Backstage', sublabel: 'Scaffolder' },
    { icon: <GitHubIcon className={classes.flowIcon} />, label: 'GitHub', sublabel: 'Repository' },
    { icon: <GitHubIcon className={classes.flowIcon} />, label: 'GitHub', sublabel: 'Actions' },
    { icon: <StorageIcon className={classes.flowIcon} />, label: 'Quay.io', sublabel: 'Registry' },
    { icon: <CloudIcon className={classes.flowIcon} />, label: 'ArgoCD', sublabel: 'Deployment' },
    { icon: <CloudIcon className={classes.flowIcon} />, label: 'Kubernetes', sublabel: 'Runtime' },
  ];

  return (
    <InfoCard title="GitOps Flow" variant="gridItem">
      <Box className={classes.flowContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={step.label + step.sublabel}>
            <Box className={classes.flowStep}>
              {step.icon}
              <Typography variant="body2" style={{ fontWeight: 600 }}>{step.label}</Typography>
              <Typography variant="caption" color="textSecondary">{step.sublabel}</Typography>
            </Box>
            {index < steps.length - 1 && (
              <Typography className={classes.arrow}>→</Typography>
            )}
          </React.Fragment>
        ))}
      </Box>
    </InfoCard>
  );
};

const WelcomeCard = () => {
  const classes = useStyles();

  return (
    <InfoCard variant="gridItem">
      <Box textAlign="center" py={3}>
        <Typography className={classes.welcomeTitle}>
          Cloud Native Latam Summit 2025
        </Typography>
        <Typography className={classes.subtitle}>
          GitOps Demo - Internal Developer Platform with Backstage
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          This demo showcases a complete GitOps flow using Backstage as a developer platform.
          From creating a new project to its automatic deployment on Kubernetes.
        </Typography>
        <Box className={classes.quickActions}>
          <Button
            variant="contained"
            color="primary"
            href="/create"
            className={classes.actionButton}
            startIcon={<BuildIcon />}
          >
            Create Project
          </Button>
          <Button
            variant="outlined"
            color="primary"
            href="/catalog"
            className={classes.actionButton}
          >
            View Catalog
          </Button>
        </Box>
      </Box>
    </InfoCard>
  );
};

const tools = [
  {
    url: '/create',
    label: 'Scaffolder',
    icon: <BuildIcon />,
  },
  {
    url: '/catalog',
    label: 'Catalog',
    icon: <StorageIcon />,
  },
  {
    url: 'https://github.com',
    label: 'GitHub',
    icon: <GitHubIcon />,
  },
  {
    url: 'https://quay.io',
    label: 'Quay.io',
    icon: <StorageIcon />,
  },
];

export const HomePage = () => {
  return (
    <Page themeId="home">
      <Header title="IDP Demo" subtitle="Cloud Native Latam Summit 2025" />
      <Content>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <WelcomeCard />
          </Grid>
          <Grid item xs={12}>
            <GitOpsFlowCard />
          </Grid>
          <Grid item xs={12} md={6}>
            <HomePageToolkit tools={tools} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HomePageStarredEntities />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};

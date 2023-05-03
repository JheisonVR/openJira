import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Layout } from "../../components/layouts";
import { ExtryList } from "../../components/ui";
import { NewEntry } from "../../context/ui";


export default function Home() {
  
  
  return (
    <Layout >
      <Grid container spacing={2} >

        <Grid item xs={4} >
          <Card sx={{height: 'calc(100vh - 100px)'}} >
            <CardHeader title='Pendientes' />            
            <NewEntry/>
            <ExtryList status="pending" />            
          </Card>
        </Grid>

        <Grid item xs={4} >
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title='En Progreso' />
            <ExtryList status="in-progress" />            
          </Card>
        </Grid>

        <Grid item xs={4} >
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title='Completadas' />
            <ExtryList status="finished" />            
          </Card>
        </Grid>

      </Grid>

    </Layout>
  )
}

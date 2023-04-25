import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Layout } from "../../components/layouts";

export default function Home() {

  
  return (
    <Layout >
      <Grid container spacing={2} >

        <Grid item xs={4} >
          <Card sx={{height: 'calc(100vh - 100px)'}} >
            <CardHeader title='pendientes' />

            <CardContent>
              
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4} >
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title='En Progreso' />
          </Card>
        </Grid>

        <Grid item xs={4} >
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title='Completadas' />
          </Card>
        </Grid>

      </Grid>

    </Layout>
  )
}

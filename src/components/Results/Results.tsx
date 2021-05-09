import React from "react";
import './Results.scss';
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import {UserInterface} from "../../types/models.d";

interface Props{
  users: UserInterface[];
}

export const Results = (props: Props) => {
  return (
    <div className='Results'>
      <div className='Results-list'>
        <Grid container spacing={2}>
          {props.users.map((user) => (
            <Grid item xs={12} md={4} key={user.login}>
              <Card className='Results-list-item'>
                <CardActionArea>
                  <CardMedia
                    className='Results-list-item-img'
                    image={user.avatar_url}
                    title={user.login}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.login}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {user.type}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

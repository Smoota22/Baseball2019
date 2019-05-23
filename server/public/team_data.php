<?php
  session_start();
  $msg = '';
  $msgClass = '';
  $successful = FALSE;
  // Database Connection
  $dbconnect = mysql_connect("localhost", "root", "carbfax411");
  if(!$dbconnect){
      die('Cannot connect: ' . mysql_error());
  }

  $db_selected = mysql_select_db("411_project_db", $dbconnect);

  if(!$db_selected){
      die('Cant use database: ' . mysql_error());
  }




  ?>
<!------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------->
  <!DOCTYPE html>
  <html>
  <head>
    <title>Node database tutorial</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

  </head>
  <body>
      <div class="container">
          <table class="table table-striped">
              <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Age</th>
              </tr>
              <tr>
                  <td>Smit</td>
                  <td>Desai</td>
                  <td>21</td>
              </tr>
              <tr>
                  <td>Rikin</td>
                  <td>Patel</td>
                  <td>21</td>
              </tr>
              <tr>
                  <td>Govind</td>
                  <td>Verma</td>
                  <td>22</td>
              </tr>
              <tr>
                  <td>Neil</td>
                  <td>Patel</td>
                  <td>22</td>
              </tr>
          </table>
      </div>

    <script src="/app.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

  </body>
  </html>

conn.connect((err)=>{
  if (err) throw err;
  var sqlAgent = "SELECT * FROM agents";
  var sqlAgency = "SELECT * FROM agents";


  conn.query(sqlAgency, (err, agenciesDb, fields)=>{


    let contentAgents = '';
    let contentAgencies = '';

    // Loop through each element in the packages and append to content
    
    agenciesDb.forEach(function(agency){

      contentAgencies +=  `div style = "display: none"><div>
                      <h2 class="center header-blue"> Agency ${agency.AgencyID} </h2>
                      <p class="packages center">Address: ${agency.AgncyAddress}, ${agency.AgncyCity} ${agency.AgncyProv}</p>
                      <p class="packages center">Phone: ${agency.AgncyPhone} </p>
                      </div></div`

      conn.query(sql, (err, agentsDb, fields)=>{	
        agentsDb.forEach(function(agent){
          
          
          contentAgents +=  `div style = "display: none"><div>
                      <h2 class="center header-blue"> ${agent.AgtFirstName} ${agent.AgtLastName} </h2>
                      <p class="packages center">Email: ${agent.AgtEmail}</p>
                      <p class="packages center">Phone: ${agent.AgtBusPhone} </p>
                      </div></div`	
        });
      
      
        console.log(contentAgents);
        res.render('contact', { pugContacts : contentAgents });
        
        conn.end((err)=>{
        if (err) throw err;
        });
      });
    });


});
});